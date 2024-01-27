import React, { Suspense, useEffect } from "react";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { logout } from "@/features/userSlice";

const Layout = () => {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const logOutKey = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch(logout());
      }
    };

    document.addEventListener("keydown", logOutKey);
    return () => document.removeEventListener("keydown", logOutKey);
  }, []);

  return (
    <>
      <div className="flex h-full flex-col">
        <Header />
        <div className="h-full">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
        <Toaster />
      </div>
      {user?.isLoading && <Loading />}
    </>
  );
};

export default Layout;
