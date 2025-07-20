import { FC } from "react";
import PageBreadcrumb from "./page-breadcrumb";

interface PageHeaderProps {
  // Add your props here
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ children, title, description }) => {
  return (
    <div className="flex flex-col gap-4">
      <PageBreadcrumb />
      <div>
        <h1 className="font-poppins tracking-tight font-bold text-2xl">
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default PageHeader;
