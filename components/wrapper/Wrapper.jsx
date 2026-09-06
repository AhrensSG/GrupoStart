"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import CookiesModal from "../cookies/CookiesModal";

// Authentication is browser-only; keeping it out of SSR also lets public pages
// render when the optional Firebase environment is not configured.
const GlobalContext = dynamic(() => import("@/app/context/GlobalContext"), {
  ssr: false,
});

const Wrapper = ({ children }) => {
  const pathname = usePathname();

  // The portfolio is a public recruiting page and does not need app auth.
  if (pathname === "/portfolio") {
    return children;
  }

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
