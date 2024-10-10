"use client";
import { Context } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/carrousel/Carousel";
import DesktopCommunityManagerSection from "@/components/services/auxiliarComponents/DesktopCommunityManagerSection";
import Forms from "../servicesV2/formulario/Forms";

const CommunityManager = () => {
  const { data } = useContext(Context);
  const router = useRouter();

  // Elements for the circle map
  const elements = [
    { text: "👤Diseñador\nGráfico"},
    { text: "👤Creativo\nPublicitario" },
    { text: "👤Comunnity Manager" },
    { text: "👤Social\nMedia" },
    { text: "👤Coordinador\nde Social Media" },
    { text: "👤Project Manager"},
    { text: "👤Coordinador de Media"},
  ];


  const circleMapStyles = {
    stroke: "#FFFFFF",
    strokeWidth: 1,
    fill: "none",
  };
  
  const textStyles = (index) => {
    const isLeftSide = index < elements.length / 2;
    const textAlign = isLeftSide ? "start" : "end";
  return {
    fontSize: "16px",
    fontWeight: "light",
    fill: "#FFFFFF",
    textAlign: "center",
  };
};

  return (

<aside className="relative flex-col w-full bg-white mx-[1%]">
      {/*Section 1*/}
    <section className="relative bg-[#0853FC] flex w-full py-3 md:pb-12 sm:pb-24 px-[1%]">
    <div className="container flex-col pb-2 gap-16 ml-1 pl-[3%] pt-[55px]"
            style={{
            maxWidth: "1600px",
            paddingLeft: "3%",
            paddingRight: "2%",
          }}>
      <span className="text-5xl text-[#FB8A00] pb-[15px] font-bold justify-start items-start text-start">
        Gestión de<br />Redes Sociales
      </span>
      <div className="pt-[20px] gap-16">
        <span className="text-white text-xl w-full">
          Es tiempo de invertir en tus redes<br />
          para impulsar tu negocio, creación y<br />
          gestión de contenidos que conecten<br/>
          con tu audiencia y aumenten la<br/>
          visibilidad de tu marca, conocé más en<br/>
          este video explicativo.
        </span>
      </div>
      <div className="py-[30px]">
        <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-light py-1 px-4 rounded text-md text-2xl">
          Comenzar
        </button>
      </div>
    </div>
    
    {/* Sección del reproductor de video */}
    <div className="flex items-end justify-end w-full pr-[2%] rounded lg:w-full lg:h-full md:w-1/2 md:h-1/2 sm:w-1/4 sm:h-1/4">
          <div style={{
              paddingTop: '5px',
              width: '842px',
              height: '474px',
            }}
            >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-[68px]"
        ></iframe>
      </div>
      </div>
    </section>

      {/* Section 2 */}
      <section className="relative bg-white flex flex-col justify-center items-center w-full">
  {/* SVG wave */}
  <div className="w-full top-0">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      className="w-full h-auto"
      style={{ position: "relative" }}
    >
      <path
        fill="#0853FC"
        fillOpacity="10"
        d="M0,300L48,285C96,270,192,250,288,235C384,220,480,210,576,205C672,210,768,220,864,235C960,250,1056,270,1152,285C1248,300,1344,320,1392,325L1440,330L1440,0L1392,0L1248,0L1152,0L1056,0L960,0L864,0L768,0L672,0L576,0L480,0L384,0L288,0L192,0L96,0L48,0L0,0Z"
      />
    </svg>
  </div>

  {/* Overlap the wave with the image */}
  <div className="relative justify-center items-center object-center flex flex-col z-10">
    <Image
      src={"/services/Jirafe3.svg"}
      width={270}
      height={300}
      quality={100}
      className="w-full max-w-xs md:max-w-md lg:max-w-lg"
      style={{
        zIndex: 15,
        position: "relative",
        top: -260,
        bottom: -200,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    />
  </div>

  {/* Text section */}
  <div className="text-center mt-[-230px]">
    <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#0853FC]">
      Ayudamos a que tus redes<br />
      alcancen su máximo potencial.
    </span>
  </div>

    <Carousel />
      </section>

{/* Section 3 */}
<section className="relative flex flex-wrap w-full h-auto justify-center items-center bg-white pb-[10px] px-[2%] bottom-[-160px] md:bottom-[-60px]">
  <div className="flex flex-row w-full">
    {/* Text */}
    <div className="w-full relative flex flex-col items-start justify-center bg-grey-700 pl-[4%]">
      <span className="text-2xl md:text-3xl lg:text-5xl font-bold mb-[28px] text-[#FB8A00] text-start">
        Hacemos<br />
        crecer<br />
        tu negocio<br />
        en redes
      </span>
      <span className="text-lg md:text-xl sm:text-4xl lg:text-3xl mb-[40px] text-start leading-relaxed tracking-wide">
        Llegá a nuevos<br />
        clientes en todas<br />
        las plataformas Meta
      </span>
      <Link href="/">
        <button className="bg-[#0853FC] hover:bg-[#FB8A00] text-white font-bold py-2 px-4 rounded text-2xl hover:text-[#FFFFFF] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md">
          Empezar
        </button>
      </Link>
    </div>

    {/* Image */}
    <div className="w-full flex justify-end pr-[4%]">
      <Image
        src={"/services/ImgSct3GR.png"}
        alt="Imagen de la sección 3"
        className="object-cover transition-opacity opacity-0 duration-500"
        onLoad={(event) => event.target.classList.remove("opacity-0")}
        width={834}
        height={844}
        priority={true}
        quality={100}
        style={{top: 35, bottom: -25, zIndex: 20, right: -20}}
      />
    </div>
  </div>
</section>

{/* Section 4 */}
<section className="relative bg-[#FFFFFF]">
  <div className="flex md:flex-row w-full bg-[#FFFFFF] px-[2%]">
    {/* Image */}
    <div className="w-full flex justify-start pl-[4%] md:w-3/4">
      <Image
        src={"/services/ImgSct4GR.png"}
        alt="Imagen de la sección 4"
        className="object-cover transition-opacity opacity-0 duration-500"
        onLoad={(event) => event.target.classList.remove("opacity-0")}
        width={908}
        height={564}
        priority={true}
        quality={100}
      />
    </div>
    {/* Text */}
    <div className="flex justify-center items-center text-end pr-[4%]">
      <span className="font-bold text-[#FB8A00] text-end flex flex-col justify-end items-center text-4xl md:text-5xl lg:text-7xl leading-snug">
        Un perfil<br />
        optimizado<br />
        al 100%
      </span>
    </div>
  </div>
</section>


{/* Section 5 */}
<section className="relative bg-[#FFFFFF] px-[2%]">
  <div className="flex flex-row w-full bg-[#FFFFFF] md:py-6 lg:py-1">
    {/* Image */}
    <div className="flex items-start justify-center md:pl-[4%] lg:w-[100vh] lg:h-[80vh] md:w-[53vh] md:h-[53vh] lg:pt-[6%] md:pt-[7%]">
      <Image
        src={"/services/ImgSct5GR.png"}
        alt="Imagen de la sección 5"
        className="object-cover transition-opacity opacity-0 duration-500"
        onLoad={(event) => event.target.classList.remove("opacity-0")}
        width={620}
        height={483}
        priority={true}
        quality={100}
      />
    </div>
    {/* Text */}
    <div className="lg:w-2/4 md:w-2/4 relative flex flex-col items-end justify-center text-end mt-2 lg:pr-[4%] md:pr-[2%]">
      <span className=" md:text-3xl lg:text-5xl font-bold mb-[2px] text-[#0853FC] text-end">
        Conocé a tu audiencia<br />
        es la clave del éxito
      </span>
      <span className="font-light mb-[40px] text-black text-end md:text-md lg:text-xl xl:text-2xl leading-relaxed tracking-wide mt-4">
        Segmentar y entender a tu audiencia es fundamental<br />
        para crear campañas de marketing efectivas para<br />
        obtener éxito de tu negocio en redes sociales.<br /><br />
        Conocer sus edades, intereses, comportamientos y<br />
        necesidades permite diseñar mensajes que realmente<br />
        resuenen e impacten en cada persona, maximizando el<br />
        impacto y minimizando los esfuerzos desperdiciados.
      </span>
    </div>
  </div>
</section>

{/* Section 6 */}
<section className="relative flex flex-wrap w-screen h-auto justify-center items-center bg-white">
  <div className="flex flex-row w-full lg:-mb-[10%] md:mb-[3%]">
    {/* Text */}
    <div className="w-full relative flex flex-col items-start justify-center bg-grey-700 pl-[5%]">
      <span className="text-2xl md:text-3xl lg:text-5xl font-bold mb-[2%] text-[#0853FC] text-start">
        Tu perfil es tu tarjeta<br />
        de presentación
      </span>
      <span className="text-lg md:text-xl sm:text-lg lg:text-2xl md:pb-[5%] text-start leading-relaxed tracking-wide">
        Tu biografía es la primera impresión que los posibles<br />
        clientes tienen de tu marca en redes sociales.<br />
        Optimizamos tu diseño y contenido para reflejar la<br />
        identidad de tu marca, asegurando que cada<br />
        publicación contribuya a construir una imagen<br />
        coherente y atractiva.
      </span>
      <Link href="/contact">
        <button className="bg-[#FB8A00] hover:bg-[#FFFFFF] text-white font-bold py-2 px-4 rounded text-2xl hover:text-[#FB8A00] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md z-10 relative">
          Contactar
        </button>
      </Link>
    </div>

    {/* Image */}
    <div className="w-full flex justify-end items-end mt-6 rounded-br-xl right-0 pl-[2%] md:w-3/4 md:mb-1 ">
      <Image
        src={"/services/ImgSct6GR.png"}
        alt="Imagen de la sección 6"
        className="object-cover transition-opacity opacity-0 duration-500 rounded-br-xl"
        onLoad={(event) => event.target.classList.remove("opacity-0")}
        width={800}
        height={631}
        priority={true}
        quality={100}
      />
    </div>
  </div>
  {/* Ola */}
  <div className="relative w-full justify-end overflow-hidden bottom-0 ">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
      <path fill="#0853FC" fillOpacity="10" d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
    </svg>
  </div>
</section>

{/* Section 7 */}
<section className="relative bg-[#0853FC] py-6 px-[2%]">
  <div className="flex flex-row w-full">
        {/* Image */}
        <div className="w-full flex justify-start mt-6 pl-[3%]">
      <Image
        src={"/services/ImgSct7GR.png"}
        alt="Imagen de la sección 7"
        className="object-cover transition-opacity opacity-0 duration-500"
        onLoad={(event) => event.target.classList.remove("opacity-0")}
        width={804}
        height={485}
        priority={true}
        quality={100}
      />
    </div>
    {/* Text */}
    <div className="w-full md:w-1/2 relative flex flex-col items-end justify-center text-center md:text-end pr-0 md:pr-16">
      <span className="text-2xl md:text-4xl lg:text-5xl font-bold mb-[2px] text-[#FFFFFF]">
        Creamos los<br />
        contenidos<br />
        estratégicos<br />
        que atraen
      </span>
      <span className="text-2xl md:text-4xl lg:text-5xl font-bold mb-[40px] text-[#FB8A00] mt-4">
        y conectan con<br />
        tu audiencia
      </span>
    </div>
  </div>
</section>

      {/*Section CircleMap */}
      <section className="bg-[#0853FC] text-white py-6 px-[2%]">
        {/* Title */}
        <div className="text-center justify-center items-center text-2xl md:text-5xl lg:text-5xl">
          <h2 className="text-[#FFFFFF] font-semibold mt-4">
            Contratas a Start, contratas un equipo<br />
            de <span className="text-[#FB8A00] font-semibold">trabajo profesional</span>
          </h2>
        </div>
        {/*
        {/* Circulo con sus elementos
        <div className="flex items-center justify-center text-center relative m-[30px] p-[10px]">
          <svg width="446" height="446" viewBox="0 0 260 260" className="items-center mx-[130px] my-[2px] p-[25px] flex-auto">
          <circle cx="125" cy="125" r="95" fill="none" stroke="white" strokeWidth="1" style={circleMapStyles} />
          {elements.map((element, index) => {
              const angle = (index / elements.length) * 2 * Math.PI;
              const radius = 110; // Ajustes para el radio (distancia desde el centro con el texto)
              const x = 120 + radius * Math.cos(angle);
              const y = 120 + radius * Math.sin(angle);

              const customStyles = {
                transform: 'translateX(0px) translateY(0px)' // Inicializar con valores por defecto
              };


              // Aplicar padding personalizado según el elemento
            switch (index) {
              case 1: // Creativo Publicitario
                customStyles.transform = 'translateX(60px)';
              break;
              case 2: // Community Manager
                customStyles.transform = 'translateX(-250px) translateY(-25px)';
              break;
              case 3: // Social Media
                customStyles.transform = 'translateX(-250px) translateY(-50px)';
              break;
              case 4: // Coordinador de Media
                customStyles.transform = 'translateX(-160px) translateY(-35px)';
              break;
              case 5: // Project Manager
                customStyles.transform = 'translateX(-35px)';
              break;
              case 6: // Coordinador de Social Media
                customStyles.transform = 'translateX(30px) translateY(5px)';
              break;
              case 0: // Diseñador Grafico
                customStyles.transform = 'translateX(120px)';
              break;
              // Agrega más casos según tus necesidades
              default:
              // Si quieres aplicar un estilo por defecto a los demás elementos
                customStyles.transform = 'translateX(10px)';
                }

              return (
                <text
                  key={index} // Unique key for each element
                  x={x}
                  y={y}
                  textAnchor={textStyles(index).textAlign}
                  dominantBaseline="middle"
                  fill="white"
                  // Agregar estilos aqui
                  style={{
                    ...textStyles(index),
                    ...circleMapStyles,
                    ...customStyles,
                    fontSize: '14px', // Reducido el tamaño de la fuente
                    padding: '5px' // Añadido padding
                  }}
                >
                  {element.text}
                </text>
              );
            })}
            <text
              x="125"
              y="125"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="55px"
              fontWeight="bold"
              className="items-center justify-center"
            >
              360°
            </text>
          </svg>
    </div>
    */}
    <div clasName="w-full justify-center items-center px-[2%]">
      <Image
      src="/services/img360Equipo.png"
      alt="Imagen360Equipo"
      width={914}
      height={356}
      quality={100}
      className="object-cover relative transition-opacity opacity-0 duration-500"
      priority={true}
      />
      </div>

    <div className="flex relative items-center justify-center text-center mx-[20px] lg:px-[250px] md:px-[10px]">
    <span className="text-[#FB8A00] text-center justify-center items-center lg:text-4xl md:text-3xl text-light">Contarás con equipo con un mínimo de 7 personas.</span>
    </div>
      </section>

      {/*PlanCards*/}
      <DesktopCommunityManagerSection style={{
        width: "full"
      }} />

      {/*Formulario*/}
      <Forms 
      style={{paddingX: "2%"}}
      />

      {/*Section FootSuperior*/}
      <section className="w-full px-[2%]">
        <div className="flex flex-row w-full bg-[#FFFFFF] px-[2%]">
          {/* Image */}
          <div className="w-full pl-[2%]">
            <Image
              src={"/services/Mockupredes3.png"}
              alt="Imagen del FootSuperior"
              className="object-cover transition-opacity opacity-0 duration-500"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              width={774}
              height={708}
              priority={true}
              quality={100}
              style={{
                zIndex: 15,
                position: 'relative',
                top: 80,
                bottom: -60,
                left: '50%',
                transform: 'translateX(-50%)' }}
            />
          </div>
          <br />
          {/* Text */}
          <div className="w-full relative flex flex-col items-end justify-end text-end pr-[3%] pb-[8%]">
            <span className="text-5xl font-bold mb-[2px] text-[#FB8A00] text-end md:text-5xl lg:text-6xl pr-[1%]">
              ¿Estás listo<br />
              para trabajar<br />
              en serio?
            </span>
            <br/>
            <span className="font-light mb-[40px] text-end text-3xl leading-relaxed tracking-wide pr-[1%]" style={{top: -2}}>
              Te ayudamos a elegir<br />
              el plan para potenciar<br />
              las redes de tu negocio
            </span>
            <Link href="/contacto">
            <button className="bg-[#FB8A00] justify-end hover:bg-blue-700 text-white font-ligth py-1 px-4 rounded text-md text-2xl items-center">
              Hablá con un asesor
            </button>
            </Link>
        </div>
        </div>
      </section>
</aside>

  );
};

export default CommunityManager;