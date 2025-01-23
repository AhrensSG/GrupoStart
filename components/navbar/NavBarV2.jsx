"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NavBarV2 = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      // Simula el inicio de sesión, aquí va la lógica de autenticación
      setIsLoggedIn(true);
    } else {
      // Redirigir a la página del usuario
      window.location.href = "/user";
    }
  };

  return (
    <nav className="w-full z-30 flex flex-row items-center justify-between px-14 gap-6 bg-[#0853FC]">
        <Link href={"/#home"} className="min-w-max">
        <Image src="/OrangeLogo.svg" alt="Logo" width={150} height={101} priority />
        </Link>

            <div className="w-full hidden lg:flex flex-row justify-end items-center gap-12">
        {/* <Link className="max-w-32 w-full" href={"/experiences"}>
            <button className="max-w-32 w-full h-10 px-2 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Experiencias
            </button>
        </Link> */}

        {/* <Link className="max-w-32 w-full" href={"/"}>
            <button className="max-w-32 w-full h-10 px-2 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Inicio
            </button>
        </Link> */}

        <Link className="max-w-32 w-full" href={"/#services"}>
            <button className="max-w-32 w-full h-10 px-2 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Servicios
            </button>
        </Link>

        <Link className="max-w-32 w-full" href={"/about"}>
            <button className="max-w-32 w-full h-10 px-2 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Nosotros
            </button>
        </Link>

        <Link className="max-w-32 w-full" href={"/contact"}>
            <button className="max-w-32 w-full h-10 px-2 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Contacto
            </button>
        </Link>
        <Link className="w-10" href={isLoggedIn ? "/user" : "/login"}>
      <button
        onClick={() => {
          if (!isLoggedIn) {
            // Lógica adicional si el usuario no ha iniciado sesión
            console.log("Redirigiendo a la página de inicio de sesión...");
          } else {
            // Lógica adicional si el usuario ya está logueado
            console.log("Redirigiendo a la página del usuario...");
          }
        }}
        className={`w-full h-10 px-2 border rounded-tl-xl rounded-br-xl text-center shadow-md border-orange-500 duration-300 ${
          isLoggedIn
            ? "bg-green-400 text-white shadow-orange-500 hover:bg-white hover:text-[#0853FC]"
            : "bg-orange-500 text-white shadow-orange-500 hover:bg-white hover:text-orange-500"
        }`}
      >
        {/* Ícono de Usuario SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isLoggedIn ? "#FFF" : "#0853FC"} // Color del trazo cambia dinámicamente
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1"
        >
          <circle cx="12" cy="7" r="4" />
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        </svg>
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
            initial={{ right: -1000 }}
            animate={{ right: 0 }}
            exit={{ right: -1000 }}
            transition={{ duration: 0.5 }}
            className="w-2/3 xs:w-1/3 h-screen bg-gradient-to-b from-white via-white to-transparent fixed top-0 right-0 lg:hidden z-30"
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
                <div className="w-full h-full py-20 px-10 gap-4 flex flex-col justify-start items-start">
                <Link className="max-w-32 w-full" href={isLoggedIn ? "/user" : "/login"}>
                  <button
                    onClick={() => setShowSideBar(false)}
                    className={`max-w-32 w-full h-10 px-2 text-start hover:underline underline-offset-2 decoration-[#0853FC] decoration-2 text-xl font-medium duration-300 ${
                      isLoggedIn ? "text-blue-600" : "text-black"
                    }`}
                  >
                    {isLoggedIn ? "Blue-600" : "Usuario"}
                  </button>
                </Link>
                {/*<Link className="max-w-32 w-full" href={"/courses"}>
                    <button
                    onClick={() => setShowSideBar(false)}
                    className="max-w-32 w-full h-10 px-2 text-start hover:underline underline-offset-2 decoration-[#0853FC] decoration-2 text-xl font-medium duration-300"
                    >
                    Cursos
                    </button>
                  </Link>*/}

                <Link className="max-w-32 w-full" href={"/#services"}>
                    <button
                    onClick={() => setShowSideBar(false)}
                    className="max-w-32 w-full h-10 px-2 text-start hover:underline underline-offset-2 decoration-[#0853FC] decoration-2 text-xl font-medium duration-300"
                  >
                    Servicios
                  </button>
                </Link>

                <Link className="max-w-32 w-full" href={"/about"}>
                  <button
                    onClick={() => setShowSideBar(false)}
                    className="max-w-32 w-full h-10 px-2 text-start hover:underline underline-offset-2 decoration-[#0853FC] decoration-2 text-xl font-medium duration-300"
                  >
                    Nosotros
                  </button>
                </Link>

                {/*<Link className="max-w-32 w-full" href={"/experiences"}>
                  <button
                    onClick={() => setShowSideBar(false)}
                    className="max-w-32 w-full h-10 px-2 text-start hover:underline underline-offset-2 decoration-[#0853FC] decoration-2 text-xl font-medium duration-300"
                  >
                    Experiencias
                  </button>
                </Link>*/}

                <Link className="max-w-32 w-full" href={"/contact"}>
                  <button
                    onClick={() => setShowSideBar(false)}
                    className="max-w-32 w-full h-10 px-2 text-start hover:underline underline-offset-2 decoration-[#0853FC] decoration-2 text-xl font-medium duration-300"
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

export default NavBarV2;
