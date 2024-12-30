import Image from "next/image";
import React from "react";
import Link from "next/link";

const InfoViewMore = () => {
  return (
    <section className="relative w-full justify-center items-center bg-white h-full md:mt-1">
      <div className="flex max-xs:flex-col xs:flex-col md:flex-row w-full lg:pb-[10%] md:pb-[12%] xs:pb-[15%] max-xs:pb-[16%] lg:px-0 md:px-0 h-full items-center">
        {/* Imagen */}
        <div className="flex xs:justify-items-center md:items-start md:justify-start lg:w-full md:w-[75%] xs:w-[40vh] max-xs:w-[25vh] order-2 md:order-1 xs:px-[6%] md:px-0">
          <Image
            src={"/jirafe1.svg"}
            alt="Jirafa futurista"
            className="object-contain transition-opacity opacity-0 duration-500"
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            width={600}
            height={400}
            priority={true}
            quality={100}
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>

        {/* Texto */}
        <div className="w-full relative flex flex-col items-center justify-center order-1 md:order-2 text-center md:text-left md:px-4 xs:px-2 xs:pb-4 max-xs:pb-6">
          <h1 className="xl:text-4xl font-bold lg:mb-[28px] xs:mb-[14px] text-[#0853FC] max-xs:text-3xl xs:text-3xl md:text-2xl lg:text-4xl xs:pt-4">
            La Era de las Redes Sociales
          </h1>
          <span className="mb-[10px] xs:text-xl lg:text-2xl leading-relaxed tracking-wide text-center">
            La era de las redes sociales fue un <span className="hidden md:inline"> <br /></span>
            verdadero Tsunami para el marketing tradicional <span className="hidden md:inline"> <br /></span>
            ¿Estás preparado para surfear la ola? <span className="hidden md:inline"> <br /></span>
            No te quedes debajo de ella, puede ser peligroso, <span className="hidden md:inline"> <br /></span>
            además surfearla es mucho más divertido.
          </span>
          <button className="bg-[#FB8A00] hover:bg-[#0853FC] text-white font-bold py-2 px-4 flex items-center justify-center text-lg sm:text-xl md:text-2xl hover:text-[#FB8A00] duration-300 shadow-sm shadow-black border-orange-500 rounded-md">
            <Link href="/services/DesktopCommunityManager">Más Info</Link>
          </button>
        </div>
      </div>

      {/* Ola gráfica */}
      <div className="absolute w-full justify-end bottom-0">
        <svg
          xmlns="http://www.w3.org/200/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#0853FC"
            fillOpacity="10"
            d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default InfoViewMore;