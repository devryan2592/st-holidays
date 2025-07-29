import { Column } from "@tanstack/react-table";

import { Lead } from "@/types/lead";
import { DataTableFacetedFilter } from "@/components/common/data-table/data-table-faceted-filter";

interface StatusFilterProps {
  column: Column<Lead, unknown>;
  disabled?: boolean;
}

const StatusFilter = ({ column, disabled = false }: StatusFilterProps) => {
  const facets = column?.getFacetedUniqueValues();
  const statuses = new Set<string>();

  facets?.forEach((count, value) => {
    if (typeof value === "string") {
      statuses.add(value);
    }
  });

  const options = Array.from(statuses).map((status) => ({
    label: status,
    value: status,
    icon: null,
  }));

  return (
    <DataTableFacetedFilter
      column={column}
      title="Status"
      options={options}
      disabled={disabled}
    />
  );
};

export default StatusFilter;
