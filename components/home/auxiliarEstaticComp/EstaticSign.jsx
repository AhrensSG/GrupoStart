import Image from "next/image";
import React from "react";

const EstaticSign = () => {
  return (
    <section className="relative flex md:flex-wrap w-full h-screen ">
      {/* Contenedor de la imagen de fondo */}
      <div className="relative w-full h-full">
        {/* Imagen para pantallas md y superiores */}
        <div className="hidden md:block mx-auto">
          <Image
            src="/FutureJirafe.jpg"
            alt="FutureJirafe"
            fill
            className="object-cover"
            priority={true}
            quality={100}
          />
        </div>
        {/* Imagen para pantallas xs y sm */}
        <div className="block md:hidden">
          <Image
            src="/jirafaMobile.png"
            alt="FutureJirafe Mobile"
            className="object-cover"
            fill
            priority={true}
            quality={100}
          />
        </div>
      </div>

      {/* Contenedor del texto */}
      <div className="absolute inset-0 flex flex-col md:justify-center items-center md:text-end max-xs:text-center xs:text-center xs:justify-items-start max-xs:justify-start max-xs:align-text-top xs:align-text-top md:w-1/2 xs:w-auto max-xs:w-auto h-full py-10 lg:py-20 ml-auto right-0 xs:px-[3%] max-xs:px-[1%] md:px-0 md:mr-6">
        <div className="px-4 max-xs:text-4xl xs:text-5xl md:text-6xl xl:text-7xl text-white leading-tight items-start justify-center static py-[15px] my-[5px]">
          <span className="font-bold uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]">
            EL FUTURO <span className="hidden md:inline"> <br /></span> ESTÁ AQUÍ
          </span>
          <span className="text-[#FB8A00] font-semibold mt-4 uppercase block drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]">
            NO TE QUEDES <span className="hidden md:inline"> <br /></span>
            VIENDO <span className="hidden md:inline"> <br /></span>
            ¡SÚMATE!
          </span>
        </div>
      </div>
    </section>
  );
};

export default EstaticSign;
