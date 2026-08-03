"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

interface AcceptBookingPayload {
  technicianAccept: "ACCPECT";
  technicianNotes: string;
}

interface ActionResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export const acceptBooking = async (
  bookingId: string,
  payload: AcceptBookingPayload,
): Promise<ActionResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/booking/${bookingId}/accept`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to accept booking",
      };
    }
    // revalidateTag("getBooking",);
    revalidateTag("getBooking", {
      expire: 0,
    });

    revalidateTag("singleServiceTag", {
      expire: 0,
    });
    // revalidatePath("/");
    return {
      success: true,
      message: "Booking accepted successfully",
      data: result.data,
    };
  } catch {
    return { success: false, message: "Something went wrong. Try again." };
  }
};

export const completeBooking = async (
  bookingId: string,
): Promise<ActionResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/booking/${bookingId}/complete`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          isComplete: true,
        }),
        cache: "no-store",
      },
    );
    revalidateTag("getBooking", {
      expire: 0,
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to complete booking",
      };
    }

    // revalidatePath("/");
    return {
      success: true,
      message: "Booking marked as complete",
      data: result.data,
    };
  } catch {
    return { success: false, message: "Something went wrong. Try again." };
  }
};
