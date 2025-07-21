"use client";

import { useId } from "react";

import { useSliderWithInput } from "@/hooks/use-slider-with-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Item } from "@/lib/dummy-data";
import { Table } from "@tanstack/react-table";

interface PriceRangeFilterPickerProps {
  items: Item[];
  table: Table<Item>;
}

const PriceRangeFilterPicker = ({
  items,
  table,
}: PriceRangeFilterPickerProps) => {
  const id = useId();

  // Define the number of ticks
  const tick_count = 40;
  // Find the min and max values across all items
  const minValue = Math.min(...items.map((item) => item.offer_price));
  const maxValue = Math.max(...items.map((item) => item.offer_price));

  const initialPriceRange = (table.getColumn("price")?.getFilterValue() as [
    number,
    number
  ]) || [minValue, maxValue];

  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
  } = useSliderWithInput({
    minValue,
    maxValue,
    initialValue: initialPriceRange,
  }); // set initialValue: [minValue, maxValue] to show all items by default

  // Calculate the price step based on the min and max prices
  const priceStep = (maxValue - minValue) / tick_count;

  // Calculate item counts for each price range
  const itemCounts = Array(tick_count)
    .fill(0)
    .map((_, tick) => {
      const rangeMin = minValue + tick * priceStep;
      const rangeMax = minValue + (tick + 1) * priceStep;
      return items.filter(
        (item) => item.offer_price >= rangeMin && item.offer_price < rangeMax
      ).length;
    });

  // Find maximum count for scaling
  const maxCount = Math.max(...itemCounts);

  const handleSliderValueChange = (values: number[]) => {
    handleSliderChange(values);
  };

  // Function to count items in the selected range
  const countItemsInRange = (min: number, max: number) => {
    return items.filter(
      (item) => item.offer_price >= min && item.offer_price <= max
    ).length;
  };

  const isBarInSelectedRange = (
    index: number,
    minValue: number,
    priceStep: number,
    sliderValue: number[]
  ) => {
    const rangeMin = minValue + index * priceStep;
    const rangeMax = minValue + (index + 1) * priceStep;
    return (
      countItemsInRange(sliderValue[0], sliderValue[1]) > 0 &&
      rangeMin <= sliderValue[1] &&
      rangeMax >= sliderValue[0]
    );
  };

  return (
    <div className="*:not-first:mt-4">
      <div>
        {/* Histogram bars */}
        <div className="flex h-12 w-full items-end px-3" aria-hidden="true">
          {itemCounts.map((count, i) => (
            <div
              key={i}
              className="flex flex-1 justify-center"
              style={{
                height: `${(count / maxCount) * 100}%`,
              }}
            >
              <span
                data-selected={isBarInSelectedRange(
                  i,
                  minValue,
                  priceStep,
                  sliderValue
                )}
                className="bg-primary/20 size-full"
              ></span>
            </div>
          ))}
        </div>
        <Slider
          value={sliderValue}
          onValueChange={handleSliderValueChange}
          min={minValue}
          max={maxValue}
          aria-label="Price range"
        />
      </div>

      {/* Inputs */}
      <div className="flex items-center justify-between gap-4">
        <div className="*:not-first:mt-1">
          <Label htmlFor={`${id}-min`} className="text-xs">
            Min price:
          </Label>
          <div className="relative">
            <Input
              id={`${id}-min`}
              className="peer w-full ps-6"
              type="text"
              inputMode="decimal"
              value={inputValues[0]}
              onChange={(e) => handleInputChange(e, 0)}
              onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  validateAndUpdateValue(inputValues[0], 0);
                }
              }}
              aria-label="Enter minimum price"
            />
            <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
              $
            </span>
          </div>
        </div>
        <div className="*:not-first:mt-1">
          <Label htmlFor={`${id}-max`} className="text-xs">
            Max price:
          </Label>
          <div className="relative">
            <Input
              id={`${id}-max`}
              className="peer w-full ps-6"
              type="text"
              inputMode="decimal"
              value={inputValues[1]}
              onChange={(e) => handleInputChange(e, 1)}
              onBlur={() => validateAndUpdateValue(inputValues[1], 1)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  validateAndUpdateValue(inputValues[1], 1);
                }
              }}
              aria-label="Enter maximum price"
            />
            <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
              $
            </span>
          </div>
        </div>
      </div>

      {/* Button */}
      <Button
        className="w-full"
        variant="outline"
        onClick={() => {
          table.getColumn("price")?.setFilterValue(sliderValue);
        }}
      >
        Show {countItemsInRange(sliderValue[0], sliderValue[1])} items
      </Button>
    </div>
  );
};

export default PriceRangeFilterPicker;
