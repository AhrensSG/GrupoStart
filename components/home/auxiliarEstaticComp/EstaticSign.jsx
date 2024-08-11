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
    className="object-cover object-center transition-opacity opacity-0 duration-500 z-10 "
    onLoad={(event) => event.target.classList.remove("opacity-0")}
    sizes="(max-width: 1280px) 100vw, 1280px"
    priority={true}
    quality={100}
    backgroundSize= {"cover"}
    backgroundPosition= {"center"}
    />

    {/* Contenedor del texto */}
    <div className="container w-full h-auto flex  sm:justify-center md:justify-end lg:justify-end items-center pl-2 pr-1 z-10 gap-4">
    <div className="w-1/3 h-screen flex-col justify-center items-end text text-align-end text-5xl sm:text-7xl md:text-7xl lg:text-8xl mx-1">
        <span className="text-white font-bold mt-10 uppercase sm:leading-none md:leading-tight drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]">
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