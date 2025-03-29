"use client";
import Usuario from "@/components/usuario/Usuario";
import React, { useContext, useEffect } from "react";
import { Context } from "../context/GlobalContext";
import Loading from "@/components/loading/Loading";
import { Suspense } from "react";

const UserPage = () => {
    const { state, dispatch } = useContext(Context);
    const user = state?.user;
    if (!user) {
        return <Loading />;
    }
    return (
        <Suspense fallback={<Loading />}>
            <Usuario data={user} />;
        </Suspense>
    );
};

export default UserPage;
