"use client";
import Usuario from "@/components/usuario/Usuario";
import React, { useContext, useEffect } from "react";
import { Context } from "../context/GlobalContext";
import Loading from "@/components/loading/Loading";
import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const UserPage = () => {
  const { state } = useContext(Context);
  const router = useRouter();
  const pathname = usePathname();

  const { user, isLoading } = state;

  useEffect(() => {
    if (!isLoading && !user) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const fullPath = `${pathname}?section=servicios`;
      const redirectTo = `${baseUrl}${fullPath}`;

      router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`);
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading || !user) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Usuario data={user} />
    </Suspense>
  );
};

export default UserPage;
