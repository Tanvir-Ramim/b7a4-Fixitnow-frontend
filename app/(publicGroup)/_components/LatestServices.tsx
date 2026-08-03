import { ArrowRight } from "lucide-react";



import Link from "next/link";
import LatestServiceList from "./LatestServiceList";
import { Suspense } from "react";
import ServiceCardSKl from "@/shared/components/ui/ServiceCardSKl";

const LatestServices = () => {
  return (
    <div
      // style={{
      //   backgroundImage: `url(${background})`,
      //   backgroundPosition: "",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      // }}
      className="bg-[#F8F8FD] mt-16  "
    >
      <div className="max-w-375 mx-auto  lg:px-9 md:px-6 px-3 md:pt-14 pt-10 md:pb-18 pb-12">
        <div className="flex  justify-between items-center">
          <h1 className="text-2xl bannerText sm:text-3xl lg:text-4xl font-bold tracking-widest">
            {" "}
            Latest <span className="text-[#26A4FF]">Services</span>
          </h1>

          <Link
            href="/services"
            className="text-primary  md:flex hidden  md:text-base text-sm font-semibold  items-center gap-2.5 "
          >
            Show All Service <ArrowRight className="md:text-lg " />
          </Link>
        </div>

        <Link
          href="/jobs"
          className="text-primary md:hidden flex mt-4 justify-end md:text-base text-sm font-semibold  items-center gap-2.5 "
        >
          Show all jobs <ArrowRight className="md:text-lg " />
        </Link>
        <Suspense fallback={<ServiceCardSKl></ServiceCardSKl>}>
          <LatestServiceList></LatestServiceList>
        </Suspense>
      </div>
    </div>
  );
};

export default LatestServices;
