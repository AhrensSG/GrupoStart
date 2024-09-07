import Image from "next/image";
import React from "react";
import EstaticSign from "../home/auxiliarEstaticComp/EstaticSign";

const ThirdSection = () => {
  // Lista de imágenes
  const imageList = [
    { src: "/services/clientsCarousel/logo10.png", alt: "Image 1" },
    { src: "/services/clientsCarousel/logo9.png", alt: "Image 2" },
    { src: "/services/clientsCarousel/logo12.png", alt: "Image 3" },
    { src: "/services/clientsCarousel/logo13.png", alt: "Image 4" },
    { src: "/services/clientsCarousel/logo14.png", alt: "Image 5" },
    { src: "/services/clientsCarousel/logo15.png", alt: "Image 6" },
    { src: "/services/clientsCarousel/logo2.png", alt: "Image 7" },
    { src: "/services/clientsCarousel/logo3.png", alt: "Image 8" },
    { src: "/services/clientsCarousel/logo4.png", alt: "Image 9" },
    { src: "/services/clientsCarousel/logo5.png", alt: "Image 10" },
    { src: "/services/clientsCarousel/logo6.png", alt: "Image 11" },
    { src: "/services/clientsCarousel/logo8.png", alt: "Image 12" },
  ];

  return (
    <section className=" relative flex flex-wrap z-0">
      <aside className="relative flex z-5">
      <div className="w-full bg-gradient-to-b from-[#0853FC] via-[#FFFFFF] to-[#FFFFFF] mx-auto mb-1 md:pt-[53px] p-4 flex-row justify-center text-center">
      <p className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mx-auto my-10 px-5 py-1 leading-relaxed tracking-wide text-center">
      Trabajemos en equipo<br /> para impulsar tu marca
      </p>
      {/*Text and Image Clients */}
        <div className="flex flex-wrap justify-center mb-6 mx-2">
          
          <h2 className="font-light bg-[#FB8A00] text-white my-1 text-1xl md:text-4xl lg:text-4xl px-[34px] py-[11px] border rounded-tl-xl rounded-br-xl">
            Clientes que confian en nosotros
          </h2>

            {/* Contenedor de las imágenes en dos filas */}
            <div className="grid grid-cols-6 gap-4 justify-center items-center pt-[22px]">
              {imageList.slice(0, 6).map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="object-cover object-center"
                  width={150}
                  height={150}
                  priority={true}
                  quality={100}
                />
              ))}
            </div>

            <div className="grid grid-cols-6 gap-4 justify-center items-center pt-[22px]">
              {imageList.slice(6).map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="object-cover object-center"
                  width={150}
                  height={150}
                  priority={true}
                  quality={100}
                />
              ))}
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
