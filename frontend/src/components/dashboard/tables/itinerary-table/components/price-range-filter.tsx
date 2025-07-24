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
  color?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
}

const PriceRangeFilterPicker = ({
  items,
  table,
  color = "primary",
  disabled = false
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
    disabled,
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
    <div className="*:not-first:mt-4 mt-4">
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
                className={`bg-${color}/20 size-full`}
              ></span>
            </div>
          ))}
        </div>
        <Slider
          min={minValue}
          max={maxValue}
          step={priceStep}
          value={sliderValue}
          onValueChange={disabled ? undefined : handleSliderChange}
          minStepsBetweenThumbs={1}
          className={`py-4 ${disabled ? 'opacity-50' : ''}`}
          data-color={color}
          disabled={disabled}
        />
      </div>

      {/* Inputs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="grid gap-1.5">
            <Label htmlFor={`${id}-min`}>Min</Label>
            <Input
              id={`${id}-min`}
              type="number"
              min={minValue}
              max={maxValue}
              value={inputValues[0]}
              onChange={(e) => !disabled && handleInputChange(e, 0)}
              className="h-8 w-24"
              disabled={disabled}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={`${id}-max`}>Max</Label>
            <Input
              id={`${id}-max`}
              type="number"
              min={minValue}
              max={maxValue}
              value={inputValues[1]}
              onChange={(e) => !disabled && handleInputChange(e, 1)}
              className="h-8 w-24"
              disabled={disabled}
            />
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
