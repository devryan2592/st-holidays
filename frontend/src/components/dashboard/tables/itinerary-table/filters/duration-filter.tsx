"use client";

import { FC, useMemo } from "react";

import { Table } from "@tanstack/react-table";
import { Item } from "@/lib/dummy-data";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DurationFilterProps {
  // Add your props here
  children?: React.ReactNode;
  table: Table<Item>;
}

const DurationFilter: FC<DurationFilterProps> = ({ children, table }) => {
  // Duration filter logic
  const durationRanges: { [key: string]: [number, number | undefined] } = {
    "1-3 days": [1, 3],
    "4-6 days": [4, 6],
    "7-10 days": [7, 10],
    "10+ days": [11, undefined],
  };

  const durationCounts = useMemo(() => {
    const counts = new Map<string, number>();
    const durationColumn = table.getColumn("duration");

    if (!durationColumn) return counts;

    const uniqueDurations = Array.from(
      durationColumn.getFacetedUniqueValues().keys()
    ) as number[];

    Object.keys(durationRanges).forEach((rangeKey) => {
      const [min, max] = durationRanges[rangeKey];
      const count = uniqueDurations.filter((duration) => {
        return duration >= min && (max === undefined || duration <= max);
      }).length;
      counts.set(rangeKey, count);
    });
    return counts;
  }, [table.getColumn("duration")?.getFacetedUniqueValues()]);

  const selectedDurations = useMemo(() => {
    const filterValue = table
      .getColumn("duration")
      ?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("duration")?.getFilterValue()]);

  console.log("filter Value", selectedDurations);

  const handleDurationChange = (checked: boolean, value: string) => {
    const filterValue = table
      .getColumn("duration")
      ?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    console.log("newFilterValue", newFilterValue);

    table
      .getColumn("duration")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FilterIcon
            className="-ms-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Duration
          {selectedDurations.length > 0 && (
            <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h=full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
              {selectedDurations.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-36 p-3" align="start">
        <div className="space-y-3">
          <div className="text-muted-foreground text-xs font-medium">
            Filters
          </div>
          <div className="space-y-3">
            {Object.keys(durationRanges).map((rangeKey) => (
              <div key={rangeKey} className="flex items-center space-x-2">
                <Checkbox
                  id={rangeKey}
                  checked={selectedDurations.includes(rangeKey)}
                  onCheckedChange={(checked) =>
                    handleDurationChange(checked as boolean, rangeKey)
                  }
                />
                <Label htmlFor={rangeKey}>
                  {rangeKey} ({durationCounts.get(rangeKey) || 0})
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DurationFilter;
