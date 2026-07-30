import { category } from "@/shared/utils/contentData";
import React from "react";
import CategoryCard from "./CategoryCard";

const HomePageCategory = () => {
  return (
    <div className="">
      <h1 className="text-2xl bannerText sm:text-3xl lg:text-4xl font-bold tracking-widest">
        {" "}
        Explore By <span className="text-[#26A4FF]">Category</span>
      </h1>
      <div className="grid md:mt-8 mt-6 md:gap-9 gap-4 @5xl:grid-cols-4 @3xl:grid-cols-3 @md:grid-cols-2 grid-cols-1">
        {category?.map((item) => (
          <CategoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HomePageCategory;
