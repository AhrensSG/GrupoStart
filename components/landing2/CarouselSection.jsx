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
    <section className="section-dark py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            style={{ fontFamily: "'Schibsted Grotesk', sans-serif", color: "#FFFFFF" }}
          >
            Una mirada a la interfaz del sistema
          </h2>
          <p
            className="text-center text-[#B0B5BB] text-lg mb-8"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Desliza para ver más imágenes
          </p>
          <div className="bg-[#0F1512] border border-[#2A3035] rounded-2xl p-4 overflow-hidden">
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
          </div>
        </div>
      </div>
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #00F74C;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background-color: #00F74C;
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
