import Image from "next/image";
import Link from "next/link";
import React from "react";

const socialLinks = [
    {
        href: "https://www.instagram.com/grupostart.ok/",
        iconSrc: "/FooterInstagramIcon.svg",
        name: "Instagram",
    },
    {
        href: "https://www.facebook.com/profile.php?id=100091823826062",
        iconSrc: "/FooterFacebookIcon.svg",
        name: "Facebook",
    },
];

const Footer = () => {
    return (
        <footer className="w-full flex xs:flex-col max-xs:flex-col md:flex max-xs:justify-center xs:justify-center md:justify-between items-center bg-[#0853FC] py-5 md:px-[6%] sm:px-0 xs:px-0 relative">
            <div className="w-full flex  max-xs:flex-col xs:flex-col md:flex-row md:justify-between max-xs:items-center xs:items-center md:items-start max-xs:gap-4 xs:gap-4 md:gap-6">
                {/* Visítanos (Primero en pantallas sm y xs, tercero en pantallas md+) */}
                <div className="max-xs:order-2 xs:order-2 md:order-3 lg:order-3 xl:order-3 flex flex-col justify-center items-center gap-3 max-xs:text-center xs:text-center md:text-start w-auto">
                    <span className="xs:text-xl md:text-2xl text-white font-bold">
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
                            alt="Ubicación"
                            className="cursor-pointer xs:w-[45vw] sm:w-[45vw] md:w-full lg:w-full sm:justify-items-center xs:justify-center"
                        />
                    </Link>
                    <span className="px-10 text-white max-xs:text-center xs:text-left md:font-normal xs:font-semibold">
                        Hipólito Yrigoyen 342,{" "}
                        <span className="hidden md:inline">
                            {" "}
                            <br />
                        </span>
                        P3600JGA Formosa,{" "}
                        <span className="hidden md:inline">
                            {" "}
                            <br />
                        </span>
                        Argentina
                    </span>
                </div>

                {/* Seguinos en (Primero en pantallas md+, segundo en pantallas sm y xs) */}
                <div className="max-xs:order-1 xs:order-1 md:order-1 lg:order-1 xl:order-1 flex md:flex-col xs:flex-row max-xs:flex-col justify-center items-center gap-3 text-center xs:w-auto max-xs:w-auto">
                    <span className="xs:text-xl md:text-2xl text-white font-bold">
                        Seguinos en
                    </span>
                    {socialLinks.map((social) => (
                        <div
                            key={social.name}
                            className="flex md:flex-grow xs:flex-row max-xs:flex-row gap-2 max-xs:items-center xs:items-center md:items-start text-white cursor-pointer md:justify-between"
                        >
                            <Link
                                href={social.href}
                                target="_blank"
                                aria-label={`Ir a ${social.name}`}
                            >
                                <Image
                                    src={social.iconSrc}
                                    width={30}
                                    height={30}
                                    alt={`${social.name} Icon`}
                                    className="cursor-pointer"
                                />
                            </Link>
                            <Link
                                href={social.href}
                                target="_blank"
                                aria-label={`Ir a ${social.name}`}
                            >
                                <span>{social.name}</span>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Contacto (Segundo en pantallas sm y xs, en el centro en pantallas md+) */}
                <div className="max-xs:order-3 xs:order-3 md:order-2 lg:order-2 xl:order-2 flex flex-col justify-center items-center gap-3 text-center xs:w-auto max-xs:w-auto">
                    <span className="text-center xs:text-2xl text-white font-bold">
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
                        <Link
                            href={"https://calendly.com/grupostart-ok/30min"}
                            target="_blank"
                        >
                            support@grupostart.com.ar
                        </Link>
                    </div>
                    <div className="flex gap-2 text-white">
                        <Image
                            src={"/PhoneIcon.svg"}
                            width={30}
                            height={30}
                            alt="PhoneIcon"
                            className="cursor-pointer"
                        />
                        <Link
                            href={
                                "https://wa.me/+543704619402?text=¡Hola!%20Me%20gustaría%20saber%20más%20sobre%20sus%20servicios"
                            }
                            target="_blank"
                        >
                            <span>+54 3704-619402</span>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center mt-2">
                        <Link href={"/#home"}>
                            <Image
                                src={"/OrangeLogo.svg"}
                                width={180}
                                height={120}
                                alt="Logo"
                                className="cursor-pointer w-40 md:w-60"
                            />
                        </Link>
                        <p className="text-white text-sm lg:text-xl">
                            {new Date().getFullYear()} GrupoStart - &copy; Todos
                            los derechos reservados
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
