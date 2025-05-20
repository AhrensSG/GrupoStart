"use client";

import GlobalContext from "@/app/context/GlobalContext";
import React from "react";
import { Toaster } from "sonner";
import CookiesModal from "../cookies/CookiesModal";

const Wrapper = ({ children }) => {
  return (
    <GlobalContext>
      <Toaster
        richColors
        visibleToasts={3}
        duration={5000}
        position="bottom-right"
        expand={false}
      />
      {children}
      <CookiesModal />
    </GlobalContext>
  );
};

export default Wrapper;
