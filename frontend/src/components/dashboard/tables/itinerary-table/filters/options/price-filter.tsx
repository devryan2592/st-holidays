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
import PriceRangeFilterPicker from "../../components/price-range-filter";

interface PriceFilterProps {
  children?: React.ReactNode;
  table: Table<Item>;
  disabled?: boolean;
}



const PriceFilter: FC<PriceFilterProps> = ({ 
  children, 
  table, 
  disabled = false 
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          disabled={disabled}
          className={disabled ? 'opacity-50' : ''}
        >
          <FilterIcon className="-ms-1 mr-1 opacity-90" size={16} aria-hidden="true" />
          Price
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-36 p-3" align="start">
        <PriceRangeFilterPicker 
          table={table} 
          items={dummyItems} 
          color="accent" 
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
};

export default PriceFilter;
