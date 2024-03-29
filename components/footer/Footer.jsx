import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col justify-center items-center bg-[#0853FC] py-6 px-2 gap-0">
      <div className="w-full px-12 sm:px-0 flex flex-row flex-wrap justify-start sm:justify-around items-start gap-4">
        <div className="flex flex-col justify-center items-start gap-2">
          <span className="text-xl text-white">Seguinos en</span>
          <div className="flex gap-2 items-center text-white">
            <Image
              src={"/FooterInstagramIcon.svg"}
              width={30}
              height={30}
              alt="WhatsAppIcon"
              className="cursor-pointer"
            />
            <span>Instagram</span>
          </div>
          <div className="flex gap-2 items-center text-white">
            <Image
              src={"/FooterFacebookIcon.svg"}
              width={30}
              height={30}
              alt="InstagramIcon"
              className="cursor-pointer"
            />
            <span>Facebook</span>
          </div>
          <div className="flex gap-2 items-center text-white">
            <Image
              src={"/FooterLinkedInIcon.svg"}
              width={30}
              height={30}
              alt="FacebookIcon"
              className="cursor-pointer"
            />
            <span>LinkedIn</span>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-2">
          <span className="text-center w-full text-xl text-white">
            Contáctanos
          </span>
          <div className="flex gap-2 text-white">
            <Image
              src={"/MailIcon.svg"}
              width={30}
              height={30}
              alt="WhatsAppIcon"
              className="cursor-pointer"
            />
            <span>grupostart@gmail.com</span>
          </div>
          <div className="flex gap-2 text-white">
            <Image
              src={"/PhoneIcon.svg"}
              width={30}
              height={30}
              alt="WhatsAppIcon"
              className="cursor-pointer"
            />
            <span>+54 3704-561550</span>
          </div>
        </div>
        <div className="max-w-52 flex flex-col justify-start items-start gap-2">
          <span className="text-xl text-white">Visitanos</span>
          <Image
            src={"/Location.svg"}
            width={200}
            height={150}
            alt="WhatsAppIcon"
            className="cursor-pointer"
          />
          <span className="text-white">
            P. Sherman calle wallaby 42 Sydney{" "}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Link href={"/#home"}>
          <Image
            src={"/OrangeLogo.svg"}
            width={180}
            height={120}
            alt="FacebookIcon"
            className="cursor-pointer"
          />
        </Link>
        <span className="text-white">
          2024 GrupoStart - Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
};

export default Footer;
