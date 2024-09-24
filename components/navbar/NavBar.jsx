'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NavBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <nav className="w-full z-30 bg-transparent flex flex-row items-center justify-between p-[2%]">
      <Link href={"/"} className="min-w-max ml-[5%] sm:ml-[2%] mt-[5%] sm:mt-[3%]">
        <Image src="/Logo.png" alt="Logo" width={161} height={66} priority />
      </Link>

      <div className="hidden lg:flex flex-row justify-end items-center gap-[20%] mt-[2%] mr-[5%] lg:mr-[3%]">
        <Link className="text-lg" href={"/#services"}>
          <button className="w-full h-10 px-6 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Servicios
          </button>
        </Link>
        <Link className="text-lg" href={"/about"}>
          <button className="w-full h-10 px-6 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Nosotros
          </button>
        </Link>
        <Link className="text-lg" href={"/contact"}>
          <button className="w-full h-10 px-6 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Contacto
          </button>
        </Link>
      </div>

      <div className="lg:hidden">
        <button onClick={() => setShowSideBar(true)}>
          <Image
            src={"/BurgerMenu.svg"}
            width={35}
            height={35}
            alt="BurgerMenu"
          />
        </button>
      </div>

      <AnimatePresence>
        {showSideBar && (
          <motion.div
            initial={{ right: "-100%" }}
            animate={{ right: "0%" }}
            exit={{ right: "-100%" }}
            transition={{ duration: 0.5 }}
            className="w-2/3 xs:w-1/3 h-full bg-gradient-to-b from-white via-white to-transparent fixed top-0 right-0 lg:hidden z-30"
          >
            <div className="w-full h-full relative">
              <button
                className="absolute top-4 right-4"
                onClick={() => setShowSideBar(false)}
              >
                <Image
                  src={"/CloseSideBarIcon.svg"}
                  width={40}
                  height={40}
                  alt="CloseSideBarIcon"
                />
              </button>
              <div className="w-full h-full py-[10%] px-[5%] gap-[5%] flex flex-col justify-start items-start">
                <Link className="text-lg" href={"/#services"}>
                  <button
                    onClick={() => setShowSideBar(false)}
                    className="w-full h-10 text-start hover:underline underline-offset-2 decoration-[#0853FC] decoration-2 font-medium duration-300"
                  >
                    Servicios
                  </button>
                </Link>
                <Link className="text-lg" href={"/about"}>
                  <button
                    onClick={() => setShowSideBar(false)}
                    className="w-full h-10 text-start hover:underline underline-offset-2 decoration-[#0853FC] decoration-2 font-medium duration-300"
                  >
                    Nosotros
                  </button>
                </Link>
                <Link className="text-lg" href={"/about#contactAbout"}>
                  <button
                    onClick={() => setShowSideBar(false)}
                    className="w-full h-10 text-start hover:underline underline-offset-2 decoration-[#0853FC] decoration-2 font-medium duration-300"
                  >
                    Contacto
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
