"use client";
import Usuario from "@/components/usuario/Usuario";
import React, { useContext, useEffect } from "react";
import { Context } from "../context/GlobalContext";
import Loading from "@/components/loading/Loading";

const UserPage = () => {
    const { state, dispatch } = useContext(Context);
    const user = state?.user;
    console.log(user);
    if (!user) {
        return <Loading />;
    }
    return <Usuario data={user} />;
};

export default UserPage;
