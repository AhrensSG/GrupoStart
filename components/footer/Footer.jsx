import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col justify-center items-center bg-[#0853FC] py-5 lg:px-0 md:px-0 relative">
      <div className="w-full px-0 sm:px-0 flex flex-row flex-wrap justify-start sm:justify-around items-start gap-4">
        {/* Redes */}
        <div className="flex flex-col justify-center items-start gap-2 md:gap-3 lg:gap-3">
          <span className="text-xl md:text-xl lg:text-2xl text-white font-bold">
            Seguinos en
          </span>
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
              alt="LinkedInIcon"
              className="cursor-pointer"
            />
            <Link href={"https://www.linkedin.com/"} target="_blank">
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>
        {/* Contacto */}
        <div className="flex flex-col justify-center items-center gap-0 md:gap-3 lg:gap-3">
          <span className="text-center w-full text-xl md:text-xl lg:text-2xl text-white font-bold">
            Contáctanos
          </span>
          <div className="flex gap-2 text-white">
            <Image
              src={"/MailIcon.svg"}
              width={30}
              height={30}
              alt="MailIcon"
              className="cursor-pointer"
            />
            <span>grupostartfsa@gmail.com</span>
          </div>
          <div className="flex gap-2 text-white">
            <Image
              src={"/PhoneIcon.svg"}
              width={30}
              height={30}
              alt="PhoneIcon"
              className="cursor-pointer"
            />
            <Link href="tel:+543704619402">
              <span>+54 3704-619402</span>
            </Link>
          </div>
          <div className="flex flex-col items-center mt-2 lg:mt-1 xl:mt-0">
            <Link href={"/#home"}>
              <Image
                src={"/OrangeLogo.svg"}
                width={180}
                height={120}
                alt="Logo"
                className="cursor-pointer w-40 md:w-60"
              />
            </Link>
            <p className="text-white flex gap-1 items-center justify-center text-sm lg:text-xl">
              2024 GrupoStart - &copy; Todos los derechos reservados
            </p>
          </div>
        </div>
        {/* Ubicación */}
        <div className="max-w-52 flex flex-col justify-center items-start text-start gap-2 md:gap-3 lg:gap-3">
          <span className="text-2xl md:text-xl lg:text-2xl text-white font-bold">
            Visítanos
          </span>
          <Link
            href="https://www.google.com/maps/place/Hip%C3%B3lito+Yrigoyen+342,+P3600JGA+Formosa,+Argentina"
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"/LocationContact.png"}
              width={215}
              height={150}
              quality={100}
              alt="LocationIcon"
              className="cursor-pointer"
            />
          </Link>
          <span className="text-white">
            Hipólito Yrigoyen 342, P3600JGA Formosa, Argentina{" "}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
