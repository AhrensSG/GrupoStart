import React from "react";
import Image from "next/image";
import Link from "next/link";
import Chat from "../chat/Chat";
import Carousel from "../carrousel/Carousel";

const About = () => {
  return (
    <aside className="w-full flex flex-col justify-center items-center bg-[#FFFFFF] px-[-100px]">
      <Chat style={{ zIndex: 35 }}/>
      {/* Section 1 */}
      <section className="relative bg-[#0853FC] flex w-full px-[5%]">
        {/* Contenedor para la sección */}
        <div className="container mx-auto flex flex-col lg:flex-row pb-1 gap-16 ml-1 pl-0 lg:pl-[50px] pt-[7px]">
          {/* Sección de texto y botón */}
          <div className="w-full flex flex-col justify-center items-center py-2 gap-10">
            <span className="lg:text-5xl md:text-3xl font-bold text-[#FB8A00] text-center justify-center items-center leading-snug">
              Todo sobre nosotros:<br />
              nuestra historia, objetivos, filosofía,<br />
              visión y proyectos futuros
            </span>
            <div className="pt-[3px]">
              <span className="flex lg:text-xl md:text-lg text-white text-center justify-center items-center lg:w-[1000px] lg:h-[300px] md:w-[500px] md:h-[100px] px-[5%] leading-relaxed">
                Somos una agencia de marketing completa de 360 grados,<br />
                enfocada en conectar a los negocios al mundo digital y generar<br />
                resultados positivos para nuestros clientes.<br />
                <br />
                Pensamos la estrategia adecuada, creamos contenidos,<br />
                publicidad efectiva, imágenes y videos profesionales, estamos en<br />
                varios países ayudando a negocios de todos los niveles, desde<br />
                emprendedores hasta empresarios corporativos.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="relative bg-white flex flex-col justify-center items-center w-full">
        {/* SVG wave */}
        <div className="w-full h-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto"
            style={{ position: "relative", width: "full" }}
          >
            <path
              fill="#0853FC"
              fillOpacity="10"
              d="M0,300L48,285C96,270,192,250,288,235C384,220,480,210,576,205C672,210,768,220,864,235C960,250,1056,270,1152,285C1248,300,1344,320,1392,325L1440,330L1440,0L1392,0L1248,0L1152,0L1056,0L960,0L864,0L768,0L672,0L576,0L480,0L384,0L288,0L192,0L96,0L48,0L0,0Z"
            />
          </svg>
        </div>

        {/* Overlap the wave with the image */}
        <div className="relative justify-center items-center object-center flex flex-col z-2 ">
          <Image
            src={"/iconos/logoStartBlue.svg"}
            width={328}
            height={328}
            quality={100}
            className="w-full max-w-xs justify-items-center lg:w-full lg:h-full md:w-1/4 md:h-1/4 relative"
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
          <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#0853FC] leading-tight">
            Trabajamos con negocios<br />
            en todos los niveles de desarrollo
          </span>
        </div>

        <Carousel />

      </section>

            <br/>

      {/* Section 3 - Línea de tiempo */}
      <section className="w-full flex flex-col items-center">
        <h3 className="text-3xl font-light text-black justify-center text-center items-center">Historia</h3>
        <h2 className="text-5xl font-bold mb-8 text-[#FB8A00]">Así nació Start</h2>

        
          {/* 2022 */}
            <div className="w-full flex flex-col items-center text-center px-[2%] py-[14px]">
              <span className="bg-[#0853FC] text-white px-[92px] py-[10px] rounded-tl-full rounded-br-full w-[256px] h-[65px] text-4xl justify-center text-center">
                2022
              </span>
          </div>

        {/* Contenedor de la línea de tiempo */}
        <div className="relative w-full max-w-6xl">
          {/* Línea central */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[602px] w-1 bg-blue-500 z-2 mb-16"></div>

          {/* Founderss */}
          <div className="w-full flex justify-between items-center mb-16">
            <div className="lg:w-1/2 md:w-1/4 flex flex-col items-center text-right lg:pr-10 md:pr-0 md:pl-16">
              <Image
                src="/ivan.jpeg"
                alt="Ivan E. Ayala"
                width={328}
                height={328}
                className="rounded-full border-4 border-blue-500"
              />
              <p className="text-2xl font-bold mt-4">Ivan E. Ayala</p>
              <p className="text-lg">CEO y Co Fundador</p>
            </div>

            <div className="lg:w-1/2 md:w-1/4 flex flex-col items-center text-left lg:pl-10 md:pl-0 md:pr-14">
              <Image
                src="/seba.jpeg"
                alt="Sebastian D. Vera"
                width={328}
                height={328}
                className="rounded-full border-4 border-blue-500"
              />
              <p className="text-2xl font-bold mt-4">Sebastian D. Vera</p>
              <p className="text-lg">CEO y Co Fundador</p>
            </div>
          </div>
    </div>
   {/* Sección de objetivos */}
<div className="w-full flex flex-col items-start justify-start py-1 relative" 
    style={{
        paddingLeft: "400px", // Más desplazado a la derecha
        paddingRight: "50px", 
        position: "relative",
        maxWidth: "100%", 
        overflowX: "hidden",
        marginTop: "70px"  // Mantiene el ajuste hacia abajo
    }}>
  
  <div className="bg-[#FB8A00] text-white font-bold px-[66px] py-[11px] rounded-tl-full rounded-br-full mb-4 justify-start text-left" 
      style={{ maxWidth: "345px", width: "100%" }}>
    Objetivos que nos inspiran
  </div>
  
  <br />
  
  <span className="leading-relaxed text-black text-xl text-left" 
      style={{ width: "100%", maxWidth: "850px", paddingRight: "30px", marginTop: "5px" }}>
    Start se fundó en Formosa Argentina a comienzos del año 2023,<br />
    aunque nuestra historia comienza mucho antes con el objetivo de<br />
    erradicar uno de los problemas más grandes presentes en todos<br />
    los negocios:<strong> "la desinformación sobre los beneficios de las<br />
    herramientas del mundo digital".</strong>
  </span>
</div>



          <div className="w-full py-[10px]">
  {/* 2do Bloque */}
  <div className="w-full py-[30px] flex items-start justify-center text-end">
    <div className="pl-[168px]">
      {/* SVG con línea de 90° hacia abajo y luego derecha */}
      <svg width="310" height="147" xmlns="http://www.w3.org/2000/svg" className="mr-4" style={{top: 250, bottom: -190}}>
        <path d="M0 0 L0 147 L310 147" stroke="#0853FC" strokeWidth="5" fill="none" />
      </svg>
    </div>
    <div className="pl-[50px] pt-[45px]">
      <span className="text-xl leading-relaxed w-[891px] h-[303px]" style={{top: 500, bottom: -70}}>
        Culminaba la pandemia del covid-19 que tanto afligió al<br />
        mundo, Iván organizaba un evento de entretenimiento<br />
        y relaciones públicas, en ese momento se encontraba<br />
        cursando la carrera de comercio exterior y ya creaba<br />
        contenido para varios clientes locales reconocidos<br />
        como un social media freelancer.
      </span>
    </div>
  </div>

  {/* 3er Bloque */}
  <div className="w-full py-[10px] flex items-start justify-center">
    <div className="pr-[50px] pt-[25px]">
      <span className="text-xl leading-relaxed text-start w-[1090px] h-[605px]" style={{left:-50}}>
        Seba, un diseñador gráfico y publicista con una amplia trayectoria,<br />
        estaba de pasada para saludar al dueño del lugar, nota la presencia<br />
        de varios influencers, se acercó preguntando por el organizador,<br />
        y así fue como se encontró con Iván y le propuso sus servicios de<br />
        marketing para el evento a cambio de que los influencers hicieran<br />
        unas fotos con los sombreros que él estaba promoviendo.<br />
        Iván aceptó la colaboración y al final de la sesión terminó<br />
        comprando un sombrero que hasta hoy lo conserva. Seba<br />
        promocionó el evento con amigos y con publicidad paga en redes<br />
        sociales logrando atraer un gran número de personas al evento.<br />
        <strong>La sinergia entre ambos fue tan evidente que luego de un<br />
        tiempo deciden trabajar juntos en un proyecto más grande<br />
        como socios, fundando lo que hoy conocemos como Grupo Start.</strong>
      </span>
    </div>
    <div className="pl-[50px]">
      {/* Línea en ángulo de 90° hacia la izquierda */}
      <svg width="97" height="202" xmlns="http://www.w3.org/2000/svg" className="ml-4" style={{top: -50, bottom: 90}}>
        <path d="M97 0 L97 202 L0 202" stroke="#0853FC" strokeWidth="5" fill="none" />
      </svg>
    </div>
  </div>
</div>

            {/* Ola */}
          <div className="relative w-full justify-end bottom-0" style={{paddingTop: -35}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
                <path fill="#0853FC" fillOpacity="10" d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
              </svg>
          </div>
      </section>

    {/*Section Presentación de Founders*/}
<section className="bg-[#0853FC] w-full py-8">
  <div className="container flex flex-col items-center justify-center relative px-8">

    {/* Founder 1 - Iván Ayala */}
    <div className="w-full flex flex-col items-start text-end mb-12 max-w-[850px] relative">
      {/* Nombre del fundador */}
      <div className="bg-[#FB8A00] text-white font-bold px-4 py-2 rounded-tl-full rounded-br-full w-[250px] text-2xl text-center">
        Iván Ayala
      </div>
      {/* Texto descripción */}
      <div className="bg-white text-[#0853FC] font-light text-xl p-8 mt-4 rounded-lg shadow-md w-full h-auto">
        <p className="text-[1.5rem] font-light leading-relaxed">
          Estudié comercio exterior y emprendo desde los 18 años. Lideró con<br/>
          pasión el área de Community Managers y Social Media en Grupo Start,<br/>
          donde mi mayor talento radica en crear estructuras de trabajo funcionales<br/>
          que optimicen los procesos contemplando a las personas y sus talentos.
        </p>
        <p className="mt-6 text-[1.5rem] font-light leading-relaxed">
          Siempre impulsó a mi equipo y a mis clientes a alcanzar nuevas alturas,<br/>
          integrando la tecnología y la innovación en cada estrategia.<br/>
          Creo firmemente que alinear nuestras pasiones con nuestras tareas diarias<br/>
          es el camino hacia el éxito y la libertad.
        </p>
      </div>
    </div>

    {/* Línea de conexión */}
    <div className="w-full flex items-center justify-center relative z-10 mb-10">
      <div className="h-[50px] w-1 bg-[#0853FC]"></div>
    </div>

    {/* Founder 2 - Sebastián Vera */}
    <div className="w-full flex flex-col items-start text-start max-w-[850px] relative">
      {/* Nombre del fundador */}
      <div className="bg-[#FB8A00] text-white font-bold px-4 py-2 rounded-tl-full text-2xl rounded-br-full w-[250px] justify-center items-center text-center">
        Sebastián Vera
      </div>
      {/* Texto descripción */}
      <div className="bg-white text-[#0853FC] font-light text-xl p-8 mt-4 rounded-lg shadow-md w-full h-auto">
        <p className="text-[1.5rem] font-light leading-relaxed">
          Visionario emprendedor, diseñador gráfico y publicista con amplia<br/>
          trayectoria en la industria, lidero y coordino con éxito las áreas de diseño<br/>
          gráfico, marketing y ventas.
        </p>
        <p className="mt-6 text-[1.5rem] font-light leading-relaxed">
          Apasionado por la innovación y el crecimiento, “hacer que suceda” es mi<br/>
          frase favorita. Colaboré con varias marcas en su identidad y expansión,<br/>
          también con autores en el lanzamiento de sus libros. Creo firmemente en<br/>
          el trabajo en equipo, y estoy activamente para brindar a los negocios<br/>
          un servicio de calidad que les permita alcanzar sus objetivos de desarrollo.
        </p>
      </div>
    </div>

  </div>
</section>

    {/*Section Backstage*/}
    <section className="bg-[#0853FC] w-full pb-8">
      {/* Título */}
      <div className="text-center mb-8">
        <h2 className="text-white text-4xl font-extrabold">
          Backstages con algunos influencers
        </h2>
      </div>

      {/* Contenedor de imágenes */}
      <div className="flex justify-center gap-7 pb-6">
        {/* Primera Imagen */}
        <div className="w-[290px] h-[450px] rounded-lg relative">
          <Image
            src="/imgColab/BackStg1.png"
            alt="Backstage 1"
            width={290}
            height={400}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Segunda Imagen */}
        <div className="w-[290px] h-[400px]">
          <Image
            src="/imgColab/BackStg2.png"
            alt="Backstage 2"
            width={290}
            height={400}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Tercera Imagen */}
        <div className="w-[290px] h-[400px]">
          <Image
            src="/imgColab/BackStg3.png"
            alt="Backstage 3"
            width={290}
            height={400}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Cuarta Imagen */}
        <div className="w-[290px] h-[400px]">
          <Image
            src="/imgColab/BackStg4.png"
            alt="Backstage 4"
            width={290}
            height={400}
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>

{/*Section Texts, Cards, and Items*/}
<section className="bg-[#0853FC] w-full py-8">
  {/* Títulos principales */}
  <div className="text-center mb-8">
    <h1 className="text-orange-500 text-6xl font-extrabold leading-snug">
      Tu éxito es nuestro compromiso <br /> ¿Estás en el lugar correcto?
    </h1>
    <p className="text-white text-2xl font-light mt-4 pb-4">
      Nuestra filosofía y objetivos:
    </p>
    <p className="text-white text-2xl font-light mt-2 px-[50px]">
      Si tu compromiso con tu negocio es total, llegaste al lugar correcto, esta vez si vas<br/>
      a conseguir resultados, no te vamos a prometer que sean inmediatos pero sí<br/>
      sostenibles y exponenciales. <br />
      <br/>Somos tu equipo profesional y queremos acompañar a tu negocio en cada etapa.<br/>
    </p>
  </div>

  {/* Etapas */}
  <div className="flex justify-center gap-[41px] mb-16 pb-[80px]">
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-full px-[70px] py-2 text-[#FB8A00] font-bold text-center">1 - Desarrollo</div>
    </div>
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-full px-[70px] py-2 text-[#FB8A00] font-bold text-center">2 - Crecimiento</div>
    </div>
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-full px-[70px] py-2 text-[#FB8A00] font-bold text-center">3 - Autoridad</div>
    </div>
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-full px-[70px] py-2 text-[#FB8A00] font-bold text-center">4 - Expansión</div>
    </div>
  </div>

  {/* Tarjetas */}
  <div className="flex justify-center gap-[5px] mb-16">
    {/* Primera tarjeta */}
    <div className="bg-[#FB8A00] rounded-lg w-[270px] h-auto p-6 relative">
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <Image
          src="/iconos/unido-co-creacion.png"
          alt="Icono Colaboración"
          width={80}
          height={80}
          quality={100}
        />
      </div>
      <h3 className="text-white text-lg font-bold text-center mt-10 underline">
        Co-creación
      </h3>
      <p className="text-center text-white font-light mt-4 px-2 text-xl leading-relaxed">
        Creemos en una<br/>
        relación colaborativa donde<br/>
        trabajamos juntos para<br/>
        construir soluciones<br/>
        personalizadas y a medida<br/>
        de los clientes.
      </p>
    </div>

    {/* Segunda tarjeta */}
    <div className="bg-[#FB8A00] rounded-lg w-[270px] h-auto p-6 relative">
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <Image
          src="/iconos/gestion-del-talento-excelencia.png"
          alt="Icono Excelencia"
          width={80}
          height={80}
          quality={100}
        />
      </div>
      <h3 className="text-white text-lg font-bold text-center mt-10 underline">
        Excelencia
      </h3>
      <p className="text-center text-white font-light mt-4 px-2 text-xl leading-relaxed">
        Nos esforzamos por alcanzar los<br/>
        más altos estándares de calidad<br/>
        en todo lo que hacemos, desde<br/>
        la estrategia, el equipo hasta la<br/>
        ejecución.
      </p>
    </div>

    {/* Tercera tarjeta */}
    <div className="bg-[#FB8A00] rounded-lg w-[270px] h-auto p-6 relative">
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <Image
          src="/iconos/apreton-de-manos-confianza.png"
          alt="Icono Confianza"
          width={80}
          height={80}
          quality={100}
        />
      </div>
      <h3 className="text-white text-lg font-bold text-center mt-10 underline">
        Confianza
      </h3>
      <p className="text-center text-white font-light mt-4 px-2 text-xl leading-relaxed">
        Construimos relaciones sólidas,<br/>
        basadas en la transparencia,<br/>
        la honestidad y el respeto mutuo<br/>
        con todos los negocios.
      </p>
    </div>

    {/* Cuarta tarjeta */}
    <div className="bg-[#FB8A00] rounded-lg w-[270px] h-auto p-6 relative">
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <Image
          src="/iconos/digital-innovacion.png"
          alt="Icono Innovación"
          width={80}
          height={80}
          quality={100}

        />
      </div>
      <h3 className="text-white text-lg font-bold text-center mt-10 underline">
        Innovación
      </h3>
      <p className="text-center text-white font-light mt-4 px-2 text-xl leading-relaxed">
        Estamos a la vanguardia de las<br/>
        últimas tendencias y tecnologías<br/>
        para garantizar que nuestros<br/>
        clientes se mantengan<br/>
        competitivos en los mercados.
      </p>
    </div>
  </div>

  {/* Texto final */}
  <div className="text-center mb-8">
    <h2 className="text-[#FB8A00] text-5xl font-extrabold leading-snug">
      ¡Recorramos juntos este camino, <br /> estás en el lugar correcto!
    </h2>
    <p className="text-white text-2xl font-light mt-4 px-4">
      Los procesos de desarrollo requieren que se deleguen ciertas<br/>
      actividades, somos el equipo que estás buscando y el que<br/>
      necesitas para tu proyecto.
    </p>
    <p className="text-white text-2xl font-light mt-2 px-4">
      Años de experiencia nos permitieron encontrar la receta para<br/>
      éxito de cualquier marca se inserte al mundo digital.
    </p>
  </div>

  {/* Botón */}
  <div className="text-center">
    <Link href="/contacto">
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-light py-3 px-[40px] rounded-lg text-2xl">
        Hablá con un asesor
      </button>
    </Link>
  </div>
</section>

{/* Section FutureImage */}
<section className="bg-[#0853FC] w-full py-8">
  {/* Contenedor para centrar tanto el título como la imagen */}
  <div className="flex flex-col justify-center items-center">
    {/* Título principal con ancho igual al de la imagen */}
    <h1 className="text-[#FB8A00] text-4xl font-extrabold text-center w-[800px] mb-8">
      El futuro de Start se vé prometedor
    </h1>

    {/* Contenedor de la imagen */}
    <div className="relative justify-center items-center">
      <Image
        src="/iconos/FutureJirafe.svg" 
        alt="El futuro de Start"
        className="rounded-lg object-cover items-center justify-center object-center"
        width={1000}
        height={400}
        style={{ borderRadius: "20px"}}
      />
    </div>
  </div>
</section>

{/* Section IMG Desc */}
<section className="bg-[#0853FC] w-full py-8 px-6">
  <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 pl-[80px]">
    
    {/* Imagen */}
    <div className="w-full lg:w-1/2">
      <Image
        src="/iconos/business.png"
        alt="Business meeting"
        width={600}
        height={400}
        className="rounded-lg object-cover"
      />
    </div>
    
    {/* Texto descriptivo */}
    <div className="w-full lg:w-1/2 text-white text-end pr-[130px]">
      <h1 className="text-[#FB8A00] text-5xl font-extrabold mb-6">
        Soñamos con ayudar <br /> a más negocios
      </h1>
      <p className="text-2xl font-light leading-relaxed">
        Lograremos que hayan sucursales en<br/>
        todo América y porque no permitirse <br />
        soñar ¡En todo el mundo!<br/>
        La clave para hacer de Start una<br/>
        empresa eficiente fue la<br/>
        comunicación, lo sabemos, tenemos<br/>
        el sistema adecuado y los recursos <br />
        humanos más capacitados para<br/>
        hacerlo a gran escala.
      </p>
    </div>

  </div>
</section>

{/* Section Cards White */}
<section className="bg-[#0853FC] w-full py-12 px-4">
  {/* Contenedor principal */}
  <div className="flex justify-center items-center gap-[40px]">
    {/* Primera Card */}
    <div className="bg-white rounded-2xl w-[370px] h-[295px] flex flex-col justify-center items-center p-6">
      <Image
        src="/iconos/clasificacion-100clientes.svg" // Agregar la ruta correcta del icono
        alt="100 Clientes"
        width={162}
        height={162}
        className="mb-6"
      />
      <h3 className="text-[#FB8A00] text-5xl font-bold uppercase text-center">
        +100 Clientes
      </h3>
    </div>

    {/* Segunda Card (más ancha) */}
    <div className="bg-white rounded-2xl w-[420px] h-[295px] flex flex-col justify-center items-center p-6">
      <Image
        src="/iconos/maletin-experiencia.svg" // Agregar la ruta correcta del icono
        alt="Experiencia Profesional"
        width={162}
        height={162}
        className="mb-6"
      />
      <h3 className="text-[#FB8A00] text-5xl font-bold uppercase text-center">
        Experiencia Profesional
      </h3>
    </div>

    {/* Tercera Card */}
    <div className="bg-white rounded-2xl w-[370px] h-[295px] flex flex-col justify-center items-center p-6">
      <Image
        src="/iconos/servicio-al-cliente247.svg" // Agregar la ruta correcta del icono
        alt="Soporte 24/7"
        width={162}
        height={162}
        className="mb-6"
      />
      <h3 className="text-[#FB8A00] text-5xl font-bold uppercase text-center">
        Soporte 24/7
      </h3>
    </div>
  </div>

  {/* Texto Final */}
  <div className="text-center mt-12">
    <h2 className="text-white text-5xl font-extrabold">
      Tendrás un equipo de 7 personas<br/> comprometidas con vos
    </h2>
  </div>
</section>


{/* Section compromisos */}
<section className="bg-[#0853FC] w-full py-8 px-6">
  {/* Título principal */}
  <div className="text-center mb-8">
    <h1 className="text-[#FB8A00] text-6xl font-extrabold">
      No hay nada imposible,<br />
      el límite lo ponemos nosotros
    </h1>
  </div>

  {/* Descripción */}
  <div className="text-center">
    <p className="text-white text-3xl font-light leading-relaxed max-w-5xl mx-auto">
      La coordinación no será una dificultad y sabemos elegir a los mejores<br/>
      para garantizar los resultados. Pronto incursionaremos además en las<br/>
      finanzas, proyectos tecnológicos, cursos de capacitación, encuentros<br/>
      sociales, exposiciones y mucho más, esto dejará de ser un sueño.<br/>
      Sabemos que el límite lo ponemos nosotros y no es algo que hayamos<br/>
      podido encontrar hasta el momento.
    </p>
  </div>

  {/* Botones de compromisos */}
  <div className="flex justify-center mt-8 gap-5">
    <div className="bg-white text-[#FB8A00] font-bold px-auto text-center justify-center py-[14px] items-center rounded-full text-2xl font-extrabold" style={{ width: '270px', height: '60px' }}>
      + Nivel
    </div>
    <div className="bg-white text-[#FB8A00] font-bold px-auto text-center justify-center py-[14px] items-center rounded-full text-2xl font-extrabold" style={{ width: '270px', height: '60px' }}>
      + Enfoque
    </div>
    <div className="bg-white text-[#FB8A00] font-bold px-auto text-center justify-center py-[14px] items-center rounded-full text-2xl font-extrabold" style={{ width: '270px', height: '60px' }}>
      + Compromiso
    </div>
  </div>
</section>


      {/* Section FootSup */}
      <section className="bg-[#0051FF] text-white p-6 lg:w-full relative">
        {/* Title */}
        <div className="text-center justify-center items-center text-2xl md:text-5xl lg:text-5xl">
          <h2 className="text-[#FFFFFF] font-semibold mt-4">
            Queremos acompañarte al éxito<br />
            máximo de tu negocio
          </h2>
        </div>
        <div className="flex relative items-center justify-center text-center mx-[60px] px-[270px] py-8">
          <Link href="/contacto">
          <button className="bg-[#FB8A00] hover:bg-blue-700 text-white font-light py-1 px-4 rounded lg:text-2xl md:text-xl text-lg">
            Hablá con un representante
          </button>
          </Link>
        </div>
      </section>
    </aside>
  );
};

export default About;
