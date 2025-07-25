import { FC } from "react";
import PageBreadcrumb from "./page-breadcrumb";
import { buttonVariants } from "../ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  // Add your props here
  children?: React.ReactNode;
  title?: string;
  description?: string;
  newButtonPath?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ children, title, description, newButtonPath }) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <PageBreadcrumb />
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-poppins tracking-tight font-bold text-2xl">
            {title}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {newButtonPath && (

          <Link href={newButtonPath} className={cn(buttonVariants({ variant: "outline" }), "aspect-square max-sm:p-0")}>
            <PlusIcon className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
            <span className="max-sm:sr-only">Add new</span>
          </Link>
        )}
      </div>
    </div>

  );
};

export default PageHeader;
