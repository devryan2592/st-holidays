import { Row } from "@tanstack/react-table";
import { Lead } from "@/types/lead";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export function RowActions({ row }: { row: Row<Lead> }) {
  const lead = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            // TODO: Implement view lead details
            console.log("View lead:", lead.id);
          }}
        >
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            // TODO: Implement edit lead
            console.log("Edit lead:", lead.id);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => {
            // TODO: Implement delete lead
            if (confirm(`Delete lead #${lead.id}?`)) {
              console.log("Delete lead:", lead.id);
            }
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
