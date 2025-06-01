"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { resetImageOptions } from "@/redux/slice/imageSlice";
import { Menu } from "lucide-react"; // Optional: cleaner icon

const Navbar = () => {
  const { user } = useUser();
  const dispatch = useDispatch();



  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-zinc-600 text-white backdrop-blur dark:border-gray-700 dark:bg-gray-900/80">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <img src="/logo2.png" alt="Logo" className="h-10 w-auto" />
              <span className="text-xl sm:text-2xl font-bold font-poppins text-white  dark:text-white tracking-tight">
                PIXORA
              </span>
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden sm:inline text-sm font-medium text-white  dark:text-gray-300">
                Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}
              </span>
            )}

            {/* Uncomment this if reset needed */}
            {/* <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition"
              title="Reset Image Options"
            >
              Reset
            </button> */}

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600",
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
