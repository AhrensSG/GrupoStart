import { Suspense } from "react";
import LandingPage from "@/components/landing/LandingPage";

export const metadata = {
  title: "Sistema de Seguimiento de Leads | GrupoStart",
  description: "Sistema de seguimiento de leads automatizado",
};

export default function Landing() {
  return (
    <Suspense fallback={<div />}>
      <LandingPage />
    </Suspense>
  );
}
