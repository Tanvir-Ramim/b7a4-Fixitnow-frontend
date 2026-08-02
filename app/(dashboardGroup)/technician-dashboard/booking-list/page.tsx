import { getCategoryService } from "@/app/(publicGroup)/_acitons/getCategoryService";
import { WrenchOff } from "lucide-react";
import Link from "next/link";
import ServiceTable from "../_components/ServiceTable";
import ServiceSearchBar from "@/app/(publicGroup)/services/_components/ServiceSearchBar";
import { getMe } from "@/shared/service/getMe";
import { getTechServices } from "../_actions/getTechServices";
import { Suspense } from "react";
import TableSkeleton from "../_components/TableSkeleton";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const categories = await getCategoryService();

  const user = await getMe();
  const query = await searchParams;
  const services = await getTechServices(user.data.user.id, query);

  return (
    <div className="@container">
      <div className="flex mt-2   @sm:flex-row flex-col @sm:items-center justify-between">
        <div className="flex items-center gap-3    w-fit">
          <div className="md:px-3  px-2 border border-gray-300 md:py-3 py-2 bg-white   rounded-xl flex items-center justify-center">
            <WrenchOff className="text-primary" />
          </div>

          <p className="md:text-xl text-lg font-bold text-gray-900 leading-tight">
            Job List
          </p>
        </div>

        <div className="flex justify-end h-fit @xl:mt-0 mt-3 gap-4">
          <Link href="/admin/create-job">
            <button
              className={`
        flex items-center  sm:gap-2 gap-0.5 rounded-lg  font-medium    cursor-pointer
     bg-primary  text-white
      sm:px-4 px-2  sm:py-2 py-1.5
        transition-all duration-200 
        hover:opacity-90
    
      `}
            >
              <span className=" md:text-base text-sm text-white">
                + Create Job
              </span>
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white md:px-6 px-4 md:py-3 border border-gray-300 rounded-xl mt-6 overflow-hidden">
        <ServiceSearchBar categories={categories} />

        <Suspense fallback={<TableSkeleton length={8} rows={6} ></TableSkeleton>}>
          <ServiceTable services={services}></ServiceTable>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
