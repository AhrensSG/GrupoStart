"use client";
import { Context } from "@/app/context/GlobalContext";
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import { useContext } from "react";

const PayNavBar = () => {
  const { state } = useContext(Context);
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
    <nav className="w-full z-30 bg-[#EEEEEE] flex flex-row items-center justify-between p-6 px-14 gap-6">
      <Link href={"/"} className="min-w-max">
        <Image
          src="/Logo.png"
          alt="Logo"
          width={122}
          height={81}
          priority
        ></Image>
      </Link>
      <div className="flex items-center">
      <svg viewBox="0 0 32 32" id="Card" className="w-[10vh] h-[10vh] ml-2">
          <path d="M27,6H5A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9A3,3,0,0,0,27,6ZM5,8H27a1,1,0,0,1,1,1v2H4V9A1,1,0,0,1,5,8ZM27,24H5a1,1,0,0,1-1-1V15H28v8A1,1,0,0,1,27,24Z" fill="#ff8d00" className="color000000 svgShape"></path>
          <rect width="9" height="2" x="16" y="21" fill="#ff8d00" className="color000000 svgShape"></rect>
        </svg>
        <h2 className="font-bold text-xl whitespace-nowrap">Mi Compra</h2>
      </div>

      <div className="w-full flex flex-row justify-end items-center gap-10">
        <div className="flex items-center gap-2">
          <Image
            src={"/SecurePay.svg"}
            width={55}
            height={55}
            alt="Secure Payment"
          />
          <span className="text-lg font-medium">Pago Seguro</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href={"/courses"}>
            <button className="text-lg underline">Seguir comprando</button>
          </Link>
          <div className="relative">
            <Image
              src={"/Cart.svg"}
              width={50.63}
              height={50.63}
              alt="Cart Logo"
            />
            <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
              {state.cartItems || 0}
            </div>
            </div>
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
      </div>
    </nav>
  );
};

export default PayNavBar;
