
import Image from "next/image";
import React from "react";
import Carousel from "@/components/carrousel/Carousel";
import Link from "next/link";
import Chat from "@/components/chat/Chat";

const Contact = () => {
  return (
    <aside className="w-full relative flex flex-col justify-center items-center bg-white">
        {/* Chat */}
        <Chat />

{/* Sección Principal */}
<section className="w-full bg-[#0853FC] text-white py-10 flex flex-col items-center justify-center">
  <div className="container mx-auto flex flex-col lg:flex-row gap-16 px-8 items-center">
    <div className="lg:w-1/2">
      <h1 className="text-5xl font-extrabold text-orange-500">
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
    <div className="lg:w-1/2">
      <Image
        src="/city-image.svg"
        alt="Ciudad de Formosa"
        width={664}
        height={439}
        className="rounded-lg"
      />
    </div>
  </div>
</section>

{/* Section 2 Ola y Carrusel*/}
<section className="relative bg-grey-700 flex flex-col justify-center items-center w-full">
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
        <div className="relative justify-center items-center object-center flex flex-col z-2">
          <Image
            src={"/Jirafe1.svg"}
            width={328}
            height={328}
            quality={100}
            className="w-full max-w-xs md:max-w-md lg:max-w-lg"
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
            Algunos de nuestros clientes<br />
            que confían en nosotros
          </span>
        </div>

         {/* Carousel section */}
        <div className="flex justify-center w-full z-20 p-4">
        <Carousel />
        </div>
</section>

{/* Section Formulario de Contacto */}
<section className="bg-[#FFFFFF] w-full py-16 flex justify-center items-center relative z-10">
  <div className="container mx-auto flex flex-row justify-between items-center gap-16 px-8">
    
    {/* Columna Izquierda - Título y Descripción */}
    <div className="w-1/2 flex flex-col items-start pl-[60px]">
      <h1 className="text-orange-500 text-6xl font-extrabold mb-6">
        ¡Comencemos a <br /> trabajar juntos!
      </h1>
      <p className="text-black text-3xl font-light">
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
    <h1 className="text-[#0853FC] text-5xl font-extrabold text-center w-[800px] mb-8">
      Puedes visitarnos en:
    </h1>
    {/*Subtitulo con la direccion*/}
    <h2 className="text-black text-3xl font-light text-center w-[950px] mb-[-310px]">
      Calle Hipólito Yrigoyen 342 entre Dean Funes y Moreno
      </h2>
    {/* Contenedor de la imagen */}
    <div className="w-[800px] h-auto relative top-[-220px]">
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
        style={{ borderRadius: "20px", bottom: -550, zIndex: 5}}
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
<section className="bg-[#0853FC] w-full py-8 relative">
  {/* Título principal */}
  <div className="text-center mb-8">
    <h1 className="text-white text-5xl font-extrabold">
      Nuestros Servicios y Valores
    </h1>
  </div>

  {/* Contenedor de Servicios */}
  <div className="flex justify-center gap-[143px] mb-16">
    {/* Primer Servicio */}
    <div className="flex flex-col items-center">
      <Image
        src="/services/Jirafe3.svg"  // Ruta de la imagen correcta
        alt="Gestión de Redes"
        width={176}
        height={180}
        className="rounded-full"
      />
      <div className="bg-orange-500 text-white font-bold w-[300px] h-[34px] mt-4 flex items-center justify-center rounded-tl-full rounded-br-full">
        Gestión de Redes
      </div>
    </div>

    {/* Segundo Servicio */}
    <div className="flex flex-col items-center">
      <Image
        src="/services/Jirafe2.svg"  // Ruta de la imagen correcta
        alt="Media"
        width={176}
        height={180}
        className="rounded-full"
      />
      <div className="bg-orange-500 text-white font-bold w-[300px] h-[34px] mt-4 flex items-center justify-center rounded-tl-full rounded-br-full">
        Media
      </div>
    </div>

    {/* Tercer Servicio */}
    <div className="flex flex-col items-center">
      <Image
        src="/services/Jirafe12.svg"  // Ruta de la imagen correcta
        alt="Herramientas Útiles"
        width={176}
        height={180}
        className="rounded-full"
      />
      <div className="bg-orange-500 text-white font-bold w-[300px] h-[34px] mt-4 flex items-center justify-center rounded-tl-full rounded-br-full">
        Herramientas Útiles
      </div>
    </div>
  </div>

  {/* Contenedor de Valores */}
  <div className="flex justify-center gap-[53px]">
    {/* Primera Tarjeta */}
    <div className="bg-orange-500 text-white flex flex-col items-center justify-center w-[270px] h-[219px] rounded-lg">
      <Image
        src="/icon-co-creacion.svg"
        alt="Co-creación"
        width={50}
        height={50}
      />
      <h3 className="font-bold mt-4">Co-creación</h3>
    </div>

    {/* Segunda Tarjeta */}
    <div className="bg-orange-500 text-white flex flex-col items-center justify-center w-[270px] h-[219px] rounded-lg">
      <Image
        src="/icon-excelencia.svg"
        alt="Excelencia"
        width={50}
        height={50}
      />
      <h3 className="font-bold mt-4">Excelencia</h3>
    </div>

    {/* Tercera Tarjeta */}
    <div className="bg-orange-500 text-white flex flex-col items-center justify-center w-[270px] h-[219px] rounded-lg">
      <Image
        src="/icon-confianza.svg"
        alt="Confianza"
        width={50}
        height={50}
      />
      <h3 className="font-bold mt-4">Confianza</h3>
    </div>

    {/* Cuarta Tarjeta */}
    <div className="bg-orange-500 text-white flex flex-col items-center justify-center w-[270px] h-[219px] rounded-lg">
      <Image
        src="/icon-innovacion.svg"
        alt="Innovación"
        width={50}
        height={50}
      />
      <h3 className="font-bold mt-4">Innovación</h3>
    </div>
  </div>
</section>

{/* Section Cards White */}
<section className="bg-[#0853FC] w-full py-12 px-4">
  {/* Contenedor principal */}
  <div className="flex justify-center items-center gap-[40px]">
    {/* Primera Card */}
    <div className="bg-white rounded-2xl w-[350px] h-[250px] flex flex-col justify-center items-center p-6">
      <Image
        src="/icon1.svg" // Agregar la ruta correcta del icono
        alt="100 Clientes"
        width={100}
        height={100}
        className="mb-6"
      />
      <h3 className="text-orange-500 text-5xl font-bold uppercase text-center">
        +100 Clientes
      </h3>
    </div>

    {/* Segunda Card (más ancha) */}
    <div className="bg-white rounded-2xl w-[400px] h-[250px] flex flex-col justify-center items-center p-6">
      <Image
        src="/icon2.svg" // Agregar la ruta correcta del icono
        alt="Experiencia Profesional"
        width={100}
        height={100}
        className="mb-6"
      />
      <h3 className="text-orange-500 text-5xl font-bold uppercase text-center">
        Experiencia Profesional
      </h3>
    </div>

    {/* Tercera Card */}
    <div className="bg-white rounded-2xl w-[350px] h-[250px] flex flex-col justify-center items-center p-6">
      <Image
        src="/icon3.svg" // Agregar la ruta correcta del icono
        alt="Soporte 24/7"
        width={100}
        height={100}
        className="mb-6"
      />
      <h3 className="text-orange-500 text-5xl font-bold uppercase text-center">
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

    </aside>
  );
};

export default Contact;

    