"use client";

import { Context } from "@/app/context/GlobalContext";
import { addProductToCart } from "@/app/context/actions";
import Modal from "@/components/login/Modal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


const PlanCard = ({ title, features, price, onButtonClick }) => {
  return (
    <div className="bg-[#FFFFFF] shadow-md rounded-lg border border-gray-300 leading-8 xs:h-[556px] w-[307px] md:h-[600px] xs:w-auto sm:flex-grow xs:flex-grow  relative container flex flex-col pb-1">
      <div className="items-center justify-center text-center pt-5 pb-[12px]">
        <span className="text-[24px] font-bold items-center justify-center text-center rounded-medium border rounded-tl-lg rounded-br-lg bg-[#FB8A00] text-white py-2 px-6">
          {title}
        </span>
      </div>
      <ul className="list-none pl-[33px] pr-[12px] lg:pt-[8px] h-[210px] w-[300px] flex-grow justify-center relative md:pt-3 md:pb-0 md:h-auto sm:px-1 sm:pt-10 xs:h-auto xs:w-auto xs:px-1 xs:pt-10">
        {" "}
        {/* Changed list style for spacing */}
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center text-center justify-center lg:mb-3 md:mb-0 sm:mb-1 xs:mb-1 sm:text-center xs:text-center sm:relative xs:relative "
          >
            {feature}
            {index === 1 && <span className="feature-spaced" />}
          </li>
        ))}
      </ul>
      <br />

      {/* Precios */}
      <div className="flex justify-center items-center xs:pt-[10px] md:pt-0 relative w-full">
        <div className="text-center flex-col justify-center items-center gap-6 relative">
          <span className="text-orange-500 font-extrabold text-ligth text-[26px] w-[202px] xs:h-[39px] md:h-auto">
            ${price.original}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-center text-center pb-1">
        <button
          onClick={onButtonClick}
          className="bg-[#0853FC] hover:bg-blue-700 text-white font-light py-[8px] px-2 rounded-medium border rounded-tl-xl rounded-br-xl text-center items-center justify-center text-xl h-[43px] w-[132]"
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

const DesktopBrandingSection = () => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  const handleBuyNow = async (id, name, price) => {
    if (!state.user) {
      setShowLogin(true);
      return toast.info("¡Inicia sesión y continúa!");
    }
    const data = {
      id,
      name,
      description: "Servicio Herramientas Útiles",
      price,
      items: 1,
      productType: "pack-envio",
    };
    if (state.cart?.some((prod) => prod.id === id)) {
      toast.info(`Se actualizó el producto en tu carrito!`);
    } else {
      toast.success(`Añadiste ${name} a tu carrito!`);
    }
    await addProductToCart(data, dispatch);
    return router.push("/payment");
  };

  return (
    <div
      className="py-8 md:px-[4%] w-full flex-row xs:px-0 sm:px-0"
      style={{ background: "#0853FC" }}
    >
      {showLogin === true && <Modal setShowLogin={setShowLogin} />}
      <div className="items-center justify-center text-center py-12">
        <span className="text-3xl font-bold text-center items-center justify-center mb-8 rounded-medium rounded-tl-xl rounded-br-xl bg-[#FFFFFF] text-[#FB8A00] py-3 px-[100px]">
          Packs de tarjetas
        </span>
      </div>

      <div className="block sm:block md:hidden justify-center text-center">
      <Swiper
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto" // Auto para ajuste flexible, pero se puede poner un valor fijo si es necesario
          spaceBetween={15} // Espaciado entre tarjetas
          className="w-full max-w-md overflow-hidden relative pb-12"
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
            marginTop: 12vh;
            paddingTop: 12vh; /* Más abajo */
            top: 12vh;
            bottom: -100px;
            position: relative;
          }
        `}</style>
        <SwiperSlide className="w-[90%] sm:w-[85%] p-4 flex-shrink-0">
          <div className="rounded-lg shadow-lg bg-white border border-gray-300">
            <PlanCard
              title="Pack 1"
              features={[
                "Diseño personalizado: foto, colores, letras y logo",
                "Landing page con descripción de tu negocio, botones de acceso directo a Whatsapp, Google maps y todas tus redes sociales",
                "Posicionamiento SEO en internet",
                "50 tarjetas full color doble face",
                "Suscripción de $500 de mantenimiento mensual a tu landing page",
              ]}
              price={{ original: 16900 }}
              onButtonClick={() => handleBuyNow(8, "Plan Pack 1", 16900)}
              listClassName="px-[5%] py-4"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-[90%] sm:w-[85%] p-4 flex-shrink-0">
          <div className="rounded-lg shadow-lg bg-white border border-gray-200">
            <PlanCard
              title="Pack 2"
              className="pb-2"
              features={[
                "Diseño personalizado: foto, colores, letras y logo",
                "Landing page con descripción de tu negocio, botones de acceso directo a Whatsapp, Google maps y todas tus redes sociales",
                "Posicionamiento SEO en internet",
                "100 tarjetas full color doble face",
                "Suscripción de $5.000 de mantenimiento anual a tu landing page",
              ]}
              price={{ original: 31900 }}
              onButtonClick={() => handleBuyNow(9, "Plan Pack 2", 31900)}
              listClassName="px-[5%] py-4"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-[90%] sm:w-full p-4 flex-shrink-0">
          <div className="rounded-lg shadow-lg bg-white border border-yellow-400">
            <PlanCard
               title="Pack 3"
               features={[
                 "Diseño personalizado: foto, colores, letras y logo",
                 "Landing page con descripción de tu negocio, botones de acceso directo a Whatsapp, Google maps y todas tus redes sociales",
                 "Posicionamiento SEO en internet",
                 "200 tarjetas full color doble face",
                 "Pago vitalicio no tiene costo de mantenimiento",
               ]}
               style={{ marginBottom: "30px" }}
               price={{ original: 58900 }}
               onButtonClick={() => handleBuyNow(10, "Plan Pack 3", 58900)}
              listClassName="px-[5%] py-4"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      {/* Mensaje debajo del carrusel */}
      <p className="mt-4 text-sm font-bold text-white">
        Deslizá para visualizar un plan
      </p>
    </div>

      <div className="hidden md:grid lg:grid xl:grid grid-cols-3 md:gap-4 lg:gap-6 xl:gap-8 justify-center items-center">
        <PlanCard
          title="Pack 1"
          features={[
            "Diseño personalizado: foto, colores, letras y logo",
            "Landing page con descripción de tu negocio, botones de acceso directo a Whatsapp, Google maps y todas tus redes sociales",
            "Posicionamiento SEO en internet",
            "50 tarjetas full color doble face",
            "Suscripción de $500 de mantenimiento mensual a tu landing page",
          ]}
          price={{ original: 16900 }}
          onButtonClick={() => handleBuyNow(8, "Plan Pack 1", 16900)}
        />
        <PlanCard
          title="Pack 2"
          className="pb-2"
          features={[
            "Diseño personalizado: foto, colores, letras y logo",
            "Landing page con descripción de tu negocio, botones de acceso directo a Whatsapp, Google maps y todas tus redes sociales",
            "Posicionamiento SEO en internet",
            "100 tarjetas full color doble face",
            "Suscripción de $5.000 de mantenimiento anual a tu landing page",
          ]}
          price={{ original: 31900 }}
          onButtonClick={() => handleBuyNow(9, "Plan Pack 2", 31900)}
        />
        <PlanCard
          title="Pack 3"
          features={[
            "Diseño personalizado: foto, colores, letras y logo",
            "Landing page con descripción de tu negocio, botones de acceso directo a Whatsapp, Google maps y todas tus redes sociales",
            "Posicionamiento SEO en internet",
            "200 tarjetas full color doble face",
            "Pago vitalicio no tiene costo de mantenimiento",
          ]}
          style={{ marginBottom: "30px" }}
          price={{ original: 58900 }}
          onButtonClick={() => handleBuyNow(10, "Plan Pack 3", 58900)}
        />
      </div>
    </div>
  );
};

export default DesktopBrandingSection;
