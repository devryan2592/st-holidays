"use client";
import { FC, useId, useRef } from "react";
import { FilterFn, Table } from "@tanstack/react-table";
import { Item } from "@/lib/dummy-data";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CircleXIcon, ListFilterIcon } from "lucide-react";

interface SearchFilterProps<TData> {
  table: Table<TData>;
  disabled?: boolean;
}

// Custom filter function for multi-column searching
// fun const multiColumnFilterFn: FilterFn<Item> = (
//   row,
//   columnId,
//   filterValue: string
// ) => {
//   const searchableRowContent =
//     `${row.original.name} ${row.original.description}`.toLowerCase();
//   const searchTerm = (filterValue ?? "").toLowerCase();
//   return searchableRowContent.includes(searchTerm);
// };

function SearchFilter<TData>({ 
  table, 
  disabled = false 
}: SearchFilterProps<TData>) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <Input
        id={`${id}-input`}
        ref={inputRef}
        className={cn(
          "peer min-w-60 ps-9",
          Boolean(table.getColumn("name")?.getFilterValue()) && "pe-9"
        )}
        value={(table.getColumn("name")?.getFilterValue() ?? "") as string}
        onChange={(e) =>
          !disabled && table.getColumn("name")?.setFilterValue(e.target.value)
        }
        placeholder="Filter by name or email..."
        type="text"
        aria-label="Filter by name or email"
        disabled={disabled}
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <ListFilterIcon size={16} aria-hidden="true" />
      </div>
      {Boolean(table.getColumn("name")?.getFilterValue()) && (
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Clear filter"
          onClick={() => {
            table.getColumn("name")?.setFilterValue("");
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          <CircleXIcon size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default SearchFilter;
