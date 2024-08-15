import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col justify-center items-center bg-[#0853FC] py-6 px-2 gap-0">
      <div className="w-full px-12 sm:px-0 flex flex-row flex-wrap justify-start sm:justify-around items-start gap-4">
        {/*Redes*/}
        <div className="flex flex-col justify-center items-start gap-2 md:gap-4 lg:gap-6">
          <span className="text-xl md:text-xl lg:text-2xl text-white font-bold">Seguinos en</span>
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
            <Link
              href={"https://www.linkedin.com/"}
              target="_blank"
              >
            <span>LinkedIn</span>
            </Link>
          </div>
        </div>
        {/*Contacto*/}
        <div className="flex flex-col justify-start items-start gap-2 md:gap-4 lg:gap-6">
          <span className="text-center w-full text-xl md:text-xl lg:text-2xl text-white font-bold">
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
            {/*<Link
            href={"https://mail.google.com/mail/?view=cm&fs=1&to=grupostartfsa@gmail.com"}
            target="_blank"
            rel="noopener noreferrer">*/}
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
            <Link href="tel:+543704619402"
            /*
              href={`https://wa.me/+543704619402`}
              target="_blank"
              rel="noopener noreferrer" */
            >
            <span>+54 3704-619402</span>
            </Link>
          </div>
        </div>
        {/*Ubicacion*/}
        <div className="max-w-52 flex flex-col justify-start items-start gap-2 md:gap-4 lg:gap-6">
          <span className="text-xl md:text-xl lg:text-2xl text-white font-bold">Visitanos</span>
          <Link href="https://www.google.com/maps/place/Hip%C3%B3lito+Yrigoyen+342,+P3600JGA+Formosa,+Argentina" passHref target="_blank" rel="noopener noreferrer">
          <Image
            src={"/Location.svg"}
            width={200}
            height={150}
            alt="WhatsAppIcon"
            className="cursor-pointer"
          />
          </Link>
          <span className="text-white">
            Hipólito Yrigoyen 342, P3600JGA Formosa, Argentina{" "}
          </span>
        </div>
        
      </div>
      {/*Logo y Derechos*/}
      <div className="flex flex-col items-center">
        <Link href={"/#home"}>
          <Image
            src={"/OrangeLogo.svg"}
            width={180}
            height={120}
            alt="FacebookIcon"
            className="cursor-pointer w-40 md:w-60"
          />
        </Link>
        <p className="text-white flex gap-1 items-center justify-center">
          2024 GrupoStart -{" "}
          {/*<Image
            src={"/Copyright.png"}
            width={24}
            height={24}
            alt="Copyright"
  ></Image>*/}{" "}
          &copy;Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;