import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import HomePage from "@/pages/HomePage";
import ParticipationForm from "@/pages/ParticipationForm";
import VotingPage from "@/pages/VotingPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import RulesPage from '@/pages/RulesPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Helmet>
          <html lang="pt-BR" />
          <title>Sabores do Brasil no Japão | Pata Negra Defumados</title>
          <meta
            name="description"
            content="Vote, participe e ajude a escolher o melhor sabor artesanal da Pata Negra Defumados no Japão."
          />
          <meta name="theme-color" content="#000000" />
        </Helmet>

        <div className="min-h-screen bg-black text-white">
          <Navigation />
          <Toaster />

          <Routes>
            {/* Público */}
            <Route path="/" element={<HomePage />} />
            <Route path="/participar" element={<ParticipationForm />} />
            <Route path="/votacao" element={<VotingPage />} />
            <Route path="/regras" element={<RulesPage />} />



            {/* Redirects */}
            <Route path="/participar" element={<Navigate to="/participar" replace />} />
            <Route path="/voting" element={<Navigate to="/votacao" replace />} />

            {/* Admin */}
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin/login" element={<Navigate to="/login" replace />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;