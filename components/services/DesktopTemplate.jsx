import Image from "next/image";
import React from "react";
import NavBar from "../navbar/NavBar";

const DesktopTemplate = ({ children, media = "/MediaPlayer.svg", icon = "/services/Jirafe4.svg"  }) => {
  return (
    <main className="bg-slate-100 w-full h-full">
      <section className="bg-gradient-to-b from-slate-100 to-[#0853FC] w-full h-[100vh] flex flex-col relative">
        <NavBar />
        <div className="w-full h-full flex justify-center items-center">
          <div className="relative max-w-[850px] w-full max-h-96 h-full">
            <Image src={media} fill alt="Mediaplayer" />
          </div>
        </div>
      </section>
      <div className="relative max-w-[100vw] w-full h-56">
        <Image
          src={"/WaveBG.jpg"}
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-top"
        />
        <Image
          src={icon}
          priority
          width={200}
          height={200}
          className="absolute left-[22%] bottom-0"
        />
      </div>
    </main>
  );
};

export default DesktopTemplate;
