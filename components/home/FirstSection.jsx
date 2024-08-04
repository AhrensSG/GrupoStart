import Image from "next/image";
import React from "react";
import NavBar from "../navbar/NavBar";
import Link from "next/link";

const FirstSection = () => {
  return (
    <section className="w-full xl:h-screen 2xl:h-full relative flex flex-col justify-start items-center overflow-hidden 2xl:pb-20">
      <NavBar />

      {/* Blue Triangle */}
      <div className="absolute z-0 w-full top-[15%] left-[55%] h-[135%] rotate-[30deg] rounded-[60px]" style={{ backgroundColor: '#0051FF' }}/>

      {/* Main content */}
      <div className="relative w-full h-full flex md:flex-row flex-col justify-center items-center p-4 max-w-screen-xl gap-8 pb-10">
        <div className="w-full h-full flex justify-center items-start">
          <div className="md:max-w-[40vw] flex flex-col text-[#FB8A00] gap-8">
            <p className=" mt-10 uppercase text-2xl xs:text-4xl sm:text-5xl sm:leading-none md:leading-tight font-semibold drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]">
              Somos<br /> una agencia<br /> de marketing 360°
            </p>
            <span className="hidden md:block text-black text-[3.5vw] md:text-2xl font-normal mt-10">
              Enfocada en <strong>conectarte al mundo digital</strong>, trabajos con
              emprendedores y empresarios de todos los niveles;
            </span>
          </div>
        </div>
        <div className="w-full h-full flex flex-row justify-center items-start">
          <Image
            src={"/Home1.png"}
            alt="MainImage"
            className="object-cover object-center transition-opacity opacity-0 duration-500"
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            width={695}
            height={465}
            priority={true}
            quality={100}
          />
        </div>
      </div>
    </section>
  );
};

export default FirstSection;