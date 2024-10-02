import React from "react";
import ServiceCard from "./auxiliarComponents/ServiceCard";

const SecondSection = () => {
  return (
    <section id="services" className="w-full bg-[#0853FC] px-6 py-8 sm:px-6 sm:py-12 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 lg:gap-16">
        <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-5xl text-white font-bold text-center mb-8">
          CONOCÉ NUESTROS SERVICIOS
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-32 md:gap-32 lg:gap-12 xl:gap-16">
          <ServiceCard
            img={"/services/Jirafe3.svg"}
            title={"Gestión de redes"}
            description={
              "Enfócate en los aspectos más importantes de tu negocio como ser el contacto con proveedores, coordinación de tu equipo y atención al público."
            }
            secondDescription={
              "Tus redes estarán activas en todo momento y en manos de un equipo especializado. Llega a más y nuevos clientes con contenido estratégico, imágenes y videos profesionales."
            }
            link={"/services/DesktopCommunityManager"}
            firstBullet={"Planificación de contenidos"}
            secondtBullet={"Campañas publicitarias"}
            thirdtBullet={"Soporte siempre con vos"}
          />
          <ServiceCard
            img={"/services/Jirafe2.svg"}
            title={"Media"}
            description={
              "Permití que nuestro equipo creativo genere las piezas comunicativas de tu negocio. Lográ presentarte profesionalmente y atrévete a nuevas experiencias con nuestro acompañamiento y asesoramiento continuo en el proceso."
            }
            link={"/services/DesktopWebDevelopment"}
            firstBullet={"Creamos tu logo"}
            secondtBullet={"Imágenes profesionales"}
            thirdtBullet={"Edición de videos"}
            fourthtBullet={"Soporte siempre con vos"}
          />
          <ServiceCard
            img={"/services/Jirafe12.svg"}
            title={"Herramientas Útiles"}
            description={
              "Preséntate como un verdadero profesional con nuestras tarjetas personales con QR, Incluye:"
            }
            secondDescription={
              "El QR direcciona a los interesados en tu producto/servicio a una web donde tendrás una presentación ampliada además de botones con acceso rápido a un chat con vos, tu ubicación en Google Maps y todas tus redes sociales."
            }
            link={"/services/DesktopBranding"}
            firstBullet={"Diseño personalizado"}
            secondtBullet={"Landing page completa"}
            thirdtBullet={"Envíos a tu domicilio"}
          />
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
