import React from "react";
import ServiceCard from "./auxiliarComponents/ServiceCard";

const SecondSection = () => {
  return (
    <section id="services" className="w-full h-full bg-[#0853FC] p-[2%]">
      <div className="w-full h-full flex flex-col items-center gap-[2%] py-[2%]">
        <h2 className="mt-[3%] text-2xl sm:text-2xl md:text-[4vw] text-white font-bold pb-[2%]">
          CONOCÉ NUESTROS SERVICIOS
        </h2>
        <div className="w-full h-full flex flex-wrap justify-center items-center gap-[5%]">
          <ServiceCard
            img={"/services/Jirafe3.svg"}
            title={"Gestión de redes"}
            description={
              "Enfócate en los aspectos operativos más importantes de tu negocio, la logística, contacto con proveedores, coordinación de tu equipo, atención al público, con la tranquilidad de que tus redes están activas y en manos de un equipo especializado. Nunca vas a perder el timón, vamos a estar siempre en contacto con vos"
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
              "Permití que nuestro equipo creativo genere las piezas comunicativas de tu negocio. Logra presentarte profesionalmente y atrévete a nuevas experiencias con nuestro acompañamiento y asesoramiento continuo en el proceso."
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
              "Preséntate como un verdadero profesional con nuestras tarjetas personales con QR. Incluye: el QR direcciona a los interesados en tu producto/servicio a una web donde tendrás una presentación ampliada además de botones con acceso rápido a un chat contigo, tu ubicación en Google Maps y todas tus redes sociales."
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
