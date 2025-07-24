"use client";

import { FC } from "react";


import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useId, useState } from "react";
import { Item } from "@/lib/dummy-data";
import { columns } from "./colums";
import DataTable from "../common/data-table";
import ItineraryTableFilters from "./filters";

interface ItineraryTableProps {
  // Add your props here
  data?: Item[];
}

const ItineraryTable: FC<ItineraryTableProps> = ({ data }) => {
  const id = useId();

  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
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




  const table = useReactTable({
    data: data || [],
    columns,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="space-y-4">
      <ItineraryTableFilters table={table} />
      <DataTable data={data || []} columns={columns} table={table} />
    </div>
  );
};

export default ItineraryTable;
