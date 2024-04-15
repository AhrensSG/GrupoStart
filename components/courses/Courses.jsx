import React from "react";
import Image from "next/image";
import Link from "next/link"

const Courses = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-32 pb-20">
      <div className="z-10 pt-40 pb-20">
        <h1 className="text-6xl font-medium text-white">
          Aprende con nosotros
        </h1>
      </div>
      <div className="grid place-items-center gap-16">
        <Course />
        <Course />
        <Course />
        <Course />
      </div>
    </div>
  );
};

const Course = () => {
  return (
    <div className="max-w-screen-xl flex flex-row justify-center items-stretch gap-10 bg-white rounded-md drop-shadow-lg">
      <div className="relative">
        <Image
          src={"/Course1.svg"}
          width={445}
          height={350}
          alt="course"
          className="rounded-l-md"
        />
        <Image src={'/YTIcon.svg'} width={100} height={100} alt="YTIcon" className="absolute top-[35%] left-[35%]"/>
      </div>

      <div className="max-w-2xl text-2xl flex flex-col justify-between items-center gap-4 py-6">
        <p>
          Figma ipsum component variant main layer. Strikethrough create ipsum
          arrow overflow asset. Boolean effect edit union blur fill line slice
          device create. Line asset invite connection bold library polygon.
          Prototype boolean union boolean draft union.
        </p>
        <Link href={'/courses/web'}>
          <button className="bg-[#FB8A00] p-2 px-16 text-white rounded-md">
            Ver más
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Courses;
