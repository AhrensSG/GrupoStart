import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import MPButton from "./MPButton";

const PaymentModal = ({ setShowPaymentModal }) => {
  return (
    <AnimatePresence>
      <div className="bg-black/80 fixed top-0 left-0 w-full h-screen z-40 grid place-items-center">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white max-w-[350px] h-[199px] w-full grid place-items-center gap-4 p-6 rounded-md relative"
        >
          <h4 className="text-2xl font font-medium">
            ¡Ya puedes realizar el pago!
          </h4>

          <MPButton />
          <button
            onClick={() => setShowPaymentModal(false)}
            className="absolute top-1 right-2"
          >
            x
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
