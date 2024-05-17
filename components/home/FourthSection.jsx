import React from "react";
import FounderCard from "./auxiliarComponents/FounderCard";

const FourthSection = () => {
  return (
    <section id="about-us" className="w-full bg-gradient-to-b from-[#FB8A00] p-4">
      <div className="w-full h-full flex flex-col items-center gap-6 py-4">
        <h2 className="text-5xl xs:text-5xl text-black">Fundadores</h2>

        <div className="w-full h-full flex flex-row flex-wrap justify-center items-center gap-16">
          <FounderCard
            img={"/seba.jpeg"}
            name={"El Sebas"}
            profession={"Diseñador Grafico"}
            description={""}
          />
          <FounderCard
            img={"/guille.jpeg"}
            name={"Cabezón"}
            profession={"Programador"}
            description={""}
          />
          <FounderCard
            img={"/ivan.jpeg"}
            name={"Ivan"}
            profession={"Marketing"}
            description={""}
          />
        </div>

        <div className="w-full flex flex-col justify-center items-center py-6 gap-8">
          <div>
            <button className="flex flex-row gap-2 items-center justify-center bg-[#0853FC] p-1 px-10 text-white text-2xl font-light rounded-tl-2xl rounded-br-2xl border border-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                fill="none"
                viewBox="0 0 28 28"
              >
                <path
                  fill="#fff"
                  d="M11.625 15.375H.375v-3.75h11.25V.375h3.75v11.25h11.25v3.75h-11.25v11.25h-3.75v-11.25Z"
                />
              </svg>
              Sobre Nosotros
            </button>
          </div>
          <span className="text-3xl font-normal tracking-wider">
            ! Somos el fututo de tu proyecto !
          </span>
        </div>
      </div>
    </section>
  );
};

export default FourthSection;
