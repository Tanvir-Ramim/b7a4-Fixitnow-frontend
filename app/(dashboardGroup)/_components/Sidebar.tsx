import { useEffect, useRef } from "react";

import logo from "../../../shared/assets/Logo.png";
import Link from "next/link";
import Image from "next/image";
import { House, LogOut, SquareMenu } from "lucide-react";

import { ISidebarItem, sidebarMenuItems } from "../_config/sideBarMenuItem";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/shared/service/logout";
import { toast } from "sonner";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  role: string;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, role }: SidebarProps) => {
  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  let navItems: ISidebarItem[] = [];
  const router = useRouter();
  if (role === "CUSTOMER") {
    navItems = sidebarMenuItems.CUSTOMER;
  } else if (role === "TECHNICIAN") {
    navItems = sidebarMenuItems.TECHNICIAN;
  } else if (role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebar.current && !sidebar.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, setSidebarOpen]);
  const handleUserMenuAction = async (action: string) => {
    // if(action === "dashboard" ){
    //   if(user.data.profile.role === "USER"){
    //     router.push("/dashboard")
    //   }
    //   else if(user.data.profile.role === "AUTHOR"){
    //     router.push("/author-dashboard")
    //   }
    //   else if(user.data.profile.role === "ADMIN"){
    //     router.push("/admin-dashboard")
    //   }

    //   return;
    // }

    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      router.push("/login");
    }
  };

  return (
    <aside
      ref={sidebar}
      className={`fixed left-0 top-0 z-50 flex h-screen w-52 flex-col bg-white shadow-xl duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="flex border-b border-gray-300 items-center justify-center px-2 py-5 relative">
        <Link href="/">
          <div className="flex items-center gap-1.5">
            <Image className="lg:w-full w-[80%] " src={logo} alt="Logo" />
            <h1 className="sm:text-2xl text-lg font-bold ">FixIt</h1>
          </div>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute right-2 cursor-pointer text-2xl text-gray-600"
        >
          <SquareMenu size={30} />
        </button>
      </div>

      {/* Menu */}
      <div className="flex flex-1 items-center">
        <nav className="w-full px-4">
          <ul className="space-y-2">
            <li>
              <Link
                href={"/"}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 $
                  
                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                    `}
              >
                <House size={20} />
                <span>Home</span>
              </Link>
            </li>
            {navItems.map((item, index) => {
              const Icon = item.icon;

              const isRootItem = index === 0;

              const isActive = isRootItem
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Logout */}
      <div className="px-4 pb-6">
        <button
          onClick={async () => {
            await handleUserMenuAction("logout");
          }}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-50 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition"
        >
          <LogOut className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
