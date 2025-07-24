"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "@/lib/dummy-data";
// import { multiColumnFilterFn, statusFilterFn } from "../filters";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import RowActions from "../row-actions";
import ImageColumn from "./image";
import NameDescription from "./name-description";
import Destination from "./destination";
import Duration from "./duration";
import Price from "./price";
import Status from "./status";
import { durationFilterFn } from "../filters/duration-filter";
import { priceFilterFn } from "../filters/price-filter";
import { statusFilterFn } from "../filters/status-filter";
import { destinationFilterFn } from "../filters/destination-filter";

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
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "",
    accessorKey: "image",
    cell: ({ row }) => <ImageColumn row={row} />,
    size: 100,
    enableHiding: false,
  },
  {
    id: "name",
    header: "Tour Name / Description",
    accessorFn: (row) => `${row.name}) ${row.description}`,
    cell: ({ row }) => <NameDescription row={row} />,
    size: 300,
    // filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Destinations",
    accessorKey: "destinations",
    cell: ({ row }) => <Destination row={row} />,
    size: 180,
    filterFn: destinationFilterFn,
  },
  {
    header: "Duration",
    accessorKey: "duration",
    cell: ({ row }) => <Duration row={row} />,
    size: 100,
    // filterFn: multiColumnFilterFn,
    filterFn: durationFilterFn,
    enableHiding: false,
  },
  {
    id: "price",
    header: "Price",
    accessorKey: "offer_price",
    cell: ({ row }) => <Price row={row} />,
    size: 100,
    filterFn: priceFilterFn,
    enableHiding: false,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <Status row={row} />,
    size: 100,
    filterFn: statusFilterFn,
  },

  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
];
