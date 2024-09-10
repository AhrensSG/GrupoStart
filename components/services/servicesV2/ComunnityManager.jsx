"use client";
import { Context } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "../servicesV2/carrousel/Carousel";
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

<aside className="relative flex-col">
      {/*Section 1*/}
        <section className="relative bg-[#0853FC] flex w-full p-5">
        <div className="container flex-col pb-2 gap-16 ml-1 pl-[50px] pt-[85px]">
          <span className="text-5xl text-[#FB8A00] pb-[15px] font-bold justify-start items-start text-center">Gestión de<br/>Redes Sociales</span>
          <div className="pt-[30px] gap-16">
            <span className="text-white text-md">
              Es tiempo de invertir en tus redes<br/>
              para impulsar tu negocio<br/>
              conocé más en este video explicativo</span>
          </div>
          <div className="py-[30px]">
          <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-ligth py-1 px-4 rounded text-md text-2xl">
            Comenzar
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
              src={"/services/Jirafe3.svg"}
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
              Ayudamos a que tu redes<br />
              alcancen su máximo potencial.
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
              Hacemos<br />
              crecer<br />
              tu negocio<br />
              en redes
            </span>
            <span className="text text-lg mb-[40px] text-start text-1xl md:text-2xl sm:text-4xl leading-relaxed tracking-wide">
              Llegá a nuevos<br />
              clientes en todas<br />
              las plataformas Meta
            </span>

            <Link href="/">
              <button className="bg-[#0853FC] hover:bg-[#FB8A00] text-white font-bold py-2 px-4 rounded item-start flex flex-col gap-2 justify-start text-2xl hover:text-[#FFFFFF] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md">
                Empezar
              </button>
            </Link>
          </div>

          <div className="w-full md:w-1/2">
            <Image
              src={"/services/ImgSct3GR.svg"}
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
      {/*Section 4 */}
      <section className="relative bg-[#FFFFFF]">
            <div className="flex flex-col md:flex-row w-full bg-[#FFFFFF] p-6">
              {/* Image */}
              <div className="w-full md:w-1/2 pl-[120px] mx-2">
                <Image
                  src={"/ImgSct4GR.svg"}
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
                Un perfil<br/>
                optimizado<br/>
                al 100%
                </span>
              </div>
            </div>
          </section>

      {/*Section 5*/}
      <section className="relative bg-[#FFFFFF]">
            <div className="flex flex-col md:flex-row w-full bg-[#FFFFFF] p-6">
              {/* Image */}
              <div className="w-full md:w-1/2 pl-[120px] mx-2">
                <Image
                  src={"/ImgSct5GR.svg"}
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
                <span className="text-4xl font-bold mb-[2px] text-[#0853FC] text-end md:text-4xl lg:text-5xl">
                Conocé a tu audiencia<br/>
                es la clave del exito
                </span>
                <br/>
                <span className="font-light mb-[40px] text-black text-end text-2xl leading-relaxed tracking-wide" style={{top: -2}}>
                Segmentar y entender a tu audiencia es fundamental<br/>
                para crear campañas de marketing efectivas para<br/>
                obtener éxito de tu negocio en redes sociales.
                <br/>
                Conocer sus edades, intereses, comportamientos y<br/>
                necesidades permite diseñar mensajes que realmente<br/>
                resuenen e impacten en cada persona, maximizando el<br/>
                impacto y minimizando los esfuerzos desperdiciados.
                </span>
              </div>
            </div>
          </section>
      {/*Section 6*/}
      <section className="relative flex flex-wrap w-auto h-full justify-center items-center bg-white md:pb-[77px] sm:pb-[10px]">
      <div className="flex flex-col md:flex-row w-full p-6">
      <div className="w-full md:w-1/2 relative flex flex-col items-start justify-center bg-grey-700 pl-[80px] mx-2">
          <span className="text-4xl font-bold mb-[28px] text-[#0853FC] text-start text-2xl md:text-4xl lg:text-5xl justify-start">
          Tu perfil es tu tarjeta<br />
          de presentación
            </span>
            <span className="text text-lg mb-[40px] text-start text-1xl md:text-2xl sm:text-4xl leading-relaxed tracking-wide">
            Tu biografía es la primera impresión que los posibles<br />
            clientes tienen de tu marca en redes sociales.<br />
            Optimizamos tu diseño y contenido para reflejar la<br/>
            dentidad de tu marca, asegurando que cada<br/>
            publicación contribuya a construir una imagen<br/>
            coherente y atractiva.
            </span>

            <Link href="/">
              <button className="bg-[#FB8A00] hover:bg-[#0853FC] text-white font-bold py-2 px-4 rounded item-start flex flex-col gap-2 justify-start text-2xl hover:text-[#FB8A00] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md z-10 relative">
                Contactar
              </button>
            </Link>
          </div>

          <div className="w-full md:w-1/2">
            <Image
              src={"/ImgSct6GR.svg"}
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
          <br/>
        </div>
        {/* Ola */}
        <div className="absolute w-full justify-end overflow-hidden bottom-0 z-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
            <path fill="#0853FC" fill-opacity="10" d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/*Section 7*/}
      <section>
        <div className="flex flex-col md:flex-row w-full bg-[#0051FF] p-6">
          {/* Image */}
          <div className="w-full md:w-1/2 pl-[120px] mx-2">
            <Image
              src={"/ImgSct7GR.svg"}
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
          <div className="w-full md:w-1/2 relative flex flex-col items-end justify-center text-center">
            <span className="text-4xl font-bold mb-[2px] text-[#FFFFFF] text-end md:text-4xl lg:text-5xl pr-16">
              Creamos los<br />
              contenidos<br />
              estratégicos<br />
              que atraen
            </span>
            <span className="font-bold mb-[40px] text-[#FB8A00] text-end text-4xl md:text-4xl lg:text-5xl leading-relaxed tracking-wide pr-16" style={{top: -2}}>
              y conectan con<br />
              tu audiencia<br />
            </span>
          </div>
        </div>
      </section>

      {/*Section CircleMap */}
      <section className="bg-[#0051FF] text-white p-6">
        {/* Title */}
        <div className="text-center justify-center items-center text-2xl md:text-5xl lg:text-5xl">
          <h2 className="text-[#FFFFFF] font-semibold mt-4">
            Contratas a Start, contratas un equipo<br />
            de <span className="text-[#FB8A00] font-semibold">trabajo profesional</span>
          </h2>
        </div>
        {/* Circulo con sus elementos */}
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
    <div className="flex relative items-center justify-center text-center mx-[60px] px-[270px]">
    <span className="text-[#FB8A00] text-center justify-center items-center text-4xl text-light">Contarás con equipo con un mínimo de 7 personas.</span>
    </div>
      </section>

      {/*PlanCards*/}
      <DesktopCommunityManagerSection />

      {/*Formulario*/}
      <Forms />

      {/*Section FootSuperior*/}
      <section className="w-full">
        <div className="flex flex-col md:flex-row w-full bg-[#FFFFFF] p-6">
          {/* Image */}
          <div className="w-full md:w-1/2 pl-[120px] mx-2">
            <Image
              src={"/services/Mockupredes3.svg"}
              className="object-cover transition-opacity opacity-0 duration-500"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              width={595}
              height={265}
              priority={true}
              quality={100}
              style={{
                zIndex: 15,
                position: 'relative',
                top: 60,
                bottom: -50,
                left: '50%',
                transform: 'translateX(-50%)' }}
            />
          </div>
          <br />
          {/* Text */}
          <div className="w-full md:w-1/2 relative flex flex-col items-end justify-center text-center">
            <span className="text-5xl font-bold mb-[2px] text-[#FB8A00] text-end md:text-4xl lg:text-5xl pr-16">
              ¿Estás listo<br />
              para trabajar<br />
              en serio?
            </span>
            <br/>
            <span className="font-light mb-[40px] text-[] text-end text-2xl leading-relaxed tracking-wide pr-16" style={{top: -2}}>
              Te ayudamos a elegir<br />
              el plan para potenciar<br />
              las redes de tu negocio
            </span>
            
            <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-ligth py-1 px-4 rounded text-md text-2xl items-center pr-4 mr-[55px]">
              Hablá con un asesor
            </button>
        </div>
        </div>
      </section>
</aside>

  );
};

export default CommunityManager;