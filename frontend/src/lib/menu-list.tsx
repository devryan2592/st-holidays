import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  UserPlus,
  Eye,
} from "lucide-react";

type SubMenuItems = {
  title: string;
  url: string;
  icon?: LucideIcon;
};

type MenuList = {
  title: string;
  url: string;
  isActive?: boolean;
  icon?: LucideIcon;
  items?: SubMenuItems[];
};

export function getMenuList(): MenuList[] {
  return [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutGrid,
    },
    {
      title: "CRM",
      url: "/crm",
      isActive: true,
      icon: Users,
      items: [
        {
          title: "Contacts",
          url: "/contacts",
          icon: Users,
        },
        {
          title: "Leads",
          url: "/leads",
          icon: Users,
        },
      ],
    },

    {
      title: "Content",
      url: "/content",
      icon: SquarePen,
      items: [
        {
          title: "Posts",
          url: "/posts",
          icon: SquarePen,
        },
        {
          title: "Categories",
          url: "/categories",
          icon: Bookmark,
        },
        {
          title: "Tags",
          url: "/tags",
          icon: Tag,
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "Users",
          url: "/users",
          icon: Users,
        },
      ],
    },
  ];
}
