"use client";
import { Context } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";
import React, { useContext, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/carrousel/Carousel";
import DesktopCommunityManagerSection from "@/components/services/auxiliarComponents/DesktopCommunityManagerSection";
import Forms from "../servicesV2/formulario/Forms";

const CommunityManager = () => {

  const handleClick = () => {
    // Redirige al link de WhatsApp con el número y un mensaje personalizado
    window.open(
      "https://wa.me/+543704619402?text=¡Hola!%20Me%20gustaría%20saber%20más%20sobre%20sus%20servicios",
      "_blank",
      "noopener noreferrer"
    );
  };


  const planCardsRef = useRef(null); // Referencia a la sección de PlanCards
  const scrollToPlanCards = () => {
    // Hacer scroll a la sección de PlanCards
    if (planCardsRef.current) {
      planCardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  const { data } = useContext(Context);
  const router = useRouter();

  {/*// Elements for the circle map
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
};*/}

  return (

<aside className="relative flex-col w-full bg-white mx-[1%]">
      {/*Section 1*/}
    <section className="relative bg-[#0853FC] flex w-full py-3 md:pb-12 sm:pb-24 px-[1%] md:flex-row sm:flex-col xs:flex-col max-xs:flex-col">
    <div className="container flex-col pb-2 gap-16 md:ml-1 md:pl-[3%] pt-[55px] md:text-start sm:text-center xs:text-center max-xs:text-center"
            style={{
            maxWidth: "1600px",
            paddingLeft: "3%",
            paddingRight: "2%",
          }}>
      <span className="text-5xl text-[#FB8A00] pb-[15px] font-bold justify-start md:items-start md:text-start sm:text-center sm:items-center max-xs:text-center max-xs:justify-items-center">
        Gestión de <span className="hidden md:inline"> <br /></span>Redes Sociales
      </span>
      <div className="pt-[20px] gap-16 sm:justify-center">
        <span className="text-white text-xl w-full sm:text-center">
          Es tiempo de invertir en tus redes <span className="hidden md:inline"> <br /></span>
          para impulsar tu negocio, creación y <span className="hidden md:inline"> <br /></span>
          gestión de contenidos que conecten <span className="hidden md:inline"> <br /></span>
          con tu audiencia y aumenten la <span className="hidden md:inline"> <br /></span>
          visibilidad de tu marca, conocé más en <span className="hidden md:inline"> <br /></span>
          este video explicativo.
        </span>
      </div>
      <div className="py-[30px] sm:justify-center max-xs:justify-items-center">
        <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-light py-1 px-4 rounded text-md" onClick={scrollToPlanCards}>
          Comenzar
        </button>
      </div>
    </div>
    
    {/* Sección del reproductor de video */}
    <div className="flex items-end justify-end w-full md:pr-[2%] rounded lg:w-full lg:h-full md:w-1/2 md:h-1/2 sm:w-full sm:h-auto sm:flex-row max-xs:w-auto max-xs:h-auto">
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
          className="rounded-[68px] flex-row"
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
        d="M0,300L48,285C96,270,192,250,288,235C384,220,480,210,576,205C672,210,768,220,864,235C960,250,1056,270,1152,285C1248,300,1344,310,1392,315C1432,320,1440,315,1440,315L1440,0L1392,0L1248,0L1152,0L1056,0L960,0L864,0L768,0L672,0L576,0L480,0L384,0L288,0L192,0L96,0L48,0L0,0Z"
      />
    </svg>
  </div>

  {/* Overlap the wave with the image */}
  <div className="relative flex flex-col items-center z-10">
  {/* Contenedor de Imagen */}
  <div className="relative flex justify-center items-center w-full">
  <Image
  src={"/services/Jirafe3.svg"}
  width={270}
  height={300}
  quality={100}
  className={`
    max-xs:w-[100px] max-xs:mt-[-15%] max-xs:translate-y-[-16%]
    xs:w-[160px] xs:mt-[-15%] xs:translate-y-[-16%]
    sm:w-[200px] sm:mt-0
    md:w-[250px] md:mt-[-10%] md:translate-y-[-33%] md:mb-[-10vw]
    lg:w-[300px] lg:mt-[-30%] lg:translate-y-[-33%] lg:mb-[-14vw]
    xl:w-[350px] xl:mt-[-40%] xl:translate-y-[-33%]
  `}
/>

  </div>

  {/* Sección de Texto */}
  <div className="text-center mt-5 md:mt-10 lg:mt-14">
    <span className="sm:text-2xl md:text-4xl lg:text-5xl font-bold text-[#0853FC]">
      Ayudamos a que tus redes<br />
      alcancen su máximo potencial.
    </span>
  </div>
</div>

    <Carousel />
      </section>

{/* Section 3 */}
<section className="relative flex flex-wrap w-full h-auto justify-center items-center bg-white pb-[10px] px-[2%] bottom-[-160px] md:bottom-[-60px] sm:bottom-[-30px] xs:bottom-[-10px] sm:flex-col max-xs:flex-col">
  <div className="flex md:flex-row w-full sm:flex-col max-xs:flex-col sm:items-center max-xs:items-center">
    {/* Text */}
    <div className="w-full relative flex flex-col md:items-start sm:items-center max-xs:items-center justify-center bg-grey-700 md:pl-[4%]">
      <span className="max-xs:text-2xl sm:text-4xl md:text-3xl lg:text-5xl max-xs:text-center sm:text-center font-bold mb-[28px] text-[#FB8A00] md:text-start lg:text-start">
        Hacemos <span className="hidden md:inline"> <br /></span>
        crecer <span className="hidden md:inline"> <br /></span>
        tu negocio <span className="hidden md:inline"> <br /></span>
        en redes
      </span>
      <span className="xs:text-lg md:text-xl sm:text-xl lg:text-3xl sm:text-center max-xs:text-center sm:mb-[40px] max-xs:mb-6 md:text-start leading-relaxed tracking-wide">
        Llegá a nuevos <span className="hidden md:inline"> <br /></span>
        clientes en todas <span className="hidden md:inline"> <br /></span>
        las plataformas Meta
      </span>
      
        <button className="bg-[#0853FC] hover:bg-[#FB8A00] text-white font-bold md:py-2 max-xs:py-1 md:px-4 max-xs:px-2 rounded sm:text-2xl max-xs:text-lg hover:text-[#FFFFFF]  duration-300 shadow-md shadow-black border-orange-500 md:mb-[2%]" onClick={scrollToPlanCards}>
          Empezar
        </button>
      
    </div>

    {/* Image */}
    <div className="w-full flex md:justify-end sm:justify-items-center xs:pr-[4%]">
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
<section className="relative bg-[#FFFFFF] max-xs:flex-col sm:flex-col md:flex-row md:mt-6 xs:my-8 max-xs:mt-16">
  <div className="flex md:flex-row w-full bg-[#FFFFFF] px-[2%] sm:flex-row xs:flex-grow max-xs:flex-col xs:py-2 max-xs:py-8">
    {/* Image */}
    <div className="w-full flex justify-start pl-[4%] md:w-[50vw] md:mt-5 sm:w-[70vw] xs:w-[50vw] xs:margin-2 xs:justify-items-center max-xs:justify-items-center max-xs:w-auto max-xs:mt-12">
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
      <span className="font-bold text-[#FB8A00] xs:text-end max-xs:text-center flex flex-col justify-end items-center max-xs:text-4xl md:text-5xl lg:text-7xl leading-snug">
        Un perfil <span className="hidden md:inline"> <br /></span>
        optimizado <span className="hidden md:inline"> <br /></span>
        al 100%
      </span>
    </div>
  </div>
</section>


{/* Section 5 */}
<section className="relative bg-[#FFFFFF] px-[2%] lg:flex-grow md:flex-grow sm:flex-col xs:flex-col max-xs:flex-col">
  <div className="flex md:flex-row w-full bg-[#FFFFFF] md:py-6 lg:py-1 xs:flex-col max-xs:flex-col sm:flex-col">
    {/* Image */}
    <div className="flex xs:items-start max-xs:items-center justify-center md:pl-[4%] xl:w-full xl:h-full lg:w-[85vh] lg:h-[80vh] md:w-[40vh] md:h-[53vh] lg:pt-[6%] md:pt-[7%] xs:px-[2%]">
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
    <div className="lg:w-2/4 md:w-2/4 relative flex flex-col xs:items-end max-xs:justify-items-center max-xs:text-center justify-center xs:text-end mt-2 lg:pr-[4%] md:pr-[2%] max-xs:px-[2%]">
      <span className="xs:text-2xl md:text-3xl lg:text-5xl font-bold mb-[2px] text-[#0853FC] xs:text-end max-xs:text-center">
        Conocé a tu audiencia <span className="hidden md:inline"> <br /></span>
        es la clave del éxito
      </span>
      <span className="font-light mb-[40px] text-black xs:text-end max-xs:text-center md:text-md lg:text-xl xl:text-2xl leading-relaxed tracking-wide mt-4">
        Segmentar y entender a tu audiencia es fundamental <span className="hidden md:inline"> <br /></span>
        para crear campañas de marketing efectivas para <span className="hidden md:inline"> <br /></span>
        obtener éxito de tu negocio en redes sociales. <span className="hidden md:inline"> <br /></span>
        Conocer sus edades, intereses, comportamientos y <span className="hidden md:inline"> <br /></span>
        necesidades permite diseñar mensajes que realmente <span className="hidden md:inline"> <br /></span>
        resuenen e impacten en cada persona, maximizando el <span className="hidden md:inline"> <br /></span>
        impacto y minimizando los esfuerzos desperdiciados.
      </span>
    </div>
  </div>
</section>

{/* Section 6 */}
<section className="relative flex flex-wrap w-screen h-auto justify-center items-center bg-white sm:flex-row xs:flex-row max-xs:flex-col">
  <div className="flex xs:flex-row max-xs:flex-col w-full lg:-mb-[10%] md:mb-[3%]">
    {/* Text */}
    <div className="w-full relative flex flex-col xs:items-start max-xs:items-center justify-center bg-grey-700 pl-[5%]">
      <span className="text-2xl md:text-3xl lg:text-5xl font-bold mb-[2%] text-[#0853FC] xs:text-start max-xs:text-center">
        Tu perfil es tu tarjeta <span className="hidden md:inline"> <br /></span>
        de presentación
      </span>
      <span className="xs:text-md md:text-xl sm:text-lg lg:text-2xl md:pb-[5%] xs:text-start max-xs:text-center leading-relaxed tracking-wide font-ligth">
        Tu biografía es la primera impresión que los posibles <span className="hidden md:inline"> <br /></span>
        clientes tienen de tu marca en redes sociales. <span className="hidden md:inline"> <br /></span>
        Optimizamos tu diseño y contenido para reflejar la <span className="hidden md:inline"> <br /></span>
        identidad de tu marca, asegurando que cada <span className="hidden md:inline"> <br /></span>
        publicación contribuya a construir una imagen <span className="hidden md:inline"> <br /></span>
        coherente y atractiva.
      </span>
      
        <button className="bg-[#FB8A00] hover:bg-[#FFFFFF] text-white font-bold xs:py-2 xs:px-4 max-xs:py-1 max-xs:px-2 xs:text-2xl max-xs:text-xl max-xs:mt-2 hover:text-[#FB8A00] duration-300 shadow-sm shadow-black border-orange-500 rounded-md z-10 relative">
        <Link href="/contact#contact-form">Contactar</Link>
        </button>
      
    </div>

    {/* Image */}
    <div className="w-full flex justify-end items-end mt-6 rounded-br-xl right-0 pl-[2%] md:w-3/4 md:mb-[-15%] sm:mb-[-10%] xs:mb-[-10%] max-xs:mb-[-15%] lg:mb-0">
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
      <path fill="#0853FC" fillOpacity="10" d="M0,160L48,186.7C96,213,192,267,288,277.3C384,288,480,256,576,245.3C672,235,768,245,864,240C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
    </svg>
  </div>
</section>

{/* Section 7 */}
<section className="relative bg-[#0853FC] py-6 px-[2%] sm:flex-row max-xs:flex-col">
  <div className="flex xs:flex-row max-xs:flex-col w-full">
        {/* Image */}
        <div className="md:w-full flex xs:justify-start max-xs:justify-items-center mt-6 pl-[3%] xs:w-full sm:w-full h-auto">
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
    <div className="w-full md:w-1/2 sm:w-1/2 xs:w-1/3 max-xs:w-full relative flex flex-col xs:items-end max-xs:items-center max-xs:text-center justify-center md:text-end pr-0 md:pr-16">
      <span className="xs:text-2xl md:text-4xl lg:text-5xl font-bold mb-[2px] text-[#FFFFFF]">
        Creamos los <span className="hidden md:inline"> <br /></span>
        contenidos <span className="hidden md:inline"> <br /></span>
        estratégicos <span className="hidden md:inline"> <br /></span>
        que atraen
      </span>
      <span className="xs:text-2xl md:text-4xl lg:text-5xl font-bold mb-[40px] text-[#FB8A00] mt-4">
        y conectan con <span className="hidden md:inline"> <br /></span>
        tu audiencia
      </span>
    </div>
  </div>
</section>

      {/*Section CircleMap */}
      <section className="bg-[#0853FC] text-white flex-col justify-items-center py-6 px-[2%]">
        {/* Title */}
        <div className="text-center justify-center items-center text-2xl md:text-5xl lg:text-5xl">
          <h2 className="text-[#FFFFFF] font-semibold mt-4">
            Contratas a Start, contratas un equipo <span className="hidden md:inline"> <br /></span>
            de <span className="text-[#FB8A00] font-semibold">trabajo profesional</span>
          </h2>
        </div>
    <div clasName="flex-row justify-center items-center object-center px-[6%] py-6 w-[100%]">
      <Image
      src="/services/img360Equipo.png"
      alt="Imagen360Equipo"
      width={814}
      height={556}
      quality={100}
      className="object-cover relative justify-center items-center object-center w-[100%] lg:px-[10%] md:px-[9%] py-8"
      priority={true}
      />
      </div>

    <div className="flex relative items-center justify-center text-center mx-[20px] lg:px-[250px] md:px-[10px]">
    <span className="text-[#FB8A00] text-center justify-center items-center lg:text-4xl md:text-3xl text-light">Contarás con equipo con un mínimo de 7 personas.</span>
    </div>
      </section>

      {/*PlanCards*/}
      <div ref={planCardsRef}>
        <DesktopCommunityManagerSection style={{
          width: "full"
        }} />
      </div>

      {/*Formulario*/}
      <Forms
      style={{paddingX: "2%"}}
      />

      {/*Section FootSuperior*/}
      <section className="w-full px-[2%] sm:flex-row max-xs:flex-col max-xs:pb-[3%]">
        <div className="flex xs:flex-row max-xs:flex-col md:w-full xs:w-auto bg-[#FFFFFF] px-[2%]">
          {/* Image */}
          <div className="w-full xs:pl-[2%] max-xs:bottom-[15vh] max-xs:mb-[15vh]">
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
          <span className="hidden md:inline"> <br /></span>
          {/* Text */}
          <div className="w-full relative flex flex-col xs:items-end xs:justify-end xs:text-end xs:pr-[3%] xs:pb-[8%] max-xs:justify-items-center max-xs:pt-[3vh]">
            <span className="xs:text-3xl font-bold mb-[2px] text-[#FB8A00] xs:text-end max-xs:text-center md:text-5xl lg:text-6xl pr-[1%]">
              ¿Estás listo <span className="hidden md:inline"> <br /></span>
              para trabajar <span className="hidden md:inline"> <br /></span>
              en serio?
            </span>
            <br/>
            <span className="font-light mb-[40px] xs:text-end max-xs:text-center xs:text-lg md:text-3xl leading-relaxed tracking-wide pr-[1%]" style={{top: -2}}>
              Te ayudamos a elegir <span className="hidden md:inline"> <br /></span>
              el plan para potenciar <span className="hidden md:inline"> <br /></span>
              las redes de tu negocio
            </span>
            
            <button className="bg-[#FB8A00] justify-end hover:bg-blue-700 text-white font-ligth py-1 xs:px-4 max-xs:px-2 rounded max-xs:text-lg xs:text-2xl items-center" onClick={handleClick}>
              Hablá con un asesor
            </button>
            
        </div>
        </div>
      </section>
</aside>

  );
};

export default CommunityManager;