import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SuccessModal = ({ onClose }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-black via-dark-brown to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
        </motion.div>

        <h2 className="text-3xl font-bold mb-4">Participação Enviada!</h2>
        <p className="text-xl text-gray-300 mb-8">
          Sua participação foi enviada com sucesso! Obrigado por participar do Desafio Pata Negra.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onClose}
            className="w-full bg-copper hover:bg-copper/90 text-white py-4 text-lg rounded-xl shadow-lg hover:shadow-copper/50 transition-all duration-300"
          >
            Voltar ao Início
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuccessModal;