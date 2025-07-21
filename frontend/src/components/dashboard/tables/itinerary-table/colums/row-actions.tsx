import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Item } from "@/lib/dummy-data";
import { Row } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";
import DeleteAlert from "../components/delete-alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Actions: View, Edit, Duplicate, Download (PDF Create), Share, Add to favorites, Delete

const RowActions = ({ row }: { row: Row<Item> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="shadow-none"
            aria-label="Edit item"
          >
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>View</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Duplicate</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Download</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Share</span>
          </DropdownMenuItem>
          <DropdownMenuItem>Add to favorites</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DeleteAlert>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
            }}
            variant="destructive"
            // className="hover:bg-destructive/50 text-destructive focus:bg-destructive focus:text-white"
          >
            Delete
          </DropdownMenuItem>
        </DeleteAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowActions;
