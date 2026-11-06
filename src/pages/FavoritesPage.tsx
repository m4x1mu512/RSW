import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, ExternalLink } from 'lucide-react';
import { PRODUCTS } from '../data/streetwearData.ts';
import { useFavorites } from '../context/FavoritesContext.tsx';
import { formatPrice } from '../components/ProductCard.tsx';

export const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-zinc-800/80 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
              <Heart className="w-3.5 h-3.5 text-red-400" />
              <span>СОХРАНЕННЫЕ ВЕЩИ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Избранное
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              {favoriteProducts.length} {favoriteProducts.length === 1 ? 'сохраненная вещь' : 'сохраненных вещей'}
            </p>
          </div>

          {favoriteProducts.length > 0 && (
            <button
              onClick={clearFavorites}
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-red-400 transition-colors self-start sm:self-auto"
            >
              <Trash2 className="w-4 h-4" />
              <span>Очистить избранное</span>
            </button>
          )}
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="py-20 text-center bg-zinc-900/30 rounded-2xl border border-zinc-800/80 px-4">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-500">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              В избранном пока ничего нет
            </h3>
            <p className="text-sm text-zinc-400 max-w-sm mx-auto mb-6">
              Нажимайте на иконку сердечка на карточках вещей в каталоге, чтобы быстро вернуться к ним позже.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all"
            >
              <span>Перейти в каталог</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-zinc-900/60 rounded-xl overflow-hidden border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300"
              >
                {/* Image */}
                <Link
                  to={`/product/${product.id}`}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 block"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFavorite(product.id);
                      }}
                      className="p-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-red-400 hover:text-white hover:bg-red-500/20 transition-all"
                      title="Удалить из избранного"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                      <Link
                        to={`/brand/${product.brandSlug}`}
                        className="font-bold uppercase tracking-wider text-cyan-400/90 hover:text-cyan-300"
                      >
                        {product.brand}
                      </Link>
                      <span className="font-mono text-[11px] text-zinc-400">
                        {product.sizes.join(' · ')}
                      </span>
                    </div>

                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="text-sm font-semibold text-zinc-200 line-clamp-1 group-hover:text-white">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-zinc-800/60">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-base font-bold text-white tabular-nums">
                        {formatPrice(product.price)}
                      </span>
                      <Link
                        to={`/product/${product.id}`}
                        className="text-xs font-semibold text-cyan-400 hover:underline"
                      >
                        Детали
                      </Link>
                    </div>

                    <a
                      href={product.externalShopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Купить в магазине бренда</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
