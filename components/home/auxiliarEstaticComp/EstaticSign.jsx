import Image from "next/image";
import React from "react";

const EstaticSign = () => {
    return (
    <section className="relative flex flex-wrap w-screen h-screen">
    {/*Image Bg Jirafe*/}
    <Image
    src={"/FutureJirafe.jpg"}
    fill
    alt="FutureJirafe"
    className="object-cover object-center w-full h-full md:w-1/2 lg:w-1/2 xl:w-1/2"
    onLoad={(event) => event.target.classList.remove("opacity-0")}
    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 1280px"
    priority={true}
    quality={100}
    backgroundSize= {"cover"}
    backgroundPosition= {"center"}
    />

    {/* Contenedor del texto */}
    <div className="absolute top-0 right-0 w-1/2 h-full flex justify-center items-center text-white z-10">
    <div className="flex flex-col items-start text-5xl sm:text-7xl md:text-7xl lg:text-8xl mx-1">
      <span className="font-bold mt-10 uppercase sm:leading-none md:leading-tight drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]">
        EL FUTURO <br /> ESTA AQUI<br />
      </span>
      <span className="text-[#FB8A00] font-semibold mt-2 uppercase sm:leading-none md:leading-tight drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]">
        NO TE QUEDES<br />VIENDO <br />
      </span>
      <h2 className="text-[#FB8A00] font-extrabold my-2 mx-1 uppercase sm:leading-none md:leading-tight drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]">
        ¡SUMATE!
      </h2>
    </div>
  </div>

    </section>

    );
    };

export default EstaticSign;