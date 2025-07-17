import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SortProps {
  // Add your props here
  children?: React.ReactNode;
}

const Sort: FC<SortProps> = ({ children }) => {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort" className="font-poppins text-sm font-medium ">
        Sort by:
      </Label>
      <Select>
        <SelectTrigger id="sort" className="w-[180px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
          <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="relevance">Relevance</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
