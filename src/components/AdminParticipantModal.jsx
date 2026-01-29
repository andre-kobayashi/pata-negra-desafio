import React from "react";
import { X, Phone, Trophy, Tag, MapPin, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"; // Importando o botão da sua UI

const AdminParticipantModal = ({ open, participant, onClose }) => {
  if (!open || !participant) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Fecha ao clicar fora
      >
        <motion.div
          className="bg-gray-900 border border-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar dentro
        >
          {/* HEADER FIXO - Nunca some no scroll */}
          <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md">
            <div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                {participant.name}
              </h2>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                <MapPin size={12} className="text-copper" /> {participant.city} • 
                <Calendar size={12} className="text-copper" /> {new Date(participant.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all active:scale-90"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* CONTEÚDO SCROLLÁVEL */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

            {/* FOTOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">
                  Foto – Ingredientes
                </p>
                <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-lg group">
                  <img
                    src={participant.foto_ingredientes_url}
                    alt="Ingredientes"
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">
                  Foto – Prato Finalizado
                </p>
                <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-lg group">
                  <img
                    src={participant.foto_prato_url}
                    alt="Prato finalizado"
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* RECEITA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase italic tracking-widest text-copper flex items-center gap-2">
                  <span className="w-6 h-px bg-copper/30"></span> Ingredientes
                </h3>
                <div className="bg-black/40 border border-zinc-800 rounded-2xl p-5 whitespace-pre-line text-sm text-zinc-300 leading-relaxed italic">
                  {participant.receita}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase italic tracking-widest text-copper flex items-center gap-2">
                  <span className="w-6 h-px bg-copper/30"></span> Modo de Preparo
                </h3>
                <div className="bg-black/40 border border-zinc-800 rounded-2xl p-5 whitespace-pre-line text-sm text-zinc-300 leading-relaxed italic">
                  {participant.modo_preparo}
                </div>
              </div>
            </div>

            {/* INFO EXTRA EM CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 flex items-center gap-3">
                <Phone size={18} className="text-copper" />
                <div>
                  <p className="text-[9px] uppercase font-bold text-zinc-500">Telefone</p>
                  <p className="text-sm font-bold text-white tracking-tighter">{participant.phone}</p>
                </div>
              </div>
              <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 flex items-center gap-3">
                <Trophy size={18} className="text-copper" />
                <div>
                  <p className="text-[9px] uppercase font-bold text-zinc-500">Votos Instagram</p>
                  <p className="text-sm font-bold text-white tracking-tighter">{participant.instagram_votes || 0}</p>
                </div>
              </div>
              <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 flex items-center gap-3">
                <Tag size={18} className="text-copper" />
                <div>
                  <p className="text-[9px] uppercase font-bold text-zinc-500">Status Atual</p>
                  <p className="text-sm font-bold text-copper uppercase italic">{participant.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER FIXO COM BOTÃO DE FECHAR - Sempre visível */}
          <div className="p-4 border-t border-gray-800 bg-gray-950 flex justify-end">
            <Button 
              variant="secondary" 
              onClick={onClose}
              className="px-8 font-black uppercase italic tracking-widest rounded-xl hover:bg-zinc-800"
            >
              Fechar Visualização
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminParticipantModal;
