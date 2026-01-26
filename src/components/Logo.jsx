import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo/logo1.webp";

const Logo = () => {
  return (
    <Link to="/">
      <motion.img
        src={logo}
        alt="Pata Negra Defumados"
        className="h-10 md:h-12 object-contain transition-all duration-300 hover:scale-105 hover:opacity-90"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      />
    </Link>
  );
};

export default Logo;