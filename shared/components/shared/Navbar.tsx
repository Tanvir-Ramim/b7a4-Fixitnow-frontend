"use client";

import { useEffect, useRef, useState } from "react";
import logo from "../../assets/Logo.png";
import { Menu, X } from "lucide-react";

import { navdata } from "@/shared/utils/contentData";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
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

  return (
    <div
      className={`fixed top-0 w-full z-9999    border-[#e2e9ee] transition-all ease-in-out duration-700 transform ${
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
              <Link href="/">
                <Image
                  alt="project logo"
                  //   width={400}
                  //   height={400}
                  src={logo}
                ></Image>
                {/* <img src={logo} alt="logo" className="" /> */}
              </Link>
            </div>

            {/* Middle */}
            <div className="hidden md:flex items-center gap-8">
              {navdata?.map((item, index) => (
                <Link
                  key={index}
                  href={item?.link}
                  className={`md:text-[18px] font-semibold text-[17px] ${
                    item?.title === "Home" ? "text-primary" : "text-[#5A5B5F]"
                  }`}
                >
                  {" "}
                  {item?.title}
                </Link>
                // <a
                //   key={index}
                //   href={item?.link}
                //   className={`md:text-[18px] font-semibold text-[17px] ${
                //     item?.title === "Home" ? "text-primary" : "text-[#5A5B5F]"
                //   }`}
                // >
                //   {item?.title}
                // </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button className="text-primary cursor-pointer font-semibold border-r px-4 border-gray-300">
                Login
              </button>
              <button className="bg-primary  cursor-pointer text-white py-1.5 font-semibold  px-4 border-gray-300">
                Sign Up
              </button>
            </div>

            <div className="flex md:hidden items-center  gap-4">
              <button
                onClick={toggleMenu}
                className=" cursor-pointer bg-white rounded-full  "
              >
                {menuOpen ? <Menu size={22} /> : <X size={22} />}
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
            </div>
            <div className=" pb-6 pt-3 flex items-center gap-6">
              <button className="text-primary text-sm cursor-pointer font-semibold border-r px-4 border-gray-300">
                Login
              </button>
              <button className="bg-primary text-sm cursor-pointer text-white py-1.5 font-semibold  px-4 border-gray-300">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
