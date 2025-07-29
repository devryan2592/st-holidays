import { Column } from "@tanstack/react-table";

import { Lead } from "@/types/lead";
import { DataTableFacetedFilter } from "@/components/common/data-table/data-table-faceted-filter";

interface DestinationFilterProps {
  column: Column<Lead, unknown>;
  disabled?: boolean;
}

const DestinationFilter = ({ column, disabled }: DestinationFilterProps) => {
  const facets = column?.getFacetedUniqueValues();
  const destinations = new Set<string>();

  facets?.forEach((count, value) => {
    if (Array.isArray(value)) {
      value.forEach((destination) => destinations.add(destination));
    } else if (typeof value === "string") {
      destinations.add(value);
    }
  });

  const options = Array.from(destinations).map((destination) => ({
    label: destination,
    value: destination,
    icon: null,
  }));

  return (
    <DataTableFacetedFilter
      column={column}
      title="Destination"
      options={options}
      disabled={disabled}
    />
  );
};

export default DestinationFilter;
