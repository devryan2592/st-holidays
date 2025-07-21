import { Item } from "@/lib/dummy-data";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Custom filter function for multi-column searching
export const multiColumnFilterFn: FilterFn<Item> = (
  row,
  columnId,
  filterValue
) => {
  const searchableRowContent = `${row.original.name} ${
    row.original.description
  } ${row.original.destinations.join(" ")}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

export const statusFilterFn: FilterFn<Item> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

// Price Filter

// Duration Filter
