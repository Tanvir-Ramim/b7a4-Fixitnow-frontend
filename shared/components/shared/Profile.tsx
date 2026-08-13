import React, { useEffect, useRef, useState } from "react";

import { LogOut, Gauge } from "lucide-react";
import { logout } from "@/shared/service/logout";
import { toast } from "sonner";
import { IUser } from "@/app/(publicGroup)/_types/ProfileTypes";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AuthProps {
  user: IUser;
  navLink: string;
}

const Auth = ({ user, navLink }: AuthProps) => {
  const [auth, setAuthOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleAuth = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setAuthOpen((prevAuth) => !prevAuth);
  };

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(target) &&
      !target.closest(".cursor-pointer")
    ) {
      setAuthOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      toast.success("User Logged Out Successfully!");
      setAuthOpen(false);
      router.push("/");
    }
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div>
      <ul>
        <li className="relative group px-1">
          <div className="cursor-pointer" onClick={toggleAuth}>
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#004282] to-[#0066c7] ring-2 ring-transparent hover:ring-[#004282]/25 flex items-center justify-center transition-all duration-300 shadow-sm">
              <span className="text-sm font-semibold text-white">
                {initial}
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
          </div>

          <div
            ref={dropdownRef}
            className={`bg-white z-20 shadow-2xl rounded-2xl py-5 px-5 sm:min-w-[300px] max-sm:min-w-[260px]
              absolute md:right-0 -right-7 top-14 border border-gray-100
              transform transition-all duration-300 ease-in-out
              ${
                auth
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#004282]/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-[#004282]">
                    {initial}
                  </span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold capitalize text-[15px] text-gray-800 truncate">
                    {user?.name}
                  </h4>
                  {user?.email && (
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                title="Logout"
                aria-label="Logout"
                onClick={async () => {
                  await handleUserMenuAction("logout");
                }}
                className="shrink-0 cursor-pointer text-red-500 rounded-lg p-2 hover:bg-red-50 transition-all"
              >
                <LogOut size={17} />
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Good to see you again.
            </p>

            <hr className="border-gray-100 my-3" />

            <ul className="space-y-2">
              <li>
                <Link
                  href={navLink}
                  onClick={() => setAuthOpen(false)}
                  className="w-full bg-[#004282] cursor-pointer text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:bg-[#003568] transition-all"
                >
                  <Gauge size={16} /> Go to Profile
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Auth;
