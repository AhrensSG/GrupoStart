import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="w-full z-30 bg-transparent flex flex-row items-center justify-between p-6 px-14 gap-6">
      <Link href={'/'} className="min-w-max">
        <Image
          src="/Logo.png"
          alt="Logo"
          width={200}
          height={200}
          priority
        ></Image>
      </Link>

      <div className="w-full flex flex-row justify-end items-center gap-6">
        <Link href={'/'}>
          <button className="w-32 h-10 px-2 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Cursos
          </button>
        </Link>

        <Link href={'/#services'}>
          <button className="w-32 h-10 px-2 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Servicios
          </button>
        </Link>

        <Link href={'/#about-us'}>
          <button className="w-32 h-10 px-2 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Nosotros
          </button>
        </Link>

        <Link href={'/'}>
          <button className="w-32 h-10 px-2 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Experiencias
          </button>
        </Link>

        <Link href={'/'}>
          <button className="w-32 h-10 px-2 border rounded-tl-xl rounded-br-xl bg-[#f8f8f8] border-orange-500 shadow-md shadow-orange-500 text-center hover:bg-orange-500 hover:text-white font-medium duration-300">
            Contacto
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
