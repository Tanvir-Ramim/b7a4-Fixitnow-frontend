import React from "react";
import DashboardLayout from "./_components/DashboardLayout";
import { getMe } from "@/shared/service/getMe";

const DashBoardGroupLayout =async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe();

  return <DashboardLayout 
   user={user?.data?.user}
  >{children}</DashboardLayout>;
};

export default DashBoardGroupLayout;
