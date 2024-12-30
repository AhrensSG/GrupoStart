"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

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
    const [startIndex, setStartIndex] = useState(0);
    const [visibleItemsCount, setVisibleItemsCount] = useState(5);

    useEffect(() => {
        const updateVisibleItems = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 640) setVisibleItemsCount(2); // Pantallas pequeñas
            else if (screenWidth < 768) setVisibleItemsCount(3); // Pantallas medianas
            else setVisibleItemsCount(5); // Pantallas grandes
        };
        updateVisibleItems();
        window.addEventListener("resize", updateVisibleItems);
        return () => window.removeEventListener("resize", updateVisibleItems);
    }, []);

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
        <div className="relative w-full h-fit overflow-hidden md:px-[3%] lg:px-[6%] xl:px-[4%]">
            {/* Botón Anterior */}
            <button
                onClick={goPrevious}
                className="absolute top-1/2 left-4 sm:left-6 md:left-8 lg:left-8 xl:left-10 transform -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center lg:pl-2"
            >
                <Image
                    src="/flechabotoncarousel.svg"
                    alt="Anterior"
                    width={28}
                    height={28}
                    className="rotate-0"
                />
            </button>

            {/* Carrusel */}
            <div className="flex items-center justify-center max-xs:gap-4 xs:gap-6 sm:gap-8 md:gap-8 lg:gap-10 xl:gap-10 relative">
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

            {/* Botón Siguiente */}
            <button
                onClick={goNext}
                className="absolute top-1/2 right-4 sm:right-6 md:right-8 lg:right-8 xl:right-10 transform -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center lg:pr-2"
            >
                <Image
                    src="/flechabotoncarousel.svg"
                    alt="Siguiente"
                    width={28}
                    height={28}
                    className="rotate-180"
                />
            </button>
        </div>
    );
};

export default Carousel;


