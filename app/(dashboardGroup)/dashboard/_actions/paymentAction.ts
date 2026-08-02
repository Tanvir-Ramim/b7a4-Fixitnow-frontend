"use server";

import { cookies } from "next/headers";
interface ActionResult {
  success: boolean;
  message: string;
  data?: {
    result?: {
      paymentUrl?: string;
    };
  };
}

export const checkoutPayment = async (
  bookingId: string,
): Promise<ActionResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/payment/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ bookingId }),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to start payment",
      };
    }

    return {
      success: true,
      message: "Redirecting to payment...",
      data: result.data,
    };
  } catch {
    return { success: false, message: "Something went wrong. Try again." };
  }
};