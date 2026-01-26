
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import FormInput from '@/components/FormInput';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError('Credenciais inválidas. Verifique seu email e senha.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar entrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Desafio Pata Negra</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-dark-brown to-black">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 mx-auto text-copper mb-4" />
            <h1 className="text-3xl font-bold">Área Administrativa</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
            <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<User className="text-gray-400"/>} required />
            <FormInput label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} icon={<Lock className="text-gray-400"/>} required />

            <Button type="submit" disabled={loading} className="w-full bg-copper hover:bg-copper/90 text-white py-6 text-lg rounded-xl">
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;
