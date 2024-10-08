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
    <section className="w-full relative flex flex-col z-0 justify-center"> {/* Ocupa todo el ancho de la pantalla */}
      <aside className="relative flex z-5 w-full justify-center">
        <div className="w-full bg-gradient-to-b from-[#0853FC] via-[#FFFFFF] to-[#FFFFFF] p-6">
          <div className="flex flex-col justify-items-center mb-6 px-[2%] gap-6"> {/* Padding interno del 2% */}
            <p className="text-3xl md:text-5xl lg:text-5xl xl:text-7xl font-bold text-white mx-auto px-5 leading-relaxed tracking-wide text-center">
              Trabajemos en equipo
              <br /> para impulsar tu marca
            </p>
            <div className="relative py-[31px] px-5 flex justify-center">
  <h2
    className="font-light bg-[#FB8A00] text-white justify-items-center text-center rounded-tl-xl rounded-br-xl lg:text-3xl md:text-2xl"
    style={{ width: '519px', height: '66px', lineHeight: '66px', justifyContent: "center" }}
  >
    Clientes que confian en nosotros
  </h2>
</div>

<div className="flex flex-col justify-center mb-2 mx-[4%]">
  {/* Contenedor de las imágenes en dos filas */}
  <div className="flex justify-center px-[2%]">
    <div className="grid grid-cols-6 xl:gap-1 lg:gap-2 md:gap-2 pt-[22px] md:w-3/4 lg:w-full">
      {imageList.slice(0, 6).map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          className="object-cover object-center"
          width={165}
          height={155}
          priority={true}
          quality={100}
        />
      ))}
    </div>
  </div>

  <div className="flex justify-center px-[2%]">
    <div className="grid grid-cols-6 xl:gap-1 lg:gap-2 md:gap-2 pt-[22px] md:w-3/4 lg:w-full">
      {imageList.slice(6).map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          className="object-cover object-center"
          width={160}
          height={145}
          priority={true}
          quality={100}
        />
      ))}
    </div>
  </div>
</div>
        </div>
        </div>
      </aside>
      {/* FutureJirafeImageBg and Text */}
      <EstaticSign />
    </section>
  );
};

export default ThirdSection;
