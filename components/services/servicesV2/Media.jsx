"use client";
import { Context } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/carrousel/Carousel";
import DesktopWebDevelopmentSection from "@/components/services/auxiliarComponents/DesktopWebDevelopmentSection";

const Media = () => {

  const handleClick = () => {
    // Redirige al link de WhatsApp con el número y un mensaje personalizado
    window.open(
      "https://wa.me/+543704619402?text=¡Hola!%20Me%20gustaría%20saber%20más%20sobre%20sus%20servicios",
      "_blank",
      "noopener noreferrer"
    );
  };

  const { data } = useContext(Context);
  const router = useRouter();

  const [scale, setScale] = useState(1);


  return (
    <aside className="relative flex-col w-full h-full"
    style={{
      width: "100%",
      height: "100%",
      overflowX: "hidden",
    }}
    >
      {/* Section 1 */}
      <section className="relative bg-[#0853FC] flex w-full py-3 md:pb-12 sm:pb-24 px-[1%] md:flex-row sm:flex-col xs:flex-col max-xs:flex-col">
        <div className="container flex-col pb-2 gap-16 ml-1 pl-[3%] pt-[55px] md:text-start sm:text-center xs:text-center max-xs:text-center sm:items-center xs:items-center max-xs:items-center sm:flex-col-center xs:flex-col-center max-xs:flex-col-center"
            style={{
              maxWidth: "1600px",
              paddingLeft: "3%",
              paddingRight: "2%",
            }}>
          <span className="text-5xl text-[#FB8A00] pb-[15px] font-bold justify-start items-start text-start sm:text-center xs:text-center max-xs:text-center">
            Media: edición <span className="hidden md:inline"> <br /></span>de videos <span className="hidden md:inline"> <br /></span>e imágenes
          </span>
          <div className="pt-[20px] gap-16 sm:justify-center max-xs:justify-center">
            <span className="text-white text-xl w-full sm:text-center xs:text-center max-xs:text-center">
              Destacá entre la competencia con <span className="hidden md:inline"> <br /></span>
              diseños únicos y llamativos, maximizá el <span className="hidden md:inline"> <br /></span>
              potencial de tus videos con edición <span className="hidden md:inline"> <br /></span>
              profesional para lograr el éxito, <span className="hidden md:inline"> <br /></span>
              te asesoramos gratis!.
            </span>
          </div>
          <div className="py-[30px] sm:justify-center xs:justify-center max-xs:justify-items-center">
            <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-light py-1 px-4 rounded text-md">
              <Link href="/contact#contact-form">Contactar</Link>
            </button>
          </div>
        </div>

        {/* Reproductor de video */}
        <div className="flex items-end justify-end w-full md:pr-[2%] rounded lg:w-full lg:h-full md:w-1/2 md:h-1/2 sm:w-full sm:h-full xs:w-full max-xs:w-full max-xs:h-auto xs:h-auto sm:flex-row xs:flex-grow max-xs:flex-grow">
          <div style={{
                paddingTop: '5px',
                width: '842px',
                height: '474px',
              }}>
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
      <section className="relative bg-white flex-col justify-center items-center w-full">
        <div className="w-full justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-full"
            style={{ position: 'relative' }}
          >
            <path
              fill="#0853FC"
              fillOpacity="10"
              d="M0,300L48,285C96,270,192,250,288,235C384,220,480,210,576,205C672,210,768,220,864,235C960,250,1056,270,1152,285C1248,300,1344,310,1392,315C1432,320,1440,315,1440,315L1440,0L1392,0L1248,0L1152,0L1056,0L960,0L864,0L768,0L672,0L576,0L480,0L384,0L288,0L192,0L96,0L48,0L0,0Z"
            />
          </svg>
        </div>
        <br/>
        <div className="flex flex-col justify-center items-center relative z-10">
  {/* Overlap the wave with the image */}
  <div className="relative flex justify-center items-center -translate-y-1/3">
    <Image
      src={"/services/Jirafe5.svg"}
      width={270}
      height={300}
      quality={100}
      className={`max-xs:w-[120px] max-xs:mt-[-16vw] max-xs:translate-y-[-18%] xs:w-[160px] xs:mt-[-20vw] sm:w-[200px] sm:mt-[-30vw] md:w-[250px] md:mt-[-30vw] lg:w-[300px] lg:mt-[-30vw] xl:w-[350px] xl:mt-[-35vw]`}
    />
  </div>
  <div className="text-center mt-[-40px] xs:mt-[-10px] max-xs:mt-[-30px]">
    <span className="font-bold text-[#0853FC] md:text-4xl lg:text-5xl sm:text-2xl xs:text-2xl max-xs:text-2xl">
      Trabajemos juntos, <span className="hidden md:inline"> <br /></span>
      tenemos el equipo creativo que necesitas
    </span>
  </div>
</div>

        <br/>
          <Carousel />
      </section>

      {/* Section 3 */}
      <section className="relative flex flex-wrap w-full justify-center items-center bg-white pb-10 px-[4%] py-[5%]">
  <div className="flex md:flex-row xs:flex-col max-xs:flex-col w-full max-w-[1600px] px-4 max-xs:py-6 max-xs:mb-2">
    {/* Text */}
    <div className="w-full flex flex-col md:items-start xs:items-center max-xs:justify-items-center justify-center md:pl-4 xs:pb-[10vw]">
      <span className="xs:text-4xl font-bold mb-7 text-[#FB8A00] md:text-start xs:text-center max-xs:text-center max-xs:text-3xl lg:text-5xl">
        Marcas <span className="hidden md:inline"> <br /></span>
        que perduran <span className="hidden md:inline"> <br /></span>
        en el tiempo
      </span>
      <span className="text mb-10 md:text-start xs:text-center max-xs:text-center lg:text-2xl md:text-2xl sm:text-xl max-xs:text-lg leading-relaxed tracking-wide font-light">
        Si queres que tu negocio <span className="hidden md:inline"> <br /></span>
        sea sostenible debes <span className="hidden md:inline"> <br /></span>
        consolidar una marca. <span className="hidden md:inline"> <br /></span>
        Permití que nuestro equipo <span className="hidden md:inline"> <br /></span>
        creativo genere la identidad <span className="hidden md:inline"> <br /></span>
        de tu negocio, TU LOGO.
      </span>

      <button className="bg-[#0853FC] hover:bg-[#FB8A00] text-white font-bold xs:py-2 max-xs:py-1 max-xs:px-3 xs:px-6 max-xs:mb-[8vh] text-xl rounded-md shadow-sm hover:text-white transition-all duration-300">
        <Link href="/contact#contact-form">Contratar</Link>
      </button>
    </div>

    {/* Image */}
    <div className="w-full justify-end md:pr-4 md:pt-[3vw]">
      <Image
        src={"/services/imgSct3Media.png"}
        className="object-cover transition-opacity opacity-0 duration-500"
        onLoad={(event) => event.target.classList.remove("opacity-0")}
        width={795}
        height={365}
        priority={true}
        quality={100}
        style={{
          position: 'relative',
          transform: 'translateY(-10%)',
        }}
      />
    </div>
  </div>
</section>


      {/* Section 4 */}
      <section className="relative bg-[#FFFFFF] flex-col justify-center items-center lg:py-6 sm:flex-grow max-xs:flex-col">
        <div className="text-center justify-center items-center mb-8 mt-0 w-full sm:mx-auto max-xs:mx-0 relative">
          <span className="bg-[#FB8A00] text-white font-bold max-xs:py-[6px] max-xs:px-[10px] xs:py-[11px] xs:px-[38px] rounded-medium border rounded-tl-full rounded-br-full text-center items-center justify-center xs:text-xl sm:text-3xl max-xs:text-lg flex-grow">
            Ejemplo de diseño de identidad Standar
          </span>
        </div>
        {/* Overlap the wave with the image */}
        <div className="relative justify-center items-center object-center flex-grow place-items:center xs:px-[2%] md:px-[4%]">
          <Image
            src={"/services/imgSct4Media.png"}
            width={1020}
            height={150}
            quality={100}
            style={{
              position: 'relative',
              top: 0,
              bottom: 15,
              left: '50%',
              transform: 'translateX(-50%)' }}
          />
        </div>
      </section>

      {/* Section 5 */}
      <section className="relative bg-[#FFFFFF] w-full pt-[10vw] xs:flex-grow max-xs:flex-col">
        <div className="flex xs:flex-row max-xs:flex-col max-xs:justify-items-center w-full bg-[#FFFFFF] xs:pl-[4%]">
          {/* Image */}
          <div className="w-full flex-grow xs:justify-start xs:items-start max-xs:justify-items-center xs:pl-[2%] max-xs:px-1 max-xs:order-2 xs:order-1             ">
            <Image
              src={"/services/imgSct5Media.png"}
              alt="Imagen de la sección 5"
              className="object-cover transition-opacity opacity-0 duration-500"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              width={1048}
              height={564}
              priority={true}
              quality={100}
            />
          </div>
          {/* Text */}
          <div className="flex xs:justify-end max-xs:justify-items-center items-center xs:text-end max-xs:text-center lg:h-[180px] lg:w-[632px] xs:rigth-0 py-2 xs:pl-1 pr-0 md:w-1/2 max-xs:w-screen xs:z-3 max-xs:z-0 max-xs:order-1 xs:order-2">
            <span className="font-bold text-[#FFFFFF] xs:text-end max-xs:text-center  max-xs:justify-center xs:justify-end items-center leading-snug xs:rounded-tl-3xl xs:rounded-bl-3xl max-xs:rounded-xl bg-blue-600 xl:w-[500px] xl:h-auto xl:py-auto xl:ml-[10vw] xl:pr-[4vw] lg:w-[465px] lg:h-[107px] lg:pl-[45px] lg:pr-[7vh] lg:py-[5vh] md:pl-[10px] md:pr-[4vh] py-[35px] md:w-[25vh] md:h-1/2 xs:pl-[2vw] xs:pr-[4vh] xs:w-[24vh] xs:h-1/3 max-xs:w-full max-xs:h-auto max-xs:mx-[4%] max-xs:px-[2%] text-lg md:text-xl lg:text-4xl relative flex">
              TU LOGO es la<br />
              cara de tu negocio
            </span>
          </div>
        </div>
      </section>

      {/* PlanCard */}
      <DesktopWebDevelopmentSection />

      {/* Section 6 */}
      <section className="relative bg-[#FFFFFF] sm:flex-row max-xs:flex-col">
  <div className="flex max-xs:flex-col xs:flex-col md:flex-row w-full bg-[#FFFFFF] py-6">
    {/* Imagen */}
    <div className="md:w-full xs:w-[45vh] md:items-start xs:items-center md:justify-start xs:justify-center md:pl-[5%] xs:pl-[20vh] xs:h-auto">
      <Image
        src={"/services/imgSct6Media.png"}
        className="object-cover transition-opacity opacity-0 duration-500"
        onLoad={(event) => event.target.classList.remove("opacity-0")}
        width={595}
        height={265}
        priority={true}
        quality={100}
      />
    </div>

    {/* Textos */}
    <div className="w-full flex flex-col max-xs:justify-items-center md:items-end md:justify-end md:pl-0 md:pr-[5%]">
      {/* Primer Texto */}
      <div className="flex flex-col xs:items-end xs:justify-end max-xs:justify-items-center xs:pr-[5%] max-xs:pr-0 md:pr-0 md:items-end">
        <span className="text-2xl font-bold mb-2 text-[#FB8A00] xs:text-end max-xs:text-center md:text-3xl lg:text-5xl">
          ¿Cómo deben ser <span className="hidden md:inline"> <br /></span>
          los flyers publicitarios?
        </span>
        <span className="font-light mb-10 text-black xs:text-end max-xs:text-center lg:text-2xl md:text-lg leading-relaxed tracking-wide">
          Estos son un instrumento muy poderoso <span className="hidden md:inline"> <br /></span>
          para hacer publicidad y fortalecer tu marca, <span className="hidden md:inline"> <br /></span>
          es necesario contar con diseños apropiados <span className="hidden md:inline"> <br /></span>
          que tengan mensajes directos y precisos. <span className="hidden md:inline"> <br /></span>
        </span>
      </div>

      {/* Segundo Texto */}
      <div
        className="flex flex-col max-xs:items-center max-xs:justify-center w-full h-auto md:items-end md:justify-end md:w-auto md:h-auto"
      >
        <span className="font-light mb-10 text-black lg:text-2xl md:text-lg leading-relaxed tracking-wide">
          5 objetivos para comunicar efectivamente:<br />
          1 Mensaje claro 2 Títulos llamativos<br />
          3 Imágenes adecuadas 4 Diseño disruptivo<br />
          5 Orden, equilibrio y resaltar lo importante
        </span>
        <button
          className="bg-[#0853FC] hover:bg-[#FB8A00] text-white font-bold xs:py-2 xs:px-4 max-xs:py-1 max-xs:px-2 max-xs:text-lg xs:text-2xl rounded-md duration-300 shadow-sm"
          onClick={handleClick}
        >
          Quiero contratar
        </button>
      </div>
    </div>
  </div>
</section>

      {/* Section 7 */}
      <section className="relative bg-[#FFFFFF] flex justify-center items-center w-full px-[2%] sm:flex-row">
        <Image
          src={"/services/imgSct7Media.png"}
          width={1070}
          height={400}
          quality={100}
          style={{
            position: 'relative' }}
        />
      </section>

      {/* Section 8 */}
      <section className="relative flex flex-wrap w-full h-auto justify-center items-center bg-white md:pb-[27px] sm:pb-[40px] max-xs:flex-col xs:flex-row">
        <div className="flex xs:flex-row max-xs:flex-col w-full px-[2%] md:pb-[10%] sm:pb-[15%]">
          {/* Image */}
          <div className="w-full flex xs:items-start xs:justify-start max-xs:justify-items-center xs:pl-[5%] max-xs:order-2 xs:order-1">
            <Image
              src={"/services/imgSct8Media.png"}
              className="object-cover transition-opacity opacity-0 duration-500"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              width={595}
              height={365}
              priority={true}
              quality={100}
              style={{
                zIndex: 15,
                position: 'relative',
                top: 0,
                bottom: 0,
                left: '0',
                transform: 'translateX(0)'
              }}
            />
          </div>

          {/* Text */}
          <div className="w-full relative flex flex-col xs:items-end max-xs:items-center justify-center bg-grey-700 xs:pr-[3%] xs:z-15 max-xs:order-1 xs:order-2">
            <span className="text-3xl font-bold sm:mb-[28px] text-[#FB8A00] xs:text-end max-xs:text-center md:text-rigth xs:mb-[3vh] max-xs:text-xl xs:text-3xl md:text-4xl lg:text-5xl">
              Una imagen <span className="hidden md:inline"> <br /></span>
              profesional <span className="hidden md:inline"> <br /></span>
              para que <span className="hidden md:inline"> <br /></span>
              tu negocio <span className="hidden md:inline"> <br /></span>
              destaque
            </span>
            
              <button className="sm:bg-[#0853FC] sm:hover:bg-[#FB8A00] max-xs:bg-[#FB8A00] max-xs:hover:bg-[#ee8300] text-white font-bold xs:py-2 max-xs:py-1 max-xs:px-2 xs:px-4 flex-col justify-center sm:text-2xl xs:text-xl max-xs:text-lg hover:text-[#FFFFFF] duration-300 shadow-sm shadow-black border-orange-500 rounded-md xs:z-24 max-xs:mt-[2vh] xs:mt-[-2vh] sm:mt-[0vh]" style={{zIndex: 16}} onClick={handleClick}>
                Quiero Contratar
              </button>
            
          </div>
        </div>

        {/* Ola */}
        <div className="absolute w-full justify-end overflow-hidden bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-1/2 top-[-7px]">
            <path fill="#0853FC" fillOpacity="10" d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Section 9 */}
      <section className="relative bg-[#0853FC] flex flex-col justify-center items-center py-6 xs:px-[4%]">
        <div className="text-center my-3">
          <span className="text font-bold my-4 text-[#FFFFFF] text-center xs:text-2xl md:text-3xl lg:text-5xl justify-center items-center flex-col relative">
            Los videos cortos lideran las tendencias <span className="hidden md:inline"> <br /></span>
            comunicativas en todas las plataformas
          </span>
        </div>
        {/* Overlap the wave with the image */}
        <div className="relative justify-center items-center object-center  flex-col place-items: center md:w-3/4 xs:w-full ">
          <Image
            src={"/services/imgSct9Media.png"}
            width={1070}
            height={400}
            quality={100}
            style={{
              position: 'relative',
              top: 0,
              bottom: 10,
              left: '50%',
              transform: 'translateX(-50%)' }}
          />
        </div>
      </section>

      {/* Section 10 */}
      <section className="w-full relative flex xs:flex-row max-xs:flex-col">
        <div className="flex xs:flex-row max-xs:flex-col w-full bg-[#0853FC] xs:px-[4%] max-xs:px-[2%]">
          {/* Image */}
          <div className="md:w-full xs:w-auto max-xs:w-full max-xs:flex-col xs:flex-grow xs:pt-[25%] sm:pt-[15%] h-auto items-start justify-center md:pl-[4%] md:pt-[10%]">
            <Image
              src={"/services/imgSct10Media.png"}
              className="object-cover transition-opacity opacity-0 duration-500"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              width={595}
              height={265}
              priority={true}
              quality={100}
            />
          </div>
          <br />
          {/* Text */}
          <div className="lg:w-full md:w-1/2 max-xs:w-full h-auto relative flex flex-col xs:items-end max-xs:items-center justify-center max-xs:text-center xs:text-end xs:pr-[4%]">
            <span className="lg:text-5xl md:text-3xl xs:text-2xl font-bold mb-[2px] text-[#FB8A00] xs:text-end max-xs:text-center">
              La importancia <span className="hidden md:inline"> <br /></span>
              de un guión para <span className="hidden md:inline"> <br /></span>
              tu video
            </span>
            <br/>
            <span className="font-light mb-[40px] text-white xs:text-end max-xs:text-center xs:text-xl sm:text-2xl md:text-xl lg:text-3xl leading-relaxed tracking-wide" style={{top: -2}}>
              La idea junto al guión <span className="hidden md:inline"> <br /></span>
              son el pilar de cualquier <span className="hidden md:inline"> <br /></span>
              pieza audiovisual, ya sea <span className="hidden md:inline"> <br /></span>
              para un spot, un reel <span className="hidden md:inline"> <br /></span>
              una colaboración en redes, <span className="hidden md:inline"> <br /></span>
              una animación, es la semilla <span className="hidden md:inline"> <br /></span>
              para empezar un video.
            </span>
            
              <button className="bg-[#FB8A00] hover:bg-[#FFFFFF] text-[#FFFFFF] xs:py-2 xs:px-4 max-xs:py-1 max-xs:px-2 item-start flex-col gap-2 justify-start xs:text-3xl max-xs:text-xl hover:text-[#FB8A00] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md" onClick={handleClick}>
                Contratar
              </button>
            
          </div>
        </div>
      </section>

      {/* Section 11 */}
      <section className="relative flex w-full justify-center bg-[#0853FC] max-xs:flex-col xs:flex-col md:flex-row">
        <div className="flex md:flex-row xs:flex-col max-xs:flex-col w-full py-6 px-[2%]">

          {/* Text */}
          <div className="w-full relative flex flex-col md:items-start xs:items-center xs:text-center justify-center bg-grey-700 xs:pl-[4%] xs:order-1 max-xs:order-2 max-xs:py-4" >
            <span className="font-bold xs:mb-[28px] text-[#FB8A00] xs:text-center max-xs:text-center max-xs:text-xl xs:text-3xl md:text-start md:text-4xl lg:text-5xl xs:justify-items-start max-xs:justify-items-center">
              Creamos <span className="hidden md:inline"> <br /></span>
              la historia <span className="hidden md:inline"> <br /></span>
              perfecta
            </span>
            <span className="text font-light mb-[40px] text-white xs:text-xl lg:text-3xl xs:text-start max-xs:text-center leading-relaxed tracking-wide max-xs:mt-[4vh]">
            Utilizamos herramientas <span className="hidden md:inline"> <br /></span>
            de edición profesional <span className="hidden md:inline"> <br /></span>
            como: Premiere, After <span className="hidden md:inline"> <br /></span>
            Effects y distintas <span className="hidden md:inline"> <br /></span>
            inteligencias artificiales <span className="hidden md:inline"> <br /></span>
            para lograr contar <span className="hidden md:inline"> <br /></span>
            la historia perfecta.
          </span>
          </div>

          {/* Video */}
          <div className="flex relative items-end justify-center object-center xs:px-[4%] md:py-[5%] lg:pr-[3%] md:pr-[3%] rounded lg:w-full xs:h-auto md:w-[45vh] flex-grow xl:w-[1020px] xs:order-2 max-xs:order-1">
          <div style={{
              width: '650px',
              height: '465px',
            }}
            >
            <iframe
              src={"/services/vidSct11Media.mp4"}
              className="object-cover transition-opacity opacity-0 duration-500 w-full h-full"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              width={745}
              height={465}
              priority={true}
              quality={100}
              loop
              autoPlay
              muted
              allowfullscreen="false"
              style={{
                position: 'relative',
                top: 0,
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)' }}
            >

            </iframe>
          </div>
          </div>
        </div>
      </section>

      {/* Section 12 */}
      <section className="relative flex w-full justify-center bg-[#0853FC] px-[2%]">
        <div className="flex md:flex-row xs:flex-col max-xs:flex-col xs:px-[4%] w-full py-6">
          {/* Video */}
          <div className="flex items-start justify-center relative md:pl-[4%] md:py-[5%] rounded lg:w-full h-auto md:w-[45vh] priority-true flex-grow">
          <div style={{
              
              width: '650px',
              height: '465px',
            }}
            >
            <iframe
              src={"/services/vidSct12Media.mp4"}
              className="object-cover transition-opacity items-start justify-center opacity-0 duration-500 w-full h-full relative"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              width={845}
              height={465}
              priority={true}
              quality={100}
              loop
              autoPlay
              muted
              
            />
          </div>
          </div>
          {/* Text */}
          <div className="lg:w-full md:w-1/2 max-xs:w-full relative flex flex-col md:items-end max-xs:items-center justify-center xs:text-end max-xs:text-center xs:pr-[2%] max-xs:pt-4">
            <span className="font-bold mb-[2px] text-[#FB8A00] md:text-end xs:text-center max-xs:text-center max-xs:text-xl xs:text-3xl md:text-4xl lg:text-5xl xs:pt-5 md:pt-0">
              Añadimos <span className="hidden md:inline"> <br /></span>
              efectos <span className="hidden md:inline"> <br /></span>
              llamativos <span className="hidden md:inline"> <br /></span>
              a los videos
            </span>
            <span className="font-light mb-[40px] text-[#FFFFFF] md:text-end xs:text-center xs:text-xl md:text-lg lg:text-3xl leading-relaxed tracking-wide">
              Cientos de efectos y <span className="hidden md:inline"> <br /></span>
              transcisiones creadas <span className="hidden md:inline"> <br /></span>
              por los profesionales <span className="hidden md:inline"> <br /></span>
              y ajustadas para crear <span className="hidden md:inline"> <br /></span>
              el mensaje perfecto <span className="hidden md:inline"> <br /></span>
              en tu video.
            </span>
            
              <button className="bg-[#FB8A00] hover:bg-[#FFFFFF] text-[#FFFFFF] xs:py-2 xs:px-4 max-xs:py-1 max-xs:px-2 flex flex-col gap-2 max-xs:text-xl xs:text-xl lg:text-3xl md:text-xl hover:text-[#FB8A00] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md justify-start items-start relative" onclick={handleClick}>
                Contratar
              </button>
          
          </div>
        </div>
      </section>

        {/*Section 13*/}
      <section className="w-full justify-items-center px-[2%] py-[2%] bg-[#0853FC] sm:flex-row max-xs:flex-col">
      <div className="text-center flex-col  relative justify-center items-center max-xs:text-2xl md:text-4xl lg:text-5xl pt-12">
          <h2 className="text-[#FFFFFF] font-semibold pb-6">
            Una comunicación de impacto <span className="hidden md:inline"> <br /></span>
            ¿Listo para invertir en ella?
          </h2>
        </div>
        <div className="flex relative items-center justify-center text-center mx-[60px] px-[270px ]">
        
            <button className="bg-[#FB8A00] hover:bg-[#FFFFFF] hover:text-[#FB8A00] text-white font-ligth py-1 xs:px-4 max-xs:px-2 rounded text-md xs:text-2xl max-xs:text-lg" onClick={handleClick}>
              Hablá con un asesor
            </button>
          
        </div>
      </section>
    </aside>
  );
};

export default Media;