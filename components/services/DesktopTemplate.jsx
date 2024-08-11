"use client";
import Image from "next/image";
import React from "react";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import { Toaster } from "sonner";
import GlobalContext from "@/app/context/GlobalContext";

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
        <div className="bg-[#0853FC] from-slate-100 w-full h-[100vh] flex flex-col relative mb-1">
          <NavBar />
          <div className="w-full h-full flex flex-col justify-center items-center my-1">
            {/*Text*/}

            <div className="w-full relative flex flex-col items-center justify-center">
              <h1 className="text text-4xl font-bold my-6 py-1 text-[#FB8A00] text-center text-2xl md:text-4xl lg:text-5xl">
                Gestion de Redes Sociales
              </h1>
              <span className="text text-white mb-8 text-center text-5xl md:text-4xl lg:text-4xl font-light text-lg">
              Es tu tiempo de invertir en tus redes para impulsar tu negocio,<br />
              te lo mostramos en este video explicativo.
              </span>
            </div>
            {/*Modificar modules.exports
                              images;{domains:['img.youtube.com']}

            <div className="relative max-w-[850px] w-full max-h-96 h-full">
            <Image
            src={`https://img.youtube.com/vi/${media}/hqdefault.jpg`}
            fill
            alt="Mediaplayer"
            />

              <iframe
              src={`https://www.youtube.com/embed/${media}`}
              frameBorder="0"
                allowFullScreen
                width="100%"
                height="100%"
                title="Mediaplayer"
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            </div>*/}
          </div>
        </div>


      </section>

      {/*Text Personalized*/}
      <section className="flex flex-wrap justify-center mb-6 mx-2">
      <div className="relative flex flex-col items-center justify-center h-relative">
          {/*<img src={"/WaveBG.jpg"} className="w-full" />*/}
          <Image
            src={icon}
            priority
            width={270}
            height={300}
            className="flex object-center justify-center items-center"
            quality={100}
          />
          <div className="flex flex-col justify-center items-center mb-6 mx-2">
          <h2 className="text font-light bg-[#FB8A00] text-white mb-6 text-2xl md:text-4xl lg:text-4xl px-4 py-2 border rounded-tl-xl rounded-br-xl">
            Sube de nivel hoy
          </h2>
          <span className="text text-4xl font-bold my-6 text-[#0853FC] text-center text-2xl md:text-4xl lg:text-5xl">
            Ayudanos a que tu negocio sea<br />lo mejor que pueda ser
          </span>
          </div>
        </div>

      </section>
      {/*Plans*/}
      <section className="py-16 px-4 w-full">{children}</section>
      {/*Foot Bg*/}
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
