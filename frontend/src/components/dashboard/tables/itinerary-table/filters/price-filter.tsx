import { FC } from "react";
import { FilterFn, Table } from "@tanstack/react-table";
import { dummyItems, Item } from "@/lib/dummy-data";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import PriceRangeFilterPicker from "../components/price-range-filter";

interface PriceFilterProps {
  // Add your props here
  children?: React.ReactNode;
  table: Table<Item>;
}

export const priceFilterFn: FilterFn<Item> = (
  row,
  columnId,
  filterValue: [number, number]
) => {
  // Min Max Price
  const price = row.getValue(columnId) as number;
  const [min, max] = filterValue;
  return price >= min && price <= max;
};

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
        <PriceRangeFilterPicker table={table} items={dummyItems} />
      </PopoverContent>
    </Popover>
  );
};

export default PriceFilter;
