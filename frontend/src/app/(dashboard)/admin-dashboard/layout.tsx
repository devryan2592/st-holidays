import DashboardSidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

interface DashboardLayoutLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayoutLayout({
  children,
}: DashboardLayoutLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      {children}
    </SidebarProvider>
  );
}
