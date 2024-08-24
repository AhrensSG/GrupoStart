"use client"
import React from "react";
import Image from "next/image"
import Link from "next/link";
import {useState} from "react";

const images = [
    {
        src: "/services/clientsCarousel/logo1.png",
        alt: "Logo 1",
        link: "/empresa/logo1"
    },
    {
        src: "/services/clientsCarousel/logo2.png",
        alt: "Logo 2",
        link: "/empresa/logo2"
    },
    {
        src: "/services/clientsCarousel/logo3.png",
        alt: "Logo 3",
        link: "/empresa/logo3"
    },
    {
        src: "/services/clientsCarousel/logo4.png",
        alt: "Logo 4",
        link: "/empresa/logo4"
    },
    {
        src: "/services/clientsCarousel/logo5.png",
        alt: "Logo 5",
        link: "/empresa/logo5"
    },
    {
        src: "/services/clientsCarousel/logo6.png",
        alt: "Logo 6",
        link: "/empresa/logo6"
    },
    {
        src: "/services/clientsCarousel/logo7.png",
        alt: "Logo 7",
        link: "/empresa/logo7"
    },
    {
        src: "/services/clientsCarousel/logo8.png",
        alt: "Logo 8",
        link: "/empresa/logo8"
    },
    {
        src: "/services/clientsCarousel/logo9.png",
        alt: "Logo 9",
        link: "/empresa/logo9"
    },
    {
        src: "/services/clientsCarousel/logo10.png",
        alt: "Logo 10",
        link: "/empresa/logo10"
    },
];

const Carousel = () =>  {
    const [fiveImage, setfiveImage] = useState(0);

    const goPreview = () => {
        setfiveImage((preIndex) => preIndex === 0 ? images.length - 5 : preIndex - 1);
    };

    const goNext = () => {
        setfiveImage((preIndex) => preIndex === images.length - 5 ? 0 : preIndex + 1);
    };

    const vistaImage = images.slice(fiveImage, fiveImage + 5);

    return (
        <div className="relative w-full h-fit justify-center">
            <button
                onClick={goPreview}
                className="absolute top-1/2 left-16 transform -translate-y-1/2 text-[#FB8A00] bg-transparent focus:outline-none focus:ring-gray-300 font-extrabold md:text-[100px] px-6 py-4.5 rounded-full"
            >
                &#10094;
            </button>
            <div className="flex gap-8 overflow-x-auto items-center justify-center relative">
                {vistaImage.map((image, index) => (
                    <div key={image.src} className="w-35 h-38">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover rounded-sm"
                            width={125} // Ajusta el tamaño si es necesario
                            height={122} // Ajusta el tamaño si es necesario
                            quality={100}
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={goNext}
                className="absolute top-1/2 right-16 transform -translate-y-1/2 text-[#FB8A00] bg-transparent focus:outline-none focus:ring-gray-300 font-extrabold md:text-[100px] px-6 py-4.5 rounded-full"
            >
                &#10095;
            </button>
        </div>
    );
}

export default Carousel;