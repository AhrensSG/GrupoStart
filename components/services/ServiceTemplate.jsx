"use client";
import GlobalContext from "@/app/context/GlobalContext";
import Image from "next/image";
import React from "react";
import { Toaster } from "sonner";

const ServiceTemplate = ({
  children,
  leftTitle = "Sácale el máximo provecho a tu negocio",
  media = "/MediaPlayer.svg",
  icon = "/services/Jirafe4.svg",
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
      <section className="w-full h-screen flex flex-row justify-center items-center relative">
        <Image
          src={icon}
          width={150}
          height={150}
          alt="JirafeIcon"
          className="absolute bottom-0"
        />
        <div className="w-1/2 h-full bg-[#0853FC] rounded-r-[35px] p-16 flex flex-col items-center gap-5 sm:gap-10 md:gap-20">
          <h1 className="text-4xl font-medium text-white">{leftTitle}</h1>
          <div className="relative w-full max-w-[500px] h-full max-h-[230px]">
            <Image
              src={media}
              fill
              className="object-contain object-center"
              alt="MediaPlayer"
            />
          </div>
        </div>
        <div className="w-1/2 h-full p-16">{children}</div>
      </section>
    </main>
  );
};

export default ServiceTemplate;
