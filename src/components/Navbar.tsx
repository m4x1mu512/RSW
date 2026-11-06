import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, ArrowUpRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext.tsx';

interface NavbarProps {
  onOpenBrandModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBrandModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: 'Каталог', path: '/catalog' },
    { label: 'Бренды', path: '/brands' },
    { label: 'О клубе', path: '/#about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
        >
          <span className="font-display font-black tracking-tighter text-xl text-white group-hover:text-cyan-400 transition-colors">
            RSW<span className="text-cyan-400">.</span>CLUB
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded">
            RUSSIAN STREETWEAR
          </span>
        </Link>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`whitespace-nowrap shrink-0 transition-colors ${
                isActive(link.path)
                  ? 'text-cyan-400 font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <Link
            to="/favorites"
            className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
              isActive('/favorites')
                ? 'text-cyan-400 font-semibold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                favorites.length > 0 ? 'text-red-400 fill-red-400/20' : ''
              }`}
            />
            <span>Избранное</span>
            {favorites.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-mono font-bold bg-zinc-800 text-cyan-400 border border-zinc-700 rounded">
                {favorites.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBrandModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 active:scale-95 transition-all rounded shadow-[0_0_15px_rgba(34,211,238,0.25)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Для брендов</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-3 pb-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <Link
            to="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-300 hover:text-cyan-400"
          >
            Каталог айтемов
          </Link>
          <Link
            to="/brands"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-300 hover:text-cyan-400"
          >
            Бренды
          </Link>
          <Link
            to="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-300 hover:text-cyan-400"
          >
            О клубе
          </Link>
          <Link
            to="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2 text-sm font-medium text-zinc-300 hover:text-cyan-400"
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400" />
              Избранное
            </span>
            {favorites.length > 0 && (
              <span className="px-2 py-0.5 text-xs font-mono bg-zinc-800 text-cyan-400 rounded">
                {favorites.length}
              </span>
            )}
          </Link>

          <div className="pt-3 border-t border-zinc-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrandModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded"
            >
              <span>Подать заявку бренда</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
