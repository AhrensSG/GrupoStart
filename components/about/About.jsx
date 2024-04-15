import React from "react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-16 pt-20">
      <div className="w-full flex flex-col justify-center items-center p-2 gap-10">
        <h1 className="text-4xl font-medium text-[#0853FC]">Sobre nosotros</h1>
        <Image src={"/About.svg"} width={800} height={350} alt="About" />
        <p className="max-w-[800px] text-justify text-xl">
          Somos una agencia de Marketing y desarrollo web enfocada en conectarte
          al mundo digital, trabajamos con emprendedores y empresarios de todos
          los niveles.
          <br />
          <br />
          La era de internet y en particular la que estamos viviendo "La era de
          las redes sociales" trajo consigo un sin fin de oportunidades para
          vos, permitinos ayudarte a implementar estrategias que le permitan a
          tu proyecto alcanzar el siguiente nivel.
        </p>
      </div>
      <div className="w-full grid justify-items-center">
        <div className="flex flex-row justify-center items-center max-w-6xl gap-20">
          <Image src={"/Founder.svg"} width={200} height={200} alt="Founder" />
          <p className="text-justify text-xl">
            Figma ipsum component variant main layer. Strikethrough create ipsum
            arrow overflow asset. Boolean effect edit union blur fill line slice
            device create. Line asset invite connection bold library polygon.
            Prototype boolean union boolean draft union.
          </p>
        </div>
        <div className="flex flex-row justify-center items-center max-w-6xl gap-20">
          <Image src={"/Founder.svg"} width={200} height={200} alt="Founder" />
          <p className="text-justify text-xl">
            Figma ipsum component variant main layer. Strikethrough create ipsum
            arrow overflow asset. Boolean effect edit union blur fill line slice
            device create. Line asset invite connection bold library polygon.
            Prototype boolean union boolean draft union.
          </p>
        </div>
        <div className="flex flex-row justify-center items-center max-w-6xl gap-20">
          <Image src={"/Founder.svg"} width={200} height={200} alt="Founder" />
          <p className="text-justify text-xl">
            Figma ipsum component variant main layer. Strikethrough create ipsum
            arrow overflow asset. Boolean effect edit union blur fill line slice
            device create. Line asset invite connection bold library polygon.
            Prototype boolean union boolean draft union.
          </p>
        </div>
      </div>
      <Link href={'/experiences'}>
        <button className="bg-[#FB8A00] p-2 px-6 text-xl text-white rounded-tl-xl rounded-br-xl shadow-lg shadow-gray-400 hover:shadow-xl hover:shadow-gray-400 duration-500">
          Nuestra experiencia
        </button>
      </Link>
      <div className="relative w-full h-screen">
        <Image
          src={"/AboutFooter.svg"}
          fill
          alt="Footer About Us"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
};

export default About;
