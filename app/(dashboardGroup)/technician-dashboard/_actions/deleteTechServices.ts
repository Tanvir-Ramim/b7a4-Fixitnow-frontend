"use server";


import { cookies } from "next/headers";

export const deleteService = async (serviceId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/service/${serviceId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to delete service");
  }


  return result;
};
