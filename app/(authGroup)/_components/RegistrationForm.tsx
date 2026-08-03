"use client";

import { Eye, EyeOff } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerAction } from "../_actions/registerAction";

const RegistrationForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

  const [state, action, pending] = useActionState(registerAction, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "User Registration Complete");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      toast.error(state.message || "Registration Failed");
    }
  }, [state, router]);

  return (
    <form action={action}>
      {/* Name */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Name</label>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          required
          className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Email</label>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Role</label>

        <select
          name="role"
          required
          defaultValue=""
          className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="CUSTOMER">Customer</option>
          <option value="TECHNICIAN">Technician</option>
        </select>
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="mb-2 block font-semibold">Password</label>

        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            minLength={6}
            required
            onInvalid={(e) => {
              const target = e.target as HTMLInputElement;

              if (target.validity.valueMissing) {
                target.setCustomValidity("Password is required");
              } else if (target.validity.tooShort) {
                target.setCustomValidity(
                  "Password must be at least 6 characters",
                );
              }
            }}
            onInput={(e) => {
              (e.target as HTMLInputElement).setCustomValidity("");
            }}
            className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <span
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {passwordVisible ? <Eye /> : <EyeOff />}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full cursor-pointer rounded-md bg-[#0F3C9F] py-3 text-white transition hover:bg-[#0b2f7d] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegistrationForm;
