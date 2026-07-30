import Image from "next/image";
import postImage from "../_assets/postImage.png";

const StartPosting = () => {
  return (
    <div className="">
      <section className="relative  w-full overflow-hidden bg-primary">
        <div className="top-triangle absolute top-0 left-0 w-40 h-40 bg-white z-10"></div>
        <div className="bottom-triangle  absolute bottom-0 left-1 w-full h-32 bg-white"></div>

        <div className="  flex flex-col    lg:px-10 px-3 pt-16 lg:pb-0 pb-12   lg:flex-row items-center justify-between gap-10">
          <div className="text-white w-full text-center lg:text-left">
            <h1
              className="text-2xl
sm:text-3xl lg:text-4xl bannerText tracking-wider font-semibold leading-tight"
            >
              Start posting <br className="hidden lg:block" />
              jobs today
            </h1>

            <p className="lg:mt-5 mt-3 text-base  text-indigo-100">
              Start posting jobs for only $10.
            </p>

            <button className="mt-5 bg-white text-sm text-indigo-600 font-semibold lg:px-5 px-3 py-2.5  ">
              Sign Up For Free
            </button>
          </div>

          <div className="lg:w-full  w-fit  z-4 flex justify-end">
            <Image src={postImage} alt="Dashboard Preview" className="w-fit " />
          </div>
        </div>

        <style>
          {`
          .bottom-triangle  {
            clip-path: polygon(100% 20%, 100% 100%, 80% 100%);
          }
             .top-triangle {
              clip-path: polygon(0 0, 80% 0, 0 50%);
            }
        `}

          
        </style>
      </section>
    </div>
  );
};

export default StartPosting;
