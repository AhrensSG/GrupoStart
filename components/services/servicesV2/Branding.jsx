"use client";
import { Context } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "../servicesV2/carrousel/Carousel";

const Branding = () => {
  const { data } = useContext(Context);
  const router = useRouter();


return (

    <aside className="relative flex-col">
          {/*Section 1*/}
            <section className="relative bg-[#0853FC] flex w-full p-5">
            <div className="container flex-col pb-2 gap-16 ml-1 pl-[30px] pt-[55px]">
              <span className="text-5xl text-[#FB8A00] pb-[15px] font-bold justify-start items-start text-center">Herramientas<br/>útiles</span>
              <div className="pt-[20px] gap-16">
                <span className="text-white text-md">
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
         {/* Text */}
              <div className="w-full md:w-1/2 relative flex flex-col items-end justify-center bg-grey-700 pr-[150px] mx-2">
              <span className="text-4xl font-bold mb-[28px] text-[#FB8A00] text-center text-2xl md:text-4xl lg:text-5xl justify-center">
                  ¿Que es el codigo QR y por<br />
                  qué debes utilizarlos como<br />
                  herramientas de marketing?
                </span>
                <span className="text text-lg mb-[40px] text-end text-1xl md:text-2xl sm:text-4xl leading-relaxed tracking-wide">
                    Estos son un instrumento muy poderoso<br />
                    para hacer publicidad y fortalecer tu marca,<br />
                    es necesario contar con diseños apropiados<br/>
                    que tengan mensajes directos y precisos.<br/>
                    
                    5 objetivos para comunicar efectivamente:<br/>
                    1 Mensaje claro 2 Titulos llamativos<br/>
                    3 Imágenes adecuadas 4 Diseño disruptivo<br/>
                    5 Orden, equilibro y resaltar lo importante
                </span>
              </div>
    
              
            </div>
    
            
          </section>
          {/*Section 4*/}
          <section className="relative flex flex-wrap w-auto h-screen justify-center">
        <div className="flex flex-col md:flex-row w-full bg-[#FFFFFF] p-6">
          {/* Text */}
          <div className="w-full md:w-1/2 relative flex flex-col items-start justify-center text-center pl-16">
            <span className="text-4xl font-bold mb-[2px] text-[#FB8A00] text-start md:text-4xl lg:text-5xl pr-16">
              Conecta con<br />
              tu público,
            </span>
            <span className="font-bold mb-[40px] text-[#0853FC] text-start text-4xl md:text-4xl lg:text-5xl leading-relaxed tracking-wide pr-16" style={{top: -2}}>
              mejorá<br />
              la experiencia<br />
              del cliente<br />
              y aumenta<br/>
              la interacción.
            </span>
          </div>

           {/* Image */}
          <div className="w-full md:w-1/2 pr-[120px] mx-2">
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
        </div>
      </section>

          {/*Section 5*/}
          <section className="relative flex flex-wrap w-auto h-screen justify-center items-center bg-white md:pb-[77px] sm:pb-[10px]">
              <span className="text-4xl font-bold mb-[2px] text-black text-center items-center md:text-4xl lg:text-5xl pr-16">
                Tus tarjetas personalizadas<br/>
                con tu foto, colores, letras y tu logo
              </span>
            {/* Image */}
            <div className="w-full md:w-1/2 pl-[120px] mx-2 justify-center">
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
            {/* Ola */}
            <div className="absolute w-full justify-end overflow-hidden bottom-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
                <path fill="#0853FC" fill-opacity="10" d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
              </svg>
            </div>
          </section>

          {/*Section 6*/}
          <section>
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
              <div className="w-full md:w-1/2 relative flex flex-col items-end justify-center text-center pr-16">
                <span className="text-4xl font-bold mb-[2px] text-[#FB8A00] text-end md:text-4xl lg:text-5xl pb-5">
                  Una landing page<br />
                  solo para vos
                </span>
                <span className="font-light mb-[40px] text-end text-[#FFFFFF] text-3xl leading-relaxed tracking-wide" style={{top: -2}}>
                    Direcciona a los interesados en tu<br />
                    negocio a una página web<br />
                    donde, tendrás una presentación<br/>
                    ampliada, además de botones con<br/>
                    acceso rápido a un chat con vos,<br/>
                    tu ubicación en google maps<br/>
                    y todas tus redes sociales
                </span>
                <Link href="/">
                  <button className="bg-[#FB8A00] hover:bg-[#FB8A00] text-white font-bold py-2 px-4 rounded item-center flex flex-col gap-2 justify-center text-2xl hover:text-[#0051FF] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md">
                    Contratar
                  </button>
                </Link>
              </div>
            </div>
          </section>
          {/*Section 7*/}
          <section className="relative bg-[#0853FC] flex flex-wrap w-auto">
            {/*Lista*/}
            <div className="items-start justify-center text-start pl-16">
            <ul class="list pl-4 space-y-2 text-left text-#FFA500 font-bold text-3xl">
              <li>Diseño<br/> personalizado</li>
              <li>Landing page<br/>completa</li>
              <li>Posicionamiento<br/>SEO en internet</li>
              <li>Accesos<br/> Directos</li>
              <li>Envíos a<br/> tu domicilio</li>
            </ul>
            </div>
            {/*Imagen*/}
            <div className="w-full h-auto pl-[520px] mx-2 items-end justify-end object-end">
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
          {/*Texto*/}
          <div className="w-full md:w-1/2 relative flex flex-col items-start justify-center text-start pl-16">
            <span className="text-4xl font-bold mb-[2px] text-[#FFFFFF] text-start md:text-4xl lg:text-5xl pr-16">
              ¿Listo para<br />
              mejorar tu imagen<br/>
              y potenciar tu negocio<br/>
              con esta herramienta?
            </span>
          </div>
          </section>

          {/*Section 8*/}
          <section className="bg-[#0051FF] text-white p-6">
            {/* Title */}
            <div className="text-center justify-center items-center text-2xl md:text-5xl lg:text-5xl">
              <h2 className="text-[#FFFFFF] font-semibold mt-4">
                ¿Tienes alguna duda sobre este servicio<br />
                o quieres pedir una cantidad personalizada?
              </h2>
            </div>
        <div className="flex relative items-center justify-center text-center mx-[60px] px-[270px] py-8">
        <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-ligth py-1 px-4 rounded text-md text-2xl">
                Hablá con un asesor
        </button>
        </div>
          </section>
    </aside>
    
      );
    };
    
    export default Branding;