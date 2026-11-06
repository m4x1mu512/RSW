import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Send, Sparkles, MapPin, Calendar } from 'lucide-react';
import { BRANDS } from '../data/streetwearData.ts';

interface BrandsPageProps {
  onOpenBrandModal: () => void;
}

export const BrandsPage: React.FC<BrandsPageProps> = ({ onOpenBrandModal }) => {
  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>СООБЩЕСТВО КРЕАТОРОВ</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
              Бренды клуба
            </h1>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed">
              Независимые марки, формирующие визуальный язык современного российского стритвира. Без дистрибьюторских наценок — только авторское видение.
            </p>
          </div>

          <button
            onClick={onOpenBrandModal}
            className="self-start md:self-auto px-5 py-3 text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all flex items-center gap-2"
          >
            <span>Подать свой бренд</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] group"
            >
              <div>
                {/* Brand Logo / Monogram Top Bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center font-display font-black text-lg text-white group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                    {brand.logoText.slice(0, 3)}
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold block">
                      {brand.itemCount || 0} айтемов
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      с {brand.foundedYear} года
                    </span>
                  </div>
                </div>

                {/* Brand Name & Location */}
                <div className="mb-3">
                  <Link to={`/brand/${brand.slug}`}>
                    <h2 className="text-2xl font-display font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                      {brand.name}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      {brand.city}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-400">{brand.aesthetic}</span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {brand.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={brand.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-zinc-700 transition-colors"
                    title="Telegram"
                    aria-label={`Telegram ${brand.name}`}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-zinc-700 transition-colors"
                    title="Официальный сайт"
                    aria-label={`Сайт ${brand.name}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <Link
                  to={`/brand/${brand.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 group-hover:bg-cyan-400 group-hover:text-black transition-all"
                >
                  <span>Смотреть товары</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
