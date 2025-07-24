// Leads table column definitions
import { ColumnDef } from "@tanstack/react-table";
import { Lead } from "@/types/lead";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RowActions } from "../row-actions";
import { format } from "date-fns";
import { destinationFilterFn } from "../filter-functions";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Lead>[] = [
  // Selection checkbox
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    size: 30,
    enableSorting: false,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  // Avatar
  {
    id: "avatar",
    header: "",
    size: 50,
    enableSorting: false,
    cell: ({ row }) => {
      const lead = row.original;
      return (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={lead.avatarUrl} alt={lead.name} />
            <AvatarFallback className="bg-gray-100">
              {lead.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  // Lead #
  {
    accessorKey: "id",
    header: "Lead #",
    cell: ({ row }) => <span className="font-medium">#{row.getValue("id")}</span>,
    size: 100,
  },
  // Name
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
    size: 150,
  },
  // Type
  {
    accessorKey: "type",
    header: "Type",
    size: 100,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs">
        {row.getValue("type")}
      </Badge>
    ),
  },
  // Status
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusClasses: Record<string, string> = {
        New: "bg-blue-100 text-blue-800",
        Followup: "bg-yellow-100 text-yellow-800",
        Potential: "bg-purple-100 text-purple-800",
        Positive: "bg-green-100 text-green-800",
        Converted: "bg-green-600 text-white",
        Closed: "bg-gray-100 text-gray-800",
      };
      return (
        <Badge className={`${statusClasses[status] || "bg-gray-100 text-gray-800"} text-xs`}>
          {status}
        </Badge>
      );
    },
  },
  // Destinations
  {
    accessorKey: "destinations",
    header: "Destination(s)",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.original.destinations?.join(", ") || "-"}
      </div>
    ),
    size: 200,
    filterFn: destinationFilterFn,
  },
  // Travelers
  {
    accessorKey: "travelers",
    header: "Travellers",
    size: 80,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("travelers")}</div>
    ),
  },
  // Budget
  {
    accessorKey: "budget",
    header: "Budget",
    size: 120,
    cell: ({ row }) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(row.getValue("budget"))),
  },
  // Assigned To
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    size: 150,
  },
  // Created
  {
    accessorKey: "createdAt",
    header: "Created",
    size: 100,
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("createdAt")), "dd MMM yyyy")}
      </div>
    ),
  },
  // Updated
  {
    accessorKey: "updatedAt",
    header: "Updated",
    size: 100,
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {format(new Date(row.getValue("updatedAt")), "dd MMM yyyy")}
      </div>
    ),
  },
  // Actions
  {
    id: "actions",
    header: "",
    size: 60,
    enableSorting: false,
    cell: ({ row }) => <RowActions row={row} />,
  },
];
