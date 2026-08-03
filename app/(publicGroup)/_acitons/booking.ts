"use server";

import { cookies } from "next/headers";

interface CreateBookingPayload {
  serviceId: string;
  slotID: string;
  address: string;
  customerNotes?: string;
}

interface BookingResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export async function createBooking(
  payload: CreateBookingPayload
): Promise<BookingResult> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
     
    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to book this service.",
      };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
     
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to create booking. Please try again.",
      };
    }

    return {
      success: true,
      message: data?.message || "Booking request sent successfully.",
      data,
    };
  } catch (error) {
    console.error("createBooking error:", error);
    return {
      success: false,
      message: "Something went wrong while booking. Please try again.",
    };
  }
}