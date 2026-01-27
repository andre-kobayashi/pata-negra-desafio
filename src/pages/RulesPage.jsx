import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, ClipboardCheck, Camera, Instagram, Vote, 
  Calendar, Trophy, AlertTriangle, CheckCircle2, ArrowLeft, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";

const RulesPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Helmet>
        <title>Regras Oficiais | Desafio Pata Negra 2026</title>
        <meta name="description" content="Confira o regulamento completo do Desafio Brasil no Prato 2026 da Pata Negra Defumados." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-20 px-6 bg-[#0a0a0a] text-white">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          {/* BOTÃO VOLTAR */}
          <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-copper transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Voltar para o início
          </Link>

          {/* HEADER */}
          <header className="mb-12">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-4">
              REGULAMENTO <br />
              <span className="text-copper">OFICIAL 2026</span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium">
              Leia atentamente as regras para garantir sua participação no Desafio Brasil no Prato.
            </p>
          </header>

          <div className="space-y-6">
            
            {/* QUEM PODE PARTICIPAR */}
            <motion.section variants={itemVariants} className="bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-copper" size={24} />
                <h2 className="text-xl font-black italic uppercase tracking-tight">Quem pode participar</h2>
              </div>
              <ul className="space-y-2 text-zinc-400 text-sm italic">
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 size={14} className="text-copper" /> Residentes no Japão (qualquer nacionalidade).
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <CheckCircle2 size={14} className="text-copper" /> Participação individual (uma receita por pessoa).
                </li>
              </ul>
            </motion.section>

            {/* REQUISITOS OBRIGATÓRIOS */}
            <motion.section variants={itemVariants} className="bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <ClipboardCheck className="text-copper" size={24} />
                <h2 className="text-xl font-black italic uppercase tracking-tight">Requisitos Obrigatórios</h2>
              </div>
              <p className="text-zinc-500 text-xs mb-4 font-bold uppercase tracking-widest">Produtos Aceitos de Fabricação Artesanal do Pata Negra:</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Linguiças Artesanais", "Bacon", "Costelinha Defumada", "Kit Feijoada", "Porchetta", "Torresmo"].map((p) => (
                  <span key={p} className="bg-zinc-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-zinc-300">
                    {p}
                  </span>
                ))}
              </div>
              <p className="text-zinc-500 text-xs mb-4 font-bold uppercase tracking-widest">O que enviar no site:</p>
              <ul className="space-y-3 text-zinc-400 text-sm italic">
                <li className="flex items-center gap-3"><Camera size={16} className="text-copper" /> Foto dos produtos adquiridos</li>
                <li className="flex items-center gap-3"><Camera size={16} className="text-copper" /> Foto do prato finalizado</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-copper" /> Lista de ingredientes e modo de preparo</li>
              </ul>

              <div className="mt-6 p-4 bg-red-950/20 border border-red-900/50 rounded-2xl flex gap-3">
                <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
                <p className="text-[11px] text-red-200 font-bold uppercase tracking-tighter leading-tight">
                  Inscrições via DM, WhatsApp ou Instagram não serão aceitas. Use apenas este site oficial.
                </p>
              </div>
            </motion.section>

            {/* INSTAGRAM E COLLAB */}
            <motion.section variants={itemVariants} className="bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <Instagram className="text-copper" size={24} />
                <h2 className="text-xl font-black italic uppercase tracking-tight">Conteúdo no Instagram</h2>
              </div>
              <p className="text-zinc-400 text-sm italic mb-4 leading-relaxed">
                Nós incentivamos você a postar os bastidores e preparo no seu perfil!
              </p>
              <div className="space-y-2">
                <div className="bg-black/40 p-3 rounded-xl flex items-center gap-3 text-xs font-bold text-zinc-300">
                  <span className="text-green-500">✅</span> Marque @patanegradefumados
                </div>
                <div className="bg-black/40 p-3 rounded-xl flex items-center gap-3 text-xs font-bold text-zinc-300">
                  <span className="text-green-500">✅</span> Solicite COLLAB no post
                </div>
              </div>
              <p className="mt-4 text-[10px] text-zinc-500 italic font-medium">
                *O ranking oficial é baseado apenas nos votos feitos nos stories da @patanegradefumados.
              </p>
            </motion.section>

            {/* VOTAÇÃO E DATAS */}
            <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800">
                <Vote className="text-copper mb-4" size={24} />
                <h3 className="font-black italic uppercase text-lg mb-2">Votação</h3>
                <p className="text-zinc-500 text-[11px] font-medium leading-relaxed">
                  Votos anônimos via Stories. As receitas aprovadas serão publicadas em formato de enquete.
                </p>
              </div>
              <div className="bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800">
                <Calendar className="text-copper mb-4" size={24} />
                <h3 className="font-black italic uppercase text-lg mb-2">Datas</h3>
                <p className="text-zinc-400 text-xs font-bold uppercase italic leading-tight">
                  Início: 01 de Fevereiro <br />
                  Fim: 31 de Março
                </p>
              </div>
            </motion.section>

            {/* PREMIAÇÃO */}
            <motion.section variants={itemVariants} className="bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800 text-center">
              <Trophy className="text-copper mx-auto mb-4" size={32} />
              <h2 className="text-2xl font-black italic uppercase tracking-tight mb-6">Premiação 2026</h2>
              <div className="space-y-3">
                <div className="bg-copper/10 border border-copper/30 p-4 rounded-2xl flex justify-between items-center">
                  <span className="font-black italic text-sm">1º LUGAR</span>
                  <span className="font-black text-xl italic text-copper tracking-tighter">¥20.000</span>
                </div>
                <div className="bg-zinc-800/40 p-4 rounded-2xl flex justify-between items-center opacity-80">
                  <span className="font-bold italic text-sm">2º LUGAR</span>
                  <span className="font-black text-lg italic text-zinc-400 tracking-tighter">¥10.000</span>
                </div>
                <div className="bg-zinc-800/40 p-4 rounded-2xl flex justify-between items-center opacity-80">
                  <span className="font-bold italic text-sm">3º LUGAR</span>
                  <span className="font-black text-lg italic text-zinc-400 tracking-tighter">¥5.000</span>
                </div>
              </div>
              <p className="text-[10px] text-zinc-600 mt-6 uppercase tracking-widest font-bold">
                *Prêmios entregues em cestas de produtos. Não convertíveis em dinheiro.
              </p>
            </motion.section>

          </div>

          {/* CTA FINAL */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <h3 className="text-xl font-black italic uppercase mb-6">Pronto para o desafio?</h3>
            <Link to="/participacao">
              <Button className="w-full bg-copper hover:bg-copper/90 text-white py-8 text-2xl font-black rounded-2xl shadow-xl active:scale-95 transition-all">
                ENVIAR RECEITA AGORA <Send className="ml-2" size={24} />
              </Button>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </>
  );
};

export default RulesPage;