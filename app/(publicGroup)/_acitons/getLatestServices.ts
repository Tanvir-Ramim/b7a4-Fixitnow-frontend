"use server";

export const getLatestService = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/service`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags:["latestService"]
    },
  });

  const result = await res.json();
  return result;
};
