import { FC } from "react";
import { Row } from "@tanstack/react-table";
import { Item } from "@/lib/dummy-data";

interface DestinationProps {
  // Add your props here
  row: Row<Item>;
}

const Destination: FC<DestinationProps> = ({ row }) => {
  const destination = row.original.destinations.join(", ");
  console.log(destination);
  return (
    <div className="text-muted-foreground text-sm line-clamp-2">
      {destination}
    </div>
  );
};

export default Destination;
