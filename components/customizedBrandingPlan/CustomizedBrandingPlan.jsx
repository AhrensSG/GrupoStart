import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Context } from "@/app/context/GlobalContext";
import Modal from "../login/Modal";
import { addProductToCart } from "@/app/context/actions";
import { useRouter } from "next/navigation";

const CustomizedBrandingPlan = () => {
  const [totalCost, setTotalCost] = useState(0);
  const { state, dispatch } = useContext(Context);
  const [packsQuantity, setPacksQuantity] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [planCost, setPlanCost] = useState(0); // Nuevo estado para el costo del plan
  const [selectedPlan, setSelectedPlan] = useState(""); // Estado para el plan seleccionado
  const router = useRouter()

  const increasePosts = () => {
    return setPacksQuantity((prevPosts) => prevPosts + 1);
  };

  const handleBuyNow = async (cantPacks, tipoPlan, price) => {
    if (!state.user) {
      return setShowLogin(true);
    }
    const data = {
      id: 11,
      name: "Pack Personalizado",
      cantPacks,
      tipoPlan,
      price,
      items: 1,
      productType: "customPack",
    };
    if (state.cart?.some((prod) => prod.id === data.id)) {
      toast.info(`Se actualizó el producto en tu carrito!`);
    } else {
      toast.success(`Añadiste ${data.name} a tu carrito!`);
    }
    await addProductToCart(data, dispatch);
    return router.push("/payment");
  };

  const decreasePosts = () => {
    if (packsQuantity === 0) {
      return toast.info("Intenta con el otro botón :)");
    }
    setPacksQuantity((prevPosts) => Math.max(prevPosts - 1, 0));
  };

  const addToCartAndPay = async () => {
    try {
      if (!state.user) {
        setShowLogin(true);
      } else {
        handleBuyNow(packsQuantity, selectedPlan, totalCost);
        toast.info("Seras redirigido a la pagina de pago!");
      }
    } catch (error) {
      return toast.error("Ocurrio un error al solicitar el pago!");
    }
  };

  // Función para calcular el costo total
  const calculateTotalCost = () => {
    let cost = 0;

    // Suma el costo por cada pack
    cost += 3300 * packsQuantity;

    // Agrega el costo del plan seleccionado
    cost += planCost;

    // Actualiza el estado con el costo total
    setTotalCost(cost);
  };

  // Llama a calculateTotalCost cada vez que se actualiza un valor relevante
  useEffect(() => {
    calculateTotalCost();
  }, [packsQuantity, planCost]);

  // Función para manejar el cambio de tipo de plan
  const handlePlanChange = (event) => {
    const selectedPlan = event.target.value;
    setSelectedPlan(selectedPlan);
    if (selectedPlan === "mensual") {
      setPlanCost(800);
    } else if (selectedPlan === "anual") {
      setPlanCost(7800);
    } else if (selectedPlan === "siempre") {
      setPlanCost(45000); // Costo para el plan de por vida
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {showLogin && <Modal setShowLogin={setShowLogin} />}
      <div className="z-10 pt-[111px] pb-[104px]">
        <h1 className="text-6xl font-medium text-white">
          Crea el plan perfecto para vos
        </h1>
      </div>
      <div className="grid place-items-center gap-14 w-full bg-gradient-to-b from-slate-100 via-[#FB8A00] to-slate-100">
        <div className="bg-white max-w-screen-md w-full grid place-items-center p-4 py-10">
          <div className="w-full max-w-[500px] space-y-8">
            <h2 className="text-xl font-medium">
              Elegí la cantidad que deseas
            </h2>
            <div className="space-y-4">
              {/* POSTS QUANTITY */}
              <div className="flex flex-row justify-start items-center gap-4">
                <span className="max-w-48 w-full font-medium">
                  Cantidad de Packs:
                </span>
                <div
                  className="flex flex-row items-center justify-between w-20 border-2 border-[#FB8A00] rounded p-1"
                >
                  <button onClick={decreasePosts}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 cursor-pointer"
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
                      {packsQuantity * 25}
                    </span>
                  </div>
                  <button onClick={increasePosts}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>
                <span
                  className="text-black cursor-pointer"
                  title="Los packs contienen 25 tarjetas"
                >
                  &nbsp; ? &nbsp;
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-start items-center gap-2">
              <span className="max-w-48 w-full font-medium">
                ¿Qué tipo de plan quieres?
              </span>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="plan"
                  value="mensual"
                  onChange={handlePlanChange}
                  checked={selectedPlan === "mensual"}
                  className="w-5 h-5"
                />
                <label htmlFor="mensual">Mensual</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="plan"
                  value="anual"
                  onChange={handlePlanChange}
                  checked={selectedPlan === "anual"}
                  className="w-5 h-5"
                />
                <label htmlFor="anual">Anual</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="plan"
                  value="siempre"
                  onChange={handlePlanChange}
                  checked={selectedPlan === "siempre"}
                  className="w-5 h-5"
                />
                <label htmlFor="siempre">De por vida</label>
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

export default CustomizedBrandingPlan;


