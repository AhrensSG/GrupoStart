import Link from "next/link";
import React from "react";
import BulletSVG from "./BulletSVG";
import Image from "next/image";

const ServiceCard = ({
  img,
  title,
  description,
  secondDescription,
  link,
  firstBullet = false,
  secondtBullet = false,
  thirdtBullet = false,
  fourthtBullet = false,
  fifthtBullet = false,
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="border-[5px] rounded-3xl p-4 w-full h-full flex flex-col justify-between items-center relative min-h-[350px] lg:min-h-[400px] xl:min-h-[450px] ">
        <div className="absolute -top-20 sm:-top-24 lg:-top-24 flex justify-center w-full -z-0">
          <Image src={img} width={140} height={140} alt="ServiceImage" className="lg:w-[160px] lg:h-[160px] xl:w-[180px] xl:h-[180px]" />
        </div>
        <div className="w-full h-full flex flex-col  justify-between mt-20 lg:mt-10 xl:mt-16 z-0">
          <div className="flex flex-col gap-3">
            <span className="text-center text-white text-lg lg:text-lg font-bold rounded-tl-xl rounded-br-xl bg-[#FB8A00]">
              {title}
            </span>
            <p className="text-justify text-white text-sm lg:text-xs xl:text-sm leading-normal font-normal">
              {description}
            </p>
            {secondDescription && (
              <p className="text-justify text-white text-sm lg:text-xs xl:text-sm leading-normal font-normal">
                {secondDescription}
              </p>
            )}
            <div className="flex flex-col justify-center items-start gap-1.5">
              {firstBullet && (
                <span className="flex flex-row gap-1 text-sm lg:text-sm text-white items-center">
                  <BulletSVG w={20} h={20} />
                  {firstBullet}
                </span>
              )}
              {secondtBullet && (
                <span className="flex flex-row gap-1 text-sm lg:text-sm text-white items-center">
                  <BulletSVG w={20} h={20} />
                  {secondtBullet}
                </span>
              )}
              {thirdtBullet && (
                <span className="flex flex-row gap-1 text-sm lg:text-sm text-white items-center">
                  <BulletSVG w={20} h={20} />
                  {thirdtBullet}
                </span>
              )}
              {fourthtBullet && (
                <span className="flex flex-row gap-1 text-sm lg:text-sm text-white items-center">
                  <BulletSVG w={20} h={20} />
                  {fourthtBullet}
                </span>
              )}
              {fifthtBullet && (
                <span className="flex flex-row gap-1 text-sm lg:text-sm text-white items-center">
                  <BulletSVG w={20} h={20} />
                  {fifthtBullet}
                </span>
              )}
            </div>
          </div>
          <div className="text-center">
            <Link href={link}>
              <button className="p-2 px-6 lg:px-8 rounded-lg bg-[#FB8A00] drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] text-white">
                Ver Más
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
