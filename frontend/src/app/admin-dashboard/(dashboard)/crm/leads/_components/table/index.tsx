"use client";

import { FC, useEffect, useMemo, useState } from "react";
import {
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

import { Lead, LeadsQueryData } from "@/types/lead";
import { columns } from "./columns";
import DataTable from "@/components/common/data-table";

export interface LeadsTableProps {
  leadsData: LeadsQueryData | undefined;
  isLoading?: boolean;
}

const LeadsTable: FC<LeadsTableProps> = ({ leadsData, isLoading = false }) => {
  const [data, setData] = useState<Lead[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  useEffect(() => {
    if (leadsData) {
      setData(leadsData.data);
    }
  }, [leadsData]);

  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const updatedData = data.filter(
      (item) => !selectedRows.some((row) => row.original.id === item.id)
    );
    setData(updatedData);
    table.resetRowSelection();
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  console.log("leads Table", data);

  return (
    <div className="space-y-4">
      {/* <LeadTableFilters table={table} disabled={isLoading} /> */}
      {data && (
        <DataTable table={table} columns={columns} isLoading={isLoading} />
      )}
      {/* <DataTablePagination table={table} /> */}
    </div>
  );
};

export default LeadsTable;
