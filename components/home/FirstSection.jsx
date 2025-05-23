import Image from "next/image";
import React from "react";
import NavBar from "../navbar/NavBar";

const FirstSection = () => {
  return (
    <section className="w-full lg:h-[100vh] xs:h-auto max-xs:h-auto md:max-h-screen relative flex flex-col justify-start items-center overflow-hidden lg:pb-5 xl:pb-5 2xl:pb-20 3xl:pb-10 ">
      <NavBar />

      {/* Blue Triangle */}
      <div
        className="absolute z-0 w-full md:top-[20vh] xs:top-[30vh] max-xs:top-[32vh] lg:left-[55vw] md:left-[35vw] xs:left-[50vw] max-xs:left-[10vw] lg:h-[185vh] xs:h-[100vh] max-xs:h-[40vh] rotate-[30deg] rounded-[3.75rem]"
        style={{ backgroundColor: "#0051FF" }}
      />

      {/* Main content */}
      <div className="px-4 relative w-full max-xs:h-full xs:h-full md:min-h-screen xl:h-full md:relative lg:h-full flex md:flex-row xs:flex-col max-xs:flex-col justify-center items-center gap-5 md:pb-[15%] lg:pb-[20%] lg:mx-[2%] md:my-[2%] lg:my-[2%] lg:mr-[13%] lg:ml-[11%] lg:mt-[3%] md:mt-[5%] md:mx-[1%] md:px-[4%]">
        <div className="flex flex-col justify-center md:items-start xs:items-center max-xs:items-center md:min-h-screen lg:min-h-screen">
          <div className="md:max-w-[40vw] xs:w-auto max-xs:w-auto flex flex-col text-[#FB8A00] gap-[2%] justify-center max-xs:px-[2%] xs:px-[4%] md:px-0">
            <p className="md:mt-0 xs:mt-6 uppercase md:text-[3.5vw] xs:text-4xl sm:leading-tight md:leading-none font-semibold drop-shadow-[0_2vw_2vw_rgba(0,0,0,0.25)]">
              Somos
              <span className="hidden md:inline"> <br /></span> una agencia
              <span className="hidden md:inline"> <br /></span> de marketing 360°
            </p>
            <span className=" text-black md:text-[2vw] xs:text-xl font-normal mt-[5%] md:max-w-[50%] xs:w-auto leading-none">
              Nos enfocamos en <strong>conectarte al mundo digital</strong>,
              trabajamos con emprendedores y negocios de todos los niveles.
            </span>
          </div>
        </div>
        <div className="md:w-[50vw] md:h-auto xs:w-auto xs:h-auto flex justify-center md:relative items-start mt-[2%] md:px-0 xs:px-[4%] xl:w-[60vw]">
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
