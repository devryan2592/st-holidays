import { FC } from "react";
import { Table } from "@tanstack/react-table";
import { Item } from "@/lib/dummy-data";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

interface PriceFilterProps {
  // Add your props here
  children?: React.ReactNode;
  table: Table<Item>;
}

const PriceFilter: FC<PriceFilterProps> = ({ children, table }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FilterIcon
            className="-ms-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Price
          {/* {table.getColumn("price")?.getFilterValue() && (
                  <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    {`$${(table.getColumn("price")?.getFilterValue() as [number, number])[0]} - $${(table.getColumn("price")?.getFilterValue() as [number, number])[1]}`}
                  </span>
                )} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-36 p-3" align="start">
        {/* <PriceRangePicker
                minPrice={0}
                maxPrice={1000}
                onPriceChange={(value) =>
                  table.getColumn("price")?.setFilterValue(value)
                }
                initialPriceRange={table.getColumn("price")?.getFilterValue() as [number, number] || [0, 1000]}
              /> */}
      </PopoverContent>
    </Popover>
  );
};

export default PriceFilter;
