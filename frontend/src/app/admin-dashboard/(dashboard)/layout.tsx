import DashboardHeader from "@/components/dashboard/header";
import PageLayout from "@/components/dashboard/page-layout";
import DashboardSidebar from "@/components/dashboard/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
      <SidebarInset className="relative overflow-hidden ">
        <DashboardHeader />
        <PageLayout>{children}</PageLayout>
      </SidebarInset>
    </SidebarProvider>
  );
}
