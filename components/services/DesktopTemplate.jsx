import Image from "next/image";
import React from "react";
import NavBar from "../navbar/NavBar";

const DesktopTemplate = ({ children }) => {
  return (
    <main className="bg-slate-100 w-full h-full">
      <section className="bg-[url('/WaveBG.svg')] bg-cover w-full h-full flex flex-col relative">
        <NavBar />
        <div className="w-full h-full flex flex-col items-center py-10">
          <Image
            src={"/MediaPlayer.svg"}
            width={800}
            height={650}
            alt="MediaPlayer"
            className="z-10"
          />
        </div>
      </section>
    </main>
  );
};

export default DesktopTemplate;
