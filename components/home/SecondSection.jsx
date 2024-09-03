import React from "react";
import ServiceCard from "./auxiliarComponents/ServiceCard";

const SecondSection = () => {
  return (
    <section id="services" className="w-full h-full bg-[#0853FC] p-4">
      <div className="w-full h-full flex flex-col items-center gap-6 py-4 pb-8">
        <h2 className=" mt-[43px] text-2xl sm:text-2xl md:text-5xl text-white font-bold pb-[17px]">CONOCÉ NUESTROS SERVICIOS </h2>
        <div className="w-full h-full flex flex-row flex-wrap justify-center items-center gap-[77px]">
          {/* <ServiceCard
            img={"/services/Jirafe1.svg"}
            title={"Analizamos tu negocio"}
            description={
              "La era de las redes sociales fue un verdadero Tsunami para el marketing tradicional ¿Estás preparado para surfear la ola? No te quedes debajo de ella, puede ser peligroso, además surfearla es mucho más divertido"
            }
            link={"/services/DesktopBusinessAnalysis"}
          /> */}
          <ServiceCard
            img={"/services/Jirafe3.svg"}
            title={"Gestión de redes"}
            description={
              "Enfócate en los aspectos operativos más importantes de tu negocio, la logística, contacto con proveedores, coordinación de tu equipo, atención al público, con la tranquilidad de que tus redes están activas y en manos de un equipo especializado. Nunca vas a perder el timón, vamos a estar siempre en contacto con vos"
            }
            link={"/services/DesktopCommunityManager"}
            firstBullet={"Planificación de contenidos"}
            secondtBullet={"Publicaciones frecuentes en tus redes sociales"}
            thirdtBullet={"Descripciones seductoras"}
            fourthtBullet={"Campañas publicitarias"}
            fifthtBullet={"Soporte siempre en contacto con vos"}
          />
          <ServiceCard
            img={"/services/Jirafe2.svg"}
            title={"Media"}
            description={
                "Permití que nuestros equipo creativo genere las piezas comunicativas de tu negocio. Logra presentarte como profecionalmente y atrevete a nuevas experiencias con nuetro acompañamiento y asesoramiento continuo en el proceso."
            }
            link={"/services/DesktopWebDevelopment"}
            firstBullet={"Identidad de marca (Creamos tu logo)"}
            secondtBullet={"Creacion de Flyers (Imagenes para redes y mas)"}
            thirdtBullet={"Redacción de Guión para tus spots y videos"}
            fourthtBullet={"Edición de Videos (animaciones, reels y más)"}
          />

          <ServiceCard
            img={"/services/Jirafe12.svg"}
            title={"Herramientas Utiles"}
            description={
              "Preséntate como un verdadero profesional con nuestras tarjetas personales con QR, Incluye: El Qr direcciona a los interesados en tu producto/servicio a una web donde tendrás una presentación ampliada además de botones con acceso rápido a un chat con vos, tu ubicación en Google maps y todas tus redes sociales"
            }
            link={"/services/DesktopBranding"}
            firstBullet={"Diseño personalizado"}
            secondtBullet={
              "Landing page completa"
            }
            thirdtBullet={"Envios a tu domicilio"}
          />

          {/* <ServiceCard
            img={"/services/Jirafe1.svg"}
            title={"Marketing"}
            description={
              "Enfócate en los aspectos operativos más importantes de tu negocio, la logística, contacto con proveedores, coordinación de tu equipo, atención al público, con la tranquilidad de que tus redes están activas y en manos de un equipo especializado. Nunca vas a perder el timón, vamos a estar siempre en contacto con vos"
            }
            link={"/services/DesktopBranding"}
            firstBullet={"Planificación de contenidos"}
            secondtBullet={"Publicaciones frecuentes en tus redes sociales"}
            thirdtBullet={"Descripciones seductoras"}
            fourthtBullet={"Campañas publicitarias"}
            fifthtBullet={"Soporte siempre en contacto con vos"}
          />
          <ServiceCard
            img={"/services/Jirafe2.svg"}
            title={"Identidad de Marca"}
            description={
              "Enfócate en los aspectos operativos más importantes de tu negocio, la logística, contacto con proveedores, coordinación de tu equipo, atención al público, con la tranquilidad de que tus redes están activas y en manos de un equipo especializado. Nunca vas a perder el timón, vamos a estar siempre en contacto con vos"
            }
            link={"/services/BrandIdentity"}
            firstBullet={"Planificación de contenidos"}
            secondtBullet={"Publicaciones frecuentes en tus redes sociales"}
            thirdtBullet={"Descripciones seductoras"}
            fourthtBullet={"Campañas publicitarias"}
            fifthtBullet={"Soporte siempre en contacto con vos"}
          />
          <ServiceCard
            img={"/services/Jirafe3.svg"}
            title={"Edicion Audiovisual"}
            description={
              "Enfócate en los aspectos operativos más importantes de tu negocio, la logística, contacto con proveedores, coordinación de tu equipo, atención al público, con la tranquilidad de que tus redes están activas y en manos de un equipo especializado. Nunca vas a perder el timón, vamos a estar siempre en contacto con vos"
            }
            link={"/services/AudiovisualEdition"}
            firstBullet={"Planificación de contenidos"}
            secondtBullet={"Publicaciones frecuentes en tus redes sociales"}
            thirdtBullet={"Descripciones seductoras"}
            fourthtBullet={"Campañas publicitarias"}
            fifthtBullet={"Soporte siempre en contacto con vos"}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
