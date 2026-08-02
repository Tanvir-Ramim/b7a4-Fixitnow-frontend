// _components/CategoryTable.tsx
import { ICategory } from "@/app/(publicGroup)/_types/AllTypes";
import { getCategoryService } from "../_actions/categoryAction";
import CategoryDeleteButton from "./CategoryDeleteButton";


const CategoryTable = async () => {
  const categories = await getCategoryService();

  return (
    <div className="w-full min-h-[54vh] mt-2 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm customescroll">
      <table className="w-full min-w-175 border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="p-4">Name</th>
            <th className="p-4">Description</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length > 0 ? (
            categories.map((category: ICategory) => (
              <tr
                key={category.id}
                className="border-t border-gray-200 transition hover:bg-gray-50"
              >
                <td className="p-4 font-medium">{category.name}</td>
                <td className="p-4">{category.sortDescriptoin}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <CategoryDeleteButton categoryId={category.id} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-10 text-center text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;