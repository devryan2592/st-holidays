"use client"

import { useMemo } from "react"

import { Check, FilterIcon } from "lucide-react"
import { Column } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export interface FacetedFilterOption {
  label: string
  value: string
  count: number
  icon?: React.ComponentType<{ className?: string }>
}

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: FacetedFilterOption[]
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  
  // Current selected values
  const uniqueValues = useMemo(() => new Set(column?.getFilterValue() as string[]), [column?.getFilterValue()])
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 ">
          <FilterIcon className="-ms-1 mr-1 opacity-90" size={16} aria-hidden="true"/>
          {title}
          {uniqueValues?.size > 0 && (
            <span className="bg-background text-muted-foreground ml-1 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
            {uniqueValues.size}
          </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] min-w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = uniqueValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        uniqueValues.delete(option.value)
                      } else {
                        uniqueValues.add(option.value)
                      }
                      const filterValues = Array.from(uniqueValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                    className={cn(
                      "group data-[selected=true]:bg-accent/90 cursor-pointer",
                    )}
                  >

                    
                    <div
                      className={cn(
                        "flex min-h-4 min-w-4 items-center justify-center group-data-[selected=true]:border-primary-foreground border border-accent",
                        isSelected ? "bg-accent" : ""  
                      )}
                    >
                      {isSelected && (
                        <Check size={4} className={cn(" group-data-[selected=true]:text-primary-foreground m1", isSelected ? "text-primary-foreground" : "")} />
                      )}
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="group-data-[selected=true]:text-white">{option.label}</span>
                    {option.count && (
                      <span className="ml-auto flex h-4 w-4 items-center text-muted-foreground text-xs justify-center font-mono group-data-[selected=true]:text-primary-foreground">
                        ({option.count})
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {uniqueValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
