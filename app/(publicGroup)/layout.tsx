import Navbar from "@/shared/components/shared/Navbar";
import React from "react";

const PublicGroupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default PublicGroupLayout;
