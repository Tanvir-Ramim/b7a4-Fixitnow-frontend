"use server";

export const getCategoryService = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/categories`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24 * 5,
      tags: ["categoryCache"],
    },
  });

  const result = await res.json();
  return result.data.category;
};
