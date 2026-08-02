"use server";

import { isAccessTokenExist } from "@/shared/service/refreshToken";
import { revalidateTag } from "next/cache";


export type ServiceState = {
  success: boolean;
  message: string;
};

export const createService = async (
  prevState: ServiceState,
  formData: FormData
): Promise<ServiceState> => {
  try {
    const payload = {
      name: formData.get("name"),
      title: formData.get("title"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      categoryId: formData.get("categoryId"),
    };

    const accessToken = await isAccessTokenExist();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/service`,
      {
        method: "POST",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    if (result.success) {
      revalidateTag("latestService", {
        expire: 0,
      });
    }

    return {
      success: result.success,
      message: result.message,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};