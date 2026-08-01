import Image from "next/image";
import hlw from "../_assets/hlw.webp";
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
    <div className="max-w-375 md:min-h-screen lg:px-9 md:px-6 px-3 md:pb-16 pb-12 pt-20 mx-auto">
      <Image src={hlw} alt="" />

      <div className="md:mt-2 mt-5">
        <h1 className="text-2xl bannerText sm:text-3xl lg:text-4xl font-bold tracking-widest">
          {" "}
          All <span className="text-[#26A4FF]">jobs</span>
        </h1>
      </div>
      <ServiceSearchBar categories={categories}></ServiceSearchBar>

      <div className="mt-9 ">
     
        <Suspense fallback={<ServiceCardSKl></ServiceCardSKl>}>
          <ServiceList searchParams={searchParams}></ServiceList>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
