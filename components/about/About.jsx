import React from "react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-16 pt-20">
      <div className="w-full flex flex-col justify-center items-center p-2 gap-10">
        <h1 className="text-4xl font-medium text-[#0853FC]">Sobre nosotros</h1>
        <Image src={"/nosotros.png"} width={1760} height={770} alt="About" />
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
          <Image src={"/ivan.jpeg"} width={200} height={200} alt="Founder" className="rounded-full" />
          <p className="text-justify text-xl">
            Ivan Ayala, fundador y coordinador.Estudié comercio exterior y
            emprendo desde los 18 años. Lideró con pasión el área de Community
            Managers en Grupo Start, donde mi mayor talento radica en crear
            estructuras de trabajo funcionales que optimicen los procesos
            contemplando a las personas y sus talentos. Siempre impulsó a mi
            equipo y a mis clientes a alcanzar nuevas alturas, integrando la
            tecnología y la innovación en cada estrategia. Creo firmemente que
            alinear nuestras pasiones con nuestras tareas diarias es el camino
            hacia el éxito y la libertad
          </p>
        </div>
        <div className="flex flex-row justify-center items-center max-w-6xl gap-20">
          <Image src={"/seba.jpeg"} width={200} height={200} alt="Founder" className="rounded-full" />
          <p className="text-justify text-xl">
            Sebastian Vera: Visionario emprendedor, diseñador gráfico y
            publicista con amplia trayectoria en la industria, lidero y coordino
            con éxito las áreas de diseño gráfico, marketing y ventas.
            Apasionado por la innovación y el crecimiento, “hacer que suceda” es
            mi frase favorita, colaboré con marcas en su identidad y expansión,
            también con autores en el lanzamiento de sus libros, creo firmemente
            en el trabajo en equipo, estoy activamente para lograr brindar un
            servicio de calidad.
          </p>
        </div>
        <div className="flex flex-row justify-center items-center max-w-6xl gap-20">
          <Image src={"/guille.jpeg"} width={200} height={200} alt="Founder" className="rounded-full" />
          <p className="text-justify text-xl">
            Guillermo Ahrens: Soy un programador emprendedor con visión de futuro. Mi pasión por la tecnología y la innovación impulsa mi búsqueda constante de soluciones creativas. Busco desafíos que me permitan crecer y crear valor. Estoy comprometido a liderar el cambio y adaptarme a las últimas tendencias. Mi objetivo es transformar ideas en realidad y hacer una diferencia en el mundo.
          </p>
        </div>
      </div>
      {/* <Link href={"/experiences"}>
        <button className="bg-[#FB8A00] p-2 px-6 text-xl text-white rounded-tl-xl rounded-br-xl shadow-lg shadow-gray-400 hover:shadow-xl hover:shadow-gray-400 duration-500">
          Nuestra experiencia
        </button>
      </Link> */}
      <div id="contactAbout" className="relative w-full h-screen">
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
