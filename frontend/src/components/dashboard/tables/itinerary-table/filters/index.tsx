import { Table } from "@tanstack/react-table"
import SearchFilter from "./options/search-filter"
import DestinationFilter from "./options/destination-filter"
import DurationFilter from "./options/duration-filter"
import PriceFilter from "./options/price-filter"
import StatusFilter from "./options/status-filter"
import { Item } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { Cross2Icon } from "@radix-ui/react-icons"

interface ItineraryTableFiltersProps {
    table: Table<Item>
}

function ItineraryTableFilters({
    table,
}: ItineraryTableFiltersProps) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <SearchFilter table={table} />
                <DestinationFilter table={table} />
                <DurationFilter table={table} />
                <PriceFilter table={table} />
                <StatusFilter table={table} />

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

export default ItineraryTableFilters

