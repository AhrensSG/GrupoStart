"use client";
import Image from "next/image";
import React from "react";
import NavBarV2 from "../navbar/NavBarV2";
import Footer from "../footer/Footer";
import { Toaster } from "sonner";
import GlobalContext from "@/app/context/GlobalContext";
import Chat from "@/components/chat/Chat";

const DesktopTemplate = ({
  children,
  media = "/MediaPlayer.svg",
  icon = "/services/Jirafe4.svg",
  footerImg = "/services/FooterJirafe1.svg",
}) => {


  return (
    <main className="bg-slate-100 w-full h-full">
      <Toaster
        richColors
        visibleToasts={3}
        duration={5000}
        position="bottom-right"
        expand={false}
      />
      <section>
        <header className="bg-[#0853FC] from-slate-100 w-full h-auto flex flex-col relative">
          <NavBarV2/>
          </header>
      </section>
        <Chat
        className="absolute"
        style= {{zIndex: 15}}
        />
      {/*Plans*/}
      <section className="w-full">{children}</section>
      {/*
      {/*Foot Bg
      <section className="relative max-w-[100vw] w-full h-screen">
        <Image
          src={footerImg}
          fill
          priority
          quality={100}
          className="object-cover object-top"
        />
      </section>*/}
      <Footer />
    </main>
  );
};

export default DesktopTemplate;
