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
              5000+ Service Post
              <Image src={line} className="mt-3" alt="" />
            </span>
          </h1>

          <div className="bg-banner ">
            <p className="text-gray-400 mb-6 max-w-md lg:mx-0">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            {/* Search Box */}
            {/* <div className="bg-white z-30  shadow-lg sm:p-3 p-2 gap-4 flex flex-col sm:flex-row items-center  lg:mx-0">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  " />
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Job title"
                  className="w-full px-4 py-2 pl-10 outline-none text-gray-600 border-b border-gray-300"
                />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 cursor-pointer w-full px-4 py-2 outline-none text-gray-600 border-b border-gray-300"
              >
                <option value="">Select Category</option>
                {categories?.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                className="bg-primary cursor-pointer text-white px-6 py-2 transition duration-300 w-full sm:w-auto flex items-center justify-center gap-2 hover:bg-primary-dark"
              >
                <FaSearch className="text-sm" />
                <span>Search my job</span>
              </button>
            </div> */}
            <p className="text-sm my-7 text-gray-500">
              Popular : UI Designer, UX Researcher, Android, Admin
            </p>
          </div>
        </div>

        <div className="relative w-[50%] lg:flex hidden pt-20 justify-end overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${background})`,
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
