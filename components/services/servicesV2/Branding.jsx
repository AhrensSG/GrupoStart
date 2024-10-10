"use client";
import { Context } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/carrousel/Carousel";
import DesktopBrandingSection from "@/components/services/auxiliarComponents/DesktopBrandingSection";

const Branding = () => {
  const [scale, setScale] = useState(1);



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
            <section className="relative bg-[#0853FC] flex w-full pl-[2%] py-3">
            <div className="container flex-col pb-2 gap-16 ml-1 pl-[1%] pt-[55px]" 
            style={{
            maxWidth: "1600px",
            paddingLeft: "2%",
            paddingRight: "2%",
          }}>
              <span className="text-5xl text-[#FB8A00] pb-[15px] font-bold justify-start items-start text-center">Herramientas<br/>útiles</span>
              <div className="pt-[20px] gap-16">
                <span className="text-white text-xl">
                Envia a los interesados en tu negocio<br/>
                a una web con una presentación<br/>
                ampliada, además de botones con<br/>
                acceso rápido aun chat con vos en<br/>
                whatsapp, ubicacion en google maps<br/>
                y todas tus redes sociales.</span>
              </div>
              <div className="py-[20px]">
              <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-ligth py-1 px-4 rounded text-md text-2xl">
                +INFO
              </button>
              </div>
            </div>
              {/* Aquí iría el reproductor de YouTube */}
              <div className="flex items-end justify-end w-full pr-[3%] rounded lg:w-full lg:h-full md:w-1/2 md:h-1/2 sm:w-1/4 sm:h-1/4">
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
                  d="M0,300L48,285C96,270,192,250,288,235C384,220,480,210,576,205C672,210,768,220,864,235C960,250,1056,270,1152,285C1248,300,1344,320,1392,325L1440,330L1440,0L1392,0L1248,0L1152,0L1056,0L960,0L864,0L768,0L672,0L576,0L480,0L384,0L288,0L192,0L96,0L48,0L0,0Z"
                />
              </svg>
            </div>
            <br/>
              {/* Overlap the wave with the image */}
              <div className="relative justify-center items-center object-center flex flex-col grid place-items: center z-10">
                <Image
                  src={"/services/Jirafe12.svg"}
                  width={270}
                  height={300}
                  quality={100}
                  style={{
                  zIndex: 15,
                  position: 'relative',
                  top: -260,
                  bottom: -200,
                  left: '50%',
                  transform: 'translateX(-50%)' }}
                />
              </div>
              <div className="text-center mt-[-230px]">
                <span className="text text-4xl font-bold my-4 text-[#0853FC] text-center text-2xl md:text-4xl lg:text-5xl justify-center items-center flex-col relative z-15">
                  Sumate a los negocios<br />
                  que ya tienen sus tarjetas QR
                </span>
              </div>
              <br/>
                <Carousel />
          </section>
          {/* Section 3 */}
          <section className="relative flex flex-wrap w-full justify-center items-center bg-white md:pb-[77px] sm:pb-[10px]">
          <div className="flex flex-col md:flex-row w-full p-6"
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
          <div className="w-full justify-start items-start md:w-3/4 pl-[4%]">
                <Image
                  src={"/services/imgSct3HU.png"}
                  className="object-cover transition-opacity opacity-0 duration-500"
                  onLoad={(event) => event.target.classList.remove("opacity-0")}
                  width={575}
                  height={255}
                  priority={true}
                  quality={100}
                  style={{
                    zIndex: 15,
                    position: 'relative',
                    top: 100,
                    bottom: -200,
                    left: '45%',
                    transform: 'translateX(-50%)' }}
                />
              </div>
         {/* Text */}
              <div className="w-full relative flex flex-col items-end justify-center bg-grey-700 pr-[3%] pt-2">
              <span className="text-4xl font-bold mb-[28px] text-[#FB8A00] text-end text-2xl md:text-3xl lg:text-5xl justify-center">
                  ¿Por qué utilizar un<br />
                  código QR en tus tarjetas<br />
                  de presentación?
                </span>
                <span className="text text-lg text-end text-xl md:text-2xl sm:text-4xl leading-relaxed tracking-wide">
                    Los QR son una herramienta poderosa<br />
                    capaz de almacenar información en ellos<br />
                    como por ejemplo una dirección web.<br/>
                    Es por ello que aprovechamos esta cualidad<br/>
                    para dirigir atus potenciales clientes con un<br/>
                    código QR personalizado hacia una web<br/>
                    de presentación que vamos a configurar<br/>
                    para vos detallando una presentación de tu<br/>
                    negocio y todos tus puntos de contacto.
                </span>
              </div>
    
              
            </div>
    
            
          </section>
          {/*Section 4*/}
          <section className="relative flex flex-wrap w-full justify-center">
        <div className="flex flex-col md:flex-row w-full bg-[#FFFFFF] p-6"
        style={{
          maxWidth: "1600px",
          paddingLeft: "2%",
          paddingRight: "2%",
        }}
        >
          {/* Text */}
          <div className="w-full relative flex flex-col items-start justify-center text-center pl-[3%]">
          <span className="font-bold mb-[40px] text-[#0853FC] text-start text-4xl md:text-4xl lg:text-5xl leading-relaxed tracking-wide pr-16" style={{top: -2}}>
              Facilitale<br />
              a tus clientes<br/>
              el acceso a tu<br/>
              información<br />
              en la web o<br />
              también lo tendrás<br />
              impreso en el dorso<br/>
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
          <section className="relative flex flex-wrap w-full justify-center items-center bg-white"
          style={{
            maxWidth: "1600px",
            paddingLeft: "2%",
            paddingRight: "2%",
          }}
          >
              <span className="text-4xl font-bold pb-[16px] text-black text-center items-center md:text-4xl lg:text-5xl pr-16">
                Tus tarjetas 100% personalizadas<br/>
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
          <section className="w-full relative">
          <div className="flex flex-row w-full bg-[#0051FF] p-6">
              {/* Image */}
              <div className="w-full pl-[3%]">
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
              <div className="w-full relative flex flex-col items-end justify-center text-center pr-[4%]">
                <span className="text-4xl font-bold mb-[2px] text-[#FB8A00] text-end md:text-4xl lg:text-5xl pb-5">
                  Una landing page<br />
                  solo para vos
                </span>
                <span className="font-light mb-[40px] text-end text-[#FFFFFF] lg:text-3xl md:text-2xl leading-relaxed tracking-wide" style={{top: -2}}>
                    El QR enviará a la gente que quiera<br />
                    saber más sobre vos a landing<br />
                    page, donde tendrán una<br/>
                    presentación completa de tu<br/>
                    negocio y pueden chatear con vos<br/>
                    al instante por Whatsapp, ver tu<br/>
                    dirección en Google Maps y<br/>
                    seguirte en tus redes sociales.
                </span>
                <Link href="/">
                  <button className="bg-[#FB8A00] hover:bg-[#FB8A00] text-white font-bold py-2 px-4 rounded item-center flex flex-col gap-2 justify-center text-2xl hover:text-[#0051FF] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md">
                    Solicitar
                  </button>
                </Link>
              </div>
            </div>
          </section>
          {/*Section 7*/}
          <section className="relative bg-[#0853FC] flex w-full px-[2%]">
  <div className="grid grid-cols-2 gap-4 w-full">
    {/* Columna izquierda: Lista + Texto */}
    <div className="flex flex-col justify-start">
      {/* Lista */}
      <ul className="list pl-[5%] space-y-[58px] text-left font-bold text-3xl text-orange-500">
        {[
          "Diseño<br/>personalizado",
          "Landing page<br/>completa",
          "Posicionamiento<br/>SEO en internet",
          "Accesos<br/>Directos",
          "Envíos a<br/>tu domicilio",
        ].map((item, index) => (
          <li key={index} className="relative flex items-center">
            {/* Punto naranja */}
            <div className="w-[58px] h-[58px] rounded-full bg-[#FB8A00] mr-4 flex-shrink-0" />
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
      <div className="mt-12 pl-[5%]">
        <span className="text-4xl font-bold text-[#FFFFFF] md:text-4xl lg:text-5xl">
          ¿Listo para<br />
          mejorar tu imagen<br />
          y potenciar tu negocio<br />
          con esta herramienta?
        </span>
      </div>
    </div>

    {/* Columna derecha: Imagen */}
    <div className="flex justify-end items-center pr-[5%]">
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
          <DesktopBrandingSection />

          {/*Section 8*/}
          <section className="w-full bg-[#0051FF] text-white px-[2%]">
            {/* Title */}
            <div className="text-center justify-center items-center text-2xl md:text-5xl lg:text-5xl">
              <h2 className="text-[#FFFFFF] font-semibold pt-4">
                ¿Tienes alguna duda sobre este servicio<br />
                o quieres pedir una cantidad personalizada?
              </h2>
            </div>
        <div className="flex relative items-center justify-center text-center mx-[60px] px-[270px] py-8">
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
    
    export default Branding;