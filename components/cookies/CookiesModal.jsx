import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CookiesModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setShowModal(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 w-full h-1/3 sm:h-1/4 bg-white text-[#0853FC] flex flex-col items-center justify-center p-6 shadow-xl z-50">
          <div className="text-xs sm:text-base text-center mb-4 px-4">
            <p className="mb-2">
              Utilizamos cookies para mejorar su experiencia en nuestro sitio
              web y ofrecerle contenido personalizado.
            </p>
            <p className="mb-2">
              Algunas cookies son esenciales para el funcionamiento del sitio,
              mientras que otras nos ayudan a optimizar su uso.
            </p>
            <p>
              Lea más sobre esto en nuestra
              <Link href="/cookies" className="underline text-[#FB8A00] ml-1">
                política de cookies
              </Link>
              .
            </p>
          </div>
          <button
            onClick={handleAccept}
            className="bg-[#0853FC] hover:bg-[#0741c7] text-white font-semibold py-2 px-6 rounded">
            Aceptar
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookiesModal;
