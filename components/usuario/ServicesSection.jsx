import Image from "next/image";
import Link from "next/link";

export default function ServicesSection({ user }) {
    return (
        <section
            className="w-full flex flex-col space-y-6"
            id="sectionPlansShow"
        >
            {/* Subtitulo y ChatWsp */}
            <div className="flex justify-between items-center w-full relative">
                <h2
                    className="font-bold text-orange-500 text-2xl"
                    id="subMisServicios"
                >
                    Mis Servicios
                </h2>
                {/* <div
                    className="flex ml-auto space-x-4"
                    id="actionButtonsServices"
                >
                    <Link href="/payment">
                        <button
                            className="bg-orange-500 text-white p-5 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none transition-all duration-300 ease-in-out w-16 h-16 flex items-center justify-center"
                            aria-label="Ir a la página de pago"
                            title="Ir al carrito"
                        >
                            <Image
                                src="/cartIconUser.png"
                                alt="Icono de carrito"
                                width={35}
                                height={35}
                            />
                        </button>
                    </Link>
                </div> */}
            </div>
            <div className="rounded-xl bg-white shadow-lg p-6">
                <h2 className="text-lg font-bold text-orange-500 justify-start ml-2 my-1">
                    Órdenes
                </h2>
                {user && user?.Orders?.length > 0 ? (
                    <div className="flex flex-col space-y-4">
                        {user.Orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-lg shadow-lg p-6 w-full"
                            >
                                <h2 className="text-lg font-bold text-orange-500">
                                    Orden #{order.orderId}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Estado: {order.status === "Paid" ? "Pagado" : "Indefinido"}
                                </p>
                                <p className="text-md text-blue-600 font-bold">
                                    Total: $
                                    {parseFloat(order.totalPrice).toFixed(2)}
                                </p>
                                <h3 className="text-md font-semibold mt-4">
                                    Productos
                                </h3>
                                <ul className="list-disc pl-5">
                                    {order.OrderProducts?.length > 0 && order.OrderProducts?.map((product) => (
                                        <li
                                            key={product.id}
                                            className="border-b py-2"
                                        >
                                            <p className="text-md font-bold text-gray-700">
                                                {product.name}
                                            </p>
                                            <p className="text-gray-500">
                                                Cantidad: {product.items}
                                            </p>

                                            {typeof product.data ===
                                            "string" ? (
                                                <p className="text-gray-500 italic">
                                                    Descripción: {product.data}
                                                </p>
                                            ) : Array.isArray(product.data) && product.data?.length > 0 ? (
                                                <ul className="list-disc pl-5 mt-2">
                                                    {product.data.map(
                                                        (item, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-gray-500"
                                                            >
                                                                <p>
                                                                    <strong>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </strong>
                                                                </p>
                                                                {/* <p>
                                                                    {
                                                                        item.description
                                                                    }
                                                                </p> */}
                                                                <p>
                                                                    {item.quantity >
                                                                    100
                                                                        ? ``
                                                                        : `Precio: $ ${parseFloat(
                                                                              item.price ||
                                                                                  0
                                                                          ).toFixed(
                                                                              2
                                                                          )}`}
                                                                </p>
                                                                <p>
                                                                    {item.quantity >
                                                                    100
                                                                        ? `Precio: $ ${item.quantity.toFixed(
                                                                              2
                                                                          )}`
                                                                        : `Cantidad: ${item.quantity}`}
                                                                </p>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            ) : null}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">
                        No tienes órdenes registradas.
                    </p>
                )}
            </div>
        </section>
    );
}
