import React, { useState } from "react";
import { Eye, Search, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/customSupabaseClient";
import AdminParticipantModal from "@/components/AdminParticipantModal";

const AdminTable = ({
  participants,
  onStatusChange,
  filterStatus,        // "all" | "finalist"
  readOnlyVotes = false,
}) => {
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [editingVotes, setEditingVotes] = useState({});

  const filteredParticipants = participants.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveVotes = async (id) => {
    const votes = parseInt(editingVotes[id], 10) || 0;

    const { error } = await supabase
      .from("participants")
      .update({ instagram_votes: votes })
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro",
        description: "Falha ao salvar votos do Instagram",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Votos do Instagram atualizados",
      });
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8">

      {/* BUSCA */}
      {filterStatus === "all" && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome ou cidade..."
              className="w-full bg-black/50 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-copper"
            />
          </div>
        </div>
      )}

      {/* TABELA */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="text-left p-4">Nome</th>
              <th className="text-left p-4">Cidade</th>
              <th className="text-left p-4">Data</th>
              <th className="text-left p-4">Votos IG</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Ações</th>
            </tr>
          </thead>

          <tbody>
            {filteredParticipants.map((participant) => (
              <tr
                key={participant.id}
                className="border-b border-gray-800 hover:bg-gray-800/40 transition"
              >
                <td className="p-4 font-semibold">{participant.name}</td>
                <td className="p-4 text-gray-400">{participant.city}</td>
                <td className="p-4 text-gray-400">
                  {new Date(participant.createdAt).toLocaleDateString()}
                </td>

                {/* VOTOS IG */}
                <td className="p-4">
                  {readOnlyVotes ? (
                    <span className="font-bold text-copper">
                      {participant.instagram_votes || 0}
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={
                          editingVotes[participant.id] ??
                          participant.instagram_votes ??
                          0
                        }
                        onChange={(e) =>
                          setEditingVotes((prev) => ({
                            ...prev,
                            [participant.id]: e.target.value,
                          }))
                        }
                        className="w-20 bg-black/50 border border-gray-700 rounded-lg px-2 py-1 text-center"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleSaveVotes(participant.id)}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <select
                    value={participant.status || "Recebido"}
                    onChange={(e) =>
                      onStatusChange(participant.id, e.target.value)
                    }
                    className="bg-black/50 border border-gray-700 rounded-lg px-3 py-1 focus:ring-2 focus:ring-copper"
                  >
                    <option value="Recebido">Recebido</option>
                    <option value="Validado">Validado</option>
                    <option value="Finalista">Finalista</option>
                    <option value="Vencedor">Vencedor</option>
                  </select>
                </td>

                {/* AÇÕES */}
                <td className="p-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedParticipant(participant)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredParticipants.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Nenhum registro encontrado
          </div>
        )}
      </div>

      {/* MODAL */}
      <AdminParticipantModal
        open={!!selectedParticipant}
        participant={selectedParticipant}
        onClose={() => setSelectedParticipant(null)}
      />
    </div>
  );
};

export default AdminTable;