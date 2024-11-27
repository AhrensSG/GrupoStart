import { logInWithGoogle } from "@/firebase/logInWithGoogle";
import React from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const Modal = ({ setShowLogin }) => {
  const handleLogin = async () => {
    try {
      await logInWithGoogle();
      setShowLogin(false);
      toast.success("Inicio de sesion exitoso!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      <div className="bg-black/80 fixed top-0 left-0 w-full h-screen z-40 grid place-items-center">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white max-w-[350px] w-full grid place-items-center gap-4 p-6 rounded-md relative"
        >
          <h4 className="text-2xl font font-medium">¡Que bueno verte!</h4>
          {/* Botón Iniciar sesión (con texto) */}
          <Link href="/login">
            <button
              className="border-4 border-orange-500 p-3 w-full max-w-72 flex justify-center items-center rounded-[68px] bg-orange-500 text-white hover:bg-orange-400 transition duration-300"
            >
              Iniciar sesión
            </button>
          </Link>
          <button
            onClick={() => setShowLogin(false)}
            className="absolute top-2 right-4"
          >
            x
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
