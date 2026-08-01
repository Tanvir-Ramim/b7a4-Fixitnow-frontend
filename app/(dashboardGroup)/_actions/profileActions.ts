"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

type UpdateProfilePayload = {
  name: string;
  bio: string;
  experience: number;
  skills: string[];
};

type AddAvailabilityPayload = {
  slotDate: string; 
  startTime: string; 
  endTime: string; 
};

type ActionResult = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: unknown;
};

export const updateProfileAction = async (
  payload: UpdateProfilePayload,
): Promise<ActionResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/user/updateProfile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", {
      expire: 0,
    });
  }

  return result;
};

export const addAvailabilityAction = async (
  payload: AddAvailabilityPayload,
): Promise<ActionResult> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/user/technicians-availablity`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("singleServiceTag", {
      expire: 0,
    });
  }

  return result;
};
