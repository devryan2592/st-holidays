import { Badge } from "@/components/ui/badge";
import { FC } from "react";
import { Row } from "@tanstack/react-table";
import { Item } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { roundToNearestHours } from "date-fns";

interface StatusProps {
  // Add your props here
  row: Row<Item>;
}

const Status: FC<StatusProps> = ({ row }) => {
  const getStatus = () => {
    switch (row.getValue("status")) {
      case "Published":
        return "bg-primary text-primary-foreground";
      case "Internal":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-background text-muted-foreground border border-muted-foreground";
    }
  };

  return (
    <Badge className={cn(getStatus(), "px-2 py-1 rounded-full text-xs")}>
      {row.getValue("status")}
    </Badge>
  );
};

export default Status;
