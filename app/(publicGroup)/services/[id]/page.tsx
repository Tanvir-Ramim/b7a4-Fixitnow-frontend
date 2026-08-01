import React from "react";
import SingleServiceDescription from "../_components/SingleServiceDescription";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <SingleServiceDescription id={id as string}></SingleServiceDescription>
    </div>
  );
};

export default page;
