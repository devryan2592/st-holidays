"use client";

import { FC, useId, useMemo } from "react";

import { FilterFn, Table } from "@tanstack/react-table";
import { Item } from "@/lib/dummy-data";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DestinationFilterProps {
  table: Table<Item>;
}

const destinationList = ["Thailand", "Singapore", "Malaysia", "Dubai", "Bali"];

export const destinationFilterFn: FilterFn<Item> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const destinations = row.getValue(columnId) as string[];
  return filterValue.some((filterDest) => destinations.includes(filterDest));
};

const DestinationFilter: FC<DestinationFilterProps> = ({ table }) => {
  const id = useId();

  const destinationCounts = useMemo(() => {
    const counts = new Map<string, number>();
    const destinationColumn = table.getColumn("destinations");
    if (!destinationColumn) return counts;

    const uniqueValues = Array.from(
      destinationColumn.getFacetedUniqueValues().keys()
    ) as string[];

    let destinationArray: string[] = [];
    Object.values(uniqueValues).forEach((key) => {
      destinationArray.push(...key);
    });


    destinationArray.forEach((dest) => {
      counts.set(dest, destinationArray.filter((d) => d === dest).length);
    });


    return counts;
  }, [table.getColumn("destinations")?.getFacetedUniqueValues()]);

  const selectedDestinations = useMemo(() => {
    const filterValue = table
      .getColumn("destinations")
      ?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("destinations")?.getFilterValue()]);

  const handleDestinationChange = (checked: boolean, value: string) => {
    const filterValue = table
      .getColumn("destinations")
      ?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table
      .getColumn("destinations")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FilterIcon
            className="-ms-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Destination
          {selectedDestinations.length > 0 && (
            <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
              {selectedDestinations.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-40 p-3" align="start">
        <div className="space-y-3">
          <div className="text-muted-foreground text-xs font-medium">
            Filters
          </div>
          <div className="space-y-3">
            {destinationList.map((value, i) => (
              <div key={value} className="flex items-center gap-2">
                <Checkbox
                  id={`${id}-${i}`}
                  checked={selectedDestinations.includes(value)}
                  onCheckedChange={(checked: boolean) =>
                    handleDestinationChange(checked, value)
                  }
                />
                <Label
                  htmlFor={`${id}-${i}`}
                  className="flex grow justify-between gap-2 font-normal"
                >
                  {value}{" "}
                  <span className="text-muted-foreground ms-2 text-xs">
                    ({destinationCounts.get(value)})
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DestinationFilter;
