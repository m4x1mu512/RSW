import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Send, MapPin, Calendar, Sparkles } from 'lucide-react';
import { BRANDS, PRODUCTS } from '../data/streetwearData.ts';
import { ProductCard } from '../components/ProductCard.tsx';

export const BrandDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const brand = BRANDS.find((b) => b.slug === slug || b.id === slug);
  const brandProducts = PRODUCTS.filter((p) => p.brandSlug === slug);

  if (!brand) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Бренд не найден
        </h2>
        <p className="text-sm text-zinc-400 mb-6">
          Бренд с таким адресом еще не добавлен в клуб.
        </p>
        <Link
          to="/brands"
          className="px-6 py-2.5 text-xs font-bold text-black bg-cyan-400 rounded-lg"
        >
          Все бренды
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/brands"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ко всем брендам</span>
          </Link>
        </div>

        {/* Brand Header Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-2xl mb-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center font-display font-black text-base text-cyan-400">
                  {brand.logoText.slice(0, 3)}
                </span>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
                    {brand.name}
                  </h1>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {brand.city}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      {brand.foundedYear}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-400/90">{brand.aesthetic}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {brand.description}
              </p>
            </div>

            {/* Official External Links */}
            <div className="flex flex-wrap sm:flex-col gap-3 shrink-0">
              <a
                href={brand.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all"
              >
                <span>Официальный магазин</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={brand.telegram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Telegram канал</span>
              </a>
            </div>
          </div>
        </div>

        {/* Brand Products Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight">
              Дропы бренда ({brandProducts.length})
            </h2>
            <Link
              to={`/catalog?brand=${brand.slug}`}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Фильтровать в каталоге →
            </Link>
          </div>

          {brandProducts.length === 0 ? (
            <div className="py-16 text-center bg-zinc-900/30 rounded-2xl border border-zinc-800">
              <p className="text-sm text-zinc-400">
                Все дропы этого бренда в данный момент распроданы. Следите за обновлениями в официальном Telegram.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
