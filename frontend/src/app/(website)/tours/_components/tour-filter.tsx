import DualSliderWithOutput from "@/components/custom-ui/dual-slider-with-output";
import PriceRangePicker from "@/components/custom-ui/price-range-picker";
import SearchSelect from "@/components/custom-ui/search-select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal } from "lucide-react";
import { FC } from "react";

interface TourFilterProps {
  // Add your props here
  children?: React.ReactNode;
}

const TourFilter: FC<TourFilterProps> = ({ children }) => {
  return (
    <aside className="border p-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-row items-center gap-2 ">
          <SlidersHorizontal size={15} className="stroke-[1.5px]" />
          <p className="font-medium">Filter Your Tour</p>
        </div>
        <Button
          variant="link"
          className="px-2 py-1 m-0 text-sm text-muted-foreground hover:text-primary cursor-pointer transition duration-300"
        >
          Clear All
        </Button>
      </div>
      <Separator className="" />
      <div className="py-4 space-y-6">
        <div>
          <Label className="font-poppins text-sm font-medium pl-1 pb-2">
            Destination
          </Label>
          <SearchSelect />
        </div>
        <Separator className="" />

        <div>
          <Label className="font-poppins text-sm font-medium pl-1 pb-2">
            Price Range
          </Label>
          <PriceRangePicker />
        </div>
        <Separator className="" />

        <div>
          <Label className="font-poppins text-sm font-medium pl-1 pb-2">
            Tour Duration
          </Label>
          <DualSliderWithOutput />
        </div>
        <Separator className="" />

        <div>
          <Label className="font-poppins text-sm font-medium pl-1 pb-2">
            Tour Type
          </Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="custom" />
              <label
                htmlFor="custom"
                className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Customized Holidays
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="group" />
              <label
                htmlFor="group"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Group Holidays
              </label>
            </div>
          </div>
        </div>

        <Separator className="" />

        <div>
          <Label
            htmlFor="category"
            className="font-poppins text-sm font-medium pl-1 pb-2"
          >
            Tour Category
          </Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Family
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Honeymoon
              </label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default TourFilter;
