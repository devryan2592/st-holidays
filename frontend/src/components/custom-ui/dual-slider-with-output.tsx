"use client";

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const DualSliderWithOutput = () => {
  const [value, setValue] = useState([25, 75]);

  return (
    <div className="space-y-3">
      <Slider
        value={value}
        onValueChange={setValue}
        aria-label="Dual range slider with output"
      />
      <div className="flex items-center justify-between gap-2">
        <output className="text-xs font-medium tabular-nums">
          Min: {value[0]}
        </output>
        <output className="text-xs font-medium tabular-nums">
          Max: {value[1]}
        </output>
      </div>
    </div>
  );
};

export default DualSliderWithOutput;
