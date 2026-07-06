"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const images = [
  { src: "/carousel/1.png", alt: "Imagen 1" },
  { src: "/carousel/2.png", alt: "Imagen 2" },
  { src: "/carousel/3.png", alt: "Imagen 3" },
  { src: "/carousel/4.png", alt: "Imagen 4" },
];

export default function CarouselSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Una mirada a la interfaz del sistema</h2>
        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="rounded-xl overflow-hidden"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full aspect-video">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="text-center text-sm text-gray-500 mt-4">
            Desliza para ver más imágenes
          </p>
        </div>
      </div>
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #FB8A00;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background-color: #FB8A00;
          opacity: 1;
        }
        .swiper-pagination {
          position: relative;
          margin-top: 1rem;
        }
      `}</style>
    </section>
  );
}
