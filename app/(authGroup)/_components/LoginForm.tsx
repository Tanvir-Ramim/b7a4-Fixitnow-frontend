"use client";
import { Eye, EyeOff } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { loginAction } from "../_actions/loginFunction";
import { toast } from "sonner";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  
  const redirectTo = "";
  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    false,
  );

  useEffect(() => {
    if (!state) return;

    // if(state.success){
    //     toast.success(state.message || "Login Successful");
    //     // router.push("/dashboard")
    // }

    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  return (
    <form action={action}>
      {/* Username */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Email</label>

        <input
          type="text"
          name="email"
          placeholder="email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Password</label>

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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <span
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
          >
            {passwordVisible ? <Eye /> : <EyeOff />}
          </span>
        </div>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full cursor-pointer bg-[#0F3C9F] hover:bg-[#0b2f7d] text-white py-3 rounded-md transition-all duration-300"
      >
        {pending ? "Login..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
