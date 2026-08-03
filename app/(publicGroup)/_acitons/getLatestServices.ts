"use server";

export const getLatestService = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/service`, {
    cache: "no-cache",
  
  });

  const result = await res.json();
  return result;
};
