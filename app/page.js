"use client";
import Footer from "@/components/footer/Footer";
import FirstSection from "@/components/home/FirstSection";
import FourthSection from "@/components/home/FourthSection";
import SecondSection from "@/components/home/SecondSection";
import ThirdSection from "@/components/home/ThirdSection";
import InfoViewMore from "@/components/home/auxiliarEstaticComp/InfoViewMore"
import Chat from "@/components/chat/Chat"
import Image from "next/image";

export default function Home() {
  return (
    <main id="home" className="bg-slate-100">
      <Chat />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <InfoViewMore  />
      {/*<section className="w-full h-screen relative">
        <Image
          src={"/ContactSection.png"}
          fill
          alt="FutureJirafe"
          className="object-cover object-top  transition-opacity opacity-0 duration-500 z-0"
          onLoad={(event) => event.target.classList.remove("opacity-0")}
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority={true}
          quality={100}
        />
  </section>*/}
      <Footer />
    </main>
  );
}
