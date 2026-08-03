"use client";

import { LucideSquareMenu } from "lucide-react";
import logo from "../../../shared/assets/Logo.png";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const AdminHeader = ({
  email,
  name,
  setSidebarOpen,
  sidebarOpen,
}: {
  email: string;
  name: string;
  setSidebarOpen: (value: boolean) => void;
  sidebarOpen: boolean;
}) => {
  const now = new Date();
  const hours = now.getHours();

  const getGreeting = () => {
    if (hours >= 5 && hours < 12) return "Good Morning";
    if (hours >= 12 && hours < 17) return "Good Afternoon";
    if (hours >= 17 && hours < 21) return "Good Evening";
    return "Good Night";
  };

  const formattedDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full bg-white shadow-black/5 shadow lg:px-9 md:px-6 px-3 pt-4 pb-3 z-50">
      <div className="flex items-center max-w-475 mx-auto justify-between">
        {/* Left */}
        <div className="flex items-center">
          <div className="lg:flex flex-col hidden">
            <h1 className="text-lg font-semibold capitalize text-gray-800">
              {getGreeting()} <span className="font-bold">{name}</span>
            </h1>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>

          {/* <div className="block items-center gap-2 sm:gap-4 lg:hidden">
            <h1 className=" pl-1.5 flex  items-center gap-2-0 ">
              <Link href="/">
                {" "}
                <Image src={logo} alt="Logo" />
              </Link>

              <h1 className="sm:text-2xl text-lg font-bold ">FixIt</h1>
            </h1>
          </div> */}
          <div className="block items-center gap-2 sm:gap-4 lg:hidden">
            <Link href="/">
              <h1 className=" pl-1.5 flex  items-center gap-2-0 ">
                {" "}
                <Image src={logo} alt="Logo" />
                <span className="sm:text-2xl text-lg font-bold ">FixIt</span>
              </h1>
            </Link>
          </div>
        </div>

        {/* Right Desktop */}
        <div className="hidden xl:flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="leading-tight capitalize font-medium">
                {name}
                <p className="text-xs mt-0.5 lowercase pt-1 text-gray-500">
                  {email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Mobile */}
        <div className="flex xl:hidden items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="i">
              <h1 className="capitalize">{name}</h1>
              <h1 className="text-xs">{email}</h1>
            </div>
            <button
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
              className="z-99999 block cursor-pointer rounded-sm bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
            >
              <LucideSquareMenu size={25} />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={profileRef}
        className={`xl:hidden absolute left-0 top-full w-full bg-white shadow-md z-40 transition-all duration-300 ${
          profileOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 p-4">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="leading-tight mt-1">
              {name} <span className="text-xs">{email}</span>
              <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
