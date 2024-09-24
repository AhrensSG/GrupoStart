"use client";
import { Context } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/carrousel/Carousel";
import DesktopWebDevelopmentSection from "@/components/services/auxiliarComponents/DesktopWebDevelopmentSection";

const Media = () => {
  const { data } = useContext(Context);
  const router = useRouter();


return (

    <aside className="relative flex-col">
          {/*Section 1*/}
            <section className="relative bg-[#0853FC] flex w-full p-5">
            <div className="container flex-col pb-2 gap-16 ml-1 pl-[30px] pt-[55px]">
              <span className="text-5xl text-[#FB8A00] pb-[15px] font-bold justify-start items-start text-center">Media: edición<br/>de videos<br/>e imágenes</span>
              <div className="pt-[20px] gap-16">
                <span className="text-white text-md">
                Destacá entre la competencia con<br/>
                diseños únicos y llamativos, maximizá el<br/>
                de tus videos con edición<br/>
                profesional para lograr el éxito,<br/>
                te asesoramos gratis!.</span>
              </div>
              <div className="py-[20px]">
              <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-ligth py-1 px-4 rounded text-md text-2xl">
                Contactar
              </button>
              </div>
            </div>
              {/* Aquí iría el reproductor de YouTube */}
                <div className="flex items-end justify-end w-full pr-[100px] mr-[5px] rounded">
            <div style={{
                paddingTop: '10px',
                width: '842px',
                height: '474px',
            }}
            >
            <iframe
                width="842"
                height="474"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                borderRadius: '68px',
                width: '100%',
                height: '100%',
                }}
            ></iframe>
            </div>
            </div>
            </section>
    
          {/* Section 2 */}
          <section className="relative bg-grey-700 flex flex-col justify-center items-center">
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
                  d="M0,300L48,285C96,270,192,250,288,235C384,220,480,210,576,205C672,210,768,220,864,235C960,250,1056,270,1152,285C1248,300,1344,320,1392,325L1440,330L1440,0L1392,0L1248,0L1152,0L1056,0L960,0L864,0L768,0L672,0L576,0L480,0L384,0L288,0L192,0L96,0L48,0L0,0Z"
                />
              </svg>
            </div>
            <br/>
              {/* Overlap the wave with the image */}
              <div className="relative justify-center items-center object-center flex flex-col grid place-items: center z-10">
                <Image
                  src={"/services/Jirafe5.svg"}
                  width={270}
                  height={300}
                  quality={100}
                  style={{
                  zIndex: 15,
                  position: 'relative',
                  top: -270,
                  bottom: -200,
                  left: '50%',
                  transform: 'translateX(-50%)' }}
                />
              </div>
              <div className="text-center mt-[-230px]">
                <span className="text text-4xl font-bold my-4 text-[#0853FC] text-center text-2xl md:text-4xl lg:text-5xl justify-center items-center flex-col relative z-15">
                  Trabajemos juntos,<br />
                  tenemos el equipo creativo que necesitas
                </span>
              </div>
              <br/>
              {/* Center the carousel */}
              <div className="flex justify-center w-full z-20 p-4">
                <Carousel />
              </div>
          </section>
      
          {/* Section 3 */}
        <section className="relative flex flex-wrap w-auto h-screen justify-center items-center bg-white md:pb-[77px] sm:pb-[10px]">
          <div className="flex flex-col md:flex-row w-full p-6">
            {/* Image */}
            {/* <div className="w-full md:w-1/2">
              <Image
                src={"/"}
                className="object-cover transition-opacity opacity-0 duration-500"
                onLoad={(event) => event.target.classList.remove("opacity-0")}
                width={595}
                height={265}
                priority={true}
                quality={100}
              />
            </div> */}
    
         {/* Text */}
              <div className="w-full md:w-1/2 relative flex flex-col items-start justify-center bg-grey-700 pl-[80px] mx-2">
              <span className="text-4xl font-bold mb-[28px] text-[#FB8A00] text-start text-2xl md:text-4xl lg:text-5xl justify-start">
                  Marcas<br />
                  que perduran<br />
                  en el tiempo
                </span>
                <span className="text text-lg mb-[40px] text-start text-1xl md:text-2xl sm:text-4xl leading-relaxed tracking-wide">
                    Si queres que tu negocio<br />
                    sea sostenible debes<br />
                    consolidar una marca.<br/>
                    Permití que nuestro equipo<br/>
                    creativo genere la identidad<br/>
                    de tu negocio, TU LOGO.
                </span>
    
                <Link href="/">
                  <button className="bg-[#0853FC] hover:bg-[#FB8A00] text-white font-bold py-2 px-4 rounded item-start flex flex-col gap-2 justify-start text-2xl hover:text-[#FB8A00] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md">
                    Contratar
                  </button>
                </Link>
              </div>
    
              <div className="w-full md:w-1/2">
                <Image
                  src={"/Jirafe1.svg"}
                  className="object-cover transition-opacity opacity-0 duration-500"
                  onLoad={(event) => event.target.classList.remove("opacity-0")}
                  width={595}
                  height={265}
                  priority={true}
                  quality={100}
                  style={{ 
                    zIndex: 15, 
                    position: 'relative',
                    top: 100,
                    bottom: -200,
                    left: '50%',
                    transform: 'translateX(-50%)' }}
                />
              </div>
            </div>
        </section>

          {/*Section 4*/}
          <section className="relative bg-[#FFFFFF] flex flex-col justify-center items-center py-6">
            <div className="text-center mb-8 mt-0 sm:w-full sm:mx-auto relative">
              <span className="bg-[#FB8A00] text-white font-bold py-[11px] px-[38px] rounded-medium border rounded-tl-full rounded-br-full text-center items-center justify-center text-3xl">
                Ejemplo de diseño de identidad Standar
              </span>
            </div>
              {/* Overlap the wave with the image */}
              <div className="relative justify-center items-center object-center flex flex-col grid place-items: center">
                <Image
                  src={"/services/Jirafe1.svg"}
                  width={370}
                  height={300}
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

          {/*Section 5*/}
          <section className="relative bg-[#FFFFFF] w-full">
  <div className="flex flex-col md:flex-row w-full bg-[#FFFFFF] px-[100px]">
    {/* Image */}
    <div className="w-full flex justify-center md:justify-start pl-0 mx-2">
      <Image
        src={"/services/Jirafe1.svg"}
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
    <div className="flex justify-end items-center text-end pr-5 h-[180px] w-[532px] rigth-0 py-2 pl-1">
      <span className="font-bold text-[#FFFFFF] text-end justify-end items-center items-start leading-snug rounded-tl-3xl rounded-bl-3xl bg-blue-600 w-[391px] h-[107px] px-[42px] py-[35px] md:text-1xl lg:text-3xl m-1 relative flex">
        TU LOGO es la<br />
        cara de tu negocio
      </span>
    </div>
  </div>
          </section>

          {/*PlanCard*/}
          <DesktopWebDevelopmentSection />
    
          {/*Section 6*/}
          <section className="relative bg-[#FFFFFF]">
            <div className="flex flex-col md:flex-row w-full bg-[#FFFFFF] p-6">
              {/* Image */}
              <div className="w-full md:w-1/2 pl-[120px] mx-2">
                <Image
                  src={"/Jirafe1.svg"}
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
              <div className="w-full md:w-1/2 relative flex flex-col items-end justify-center text-center pr-16">
                <span className="text-4xl font-bold mb-[2px] text-[#FB8A00] text-end md:text-4xl lg:text-5xl">
                ¿Cómo deben ser<br/>
                los flyers publicitarios?
                </span>
                <br/>
                <span className="font-light mb-[40px] text-black text-end text-2xl leading-relaxed tracking-wide" style={{top: -2}}>
                Estos son un instrumento muy poderoso<br/>
                para hacer publicidad y fortalecer tu marca,<br/>
                es necesario contar con diseños apropiados<br/>
                que tengan mensajes directos y precisos.<br/>
                <br/>
                5 objetivos para comunicar efectivamente:<br/>
                1 Mensaje claro 2 Titulos llamativos<br/>
                3 Imágenes adecuadas 4 Diseño disruptivo<br/>
                5 Orden, equilibro y resaltar lo importante
                </span>
                <Link href="/">
                  <button className="bg-[#0853FC] hover:bg-[#FB8A00] text-white font-bold py-2 px-4 rounded item-start flex flex-col gap-2 justify-start text-2xl hover:text-[#FB8A00] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md">
                    Quiero contratar
                  </button>
                </Link>
              </div>
            </div>
          </section>
          {/*Section 7*/}
          <section className="relative bg-[#FFFFFF] flex justify-center items-center p-2">
            <Image
            src={"/services/Jirafe1.svg"}
            width={370}
            height={300}
            quality={100}
            style={{
            position: 'relative',
            top: 0,
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)' }}
            />
            
          </section>
          {/*Section 8*/}
          <section className="relative flex flex-wrap w-auto h-screen justify-center items-center bg-white md:pb-[77px] sm:pb-[10px] pt-[100px] pb-[-200px]">
            <div className="flex flex-col md:flex-row w-full p-6">
           {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <Image
        src={"/Jirafe1.svg"}
        className="object-cover transition-opacity opacity-0 duration-500"
        onLoad={(event) => event.target.classList.remove("opacity-0")}
        width={595}
        height={265}
        priority={true}
        quality={100}
        style={{ 
          zIndex: 15, 
          position: 'relative',
          top: 0,
          bottom: 0,
          left: '0',  // Cambiado para que la imagen quede alineada a la izquierda
          transform: 'translateX(0)'
        }}
      />
    </div>

    {/* Text */}
    <div className="w-full md:w-1/2 relative flex flex-col items-end justify-center bg-grey-700 px-[80px] mx-2 z-15">
      <span className="text-4xl font-bold mb-[28px] text-[#FB8A00] text-end md:text-rigth text-2xl md:text-4xl lg:text-5xl">
        Una imagen<br />
        profesional<br/>
        para que<br/>
        tu negocio<br/>
        destaque
      </span>
      <Link href="/">
        <button className="bg-[#0853FC] hover:bg-[#FB8A00] text-white font-bold py-2 px-4 rounded flex flex-col justify-center text-2xl hover:text-[#FFFFFF] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md z-16">
          Quiero Contratar
        </button>
      </Link>
    </div>
  </div>

  {/* Ola */}
  <div className="absolute w-full justify-end overflow-hidden bottom-0 z-5">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto top-[-30px] z-10">
      <path fill="#0853FC" fillOpacity="10" d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
    </svg>
  </div>
          </section>

          {/*Section 9*/}
          <section className="relative bg-[#0853FC] flex flex-col justify-center items-center py-6">
            <div className="text-center my-3">
                <span className="text text-4xl font-bold my-4 text-[#FFFFFF] text-center text-2xl md:text-4xl lg:text-5xl justify-center items-center flex-col relative">
                Los videos cortos lideran las tendencias<br />
                comunicativas en todas las plataformas
                </span>
              </div>
              {/* Overlap the wave with the image */}
              <div className="relative justify-center items-center object-center flex flex-col grid place-items: center">
                <Image
                  src={"/services/Jirafe1.svg"}
                  width={370}
                  height={300}
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

          {/*Section 10*/}
          <section>
            <div className="flex flex-col md:flex-row w-full bg-[#0853FC] p-6">
              {/* Image */}
              <div className="w-full md:w-1/2 pl-[120px] mx-2">
                <Image
                  src={"/Jirafe1.svg"}
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
              <div className="w-full md:w-1/2 relative flex flex-col items-end justify-center text-center pr-16">
                <span className="text-5xl font-bold mb-[2px] text-[#FB8A00] text-end">
                  La importancia<br />
                  de un guión para<br />
                  tu video
                </span>
                <br/>
                <span className="font-light mb-[40px] text-white text-end text-3xl leading-relaxed tracking-wide" style={{top: -2}}>
                    La idea junto al guión<br />
                    son el pilar de cualquier<br />
                    pieza audiovisual, ya sea<br/>
                    para un spot, un reel<br/>
                    una colaboración en redes,<br/>
                    una animación, es la semilla<br/>
                    para empezar un video.
                </span>
                <Link href="/">
                  <button className="bg-[#FB8A00] hover:bg-[#FFFFFF] text-[#FB8A00] font-medium py-2 px-4 rounded item-start flex flex-col gap-2 justify-start text-3xl hover:text-[#FB8A00] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md">
                    Contratar
                  </button>
                </Link>
              </div>
            </div>
          </section>
    
          {/* Section 11*/}
          <section className="relative flex flex-wrap w-auto h-screen justify-center items-center bg-[#0853FC] md:pb-[77px] sm:pb-[10px] pt-[100px] pb-[-200px]">
          <div className="flex flex-col md:flex-row w-full p-6">
            {/* Image */}
            {/* <div className="w-full md:w-1/2">
              <Image
                src={"/"}
                className="object-cover transition-opacity opacity-0 duration-500"
                onLoad={(event) => event.target.classList.remove("opacity-0")}
                width={595}
                height={265}
                priority={true}
                quality={100}
              />
            </div> */}
    
         {/* Text */}
              <div className="w-full md:w-1/2 relative flex flex-col items-start justify-center bg-grey-700 pl-[80px] mx-2 z-15" style={{ 
                    zIndex: 15}} >
              <span className="text-4xl font-bold mb-[28px] text-[#FB8A00] text-start text-2xl md:text-4xl lg:text-5xl justify-start">
                  Creamos<br />
                  la historia<br />
                  perfecta
                </span>
                <span className="text font-light mb-[40px] text-start text-white text-3xl leading-relaxed tracking-wide">
                    Utilizamos herramientas<br />
                    de edición profesional<br />
                    como: premiere, after<br/>
                    effects y distintas<br/>
                    inteligencias artificiales<br/>
                    para lograr contar<br/>
                    la historia perfecta.
                </span>
              </div>
    
              <div className="w-full md:w-1/2">
                <Image
                  src={"/Jirafe1.svg"}
                  className="object-cover transition-opacity opacity-0 duration-500"
                  onLoad={(event) => event.target.classList.remove("opacity-0")}
                  width={595}
                  height={265}
                  priority={true}
                  quality={100}
                  style={{
                    zIndex: 15,
                    position: 'relative',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)' }}
                />
              </div>
            </div>
          </section>

          {/*Section 12*/}
          <section className="bg-[#0051FF] text-white pt-[90px] pb-10">
          <div className="flex flex-col md:flex-row w-full bg-[#0051FF] p-6">
              {/* Image */}
              <div className="w-full md:w-1/2 pl-[120px] mx-2">
                <Image
                  src={"/Jirafe1.svg"}
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
              <div className="w-full md:w-1/2 relative flex flex-col items-end justify-center text-center rigth">
                <span className="text-4xl font-bold mb-[2px] text-[#FB8A00] text-end md:text-4xl lg:text-5xl pr-16">
                  Añadimos<br />
                  efectos<br />
                  llamativos<br />
                  a los videos
                </span>
                <span className="font-light mb-[40px] text-[#FFFFFF] text-end text-3xl leading-relaxed tracking-wide pr-16" style={{top: -2}}>
                  Cientos de efectos y<br />
                  transcisiones creadas<br />
                  por los profesionales<br/>
                  y ajustadas para crear<br/>
                  el mensaje perfecto<br/>
                  en tu video.
                </span>
                <Link href="/">
                  <button className="bg-[#FB8A00] hover:bg-[#FFFFFF] text-[#FFFFFF] font-medium py-2 px-4 rounded flex flex-col gap-2 text-3xl hover:text-[#FB8A00] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md justify-start items-start relative">
                    Contratar
                  </button>
                </Link>
              </div>
            </div>
            {/* Title */}
            <div className="text-center justify-center items-center text-2xl md:text-5xl lg:text-5xl pt-12">
              <h2 className="text-[#FFFFFF] font-semibold mt-4 pb-6">
              Una comunicación de impacto<br />
              ¿Listo para invertir en ella?
              </h2>
            </div>
        <div className="flex relative items-center justify-center text-center mx-[60px] px-[270px]">
        <Link href="/contacto">
        <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-ligth py-1 px-4 rounded text-md text-2xl">
                Hablá con un asesor
        </button>
            </Link>
        </div>
          </section>
    </aside>
    
      );
    };
    
    export default Media;