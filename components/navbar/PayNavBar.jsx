"use client";
import { Context } from "@/app/context/GlobalContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useContext } from "react";

const PayNavBar = () => {
    const { state } = useContext(Context);
    const [isLoggedIn, setIsLoggedIn] = useState(false);7
    const router = useRouter();

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
        <nav className="bg-[#EEEEEE] flex items-center p-4 z-30 w-full">
            {/* LOGO y Flecha de retroceso */}
            <div className="flex flex-col md:items-center md:mt-6">
                {/* LOGO */}
                <Link href={"/"}>
                    <Image src="/Logo.png" alt="Logo" width={122} height={81} priority />
                </Link>
                {/* Flecha de retroceso visible solo en pantallas pequeñas */}
                <button onClick={() => window.history.back()} className="text-gray-500 flex items-center text-sm mt-6 font-bold hover:text-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6 mr-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver
                </button>
            </div>

            {/* "Mi Compra" CENTRADO EN PANTALLAS PEQUEÑAS */}
            <div className="flex-1 flex justify-center md:hidden">
                <div className="flex items-center">
                    <svg viewBox="0 0 32 32" className="w-8 h-8 " fill="#ff8d00">
                        <path d="M27,6H5A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9A3,3,0,0,0,27,6ZM5,8H27a1,1,0,0,1,1,1v2H4V9A1,1,0,0,1,5,8ZM27,24H5a1,1,0,0,1-1-1V15H28v8A1,1,0,0,1,27,24Z" />
                        <rect width="9" height="2" x="16" y="21" />
                    </svg>
                    <h2 className="font-bold text-lg ml-2 whitespace-nowrap">Mi Compra</h2>
                </div>
            </div>

            {/* NAVBAR COMPLETO - SOLO EN PANTALLAS GRANDES */}
            <div className="hidden md:flex flex-1 items-center justify-between">
                {/* Mi Compra */}
                <div className="flex items-center">
                    <svg viewBox="0 0 32 32" className="w-[12vh] h-[12vh] ml-14" fill="#ff8d00">
                        <path d="M27,6H5A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9A3,3,0,0,0,27,6ZM5,8H27a1,1,0,0,1,1,1v2H4V9A1,1,0,0,1,5,8ZM27,24H5a1,1,0,0,1-1-1V15H28v8A1,1,0,0,1,27,24Z" />
                        <rect width="9" height="2" x="16" y="21" />
                    </svg>
                    <h2 className="font-bold text-xl whitespace-nowrap">Mi Compra</h2>
                </div>

                {/* Pago Seguro */}
                <div className="flex items-center ml-auto justify-between gap-2">
                    <Image src={"/SecurePay.svg"} width={35} height={35} alt="Secure Payment" />
                    <span className="text-lg font-medium">Pago Seguro</span>
                </div>

                {/* Enlace "Seguir Comprando" */}
                <div>
                    <button onClick={() => router.back()} className="text-lg underline mx-4">Seguir comprando</button>
                </div>
            </div>

            {/* CARRITO Y USUARIO - SIEMPRE VISIBLES */}
            <div className="ml-auto flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                {/* Carrito */}
                <div className="relative flex items-center">
                    <Image src="/Cart.svg" width={50} height={50} alt="Cart Logo" className="w-15 h-15" />
                    <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                        {state?.cart?.length || state?.cartItems?.length || 0}
                    </div>
                </div>

                {/* Usuario */}
                <Link href={isLoggedIn ? "/user" : "/login"}>
                    <button
                        className={`w-10 h-10 flex items-center justify-center border rounded-tl-xl rounded-br-xl text-center shadow-md border-orange-500 duration-300 ${
                            isLoggedIn
                                ? "bg-green-400 text-white shadow-orange-500 hover:bg-white hover:text-[#0853FC]"
                                : "bg-orange-500 text-white shadow-orange-500 hover:bg-white hover:text-orange-500"
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="7" r="4" />
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        </svg>
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default PayNavBar;
