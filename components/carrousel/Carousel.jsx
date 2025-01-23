"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";

const images = [
    { src: "/services/clientsCarousel/logo16.png", alt: "Logo 1", link: "/empresa/logo1" },
    { src: "/services/clientsCarousel/logo13.png", alt: "Logo 2", link: "/empresa/logo2" },
    { src: "/services/clientsCarousel/logo12.png", alt: "Logo 3", link: "/empresa/logo3" },
    { src: "/services/clientsCarousel/logo14.png", alt: "Logo 4", link: "/empresa/logo4" },
    { src: "/services/clientsCarousel/logo15.png", alt: "Logo 5", link: "/empresa/logo5" },
    { src: "/services/clientsCarousel/logo11fs.png", alt: "Logo 6", link: "/empresa/logo6" },
    { src: "/services/clientsCarousel/logo1.png", alt: "Logo 7", link: "/empresa/logo7" },
    { src: "/services/clientsCarousel/logo2.png", alt: "Logo 8", link: "/empresa/logo8" },
    { src: "/services/clientsCarousel/logo3.png", alt: "Logo 9", link: "/empresa/logo9" },
    { src: "/services/clientsCarousel/logo4.png", alt: "Logo 10", link: "/empresa/logo10" },
];

const Carousel = () => {
    const [visibleItemsCount, setVisibleItemsCount] = useState(4); // Predeterminado para xs y sm

    useEffect(() => {
        const updateVisibleItems = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 480) setVisibleItemsCount(3); // Para pantallas muy pequeñas (max-xs)
            else if (screenWidth < 640) setVisibleItemsCount(4); // Para pantallas xs
            else if (screenWidth < 1024) setVisibleItemsCount(4); // Para pantallas md
            else setVisibleItemsCount(5); // Para pantallas lg y superiores
        };
        updateVisibleItems();
        window.addEventListener("resize", updateVisibleItems);
        return () => window.removeEventListener("resize", updateVisibleItems);
    }, []);

    // Controladores de los botones de navegación
    const [startIndex, setStartIndex] = useState(0);

    const goPrevious = () => {
        setStartIndex((prevIndex) =>
            prevIndex === 0 ? images.length - visibleItemsCount : prevIndex - 1
        );
    };

    const goNext = () => {
        setStartIndex((prevIndex) =>
            prevIndex === images.length - visibleItemsCount ? 0 : prevIndex + 1
        );
    };

    const itemsToShow = images.slice(startIndex, startIndex + visibleItemsCount);

    return (
        <div className="relative w-full md:h-auto max-xs:h-full xs:h-full sm:h-full overflow-hidden max-xs:px-[2%] xs:px-[2%] sm:px-[2%] md:px-[2%] lg:px-[6%] xl:px-[4%]">
            {/* Carrusel para pantallas sm y menores */}
            <div className="block md:hidden h-full">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={14}
                    slidesPerView={visibleItemsCount}
                    loop={true}
                    autoplay={{
                        delay: 9000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className="w-auto h-full flex justify-center items-center my-2">
                        <div className="flex-shrink-0 flex justify-center items-center h-[140px] w-full">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={140}
                                height={140}
                                className="object-contain justify-center items-center object-center flex-auto"
                            />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <p className="text-center font-bold text-sm pt-4">
                    Deslizá y conocé a quienes confían en nosotros
                </p>
            </div>

            {/* Carrusel con flechas para pantallas md y mayores */}
            <div className="hidden md:block relative pt-4">
                <div className="flex items-center justify-center md:gap-1 lg:gap-4 xl:gap-10 relative mx-3">
                    {itemsToShow.map((image, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 max-xs:w-[80px] xs:w-[100px] sm:w-[120px] md:w-[140px] lg:w-[155px] xl:w-[160px] h-[100px] sm:h-[120px] md:h-[140px] lg:h-[155px] xl:h-[160px]"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={160}
                                height={160}
                                className="w-full h-full object-contain rounded-md"
                            />
                        </div>
                    ))}
                </div>

                {/* Botón Anterior */}
                <button
                    onClick={goPrevious}
                    className="flex absolute top-1/2 sm:left-6 md:left-16 lg:-left-10 xl:left-14 transform -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 justif-yitems-center lg:pl-1">
                    <Image
                        src="/flechabotoncarousel.svg"
                        alt="Anterior"
                        width={28}
                        height={28}
                        className="rotate-0"
                    />
                </button>

                {/* Botón Siguiente */}
                <button
                    onClick={goNext}
                    className="flex absolute top-1/2 sm:right-6 md:right-18 lg:-right-12 xl:right-24 transform -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 justify-items-center md:items-end lg:pr-1"
            >
                    <Image
                        src="/flechabotoncarousel.svg"
                        alt="Siguiente"
                        width={28}
                        height={28}
                        className="rotate-180 md:right-4 md:items-start"
                    />
                </button>
            </div>
        </div>
    );
};

export default Carousel;



