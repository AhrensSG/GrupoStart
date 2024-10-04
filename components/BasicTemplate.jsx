"use client";
import React from "react";
import NavBarV2 from "./navbar/NavBarV2";
import Footer from "./footer/Footer";
import { Toaster } from "sonner";
import GlobalContext from "@/app/context/GlobalContext";

const BasicTemplate = ({ children }) => {
  return (
    <main className="bg-slate-100 w-full h-full flex justify-items-center">
      <NavBarV2 />
      <section className="w-full flex flex-row justify-center items-center relative">
        {children}
      </section>
      <Footer />
    </main>
  );
};

export default BasicTemplate;
