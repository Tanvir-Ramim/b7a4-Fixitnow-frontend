import Image from "next/image";
import serviceBanner from "../_assets/serviceBanner.png";
import ServiceSearchBar from "./_components/ServiceSearchBar";
import { getCategoryService } from "../_acitons/getCategoryService";
import { Suspense } from "react";
import ServiceCardSKl from "@/shared/components/ui/ServiceCardSKl";
import ServiceList from "./_components/ServiceList";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const categories = await getCategoryService();
  return (
    <div className="md:min-h-screen md:pb-16 pb-12 sm:pt-22 pt-16">
      <div className="h-full ">
        <Image className="w-full  " src={serviceBanner} alt="" />
      </div>

      <div className="max-w-375  lg:px-9 md:px-6 px-3  mx-auto">
        <div className="md:mt-16 sm:mt-12 mt-8">
          <h1 className="text-2xl bannerText sm:text-3xl lg:text-4xl font-bold tracking-widest">
            {" "}
            All <span className="text-[#26A4FF]">Serviecs</span>
          </h1>
        </div>
        <ServiceSearchBar categories={categories}></ServiceSearchBar>

        <div className="mt-9 ">
          <Suspense fallback={<ServiceCardSKl></ServiceCardSKl>}>
            <ServiceList searchParams={searchParams}></ServiceList>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
