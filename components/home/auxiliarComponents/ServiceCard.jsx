import Link from "next/link";
import React from "react";
import BulletSVG from "./BulletSVG";
import Image from "next/image";

const ServiceCard = ({
  img,
  title,
  description,
  link,
  firstBullet = false,
  secondtBullet = false,
  thirdtBullet = false,
  fourthtBullet = false,
  fifthtBullet = false,
}) => {
  return (
    <div className="flex items-end h-[645px]">
      <div className="max-w-80 border-[5px] rounded-3xl p-4 w-full h-[522px] flex flex-col justify-start items-center relative">
        <div className="absolute -top-32">
          <Image src={img} width={200} height={200} alt="ServiceImage" />
        </div>
        <div className="w-full h-full flex flex-col gap-4 justify-between mt-16">
          <div className="flex flex-col gap-3">
            <h3 className="text-center text-white text-2xl font-bold">{title}</h3>
            <p className="text-justify text-white text-sm font-medium">
              {description}
            </p>
            <div className="flex flex-col justify-center items-start gap-1.5">
              {firstBullet !== false && (
                <span className="flex flex-row gap-1 text-sm text-white items-center">
                  <BulletSVG w={16} h={16} />
                  {firstBullet}
                </span>
              )}
              {secondtBullet !== false && (
                <span className="flex flex-row gap-1 text-sm text-white items-center">
                  <BulletSVG w={16} h={16} />
                  {secondtBullet}
                </span>
              )}
              {thirdtBullet !== false && (
                <span className="flex flex-row gap-1 text-sm text-white items-center">
                  <BulletSVG w={16} h={16} />
                  {thirdtBullet}
                </span>
              )}
              {fourthtBullet !== false && (
                <span className="flex flex-row gap-1 text-sm text-white items-center">
                  <BulletSVG w={16} h={16} />
                  {fourthtBullet}
                </span>
              )}
              {fifthtBullet !== false && (
                <span className="flex flex-row gap-1 text-sm text-white items-center">
                  <BulletSVG w={16} h={16} />
                  {fifthtBullet}
                </span>
              )}
            </div>
          </div>
          <div className="text-center">
            <Link href={link}>
              <button className="p-2 px-6 rounded-lg bg-[#FB8A00] drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] text-white">
                Ver Mas
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
