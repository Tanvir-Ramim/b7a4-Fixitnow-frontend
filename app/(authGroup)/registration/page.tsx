import Image from "next/image";
import Link from "next/link";
import loginBG from "../_assets/loginImage.png";
import { ArrowRight, Home } from "lucide-react";
import logo from "../../../shared/assets/Logo.png";

import RegistrationForm from "../_components/RegistrationForm";

const page = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 bg-white">
      {/* Left Side Image */}
      <div className="hidden md:block">
        <Image
          src={loginBG}
          alt="Login Background"
          className="h-screen w-full object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="w-full flex items-center justify-center h-screen bg-[#F8F8FD]">
        <div className="w-full max-w-md px-8">
          <Image
            src={logo}
            alt="Quick Hire Logo"
            className="mx-auto mb-6 object-contain"
          />

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to Quick Hire 👋
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign up to hire skilled professionals quickly and securely.
            </p>

            <h2 className="mt-4 text-xl font-semibold text-[#034DA2]">
              Registration
            </h2>
          </div>
          <RegistrationForm></RegistrationForm>

          {/* Back Home */}

          <div className="mt-6 flex flex-col items-center gap-3 text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign in
                <ArrowRight size={16} />
              </Link>
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#034DA2] transition-all"
            >
              <Home size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
