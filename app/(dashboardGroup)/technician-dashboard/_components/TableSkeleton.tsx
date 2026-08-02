const TableSkeleton = ({ rows = 10 , length = 1 }: { rows?: number, length?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index} className="border-b border-[#E1E1E1]">
          {Array.from({ length }).map((_, colIndex) => (
            <td key={colIndex} className="md:p-4 p-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableSkeleton;