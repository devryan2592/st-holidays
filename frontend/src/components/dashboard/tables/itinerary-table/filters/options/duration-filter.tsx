"use client";

import { useMemo } from "react";

import { Table } from "@tanstack/react-table";
import { durationRanges } from "../../filter-functions";
import {
  DataTableFacetedFilter,
  FacetedFilterOption,
} from "../../../../../common/data-table/data-table-faceted-filter";

interface DurationFilterProps<TData> {
  table: Table<TData>;
  disabled?: boolean;
}

// Range Map Function
type DurationRanges = { [key: string]: [number, number | undefined] };

const countDurationsInCustomRanges = (
  valueMap: Map<number, number>,
  durationRanges: DurationRanges
): Map<string, number> => {
  const rangeCounts = new Map<string, number>();

  for (const [key, count] of valueMap.entries()) {
    for (const [label, [min, max]] of Object.entries(durationRanges)) {
      const inRange = max === undefined ? key >= min : key >= min && key <= max;
      if (inRange) {
        rangeCounts.set(label, (rangeCounts.get(label) || 0) + count);
        break; // Assume a value belongs to only one range
      }
    }
  }

  return rangeCounts;
};

// Sort range counts by order
const sortRangeCountsByOrder = (
  rangeCounts: Map<string, number>,
  durationRanges: DurationRanges
): Map<string, number> => {
  const sortedMap = new Map<string, number>();

  for (const label of Object.keys(durationRanges)) {
    if (rangeCounts.has(label)) {
      sortedMap.set(label, rangeCounts.get(label)!);
    } else {
      // If the range exists in the definition but not in the counts, include with zero
      sortedMap.set(label, 0);
    }
  }

  return sortedMap;
};

function DurationFilter<TData>({
  table,
  disabled = false,
}: DurationFilterProps<TData>) {
  const durationCounts = useMemo(() => {
    const counts = new Map<string, number>();
    const durationColumn = table.getColumn("duration");

    if (!durationColumn) return counts;

    const durationMap = durationColumn.getFacetedUniqueValues();
    const durationCounts = countDurationsInCustomRanges(
      durationMap,
      durationRanges
    );
    return durationCounts;
  }, [table.getColumn("duration")?.getFacetedUniqueValues()]);

  const sortedDurationCounts = useMemo(() => {
    return sortRangeCountsByOrder(durationCounts, durationRanges);
  }, [durationCounts]);

  const options = useMemo(() => {
    const options: FacetedFilterOption[] = [];
    sortedDurationCounts.forEach((count, value) => {
      options.push({
        label: value,
        value: value,
        count: count,
      });
    });

    return options;
  }, [sortedDurationCounts]);

  return (
    <DataTableFacetedFilter
      options={options}
      title="Duration"
      column={table.getColumn("duration")}
    />
  );
}

export default DurationFilter;
