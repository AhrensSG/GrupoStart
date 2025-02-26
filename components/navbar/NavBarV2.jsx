"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Context } from "@/app/context/GlobalContext";

const NavBarV2 = () => {
    const [showSideBar, setShowSideBar] = useState(false);
    const { state } = useContext(Context);

    return (
        <nav className="w-full z-30 flex flex-row items-center justify-between px-14 gap-6 bg-[#0853FC]">
            <Link href={"/#home"} className="min-w-max">
                <Image
                    src="/OrangeLogo.svg"
                    alt="Logo"
                    width={150}
                    height={101}
                    priority
                />
            </Link>

            <div className="w-full hidden lg:flex flex-row justify-end items-center gap-12">
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
                <Link className="w-10" href={state?.user ? "/user" : "/login"}>
                    <button
                        onClick={() => {
                            if (!state?.user) {
                                // Lógica adicional si el usuario no ha iniciado sesión
                                console.log(
                                    "Redirigiendo a la página de inicio de sesión..."
                                );
                            } else {
                                // Lógica adicional si el usuario ya está logueado
                                console.log(
                                    "Redirigiendo a la página del usuario..."
                                );
                            }
                        }}
                        className={`w-full h-10 px-2 border rounded-tl-xl rounded-br-xl text-center shadow-md border-orange-500 duration-300 bg-orange-500 text-white shadow-orange-500 hover:bg-white hover:text-orange-500`}>
                        {/* Ícono de Usuario SVG */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={state?.user ? "#FFF" : "#0853FC"} // Color del trazo cambia dinámicamente
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1">
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
                    <div 
                        className="fixed top-0 left-0 w-full h-full bg-black/50 z-30 lg:hidden"
                        onClick={() => setShowSideBar(false)} // Cierra el menú al hacer clic en el fondo
                    >
                        <motion.div
                            initial={{ right: "-100%" }}
                            animate={{ right: "0%" }}
                            exit={{ right: "-100%" }}
                            transition={{ duration: 0.5 }}
                            className="w-2/3 xs:w-1/3 h-full bg-gradient-to-b from-white via-white to-transparent fixed top-0 right-0 z-40"
                            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del menú lo cierre
                        >
                            <div className="w-full h-full relative">
                                <button className="absolute top-4 right-4" onClick={() => setShowSideBar(false)}>
                                    <Image src={"/CloseSideBarIcon.svg"} width={40} height={40} alt="CloseSideBarIcon" />
                                </button>
                                <div className="w-full h-full py-[10%] px-[5%] gap-[5%] flex flex-col justify-start items-start">
                                    <Link className="max-w-32 w-full" href={state?.user ? "/user" : "/login"}>
                                        <button
                                            onClick={() => setShowSideBar(false)}
                                            className={`max-w-32 w-full h-10 px-2 text-start hover:underline underline-offset-2 decoration-[#0853FC] decoration-2 text-xl font-medium duration-300 ${
                                                state?.user ? "text-blue-600" : "text-black"
                                            }`}
                                        >
                                            {state?.user ? "Login" : "Usuario"}
                                        </button>
                                    </Link>
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
                                    <Link className="text-lg" href={"/contact"}>
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
                    </div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBarV2;
