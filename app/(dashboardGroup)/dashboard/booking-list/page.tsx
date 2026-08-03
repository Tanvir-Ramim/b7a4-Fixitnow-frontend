import { BookOpen } from "lucide-react";

import TableCustomerTable from "../_components/TableCustomerTable";

const page = () => {
  return (
    <div className="@container">
      <div className="flex mt-2   @sm:flex-row flex-col @sm:items-center justify-between">
        <div className="flex items-center gap-3    w-fit">
          <div className="md:px-3  px-2 border border-gray-300 md:py-3 py-2 bg-white   rounded-xl flex items-center justify-center">
            <BookOpen className="text-primary" />
          </div>

          <p className="md:text-xl text-lg font-bold text-gray-900 leading-tight">
            Booking List
          </p>
        </div>
      </div>

      <div className="bg-white md:px-6 px-4 md:py-3 border border-gray-300 rounded-xl mt-6 overflow-hidden">
        {/* <Suspense fallback={<TableSkeleton rows={6} length={6} />}>
          <ServiceTable userId={user.data.user.id} query={query} />
        </Suspense> */}
        <TableCustomerTable></TableCustomerTable>
      </div>
    </div>
  );
};

export default page;
