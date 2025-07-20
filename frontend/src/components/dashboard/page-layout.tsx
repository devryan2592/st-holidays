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
        "relayive mt-16 overflow-y-auto transition-all duration-300  max-h-[calc(100vh-64px)] h-full",
        !open && !isMobile && "mt-12 max-h-[calc(100vh-48px)]",
        isMobile && "mt-16 "
      )}
    >
      <div className={cn("p-4 overflow-y-auto")}>{children}</div>
    </main>
  );
};

export default PageLayout;
