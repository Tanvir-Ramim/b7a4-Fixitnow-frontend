import {
 
  BookOpen,
  LucideProps,
  UserShield,
  CreditCard,
  WrenchOff,
  UsersRound,
  ChartBarStacked 
} from "lucide-react";
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
    icon: UserShield,
  },
  {
    label: "My Booking",
    href: "/dashboard/booking-list",
    icon: BookOpen,
  },
  {
    label: "Payment List",
    href: "/dashboard/payment-list",
    icon: CreditCard,
  },
];

const TECHNICIAN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Profile",
    href: "/technician-dashboard",
    icon: UserShield,
  },
  {
    label: "Booking List",
    href: "/technician-dashboard/booking-list",
    icon: BookOpen,
  },
  {
    label: "Service List",
    href: "/technician-dashboard/service-list",
    icon: WrenchOff,
  },
];
const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Profile",
    href: "/admin-dashboard",
    icon: UserShield,
  },
  {
    label: "User List",
    href: "/admin-dashboard/user-list",
    icon: UsersRound,
  },
  {
    label: "Category",
    href: "/admin-dashboard/category-list",
    icon: ChartBarStacked,
  },
];

export const sidebarMenuItems = {
  CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
  TECHNICIAN: TECHNICIAN_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
