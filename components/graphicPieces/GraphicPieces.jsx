"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

const GraphicPieces = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropDownValue, setDropDownValue] = useState("Seleccionar el servicio");

  const handleChangeDropDownValue = (e) => {
    setDropDownValue(e.target.id);
    setOpenDropDown(false);
  };

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    message: "",
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

  return (
    <div className="flex flex-col justify-center items-center space-y-16 pb-20 w-full">
      <div className="z-10 pt-40 pb-10">
        <h1 className="text-6xl font-medium">Piezas Graficas</h1>
      </div>
      <div className="grid place-items-center gap-14 w-full">
        {/* DROPDOWN */}
        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-col justify-center items-start relative pt-1">
            <div
              onClick={() => setOpenDropDown(!openDropDown)}
              className={`border w-full py-3 px-6 min-w-[330px] rounded-md drop-shadow-lg bg-white cursor-pointer overflow-y-hidden ${
                openDropDown ? "border-[#0853FC]" : ""
              }`}
            >
              <span className="text-[#0853FC] text-2xl font-medium">
                Seleccionar el servicio
              </span>
            </div>
            <AnimatePresence>
              {openDropDown && (
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="z-20 border w-full py-3 px-4 rounded-md outline-[#0853FC] drop-shadow-lg bg-white flex flex-col justify-start items-start absolute top-[64px] gap-0.5 max-h-40 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#0853FC]"
                  onMouseLeave={() => setOpenDropDown(false)}
                >
                  <span
                    className="hover:bg-[#0853FC]/20 text-[#0853FC] hover:text duration-300 cursor-pointer ease-in-out w-full p-0.5 px-2 rounded-md text-xl"
                    id="Desarrollo Web"
                    onClick={(e) => handleChangeDropDownValue(e)}
                  >
                    Desarrollo Web
                  </span>
                  <span
                    className="hover:bg-[#0853FC]/20 text-[#0853FC] hover:text duration-300 cursor-pointer ease-in-out w-full p-0.5 px-2 rounded-md text-xl"
                    id="Community Manager"
                    onClick={(e) => handleChangeDropDownValue(e)}
                  >
                    Community Manager
                  </span>
                  <span
                    className="hover:bg-[#0853FC]/20 text-[#0853FC] hover:text duration-300 cursor-pointer ease-in-out w-full p-0.5 px-2 rounded-md text-xl"
                    id="Analizamos tu negocio"
                    onClick={(e) => handleChangeDropDownValue(e)}
                  >
                    Analizamos tu negocio
                  </span>
                  <span
                    className="hover:bg-[#0853FC]/20 text-[#0853FC] hover:text duration-300 cursor-pointer ease-in-out w-full p-0.5 px-2 rounded-md text-xl"
                    id="Diseño Grafico"
                    onClick={(e) => handleChangeDropDownValue(e)}
                  >
                    Diseño Grafico
                  </span>
                  <span
                    className="hover:bg-[#0853FC]/20 text-[#0853FC] hover:text duration-300 cursor-pointer ease-in-out w-full p-0.5 px-2 rounded-md text-xl"
                    id="Gestion de redes"
                    onClick={(e) => handleChangeDropDownValue(e)}
                  >
                    Gestion de redes
                  </span>
                  <span
                    className="hover:bg-[#0853FC]/20 text-[#0853FC] hover:text duration-300 cursor-pointer ease-in-out w-full p-0.5 px-2 rounded-md text-xl"
                    id="Marketing"
                    onClick={(e) => handleChangeDropDownValue(e)}
                  >
                    Marketing
                  </span>
                  <span
                    className="hover:bg-[#0853FC]/20 text-[#0853FC] hover:text duration-300 cursor-pointer ease-in-out w-full p-0.5 px-2 rounded-md text-xl"
                    id="Identidad de marca"
                    onClick={(e) => handleChangeDropDownValue(e)}
                  >
                    Identidad de marca
                  </span>
                  <span
                    className="hover:bg-[#0853FC]/20 text-[#0853FC] hover:text duration-300 cursor-pointer ease-in-out w-full p-0.5 px-2 rounded-md text-xl"
                    id="Edicion audiovisual"
                    onClick={(e) => handleChangeDropDownValue(e)}
                  >
                    Edicion audiovisual
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* TITLE */}
        <div>
          <h2 className="text-2xl">
            Servicio seleccionado:{" "}
            <span className="text-[#0853FC]">
              {dropDownValue === "Seleccionar el servicio" ? "" : dropDownValue}
            </span>
          </h2>
        </div>

        {/* FORM */}
        <div className="max-w-screen-md w-full drop-shadow-lg p-2">
          <div className="w-full h-3 rounded-t-md bg-[#0853FC]" />
          <div className="bg-white rounded-b-md grid place-items-center p-6">
            <h3 className="text-2xl font-medium">Contanos tu Proyecto</h3>
            <form
              onSubmit={formik.handleSubmit}
              className="w-full grid place-items-center gap-6"
            >
              <div className="flex flex-row justify-between items-start gap-4 w-full">
                <div className="grid gap-[14px] w-full">
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
                    <label className="text-base px-1 text-[#0853FC]">
                      Telefono
                    </label>
                    <input
                      type="number"
                      name="phone"
                      value={formik.values.phone || ""}
                      onChange={formik.handleChange}
                      className="border w-full py-3 px-4 rounded-md outline-[#0853FC] drop-shadow-lg"
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-base px-1 text-[#0853FC]">
                      Agregar archivo para editar (PDF/JPG/PNG)
                    </label>
                    <input
                      type="file"
                      multiple
                      className="border rounded-md outline-none w-full text-gray-500 file:py-3 file:px-4 file:mr-2 file:bg-[#0853FC] file:border-none file:text-white file:font-medium cursor-pointer file:cursor-pointer shadow-lg"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="w-full">
                    <label className="text-base px-1 text-[#0853FC]">
                      Mensaje
                    </label>
                    <textarea
                      type="text"
                      name="message"
                      value={formik.values.message || ""}
                      onChange={formik.handleChange}
                      rows={12}
                      className="border w-full py-3 px-4 rounded-md outline-[#0853FC] drop-shadow-lg resize-none"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#0853FC] w-full p-2 text-white font-medium rounded-tl-md rounded-br-md"
              >
                ENVIAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphicPieces;
