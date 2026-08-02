"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

interface ReviewPayload {
  bookingId: string;
  rating: number;
  comment: string;
}

interface ActionResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export const submitReview = async (
  payload: ReviewPayload,
): Promise<ActionResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to submit review",
      };
    }

    revalidatePath("/customer-dashboard/bookings"); // <-- adjust to your real route
    return {
      success: true,
      message: "Review submitted successfully",
      data: result.data,
    };
  } catch {
    return { success: false, message: "Something went wrong. Try again." };
  }
};