"use client";
import { FC, Fragment } from "react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

import { getMenuList } from "@/lib/menu-list";

import { GalleryVerticalEnd, ChevronRight } from "lucide-react";
import Link from "next/link";
import DashboardSidebarFooter from "./sidebar-footer";

interface DashboardSidebarProps {
  // Add your props here
  children?: React.ReactNode;
}

const DashboardSidebar: FC<DashboardSidebarProps> = ({ children }) => {
  const menuList = getMenuList();
  const isMobile = useIsMobile();

  //   Dummy User
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://github.com/shadcn.png",
  };

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      side="left"
      className="border-r py-0"
    >
      {/* Sidebar Header */}
      <div className="h-screen max-h-screen flex flex-col">
        <div className="border-b">
          <SidebarHeader>
            <SidebarMenu className="border-sidebar-accent-foreground">
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link
                    href="/"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex flex-row items-center gap-2.5"
                  >
                    <div className="flex justify-center items-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                      <GalleryVerticalEnd />
                    </div>
                    <div className="grid flex-1 text-sm leading-tight text-left">
                      <span className="font-semibold truncate">
                        Smart Turn Holidays
                      </span>
                      <span className="text-xs truncate">Admin Dashboard</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
        </div>
        {/* Sidebar Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {menuList.map((item, index) => (
                <Fragment key={item.title + index}>
                  {item.items && item.items.length !== 0 ? (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.isActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span className="">{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    href={`/admin-dashboard${item.url}${subItem.url}`}
                                  >
                                    {subItem.icon && <subItem.icon />}
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip={item.title} asChild>
                        <Link href={`/admin-dashboard${item.url}`}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter>
          <DashboardSidebarFooter
            user={user}
            isMobile={isMobile}
            onLogout={() => {}}
          />
        </SidebarFooter>
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;
