import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import ToggleSwitch from "./auxiliarComponents/ToggleSwitch";
import { logInWithGoogle } from "@/firebase/logInWithGoogle";
import { Context } from "@/app/context/GlobalContext";
import Modal from "../login/Modal";

const CustomizedPlan = () => {
  const [totalCost, setTotalCost] = useState(0);
  const { state, dispatch } = useContext(Context);
  const [dropDownValue, setDropDownValue] = useState("Seleccionar el servicio");
  const [facebookSwitch, setFacebookSwitch] = useState(false);
  const [instagramSwitch, setInstagramSwitch] = useState(false);
  const [TikTokSwitch, setTikTokSwitch] = useState(false);

  const [postsQuantity, setPostsQuantity] = useState(0);
  const [carouselImagesQuantity, setCarouselImagesQuantity] = useState(0);
  const [reelsQuantity, setReelsQuantity] = useState(0);

  const [showLogin, setShowLogin] = useState(false);

  const increasePosts = () => {
    return setPostsQuantity((prevPosts) => prevPosts + 1);
  };

  const decreasePosts = () => {
    if (postsQuantity === 0) {
      return toast.info("Intenta con el otro botón :)");
    }
    setPostsQuantity((prevPosts) => Math.max(prevPosts - 1, 0));
  };

  const increaseCarouselImages = () => {
    return setCarouselImagesQuantity((prevCI) => prevCI + 1);
  };

  const decreaseCarouselImages = () => {
    if (carouselImagesQuantity === 0) {
      return toast.info("Intenta con el otro botón :)");
    }
    setCarouselImagesQuantity((prevCI) => Math.max(prevCI - 1, 0));
  };

  const increaseReels = () => {
    return setReelsQuantity((prevReels) => prevReels + 1);
  };

  const decreaseReels = () => {
    if (reelsQuantity === 0) {
      return toast.info("Intenta con el otro botón :)");
    }
    setReelsQuantity((prevReels) => Math.max(prevReels - 1, 0));
  };

  const addToCartAndPay = async () => {
    try {
      if (!state.user) {
        setShowLogin(true);
      } else {
        toast.info("Seras redirigido a la pagina de pago!");
      }
    } catch (error) {
      return toast.error("Ocurrio un error al solicitar el pago!");
    }
  };

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    message: "",
    efemerides: "",
    adds: 0,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (
        values.fullName === "" ||
        values.email === "" ||
        values.phone === "" ||
        values.message === "" ||
        dropDownValue === "Seleccionar el servicio"
      ) {
        return toast.info(
          "Recuerda completar todos los campos y seleccionar el servicio!"
        );
      } else {
        return toast.success("Solicitud realizada!", {
          description: "Pronto recibiras el documento",
        });
      }
    },
  });
  // Función para calcular el costo total
  const calculateTotalCost = () => {
    let cost = 0;

    // Suma el costo de TikTok si está seleccionado
    if (TikTokSwitch) {
      cost += 7000;
    }

    // Suma el costo por cada posteo
    cost += postsQuantity * 2200;

    // Suma el costo por cada imagen en el carrusel
    cost += carouselImagesQuantity * 1100;

    // Suma el costo si se seleccionan efemérides
    if (formik.values.efemerides === 'yes') {
      cost += 4900;
    }

    // Suma el costo por cada reel
    cost += reelsQuantity * 6800;

    // Suma el presupuesto para campañas ads ingresado por el usuario
    cost += Number(formik.values.adds);

    // Actualiza el estado con el costo total
    setTotalCost(cost);
  };
  // Llama a calculateTotalCost cada vez que se actualiza un valor relevante
  useEffect(() => {
    calculateTotalCost();
  }, [TikTokSwitch, postsQuantity, carouselImagesQuantity, formik.values.efemerides, reelsQuantity, formik.values.adds]);


  return (
    <div className="flex flex-col justify-center items-center w-full">
      {showLogin === true && <Modal setShowLogin={setShowLogin} />}
      <div className="z-10 pt-[111px] pb-[104px]">
        <h1 className="text-6xl font-medium text-white">
          Crea el plan perfecto para vos
        </h1>
      </div>
      <div className="grid place-items-center gap-14 w-full bg-gradient-to-b from-slate-100 via-[#FB8A00] to-slate-100">
        <div className="bg-white max-w-screen-md w-full grid place-items-center p-4 py-10">
          <div className="w-full max-w-[420px] space-y-8">
            <h2 className="text-xl font-medium">
              Elegi que tipo de redes queres que manejemos
            </h2>
            <div className="relative space-y-2">
              <span className="font-medium flex gap-2">
                Instagram y Facebook
                <ToggleSwitch
                  value={instagramSwitch}
                  setValue={setInstagramSwitch}
                />
                <button
                  className="text-black cursor-pointer"
                  title="Elegí las redes que quieres que gestionemos"
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ? &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
              </span>
              <span className="font-medium flex gap-[29px]">
                Tik Tok
                <ToggleSwitch value={TikTokSwitch} setValue={setTikTokSwitch} />
                <button
                  className="text-black cursor-pointer"
                  title="Elegí las redes que quieres que gestionemos"
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ? &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
              </span>
              
            </div>
            <div className="space-y-4">
              {/* POSTS QUANTITY */}
              <div className="flex flex-row justify-start items-center gap-4">
                <span className="max-w-48 w-full font-medium">
                  Cantidad de posteos:
                </span>
                <div
                  className={`flex flex-row items-center justify-between w-20 border-2 border-[#FB8A00] rounded p-1`}
                >
                  <button onClick={decreasePosts}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-5 h-5 cursor-pointer`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                  <div className="w-full flex flex-row justify-center items-center">
                    <span className="text-black/70 font-medium">
                      {postsQuantity}
                    </span>
                  </div>
                  <button onClick={increasePosts}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-5 h-5 cursor-pointer`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  className="text-black cursor-pointer"
                  title="son posteos de una sola imagen, pueden tener distintos objetivos, como ser informativos, de ventas, sobre promociones, dinámicas con el público entre otras"
                >&nbsp; ? &nbsp;
                </button>
              </div>
              {/* CAROUSEL IMAGES QUANTTY */}
              <div className="flex flex-row justify-start items-center gap-4">
                <span className="max-w-48 w-full font-medium">
                  Cantidad de imágenes en el carrusel de tus posteos:
                </span>
                <div
                  className={`flex flex-row items-center justify-between w-20 border-2 border-[#FB8A00] rounded p-1`}
                >
                  <button onClick={decreaseCarouselImages}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-5 h-5 cursor-pointer`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                  <div className="w-full flex flex-row justify-center items-center">
                    <span className="text-black/70 font-medium">
                      {carouselImagesQuantity}
                    </span>
                  </div>
                  <button onClick={increaseCarouselImages}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-5 h-5 cursor-pointer`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  className="text-black cursor-pointer"
                  title="esto es opcional pero altamente recomendable, aquí eligiras cuántas imágenes te gustaría que tuvieran tus posteos, se recomienda un mínimo de 3 imágenes para aparecer repetidamente en el feed de tus seguidores 🙌🏻"
                >&nbsp; ? &nbsp;
                </button>
              </div>
              {/* REELS QUANTITY */}
              <div className="flex flex-row justify-start items-center gap-4">
                <span className="max-w-48 w-full font-medium">
                  Cantidad de reels:
                </span>
                <div
                  className={`flex flex-row items-center justify-between w-20 border-2 border-[#FB8A00] rounded p-1`}
                >
                  <button onClick={decreaseReels}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-5 h-5 cursor-pointer`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                  <div className="w-full flex flex-row justify-center items-center">
                    <span className="text-black/70 font-medium">
                      {reelsQuantity}
                    </span>
                  </div>
                  <button onClick={increaseReels}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-5 h-5 cursor-pointer`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  className="text-black cursor-pointer"
                  title="está opción es también opcional pero muy recomendable, los posteos en formato video son la tendencia del momento ¿Que obtendrás si tildas está opción? Guiones para tus videos y edición para que tu vídeo dure 30 segundos además de asesoramiento y acompañamiento total para que el material que nos entregues sea óptimo"
                >&nbsp; ? &nbsp;
                </button>
              </div>
              {/* EFEMERIDES */}
              <div className="flex flex-row justify-start items-center gap-4">
                <span className="max-w-48 w-full font-medium">
                  ¿Te gustaria agregar efemérides a tu plan?
                </span>
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="efemerides"
                    value="yes"
                    onChange={formik.handleChange}
                    checked={
                      formik.values.efemerides === "yes" ||
                      formik.values.efemerides === true
                    }
                    className="w-5 h-5"
                  />
                  <label className="" htmlFor="yes">
                    Si
                  </label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="efemerides"
                    value="no"
                    onChange={formik.handleChange}
                    checked={
                      formik.values.efemerides === "no" ||
                      formik.values.efemerides === false
                    }
                    className="w-5 h-5"
                  />
                  <label className="" htmlFor="no">
                    No
                  </label>
                </div>
                <button
                  className="text-black cursor-pointer"
                  title="Las efemérides son importantes puesto que son flyers que se postean por ocasiones especiales relacionadas a tu rubro. Por ejemplo si tu empresa es una ferretería un posteo especial por el día del ferretero para hacer sentir especial a todo tu equipo y colegas 🥹"
                >&nbsp; ? &nbsp;
                </button>
              </div>
              {/* CAMPAIGN ADDS */}
              <div className="flex flex-row justify-start items-center gap-2">
                <span className="max-w-60 w-full font-medium">
                  Elegí el presupuesto para tus campañas ADDS:
                </span>
                <div
                  className={`flex flex-row items-center justify-between w-32 border-2 border-[#FB8A00] rounded`}
                >
                  <div className="p-1 px-2 text-gray-500">$</div>
                  <input
                    id="adds"
                    name="adds"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.adds}
                    className="outline-none p-1 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <button
                  className="text-black cursor-pointer"
                  title="esta opción es obligatoria puesto que es una herramienta fundamental para poder promocionar tu proyecto, cuanto mayor presupuesto asignes a esta categoría mayores son las chances de un rápido posicionamiento en las redes 🚀 el monto final invertido en tu cuenta será el total que asignes a esta categoría - el 15% de comisión asignado para el creativo publicitario que realizará tu campaña publicitaria - impuestos"
                >&nbsp; ? &nbsp;
                </button>
              </div>
            </div>
            <div className="text-center w-full bg-[#FB8A00] p-1 text-white font-medium rounded-tl-md rounded-br-md">
              Costo Total: ${totalCost}
            </div>
            <button
              onClick={addToCartAndPay}
              className="text-center w-full bg-[#FB8A00] p-1 text-white font-medium rounded-tl-md rounded-br-md"
            >
              PAGAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizedPlan;
