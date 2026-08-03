import { CategoryType } from "@/app/(publicGroup)/_types/AllTypes";
export const getNavData = (role:string) => [
  { title: "Home", link: "/" },
  { title: "Services", link: "/services" },
  ...(role === "ADMIN"
    ? [{ title: "Dashboard", link: "/admin-dashboard" }]
    : role === "TECHNICIAN"
    ? [{ title: "Dashboard", link: "/technician-dashboard" }]
    : [{ title: "Dashboard", link: "/dashboard" }]),
];
export const category: CategoryType[] = [
  {
    id: 1,
    icon: "desing",
    title: "Design",
    total: "235 jobs available",
  },
  {
    id: 2,
    icon: "sales",
    title: "Sales",
    total: "756 jobs available",
  },
  {
    id: 3,
    icon: "maketing",
    title: "Maketing",
    total: "140 jobs available",
  },
  {
    id: 4,
    icon: "finance",
    title: "Finance",
    total: "325 jobs available",
  },
  {
    id: 5,
    icon: "technology",
    title: "Technology",
    total: "436 jobs available",
  },
  {
    id: 6,
    icon: "engineering",
    title: "Engineering",
    total: "542 jobs available",
  },
  {
    id: 7,
    icon: "business",
    title: "Business",
    total: "211 jobs available",
  },
  {
    id: 8,
    icon: "humanResource",
    title: "Human Resource",
    total: "211 jobs available",
  },
];
