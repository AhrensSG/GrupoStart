"use client";
import Image from "next/image";
import React from "react";
import NavBarV2 from "../navbar/NavBarV2";
import Footer from "../footer/Footer";
import { Toaster } from "sonner";
import GlobalContext from "@/app/context/GlobalContext";
import Chat from "@/components/chat/Chat";
import ResponsiveContainer from "@/components/responsiveComp/ResponsiveContainer";

const DesktopTemplate = ({
  children,
  media = "/MediaPlayer.svg",
  icon = "/services/Jirafe4.svg",
  footerImg = "/services/FooterJirafe1.svg",
}) => {
  return (
    <ResponsiveContainer>
      <main
        className="bg-white-100 w-full h-full flex flex-col justify-center items-center"
        style={{
          display: "flex", // Agrega un estilo de display
          flexDirection: "column", // Agrega un estilo de flexDirection
          height: "100%", // Agrega un estilo de height
          width: "screen", // Agrega un estilo de width
          overflow: "hidden", // Agrega un estilo de overflow
        }}
      >
        <Toaster
          richColors
          visibleToasts={3}
          duration={5000}
          position="bottom-right"
          expand={false}
        />
        <section className="w-full h-auto flex flex-col relative">
          <header className="bg-[#0853FC] w-full h-auto flex flex-col justify-center items-center">
            <NavBarV2 />
          </header>
        </section>
        <Chat style={{ position: "relative", bottom: 0, right: 0, zIndex: 24 }} />
        {/* Plans */}
        <section className="w-full h-full flex flex-col justify-center items-center">
          {children}
        </section>
        {/* Footer */}
        <Footer />
      </main>
    </ResponsiveContainer>
  );
};

export default DesktopTemplate;