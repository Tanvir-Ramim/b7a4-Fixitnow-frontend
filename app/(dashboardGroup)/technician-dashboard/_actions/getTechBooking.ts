"use server";

import { cookies } from "next/headers";

export const getTechBooking = async (userId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/booking?technicianId=${userId}}`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next:{
        tags:["getBooking"]
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return;
  }

  const result = await res.json();

  return result.data;
};
