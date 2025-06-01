"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { resetImageOptions } from "@/redux/slice/imageSlice";

const Navbar = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetImageOptions());
  };

  return (
    <nav className="fixed top-0  z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>
            <a href="/" className="flex ms-2 gap-2 md:me-24">
              <img src="/logo2.png" alt="Logo" className="w-full h-14 " />
              <span className="self-center font-poppins text-xl font-black sm:text-2xl whitespace-nowrap dark:text-white">
                PIXORA
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:block text-sm text-gray-700 dark:text-gray-300">
                Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}
              </div>
            )}
            {/* <button
              onClick={handleReset}
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              title="Reset Image Options"
            >
              Reset
            </button> */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{ elements: { avatarBox: "w-8 h-8" } }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
