"use client";
import { Context } from "@/app/context/GlobalContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useContext } from "react";

const PayNavBar = () => {
  const { state } = useContext(Context);
  return (
    <nav className="w-full z-30 bg-transparent flex flex-row items-center justify-between p-6 px-14 gap-6">
      <Link href={"/"} className="min-w-max">
        <Image
          src="/Logo.png"
          alt="Logo"
          width={122}
          height={81}
          priority
        ></Image>
      </Link>

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
          <Image
            src={"/Cart.svg"}
            width={50.63}
            height={50.63}
            alt="Cart Logo"
          />
          <div className="border-2 border-[#FB8A00] rounded-full p-1 px-3">
            <span className="text-3xl font-light">{state.cartItems || 0}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PayNavBar;
