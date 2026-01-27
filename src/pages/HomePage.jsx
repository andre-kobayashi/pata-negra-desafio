import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChefHat, Camera, Award, CheckCircle2, Send, Zap, 
  ShoppingBag, ArrowRight, Star, Truck, ShieldCheck, ExternalLink, Utensils
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Desafio Pata Negra 2026 | Ganhe ¥20.000</title>
        <meta
          name="description"
          content="Edição 2026: Concorra a ¥20.000 em produtos artesanais no Japão. Use o sabor autêntico da Pata Negra e mostre seu talento!"
        />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" 
              alt="Churrasco premium"
              className="w-full h-full object-cover opacity-40 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center w-full max-w-md"
          >
            {/* ONDE ESTAVA O ERRO DE DATA - CORRIGIDO PARA 2026 */}
            <div className="inline-flex items-center gap-2 bg-copper/20 text-copper border border-copper/30 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Zap size={14} className="fill-copper" /> Edição Especial 2026
            </div>

            <h1 className="text-6xl font-black leading-[0.85] mb-6 tracking-tighter italic">
              BRASIL <br />
              <span className="text-copper">NO PRATO</span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 font-medium italic leading-tight">
              Sua receita vale <span className="text-white font-black bg-copper px-2 shadow-lg">¥20.000</span> em prêmios. 
            </p>

            <div className="space-y-3 mb-10">
                  <Link to="/participar" className="block"> 
                <Button className="w-full bg-copper hover:bg-copper/90 text-white py-8 text-2xl font-black rounded-2xl shadow-[0_10px_40px_rgba(184,115,51,0.4)] active:scale-95 transition-all">
                  QUERO PARTICIPAR
                </Button>
              </Link>
              <a href="https://patanegradefumados.com" target="_blank" rel="noreferrer" className="block">
                <Button variant="outline" className="w-full border-zinc-700 text-gray-400 py-6 text-sm font-bold rounded-2xl flex items-center justify-center gap-2">
                  <ShoppingBag size={18} /> COMPRAR PRODUTOS PATA NEGRA
                </Button>
              </a>
            </div>
          </motion.div>
        </section>

{/* SEÇÃO DE VENDAS - "ESCOLHA SEU INGREDIENTE" */}
<section className="py-20 px-6 bg-zinc-900/30">
  <div className="max-w-md mx-auto">

    <div className="text-center mb-10">
      <h2 className="text-3xl font-black italic mb-2 uppercase tracking-tighter leading-none text-white">
        Defumados <br /><span className="text-copper font-black">Exclusivos</span>
      </h2>
      <p className="text-zinc-500 text-sm italic font-medium">
        Escolha seu favorito e comece a criar sua receita.
      </p>
    </div>

    <div className="bg-gradient-to-br from-zinc-800/50 to-black p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl relative overflow-hidden group">
      
      {/* BADGE DE PREÇO */}
      <div className="absolute top-0 right-0 bg-copper text-white px-6 py-2 rounded-bl-3xl font-black italic text-sm shadow-xl">
        A PARTIR DE ¥800
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-copper/10 rounded-2xl flex items-center justify-center border border-copper/20">
          <Flame className="text-copper animate-pulse" size={28} />
        </div>
        <div>
          <h3 className="text-xl font-black uppercase italic leading-none text-white">Pata Negra</h3>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Sabor Artesanal Defumado</p>
        </div>
      </div>

      <p className="text-zinc-400 text-sm font-medium italic mb-8 leading-relaxed">
        Não importa se é uma <span className="text-white font-bold">Costelinha Defumada</span> suculenta, um <span className="text-white font-bold">Bacon Artesanal</span> curado ou nossas famosas <span className="text-white font-bold">Linguiças</span>. Cada detalhe faz a diferença na nota dos jurados.
      </p>

      {/* LISTA DE OPÇÕES POPULARES */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-black/40 p-3 rounded-xl border border-zinc-800/50 text-[10px] font-black uppercase italic text-zinc-400 text-center">
          🥓 Bacon Artesanal
        </div>
        <div className="bg-black/40 p-3 rounded-xl border border-zinc-800/50 text-[10px] font-black uppercase italic text-zinc-400 text-center">
          🍖 Costelinha
        </div>
        <div className="bg-black/40 p-3 rounded-xl border border-zinc-800/50 text-[10px] font-black uppercase italic text-zinc-400 text-center">
          🌭 Linguiças
        </div>
        <div className="bg-black/40 p-3 rounded-xl border border-zinc-800/50 text-[10px] font-black uppercase italic text-zinc-400 text-center">
          🥩 Porchetta
        </div>
      </div>

      <p className="text-[10px] text-zinc-600 italic mb-8 text-center font-bold uppercase tracking-tighter leading-tight">
        * Você só precisa de <span className="text-copper">1 produto</span> para participar do desafio.
      </p>

      <a
        href="https://patanegradefumados.com/pagina-defumados"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-3 bg-white text-black w-full py-5 rounded-2xl font-black uppercase text-base tracking-tighter hover:bg-copper hover:text-white transition-all shadow-glow active:scale-95"
      >
        ESCOLHER MEU PRODUTO <ArrowRight size={20} />
      </a>
    </div>
    
    <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
        <Truck size={20} />
        <ShieldCheck size={20} />
        <ShoppingBag size={20} />
    </div>
  </div>
</section>

        {/* CARDS DE PRÊMIOS */}
        <section className="py-16 px-4 bg-zinc-900/50 border-y border-zinc-800">
          <div className="max-w-md mx-auto text-center">
            <Award className="w-12 h-12 mx-auto text-copper mb-4" />
            <h2 className="text-4xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">Prêmios <br />2026</h2>

            <div className="space-y-4">
              <div className="bg-copper text-white p-5 rounded-3xl flex items-center justify-between shadow-[0_15px_30px_rgba(184,115,51,0.3)]">
                <span className="text-xl font-black italic uppercase">1º LUGAR</span>
                <span className="text-3xl font-black italic">¥20.000</span>
              </div>
              <div className="bg-zinc-800/80 p-5 rounded-3xl flex items-center justify-between border border-zinc-700 opacity-80">
                <span className="text-lg font-bold italic uppercase">2º LUGAR</span>
                <span className="text-2xl font-black italic">¥10.000</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-24 px-6 bg-gradient-to-t from-copper/30 to-transparent text-center">
          <motion.div initial={{ scale: 0.9 }} whileInView={{ scale: 1 }} className="max-w-md mx-auto">
            <h2 className="text-5xl font-black mb-6 italic leading-none uppercase tracking-tighter">Bora <br />Cozinhar?</h2>
            <p className="text-gray-400 mb-10 font-medium text-lg leading-tight">O Japão inteiro vai votar no seu prato. <br />Garanta seu ingrediente e participe.</p>
            <div className="space-y-4">
              <Link to="/participar">       
                <Button className="w-full bg-white text-black py-8 text-2xl font-black rounded-2xl shadow-2xl transition-transform active:scale-95">
                  QUERO PARTICIPAR <Send size={24} className="ml-2" />    
                </Button>
              </Link>
              <a href="https://patanegradefumados.com" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-copper font-black italic uppercase text-xs tracking-[0.2em] py-4">
                VISITAR LOJA OFICIAL <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </section>

        <footer className="py-10 text-center border-t border-zinc-900">
          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-bold italic">
            Pata Negra Defumados • Japan 2026
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
