// (dashboardGroup)/users/page.tsx
import { Users } from "lucide-react";
import { Suspense } from "react";
import TableSkeleton from "../../technician-dashboard/_components/TableSkeleton";
import UserTable from "../_components/UserTable";

const UsersPage = () => {
  return (
    <div className="@container">
      <div className="flex mt-2 @sm:flex-row flex-col @sm:items-center justify-between">
        <div className="flex items-center gap-3 w-fit">
          <div className="md:px-3 px-2 border border-gray-300 md:py-3 py-2 bg-white rounded-xl flex items-center justify-center">
            <Users className="text-primary" />
          </div>

          <p className="md:text-xl text-lg font-bold text-gray-900 leading-tight">
            User List
          </p>
        </div>
      </div>

      <div className="bg-white md:px-6 px-4 md:py-3 border border-gray-300 rounded-xl mt-6 overflow-hidden">
        <Suspense fallback={<TableSkeleton rows={6} length={5} />}>
          <UserTable />
        </Suspense>
      </div>
    </div>
  );
};

export default UsersPage;