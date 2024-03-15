import React from "react";
import ServiceCard from "./auxiliarComponents/ServiceCard";

const SecondSection = () => {
  return (
    <section id="services" className="w-full h-full bg-[#0853FC] p-4">
      <div className="w-full h-full flex flex-col items-center gap-6 py-4 pb-8">
        <h2 className="text-6xl text-white">Nuestros servicios </h2>
        <div className="w-full h-full flex flex-row flex-wrap justify-center items-center gap-8">
          <ServiceCard
            img={"/services/Jirafe1.svg"}
            title={"Analizamos tu negocio"}
            description={
              "La era de las redes sociales fue un verdadero Tsunami para el marketing tradicional ¿Estás preparado para surfear la ola? No te quedes debajo de ella, puede ser peligroso, además surfearla es mucho más divertido"
            }
            link={"/#"}
          />

          <ServiceCard
            img={"/services/Jirafe2.svg"}
            title={"Diseño grafico"}
            description={
              " Los resultados son importantes, puedes alcanzarlos con estrategias de venta directa, pero si quieres tener un negocio sostenible en el tiempo debes consolidar una marca. Permití que nuestro equipo creativo genere las bases de un negocio próspero generando tu manual de marca. "
            }
            link={"/#"}
            firstBullet={"Perfeccionamiento de tu identidad de marca"}
            secondtBullet={
              "Manual de identidad de marca: Simple, Estándar, Completo)"
            }
            thirdtBullet={"Tarjetería"}
            fourthtBullet={"Flyers"}
          />

          <ServiceCard
            img={"/services/Jirafe3.svg"}
            title={"Gestión de redes"}
            description={
              "Enfócate en los aspectos operativos más importantes de tu negocio, la logística, contacto con proveedores, coordinación de tu equipo, atención al público, con la tranquilidad de que tus redes están activas y en manos de un equipo especializado. Nunca vas a perder el timón, vamos a estar siempre en contacto con vos"
            }
            link={"/#"}
            firstBullet={"Planificación de contenidos"}
            secondtBullet={"Publicaciones frecuentes en tus redes sociales"}
            thirdtBullet={"Descripciones seductoras"}
            fourthtBullet={"Campañas publicitarias"}
            fifthtBullet={"Soporte siempre en contacto con vos"}
          />
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
