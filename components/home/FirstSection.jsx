import Image from "next/image";
import React from "react";
import NavBar from "../navbar/NavBar";
import Link from "next/link";

const FirstSection = () => {
  return (
    <section className="w-full h-screen relative flex flex-col justify-start items-center overflow-hidden">
      <NavBar />

      {/* Blue Triangle */}
      <div className="absolute z-0 w-full bg-blue-500 top-[30%] left-[70%] h-[120%] rotate-[30deg] rounded-[60px]" />

      {/* Main content */}
      <div className="relative w-full h-full flex md:flex-row flex-col justify-center items-center p-4">
        <div className="w-full h-full flex justify-center items-start">
          <div className="md:max-w-[40vw] flex flex-col gap-5 text-[#FB8A00]">
            <p className="uppercase text-[7vw] leading-[7vw] md:text-[4.25vw] md:leading-[4vw] font-semibold drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]">
              <span className="normal-case text-[4vw] md:text-[2vw] text-black font-normal drop-shadow-none">
                Somos una agencia <br />
              </span>
              de marketing <br /> y desarrollo web <br /> 360°
            </p>
            <span className="hidden md:block text-black text-[3.5vw] md:text-[1.75vw] font-light">
              Enfocada en conectarte al mundo digital, trabajos con
              emprendedores y empresarios de todos los niveles;
            </span>
            <div className="flex justify-center">
              <Link href={"/#services"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={50}
                  height={32}
                  fill="none"
                  className="cursor-pointer"
                >
                  <path
                    fill="#0853FC"
                    d="m50 6.667-25 25-25-25L5.833.833 25 20 44.167.833 50 6.667Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-row justify-center items-end">
          <div className="relative w-full h-full max-h-[430px]">
            <Image
              src={"/Home1.png"}
              fill
              alt="MainImage"
              className="object-cover object-center transition-opacity opacity-0 duration-500"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority={true}
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
