import Image from "next/image";
import React from "react";

const InfoViewMore = () => {
    return (
    <section className="relative flex flex-wrap w-auto h-screen justify-center items-center bg-white">
    <div className="container flex flex-col md:flex-row w-full">    
    {/*Image*/}
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
        <br />
    {/*Text*/}
    <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-[#0853FC] text-center text-2xl md:text-4xl lg:text-5xl">La Era de las Redes Sociales</h1>
        <span className="text text-lg mb-3 text-center text-3xl  leading-relaxed tracking-wide">
        Actualmente vivimos en la era de las redes, quien trajo consigo un sin fin de oportunidades para todos los negocios, permítenos ayudarte a implementar estrategias que ayudarán a tu proyecto alcanzar el siguiente nivel.
        </span>
        <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded item-center flex flex-row gap-2 items-center justify-center p-1 px-10 text-white text-2xl hover:bg-[#0853FC] hover:text-white font-medium duration-300">Ver más</button>
    </div>
    </div>
    {/*Ola*/}
    <div className="absolute w-full justify-end overflow-hidden bottom-0">
        <svg xmlns="http://www.w3.org/200/svg" viewBox="0 0 1440 320"  className="w-full h-auto">
        <path fill="#0853FC" fill-opacity="10" d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
        </svg>
    </div>
    </section>
        );
    };

export default InfoViewMore;