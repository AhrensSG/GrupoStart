import Image from "next/image";
import Link from "next/link";

export default function ServicesSection({ planes, handleClick, estado, periodoContratacion, handlePagar, toggleInfoServices }) {
    return (
        <section className="w-full flex flex-col space-y-6" id="sectionPlansShow">
            {/* Subtitulo y ChatWsp */}
            <div className="flex justify-between items-center w-full relative">
                <h2 className="font-bold text-orange-500 text-2xl" id="subMisServicios">
                    Mis Servicios
                </h2>
                <div className="flex ml-auto space-x-4" id="actionButtonsServices">
                    <Link href={"/payment"}>
                        <button
                            className="bg-orange-500 text-white p-5 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none transition-all duration-300 ease-in-out w-16 h-16 flex items-center justify-center"
                            aria-label="Ir a la página de pago"
                            title="Ir al carrito"
                        >
                            <Image src="/cartIconUser.png" alt="Icono de carrito" width={35} height={35} />
                        </button>
                    </Link>

                    <button
                        className="bg-orange-500 text-white p-5 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none transition-all duration-300 ease-in-out w-16 h-16 flex items-center justify-center"
                        onClick={handleClick}
                        aria-label="Abrir chat"
                        title="Ir al chat"
                    >
                        <Image src="/imgChatIcon.png" alt="Icono de chat" width={30} height={30} />
                    </button>
                </div>
            </div>
            <div className="rounded-xl bg-white shadow-lg p-6">
                <h2 className="text-lg font-bold text-orange-500 justify-start ml-2 my-1">Planes</h2>
                <div className="flex flex-row space-y-4">
                    {/* Render de los planes */}
                    {planes.map((plan) => (
                        <div key={plan.id} className="bg-white rounded-lg shadow-lg p-6 w-full flex-grow">
                            <h2 className="text-lg font-bold text-orange-500">{plan.nombre}</h2>
                            <div className="bg-white rounded-lg shadow-lg p-3 flex items-center justify-between w-full">
                                <div className="flex-grow">
                                    <p className="text-gray-500 text-sm">ID: #{plan.id}</p>
                                    <p className="text-md text-blue-600 font-bold flex items-center" id="periodContrat">
                                        Período: {periodoContratacion(plan.periodo)}
                                    </p>
                                    <p className="text-md text-green-600 font-bold flex items-center" id="estatePayPlan">
                                        <p className="text-gray-500 text-sm">Estado:</p>
                                        <p className={estado?.estadoColor}>{estado?.mensaje}</p>
                                    </p>
                                </div>

                                <div className="flex flex-row justify-center items-center space-x-3 px-2">
                                    <div className="text-center flex-1" id="colContratacion">
                                        <p className="text-gray-500 text-sm">CONTRATACION</p>
                                        <p className="text-lg font-semibold">{plan.contratacion.toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-center flex-1" id="colVencimiento">
                                        <p className="text-red-500 text-sm">VENCIMIENTO</p>
                                        <p className="text-lg font-semibold">{plan.vencimiento.toLocaleDateString()}</p>
                                    </div>

                                    <div className="text-right flex-1" id="colImporte">
                                        <p className="text-gray-500 text-sm">IMPORTE</p>
                                        <p className="text-lg font-semibold">${Math.round(plan.importe)}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-end mt-4 space-x-2 space-y-2">
                                    <button className="bg-blue-600 text-white py-1 px-4 rounded-lg" onClick={() => handleCambiarPlan(plan)}>
                                        Cambiar plan
                                    </button>
                                    <button className="bg-green-600 text-white py-1 px-4 rounded-lg" onClick={() => handlePagar(plan)}>
                                        Pagar
                                    </button>
                                </div>

                                <svg
                                    onClick={() => toggleInfoServices(plan)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-info-circle-fill ml-4 cursor-pointer"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill="orange"
                                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5 a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                                    />
                                </svg>

                                {mostrarInfo && planSeleccionado === plan && (
                                    <div className="absolute top-16 right-4 bg-white text-white rounded-lg shadow-lg p-4 w-full max-w-md">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-black">Contenido del plan</h3>
                                            <svg
                                                onClick={() => toggleInfoServices(plan)}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="red"
                                                className="bi bi-x-circle cursor-pointer"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M16 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-4.5-3.5a.5.5 0 0 0-.707 0L8 8.293 4.207 4.5a.5.5 0 0 0-.707.707L7.293 8l-3.5 3.5a.5.5 0 0 0 .707 .707L8 8.707l3.793 3.793a.5.5 0 0 0 .707-.707L8.707 8l3.5-3.5a.5.5 0 0 0 0-.707z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-500" id="contenido1Card">
                                            {item1.plan}
                                        </p>
                                        <p className="text-gray-500" id="contenido2Card">
                                            {item2.plan}
                                        </p>
                                        <p className="text-gray-500" id="contenido3Card">
                                            {item3.plan}
                                        </p>
                                        <p className="text-gray-500" id="contenido4Card">
                                            {item4.plan}
                                        </p>
                                        <p className="text-gray-500" id="contenido5Card">
                                            {item5.plan}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
