import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminParticipantModal = ({ open, participant, onClose }) => {
  if (!open || !participant) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <div>
              <h2 className="text-2xl font-bold">{participant.name}</h2>
              <p className="text-gray-400">
                {participant.city} •{" "}
                {new Date(participant.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* CONTENT */}
          <div className="p-6 space-y-8">

            {/* FOTOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-2 text-sm text-gray-400">
                  Foto – Ingredientes
                </p>
                <img
                  src={participant.foto_ingredientes_url}
                  alt="Ingredientes"
                  className="rounded-xl w-full h-64 object-cover border border-gray-800"
                />
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-400">
                  Foto – Prato Finalizado
                </p>
                <img
                  src={participant.foto_prato_url}
                  alt="Prato finalizado"
                  className="rounded-xl w-full h-64 object-cover border border-gray-800"
                />
              </div>
            </div>

            {/* RECEITA */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-copper mb-2">
                  Ingredientes
                </h3>
                <div className="bg-black/40 border border-gray-800 rounded-xl p-4 whitespace-pre-line text-gray-300">
                  {participant.receita}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-copper mb-2">
                  Modo de Preparo
                </h3>
                <div className="bg-black/40 border border-gray-800 rounded-xl p-4 whitespace-pre-line text-gray-300">
                  {participant.modo_preparo}
                </div>
              </div>
            </div>

            {/* INFO EXTRA */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-800 text-sm text-gray-400">
              <div>
                <span className="font-semibold text-white">Telefone:</span>{" "}
                {participant.phone}   
              </div>
              <div>
                <span className="font-semibold text-white">Votos IG:</span>{" "}
                {participant.instagram_votes || 0}
              </div>
              <div>
                <span className="font-semibold text-white">Status:</span>{" "}
                {participant.status}
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminParticipantModal;