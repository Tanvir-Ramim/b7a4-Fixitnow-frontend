"use server";

import { cookies } from "next/headers";
import { IPayment } from "../_type/paymentType";


export const getPaymentHistory = async (
  userId: string,
): Promise<IPayment[]> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/payment/history?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return [];
  }

  const result = await res.json();
  return result.data ?? [];
};