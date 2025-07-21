import { FC } from "react";
import { Row } from "@tanstack/react-table";
import { Item } from "@/lib/dummy-data";

interface PriceProps {
  // Add your props here
  row: Row<Item>;
}

const Price: FC<PriceProps> = ({ row }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm text-muted-foreground line-through">
        {row.original.actual_price}
      </div>
      <div className="text-sm font-medium">{row.original.offer_price}</div>
    </div>
  );
};

export default Price;
