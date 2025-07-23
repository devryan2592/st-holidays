 "use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Lead } from "@/types/lead"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  
  // Filter options
  const statuses = [
    { label: "New", value: "New" },
    { label: "Followup", value: "Followup" },
    { label: "Potential", value: "Potential" },
    { label: "Positive", value: "Positive" },
    { label: "Converted", value: "Converted" },
    { label: "Closed", value: "Closed" },
  ]

  const types = [
    { label: "B2C", value: "B2C" },
    { label: "B2B", value: "B2B" },
  ]
  
  // Get unique destinations from data
  const destinations = Array.from(
    new Set(
      table.getFilteredRowModel().rows.flatMap(row => 
        (row.original as unknown as Lead).destinations || []
      )
    )
  ).map(dest => ({
    label: dest,
    value: dest,
  }))

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
        
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={types}
          />
        )}
        
        {table.getColumn("destinations") && (
          <DataTableFacetedFilter
            column={table.getColumn("destinations")}
            title="Destinations"
            options={destinations}
          />
        )}
        
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
