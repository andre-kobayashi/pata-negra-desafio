import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Send, Trophy, UtensilsCrossed } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Efeito para mudar o fundo ao scrollar (bom para o Hero transparente)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/votacao', label: 'Votação', icon: Trophy },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled || isOpen ? 'bg-black/95 backdrop-blur-md py-3 border-b border-white/10' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* LOGO - Lado Esquerdo */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex-shrink-0 scale-90 origin-left"
          >
            <Logo />
          </motion.div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-copper ${
                  isActive(item.path) ? 'text-copper underline underline-offset-8' : 'text-gray-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/participacao">
              <Button className="bg-copper hover:bg-copper/90 text-white font-bold px-6 rounded-full uppercase text-xs tracking-widest">
                Participar Agora
              </Button>
            </Link>
          </div>

          {/* MOBILE - BOTÃO PARTICIPAR RÁPIDO + HAMBURGER */}
          <div className="flex md:hidden items-center gap-4">
            {!isOpen && !isActive('/participacao') && (
              <Link to="/participacao">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Button size="sm" className="bg-copper text-white font-black text-[10px] uppercase rounded-full h-8 px-4 shadow-[0_0_15px_rgba(184,115,51,0.5)]">
                    Participar
                  </Button>
                </motion.div>
              </Link>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-1"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-black border-b border-white/10 px-6 py-8 md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      isActive(item.path) 
                      ? 'bg-copper/10 border-copper text-copper' 
                      : 'bg-zinc-900/50 border-zinc-800 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span className="font-bold uppercase tracking-tighter text-lg">{item.label}</span>
                    </div>
                  </Link>
                ))}

                {/* DESTAQUE PARTICIPAR NO MENU */}
                <Link
                  to="/participacao"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 flex items-center justify-between p-5 rounded-xl bg-copper text-white shadow-lg active:scale-95 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <UtensilsCrossed size={22} />
                    <span className="font-black uppercase tracking-tighter text-xl italic">Quero Ganhar ¥20.000</span>
                  </div>
                  <Send size={20} className="animate-pulse" />
                </Link>

                <div className="mt-4 text-center">
                  <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Desafio Pata Negra • Japão 2024</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;