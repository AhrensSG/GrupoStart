import React from "react";
import Image from "next/image";

const Course = () => {
  return (
    <div className="py-20 p-2 grid place-items-center gap-10">
      <h1 className="text-4xl font-medium text-[#0853FC]">Nombre del curso</h1>
      <div className="relative">
        <Image
          src={"/CourseDetail.svg"}
          width={1193}
          height={628}
          alt="CourseImage"
        />
        <Image
          src={"/YTIcon.svg"}
          width={150}
          height={150}
          alt="YTIcon"
          className="absolute top-[40%] left-[42.5%]"
        />
      </div>
      <div className="w-full flex flex-row justify-between">
        <ol className="list-disc pl-5 text-2xl font-medium text-[#FB8A00] space-y-2">
          <li>Figma ipsum component variant main layer</li>
          <li>Strikethrough create ipsum arrow overflow </li>
          <li>Boolean effect edit union blur fill line slice</li>
          <li>Figma ipsum component variant main layer</li>
          <li>Strikethrough create ipsum arrow overflow </li>
          <li>Boolean effect edit union blur fill line slice</li>
        </ol>
        <ol className="list-disc pl-5 text-2xl font-medium text-[#FB8A00] space-y-2">
          <li>Figma ipsum component variant main layer</li>
          <li>Strikethrough create ipsum arrow overflow </li>
          <li>Boolean effect edit union blur fill line slice</li>
          <li>Figma ipsum component variant main layer</li>
          <li>Strikethrough create ipsum arrow overflow </li>
          <li>Boolean effect edit union blur fill line slice</li>
        </ol>
      </div>
      <button className="border-2 border-[#FB8A00] text-[#FB8A00] p-2 px-10 text-3xl font-medium rounded-md shadow-md shadow-[#FB8A00] mt-10">COMPRAR</button>
    </div>
  );
};

export default Course;
