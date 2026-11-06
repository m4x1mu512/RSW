import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Send, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenBrandModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBrandModal }) => {
  return (
    <footer className="border-t border-zinc-800 bg-[#09090b] text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-display font-black text-2xl tracking-tighter text-white">
                RSW<span className="text-cyan-400">.</span>CLUB
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              Независимый агрегатор и медиум российского стритвира. Мы объединяем культовые бренды и смелые дропы со всей страны — от Санкт-Петербурга и Москвы до Урала и Крыма.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://t.me/russianstreetwear"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white hover:border-cyan-400/40 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Telegram Канал</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
              <button
                onClick={onOpenBrandModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Для брендов</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-200 mb-4 font-mono">
              Навигация
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/catalog" className="hover:text-cyan-400 transition-colors">
                  Каталог айтемов
                </Link>
              </li>
              <li>
                <Link to="/brands" className="hover:text-cyan-400 transition-colors">
                  Все бренды
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                  <Heart className="w-3.5 h-3.5 text-red-400" />
                  <span>Избранное</span>
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=hoodies" className="hover:text-cyan-400 transition-colors">
                  Худи и свитшоты
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=pants" className="hover:text-cyan-400 transition-colors">
                  Брюки и карго
                </Link>
              </li>
            </ul>
          </div>

          {/* Brands Quick List */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-200 mb-4 font-mono">
              Бренды в клубе
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/brand/hrdcr" className="hover:text-cyan-400 transition-colors">
                  HRDCR (СПб)
                </Link>
              </li>
              <li>
                <Link to="/brand/acolyte" className="hover:text-cyan-400 transition-colors">
                  ACOLYTE (Москва)
                </Link>
              </li>
              <li>
                <Link to="/brand/molotov" className="hover:text-cyan-400 transition-colors">
                  MOLOTOV (Пермь)
                </Link>
              </li>
              <li>
                <Link to="/brand/yalta-94" className="hover:text-cyan-400 transition-colors">
                  YALTA 94 (Ялта)
                </Link>
              </li>
              <li>
                <Link to="/brand/die-young" className="hover:text-cyan-400 transition-colors">
                  die young (Екатеринбург)
                </Link>
              </li>
              <li>
                <Link to="/brand/volchok" className="hover:text-cyan-400 transition-colors">
                  ВОЛЧОК (Москва)
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} RUSSIAN STREETWEAR CLUB. Прямой доступ к оригинальным коллекциям.
          </div>
          <div className="flex items-center gap-6">
            <span>Без наценок перекупщиков</span>
            <span aria-hidden="true">·</span>
            <span>Оригинальное производство</span>
            <span aria-hidden="true">·</span>
            <span>100% Local</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
