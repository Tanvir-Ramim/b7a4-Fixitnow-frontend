import { getServices } from "../../_acitons/getServices";
import ServiceCard from "@/shared/components/ui/ServiceCard";
import { IService } from "../../_types/AllTypes";
import { SearchX } from "lucide-react";

const ServiceList = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const services = await getServices({ query });

  if (!services || services.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <SearchX className="h-10 w-10 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold text-gray-700">
          No services found
        </h3>
        <p className="max-w-sm text-sm text-gray-500">
          We couldn&apos;t find any services matching your search. Try
          adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 grid min-h-[50vh] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service: IService) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;