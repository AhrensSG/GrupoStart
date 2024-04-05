"use client";
import { useFormik } from "formik";
import React from "react";
import { toast } from "sonner";

const DesktopGraphicDesignSection = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-16">
      <div>
        <h2 className="text-4xl font-medium text-[#0853FC] text-center">
          ¿Qué servicio te gustaría contratar?
        </h2>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="max-w-screen-md w-full grid grid-cols-2 gap-8 place-items-center">
          <Card
            title="Tu logo"
            firstOption={"Manual de identidad simplificada"}
            secondOption={"Manual de identidad estándar"}
            thirdOption={"Manual de identidad completo"}
          />
          <Card
            title="Piezas graficas(Flyer)"
            firstOption={"Tarjetas de presentación personal"}
            secondOption={"Banner"}
          />
          <Card
            title="Audiovisual"
            firstOption={"Manual de identidad simplificada"}
            secondOption={"Manual de identidad estándar"}
            thirdOption={"Manual de identidad completo"}
          />
          <Card title="Contanos tu proyecto" form={true} hover={false} />
        </div>
      </div>
    </div>
  );
};

const Card = ({
  title = "Logo",
  firstOption = false,
  secondOption = false,
  thirdOption = false,
  form = false,
  hover = true,
}) => {
  const initialValues = {
    fullName: "",
    email: "",
    message: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (
        values.fullName === "" ||
        values.email === "" ||
        values.message === ""
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
    <div
      className={`max-w-96 w-full min-h-[301px] bg-white rounded-md drop-shadow-lg flex flex-col justify-start items-center p-8 gap-8  ${
        hover ? "hover:scale-105 duration-300 hover:drop-shadow-2xl" : ""
      }`}
    >
      <h3 className="text-2xl font-medium text-[#0853FC]">{title}</h3>
      {form === false && (
        <div className="w-full space-y-4">
          {firstOption !== false && (
            <span className="w-full flex flex-row justify-start items-center gap-2 text-lg">
              <Icon />
              {firstOption}
            </span>
          )}
          {secondOption !== false && (
            <span className="w-full flex flex-row justify-start items-center gap-2 text-lg">
              <Icon />
              {secondOption}
            </span>
          )}
          {thirdOption !== false && (
            <span className="w-full flex flex-row justify-start items-center gap-2 text-lg">
              <Icon />
              {thirdOption}
            </span>
          )}
        </div>
      )}
      {form === true && (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2 w-full"
        >
          <div className="flex flex-row w-full gap-1.5">
            <input
              type="text"
              name="fullName"
              value={formik.values.fullName || ""}
              onChange={formik.handleChange}
              placeholder="Nombre"
              className="border w-full py-2 px-3 rounded-md outline-[#0853FC] drop-shadow-lg"
            />
            <input
              type="email"
              name="email"
              value={formik.values.email || ""}
              onChange={formik.handleChange}
              placeholder="E-Mail"
              className="border w-full py-2 px-3 rounded-md outline-[#0853FC] drop-shadow-lg"
            />
          </div>
          <div>
            <textarea
              name="message"
              rows="2"
              value={formik.values.message || ""}
              onChange={formik.handleChange}
              placeholder="Mensaje"
              className="resize-none border w-full py-2 px-3 rounded-md outline-[#0853FC] drop-shadow-lg"
            ></textarea>
            <button
              type="submit"
              className="border w-full py-2 px-3 rounded-md bg-[#FB8A00] text-white font-medium mt-2 drop-shadow-lg"
            >
              Solicitar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      viewBox="0 0 26 20"
    >
      <path
        fill="#FB8A00"
        d="M8.917 14.167 22.437.646c.42-.42.955-.63 1.605-.63s1.184.21 1.604.63c.42.42.63.955.63 1.604 0 .65-.21 1.184-.63 1.604L10.521 18.98c-.458.459-.993.688-1.604.688-.611 0-1.146-.23-1.604-.688l-5.959-5.958c-.42-.42-.63-.955-.63-1.604 0-.65.21-1.184.63-1.604.42-.42.955-.63 1.604-.63.65 0 1.185.21 1.605.63l4.354 4.354Z"
      />
    </svg>
  );
};

export default DesktopGraphicDesignSection;
