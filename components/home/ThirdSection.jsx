import Image from "next/image";
import React from "react";

const ThirdSection = () => {
  return (
    <section className="w-full h-screen relative flex">
      <Image
        src={"/FutureJirafe.jpg"}
        fill
        alt="FutureJirafe"
        className="object-cover object-center transition-opacity opacity-0 duration-500 z-0"
        onLoad={(event) => event.target.classList.remove("opacity-0")}
        sizes="(max-width: 1280px) 100vw, 1280px"
        priority={true}
        quality={100}
      />
      <div className="w-full h-full flex justify-end items-center z-10">
        <div className="w-1/2 h-full flex flex-col justify-center items-start">
          <span className="text-white text-7xl font-extrabold">
            EL FUTURO <br /> ESTA AQUI
          </span>
          <span className="text-[#FB8A00] text-7xl font-extrabold">
            NO TE QUEDES <br /> VIENDO <br /> ¡SUMATE!
          </span>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
