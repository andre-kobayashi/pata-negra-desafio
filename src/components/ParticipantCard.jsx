import React from "react";
import { motion } from "framer-motion";
import { MapPin, Check } from "lucide-react";
import VoteButton from "@/components/VoteButton";

const ParticipantCard = ({ participant, onVote, hasVoted, isVoted }) => {
  return (
    <motion.div
      whileHover={!hasVoted ? { y: -5, scale: 1.02 } : {}}
      className={`bg-gray-900/50 backdrop-blur-sm border rounded-2xl overflow-hidden shadow-lg transition-all duration-300
        ${
          isVoted
            ? "border-green-500/60 shadow-green-500/20"
            : "border-gray-800 hover:border-copper/50 hover:shadow-2xl"
        }`}
    >
      {/* IMAGEM */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={participant.photo2}
          alt={participant.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            hasVoted && !isVoted ? "opacity-60" : "opacity-100"
          }`}
        />

        {isVoted && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-green-500/90 text-black px-4 py-2 rounded-full flex items-center gap-2 font-semibold">
              <Check className="w-5 h-5" />
              Seu voto
            </div>
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{participant.name}</h3>

        <div className="flex items-center text-gray-400 mb-6">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{participant.city}</span>
        </div>

        {/* AÇÃO */}
        {isVoted ? (
          <div className="bg-green-500/20 border border-green-500/40 rounded-xl py-3 px-4 text-center text-green-400 font-semibold">
            Você votou neste prato
          </div>
        ) : (
          <VoteButton
            onClick={() => onVote(participant.id)}
            disabled={hasVoted}
            hasVoted={hasVoted}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ParticipantCard;