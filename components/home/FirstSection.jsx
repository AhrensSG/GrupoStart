import Image from "next/image";
import React from "react";
import NavBar from "../navbar/NavBar";
import Link from "next/link";

const FirstSection = () => {
  return (
    <section className="w-full h-[700px] xl:h-screen 2xl:h-full relative flex flex-col justify-start items-center overflow-hidden 2xl:pb-20">
      <NavBar />

      {/* Blue Triangle */}
      <div
        className="absolute z-0 w-full top-[15%] left-[55%] h-[135%] rotate-[30deg] rounded-[3.75rem]"
        style={{ backgroundColor: "#0051FF" }}
      />

      {/* Main content */}
      <div className="relative w-full h-full flex md:flex-row flex-col justify-center items-center gap-8 pb-[2.5rem] mr-[2.5rem] ml-[100px]">
        <div className="flex flex-col justify-center items-start">
          <div className="md:max-w-[40vw] flex flex-col text-[#FB8A00] gap-[1rem]">
            <p className="mt-[0rem] uppercase text-[3.0625rem] sm:leading-tight md:leading-none font-semibold drop-shadow-[0_1.875rem_1.875rem_rgba(0,0,0,0.25)]">
              Somos
              <br /> una agencia
              <br /> de marketing 360°
            </p>
            <span className="hidden md:block text-black text-[1.75rem] font-normal mt-[2.5rem] max-w-[25rem] max-h-[8rem] leading-none">
              Nos enfocamos en <strong>conectarte al mundo digital</strong>,
              trabajamos con emprendedores y negocios de todos los niveles.
            </span>
          </div>
        </div>
        <div className="w-[751px] h-[503px] flex flex-row justify-center items-start mt-[1.2rem]">
          <Image
            src={"/Home1.png"}
            alt="MainImage"
            className="w-[751px] h-[503px] object-cover object-center transition-opacity opacity-0 duration-500"
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            width={751}
            height={503}
            priority={true}
            quality={100}
          />
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
