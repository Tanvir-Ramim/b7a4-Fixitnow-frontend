// _acitons/getAllUsers.ts
"use server";

import { cookies } from "next/headers";
import { IUser } from "../_type/cateogoryTypes";
import { revalidatePath } from "next/cache";
export const getAllUsers = async (): Promise<IUser[]> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/user/alluser`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data?.data?.users ?? [];
};




export const updateUserStatus = async (
  userId: string,
  activeStatus: "ACTIVE" | "BANNED",
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ userId, activeStatus }),
  });

  const data = await res.json();

  if (data.success) {
    revalidatePath("/dashboard/users");
  }

  return data;
};
