"use client";
import Usuario from "@/components/usuario/Usuario";
import React, { useContext, useEffect } from "react";
import { Context } from "../context/GlobalContext";

const UserPage = () => {
    const { state, dispatch } = useContext(Context);
    const user = state?.user;
    console.log(user);
    if (!user) {
        return (
            <div>
                <h1>Usuario no encontrado</h1>
            </div>
        );
    }
    return <Usuario data={user} />;
};

export default UserPage;
