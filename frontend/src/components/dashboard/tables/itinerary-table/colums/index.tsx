"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import RowActions from "../row-actions";
import { destinationFilterFn, durationFilterFn, priceFilterFn } from "../filter-functions";

// Image, Name with desc, Destinations, duration, price, actions
export const columns: ColumnDef<Item>[] = [
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
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 30,

  },
  {
    header: "",
    accessorKey: "image",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center mr-4">
          <img
            className="aspect-video"
            src={row.getValue("image")}
            alt=""
          />
        </div>
      );
    },
    size: 80,
    enableHiding: false,
  },
  {
    id: "name",
    header: "Tour Name / Description",
    accessorFn: (row) => `${row.name}) ${row.description}`,
    cell: ({ row }) => {
      const original = row.original;
      return (
        <div className="flex flex-col overflow-hidden w-[90%]">
          <span className="font-medium line-clamp-1 ">
            {original.name}
          </span>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {original.description}
          </p>
        </div>
      );
    },
    size: 300,
    // filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Destination(s)",
    accessorKey: "destinations",
    cell: ({ row }) => <div className="max-w-[200px] truncate">
      {row.original.destinations?.join(", ") || "-"}
    </div>,
    size: 180,
    filterFn: destinationFilterFn,
  },
  {
    header: "Duration",
    accessorKey: "duration",
    cell: ({ row }) => <div className="">{row.original.duration} days</div>,
    size: 100,
    filterFn: durationFilterFn,
    enableHiding: false,
  },
  {
    id: "price",
    header: "Price",
    accessorKey: "offer_price",
    cell: ({ row }) => {
      const original = row.original;
      const price = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(original.offer_price));

      const actualPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(original.actual_price));

      return (
        <div className="flex flex-col gap-1">
          <div className="text-sm text-muted-foreground line-through">
            {actualPrice}
          </div>
          <div className="text-sm font-medium">{price}</div>
        </div>
      );
    },
    size: 100,
    filterFn: priceFilterFn,
    enableHiding: false,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusClasses: Record<string, string> = {
        Published: "bg-blue-100 text-blue-800",
        Internal: "bg-yellow-100 text-yellow-800",
        Draft: "bg-purple-100 text-purple-800",
      };
      return (
        <Badge className={`${statusClasses[status] || "bg-gray-100 text-gray-800"} text-xs`}>
          {status}
        </Badge>
      );
    },
    size: 120,
  },

  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
];
