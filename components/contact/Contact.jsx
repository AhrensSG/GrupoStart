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
{/* Sección 1 Principal */}
<section className="w-full bg-[#0853FC] text-white lg:pt-[5%] md:py-9 flex items-center justify-center px-[2%] md:flex-row xs:flex-col sm:flex-col max-xs:flex-col max-xs:items-center">
  <div className="relative md:flex-row justify-center w-full xs:flex-col max-xs:flex-col max-xs:items-center xs:items-center">
    <div className="w-full md:items-start xs:items-center max-xs:items-center justify-center md:pl-[2%]">
      <h1 className="lg:text-5xl xs:text-3xl max-xs:text-xl max-xs:text-center md:text-start xs:text-center font-extrabold text-[#FB8A00]">
        Sede Central<br /> en Ciudad de Formosa<br /> República Argentina
      </h1>

      {/* Mail */}
      <div className="flex xs:flex-row max-xs:flex-col items-center max-xs:justify-center xs:justify-center sm:justify-center md:justify-start mt-6">
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
      <div className="flex xs:flex-row max-xs:flex-col items-center max-xs:justify-center xs:justify-center sm:justify-center md:justify-start mt-2">
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
      <div className="mt-6 flex max-xs:flex-col xs:flex-col max-xs:justify-items-center sm:justify-center max-xs:pb-2 xs:pb-0">
        <p className="text-lg mb-2 sm:text-center xs:text-center max-xs:text-center md:text-start flex max-xs:justify-center xs:justify-center sm:justify-center md:justify-start">Seguinos en:</p>

        {/* Redes sociales en fila */}
        <div className="flex xs:flex-row xs:gap-8 max-xs:gap-4 items-center max-xs:justify-center xs:justify-center sm:justify-center md:justify-start lg:justify-start">
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
  </div>
   {/* Imagen de la Ciudad */}
   <div className="max-xs:w-auto md:w-full md:items-end xs:items-center max-xs:items-center sm:justify-items-center justify-center relative md:flex-row xs:flex-col max-xs:flex-col max-xs:px-[2vh] xs:px-[5vh] md:px-0 xs:mt-[2vh] md:mt-0">
      <Image
        src="/iconos/ciudadFormosa.png"
        alt="Ciudad de Formosa"
        width={654}
        height={489}
        className="rounded-lg justify-center h-auto"
      />
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
              d="M0,300L48,285C96,270,192,250,288,235C384,220,480,210,576,205C672,210,768,220,864,235C960,250,1056,270,1152,285C1248,300,1344,310,1392,315C1432,320,1440,315,1440,315L1440,0L1392,0L1248,0L1152,0L1056,0L960,0L864,0L768,0L672,0L576,0L480,0L384,0L288,0L192,0L96,0L48,0L0,0Z"
            />
          </svg>
        </div>

        {/* Overlap the wave with the image */}
        <div className="relative justify-center items-start object-center place-items:center z-15">
          <Image
            src={"/iconos/logoStartBlue.svg"}
            width={338}
            height={338}
            quality={100}
            className="lg:w-[100%] lg:h-[100%] relative lg:-top-[2%] md:w-[16vh] md:h-[16vh] md:-pt-[3vh] md:bottom-0 md:-mt-[10vh] xs:w-[10vh]  max-xs:w-[12vh] max-xs:-mt-[25%]"
            style={{
              zIndex: 15,
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>

        {/* Text section */}
        <div className="text-center lg:pt-[1%] md:mt-[5%] mb-[4%] relative px-[1%]">
          <span className="max-xs:text-xl xs:text-3xl md:text-4xl lg:text-6xl font-bold text-[#0853FC] leading-tight">
            Algunos de nuestros clientes<br />
            que confían en nosotros
          </span>
        </div>
        <br/>
        
</section>

<section className="bg-[#FFFFFF] w-full relative flex justify-items-center z-15 pb-[3%]">
<Carousel />
</section>

{/* Section 3 Formulario de Contacto */}
<section id="contact-form" className="bg-[#FFFFFF] w-full py-12 flex justify-center items-center relative z-10 md:flex-row">
  <div className="container mx-auto flex md:flex-row xs:flex-col max-xs:flex-col justify-between items-center gap-16 px-8">
    
    {/* Columna Izquierda - Título y Descripción */}
    <div className="md:w-1/2 xs:w-full flex flex-col md:items-start xs:items-center max-xs:items-center md:pl-[60px] xs:pl-0 max-xs:pl-0">
      <h1 className="text-[#FB8A00] lg:text-6xl md:text-4xl xs:text-3xl max-xs:text-xl font-extrabold mb-6 md:text-start xs:text-center">
        ¡Comencemos a <span className="hidden md:inline"> <br /></span>trabajar juntos!
      </h1>
      <p className="text-black lg:text-3xl xs:text-xl font-light md:text-start xs:text-center max-xs:text-center">
        Completá el siguiente <span className="hidden md:inline"> <br /></span>
        formulario para que <span className="hidden md:inline"> <br /></span>
        nos pongamos en <span className="hidden md:inline"> <br /></span>
        contacto con vos. <span className="hidden md:inline"> <br /></span>
      </p>
    </div>

    {/* Columna Derecha - Formulario */}
    <form className="md:w-1/2 xs:w-full max-xs:w-full grid grid-cols-2 gap-4 md:pr-[50px] xs:pr-0 max-xs:pr-0">
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
          <option>Recomendaciones</option>
          <option>Otro</option>
        </select>

        {/* Soluciones */}
        <select className="border border-gray-300 rounded-md p-2">
          <option>Soluciones</option>
          <option>Gestion de Redes</option>
          <option>Media</option>
          <option>Herramientas Utiles (tarjeteria)</option>
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

{/* Section 4 ImageLocation*/}
<section className="bg-[#FFFFFF] w-full pt-4 relative">
  {/* Contenedor para centrar tanto el título como la imagen */}
  <div className="flex flex-col justify-center items-center">
    {/* Título principal con ancho igual al de la imagen */}
    <h1 className="text-[#0853FC] lg:text-5xl xs:text-3xl max-xs:text-xl font-extrabold text-center w-[800px] mb-8">
      Puedes visitarnos en:
    </h1>
    {/*Subtitulo con la direccion*/}
    <h2 className="text-black lg:text-3xl xs:text-xl max-xs:text-md font-light text-center xs:w-[950px] max-xs:w-auto">
      Calle Hipólito Yrigoyen 342 entre Dean Funes y Moreno
      </h2>

    {/* Contenedor de la imagen */}
    <div className="relative lg:w-3/4 md:w-3/4 xs:w-full max-xs:w-full h-auto justify-items-center lg:mb-[-6%] xs:px-[4%] max-xs:px-[2%]">
      {/* Contenedor del Mapa */}
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <iframe
          className="w-full max-xs:h-[240px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d297.1321053462186!2d-58.16666915644871!3d-26.186531600124447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945ca59fad6f0755%3A0xcd334b7ea9655e5b!2sGrupo%20Start!5e0!3m2!1ses!2sar!4v1738105367568!5m2!1ses!2sar"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ borderRadius: "20px" }}
        ></iframe>
        
        {/* Botón Flotante para Abrir en Google Maps */}
        <a
          href="https://www.google.com/maps/place/Hip%C3%B3lito+Yrigoyen+342,+P3600JGA+Formosa,+Argentina"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="google-maps">
            <path fill="#4285f4" d="M25.3959 8.8345l-.0039.0038c.0837.2319.1617.4667.2285.7062C25.5527 9.3047 25.48 9.067 25.3959 8.8345zM16 2.23L8.929 5.1593 12.9916 9.222A4.2486 4.2486 0 0 1 19.0208 15.21L25 9.23l.392-.392A9.9872 9.9872 0 0 0 16 2.23z"></path>
            <path fill="#ffba00" d="M16,16.4733A4.25,4.25,0,0,1,12.9916,9.222L8.929,5.1593A9.9683,9.9683,0,0,0,6,12.23c0,4.4057,2.2651,7.1668,4.93,10,.1787.1828.3274.3852.4959.5746l7.5608-7.5609A4.2341,4.2341,0,0,1,16,16.4733Z"></path>
            <path fill="#0066da" d="M16,2.23a10,10,0,0,0-10,10,11.0918,11.0918,0,0,0,.5454,3.4546l12.8505-12.85A9.9563,9.9563,0,0,0,16,2.23Z"></path>
            <path fill="#00ac47" d="M16.9011,29.12a21.83,21.83,0,0,1,4.032-6.8966C23.7976,19.3129,26,16.636,26,12.23a9.9585,9.9585,0,0,0-.6041-3.3958l-13.97,13.97A18.0436,18.0436,0,0,1,15.0173,29.08.9975.9975,0,0,0,16.9011,29.12Z"></path>
            <path fill="#0066da" d="M10.93 22.23c.1787.1828.3274.3852.4959.5746h0C11.257 22.6155 11.1083 22.4131 10.93 22.23zM7.207 7.4637A9.9357 9.9357 0 0 0 6.45 9.2566 9.9429 9.9429 0 0 1 7.207 7.4637zM6.45 9.2566a9.9522 9.9522 0 0 0-.398 1.9513A9.9537 9.9537 0 0 1 6.45 9.2566z" opacity=".5"></path>
            <path fill="#fff" d="M15.1957 29.3989c.02.0248.0445.0422.0664.0644C15.24 29.4411 15.2156 29.4236 15.1957 29.3989zM15.7874 29.7429l.04.0066zM13.6216 25.9269c-.0371-.067-.0679-.1382-.1059-.2047C13.5533 25.789 13.5849 25.86 13.6216 25.9269zM15.0173 29.08q-.3069-.9036-.6906-1.7566C14.5793 27.8937 14.8127 28.4771 15.0173 29.08zM15.5269 29.6563c-.0229-.0112-.0463-.0207-.0684-.0338C15.4809 29.6356 15.5036 29.6452 15.5269 29.6563zM19.7117 23.7529c-.249.3474-.4679.7125-.6927 1.0741C19.2431 24.465 19.4633 24.1006 19.7117 23.7529z"></path>
            <polygon fill="#fff" points="23.322 19.553 23.322 19.553 23.322 19.553 23.322 19.553"></polygon>
            <path fill="#fff" d="M17.0468 28.774h0q.3516-.887.7561-1.7428C17.5316 27.6006 17.2812 28.1826 17.0468 28.774zM18.68 25.3584c-.2879.4957-.55 1.0068-.8 1.5242C18.13 26.3647 18.3931 25.8547 18.68 25.3584z"></path>
            <path fill="#ea4435" d="M8.929,5.1593A9.9683,9.9683,0,0,0,6,12.23a11.0918,11.0918,0,0,0,.5454,3.4546L13,9.23Z"></path>
          </svg>
          <span>Ver en Google Maps</span>
        </a>
      </div>
    </div>

  </div>
        {/* Ola */}
        <div className="relative w-full justify-end bottom-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full object-cover">
                <path fill="#0853FC" fillOpacity="10" d="M0,96L48,122.7C96,149,192,203,288,218.7C384,235,480,213,576,197.3C672,181,768,171,864,170.7C960,171,1056,181,1152,197.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
              </svg>
          </div>
</section>

{/* Section 5 CardsOranges Servicios y Valores */}
<section className="bg-[#0853FC] w-full py-8 relative flex-col px-[2%]">
  {/* Título principal */}
  <div className="text-center mb-8">
    <h1 className="text-white lg:text-5xl md:text-3xl max-xs:text-xl font-extrabold">
      Nuestros Servicios y Valores
    </h1>
  </div>

  {/* Contenedor de Servicios */}
  <div className="flex xs:flex-row max-xs:flex-grow justify-center object-center items-center lg:gap-[15vh] md:gap-[2vh] max-xs:gap-[5px] lg:mb-16 xs:mb-7 max-xs:mb-4 w-full relative">
    {/* Primer Servicio */}
    <div className="flex flex-col items-center relative">
      <Image
        src="/services/Jirafe3.svg"  // Ruta de la imagen correcta
        alt="Gestión de Redes"
        width={176}
        height={180}
        className="rounded-full relative lg:w-full lg:h-full md:w-[85%] md:h-[65%] max-xs:w-[65%] max-xs:h-[45%] justify-center max-xs:items-center"
      />
      <div className="bg-[#FB8A00] text-white font-bold lg:w-[320px] md:w-[245px] md:h-[22px] lg:h-[34px] xs:w-auto xs:h-auto mt-4 xs:px-4 md:px-0 flex items-center justify-center xs:rounded-tl-full xs:rounded-br-full max-xs:rounded-tl-3xl max-xs:rounded-br-3xl max-xs:text-center max-xs:text-sm max-xs:py-[2.5px] max-xs:px-[3.5px] max-xs:mt-3.5 max-xs:-ml-1 max-xs:top-2 max-xs:left-1">
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
        className="rounded-full relative lg:w-full lg:h-full md:w-[80%] md:h-[65%] max-xs:w-[62%] max-xs:h-[45%]"
      />
      <div className="bg-[#FB8A00] text-white font-bold lg:w-[320px] md:w-[245px] md:h-[22px] xs:w-auto xs:h-auto max-xs:w-auto max-xs:h-auto lg:h-[34px] mt-4 xs:px-16 md:px-0 flex items-center justify-center xs:rounded-tl-full xs:rounded-br-full max-xs:rounded-tl-3xl max-xs:rounded-br-3xl max-xs:text-center max-xs:text-sm max-xs:py-[1.2vh] max-xs:px-[2vh]">
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
        className="rounded-full relative lg:w-[93%] lg:h-[93%] md:w-[80%] md:h-[70%] max-xs:w-[60%] max-xs:h-[50%]"
      />
      <div className="bg-[#FB8A00] text-white font-bold lg:w-[320px] md:w-[245px] md:h-[22px] lg:h-[34px] xs:w-auto xs:h-auto max-xs:min-w-auto max-xs:h-auto xs:mt-3 md:mt-4 xs:px-4 md:px-0 flex items-center justify-center xs:rounded-tl-full xs:rounded-br-full max-xs:rounded-tl-3xl max-xs:rounded-br-3xl max-xs:text-center max-xs:text-sm max-xs:py-[2.5px] max-xs:px-[3.5px] max-xs:mt-3.5 max-xs:-ml-1 max-xs:top-2 max-xs:left-1">
        Herramientas Útiles
      </div>
    </div>
  </div>

  {/* Contenedor de Valores */}
  <div className="flex md:justify-center w-full lg:gap-[56px] md:gap-[26px] xs:gap-[3%] max-xs:gap-[1%] xs:justify-between xs:px-[6%] md:px-0">
    {/* Primera Tarjeta */}
    <div className="bg-[#FB8A00] text-white flex flex-col items-center justify-center lg:w-[275px] lg:h-[219px] md:w-[175px] md:h-[120px] xs:h-auto xs:w-auto xs:p-3 max-xs:p-1 md:p-0 rounded-lg">
      <Image
        src="/iconos/unido-co-creacion.png"
        alt="Co-creación"
        width={80}
          height={80}
          quality={100}
      />
      <h3 className="font-bold xs:mt-4 max-xs:mt-0">Co-creación</h3>
    </div>

    {/* Segunda Tarjeta */}
    <div className="bg-[#FB8A00] text-white flex flex-col items-center justify-center lg:w-[275px] lg:h-[219px] md:w-[175px] md:h-[120px] xs:h-auto xs:w-auto xs:p-3 max-xs:p-1 md:p-0 rounded-lg">
      <Image
        src="/iconos/gestion-del-talento-excelencia.png"
        alt="Excelencia"
        width={80}
        height={80}
        quality={100}
      />
      <h3 className="font-bold xs:mt-4 max-xs:mt-5">Excelencia</h3>
    </div>

    {/* Tercera Tarjeta */}
    <div className="bg-[#FB8A00] text-white flex flex-col items-center justify-center lg:w-[275px] lg:h-[219px] md:w-[175px] md:h-[120px] xs:h-auto xs:w-auto xs:p-3 max-xs:p-1 md:p-0 rounded-lg">
      <Image
        src="/iconos/apreton-de-manos-confianza.png"
        alt="Confianza"
        width={80}
          height={80}
          quality={100}
      />
      <h3 className="font-bold xs:mt-4 max-xs:mt-5">Confianza</h3>
    </div>

    {/* Cuarta Tarjeta */}
    <div className="bg-[#FB8A00] text-white flex flex-col items-center justify-center lg:w-[275px] lg:h-[219px] md:w-[175px] md:h-[120px] xs:h-auto xs:w-auto xs:p-3 max-xs:p-1 md:p-0 rounded-lg">
      <Image
        src="/iconos/digital-innovacion.png"
        alt="Innovación"
        width={80}
          height={80}
          quality={100}
      />
      <h3 className="font-bold xs:mt-4 max-xs:mt-5">Innovación</h3>
    </div>
  </div>
</section>

{/* Section Cards White */}
<section className="bg-[#0853FC] w-full xs:py-12 xs:px-[2%] max-xs:py-0 max-xs:px-[25%] relative flex">
  {/* Contenedor principal */}
  <div className="flex xs:flex-row max-xs:flex-col w-full relative justify-center items-center md:gap-[40px] xs:gap-[1vh] max-xs:gap-[1vh]">
    {/* Primera Card */}
    <div className="bg-white rounded-2xl lg:w-[42vh] lg:h-[39vh] md:w-[32vh] md:h-[28vh] xs:w-[22vh] max-xs:w-full xs:h-[16vh] max-xs:h-auto flex xs:flex-col max-xs:flex-row justify-center items-center p-6">
      <Image
        src="/iconos/clasificacion-100clientes.svg" // Agregar la ruta correcta del icono
        alt="100 Clientes"
        width={162}
        height={162}
        className="lg:mb-6 md:mb-4 lg:w-[20vh] lg:h-[20vh] md:w-[15vh] xs:h-[8vh] xs:w-auto max-xs:w-auto max-xs:h-[6vh] max-xs:mr-2"
      />
      <h3 className="text-[#FB8A00] lg:text-5xl md:text-3xl xs:text-xl font-bold uppercase text-center">
        +100 Clientes
      </h3>
    </div>

    {/* Segunda Card (más ancha) */}
    <div className="bg-white rounded-2xl lg:w-[72vh] lg:h-[39vh] md:w-[45vh] md:h-[28vh] xs:w-auto max-xs:w-full xs:h-[16vh] max-xs:h-auto flex xs:flex-col max-xs:flex-row justify-center items-center p-6">
      <Image
        src="/iconos/maletin-experiencia.svg" // Agregar la ruta correcta del icono
        alt="Experiencia Profesional"
        width={162}
        height={162}
        className="lg:mb-6 md:mb-4 lg:w-[20vh] lg:h-[20vh] md:w-[15vh] xs:h-[8vh] xs:w-auto max-xs:w-auto max-xs:h-[6vh] max-xs:mr-2"
      />
      <h3 className="text-[#FB8A00] lg:text-5xl md:text-3xl xs:text-xl font-bold uppercase text-center">
        Experiencia Profesional
      </h3>
    </div>

    {/* Tercera Card */}
    <div className="bg-white rounded-2xl lg:w-[42vh] lg:h-[39vh] md:w-[32vh] md:h-[28vh] xs:w-[22vh] xs:h-[16vh] max-xs:w-full max-xs:h-auto flex xs:flex-col max-xs:flex-row justify-center items-center relative p-6">
      <Image
        src="/iconos/servicio-al-cliente247.svg" // Agregar la ruta correcta del icono
        alt="Soporte 24/7"
        width={162}
        height={162}
        className="lg:mb-6 md:mb-4 lg:w-[20vh] lg:h-[20vh] md:w-[15vh] xs:h-[8vh] xs:w-auto max-xs:w-auto max-xs:h-[6vh] max-xs:mr-2"
      />
      <h3 className="text-[#FB8A00] lg:text-5xl md:text-3xl xs:text-xl font-bold uppercase text-center">
        Soporte 24/7
      </h3>
    </div>
  </div>
</section>

<section className="bg-[#0853FC] w-full justify-items-center text-center xs:px-[2%] max-xs:px-0">
    {/* Texto Final */}
    <div className="text-center py-[3%]">
    <h2 className="text-white md:text-5xl xs:text-3xl max-xs:text-xl font-extrabold">
      Tendrás un equipo de 7 personas <span className="hidden md:inline"> <br /></span> comprometidas con vos
    </h2>
  </div>
</section>

  <Footer/>
    </aside>
  );
};

export default Contact;

    