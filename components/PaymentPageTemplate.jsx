import GlobalContext from "@/app/context/GlobalContext";
import React from "react";
import { Toaster } from "sonner";
import PayNavBar from "./navbar/PayNavBar";
import Footer from "./footer/Footer";
import CartSection from "./paymentPage/CartSection";

const PaymentPageTemplate = () => {
    return (
        <main className="bg-slate-100 w-full h-full">
            <div className="w-full relative flex flex-col justify-center items-center">
                <PayNavBar />
                <section className="w-full flex flex-col justify-center items-center bg-white">
                    <CartSection />
                </section>
                <Footer />
            </div>
        </main>
    );
};

export default PaymentPageTemplate;
