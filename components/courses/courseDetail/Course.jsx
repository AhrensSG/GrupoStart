"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Context } from "@/app/context/GlobalContext";
import { toast } from "sonner";
import Modal from "@/components/login/Modal";
import { useRouter } from "next/navigation";
import { addProductToCart } from "@/app/context/actions";

const Course = ({
  id = 1,
  name = "Desarrollo Web",
  description = "Curso de desarrollo Web",
  duration = "3 meses",
  type = "100% virtual",
}) => {
  const { state, dispatch } = useContext(Context);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  const handleBuyNow = async () => {
    if (!state.user) {
      return setShowLogin(true);
    }
    const data = {
      id,
      name,
      description,
      duration,
      type,
      price: 10000,
      items: 1,
      productType: "course",
    };
    if (state.cart?.some((prod) => prod.id === id)) {
      toast.info(`Se actualizó el producto en tu carrito!`);
    } else {
      toast.success(`Añadiste ${name} a tu carrito!`);
    }
    await addProductToCart(data, dispatch);
    return router.push("/payment");
  };

  useEffect(() => {}, [state.user]);
  console.log(state)

  return (
    <div className="py-20 p-2 grid place-items-center gap-10">
      {showLogin === true && <Modal setShowLogin={setShowLogin} />}
      <h1 className="text-4xl font-medium text-[#0853FC]">Nombre del curso</h1>
      <div className="relative">
        <Image
          src={"/CourseDetail.svg"}
          width={1193}
          height={628}
          alt="CourseImage"
        />
        <Image
          src={"/YTIcon.svg"}
          width={150}
          height={150}
          alt="YTIcon"
          className="absolute top-[40%] left-[42.5%]"
        />
      </div>
      <div className="w-full flex flex-row justify-between">
        <ol className="list-disc pl-5 text-2xl font-medium text-[#FB8A00] space-y-2">
          <li>Figma ipsum component variant main layer</li>
          <li>Strikethrough create ipsum arrow overflow </li>
          <li>Boolean effect edit union blur fill line slice</li>
          <li>Figma ipsum component variant main layer</li>
          <li>Strikethrough create ipsum arrow overflow </li>
          <li>Boolean effect edit union blur fill line slice</li>
        </ol>
        <ol className="list-disc pl-5 text-2xl font-medium text-[#FB8A00] space-y-2">
          <li>Figma ipsum component variant main layer</li>
          <li>Strikethrough create ipsum arrow overflow </li>
          <li>Boolean effect edit union blur fill line slice</li>
          <li>Figma ipsum component variant main layer</li>
          <li>Strikethrough create ipsum arrow overflow </li>
          <li>Boolean effect edit union blur fill line slice</li>
        </ol>
      </div>
      <button
        onClick={handleBuyNow}
        className="border-2 border-[#FB8A00] text-[#FB8A00] p-2 px-10 text-3xl font-medium rounded-md shadow-md shadow-[#FB8A00] mt-10"
      >
        COMPRAR
      </button>
    </div>
  );
};

export default Course;
