import { FC } from "react";
import { Row } from "@tanstack/react-table";
import { Item } from "@/lib/dummy-data";

interface NameDescriptionProps {
  // Add your props here
  row: Row<Item>;
}

const NameDescription: FC<NameDescriptionProps> = ({ row }) => {
  return (
    <div className="flex flex-col overflow-hidden ">
      <h4 className="font-medium text-base line-clamp-1">
        {row.original.name}
      </h4>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {row.original.description}
      </p>
    </div>
  );
};

export default NameDescription;
