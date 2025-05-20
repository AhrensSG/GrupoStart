import { Roboto } from "next/font/google";
import "./globals.css";
import Wrapper from "@/components/wrapper/Wrapper";
import Script from "next/script";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "GrupoStart",
  description: "GrupoStart Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>GrupoStart</title>
        <meta name="description" content="GrupoStart Solutions" />
      </head>
      <body className={roboto.className}>
        <Wrapper>{children}</Wrapper>

        {/* ✅ Meta Pixel Facebook sin <noscript> para evitar errores SSR */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1335692007452497');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* ✅ Fin Meta Pixel */}
      </body>
    </html>
  );
}
