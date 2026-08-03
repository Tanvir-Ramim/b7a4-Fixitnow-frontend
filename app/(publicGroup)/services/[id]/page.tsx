import React from "react";
import SingleServiceDescription from "../_components/SingleServiceDescription";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className=" max-w-375 mx-auto sm:pt-18   px-3 pt-14">
      <SingleServiceDescription id={id as string}></SingleServiceDescription>
    </div>
  );
};

export default page;
