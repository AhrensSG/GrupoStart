import React from "react";
import NavBar from "./navbar/NavBar";
import Footer from "./footer/Footer";
import { Toaster } from "sonner";

const BasicTemplate = ({ children }) => {
  return (
    <main className="bg-slate-100 w-full h-full">
      <Toaster
        richColors
        visibleToasts={3}
        duration={5000}
        position="bottom-right"
        expand={false}
      />
      <NavBar />
      <section className="w-full flex flex-row justify-center items-center relative">
        {children}
      </section>
      <Footer />
    </main>
  );
};

export default BasicTemplate;
