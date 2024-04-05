"use client";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "sonner";

const DesktopBusinessAnalysisSection = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropDownValue, setDropDownValue] = useState("Seleccionar");

  const handleChangeDropDownValue = (e) => {
    setDropDownValue(e.target.id);
    setOpenDropDown(false);
  };

  const initialValues = {
    fullName: "",
    city: "",
    email: "",
    workCategory: "",
    phone: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (
        values.fullName === "" ||
        values.email === "" ||
        values.city === "" ||
        values.workCategory === "" ||
        values.phone === "" ||
        dropDownValue === "Seleccionar"
      ) {
        return toast.info("Recuerda completar todos los campos!");
      } else {
        return toast.success("Solicitud realizada!", {
          description: "Pronto recibiras el documento",
        });
      }
    },
  });
  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-16">
      <div>
        <h2 className="text-4xl font-medium text-[#0853FC] text-center">
          Solicita tu documento explicativo gratuito
        </h2>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-row justify-center items-start w-full gap-20"
      >
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <label className="text-base px-1 text-[#0853FC]">
              Nombre y Apellido
            </label>
            <input
              type="text"
              name="fullName"
              value={formik.values.fullName || ""}
              onChange={formik.handleChange}
              className="border w-full py-3 px-4 rounded-md outline-[#0853FC] drop-shadow-lg"
            />
          </div>
          <div className="w-full">
            <label className="text-base px-1 text-[#0853FC]">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email || ""}
              onChange={formik.handleChange}
              className="border w-full py-3 px-4 rounded-md outline-[#0853FC] drop-shadow-lg"
            />
          </div>
          <div className="w-full">
            <label className="text-base px-1 text-[#0853FC]">Rubro</label>
            <input
              type="text"
              name="workCategory"
              value={formik.values.workCategory || ""}
              onChange={formik.handleChange}
              className="border w-full py-3 px-4 rounded-md outline-[#0853FC] drop-shadow-lg"
            />
          </div>
          <button
            type="submit"
            className="border w-full py-3 px-4 rounded-md bg-[#FB8A00] text-white font-medium mt-2 drop-shadow-lg"
          >
            Solicitar
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <label className="text-base px-1 text-[#0853FC]">
              Lugar de residencia
            </label>
            <input
              type="text"
              name="city"
              value={formik.values.city || ""}
              onChange={formik.handleChange}
              className="border w-full py-3 px-4 rounded-md outline-[#0853FC] drop-shadow-lg"
            />
          </div>
          <div className="w-full">
            <label className="text-base px-1 text-[#0853FC]">Celular</label>
            <input
              type="number"
              name="phone"
              value={formik.values.phone || ""}
              onChange={formik.handleChange}
              className="border w-full py-3 px-4 rounded-md outline-[#0853FC] drop-shadow-lg"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-start relative pt-1">
            <label className="text-base px-1 text-[#0853FC]">
            ¿Como nos conociste?
            </label>
            <div
              onClick={() => setOpenDropDown(!openDropDown)}
              className={`border w-full py-3 px-4 rounded-md drop-shadow-lg bg-white cursor-pointer overflow-y-hidden ${
                openDropDown ? "border-[#0853FC]" : ""
              }`}
            >
              <span className="text-[#0853FC]">{dropDownValue}</span>
            </div>
            <AnimatePresence>
              {openDropDown && (
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border w-full py-3 px-4 rounded-md outline-[#0853FC] drop-shadow-lg bg-white flex flex-col justify-center items-start absolute top-[78px] gap-0.5"
                  onMouseLeave={() => setOpenDropDown(false)}
                >
                  <span
                    className="hover:bg-[#0853FC]/20 text-[#0853FC] hover:text duration-300 cursor-pointer ease-in-out w-full p-0.5 px-2 rounded-md"
                    id="Facebook"
                    onClick={(e) => handleChangeDropDownValue(e)}
                  >
                    Facebook
                  </span>
                  <span
                    className="hover:bg-[#0853FC]/20 text-[#0853FC] hover:text duration-300 cursor-pointer ease-in-out w-full p-0.5 px-2 rounded-md"
                    id="Instagram"
                    onClick={(e) => handleChangeDropDownValue(e)}
                  >
                    Instagram
                  </span>
                  <span
                    className="hover:bg-[#0853FC]/20 text-[#0853FC] hover:text duration-300 cursor-pointer ease-in-out w-full p-0.5 px-2 rounded-md"
                    id="Google"
                    onClick={(e) => handleChangeDropDownValue(e)}
                  >
                    Google
                  </span>
                  <span
                    className="hover:bg-[#0853FC]/20 text-[#0853FC] hover:text duration-300 cursor-pointer ease-in-out w-full p-0.5 px-2 rounded-md"
                    id="Otros"
                    onClick={(e) => handleChangeDropDownValue(e)}
                  >
                    Otros
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DesktopBusinessAnalysisSection;
