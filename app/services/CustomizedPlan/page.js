"use client";
import GlobalContext from "@/app/context/GlobalContext";
import CustomizedPlan from "@/components/customizedPlan/CustomizedPlan";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import React from "react";
import { Toaster } from "sonner";

const CustomizedPlanPage = () => {
  return (
    <main className="bg-slate-100 w-full h-full">
      <div className="w-full relative flex flex-col justify-center items-center">
        <NavBar />
        <div className="bg-[url('/CustomizedPLan.svg')] w-full h-[400px] absolute top-0 bg-cover bg-no-repeat bg-top" />
        <section className="w-full flex flex-row justify-center items-center">
          <CustomizedPlan />
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default CustomizedPlanPage;
