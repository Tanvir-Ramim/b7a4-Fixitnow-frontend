import Navbar from "@/shared/components/shared/Navbar";
import { getMe } from "@/shared/service/getMe";
import React from "react";

const PublicGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMe();

  return (
    <div className="@container">
      <Navbar user={user?.data?.user}></Navbar>
      {children}
    </div>
  );
};

export default PublicGroupLayout;
