import Image from "next/image";
import logo from "../../../shared/assets/Logo.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1f2937] text-gray-300 md:pt-16 pt-10 pb-8">
      <div className="max-w-375 mx-auto lg:px-9 md:px-6 px-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                alt="project logo"
                //   width={400}
                //   height={400}
                src={logo}
              ></Image>
              <h1 className="text-2xl font-bold ">FixIt</h1>
              {/* <img src={logo} alt="logo" className="" /> */}
            </div>

            <p className="text-sm text-gray-400 leading-6">
              Connect with trusted technicians for home and office services.
              Book professionals for plumbing, electrical, cleaning, painting,
              AC repair, and more—all in one place.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">
                <Link href="/about-us">About Us</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/terms"> Terms & Conditions</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/policy"> Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">
                <Link href="/contact-us"> Help Center</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/contact-us"> FAQs</Link>
              </li>
              <li className="hover:text-white cursor-pointer">
                <Link href="/contact-us"> Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Get Service Updates
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              Receive the latest service offers, maintenance tips, and platform
              updates directly in your inbox.
            </p>

            <div className="flex gap-2.5">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 text-sm bg-white text-gray-800 focus:outline-none"
              />

              <button className="bg-indigo-600 hover:bg-primary px-4 py-2 text-sm text-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-600 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2026 FixItNow. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
              </svg>
            </div>

            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
              </svg>
            </div>

            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.67-1.27 2.3-2.6 4.74-2.6C22 7.6 24 10.2 24 15v9h-5v-8c0-1.9-.03-4.3-2.63-4.3-2.63 0-3.03 2.05-3.03 4.16V24h-5V8z" />
              </svg>
            </div>

            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.95 4.57c-.89.39-1.84.65-2.84.77a4.93 4.93 0 0 0 2.17-2.72 9.86 9.86 0 0 1-3.13 1.2A4.92 4.92 0 0 0 16.62 2c-2.72 0-4.93 2.2-4.93 4.92 0 .39.04.76.13 1.12C7.73 7.84 4.1 5.88 1.67 2.9a4.92 4.92 0 0 0-.67 2.48c0 1.71.87 3.22 2.2 4.1-.8-.03-1.56-.25-2.22-.61v.06c0 2.39 1.7 4.39 3.95 4.84-.41.11-.85.17-1.3.17-.32 0-.63-.03-.94-.09.64 2 2.49 3.46 4.68 3.5A9.88 9.88 0 0 1 0 19.54 13.94 13.94 0 0 0 7.55 22c9.05 0 14-7.5 14-14v-.64c.96-.69 1.8-1.56 2.45-2.55z" />
              </svg>
            </div>

            {/* <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
              <Twitter size={16} />
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
