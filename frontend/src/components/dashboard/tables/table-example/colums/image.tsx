import { FC } from "react";
import { Row } from "@tanstack/react-table";
import { Item } from "@/lib/dummy-data";

interface ImageColumnProps {
  // Add your props here
  row: Row<Item>;
}

const ImageColumn: FC<ImageColumnProps> = ({ row }) => {
  return (
    <div className="flex items-center justify-center bg-primary-foreground/10">
      <img
        className="min-w-20 min-h-14 max-h-14"
        src={row.getValue("image")}
        alt=""
      />
    </div>
  );
};

export default ImageColumn;
