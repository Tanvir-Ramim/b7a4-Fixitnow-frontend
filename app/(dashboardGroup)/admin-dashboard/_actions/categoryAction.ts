// _acitons/getCategoryService.ts
"use server";

import { cookies } from "next/headers";
import { ICategory } from "@/app/(publicGroup)/_types/AllTypes";
import { revalidatePath } from "next/cache";

export const getCategoryService = async (): Promise<ICategory[]> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data?.data?.category ?? [];
};

export const createCategoryService = async (payload: {
  name: string;
  sortDescriptoin: string;
}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (data.success) {
    revalidatePath("/dashboard/categories");
  }

  return data;
};

export const deleteCategoryService = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  if (data.success) {
    revalidatePath("/dashboard/categories");
  }

  return data;
};
