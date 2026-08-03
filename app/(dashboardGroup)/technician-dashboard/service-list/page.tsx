import { getCategoryService } from "@/app/(publicGroup)/_acitons/getCategoryService";
import { WrenchOff } from "lucide-react";
import ServiceTable from "../_components/ServiceTable";
import ServiceSearchBar from "@/app/(publicGroup)/services/_components/ServiceSearchBar";
import { getMe } from "@/shared/service/getMe";

import { Suspense } from "react";
import TableSkeleton from "../_components/TableSkeleton";
import AddServiceModal from "../_components/AddServiceModal";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const categories = await getCategoryService();

  const user = await getMe();
  const query = await searchParams;

  return (
    <div className="@container">
      <div className="flex mt-2   @sm:flex-row flex-col @sm:items-center justify-between">
        <div className="flex items-center gap-3    w-fit">
          <div className="md:px-3  px-2 border border-gray-300 md:py-3 py-2 bg-white   rounded-xl flex items-center justify-center">
            <WrenchOff className="text-primary" />
          </div>

          <p className="md:text-xl text-lg font-bold text-gray-900 leading-tight">
            Service List
          </p>
        </div>

        <div className="flex @xl:justify-end h-fit @xl:mt-0 mt-3 gap-4">
          <AddServiceModal categories={categories}></AddServiceModal>
        </div>
      </div>

      <div className="bg-white md:px-6 px-4 md:py-3 border border-gray-300 rounded-xl mt-6 overflow-hidden">
        <ServiceSearchBar categories={categories} />

        <Suspense fallback={<TableSkeleton rows={6} length={6} />}>
          <ServiceTable userId={user.data.user.id} query={query} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
