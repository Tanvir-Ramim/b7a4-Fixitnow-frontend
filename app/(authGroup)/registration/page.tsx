import Image from "next/image";
import Link from "next/link";
import loginBG from "../_assets/loginImage.png";
import { ArrowRight } from "lucide-react";
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
      <div className="w-full flex items-center justify-center h-screen bg-[#F6FDF9]">
        <div className="w-full max-w-md px-8">
          <Image src={logo} alt="Logo" className="mx-auto mb-8" />

          <h2 className="text-center text-2xl font-bold mb-8">
            Welcome to Quick Hire 
          </h2>
          <h2 className="text-center text-2xl font-bold mb-8">
            Registration
          </h2>
          <RegistrationForm></RegistrationForm>

          {/* Back Home */}
          <div className="text-center flex items-center justify-center gap-3 mt-6 text-sm">
            <h4>Registration</h4>

          

            <Link  className="text-blue-700" href="/login">
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
