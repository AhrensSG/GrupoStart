"use client"
import Image from "next/image";
import React from "react";
import Carousel from "@/components/carrousel/Carousel";
import Link from "next/link";
import NavBarV2 from "@/components/navbar/NavBarV2";
import Footer from "@/components/footer/Footer";
import Chat from "@/components/chat/Chat";


const Contact = () => {
  return (

    <aside className="w-full relative flex flex-col justify-start items-center overflow-hidden">
        <NavBarV2/>
        <Chat/>
{/* Sección Principal */}
<section className="w-full bg-[#0853FC] text-white lg:pt-[5%] md:py-9 flex items-center justify-center px-[2%]">
  <div className="relative flex justify-center w-full">
    <div className="w-full items-start justify-center pl-[2%]">
      <h1 className="lg:text-5xl md:text-3xl font-extrabold text-[#FB8A00]">
        Sede Central<br /> en Ciudad de Formosa<br /> República Argentina
      </h1>

      {/* Mail */}
      <div className="flex items-center mt-6">
        <Image
          src={"/MailIcon.svg"}
          width={30}
          height={30}
          alt="MailIcon"
          className="mr-2"
        />
        <p className="text-lg">grupoSTART@gmail.com</p>
      </div>

      {/* Teléfono */}
      <div className="flex items-center mt-2">
        <Image
          src={"/PhoneIcon.svg"}
          width={30}
          height={30}
          alt="PhoneIcon"
          className="mr-2"
        />
        <Link href="tel:+543704619402">
          <p className="text-lg">+54 3704-619402</p>
        </Link>
      </div>

      {/* Texto de redes sociales */}
      <div className="mt-6">
        <p className="text-lg mb-2">Síguenos en:</p>

        {/* Redes sociales en fila */}
        <div className="flex gap-8 items-center">
          {/* Facebook */}
          <div className="flex items-center text-white">
            <Link
              href={"https://www.facebook.com/profile.php?id=100091823826062"}
              target="_blank"
            >
              <Image
                src="/FooterFacebookIcon.svg"
                width={30}
                height={30}
                alt="FacebookIcon"
                className="cursor-pointer"
                style={{ filter: "invert(1)" }} // Hace el icono blanco
              />
            </Link>
            <Link
              href={"https://www.facebook.com/profile.php?id=100091823826062"}
              target="_blank"
            >
              <span className="ml-2">Facebook</span>
            </Link>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center text-white">
            <Link href={"https://www.linkedin.com/"} target="_blank">
              <Image
                src="/FooterLinkedInIcon.svg"
                width={30}
                height={30}
                alt="LinkedInIcon"
                className="cursor-pointer"
                style={{ filter: "invert(1)" }} // Hace el icono blanco
              />
            </Link>
            <Link href={"https://www.linkedin.com/"} target="_blank">
              <span className="ml-2">LinkedIn</span>
            </Link>
          </div>

          {/* Instagram */}
          <div className="flex items-center text-white">
            <Link
              href={"https://www.instagram.com/grupostart.ok/"}
              target="_blank"
            >
              <Image
                src="/FooterInstagramIcon.svg"
                width={30}
                height={30}
                alt="InstagramIcon"
                className="cursor-pointer"
                style={{ filter: "invert(1)" }} // Hace el icono blanco
              />
            </Link>
            <Link
              href={"https://www.instagram.com/grupostart.ok/"}
              target="_blank"
            >
              <span className="ml-2">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Imagen de la Ciudad */}
    <div className="w-full items-end justify-center relative">
      <Image
        src="/iconos/ciudadFormosa.png"
        alt="Ciudad de Formosa"
        width={654}
        height={489}
        className="rounded-lg justify-items-center lg:w-[230vh] h-[220vw] md:h-[37vh] md:w-[70vh]"
      />
    </div>
  </div>
</section>

{/* Section 2 Ola y Carrusel*/}
<section className="relative bg-white flex flex-col justify-center items-center w-full">
        {/* SVG wave */}
        <div className="w-full justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 310"
            className="w-full h-full"
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
        <div className="relative justify-center items-center object-center grid place-items: center z-10">
          <Image
            src={"/iconos/logoStartBlue.svg"}
            width={300}
            height={338}
            quality={100}
            className="lg:w-[100%] lg:h-[100%] md:w-[20vh] md:h-[20vh] lg:pt-0 md:pt-[5%] md:bottom-0 md:top-[20%]"
            style={{
              zIndex: 15,
              position: "relative",
              top: -180,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>

        {/* Text section */}
        <div className="text-center lg:mt-[-90px] md:mt-[-20%] mb-[5%] relative px-[1%]">
          <span className="md:text-4xl lg:text-6xl font-bold text-[#0853FC] leading-tight">
            Algunos de nuestros clientes<br />
            que confían en nosotros
          </span>
        </div>
        <br/>
        
</section>

<section className="bg-[#FFFFFF] w-full relative flex justify-items-center z-15 pb-[3%]">
<Carousel />
</section>

{/* Section Formulario de Contacto */}
<section className="bg-[#FFFFFF] w-full py-12 flex justify-center items-center relative z-10">
  <div className="container mx-auto flex flex-row justify-between items-center gap-16 px-8">
    
    {/* Columna Izquierda - Título y Descripción */}
    <div className="w-1/2 flex flex-col items-start pl-[60px]">
      <h1 className="text-[#FB8A00] lg:text-6xl md:text-4xl font-extrabold mb-6">
        ¡Comencemos a <br /> trabajar juntos!
      </h1>
      <p className="text-black lg:text-3xl md:text-xl font-light">
        Completá el siguiente<br/>
        formulario para que <br />
        nos pongamos en<br/>
        contacto con vos.
      </p>
    </div>

    {/* Columna Derecha - Formulario */}
    <form className="w-1/2 grid grid-cols-2 gap-4 pr-[50px]">
      {/* Nombre y Apellido */}
      <input
        type="text"
        placeholder="Nombre y Apellido"
        className="border border-gray-300 rounded-md p-2"
      />
      {/* Empresa */}
      <input
        type="text"
        placeholder="Empresa"
        className="border border-gray-300 rounded-md p-2"
      />

      {/* Teléfono */}
      <input
        type="text"
        placeholder="Teléfono"
        className="border border-gray-300 rounded-md p-2"
      />
      {/* País */}
      <input
        type="text"
        placeholder="País"
        className="border border-gray-300 rounded-md p-2"
      />

      {/* Columna Izquierda */}
      <div className="col-span-1 flex flex-col gap-4">
        {/* Correo Electrónico */}
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="border border-gray-300 rounded-md p-2"
        />

        {/* Cómo nos conociste */}
        <select className="border border-gray-300 rounded-md p-2">
          <option>¿Cómo nos conociste?</option>
          <option>Redes Sociales</option>
          <option>Google</option>
          <option>Amigos</option>
          <option>Publicidad</option>
        </select>

        {/* Soluciones */}
        <select className="border border-gray-300 rounded-md p-2">
          <option>Soluciones</option>
          <option>Marketing Digital</option>
          <option>Diseño Gráfico</option>
          <option>Desarrollo Web</option>
          <option>Consultoría</option>
        </select>
      </div>

      {/* Columna Derecha - Mensaje */}
      <div className="col-span-1">
        <textarea
          placeholder="Mensaje"
          className="w-full border border-gray-300 rounded-md p-2 h-40"
        ></textarea>
      </div>

      {/* Botón Enviar */}
      <div className="col-span-2 flex justify-center">
        <button className="bg-[#0853FC] text-white font-bold py-2 px-8 rounded-md hover:bg-[#0043D0]">
          Enviálo
        </button>
      </div>
    </form>
  </div>
</section>

{/* Section ImageLocation*/}
<section className="bg-[#FFFFFF] w-full pt-4 relative">
  {/* Contenedor para centrar tanto el título como la imagen */}
  <div className="flex flex-col justify-center items-center">
    {/* Título principal con ancho igual al de la imagen */}
    <h1 className="text-[#0853FC] lg:text-5xl md:text-3xl font-extrabold text-center w-[800px] mb-8">
      Puedes visitarnos en:
    </h1>
    {/*Subtitulo con la direccion*/}
    <h2 className="text-black lg:text-3xl md:text-xl font-light text-center w-[950px]">
      Calle Hipólito Yrigoyen 342 entre Dean Funes y Moreno
      </h2>
    {/* Contenedor de la imagen */}
    <div className="w-2/4 h-auto relative justify-items-center lg:mb-[-6%]">
    <Link
            href="https://www.google.com/maps/place/Hip%C3%B3lito+Yrigoyen+342,+P3600JGA+Formosa,+Argentina"
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
      <Image
        src="/Location.svg"  // Asegúrate de que la ruta de la imagen sea correcta
        alt="LOCATION"
        className="rounded-lg object-cover items-center justify-center object-center cursor-pointer relative"
        width={800}
        height={300}
        style={{ borderRadius: "20px", justifyContent: "center"}}
      />
      </Link>
    </div>
  </div>
        {/* Ola */}
        <div className="relative w-full justify-end bottom-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full object-cover">
                <path fill="#0853FC" fillOpacity="10" d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
              </svg>
          </div>
</section>

{/* Section CardsOranges Servicios y Valores */}
<section className="bg-[#0853FC] w-full py-8 relative flex-col px-[2%]">
  {/* Título principal */}
  <div className="text-center mb-8">
    <h1 className="text-white lg:text-5xl md:text-3xl font-extrabold">
      Nuestros Servicios y Valores
    </h1>
  </div>

  {/* Contenedor de Servicios */}
  <div className="flex justify-center object-center items-center lg:gap-[20vh] md:gap-[2vh] lg:mb-16 md:mb-7 w-full relative">
    {/* Primer Servicio */}
    <div className="flex flex-col justify-items-center relative">
      <Image
        src="/services/Jirafe3.svg"  // Ruta de la imagen correcta
        alt="Gestión de Redes"
        width={176}
        height={180}
        className="rounded-full relative lg:w-full lg:h-full md:w-[75%] md:h-[65%]"
      />
      <div className="bg-[#FB8A00] text-white font-bold lg:w-[320px] md:w-[245px] md:h-[22px] lg:h-[34px] mt-4 flex items-center justify-center rounded-tl-full rounded-br-full">
        Gestión de Redes
      </div>
    </div>

    {/* Segundo Servicio */}
    <div className="flex flex-col items-center relative">
      <Image
        src="/services/Jirafe2.svg"  // Ruta de la imagen correcta
        alt="Media"
        width={176}
        height={180}
        className="rounded-full relative lg:w-full lg:h-full md:[70%] md:h-[60%]"
      />
      <div className="bg-[#FB8A00] text-white font-bold lg:w-[320px] md:w-[245px] md:h-[22px] lg:h-[34px] mt-4 flex items-center justify-center rounded-tl-full rounded-br-full">
        Media
      </div>
    </div>

    {/* Tercer Servicio */}
    <div className="flex flex-col items-center relative">
      <Image
        src="/services/Jirafe12.svg"  // Ruta de la imagen correcta
        alt="Herramientas Útiles"
        width={176}
        height={180}
        className="rounded-full relative lg:w-full lg:h-full md:w-[65%] md:h-[55%]"
      />
      <div className="bg-[#FB8A00] text-white font-bold lg:w-[320px] md:w-[245px] md:h-[22px] lg:h-[34px] mt-4 flex items-center justify-center rounded-tl-full rounded-br-full">
        Herramientas Útiles
      </div>
    </div>
  </div>

  {/* Contenedor de Valores */}
  <div className="flex justify-center w-full lg:gap-[56px] md:gap-[26px]">
    {/* Primera Tarjeta */}
    <div className="bg-[#FB8A00] text-white flex flex-col items-center justify-center lg:w-[275px] lg:h-[219px] md:w-[175px] md:h-[120px] rounded-lg">
      <Image
        src="/iconos/unido-co-creacion.png"
        alt="Co-creación"
        width={80}
          height={80}
          quality={100}
      />
      <h3 className="font-bold mt-4">Co-creación</h3>
    </div>

    {/* Segunda Tarjeta */}
    <div className="bg-[#FB8A00] text-white flex flex-col items-center justify-center lg:w-[275px] lg:h-[219px] md:w-[175px] md:h-[120px] rounded-lg">
      <Image
        src="/iconos/gestion-del-talento-excelencia.png"
        alt="Excelencia"
        width={80}
        height={80}
        quality={100}
      />
      <h3 className="font-bold mt-4">Excelencia</h3>
    </div>

    {/* Tercera Tarjeta */}
    <div className="bg-[#FB8A00] text-white flex flex-col items-center justify-center lg:w-[275px] lg:h-[219px] md:w-[175px] md:h-[120px] rounded-lg">
      <Image
        src="/iconos/apreton-de-manos-confianza.png"
        alt="Confianza"
        width={80}
          height={80}
          quality={100}
      />
      <h3 className="font-bold mt-4">Confianza</h3>
    </div>

    {/* Cuarta Tarjeta */}
    <div className="bg-[#FB8A00] text-white flex flex-col items-center justify-center lg:w-[275px] lg:h-[219px] md:w-[175px] md:h-[120px] rounded-lg">
      <Image
        src="/iconos/digital-innovacion.png"
        alt="Innovación"
        width={80}
          height={80}
          quality={100}
      />
      <h3 className="font-bold mt-4">Innovación</h3>
    </div>
  </div>
</section>

{/* Section Cards White */}
<section className="bg-[#0853FC] w-full py-12 px-[2%] relative flex">
  {/* Contenedor principal */}
  <div className="flex w-full relative justify-center items-center gap-[40px]">
    {/* Primera Card */}
    <div className="bg-white rounded-2xl lg:w-[42vh] lg:h-[39vh] md:w-[30vh] md:h-[20vh] flex flex-col justify-center items-center p-6">
      <Image
        src="/iconos/clasificacion-100clientes.svg" // Agregar la ruta correcta del icono
        alt="100 Clientes"
        width={162}
        height={162}
        className="lg:mb-6 md:mb-4 lg:w-[20vh] lg:h-[20vh] md:w-[15vh] md:h-[8vh]"
      />
      <h3 className="text-[#FB8A00] lg:text-5xl md:text-3xl font-bold uppercase text-center">
        +100 Clientes
      </h3>
    </div>

    {/* Segunda Card (más ancha) */}
    <div className="bg-white rounded-2xl lg:w-[72vh] lg:h-[39vh] md:w-[40vh] md:h-[20vh] flex flex-col justify-center items-center p-6">
      <Image
        src="/iconos/maletin-experiencia.svg" // Agregar la ruta correcta del icono
        alt="Experiencia Profesional"
        width={162}
        height={162}
        className="lg:mb-6 md:mb-4 lg:w-[20vh] lg:h-[20vh] md:w-[15vh] md:h-[8vh]"
      />
      <h3 className="text-[#FB8A00] lg:text-5xl md:text-3xl font-bold uppercase text-center">
        Experiencia Profesional
      </h3>
    </div>

    {/* Tercera Card */}
    <div className="bg-white rounded-2xl lg:w-[42vh] lg:h-[39vh] md:w-[30vh] md:h-[20vh] flex flex-col justify-center items-center relative p-6">
      <Image
        src="/iconos/servicio-al-cliente247.svg" // Agregar la ruta correcta del icono
        alt="Soporte 24/7"
        width={162}
        height={162}
        className="lg:mb-6 md:mb-4 lg:w-[20vh] lg:h-[20vh] md:w-[15vh] md:h-[8vh]"
      />
      <h3 className="text-[#FB8A00] lg:text-5xl md:text-3xl font-bold uppercase text-center">
        Soporte 24/7
      </h3>
    </div>
  </div>
</section>

<section className="bg-[#0853FC] w-full justify-items-center text-center px-2%">
    {/* Texto Final */}
    <div className="text-center py-[3%]">
    <h2 className="text-white text-5xl font-extrabold">
      Tendrás un equipo de 7 personas<br/> comprometidas con vos
    </h2>
  </div>
</section>

  <Footer/>
    </aside>
  );
};

export default Contact;

    