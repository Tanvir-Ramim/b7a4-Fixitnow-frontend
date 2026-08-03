"use client";

import { useState } from "react";
import AdminHeader from "./AdminHeader";
import { IUser } from "@/app/(publicGroup)/_types/ProfileTypes";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  user,
  children,
}: {
  children: React.ReactNode;
  user: IUser;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden bg-[#F5F6FA]">
        <Sidebar
          role={user?.role}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="relative flex flex-1 flex-col overflow-hidden">
          <AdminHeader
            email={user?.email}
            name={user?.name}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="flex-1 overflow-y-auto">
            <div className="min-h-full p-3 md:p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
