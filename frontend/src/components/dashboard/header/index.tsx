"use client";
import { FC } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
// import ThemeToggle from "@/components/common/theme-toggle";
// import NotificationDropdown from "./notification-dropdown";
// import MessagesDropdown from "./messages-dropdown";
// import QuickAddDropdown from "./quick-add-dropdown";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  // Add your props here
  children?: React.ReactNode;
}

const DashboardHeader: FC<DashboardHeaderProps> = ({ children }) => {
  const { toggleSidebar, open } = useSidebar();
  const isMobile = useIsMobile();
  return (
    <header
      className={cn(
        "flex items-center justify-between h-16 border-b transition-all duration-300 py-2 absolute right-0 top-0 left-0 z-50 bg-sidebar-primary-foreground dark:bg-sidebar",
        !open && !isMobile && "h-12 left-0",
        isMobile && "h-16 left-0"
      )}
    >
      <div className="flex flex-1 items-center gap-2 justify-between ">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-2"
          >
            <Menu />
          </Button>
        </div>
        {/* <div className="flex items-center gap-2">
          <QuickAddDropdown />
          <div className="h-7 w-px bg-border mx-2" />
          <MessagesDropdown />
          <NotificationDropdown />
          <div className="h-7 w-px bg-border mx-2" />

          <ThemeToggle />
        </div> */}
      </div>
    </header>
  );
};

export default DashboardHeader;
