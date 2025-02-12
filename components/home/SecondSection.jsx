import React from "react";
import ServiceCard from "./auxiliarComponents/ServiceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SecondSection = () => {
  return (
    <section id="services" className="px-4 pt-6 w-full bg-[#0853FC] xs:py-8 sm:px-6 sm:py-12 md:px-[5.5%] max-xs:relative md:relative">
      <div className="xs:max-w-7xl mx-auto flex flex-col items-center md:gap-12 lg:gap-16 max-xs:w-full">
        <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-5xl text-white font-bold text-center mb-8">
          CONOCÉ NUESTROS SERVICIOS
        </h2>

        <div className="block sm:block md:hidden justify-center text-center">
  <Swiper
    grabCursor={true}
    centeredSlides={true}
    slidesPerView="auto" // Auto para ajuste flexible, pero se puede poner un valor fijo si es necesario
    spaceBetween={15} // Espaciado entre tarjetas
    className="w-full xs:max-w-md max-xs:max-w-sm overflow-hidden relative max-xs:px-[1%] max-xs:mx-[1%]"
    pagination={{
      clickable: true,
      dynamicBullets: true,
    }}
    modules={[Pagination]}
  >
    {/* Estilos globales para personalizar los puntos */}
  <style jsx global>{`
    .swiper-pagination-bullet {
      background-color: #ffa500; /* Naranja */
      opacity: 0.5; /* Transparencia */
      width: 12px; /* Tamaño del punto */
      height: 12px;
      paddingTop: 10vh;
    }
    .swiper-pagination-bullet-active {
      background-color: #ff8c00; /* Naranja más oscuro para el activo */
      opacity: 1; /* Sin transparencia */
    }
    .swiper-pagination {
      paddingTop: 12vh; /* Más abajo */
      top: 12vh;
      bottom: -60px;
      position: relative;
    }
  `}</style>
    <SwiperSlide className="md:w-[90%] sm:w-auto max-xs:w-[5vw] p-4 flex-shrink-0">
      <div className="rounded-lg shadow-lg">
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
            comingSoon={false}
          />
      </div>
    </SwiperSlide>
    <SwiperSlide className="md:w-[90%] sm:w-[85%] max-xs:w-[5vw] p-4 flex-shrink-0">
      <div className="rounded-lg shadow-lg ">
      <ServiceCard
            img={"/services/Jirafe2.svg"}
            title={"Media"}
            description={
              "Permití que nuestro equipo creativo genere las piezas comunicativas de tu negocio. Lográ presentarte profesionalmente y atrévete a nuevas experiencias con nuestro acompañamiento y asesoramiento continuo en el proceso."
            }
            link={"/services/DesktopMedia"}
            firstBullet={"Creamos tu logo"}
            secondtBullet={"Imágenes profesionales"}
            thirdtBullet={"Edición de videos"}
            fourthtBullet={"Soporte siempre con vos"}
            comingSoon={false}
          />
      </div>
    </SwiperSlide>
    <SwiperSlide className="md:w-[90%] sm:w-full max-xs:w-[5vw] p-4 flex-shrink-0">
      <div className="rounded-lg shadow-lg">
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
            comingSoon={true}
          />
      </div>
    </SwiperSlide>
  </Swiper>
  {/* Mensaje debajo del carrusel */}
  <p className="mt-4 text-md font-bold text-white">
    Deslizá para visualizar los servicios
  </p>
</div>

        <div className="w-full grid-cols-3 md:gap-10 lg:gap-12 xl:gap-16 hidden md:grid lg:grid xl:grid justify-center items-center">
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
            comingSoon={false}
          />
          <ServiceCard
            img={"/services/Jirafe2.svg"}
            title={"Media"}
            description={
              "Permití que nuestro equipo creativo genere las piezas comunicativas de tu negocio. Lográ presentarte profesionalmente y atrévete a nuevas experiencias con nuestro acompañamiento y asesoramiento continuo en el proceso."
            }
            link={"/services/DesktopMedia"}
            firstBullet={"Creamos tu logo"}
            secondtBullet={"Imágenes profesionales"}
            thirdtBullet={"Edición de videos"}
            fourthtBullet={"Soporte siempre con vos"}
            comingSoon={false}
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
            comingSoon={true}
          />
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
