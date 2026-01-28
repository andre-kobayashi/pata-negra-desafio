import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Send, Trophy, UtensilsCrossed, FileText } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ITENS DO MENU
  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/votacao', label: 'Ranking', icon: Trophy },
    { path: '/regras', label: 'Regras', icon: FileText },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-black/95 backdrop-blur-md py-3 border-b border-white/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">

          {/* LOGO */}
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
                className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-copper flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'text-copper'
                    : 'text-gray-400'
                }`}
              >
                {item.label}
                {isActive(item.path) && <motion.div layoutId="nav-underline" className="w-1 h-1 bg-copper rounded-full" />}
              </Link>
            ))}

            <Link to="/participacao">
              <Button className="bg-copper hover:bg-copper/90 text-white font-black px-6 rounded-full uppercase text-[10px] tracking-widest shadow-glow">
                Participar Agora
              </Button>
            </Link>
          </div>

          {/* MOBILE FAST ACTION */}
          <div className="flex md:hidden items-center gap-4">
            {!isOpen && !isActive('/participacao') && (
              <Link to="/participacao">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Button
                    size="sm"
                    className="bg-copper text-white font-black text-[10px] uppercase rounded-full h-8 px-4 shadow-glow"
                  >
                    Participar
                  </Button>
                </motion.div>
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-1 active:scale-90 transition-transform"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-black border-b border-white/10 px-6 py-8 md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      isActive(item.path)
                        ? 'bg-copper/10 border-copper/40 text-copper'
                        : 'bg-zinc-900/50 border-zinc-800 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={20} className={isActive(item.path) ? 'text-copper' : 'text-gray-500'} />
                      <span className="font-black uppercase tracking-tighter text-lg italic">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                ))}

                {/* DESTAQUE DO MENU MOBILE */}
                <Link
                  to="/participacao"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 flex items-center justify-between p-5 rounded-2xl bg-copper text-white shadow-glow active:scale-95 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <UtensilsCrossed size={22} />
                    <span className="font-black uppercase tracking-tighter text-xl italic">
                      Quero os ¥20.000
                    </span>
                  </div>
                  <Send size={20} className="animate-pulse" />
                </Link>

                <div className="mt-6 text-center">
                  <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.3em] italic">
                    Pata Negra Defumados • Japan 2026
                  </p>
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
