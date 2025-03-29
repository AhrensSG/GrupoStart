import Login from "@/components/login/Login";
import React from "react";
import { Suspense } from "react";

const LoginPage = () => {
    return (
        <Suspense fallback={<div></div>}>
            <Login />
        </Suspense>
    );
};

export default LoginPage;
