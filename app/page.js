"use client";
import Footer from "@/components/footer/Footer";
import FirstSection from "@/components/home/FirstSection";
import FourthSection from "@/components/home/FourthSection";
import SecondSection from "@/components/home/SecondSection";
import ThirdSection from "@/components/home/ThirdSection";

export default function Home() {
  return (
    <main id="home" className="bg-slate-100">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      {/* <section className="w-full h-screen relative flex">
        <Image
          src={"/EndPageJirafe.png"}
          fill
          alt="FutureJirafe"
          className="object-cover object-top  transition-opacity opacity-0 duration-500 z-0"
          onLoad={(event) => event.target.classList.remove("opacity-0")}
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority={true}
          quality={100}
        />
        <div className="w-full h-full flex justify-end items-center z-10">
          <div className="w-1/2 h-full flex flex-col justify-center items-start">
            
          </div>
        </div>
      </section> */}
      <Footer/>
    </main>
  );
}
