"use client";
import { FC } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  // Add your props here
  children?: React.ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  const { open } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <main
      className={cn(
        "fixed top-16 left-64 right-0 bottom-0 overflow-y-auto transition-all duration-300",
        !open && !isMobile && "top-12 left-16",
        isMobile && "top-16 left-0"
      )}
    >
      <div className="p-4 overflow-y-auto">{children}</div>
    </main>
  );
};

export default PageLayout;
