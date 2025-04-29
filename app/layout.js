"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import GlobalContext from "./context/GlobalContext";
import { Toaster } from "sonner";
import CookiesModal from "@/components/cookies/CookiesModal";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({ children }) {
    return (
        <html title="GrupoStart" description="GrupoStart Solutions" lang="en">
            <body className={roboto.className}>
                <GlobalContext>
                    <Toaster
                        richColors
                        visibleToasts={3}
                        duration={5000}
                        position="bottom-right"
                        expand={false}
                    />
                    {children}
                    <CookiesModal/>
                </GlobalContext>
            </body>
        </html>
    );
}
