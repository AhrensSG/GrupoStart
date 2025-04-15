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
    <div className="bg-[#FFFFFF] shadow-md rounded-lg border border-gray-300 leading-8 lg:h-[530px] lg:w-[307px] md:h-[455px] md:w-[275px] relative container flex flex-col pb-1 justify-center">
      {/* Título del plan */}
      <div className="items-center justify-center text-center pt-[29px] pb-[8px]">
        <span className="text-[18px] font-bold items-center justify-center text-center rounded-sm border rounded-tl-xl rounded-br-xl bg-[#FB8A00] text-white p-2 h-[43px] w-[183px]">
          {title}
        </span>
      </div>

      {/* Lista de características */}
      <ul className="list-none relative lg:pl-[30px] lg:pr-[8px] md:py-[2px] lg:pt-[3vh] flex-grow sm:overflow-y-auto justify-items-center lg:h-[260px] lg:w-[295px] md:pl-[8px] md:pr-[15px] md:w-[255px] md:h-[245px] sm:w-3/4">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center w-full lg:mb-[4.5%] md:mb-2 max-xs:pl-[10%] max-xs:py-[1%] xs:px-[2%]"
          >
            <div className="flex-shrink-0 w-[16px] h-[16px] mr-3">
              <Image
                src="/services/CheckIcon.svg"
                width={16}
                height={16} // Tamaño fijo de 20px x 20px
                alt="checkIcon"
                className="w-full h-full"
              />
            </div>
            <span className="text-left max-xs:text-xs md:text-sm lg:text-base leading-tight">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Precios */}
      <div className="flex justify-center items-center pb-[3px] pt-[2px] relative w-full">
        <div className="text-center flex-col justify-center items-center gap-4 relative">
          <span className="text-black-900 line-through font-extrabold text-center justify-center text-[32px] w-[206px] h-[64px]">
            <s>${price.original.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</s>
          </span>
          <br />
          <span className="font-bold text-[#FB8A00] text-center justify-center text-ligth text-[26px] w-[202px] h-[39px]">
            ahora ${price.discount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Botón de contratación */}
      <div className="flex items-end justify-center text-center">
        <button
          onClick={onButtonClick}
          className="bg-[#0853FC] hover:bg-blue-700 text-white font-light py-[8px] px-2 rounded-medium border rounded-tl-xl rounded-br-xl text-center items-center justify-center text-xl h-[43px] w-[132]"
        >
          Contratar
        </button>
      </div>
    </div>
  );
};

const DesktopCommunityManagerSection = () => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  const handleBuyNow = async (id, name, price) => {
    const data = {
      id,
      name,
      description: "Servicio gestion de redes",
      price,
      items: 1,
      productType: "pack",
    };
    await addProductToCart(data, dispatch);
    if (state.cart?.some((prod) => prod.id === id)) {
      toast.info(`Se actualizó el producto en tu carrito!`);
    } else {
      toast.success(`Añadiste ${name} a tu carrito!`);
    }
    if (!state.user) {
      setShowLogin(true);
      return toast.warning("¡Inicia sesión y continúa!");
    }
    return router.push("/payment");
  };

  return (
    <div
      className="py-8 md:px-[2%] lg:px-[4%] xl:px-[8%] xxl:px-[16%] w-full flex-row relative justify-center"
      style={{
        background:
          "linear-gradient(to bottom, #0853FC, #0853FC, #FFFFFF, #FFFFFF)",
      }}
    >
      {showLogin === true && <Modal setShowLogin={setShowLogin} />}
      <div className="items-center justify-center text-center max-xs:py-[2px] sm:py-[36px] relative max-xs:px-[20px] md:px-[60px] sm:px-[40px] w-full">
        <h2 className="max-xs:text-lg sm:text-lg md:text-xl lg:text-3xl font-bold text-center items-center justify-center mb-8 rounded-full rounded-tr-xl rounded-bl-xl bg-[#FB8A00] text-white py-3 lg:max-w-[20%] sm:max-w-[30%] md:max-w-[70%] mx-auto max-xs:w-[40%]">
          Elegí tu plan
        </h2>
      </div>
       {/* Carrusel en pantallas pequeñas */}
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
      paddingTop: 12vh; /* Más abajo */
      top: 12vh;
      bottom: -60px;
      position: relative;
    }
  `}</style>
    <SwiperSlide className=" sm:w-full p-4 flex-shrink-0">
      <div className="rounded-lg shadow-lg bg-white border border-gray-300">
        <PlanCard
          title="START"
          features={[
            "2 Redes sociales Facebook + Instagram",
            "3 Publicaciones semanales / 12 Mensuales",
            "2 videos + 2 diseños de Stories",
            "Diseño creativo",
            "Puesta en marcha de campañas publicitarias Básicas"
          ]}
          price={{ original: 380000, discount: 329900 }}
          onButtonClick={() => {
            handleBuyNow(2, "Plan START", 329900);
          }}
          listClassName="px-[15%] py-4 text-center flex"
        />
      </div>
    </SwiperSlide>
    <SwiperSlide className="sm:w-full p-4 flex-shrink-0">
      <div className="rounded-lg shadow-lg bg-white border border-gray-200">
        <PlanCard
          title="Social Master"
          features={[
            "3 Redes sociales Facebook + Instagram + Tiktok",
            "5 Publicaciones + stories semanales / 20 Mensuales",
            "4 videos + 4 diseños de Stories",
            "Diseño creativo",
            "Puesta en marcha de campañas publicitarias Medias",
          ]}
          price={{ original: 550000, discount: 499900 }}
          onButtonClick={() => {
            handleBuyNow(3, "Plan Social Master", 499900);
          }}
          listClassName="px-[5%] py-4"
        />
      </div>
    </SwiperSlide>
    <SwiperSlide className="sm:w-full p-4 flex-shrink-0">
      <div className="rounded-lg shadow-lg bg-white border border-yellow-400">
        <PlanCard
          title="Social Pro"
          features={[
            "4 Redes sociales Facebook + Instagram + Tiktok + Threads",
            "8 Publicaciones + stories semanales / 32 Mensuales",
            "6 videos + 6 diseños de Stories",
            "Diseño Creativo",
            "Puesta en marcha de campañas publicitarias Pro",
          ]}
          price={{ original: 700000, discount: 649900 }}
          onButtonClick={() => {
            handleBuyNow(4, "Plan Social Pro", 649900);
          }}
          listClassName="px-[5%] py-4"
        />
      </div>
    </SwiperSlide>
  </Swiper>
  {/* Mensaje debajo del carrusel */}
  <p className="mt-4 text-sm font-bold text-gray-600">
    Deslizá para visualizar un plan
  </p>
</div>

      {/* Grid en pantallas grandes */}
      <div className="hidden md:grid lg:grid xl:grid grid-cols-3 gap-4 justify-center items-center">
        <PlanCard
          title="START"
          features={[
            "2 Redes sociales Facebook + Instagram",
            "3 Publicaciones semanales / 12 Mensuales",
            "2 videos + 2 diseños de Stories",
            "Diseño creativo",
            "Puesta en marcha de campañas publicitarias Básicas",
          ]}
          price={{ original: 380000, discount: 329900 }}
          onButtonClick={() => handleBuyNow(2, "Plan START", 329900)}
        />
        <PlanCard
          title="Social Master"
          features={[
            "3 Redes sociales Facebook + Instagram + Tiktok",
            "5 Publicaciones + stories semanales / 20 Mensuales",
            "4 videos + 4 diseños de Stories",
            "Diseño creativo",
            "Puesta en marcha de campañas publicitarias Medias",
          ]}
          price={{ original: 550000, discount: 499900 }}
          onButtonClick={() => handleBuyNow(3, "Plan Social Master", 499900)}
        />
        <PlanCard
          title="Social Pro"
          features={[
            "4 Redes sociales Facebook + Instagram + Tiktok + Threads",
            "8 Publicaciones + stories semanales / 32 Mensuales",
            "6 videos + 6 diseños de Stories",
            "Diseño Creativo",
            "Puesta en marcha de campañas publicitarias Pro",
          ]}
          price={{ original: 700000, discount: 649900 }}
          onButtonClick={() => handleBuyNow(4, "Plan Social Pro", 649900)}
        />
      </div>
    </div>
  );
};

export default DesktopCommunityManagerSection;