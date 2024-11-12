"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { logInWithGoogle } from "@/firebase/logInWithGoogle";
import { logInWithFacebook } from "@/firebase/logInWithFacebook";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "@/firebase/config";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

const Login = ({ setShowLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    const handleEmailLogin = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Usuario creado:", user);
            setShowLogin(false);
            toast.success("Inicio de sesión exitoso!");
        } catch (error) {
            console.log(error);
            toast.error("Error al iniciar sesión.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await logInWithGoogle();
            setShowLogin(false);
            toast.success("Inicio de sesión exitoso!");
        } catch (error) {
            console.log(error);
            toast.error("Error al iniciar sesión.");
        }
    };

    const handleFacebookLogin = async () => {
        try {
            await logInWithFacebook();
            setShowLogin(false);
            toast.success("Inicio de sesión exitoso!");
        } catch (error) {
            console.log(error);
            toast.error("Error al iniciar sesión.");
        }
    };

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            toast.success("Correo de restablecimiento enviado!");
            setIsForgotPassword(false);
            setResetEmail('');
        } catch (error) {
            console.log(error);
            toast.error("Error al enviar correo de restablecimiento.");
        }
    };
    
    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(" Usuario creado:", user);
            setShowLogin(false);
            toast.success("Registro exitoso!");
        } catch (error) {
            console.log(error);
            toast.error("Error al registrar usuario.");
        }
    };

    const handleTermsClick = () => {
        toast.info("Mostrando términos y condiciones.");
    };

    return (
        <section className="flex w-full min-h-screen relative" style={{ backgroundImage: "url('/login/BGlogin.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <aside className="flex flex-col items-start justify-start w-1/3 mx-[5%] my-[2%]">
                <Link href={"/#home"} className="min-w-max mb-4">
                    <Image src="/OrangeLogo.svg" alt="Logo" width={150} height={101} priority />
                </Link>
            </aside>
            <aside className="flex justify-start items-center w-3/2 min-h-screen pl-2">
                <Image src="/login/Slogo.png" alt="S Logo" width={650} height={650} className="mx-auto" />
            </aside>
            <aside className="flex justify-end items-center w-2/3 min-h-screen pr-[14%] pl-[2%]">
                <AnimatePresence>
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="bg-blue-500 bg-opacity-65 rounded-2xl shadow-lg p-8 w-96 border-grey-700 border-opacity-40 border-2"
                    >
                        <h2 className="text-2xl font-bold text-orange-500 mb-2 text-center">
                            {isRegistering ? "Únete a nosotros hoy" : isForgotPassword ? "Restablecer contraseña" : "Bienvenido de vuelta"}
                        </h2>
                        <p className="text-white text-center font-light">{isRegistering ? "El camino a Impulsar tu Negocio" : isForgotPassword ? "Introduce tu correo para restablecer la contraseña" : "Nos alegra verte otra vez :)"}</p>
                        <br />
                        <div className="flex items-center justify-center mb-4">
                            <span className="text-white font-light">{isRegistering ? "Registrate con:" : isForgotPassword ? "" : "Inicia sesión con:"}</span>
                            {!isForgotPassword && (
                                <>
                                    <button
                                        className="p-2 w-10 flex justify-center items-center rounded-full mx-2 bg-white"
                                        onClick={handleGoogleLogin}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262" id="google">
                                            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                            <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                                            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                                        </svg>
                                    </button>
                                    <button
                                        className="p-2 w-10 flex justify-center items-center rounded-full mx-2 bg-white"
                                        onClick={handleFacebookLogin}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" id="facebook">
                                            <path fill="#1877f2" d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"></path>
                                            <path fill="#fff" d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"></path>
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>

                        {isForgotPassword ? (
                            <div className="mb-4 w-full">
                                <label className="block text-white text-sm font-semibold mb-2" htmlFor="resetEmail">
                                    Correo electrónico
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="resetEmail"
                                    type="email"
                                    placeholder="Email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="mb-4 w-full">
                                    <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
                                        Correo electrónico
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4 w-full">
                                    <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
                                        Contraseña
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {isRegistering && (
                                    <div className="mb-4 w-full">
                                        <label className="block text-white text-sm font-semibold mb-2" htmlFor="phone">
                                            Teléfono
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="phone"
                                            type="tel"
                                            placeholder="Teléfono"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                )}
                                {isRegistering && (
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="flex items-center border border-gray -300 rounded-lg p-1 bg-white">
                                            <input
                                                type="checkbox"
                                                checked={acceptTerms}
                                                onChange={() => setAcceptTerms(!acceptTerms)}
                                                className="appearance-none w-6 h-6 rounded-full border-2 border-orange-500 checked:bg-orange-500 checked:before:content-[''] checked:before:block checked:before:w-3 checked:before:h-3 checked:before:rounded-full checked:before:border-white checked:before:bg-orange-500 mr-2"
                                            />
                                            <label className="text-black font-bold text-sm" onClick={handleTermsClick}>
                                                Acepto los términos y condiciones
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        
                        {!isForgotPassword && !isRegistering && (
                            <div className="flex justify-center mb-4">
                                <p className="text-orange-500 text-sm font-semibold cursor-pointer" onClick={() => setIsForgotPassword(true)}>
                                    ¿Olvidaste tu contraseña?
                                </p>
                            </div>
                        )}
                        <hr />
                        <br />
                        <div className="flex items-center justify-center w-full">
                            <button
                                className="bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full max-w-52"
                                type="button"
                                onClick={isForgotPassword ? handleForgotPassword : isRegistering ? handleRegister : handleEmailLogin}
                            >
                                {isForgotPassword ? "Enviar correo" : isRegistering ? "Registrarse" : "Iniciar sesión"}
                            </button>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <button
                                className="text-orange-500 hover:text-orange-800 font-semibold text-sm"
                                onClick={() => {
                                    if (isForgotPassword) {
                                        setIsForgotPassword(false);
                                    } else {
                                        setIsRegistering(!isRegistering);
                                    }
                                }}
                            >
                                {isForgotPassword ? "Regresar a inicio de sesión" : isRegistering ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Regístrate"}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </aside>
        </section>
    );
};

export default Login;