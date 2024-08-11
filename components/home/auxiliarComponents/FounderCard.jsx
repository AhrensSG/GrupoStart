import Image from "next/image";
import React from "react";

const FounderCard = ({ img, name, profession, description }) => {
  return (
    <div className="flex justify-start items-end h-[435px]">
      <div className="w-60 p-5 flex flex-col justify-start items-center relative bg-transparent">
        <div className="absolute -top-36">
          <Image
          src={img}
          width={225}
          height={225}
          alt="FounderPhoto"
          className="rounded-full !border-[#0853FC]"
          style={{ borderColor: '!important', borderWidth: 5 }}
          />
        </div>

        <div className="w-48 h-full flex flex-col gap-6 mt-16">
          <div className="flex flex-col text-center">
            <h4 className="text-3xl md:text-2xl lg:text-4xl text-xl font-medium">{name}</h4>
            <span className="text text-1xl md:text-2xl font-light">{profession}</span>
          </div>
          <span>{description}</span>
          <div className="flex flex-row justify-between items-center gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderCard;
