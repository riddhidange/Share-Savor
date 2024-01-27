import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import taco from "@/assets/taco.svg";
import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";
import ProfileDropdown from "@/components/ProfileDropdown";
import CartDropdown from "./CartDropdown";

const Header = () => {
  const user = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const isLoginRoute = pathname === "/login";

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to={user.isAuthenticated ? "/dashboard" : "/"}>
              <img src={taco} className="h-16 w-16" alt="" />
            </Link>
          </div>

          <div className="flex items-center justify-end gap-4">
            <div className="sm:flex sm:gap-8">
              {user?.isAuthenticated && <CartDropdown />}
              {!user?.isAuthenticated && (
                <Link to={isLoginRoute ? "/register" : "/login"}>
                  <Button>{isLoginRoute ? "Register" : "Login"}</Button>
                </Link>
              )}
              {user?.isAuthenticated && <ProfileDropdown />}
            </div>

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
