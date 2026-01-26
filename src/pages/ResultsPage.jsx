import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Trophy, Instagram } from "lucide-react";
import { supabase } from "@/lib/customSupabaseClient";

const ResultsPage = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    loadRanking();
  }, []);

  const loadRanking = async () => {
    const { data } = await supabase
      .from("final_ranking")
      .select("*");

    if (data) setRanking(data);
  };

  return (
    <>
      <Helmet>
        <title>Resultado Oficial | Desafio Pata Negra</title>
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 px-4 bg-black text-white">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <Trophy className="w-14 h-14 mx-auto text-copper mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Resultado Oficial
            </h1>
            <p className="text-gray-400">
              Ranking baseado na votação realizada no Instagram
            </p>
          </div>

          <div className="space-y-8">
            {ranking.map((item, index) => (
              <div
                key={item.id}
                className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="relative w-full md:w-64 h-40 overflow-hidden rounded-xl">
                  <img
                    src={item.foto_prato_url}
                    alt={item.nome}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-copper text-black px-3 py-1 rounded-full font-bold">
                    {index + 1}º
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">{item.nome}</h2>
                  <p className="text-gray-400 mb-2">{item.cidade}</p>
                  <p className="text-copper font-bold text-xl">
                    {item.instagram_votes} votos
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="https://instagram.com/patanegra_defumados"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-copper font-bold text-xl hover:opacity-80"
            >
              <Instagram className="w-6 h-6" />
              Veja os Stories no Instagram
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default ResultsPage;