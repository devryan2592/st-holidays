import { FC } from "react";
import { Row } from "@tanstack/react-table";
import { Item } from "@/lib/dummy-data";

interface DurationProps {
  // Add your props here
  row: Row<Item>;
}

const Duration: FC<DurationProps> = ({ row }) => {
  return (
    <p className="text-sm text-muted-foreground">{row.original.duration}</p>
  );
};

export default Duration;
