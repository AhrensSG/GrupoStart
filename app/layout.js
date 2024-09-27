"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import GlobalContext from "./context/GlobalContext";
import { Toaster } from "sonner";
import ResponsiveContainer from "@/components/responsiveComp/ResponsiveContainer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html title="GrupoStart" description="GrupoStart Solutions" lang="en">
      <GlobalContext>
        <Toaster
          richColors
          visibleToasts={3}
          duration={5000}
          position="bottom-right"
          expand={false}
        />
        <ResponsiveContainer>
          <body className={roboto.className}>{children}</body>
        </ResponsiveContainer>
      </GlobalContext>
    </html>
  );
}
