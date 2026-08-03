import background from "../_assets/backBanner.png";
import men from "../_assets/menBanner.png";
import line from "../_assets/line.png";
import "../_style/Style.css";

import Image from "next/image";

const HomePageBanner = () => {
  return (
    <section className="relative w-full pt-20    overflow-hidden bg-[#F8F8FD] ">
      <div className="relative z-10 max-w-375 lg:px-9 md:px-6 px-3    mx-auto   flex flex-col lg:flex-row items-center justify-between ">
        <div className="w-full   lg:w-1/2 space-y-6 ">
          <h1 className="text-5xl bannerText sm:text-6xl lg:text-7xl font-semibold text-gray-800 leading-tight">
            Discover <br />
            more than{" "}
            <span className="text-[#26A4FF]  relative block">
              5000+ Services
              <Image src={line} className="mt-3" alt="" />
            </span>
          </h1>

          <div className="bg-banner ">
            <p className="text-gray-400 mb-6 max-w-md lg:mx-0">
              Find trusted professionals for all your home service needs. From
              plumbing and electrical repairs to cleaning and painting, book
              skilled technicians quickly and hassle-free.
            </p>

            <p className="text-sm my-7 text-gray-500">
              Popular: Plumbing, Electrical, Cleaning, Painting, AC Repair,
              Carpentry
            </p>
          </div>
        </div>

        <div className="relative w-[50%] lg:flex hidden pt-20 justify-end overflow-hidden">
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: `url(${background.src})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          />

          <Image src={men} alt="man" className=" z-10 object-contain" />
        </div>
      </div>
      <div className="absolute bottom-0 z-40 lg:flex hidden right-0 w-125 h-full bg-white triangle-shape"></div>
    </section>
  );
};

export default HomePageBanner;
