"use client";
import { Context } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/carrousel/Carousel";
import DesktopBrandingSection from "@/components/services/auxiliarComponents/DesktopBrandingSection";

const Branding = () => {
  const [scale, setScale] = useState(1);

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

  const section3Ref = useRef(null); // Referencia a la Section 3
  const scrollToSection3 = () => {
    if (section3Ref.current) {
      section3Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      className="relative flex-col w-full h-full"
      style={{
        width: "100%",
        height: "100%",
        overflowX: "hidden",
      }}
    >
      {/*Section 1*/}
      <section className="relative bg-[#0853FC] flex w-full py-3 md:pb-12 sm:pb-24 px-[1%] md:flex-row sm:flex-col xs:flex-col max-xs:flex-col">
        <div className="container flex-col pb-2 gap-16 md:ml-1 md:pl-[3%] pt-[55px] md:text-start sm:text-center xs:text-center max-xs:text-center max-xs:px-0 max-xs:mx-0"
          style={{
            maxWidth: "1600px",
            paddingLeft: "2%",
            paddingRight: "2%",
          }}>
          <span className="text-5xl text-[#FB8A00] pb-[15px] font-bold justify-start md:items-start md:text-start sm:text-center max-xs:text-center max-xs:items-center">
            Branding <span className="hidden md:inline"> <br /></span>y diseño <span className="hidden md:inline"> <br /></span>personalizado
          </span>
          <div className="pt-[20px] gap-16 sm:justify-center max-xs:justify-center">
            <span className="text-white text-xl w-full sm:text-center max-xs:text-center">
              Posicioná tu marca con diseños <span className="hidden md:inline"> <br /></span>
              exclusivos y una identidad única. <span className="hidden md:inline"> <br /></span>
              Creamos soluciones que reflejan <span className="hidden md:inline"> <br /></span>
              tus valores, logrando conectar <span className="hidden md:inline"> <br /></span>
              emocionalmente con tus clientes.
            </span>
          </div>
          <div className="py-[30px] sm:justify-center max-xs:justify-center">
            <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-light py-1 xs:px-4 max-xs:px-2 rounded text-md" onClick={scrollToSection3}>
              Conocer Más
            </button>
          </div>
        </div>

        {/* Reproductor de video */}
        <div className="flex md:items-end md:justify-end w-full md:pr-[2%] rounded lg:w-full lg:h-full md:w-1/2 md:h-1/2 sm:w-full sm:h-full xs:w-full xs:h-auto sm:flex-row xs:flex-row max-xs:px-0 max-xs:w-full max-xs:h-auto max-xs:flex">
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
      <section className="relative bg-white flex flex-col justify-center items-center w-full">
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
        <br />
        {/* Overlap the wave with the image */}
        <div className="relative justify-center items-center object-center flex-col place-items:center z-10">
          <Image
            src={"/services/Jirafe12.svg"}
            width={270}
            height={300}
            quality={100}
            className={`max-xs:w-[115px] max-xs:mt-[-35%] max-xs:translate-y-[-30%] xs:w-[160px] xs:mt-[-20vw] sm:w-[200px] sm:mt-[-30vw] md:w-[250px] md:mt-[-30vw] lg:w-[300px] lg:mt-[-30vw] xl:w-[350px] xl:mt-[-35vw]`}
          />
        </div>
        <div className="text-center md:mt-[5px] xs:mt-[-2px]">
          <span className=" font-bold my-4 text-[#0853FC] text-center text-2xl md:text-4xl lg:text-5xl justify-center items-center flex-col relative z-15">
            Sumate a los negocios <span className="hidden md:inline"> <br /></span>
            que ya tienen sus tarjetas QR
          </span>
        </div>
        <br />
        <Carousel />
      </section>
      {/* Section 3 */}
      <section ref={section3Ref} className="relative flex flex-wrap w-full justify-center items-center bg-white md:pb-[77px] sm:pb-[10px] sm:flex-row">
        <div className="flex max-xs:flex-col md:flex-row w-full p-6"
          style={{
            maxWidth: "1600px",
            paddingLeft: "2%",
            paddingRight: "2%",
          }}
        >
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
          <div className="w-full md:justify-start xs:justify-center max-xs:justify-center max-xs:items-center xs:items-center xs:bottom-[40vh] md:items-start md:w-3/4 md:pl-[4%]">
            <Image
              src={"/services/imgSct3HU.png"}
              className="object-cover transition-opacity opacity-0 duration-500"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              width={575}
              height={255}
              priority={true}
              quality={100}
            />
          </div>
          {/* Text */}
          <div className="w-full relative flex flex-col md:items-end xs:items-center justify-center bg-grey-700 md:pr-[3%] pt-2">
            <span className="font-bold mb-[28px] text-[#FB8A00] md:text-end xs:text-center max-xs:text-center max-xs:text-xl xs:text-2xl md:text-3xl lg:text-5xl justify-center">
              ¿Por qué utilizar un <span className="hidden md:inline"> <br /></span>
              código QR en tus tarjetas <span className="hidden md:inline"> <br /></span>
              de presentación?
            </span>
            <span className="text xs:text-xl md:text-end xs:text-center max-xs:text-center md:text-2xl leading-relaxed tracking-wide">
              Los QR son una herramienta poderosa <span className="hidden md:inline"> <br /></span>
              capaz de almacenar información en ellos <span className="hidden md:inline"> <br /></span>
              como por ejemplo una dirección web. <span className="hidden md:inline"> <br /></span>
              Es por ello que aprovechamos esta cualidad <span className="hidden md:inline"> <br /></span>
              para dirigir atus potenciales clientes con un <span className="hidden md:inline"> <br /></span>
              código QR personalizado hacia una web <span className="hidden md:inline"> <br /></span>
              de presentación que vamos a configurar <span className="hidden md:inline"> <br /></span>
              para vos detallando una presentación de tu <span className="hidden md:inline"> <br /></span>
              negocio y todos tus puntos de contacto.
            </span>
          </div>


        </div>


      </section>
      {/*Section 4*/}
      <section className="relative flex flex-wrap w-full justify-center sm:flex-row">
        <div className="flex flex-col md:flex-row w-full bg-[#FFFFFF] p-6"
          style={{
            maxWidth: "1600px",
            paddingLeft: "2%",
            paddingRight: "2%",
          }}
        >
          {/* Text */}
          <div className="w-full relative flex md:flex-col items-start justify-center text-center md:pl-[3%]">
            <span className="font-bold mb-[40px] text-[#0853FC] md:text-start xs:text-center xs:text-3xl md:text-4xl lg:text-5xl leading-relaxed tracking-wide md:pr-16" style={{ top: -2 }}>
              Facilitale <span className="hidden md:inline"> <br /></span>
              a tus clientes <span className="hidden md:inline"> <br /></span>
              el acceso a tu <span className="hidden md:inline"> <br /></span>
              información <span className="hidden md:inline"> <br /></span>
              en la web o <span className="hidden md:inline"> <br /></span>
              también lo tendrás <span className="hidden md:inline"> <br /></span>
              impreso en el dorso <span className="hidden md:inline"> <br /></span>
              de las tarjetas
            </span>
          </div>

          {/* Image */}
          <div className="w-full pr-[2%]">
            <Image
              src={"/services/imgSct4HU.png"}
              className="object-cover transition-opacity opacity-0 duration-500"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              width={715}
              height={265}
              priority={true}
              quality={100}
            />
          </div>
        </div>
      </section>

      {/*Section 5*/}
      <section className="relative flex flex-wrap w-full justify-center items-center bg-white sm:flex-row"
        style={{
          maxWidth: "1600px",
          paddingLeft: "2%",
          paddingRight: "2%",
        }}
      >
        <span className="xs:text-3xl font-bold pb-[16px] text-black text-center items-center md:text-4xl lg:text-5xl xs:px-0 md:px-2">
          Tus tarjetas 100% personalizadas <span className="hidden md:inline"> <br /></span>
          con tu foto, colores, letras o tu logo
        </span>
        {/* Image */}
        <div className="w-full justify-center items-center pb-[15%] px-[1%]" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}>
          <Image
            src={"/services/imgSct5HU.png"}
            className="object-cover transition-opacity opacity-0 duration-500"
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            width={945}
            height={365}
            priority={true}
            quality={100}
          />
        </div>
        {/* Ola */}
        <div className="absolute w-full justify-end overflow-hidden bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#0853FC" fill-opacity="10" d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/*Section 6*/}
      <section className="w-full relative flex">
        <div className="flex md:flex-row xs:flex-col max-xs:flex-col w-full bg-[#0051FF] p-6">
          {/* Image */}
          <div className="md:w-full xs:w-auto max-xs:w-auto md:pl-[3%] md:m-0 xs:m-6 xs:pl-0">
            <Image
              src={"/services/imgSct6HU.png"}
              className="object-cover transition-opacity opacity-0 duration-500 z-10"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              width={648}
              height={449}
              priority={true}
              quality={100}
            />
          </div>
          <br />
          {/* Text */}
          <div className="w-full relative flex flex-col xs:items-end max-xs:items-center justify-center text-center pr-[4%]">
            <span className="max-xs:text-3xl font-bold mb-[2px] text-[#FB8A00] xs:text-end max-xs:text-center md:text-4xl lg:text-5xl pb-5">
              Una landing page <span className="hidden md:inline"> <br /></span>
              solo para vos
            </span>
            <span className="font-light mb-[40px] xs:text-end max-xs:text-center text-[#FFFFFF] lg:text-3xl md:text-2xl leading-relaxed tracking-wide" style={{ top: -2 }}>
              El QR enviará a la gente que quiera <span className="hidden md:inline"> <br /></span>
              saber más sobre vos a landing <span className="hidden md:inline"> <br /></span>
              page, donde tendrán una <span className="hidden md:inline"> <br /></span>
              presentación completa de tu <span className="hidden md:inline"> <br /></span>
              negocio y pueden chatear con vos <span className="hidden md:inline"> <br /></span>
              al instante por Whatsapp, ver tu <span className="hidden md:inline"> <br /></span>
              dirección en Google Maps y <span className="hidden md:inline"> <br /></span>
              seguirte en tus redes sociales.
            </span>

            <button className="bg-[#FB8A00] hover:bg-[#FB8A00] text-white font-bold xs:py-2 max-xs:py-1 max-xs:px-2 xs:px-4 rounded items-center flex flex-col gap-2 justify-center xs:text-2xl max-xs:text-lg hover:text-[#0051FF]  duration-300 shadow-sm shadow-black border-orange-500 " onClick={scrollToPlanCards}>
              Solicitar
            </button>

          </div>
        </div>
      </section>
      {/*Section 7*/}
      <section className="relative bg-[#0853FC] flex w-full px-[2%] sm:flex-row">
        <div className="grid grid-cols-2 gap-4 w-full">
          {/* Columna izquierda: Lista + Texto */}
          <div className="flex flex-col justify-start">
            {/* Lista */}
            <ul className="list pl-[5%] md:space-y-[58px] xs:space-y-[12px] max-xs:space-y-[12px] text-left font-bold md:text-3xl xs:text-2xl max-xs:text-lg text-orange-500">
              {[
                "Diseño<br/>personalizado",
                "Landing page<br/>completa",
                "Posicionamiento<br/>SEO en internet",
                "Accesos<br/>Directos",
                "Envíos a<br/>tu domicilio",
              ].map((item, index) => (
                <li key={index} className="relative flex items-center">
                  {/* Punto naranja */}
                  <div className="md:w-[58px] xs:w-[32px] xs:h-[32px] max-xs:w-[16px] max-xs:h-[16px] md:h-[58px] rounded-full bg-[#FB8A00] mr-4 flex-shrink-0" />
                  <span className="leading-tight">
                    {item.split("<br/>").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </span>
                </li>
              ))}
            </ul>

            {/* Texto debajo de la lista */}
            <div className="mt-12 pl-[5%] xs:z-10 md:z-0 xs:justify-items-end xs:relative">
              <span className="xs:text-3xl font-bold text-[#FFFFFF] md:text-4xl lg:text-5xl">
                ¿Listo para <span className="hidden md:inline"> <br /></span>
                mejorar tu imagen <span className="hidden md:inline"> <br /></span>
                y potenciar tu negocio <span className="hidden md:inline"> <br /></span>
                con esta herramienta? <span className="hidden md:inline"> <br /></span>
              </span>
            </div>
          </div>

          {/* Columna derecha: Imagen */}
          <div className="flex justify-center items-center pr-[5%] h-auto">
            <Image
              src={"/services/imgSct7HU.png"}
              className="object-cover transition-opacity opacity-0 duration-500"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              width={933}
              height={1244}
              priority={true}
              quality={100}
              alt="Imagen"
            />
          </div>
        </div>
      </section>

      {/*PlanCard*/}
      <div ref={planCardsRef}>
        <DesktopBrandingSection />
      </div>

      {/*Section 8*/}
      <section className="w-full bg-[#0051FF] text-white px-[2%] sm:flex-row">
        {/* Title */}
        <div className="text-center justify-center items-center max-xs:text-2xl md:text-5xl lg:text-5xl">
          <h2 className="text-[#FFFFFF] font-semibold pt-4">
            ¿Tienes alguna duda sobre este servicio <span className="hidden md:inline"> <br /></span>
            o quieres pedir una cantidad personalizada?
          </h2>
        </div>
        <div className="flex relative items-center justify-center text-center md:mx-[60px] md:px-[270px] xs:mx-auto xs:px-auto py-8">

          <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-ligth xs:py-1 xs:px-4 max-xs:py-1 max-xs:px-2 rounded text-md xs:text-2xl max-xs:text-lg mx-auto" onClick={handleClick}>
            Hablá con un asesor
          </button>

        </div>
      </section>
    </aside>

  );
};

export default Branding;