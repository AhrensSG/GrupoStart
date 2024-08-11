import React from "react";
import FounderCard from "./auxiliarComponents/FounderCard";
import Link from "next/link";
//import Image from "next/image";
//import InfoViewMore from "../home/auxiliarEstaticComp/InfoViewMore";

const FourthSection = () => {
  return (
    <section id="about-us" className="w-full bg-gradient-to-b from-[#FB8A00] p-4">
      <div className="w-full h-full flex flex-col items-center gap-6 py-4">
        <h2 className="text-5xl xs:text-5xl text-white font-extrabold">Fundadores</h2>

        <div className="w-full h-full flex flex-row flex-wrap justify-center items-center gap-16">
          <FounderCard
            img={"/seba.jpeg"}
            name={"El Sebas"}
            profession={"Diseñador Grafico"}
            description={""}
            imgClassName="rounded-full border-3 border-blue-500"
          />
          {/*<FounderCard
            img={"/guille.jpeg"}
            name={"Cabezón"}
            profession={"Programador"}
            description={""}
            />*/}
          <FounderCard
            img={"/ivan.jpeg"}
            name={"Ivan"}
            profession={"Marketing"}
            description={""}
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center py-6 gap-8">
          <div>
            <Link href="/about">
            <button className="flex flex-row gap-2 items-center justify-center bg-[#0853FC] p-1 px-10 text-white text-2xl font-light rounded-tl-2xl rounded-br-2xl border border-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                fill="none"
                viewBox="0 0 28 28"
              >
                <path
                  fill="#fff"
                  d="M11.625 15.375H.375v-3.75h11.25V.375h3.75v11.25h11.25v3.75h-11.25v11.25h-3.75v-11.25Z"
                />
              </svg>
              Sobre Nosotros
            </button>
            </Link>
          </div>
          {/*<span className="text-3xl font-normal tracking-wider">
            ! Somos el futuro de tu proyecto !
            </span>*/}
        </div>
      </div>

    {/*<InfoViewMore />*/}
{/*
<div className="container mx-auto flex justify-center items-center h-screen w-full bg-white">
  <div className="flex flex-col md:flex-row w-full">
    <div className="w-full md:w-1/2">
      <Image
        src={"/jirafe1.svg"}
        className="object-cover transition-opacity opacity-0 duration-500"
        onLoad={(event) => event.target.classList.remove("opacity-0")}
        width={595}
        height={265}
        priority={true}
        quality={100}
      />
    </div>
    <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-[#0853FC] text-center text-2xl md:text-4xl lg:text-5xl">La Era de las Redes Sociales</h1>
      <span classname="text text-lg mb-3 text-center text-3xl  leading-relaxed tracking-wide">
        Actualmente vivimos en la era de las redes, quien trajo consigo un sin fin de oportunidades para todos los negocios, permítenos ayudarte a implementar estrategias que ayudarán a tu proyecto alcanzar el siguiente nivel.
      </span>
      <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded item-center flex flex-row gap-2 items-center justify-center p-1 px-10 text-white text-2xl hover:bg-[#0853FC] hover:text-white font-medium duration-300">Ver más</button>
    </div>
  </div>
  <div className="wave absolute h-0 w-full bg-blue-500 inset-x-0 my-0 bottom-static object-cover overflow">
    <svg xmlns="http://www.w3.org/200/svg" viewBox="0 0 1440 320">
      <path fill="#007bff" fill-opacity="10" d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
    </svg>
  </div>
</div>
  */}
    </section>
  );
};

export default FourthSection;
