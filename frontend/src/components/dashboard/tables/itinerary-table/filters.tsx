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
// export const multiColumnFilterFn: FilterFn<Item> = (
//   row,
//   columnId,
//   filterValue: string
// ) => {
//   const searchableRowContent = `${row.original.name} ${
//     row.original.description
//   } ${row.original.destinations.join(" ")}`.toLowerCase();
//   const searchTerm = (filterValue ?? "").toLowerCase();
//   return searchableRowContent.includes(searchTerm);
// };

// export const statusFilterFn: FilterFn<Item> = (
//   row,
//   columnId,
//   filterValue: string[]
// ) => {
//   if (!filterValue?.length) return true;
//   const status = row.getValue(columnId) as string;
//   return filterValue.includes(status);
// };

// // Price Filter ()
// export const priceFilterFn: FilterFn<Item> = (
//   row,
//   columnId,
//   filterValue: [number, number]
// ) => {
//   const price = row.getValue(columnId) as number;
//   const [min, max] = filterValue;
//   return price >= min && price <= max;
// };

// Duration Filter
export const durationFilterFn: FilterFn<Item> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const duration = row.getValue(columnId) as number;

  const durationRanges: { [key: string]: [number, number | undefined] } = {
    "1-3 days": [1, 3],
    "4-6 days": [4, 6],
    "7-10 days": [7, 10],
    "10+ days": [11, undefined],
  };

  const durationFilter = filterValue.some((rangeKey) => {
    const range = durationRanges[rangeKey];
    if (!range) return false;
    const [min, max] = range;
    return duration >= min && (max === undefined || duration <= max);
  });

  console.log("durationFilter", durationFilter);
  return durationFilter;
};
