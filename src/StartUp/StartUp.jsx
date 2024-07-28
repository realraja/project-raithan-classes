"use client";
import Layout from "@/components/admin/Layout";
import Navbar from "@/components/user/Navbar";
import { checkAdmin } from "@/redux/actions/adminActions";
import { checkUser } from "@/redux/actions/userActions";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const StartUp = ({ children }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    pathname.split("/")[1] === "raithan-add" && dispatch(checkAdmin());
    dispatch(checkUser());
  }, [dispatch]);

  if (
    pathname.split("/")[1] === "raithan-add" &&
    pathname.split("/")[2] !== "login"
  ) {
    return <Layout>{children}</Layout>;
  }


  return (
    <>
      {pathname.split("/")[2] !== "login" &&
        pathname.split("/")[1] !== "admin-login" &&
        pathname.split("/")[1] !== "forget-password" &&
        pathname.split("/")[1] !== "login" && <Navbar />}
      {children}
    </>
  );
};

export default StartUp;
