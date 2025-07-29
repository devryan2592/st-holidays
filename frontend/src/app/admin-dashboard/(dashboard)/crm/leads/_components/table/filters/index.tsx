import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Lead } from "@/types/lead";
import StatusFilter from "./options/status-filter";
import LeadTypeFilter from "./options/lead-type-filter";
import DestinationFilter from "./options/destination-filter";

interface LeadTableFiltersProps {
  table: Table<Lead>;
  disabled?: boolean;
}

const LeadTableFilters = ({ table, disabled = false }: LeadTableFiltersProps) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
          disabled={disabled}
        />
        {table.getColumn("status") && (
          <StatusFilter column={table.getColumn("status")} disabled={disabled} />
        )}
        {table.getColumn("type") && (
          <LeadTypeFilter column={table.getColumn("type")} disabled={disabled} />
        )}
        {table.getColumn("destinations") && (
          <DestinationFilter column={table.getColumn("destinations")} disabled={disabled} />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
            disabled={disabled}
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {table.getSelectedRowModel().rows.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              // TODO: Implement delete selected rows
              console.log(
                "Delete",
                table.getSelectedRowModel().rows.map((row) => row.original)
              );
            }}
            className="h-8"
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default LeadTableFilters;