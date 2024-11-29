import Image from "next/image";
import React from "react";
import NavBar from "../navbar/NavBar";

const FirstSection = () => {
  return (
    <section className="w-full h-[100vh] relative flex flex-col justify-start items-center overflow-hidden 2xl:pb-20">
      <NavBar />

      {/* Blue Triangle */}
      <div
        className="absolute z-0 w-full top-[15vh] left-[55vw] h-[135vh] rotate-[30deg] rounded-[3.75rem]"
        style={{ backgroundColor: "#0051FF" }}
      />

      {/* Main content */}
      <div className="relative lg:w-full lg:h-full sm:w-1/2 sm:h-1/2 flex md:flex-row flex-col justify-center items-center gap-5 pb-[15%] mr-[13%] ml-[11%] lg:mt-[3%] md:mt-[5%]">
        <div className="flex flex-col justify-center items-start">
          <div className="md:max-w-[40vw] flex flex-col text-[#FB8A00] gap-[2%]">
            <p className="mt-0 uppercase text-[3.5vw] sm:leading-tight md:leading-none font-semibold drop-shadow-[0_2vw_2vw_rgba(0,0,0,0.25)]">
              Somos
              <br /> una agencia
              <br /> de marketing 360°
            </p>
            <span className="hidden md:block text-black text-[2vw] font-normal mt-[5%] max-w-[50%] leading-none">
              Nos enfocamos en <strong>conectarte al mundo digital</strong>,
              trabajamos con emprendedores y negocios de todos los niveles.
            </span>
          </div>
        </div>
        <div className="w-[50vw] h-[35vw] flex justify-center items-start mt-[2%]">
          <Image
            src={"/Home1.png"}
            alt="MainImage"
            className="w-full h-full object-cover object-center transition-opacity opacity-0 duration-500"
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
