import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LogOut, Users, Award, BarChart3, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import AdminTable from '@/components/AdminTable';
import StatCard from '@/components/StatCard';
import { supabase } from '@/lib/customSupabaseClient';

const FINALISTS_LIMIT = 5;

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [participants, setParticipants] = useState([]);
  const [finalists, setFinalists] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    finalists: 0,
    votes: 0,
    winners: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: parts, error } = await supabase
      .from('participants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar participantes',
        variant: 'destructive',
      });
      return;
    }

    const normalized = parts.map((p) => ({
      ...p,
      name: p.nome,
      city: p.cidade,
      createdAt: p.created_at,
      instagram_votes: p.instagram_votes || 0,
    }));

    // 🔥 FINALISTAS AUTOMÁTICOS (TOP 5)
    const topFinalists = [...normalized]
      .filter((p) => p.instagram_votes > 0)
      .sort((a, b) => b.instagram_votes - a.instagram_votes)
      .slice(0, FINALISTS_LIMIT);

    const totalInstagramVotes = normalized.reduce(
      (sum, p) => sum + (p.instagram_votes || 0),
      0
    );

    setParticipants(normalized);
    setFinalists(topFinalists);

    setStats({
      total: normalized.length,
      finalists: topFinalists.length,
      votes: totalInstagramVotes,
      winners: normalized.filter((p) => p.status === 'Vencedor').length,
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    const { error } = await supabase
      .from('participants')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar status',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Sucesso',
        description: `Status alterado para ${newStatus}`,
      });
      loadData();
    }
  };

  const handleExport = () => {
    if (finalists.length === 0) {
      toast({
        title: 'Aviso',
        description: 'Nenhum finalista para exportar.',
      });
      return;
    }

    const csv = [
      ['Nome', 'Instagram', 'Cidade', 'Votos IG'],
      ...finalists.map((f) => [
        f.name,
        f.instagram,
        f.city,
        f.instagram_votes,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `finalistas-${Date.now()}.csv`;
    a.click();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-b from-black via-dark-brown to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-copper border-copper hover:bg-copper hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" /> Sair
            </Button>
          </div>

          <Tabs defaultValue="stats" className="space-y-8">
            <TabsList className="bg-gray-900 border-gray-800">
              <TabsTrigger value="stats">Estatísticas</TabsTrigger>
              <TabsTrigger value="participants">Participantes</TabsTrigger>
              <TabsTrigger value="finalists">Finalistas</TabsTrigger>
            </TabsList>

            {/* 📊 ESTATÍSTICAS */}
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard icon={<Users />} title="Total" value={stats.total} color="blue" />
                <StatCard icon={<Award />} title="Finalistas" value={stats.finalists} color="copper" />
                <StatCard icon={<BarChart3 />} title="Votos IG" value={stats.votes} color="green" />
                <StatCard icon={<Award />} title="Vencedores" value={stats.winners} color="yellow" />
              </div>

              <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl">
                <Button
                  onClick={handleExport}
                  className="bg-copper hover:bg-copper/90 text-white"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exportar CSV (Finalistas)
                </Button>
              </div>
            </TabsContent>

            {/* 👨‍🍳 PARTICIPANTES (edição de votos) */}
            <TabsContent value="participants">
              <AdminTable
                participants={participants}
                onStatusChange={handleStatusChange}
                filterStatus="all"
              />
            </TabsContent>

            {/* 🏆 FINALISTAS (somente leitura) */}
            <TabsContent value="finalists">
              <AdminTable
                participants={finalists}
                onStatusChange={handleStatusChange}
                filterStatus="finalist"
                readOnlyVotes
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;