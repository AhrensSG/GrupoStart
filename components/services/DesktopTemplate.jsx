import Image from "next/image";
import React from "react";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import { Toaster } from "sonner";

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
        <div className="bg-gradient-to-b from-slate-100 to-[#0853FC] w-full h-[100vh] flex flex-col relative">
          <NavBar />
          <div className="w-full h-full flex justify-center items-center">
            <div className="relative max-w-[850px] w-full max-h-96 h-full">
              <Image src={media} fill alt="Mediaplayer" />
            </div>
          </div>
        </div>
        <div className="relative  w-full">
          <img
            src={"/WaveBG.jpg"}
            className="w-full"
          />
          <Image
            src={icon}
            priority
            width={200}
            height={200}
            className="absolute left-[20%] bottom-0"
          />
        </div>
      </section>
      <section className="py-16 px-4 w-full">{children}</section>
      <section className="relative max-w-[100vw] w-full h-screen">
        <Image
          src={footerImg}
          fill
          priority
          quality={100}
          className="object-cover object-top"
        />
      </section>
      <Footer />
    </main>
  );
};

export default DesktopTemplate;
