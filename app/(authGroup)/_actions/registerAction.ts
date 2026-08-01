"use server";



type RegisterState = {
  success: boolean;
  statusCode?: number;
  message?: string;
};

export const registerAction = async (
  prevState: RegisterState | null,
  formData: FormData
) => {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    return {
      success: true,
      message: result.message || "User Registration Complete",
    };
  }

  return {
    success: false,
    message: result.message || "Registration Failed",
  };
};