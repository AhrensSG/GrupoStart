import Footer from "@/components/footer/Footer";
import GraphicPieces from "@/components/graphicPieces/GraphicPieces";
import NavBar from "@/components/navbar/NavBar";
import React from "react";
import { Toaster } from "sonner";

const GraphicPiecesPage = () => {
  return (
    <main className="bg-slate-100 w-full h-full">
      <div className="w-full relative flex flex-col justify-center items-center">
        <NavBar />
        <div className="bg-[url('/GraphicPieces.svg')] w-full h-[400px] absolute top-0 bg-cover bg-top" />
        <section className="w-full flex flex-row justify-center items-center">
          <GraphicPieces />
        </section>
        <Footer />
      </div>
    </main>
  );
};

export default GraphicPiecesPage;
