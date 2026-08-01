import { FileText, LayoutDashboard, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const CUSTOMER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Profile",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Posts",
    href: "/dashboard/booking-list",
    icon: FileText,
  },
  {
    label: "Payment List",
    href: "/dashboard/payment-list",
    icon: FileText,
  },
];

const TECHNICIAN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Profile",
    href: "/technician-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Booking List",
    href: "/technician-dashboard/booking-list",
    icon: FileText,
  },
  {
    label: "Service List",
    href: "/technician-dashboard/service-list",
    icon: FileText,
  },
];
const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Profile",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "User List",
    href: "/admin-dashboard/user-list",
    icon: FileText,
  },
  {
    label: "Category",
    href: "/admin-dashboard/category-list",
    icon: FileText,
  }
];

export const sidebarMenuItems = {
  CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
  TECHNICIAN: TECHNICIAN_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
