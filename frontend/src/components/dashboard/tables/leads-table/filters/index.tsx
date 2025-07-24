"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lead } from "@/types/lead"
import DestinationFilter from "./options/destination-filter"
import StatusFilter from "./options/status-filter"
import LeadTypeFilter from "./options/lead-type-filter"

interface LeadTableFiltersProps<TData> {
  table: Table<TData>
}

function LeadTableFilters<TData>({
  table,
}: LeadTableFiltersProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter leads..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <StatusFilter table={table} />
        <LeadTypeFilter table={table} />
        <DestinationFilter table={table} />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {table.getSelectedRowModel().rows.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="h-8"
            onClick={() => {
              // Handle bulk delete
              const selectedIds = table.getSelectedRowModel().rows.map(row => (row.original as unknown as Lead).id)
              console.log('Deleting:', selectedIds)
              // TODO: Implement actual delete logic
            }}
          >
            Delete ({table.getSelectedRowModel().rows.length})
          </Button>
        )}
      </div>
    </div>
  )
}

export default LeadTableFilters