"use client";
import React from "react";
import NavBar from "./navbar/NavBar";
import Footer from "./footer/Footer";
import { Toaster } from "sonner";
import GlobalContext from "@/app/context/GlobalContext";

const BasicTemplate = ({ children }) => {
  return (
    <main className="bg-slate-100 w-full h-full">
      <NavBar />
      <section className="w-full flex flex-row justify-center items-center relative">
        {children}
      </section>
      <Footer />
    </main>
  );
};

export default BasicTemplate;
