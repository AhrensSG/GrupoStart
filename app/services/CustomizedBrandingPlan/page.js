"use client";
import CustomizedBrandingPlan from "@/components/customizedBrandingPlan/CustomizedBrandingPlan";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import React from "react";

const CustomizedPlanPage = () => {
  return (
    <main className="bg-slate-100 w-full h-full">
      <div className="w-full relative flex flex-col justify-center items-center">
        <NavBar />
        <div className="bg-[url('/CustomizedPLan.svg')] w-full h-[400px] absolute top-0 bg-cover bg-no-repeat bg-top" />
        <section className="w-full flex flex-row justify-center items-center">
          <CustomizedBrandingPlan />
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default CustomizedPlanPage;
