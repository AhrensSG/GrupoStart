import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { logInWithGoogle } from "@/firebase/logInWithGoogle";
import { Context } from "@/app/context/GlobalContext";
import Modal from "../login/Modal";

const CustomizedBrandingPlan = () => {
  const [totalCost, setTotalCost] = useState(0);
  const { state, dispatch } = useContext(Context);
  const [dropDownValue, setDropDownValue] = useState("Seleccionar el servicio");
  const [postsQuantity, setPostsQuantity] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [planCost, setPlanCost] = useState(0); // Nuevo estado para el costo del plan

  const increasePosts = () => {
    return setPostsQuantity((prevPosts) => prevPosts + 1);
  };

  const decreasePosts = () => {
    if (postsQuantity === 0) {
      return toast.info("Intenta con el otro botón :)");
    }
    setPostsQuantity((prevPosts) => Math.max(prevPosts - 1, 0));
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

    // Suma el costo por cada posteo
    cost += 3300 * postsQuantity;

    // Agrega el costo del plan seleccionado
    cost += planCost;

    // Actualiza el estado con el costo total
    setTotalCost(cost);
  };

  // Llama a calculateTotalCost cada vez que se actualiza un valor relevante
  useEffect(() => {
    calculateTotalCost();
  }, [postsQuantity, planCost]);

  // Función para manejar el cambio de tipo de plan
  const handlePlanChange = (event) => {
    const selectedPlan = event.target.value;
    if (selectedPlan === "yes") {
      setPlanCost(800); // Mensual
    } else if (selectedPlan === "no") {
      setPlanCost(7800); // Anual
    }
  };

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
              Elegi la cantidad que deseas
            </h2>
            <div className="space-y-4">
              {/* POSTS QUANTITY */}
              <div className="flex flex-row justify-start items-center gap-4">
                <span className="max-w-48 w-full font-medium">
                  Cantidad de Packs:
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
                  title="Los packs contienen 25 tarjetas"
                >&nbsp; ? &nbsp;
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-start items-center gap-4">
              <span className="max-w-48 w-full font-medium">
                ¿Qué tipo de plan quieres?
              </span>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="efemerides"
                  value="yes"
                  onChange={(event) => {
                    formik.handleChange(event);
                    handlePlanChange(event);
                  }}
                  checked={
                    formik.values.efemerides === "yes" ||
                    formik.values.efemerides === true
                  }
                  className="w-5 h-5"
                />
                <label className="" htmlFor="yes">
                  Mensual
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="efemerides"
                  value="no"
                  onChange={(event) => {
                    formik.handleChange(event);
                    handlePlanChange(event);
                  }}
                  checked={
                    formik.values.efemerides === "no" ||
                    formik.values.efemerides === false
                  }
                  className="w-5 h-5"
                />
                <label className="" htmlFor="no">
                  Anual
                </label>
              </div>
            </div>
            <div className="text-center w-full bg-[#FB8A00] p-1 text-white font-medium rounded-tl-md rounded-br-md">
              Cantidad de Tarjetas: {postsQuantity * 25}
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

export default CustomizedBrandingPlan;

