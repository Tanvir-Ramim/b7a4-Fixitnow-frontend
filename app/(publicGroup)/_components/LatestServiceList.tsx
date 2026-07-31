

import { getLatestService } from "../_acitons/getLatestServices";
import ServiceCard from "@/shared/components/ui/ServiceCard";
import { IService } from "../_types/AllTypes";

const LatestServiceList = async () => {
  const result = await getLatestService();
    
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {result?.data?.map((service: IService) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default LatestServiceList;
