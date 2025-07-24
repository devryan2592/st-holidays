import { FC, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { columns } from "@/components/dashboard/tables/leads-table/columns";
import { Lead } from "@/types/lead";
import DataTable from "../common/data-table";
import LeadTableFilters from "./filters";
import DataTablePagination from "../common/data-table/data-table-pagination";

interface LeadsTableProps {
  // Add your props here
  data: Lead[];
}

const LeadsTable: FC<LeadsTableProps> = ({ data }) => {
  // const [data, setData] = React.useState<Lead[]>(initialData.length ? initialData : leads)

  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      <LeadTableFilters table={table} />
      <DataTable data={data} columns={columns} table={table} />
      <DataTablePagination table={table} />
    </div>
  );
};

export default LeadsTable;
