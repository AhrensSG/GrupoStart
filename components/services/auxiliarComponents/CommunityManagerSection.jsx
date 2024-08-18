import React from "react";
import Carrousel from "../carrousel/Carrousel";
import Link from "next/link";

const CommunityManagerSection = () => {
  return (

    <><><><div className="w-full h-full flex flex-col justify-center items-center my-1">

      {/*Text*/}
      <div className="w-full relative flex flex-col items-center justify-center">
        <h1 className="text text-4xl font-bold my-6 py-1 text-[#FB8A00] text-center text-2xl md:text-4xl lg:text-5xl">
          Gestion de Redes Sociales
        </h1>
        <span className="text text-white mb-8 text-center text-5xl md:text-4xl lg:text-4xl font-light text-lg">
          Es tu tiempo de invertir en tus redes para impulsar tu negocio,<br />
          te lo mostramos en este video explicativo.
        </span>
      </div>
      {/*Modificar modules.exports
                  images;{domains:['img.youtube.com']}

<div className="relative max-w-[850px] w-full max-h-96 h-full">
<Image
src={`https://img.youtube.com/vi/${media}/hqdefault.jpg`}
fill
alt="Mediaplayer"
/>

  <iframe
  src={`https://www.youtube.com/embed/${media}`}
  frameBorder="0"
    allowFullScreen
    width="100%"
    height="100%"
    title="Mediaplayer"
    style={{ position: 'absolute', top: 0, left: 0 }}
  />
</div>*/}


    </div>
    <section className="flex flex-wrap justify-center mb-6 mx-2">
        {/*Ola*/}
        <div className="absolute w-full justify-start overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="wave w-full h-auto">
            <path fill="#0853FC" fill-opacity="10" d="M0,300L48,285C96,270,192,250,288,235C384,220,480,210,576,205C672,210,768,220,864,235C960,250,1056,270,1152,285C1248,300,1344,320,1392,325L1440,330L1440,0L1392,0L1248,0L1152,0L1056,0L960,0L864,0L768,0L672,0L576,0L480,0L384,0L288,0L192,0L96,0L48,0L0,0Z"></path>
          </svg>
        </div>

        <div className="relative flex flex-col items-center justify-center h-relative z-10">
          {/*<img src={"/WaveBG.jpg"} className="w-full" />*/}
          <Image
            src={icon}
            priority
            width={270}
            height={300}
            className="flex object-center justify-center items-center"
            quality={100} />
          <div className="flex flex-col justify-center items-center mb-6 mx-2">
            <h2 className="text font-light bg-[#FB8A00] text-white mb-6 text-2xl md:text-4xl lg:text-4xl px-4 py-2 border rounded-tl-xl rounded-br-xl">
              Sube de nivel hoy
            </h2>
            <span className="text text-4xl font-bold my-6 text-[#0853FC] text-center text-2xl md:text-4xl lg:text-5xl">
              Ayudamos a que tu redes<br />alcancen su máximo potencial.
            </span>
          </div>
        </div>

        {/*Carrusel*/}
        {/*<div className="relative overflow-x-hidden">
<div className="flex scroll-snap-x scroll-snap-mandatory gap-4">
{carrouselImages.map((image) => (
<div key={image.alt} className="w-full">
<Image
  src={image.src}
  alt={image.alt}
  className="object-cover object-center transition-opacity opacity-0 duration-500"
  onLoad={(event) => event.target.classList.remove("opacity-0")}
  width={850}
  height={465}
  priority={true}
  quality={100}
/>
</div>
))}
</div>
</div>*/}
        <Carrousel />
      </section></><section className="relative flex flex-wrap w-auto h-screen justify-center items-center bg-white md:pb-[77px] sm:pb-[10px]">
        <div className="flex flex-col md:flex-row w-full p-6">
          {/*Image*/}
          {/*<div className="w-full md:w-1/2">
  <Image
  src={"/"}
  className="object-cover transition-opacity opacity-0 duration-500"
  onLoad={(event) => event.target.classList.remove("opacity-0")}
  width={595}
  height={265}
  priority={true}
  quality={100}
  />
</div>*/}
          <br />
          {/*Text*/}
          <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center">
            <span className="text-4xl font-bold mb-[28px] text-[#0853FC] text-center text-2xl md:text-4xl lg:text-5xl">
              Hacemos<br />
              crecer<br />
              tu negocio<br />
              en redes
            </span>
            <span className="text text-lg mb-[40px] text-center text-1xl md:text-2xl sm:text-4xl leading-relaxed tracking-wide">
              Llegá a nuevos<br />
              clientes en todas<br />
              las plataformas Meta
            </span>

            <Link href="/">
              <button className="bg-[#FB8A00] hover:bg-[#0853FC] text-white font-bold py-2 px-4 rounded item-center flex flex-row gap-2 items-center justify-center p-1 px-10 text-2xl hover:text-[#FB8A00] font-medium duration-300 shadow-sm shadow-black border-orange-500 rounded-md">Empezar</button>
            </Link>

          </div>
        </div>
        {/*Ola*/}
        <div className="absolute w-full justify-end overflow-hidden bottom-0">
          <svg xmlns="http://www.w3.org/200/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#0853FC" fill-opacity="10" d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
          </svg>
        </div>
      </section></><section>
        <div className="flex flex-col md:flex-row w-full bg-[#0051FF] p-6">
          {/*Image*/}
          <div className="w-full md:w-1/2">
            <Image
              src={"/jirafe1.svg"}
              className="object-cover transition-opacity opacity-0 duration-500"
              onLoad={(event) => event.target.classList.remove("opacity-0")}
              width={595}
              height={265}
              priority={true}
              quality={100} />
          </div>
          <br />
          {/*Text*/}
          <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold mb-[28px] text-[#FFFFFF] text-end md:text-4xl lg:text-5xl">
              Creamos los<br />
              contenidos<br />
              estratégicos<br />
              que atraen
            </span>
            <span className="font-bold mb-[40px] text-[#FB8A00] text-end text-4xl md:text-4xl lg:text-5xl leading-relaxed tracking-wide pr-16">
              y conectan con<br />
              tu audiencia<br />
            </span>

          </div>
        </div>

      </section>

      <section className="bg-[#0051FF] text-white p-6">
    {/*Title*/}
    <div className="text-center justify-center items-center text-2xl md:text-5xl lg:text-5xl">
      <h2 className="text-[#FFFFFF] font-semibold mt-4 ">Contratas a Start, contratas un equipo<br />
        de<span className="text-[#FB8A00] font-semibold "> trabajo profesional</span>
      </h2>

    </div>
    {/*Circle-contents*/}
    <aside className="flex flex-between justify-center items-center">

      <div className="info-container row">
        <div className="item-center justify-center text-center">
          <span className="person-icon [#FB8A00]">👤</span>
          <span>Project Manager</span>
        </div>

        <div className="!rounded-full bg-[#0853FC] relative object-center flex justify-center item-center text-center !border-[#FFFFFF]" style={{ borderColor: '!important', borderWidth: 3 }}>
          <p className="text-3xl font-bold items-center text-center">360°</p>
        </div>

        <div className="info-item">
          <span className="person-icon">👤</span>
          <span>Coordinador de Social Media</span>
        </div>
        <div className="info-item">
          <span className="person-icon">👤</span>
          <span>Social Media</span>
        </div>
        <div className="info-item">
          <span className="person-icon">👤</span>
          <span>Community Manager</span>
        </div>
        <div className="info-item">
          <span className="person-icon">👤</span>
          <span>Coordinador de Media</span>
        </div>
        <div className="info-item">
          <span className="person-icon">👤</span>
          <span>Diseñador Gráfico</span>
        </div>
        <div className="info-item">
          <span className="person-icon">👤</span>
          <span>Creativo Publicitario</span>
        </div>
      </div>
      <div className="items-center justify-center text-center flex">
        <span className="text-[#FB8A00] font-light text-2xl md:text-3xl lg:text-4xl pb-[53px] pt-[17px] text-end">Contarás con un equipo con un mínimo de 7 personas.</span>
      </div>
    </aside>

  </section><div className="w-full h-full flex flex-col justify-between items-center gap-4">
      <div>
        <h2 className="text-4xl font-medium text-[#0853FC] text-center">
          Elegí tu plan
        </h2>
      </div>
      <div className="flex flex-col w-2/3 justify-center items-start gap-4">
        <span className="text-xl cursor-pointer">1 Plan emprendedor</span>
        <span className="text-xl cursor-pointer">2 Plan empresarial</span>
        <span className="text-xl cursor-pointer">3 Plan corporativo</span>
        <span className="text-xl cursor-pointer">
          4 Quiero mi plan personalizado
        </span>
      </div>
      <button className="border w-2/3 py-2 px-3 rounded-md bg-[#0853FC] text-white font-medium mt-2">
        Contratar
      </button>
    </div></>
  );
};

export default CommunityManagerSection;
