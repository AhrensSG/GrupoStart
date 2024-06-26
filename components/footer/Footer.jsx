import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col justify-center items-center bg-[#0853FC] py-6 px-2 gap-0">
      <div className="w-full px-12 sm:px-0 flex flex-row flex-wrap justify-start sm:justify-around items-start gap-4">
        <div className="flex flex-col justify-center items-start gap-2">
          <span className="text-xl text-white">Seguinos en</span>
          <div className="flex gap-2 items-center text-white cursor-pointer">
            <Link
              href={"https://www.instagram.com/grupostart.ok/"}
              target="_blank"
            >
              <Image
                src="/FooterInstagramIcon.svg"
                width={30}
                height={30}
                alt="InstagramIcon"
                className="cursor-pointer"
              />
            </Link>
            <Link
              href={"https://www.instagram.com/grupostart.ok/"}
              target="_blank"
            >
              <span>Instagram</span>
            </Link>
          </div>
          <div className="flex gap-2 items-center text-white cursor-pointer">
            <Link
              href={"https://www.facebook.com/profile.php?id=100091823826062"}
              target="_blank"
            >
              <Image
                src="/FooterFacebookIcon.svg"
                width={30}
                height={30}
                alt="FacebookIcon"
                className="cursor-pointer"
              />
            </Link>
            <Link
              href={"https://www.facebook.com/profile.php?id=100091823826062"}
              target="_blank"
            >
              <span>Facebook</span>
            </Link>
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
            <span>grupostartfsa@gmail.com</span>
          </div>
          <div className="flex gap-2 text-white">
            <Image
              src={"/PhoneIcon.svg"}
              width={30}
              height={30}
              alt="WhatsAppIcon"
              className="cursor-pointer"
            />
            <span>+54 3704-619402</span>
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
            Hipólito Yrigoyen 342, P3600JGA Formosa, Argentina{" "}
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
        <p className="text-white flex gap-1 items-center justify-center">
          2024 GrupoStart -{" "}
          <Image
            src={"/Copyright.png"}
            width={24}
            height={24}
            alt="Copyright"
          ></Image>{" "}
          Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
