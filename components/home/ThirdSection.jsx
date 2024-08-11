import Image from "next/image";
import React from "react";
import EstaticSign from "../home/auxiliarEstaticComp/EstaticSign";

const ThirdSection = () => {
  return (
    <section className=" relative flex flex-wrap z-0">
      <aside className="relative flex z-5">
      <div className="w-full bg-gradient-to-b from-[#0853FC] mx-auto mb-1 pt-2 p-4 flex-row justify-center text-center">
      <p className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mx-auto my-10 px-5 py-1 leading-relaxed tracking-wide text-center">
      Trabajemos en equipo para impulsar tu marca
      </p>
      {/*Text and Image Clients */}
        <div className="flex flex-wrap justify-center mb-6 mx-2">
          
          <h2 className="font-light bg-[#FB8A00] text-white my-1 text-1xl md:text-4xl lg:text-4xl px-4 py-2 border rounded-tl-xl rounded-br-xl">
            Clientes que confian en nosotros
          </h2>

            <div className="image-client-container flex flex-wrap justify-center mb-4 pb-2">
            <Image
            src={"/lote1.png"}
            alt="Clients1"
            className="object-cover object-center transition-opacity opacity-0 duration-500 "
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            width={850}
            height={465}
            priority={true}
            quality={100}
            />

            <Image
            src={"/lote2.png"}
            alt="Clients2"
            className="object-cover object-center transition-opacity opacity-0 duration-500 "
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            width={850}
            height={465}
            priority={true}
            quality={100}
            />
            </div>
          </div>
        </div>
      </aside>
    {/*FutureJirafeImageBg and Text*/}
    <EstaticSign />
{/*
      <Image
        src={"/FutureJirafe.jpg"}
        fill
        alt="FutureJirafe"
        className="object-cover object-center transition-opacity opacity-0 duration-500 z-10 "
        onLoad={(event) => event.target.classList.remove("opacity-0")}
        sizes="(max-width: 1280px) 100vw, 1280px"
        priority={true}
        quality={100}
      />
      <div className="w-full h-full flex justify-center sm:justify-end items-center z-10">
        <div className="w-1/2 h-full flex flex-col justify-center items-start">
          <span className="text-white text-5xl sm:text-7xl font-extrabold">
            EL FUTURO <br /> ESTA AQUI
          </span>
          <span className="text-[#FB8A00] text-5xl sm:text-7xl font-extrabold">
            NO TE QUEDES <br /> VIENDO <br /> ¡SUMATE!
          </span>
        </div>
      </div> 
  */}
    
    </section>
  );
};

export default ThirdSection;
