import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { Lead } from "@/types/lead";
import { destinationFilterFn } from "../filters/filter-functions";
import RowActions from "./row-actions";

export const columns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "avatar",
    header: "",
    cell: ({ row }) => {
      const lead = row.original;
      return (
        <Avatar className="h-8 w-8">
          <AvatarImage src={lead.avatar} alt={lead.contactName} />
          <AvatarFallback>{lead.contactName?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      );
    },
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "id",
    header: "Lead #",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return <div className="font-medium">{id}</div>;
    },
    size: 100,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const lead = row.original;

      return (
        <div className="flex flex-col">
          <span className="font-medium">{lead.contactName}</span>
          {lead.companyName && (
            <span className="text-xs text-muted-foreground">
              {lead.companyName}
            </span>
          )}
        </div>
      );
    },
    size: 150,
  },
  {
    accessorKey: "leadType",
    header: "Lead Type",
    cell: ({ row }) => {
      const type = row.getValue("leadType") as string;
      return (
        <Badge variant="outline" className="capitalize">
          {type.toUpperCase()}
        </Badge>
      );
    },
    size: 100,
  },
  {
    accessorKey: "travelType",
    header: "Travel Type",
    cell: ({ row }) => {
      const type = row.getValue("travelType") as string;
      return (
        <Badge variant="outline" className="capitalize">
          {type.toLowerCase()}
        </Badge>
      );
    },
    size: 100,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className="capitalize"
          variant={
            status === "new"
              ? "default"
              : status === "contacted"
              ? "secondary"
              : status === "qualified"
              ? "outline"
              : status === "proposal"
              ? "destructive"
              : "default"
          }
        >
          {status.toLowerCase()}
        </Badge>
      );
    },
    size: 100,
  },
  {
    accessorKey: "destinations",
    header: "Destination(s)",
    cell: ({ row }) => {
      const destinations = row.getValue("destinations") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {destinations.map((destination) => (
            <Badge key={destination} variant="outline" className="capitalize">
              {destination.toLowerCase()}
            </Badge>
          ))}
        </div>
      );
    },
    filterFn: destinationFilterFn,
    size: 300,
  },
  {
    accessorKey: "numTravelers",
    header: "Travelers",
    cell: ({ row }) => {
      const travellers = row.getValue("numTravelers") as number;
      return <div className="text-center">{travellers}</div>;
    },
    size: 100,
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => {
      const budget = parseFloat(row.getValue("budget"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(budget);

      return <div className="text-left font-medium">{formatted}</div>;
    },
    size: 100,
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      const assignedTo = row.getValue("assignedTo") as string;
      return <div>{assignedTo}</div>;
    },
    size: 150,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return <div>{format(date, "MMM dd, yyyy")}</div>;
    },
    size: 100,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date;
      return <div>{format(date, "MMM dd, yyyy")}</div>;
    },
    size: 100,
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />,
    size: 40,
  },
];
