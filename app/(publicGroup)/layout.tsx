import Navbar from "@/shared/components/shared/Navbar";
import { getMe } from "@/shared/service/getMe";
import React from "react";
import Footer from "./_components/Footer";

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
          <Footer></Footer>
    </div>
  );
};

export default PublicGroupLayout;
