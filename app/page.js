"use client";

import Footer from "@/components/footer/Footer";
import FirstSection from "@/components/home/FirstSection";
import FourthSection from "@/components/home/FourthSection";
import SecondSection from "@/components/home/SecondSection";
import ThirdSection from "@/components/home/ThirdSection";
import InfoViewMore from "@/components/home/auxiliarEstaticComp/InfoViewMore";
import Chat from "@/components/chat/Chat";
import ResponsiveContainer from "@/components/responsiveComp/ResponsiveContainer";

export default function Home() {
  return (
    <ResponsiveContainer>
      <main id="home">
        <Chat />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <InfoViewMore />
        <Footer />
      </main>
    </ResponsiveContainer>
  );
}

