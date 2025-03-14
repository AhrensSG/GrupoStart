import Image from "next/image";
import React from "react";

const FounderCard = ({ img, name, profession, description }) => {
  return (
    <div className="flex justify-start items-end h-96">
      <div className="w-60 xl:w-72 p-6 flex flex-col justify-start items-center relative bg-transparent">
        <div className="relative">
          <Image
            src={img}
            width={328}
            height={225}
            alt="FounderPhoto"
            className="rounded-full !border-[#0853FC]"
            style={{ borderColor: "!important", borderWidth: 5, position: "relative" }}
          />
        </div>

        <div className="w-48 h-full flex lg:mt-5 xl:mt-8 pt-[2px] flex-col relative">
          <div className="flex flex-col text-center justify-center items-center -top-6">
            <h4 className="text-3xl md:text-2xl lg:text-3xl xl:text-xl font-medium whitespace-nowrap text-center items-center justify-center">
              {name}
            </h4>
            <span className="text xs:text-xl md:text-2xl font-medium pt-[24px] whitespace-nowrap">
              {profession}
            </span>
          </div>
          <span>{description}</span>
          {/*<div className="flex flex-row justify-between items-center gap-[14px] pt-[24px]">
            <Image
              src={"/WspIcon.svg"}
              width={45}
              height={45}
              alt="WhatsAppIcon"
              className="cursor-pointer"
            />
            <Image
              src={"/InstagramIcon.svg"}
              width={45}
              height={45}
              alt="InstagramIcon"
              className="cursor-pointer"
            />
            <Image
              src={"/FacebookIcon.svg"}
              width={45}
              height={45}
              alt="FacebookIcon"
              className="cursor-pointer"
            />
  </div>*/}
        </div>
      </div>
    </div>
  );
};

export default FounderCard;
