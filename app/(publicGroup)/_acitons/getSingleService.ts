"use server";

export const getSingleService = async (id: string) => {

  const res = await fetch(`${process.env.BACKEND_API_URL}/service/${id}`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  const result = await res.json();
  return result;
};
