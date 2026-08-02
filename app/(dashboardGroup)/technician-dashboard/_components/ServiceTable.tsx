import { IService } from "@/app/(publicGroup)/_types/AllTypes";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import DescriptionModal from "./DescriptionModal";

const ServiceTable = async ({ services }: { services: IService[] }) => {
  return (
    <div className="w-full min-h-[54vh] mt-2 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm customescroll">
      <table className="w-full min-w-[1100px] border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="p-4">Category</th>
            <th className="p-4">Service Name</th>
            <th className="p-4">Title</th>
            <th className="p-4">Price</th>
            <th className="p-4">Description</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.length > 0 ? (
            services.map((service) => (
              <tr
                key={service.id}
                className="border-t border-gray-200 transition hover:bg-gray-50"
              >
                <td className="p-4">{service.category?.name ?? "N/A"}</td>

                <td className="p-4 font-medium">{service.name}</td>

                <td className="max-w-xs truncate p-4">{service.title}</td>

                <td className="p-4 font-semibold text-green-600">
                  ৳{service.price}
                </td>

                <td className="max-w-sm p-4">
                  <DescriptionModal description={service.description} />
                </td>

                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/dashboard/services/${service.id}`}
                      className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                    >
                      <Eye size={18} />
                    </Link>

                    <Link
                      href={`/dashboard/services/edit/${service.id}`}
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button className="rounded-lg p-2 text-red-600 hover:bg-red-50">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-10 text-center text-gray-500">
                No services found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
