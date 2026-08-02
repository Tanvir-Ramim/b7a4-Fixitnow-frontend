type TableSkeletonProps = {
  length?: number;
  rows?: number;
};

const TableSkeleton = ({
  length = 6,
  rows = 6,
}: TableSkeletonProps) => {
  return (
    <div className="w-full min-h-[54vh] mt-2 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm animate-pulse">
      <table className="w-full min-w-275 border-collapse">
        {/* Header */}
        <thead>
          <tr className="border-b border-gray-200 bg-gray-100">
            {Array.from({ length }).map((_, i) => (
              <th key={i} className="p-4">
                <div className="h-4 w-24 rounded bg-gray-300" />
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {Array.from({ length: rows }).map((_, row) => (
            <tr key={row} className="border-b border-gray-100">

              <td className="p-4">
                <div className="h-4 w-24 rounded bg-gray-200" />
              </td>

    
              <td className="p-4">
                <div className="h-4 w-40 rounded bg-gray-200" />
              </td>

         
              <td className="p-4">
                <div className="h-4 w-56 rounded bg-gray-200" />
              </td>

       
              <td className="p-4">
                <div className="h-4 w-16 rounded bg-gray-200" />
              </td>

        
              <td className="p-4">
                <div className="h-4 w-32 rounded bg-gray-200" />
              </td>


              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-gray-200" />
                  <div className="h-9 w-9 rounded-lg bg-gray-200" />
                  <div className="h-9 w-9 rounded-lg bg-gray-200" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;