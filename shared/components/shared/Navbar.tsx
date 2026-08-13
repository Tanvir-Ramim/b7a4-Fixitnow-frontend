"use client";

import { useEffect, useRef, useState } from "react";
import logo from "../../assets/Logo.png";
import { Menu, X, User, LogOut } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { IUser } from "@/app/(publicGroup)/_types/ProfileTypes";
import { toast } from "sonner";
import { logout } from "@/shared/service/logout";
import { usePathname, useRouter } from "next/navigation";
import { getNavData } from "@/shared/utils/contentData";
import Auth from "./Profile";

const Navbar = ({ user }: { user: IUser }) => {
  const navdata = getNavData(user?.role);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const router = useRouter();

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
      router.push("/");
    }
  };

  return (
    <div
      className={`fixed top-0 w-full z-9999    border  border-[#e2e9ee] transition-all ease-in-out duration-700 transform ${
        scrolling
          ? "shadow-lg bg-white translate-y-0 opacity-100"
          : "translate-y-0 opacity-100"
      }`}
    >
      <nav
        className={`new_container   transition-all relative  ease-in-out duration-700 ${
          scrolling ? "shadow-l" : "shadow-none"
        }`}
      >
        <div className="relative w-full     sm:py-4.5 py-3 z-50">
          <div className="flex items-center max-w-375 mx-auto lg:px-9 md:px-6 px-3   justify-between">
            {/* Left */}
            <div className="flex  items-center gap-2">
              <Link className="flex items-center gap-1" href="/">
                <Image
                  alt="project logo"
                  //   width={400}
                  //   height={400}
                  src={logo}
                ></Image>
                <h1 className="sm:text-2xl text-lg font-bold ">FixIt</h1>
                {/* <img src={logo} alt="logo" className="" /> */}
              </Link>
            </div>

            {/* Middle */}
            <div className="hidden md:flex items-center gap-8">
              {navdata.slice(0, 4).map((item, index) => (
                <Link
                  href={item?.link}
                  key={index}
                  className={`py-2 border-b border-gray-300 md:text-[18px] font-semibold text-[17px] ${
                    pathname === item?.link ? "text-primary" : "text-[#5A5B5F]"
                  }`}
                >
                  {item?.title}
                </Link>
              ))}
            </div>

            <div className="hidden  md:flex items-center">
              {user ? (
                <Auth navLink={navdata[4].link} user={user}></Auth>
              ) : (
                <div className="flex cursor-pointer items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full border border-[#004282]/20 text-[#004282] hover:bg-[#004282]/5 hover:border-[#004282]/40 transition-all duration-300">
                  <User size={15} />
                  <Link href={"/login"} className="text-sm font-medium">
                    Login
                  </Link>
                </div>
              )}
            </div>

            <div className="flex md:hidden items-center  gap-4">
              <div className="md:hidden  flex items-center">
                {user ? (
                  <Auth navLink={navdata[4].link} user={user}></Auth>
                ) : (
                  <div className="flex cursor-pointer items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full border border-[#004282]/20 text-[#004282] hover:bg-[#004282]/5 hover:border-[#004282]/40 transition-all duration-300">
                    <User size={15} />
                    <Link href={"/login"} className="text-sm font-medium">
                      Login
                    </Link>
                  </div>
                )}
              </div>

              <button
                onClick={toggleMenu}
                className=" cursor-pointer bg-white rounded-full  "
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          <div
            ref={menuRef}
            className={`md:hidden absolute left-0 top-full w-full bg-white shadow-lg z-50 transition-all duration-300 ${
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-3 pointer-events-none"
            }`}
          >
            <div className="flex flex-col gap-3 text-[16px] text-[#5A5B5F] p-4">
              {navdata?.map((item, index) => (
                <Link
                  href={item?.link}
                  key={index}
                  className="py-2  border-b border-gray-300 font-semibold"
                >
                  {item?.title}
                </Link>
              ))}

              {!user ? (
                <Link href="/login">
                  <button className="mt-4 w-full bg-primary text-white py-1.5 font-semibold">
                    Login
                  </button>
                </Link>
              ) : (
                <div className="mt-4 flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      <User size={14} />
                    </div>

                    <span className="text-sm font-medium">{user.name}</span>
                  </div>

                  <button
                    // onClick={handleLogout}
                    onClick={async () => {
                      await handleUserMenuAction("logout");
                    }}
                    className="text-red-500 cursor-pointer"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
