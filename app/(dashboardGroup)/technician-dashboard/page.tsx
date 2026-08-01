import { getMe } from "@/shared/service/getMe";
import React from "react";
import ProfileSection from "./_components/ProfileSection";

const page = async () => {
  const user = await getMe();

  return <div>
    <ProfileSection user={user?.data?.user}></ProfileSection>
  </div>;
};

export default page;
