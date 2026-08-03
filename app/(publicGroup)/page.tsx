import React from "react";
import HomePageBanner from "./_components/HomePageBanner";
import HomePageCategory from "./_components/HomePageCategory";
import StartPosting from "./_components/StartPosting";
import LatestServices from "./_components/LatestServices";


const page = () => {
  return (
    <div>
      <HomePageBanner></HomePageBanner>
      <div className="max-w-375 lg:px-9 md:px-6 px-3  md:space-y-18 space-y-12  mx-auto">
        <HomePageCategory></HomePageCategory>
        <StartPosting></StartPosting>
      </div>
      <LatestServices></LatestServices>
  
    </div>
  );
};

export default page;
