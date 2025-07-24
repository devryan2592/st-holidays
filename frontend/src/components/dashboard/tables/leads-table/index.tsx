"use client";

import { FC, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "@/components/dashboard/tables/leads-table/columns";
import { Lead } from "@/types/lead";
import DataTable from "../common/data-table";
import LeadTableFilters from "./filters";
import DataTablePagination from "../common/data-table/data-table-pagination";
import { TableSkeleton } from "@/components/common-ui/table-skeleton";

export interface LeadsTableProps {
  data: Lead[];
  isLoading?: boolean;
  pageCount?: number;
  pagination?: PaginationState;
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  onPaginationChange?: (pagination: PaginationState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
}

const LeadsTable: FC<LeadsTableProps> = ({
  data = [],
  isLoading = false,
  pageCount = -1,
  pagination: controlledPagination = { pageIndex: 0, pageSize: 10 },
  sorting: controlledSorting = [],
  columnFilters: controlledFilters = [],
  onPaginationChange,
  onSortingChange,
  onColumnFiltersChange,
}) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Determine if we're using server-side pagination/sorting/filtering
  const isServerSide = useMemo(
    () => ({
      pagination: onPaginationChange !== undefined,
      sorting: onSortingChange !== undefined,
      filtering: onColumnFiltersChange !== undefined,
    }),
    [onPaginationChange, onSortingChange, onColumnFiltersChange]
  );

  const table = useReactTable({
    data,
    columns,
    // Server-side pagination
    pageCount: pageCount,
    manualPagination: isServerSide.pagination,
    manualSorting: isServerSide.sorting,
    manualFiltering: isServerSide.filtering,
    // State
    state: {
      pagination: controlledPagination,
      sorting: controlledSorting,
      columnFilters: controlledFilters,
      columnVisibility,
      rowSelection,
    },
    // Callbacks
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function'
          ? updater(controlledPagination)
          : updater;
      onPaginationChange?.(newPagination);
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function'
          ? updater(controlledSorting)
          : updater;
      onSortingChange?.(newSorting);
    },
    onColumnFiltersChange: (updater) => {
      const newFilters =
        typeof updater === 'function'
          ? updater(controlledFilters)
          : updater;
      onColumnFiltersChange?.(newFilters);
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    // Models
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: isServerSide.filtering
      ? undefined
      : getFilteredRowModel(),
    getPaginationRowModel: isServerSide.pagination
      ? undefined
      : getPaginationRowModel(),
    getSortedRowModel: isServerSide.sorting
      ? undefined
      : getSortedRowModel(),
    getFacetedRowModel: isServerSide.filtering
      ? undefined
      : getFacetedRowModel(),
    getFacetedUniqueValues: isServerSide.filtering
      ? undefined
      : getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <LeadTableFilters table={table} disabled={isLoading} />
      <DataTable
        data={data}
        columns={columns}
        table={table}
        isLoading={isLoading}
      />
      <DataTablePagination
        table={table}
        pageCount={pageCount}
      />
    </div>
  );
};

export default LeadsTable;
