import Image from "next/image";
import React from "react";

const EstaticSign = () => {
  return (
    <section className="relative flex flex-wrap w-full h-screen">
      {/* Contenedor de la imagen de la Jirafa */}
      <div className="relative w-full h-full block">
        <Image
          src={"/FutureJirafe.jpg"}
          alt="FutureJirafe"
          layout="fill"
          className="justify-center object-center object-cover"
          onLoad={(event) => event.target.classList.remove("opacity-0")}
          priority={true}
          quality={100}
        />
      </div>

      {/* Contenedor del texto */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-end w-1/2 h-full py-10 lg:py-20 ml-auto sm:text-3xl right-0">
        <div className="text-4xl lg:text-6xl xl:text-7xl text-white leading-tight items-start justify-center static py-[15px] my-[5px]">
          <span className="font-bold uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]">
            EL FUTURO <br /> ESTÁ AQUÍ
          </span>
          <span className="text-[#FB8A00] font-semibold mt-4 uppercase block drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]">
            NO TE QUEDES
            <br />
            VIENDO <br />
            ¡SÚMATE!
          </span>
        </div>
      </div>
    </section>
  );
};

export default EstaticSign;
