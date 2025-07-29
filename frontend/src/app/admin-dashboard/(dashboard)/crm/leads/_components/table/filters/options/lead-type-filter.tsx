import { Column } from "@tanstack/react-table";

import { Lead } from "@/types/lead";
import { DataTableFacetedFilter } from "@/components/common/data-table/data-table-faceted-filter";

interface LeadTypeFilterProps {
  column: Column<Lead, unknown>;
  disabled?: boolean;
}

const LeadTypeFilter = ({ column, disabled }: LeadTypeFilterProps) => {
  const facets = column?.getFacetedUniqueValues();
  const types = new Set<string>();

  facets?.forEach((count, value) => {
    if (typeof value === "string") {
      types.add(value);
    }
  });

  const options = Array.from(types).map((type) => ({
    label: type,
    value: type,
    icon: null,
  }));

  return (
    <DataTableFacetedFilter
      column={column}
      title="Type"
      options={options}
      disabled={disabled}
    />
  );
};

export default LeadTypeFilter;
