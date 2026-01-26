import React from "react";
import { motion } from "framer-motion";

const WelcomeMessage = () => {
  return (
    <motion.p
      className="text-sm text-white leading-5 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      Aqui cada sabor conta uma história.
      Vote, participe e faça parte da escolha da <strong>Pata Negra Defumados</strong>.
    </motion.p>
  );
};

export default WelcomeMessage;