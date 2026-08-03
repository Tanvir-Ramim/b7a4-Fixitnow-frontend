import { getMe } from "@/shared/service/getMe";
import CustomerProfile from "./_components/CustomerProfile";
import { UserRoundArrowLeft } from "lucide-react";

const page = async () => {
  const user = await getMe();
  return (
    <div className="@container">
      <div className="flex mt-6   @sm:flex-row flex-col @sm:items-center justify-between">
        <div className="flex items-center gap-3    w-fit">
          <div className="md:px-3  px-2 border border-gray-300 md:py-3 py-2 bg-white   rounded-xl flex items-center justify-center">
            <UserRoundArrowLeft  className="text-primary" />
          </div>

          <p className="md:text-xl text-lg font-bold text-gray-900 leading-tight">
            My Profile
          </p>
        </div>
      </div>

      <div className=" mt-10  md:py-3  rounded-xl  overflow-hidden">
    
        <CustomerProfile user={user?.data?.user}></CustomerProfile>
      </div>
    </div>
  );
};

export default page;
