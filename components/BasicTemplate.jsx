"use client";
import React from "react";
import NavBarV2 from "./navbar/NavBarV2";
import Footer from "./footer/Footer";
import { Toaster } from "sonner";
import GlobalContext from "@/app/context/GlobalContext";
import Chat from "@/components/chat/Chat";

const BasicTemplate = ({ children }) => {
  return (
    <main className="bg-white w-full h-full flex flex-row justify-center items-center"
    style={{
      justifyContent: "center",
      height: "100%", // Agrega un estilo de height
      width: "100%", // Agrega un estilo de width
      overflowX: "hidden", // Agrega un estilo de overflow
    }}
    >
      <NavBarV2/>
      {/* Chat */}
      <Chat className="absolute top-0 right-0" style={{ zIndex: 35 }}/>
      <section className="w-full flex flex-static justify-items-center relative">
        {children}
      </section>
      <Footer/>
    </main>
  );
};

export default BasicTemplate;
