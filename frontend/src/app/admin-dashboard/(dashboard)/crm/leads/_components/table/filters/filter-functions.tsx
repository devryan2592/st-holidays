import { FilterFn } from "@tanstack/react-table";
import { Lead } from "@/types/lead";

export const destinationFilterFn: FilterFn<Lead> = (
  row,
  columnId,
  filterValue
) => {
  const destinations = row.getValue(columnId) as string[];
  return filterValue.some((value: string) => destinations.includes(value));
};
