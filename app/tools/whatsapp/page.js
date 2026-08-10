"use client";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/GlobalContext";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import WhatsappInbox from "@/components/tools/WhatsappInbox";

const WhatsappPage = () => {
  const { state } = useContext(Context);
  const router = useRouter();
  const pathname = usePathname();

  const { user, isLoading } = state;
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const redirectTo = `${baseUrl}${pathname}`;
      router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`);
      return;
    }

    if (user.role !== "admin") {
      router.replace("/user");
      return;
    }

    fetch(`/api/admin/users?admin_uid=${user.id}`)
      .then((res) => {
        if (res.status === 403) {
          router.replace("/user");
          return false;
        }
        if (!res.ok) {
          router.replace("/user");
          return false;
        }
        return true;
      })
      .then((ok) => {
        if (ok) setAllowed(true);
      })
      .catch(() => {
        router.replace("/user");
      })
      .finally(() => setChecking(false));
  }, [user, isLoading, router, pathname]);

  if (isLoading || !user || checking) {
    return <Loading />;
  }

  if (!allowed) {
    return <Loading />;
  }

  return <WhatsappInbox />;
};

export default WhatsappPage;
