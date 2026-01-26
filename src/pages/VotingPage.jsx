import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Instagram, Crown, Flame, TrendingUp, Award, Loader2, UtensilsCrossed, X, Search } from "lucide-react";
import { supabase } from "@/lib/customSupabaseClient";
import { Button } from "@/components/ui/button";

const VotingPage = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null); // Estado para a imagem do zoom

  useEffect(() => {
    loadRanking();
  }, []);

  const loadRanking = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("participants") 
        .select("id, nome, cidade, instagram_votes, status, foto_prato_url")
        .eq("status", "Validado")
        .order('instagram_votes', { ascending: false });

      if (error) throw error;
      setRanking(data || []);
    } catch (err) {
      console.error("Erro ao carregar ranking:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Ranking | Desafio Brasil no Prato</title>
      </Helmet>

      {/* MODAL DE ZOOM (SÓ APARECE AO CLICAR NA FOTO) */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full"
              onClick={() => setSelectedImg(null)}
            >
              <X size={24} />
            </motion.button>
            
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImg}
              className="max-w-full max-h-[80vh] rounded-2xl border border-white/10 shadow-2xl"
              alt="Zoom do prato"
            />
            <p className="absolute bottom-10 text-gray-400 text-sm font-medium">Toque fora para fechar</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen pt-24 pb-20 px-4 bg-[#0a0a0a] text-white">
        <div className="max-w-md mx-auto">
          
          <header className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-copper/20 text-copper border border-copper/30 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4"
            >
              <Flame size={14} className="fill-copper" /> Live Ranking
            </motion.div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
              PLAC<span className="text-copper">AR</span> <br />DO DESAFIO
            </h1>
            <p className="text-gray-500 text-[10px] mt-4 font-black uppercase tracking-widest italic">
              Toque nas fotos para ampliar 🔎
            </p>
          </header>

          {/* PODIUM */}
          {!loading && ranking.length > 0 ? (
            <section className="mb-10 grid grid-cols-3 gap-2 items-end px-2">
              
              {/* 2º LUGAR */}
              <div className="text-center">
                {ranking[1] ? (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div 
                      className="relative mb-2 cursor-pointer" 
                      onClick={() => ranking[1].foto_prato_url && setSelectedImg(ranking[1].foto_prato_url)}
                    >
                      <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-full border-2 border-gray-400 overflow-hidden relative flex items-center justify-center">
                        {ranking[1].foto_prato_url ? (
                            <img src={ranking[1].foto_prato_url} alt="2" className="w-full h-full object-cover" />
                        ) : <UtensilsCrossed className="w-6 h-6 text-zinc-600" />}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                             <Search size={16} className="text-white" />
                        </div>
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                             <span className="text-2xl font-black text-white italic">2º</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold truncate uppercase">{ranking[1].nome?.split(' ')[0]}</p>
                    <div className="h-16 bg-zinc-900/50 rounded-t-lg mt-2 flex items-center justify-center font-black">
                       {ranking[1].instagram_votes || 0}
                    </div>
                  </motion.div>
                ) : <div className="h-10 border-b border-zinc-800 opacity-50"></div>}
              </div>

              {/* 1º LUGAR */}
              <div className="text-center">
                <Crown className="w-6 h-6 mx-auto text-yellow-500 mb-1 animate-bounce" />
                <motion.div 
                  initial={{ scale: 0.8 }} 
                  animate={{ scale: 1 }}
                  className="cursor-pointer"
                  onClick={() => ranking[0].foto_prato_url && setSelectedImg(ranking[0].foto_prato_url)}
                >
                  <div className="relative mb-2">
                    <div className="w-20 h-20 mx-auto bg-zinc-800 rounded-full border-4 border-copper overflow-hidden relative flex items-center justify-center shadow-[0_0_20px_rgba(184,115,51,0.4)]">
                      {ranking[0].foto_prato_url ? (
                        <img src={ranking[0].foto_prato_url} alt="1" className="w-full h-full object-cover" />
                      ) : <UtensilsCrossed className="w-8 h-8 text-zinc-600" />}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                         <span className="text-3xl font-black text-white italic">1º</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-black truncate uppercase text-copper">{ranking[0].nome?.split(' ')[0]}</p>
                  <div className="h-24 bg-gradient-to-t from-copper/40 to-copper/10 rounded-t-lg mt-2 border-x border-t border-copper/30 flex items-center justify-center text-xl font-black">
                     {ranking[0].instagram_votes || 0}
                  </div>
                </motion.div>
              </div>

              {/* 3º LUGAR */}
              <div className="text-center">
                {ranking[2] ? (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div 
                      className="relative mb-2 cursor-pointer"
                      onClick={() => ranking[2].foto_prato_url && setSelectedImg(ranking[2].foto_prato_url)}
                    >
                      <div className="w-14 h-14 mx-auto bg-zinc-800 rounded-full border-2 border-orange-700 overflow-hidden relative flex items-center justify-center font-black">
                        {ranking[2].foto_prato_url ? (
                            <img src={ranking[2].foto_prato_url} alt="3" className="w-full h-full object-cover" />
                        ) : <UtensilsCrossed className="w-5 h-5 text-zinc-600" />}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                             <span className="text-lg font-black text-white italic">3º</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold truncate uppercase">{ranking[2].nome?.split(' ')[0]}</p>
                    <div className="h-12 bg-zinc-900/50 rounded-t-lg mt-2 flex items-center justify-center font-black">
                       {ranking[2].instagram_votes || 0}
                    </div>
                  </motion.div>
                ) : <div className="h-10 border-b border-zinc-800 opacity-50"></div>}
              </div>
            </section>
          ) : null}

          {/* LISTA COM ZOOM */}
          <section className="space-y-3 mb-12">
            {loading ? (
              <div className="py-20 text-center flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-copper animate-spin" />
                <p className="text-gray-600 uppercase tracking-widest font-black italic text-xs">Sincronizando...</p>
              </div>
            ) : ranking.length === 0 ? (
              <div className="bg-zinc-900/50 p-10 rounded-3xl border border-zinc-800 text-center">
                <Trophy size={40} className="mx-auto text-zinc-700 mb-4" />
                <p className="text-gray-500 font-bold uppercase text-xs italic tracking-widest">Aguardando Finalistas</p>
              </div>
            ) : (
              <AnimatePresence>
                {ranking.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      index === 0 ? "bg-copper/10 border-copper/50 shadow-glow" : "bg-zinc-900/40 border-zinc-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="relative cursor-pointer group"
                        onClick={() => item.foto_prato_url && setSelectedImg(item.foto_prato_url)}
                      >
                         <span className={`absolute -top-1 -left-1 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black z-10 ${index < 3 ? 'bg-copper text-white' : 'bg-zinc-700 text-gray-300'}`}>
                            {index + 1}
                         </span>
                         <div className="w-12 h-12 rounded-xl bg-zinc-800 overflow-hidden border border-zinc-700 flex items-center justify-center">
                            {item.foto_prato_url ? (
                                <img src={item.foto_prato_url} alt={item.nome} className="w-full h-full object-cover" />
                            ) : <UtensilsCrossed size={16} className="text-zinc-600" />}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Search size={14} className="text-white" />
                            </div>
                         </div>
                      </div>
                      
                      <div>
                        <p className={`font-black uppercase tracking-tight text-sm ${index === 0 ? 'text-white' : 'text-gray-300'}`}>
                          {item.nome}
                        </p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">
                          {index === 0 && <TrendingUp size={10} className="text-green-500" />}
                          {item.cidade}
                        </p>
                      </div>
                    </div>

                    <div className="bg-black/40 px-3 py-2 rounded-xl border border-zinc-800 text-center min-w-[65px]">
                      <p className="text-lg font-black leading-none text-white italic">{item.instagram_votes || 0}</p>
                      <p className="text-[8px] text-copper font-black uppercase tracking-widest">votos</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </section>

          {/* CTA INSTAGRAM */}
          <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-[2rem] border border-zinc-800 text-center shadow-2xl">
            <Instagram className="w-10 h-10 mx-auto text-pink-500 mb-4" />
            <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2 text-white italic">Vote nos Stories!</h3>
            <p className="text-gray-400 text-[10px] mb-6 font-medium">As batalhas estão acontecendo agora.</p>

            <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-black py-6 rounded-xl active:scale-95 shadow-lg">
              <a href="https://instagram.com/patanegradefumados" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 tracking-tighter">
                ABRIR INSTAGRAM <Instagram size={20} />
              </a>
            </Button>
          </div>

        </div>
      </div>
    </>
  );
};

export default VotingPage;