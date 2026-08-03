import { getMe } from "@/shared/service/getMe";
import { UserRoundArrowLeft } from "lucide-react";
import React from "react";
import AdminProfile from "./_components/AdminProfile";

const page = async () => {
  const user = await getMe();
  return (
    <div className="@container">
      <div className="flex mt-6   @sm:flex-row flex-col @sm:items-center justify-between">
        <div className="flex items-center gap-3    w-fit">
          <div className="md:px-3  px-2 border border-gray-300 md:py-3 py-2 bg-white   rounded-xl flex items-center justify-center">
            <UserRoundArrowLeft className="text-primary" />
          </div>

          <p className="md:text-xl text-lg font-bold text-gray-900 leading-tight">
            My Profile
          </p>
        </div>
      </div>

      <div className=" mt-10  md:py-3  rounded-xl  overflow-hidden">
        <AdminProfile user={user?.data?.user}></AdminProfile>
      </div>
    </div>
  );
};

export default page;
