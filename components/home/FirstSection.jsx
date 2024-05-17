import Image from "next/image";
import React, { useState } from "react";
import NavBar from "../navbar/NavBar";
import Link from "next/link";

const FirstSection = () => {
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <section className="w-full xl:h-screen 2xl:h-full relative flex flex-col justify-start items-center overflow-hidden 2xl:pb-20">
      <NavBar />

      {/* Blue Triangle */}
      <div className="absolute z-0 w-full bg-blue-500 top-[25%] left-[70%] h-[120%] rotate-[30deg] rounded-[60px]" />

      {/* Main content */}
      <div className="relative w-full h-full flex md:flex-row flex-col justify-center items-center p-4 max-w-screen-xl gap-8 pb-10">
        <div className="w-full h-full flex justify-center items-start">
          <div className="md:max-w-[40vw] flex flex-col text-[#FB8A00] gap-8">
            <p className="uppercase text-2xl xs:text-4xl sm:text-5xl sm:leading-none md:leading-tight font-semibold drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]">
              <span className="normal-case text-2xl sm:text-3xl text-black font-normal drop-shadow-none">
                Somos una agencia <br />
              </span>
              de marketing <br /> y desarrollo web <br /> 360°
            </p>
            <span className={`hidden md:block text-black text-[3.5vw] md:text-3xl font-light ${!showFullText ? 'truncate' : ''}`}>
              Enfocada en conectarte al mundo digital, trabajos con
              emprendedores y empresarios de todos los niveles;
            </span>
            <div className="md:flex justify-center hidden">
              <button onClick={handleToggleText}>
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
              </button>
            </div>
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
        <div className="md:hidden w-full grid place-items-center">
          <span className={`text-black text-[3.5vw] md:text-3xl font-light max-w-screen-xs ${!showFullText ? 'truncate' : ''}`}>
            Enfocada en conectarte al mundo digital, trabajos con emprendedores
            y empresarios de todos los niveles;
          </span>
        </div>
        <div className="flex justify-center md:hidden">
          <button onClick={handleToggleText}>
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
          </button>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;

