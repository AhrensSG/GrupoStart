import Image from "next/image";
import React from "react";

const FounderCard = ({ img, name, profession, description }) => {
  return (
    <div className="flex justify-start items-end h-[435px]">
      <div className="w-60 p-5 flex flex-col justify-start items-center relative bg-white rounded-md shadow-[10px_0px_20px_0.1px_rgba(0,0,0,0.3)]">
        <div className="absolute -top-36">
          <Image src={img} width={225} height={225} alt="FounderPhoto" />
        </div>

        <div className="w-48 h-full flex flex-col gap-6 mt-16">
          <div className="flex flex-col text-center">
            <h4 className="text-xl font-medium">{name}</h4>
            <span className="text-lg font-light">{profession}</span>
          </div>
          <span>{description}</span>
          <div className="flex flex-row justify-between items-center">
            <Image
              src={"/WspIcon.svg"}
              width={35}
              height={35}
              alt="WhatsAppIcon"
              className="cursor-pointer"
            />
            <Image
              src={"/InstagramIcon.svg"}
              width={35}
              height={35}
              alt="InstagramIcon"
              className="cursor-pointer"
            />
            <Image
              src={"/FacebookIcon.svg"}
              width={35}
              height={35}
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
