import { getServices } from "../../_acitons/getServices";
import ServiceCard from "@/shared/components/ui/ServiceCard";
import { IService } from "../../_types/AllTypes";

const ServiceList = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const services = await getServices({ query });

  console.log(services);

  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services?.map((service: IService) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;
