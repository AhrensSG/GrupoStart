import { Context } from "@/app/context/GlobalContext";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
    addProductsToOrder,
    createOrder,
    createPayment,
    deleteDeliveryCostInformation,
    getDeliveryCost,
    removeProductFromCart,
    savePaymentInformation,
    savePreferenceID,
    updateUser,
} from "@/app/context/actions";
import Loader from "../Loader";
import PaymentModal from "../payment/PaymentModal";
// import Modal from "../login/Modal";

const CartSection = () => {
    const { state, dispatch } = useContext(Context);
    const [loader, setLoader] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    // const [showLogin, setShowLogin] = useState(false);
    const totalCartPrice = state?.cart?.reduce((acc, curr) => acc + curr.price, 0) || 0;

    const initialValues = state.user || {
        name: "",
        surname: "",
        email: "",
        phone: "",
        country: "Argentina",
        province: "",
        postalCode: "",
        fullAddress: "",
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values) => {
            // if (!state.user) {
            //   setShowLogin(true);
            //   return toast.info("¡Inicia sesión y continúa!")
            // }

            if (
                values.name === "" ||
                values.surname === "" ||
                values.email === "" ||
                !values.email ||
                values.phone === "" ||
                !values.phone ||
                values.province === "" ||
                !values.province ||
                values.postalCode === "" ||
                !values.postalCode ||
                values.fullAddress === "" ||
                !values.fullAddress
            ) {
                return toast.info("Recuerda completar todos los campos!");
            }
            setLoader(true);
            await updateUser(values, dispatch);
            toast.success("Solicitud realizada!", {
                description: "Pronto recibiras el documento",
            });
            try {
                values.country = "Argentina";
                await savePaymentInformation(values, dispatch);
            } catch (error) {
                return toast.error("Ocurrió un error al intentar guardar la información", {
                    description: "Intenta nuevamente en unos minutos",
                });
            }

            let delivery;
            try {
                if (state.payment?.totalWeight && state.payment?.totalVolume && values.postalCode) {
                    delivery = await getDeliveryCost(state.payment, values.postalCode, dispatch);
                }
            } catch (error) {
                return toast.error("Ocurrió un error al intentar cotizar el envío", {
                    description: "Verifica el Codigo Postal",
                });
            }

            try {
                // const deli = delivery ? Number(delivery.tarifaConIva.total) : 0;
                const deli = 0;
                state.payment = { ...state.payment, ...values };
                const orderData = {
                    ...state,
                    cartTotalPrice: state?.cart?.reduce((acc, curr) => acc + curr.price, 0),
                    cartPrice: state?.cart?.reduce((acc, curr) => acc + curr.price, 0),
                };

                const order = await createOrder(orderData, deli, dispatch);
                const orderProductsData = {
                    orderId: order.id,
                    products: state.cart,
                };
                await addProductsToOrder(orderProductsData);
                state.user.postalCode = values.postalCode;
                const user = state?.user;
                const cart = state?.cart;
                const deliveryCost = deli;

                const paymentInfo = await createPayment(user, cart, deliveryCost, order.id);
                savePreferenceID(paymentInfo.id, dispatch);
                paymentInfo.id ? setShowPaymentModal(true) : setShowPaymentModal(false);
            } catch (error) {
                setLoader(false);
                return toast.error("Ocurrio un error al procesar la orden de compra", {
                    description: "Intenta nuevamente mas tarde",
                });
            } finally {
                setLoader(false);
            }

            setLoader(false);
        },
    });

    useEffect(() => {}, [state.cart]);

    useEffect(() => {
        return () => deleteDeliveryCostInformation(dispatch);
    }, []);

    useEffect(() => {
        return () => savePreferenceID(false, dispatch);
    }, []);

    return (
        <div className="bg-[#EEEEEE] w-full flex flex-col justify-center items-center p-2 py-10">
            {/* {showLogin === true && <Modal setShowLogin={setShowLogin} />} */}
            {/* PAYMENT MODAL */}
            {showPaymentModal ? <PaymentModal setShowPaymentModal={setShowPaymentModal} /> : null}
            <div className="max-w-screen-lg w-full">
                {/* TOP SECTION  */}
                <div className="w-full flex flex-row justify-between mb-4">
                    <span className="text-2xl text-[#0853FC] font-medium">Productos</span>
                </div>

                {/* MAIN CONTAINER */}
                <div className="max-w-screen-lg w-full flex xs:flex-col max-xs:flex-col xs:justify-items-center max-xs:justify-items-center max-xs:space-y-3 xs:space-y-4">
                    {/* Tarjeta de Productos */}
                    <div className="w-full mr-4">
                        <div className="bg-white shadow-md shadow-[#0853FC]/40 p-4 border border-[#0853FC] rounded-md">
                            <div className="overflow-y-scroll scrollbar-thin max-h-74">
                                {state.cart?.length > 0 ? (
                                    state.cart.map((prod) => {
                                        if (prod.productType === "course") {
                                            return (
                                                <CourseCard
                                                    key={prod.id}
                                                    id={prod.id}
                                                    dispatch={dispatch}
                                                    name={prod.name}
                                                    duration={prod.duration}
                                                    type={prod.type}
                                                    price={prod.price}
                                                />
                                            );
                                        } else {
                                            return <PackCard key={prod.id} id={prod.id} dispatch={dispatch} name={prod.name} price={prod.price} />;
                                        }
                                    })
                                ) : (
                                    <div className="w-full h-full grid place-items-center text-xl font-medium text-black/50">SIN PRODUCTOS</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Resumen (Sticky) */}
                    <span className="text-2xl text-[#0853FC] font-medium">Resumen</span>
                    <div className="max-xs:w-full top-10 xs:w-full">
                        <div className="bg-white shadow-md shadow-[#0853FC]/40 p-4 border border-[#0853FC] rounded-md">
                            <div className="text-xl font-normal flex flex-row justify-between w-full">
                                <span>SUBTOTAL:</span>
                                <span> $ {(totalCartPrice - (totalCartPrice * 0.21))?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="text-xl font-normal uppercase flex flex-row justify-between w-full">
                                <span>Impuestos, IVA y otros:</span>
                                <span>
                                    {" "}
                                    ${" "}
                                    {(totalCartPrice * 0.21)?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="text-xl font-medium flex flex-row justify-between w-full">
                                <span>PRECIO FINAL:</span>
                                <span>
                                    {" "}
                                    ${" "}
                                    {totalCartPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FINAL PRICE SECTION */}
                <div className="max-w-screen-lg bg-white w-full shadow-md shadow-[#0853FC]/40 px-4 py-6 mt-4 border border-[#0853FC] rounded-md flex flex-row justify-between">
                    <span className="text-xl font-medium">TOTAL A PAGAR: </span>
                    <span className="text-xl font-medium">
                        ${" "}
                        {totalCartPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>

                {/* PAYMENT INFORMATION SECTION */}
                <div className="max-w-screen-lg bg-white w-full shadow-md shadow-[#0853FC]/40 px-20 py-6 mt-4 border border-[#0853FC] rounded-md flex flex-col justify-center items-center md:gap-8 xs:gap-12 max-xs:space-y-1">
                    <span className="text-xl font-medium">Información de compra</span>
                    {/* FORM */}
                    <form onSubmit={formik.handleSubmit} className="w-full grid place-items-center gap-8">
                        <div className="w-full flex xs:flex-row max-xs:flex-col xs:justify-around max-xs:justify-center max-xs:space-y-2 items-center">
                            <div className="max-w-72 w-full flex flex-col gap-5 xs:p-2 md:p-0">
                                <div className="flex flex-row gap-2 justify-start items-center">
                                    <div className="border-2 border-[#FB8A00] px-2 rounded-full">
                                        <span className="text-[#FB8A00] text-lg">1</span>
                                    </div>
                                    <span className="text-lg">Información personal</span>
                                </div>
                                <div className="flex flex-col w-full max-w-72 gap-4">
                                    <div className="w-full flex flex-row gap-2">
                                        <div className="w-full flex flex-col">
                                            <label className="text-sm pl-1 text-gray-500">Nombre</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formik.values.name || ""}
                                                onChange={formik.handleChange}
                                                className="p-1.5 px-3 border-2 rounded-md outline-none w-full"
                                            />
                                        </div>
                                        <div className="w-full flex flex-col">
                                            <label className="text-sm pl-1 text-gray-500">Apellido</label>
                                            <input
                                                type="text"
                                                name="surname"
                                                value={formik.values.surname || ""}
                                                onChange={formik.handleChange}
                                                className="p-1.5 px-3 border-2 rounded-md outline-none w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <label className="text-sm pl-1 text-gray-500">Correo electrónico</label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={formik.values.email || ""}
                                            onChange={formik.handleChange}
                                            className="p-1.5 px-3 border-2 rounded-md outline-none w-full"
                                        />
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <label className="text-sm pl-1 text-gray-500">Teléfono</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            value={formik.values.phone || ""}
                                            onChange={formik.handleChange}
                                            className="p-1.5 px-3 border-2 rounded-md outline-none w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="max-w-72 w-full flex flex-col gap-5 xs:p-2 md:p-0">
                                <div className="flex flex-row gap-2 justify-start items-center">
                                    <div className="border-2 border-[#FB8A00] px-2 rounded-full">
                                        <span className="text-[#FB8A00] text-lg">2</span>
                                    </div>
                                    <span className="text-lg">Información de envío</span>
                                </div>
                                <div className="flex flex-col w-full max-w-72 gap-4">
                                    <div className="w-full flex flex-col">
                                        <label className="text-sm pl-1 text-gray-500">País</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={"Argentina"}
                                            disabled
                                            className="p-1.5 px-3 border-2 rounded-md outline-none w-full"
                                        />
                                    </div>
                                    <div className="w-full flex flex-row gap-2">
                                        <div className="w-full flex flex-col">
                                            <label className="text-sm pl-1 text-gray-500">Provincia</label>
                                            <input
                                                type="text"
                                                name="province"
                                                value={formik.values.province || ""}
                                                onChange={formik.handleChange}
                                                className="p-1.5 px-3 border-2 rounded-md outline-none w-full"
                                            />
                                        </div>
                                        <div className="w-full flex flex-col">
                                            <label className="text-sm pl-1 text-gray-500">Código Postal</label>
                                            <input
                                                type="number"
                                                name="postalCode"
                                                value={formik.values.postalCode || ""}
                                                onChange={formik.handleChange}
                                                className="p-1.5 px-3 border-2 rounded-md outline-none w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <label className="text-sm pl-1 text-gray-500">Calle / Altura</label>
                                        <input
                                            type="text"
                                            name="fullAddress"
                                            value={formik.values.fullAddress || ""}
                                            onChange={formik.handleChange}
                                            className="p-1.5 px-3 border-2 rounded-md outline-none w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="max-w-52 w-full h-11 p-2 text-lg font-bold text-white bg-[#FB8A00] rounded-md">
                            {loader ? <Loader size={26} /> : "Ir al Pago"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const CourseCard = ({ id, name, duration, type, price, dispatch }) => {
    return (
        <div className="relative flex flex-row max-w-[580px] w-full gap-4 border rounded-md shadow-md">
            <button onClick={() => removeProductFromCart({ id }, dispatch)} className="absolute text-xs top-0.5 right-1.5 text-gray-600">
                x
            </button>
            <Image src={"/Course1.svg"} width={300} height={250} alt="Course Image" className="rounded-l-md" />
            <div className="flex flex-col justify-between w -full p-1">
                <span className="text-xl font-medium">{name}</span>
                <p className="text-lg font-medium">
                    Duracion: <br />
                    <span className="font-normal">( {duration} )</span>
                </p>
                <p className="text-lg font-medium">
                    Modalidad: <br />
                    <span className="font-normal">{type}</span>
                </p>
                <p className="text-lg font-medium">
                    Precio: <br />
                    <span className="font-normal">$ {price}</span>
                </p>
            </div>
        </div>
    );
};

const PackCard = ({ id, name, price, dispatch }) => {
    return (
        <div className="relative flex flex-row max-w-[580px] w-full gap-4 border rounded-md shadow-md">
            <button onClick={() => removeProductFromCart({ id }, dispatch)} className="absolute text-xs top-0.5 right-1.5 text-gray-600">
                x
            </button>
            <div className="p-4 flex flex-row justify-between items-center w-full">
                <span className="text-xl font-medium">{name}</span>
                <p className="text-xl font-medium">
                    Precio: <span className="font-normal">$ {price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </p>
            </div>
        </div>
    );
};

const AddsPackCard = ({ id, name, price, post, reels, IgyFace, carrucel, efemerides, adds, dispatch }) => {
    return (
        <div className="relative flex flex-row max-w-[580px] w-full gap-4 border rounded-md shadow-md">
            <button onClick={() => removeProductFromCart({ id }, dispatch)} className="absolute text-xs top-0.5 right-1.5 text-gray-600">
                x
            </button>
            <div className="p-4 flex flex-row justify-between items-center w-full">
                <span className="text-xl font-medium">{name}</span>
                <p className="text-xl font-medium">
                    Precio: <span className="font-normal">$ {price}</span>
                </p>
            </div>
        </div>
    );
};

export default CartSection;
