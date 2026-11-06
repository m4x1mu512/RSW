import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowUpRight } from 'lucide-react';
import type { Product } from '../data/streetwearData.ts';
import { useFavorites } from '../context/FavoritesContext.tsx';

interface ProductCardProps {
  product: Product;
}

export const formatPrice = (price: number): string => {
  return price.toLocaleString('ru-RU') + ' ₽';
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imageFailed, setImageFailed] = useState(false);
  const favorited = isFavorite(product.id);

  return (
    <div className="group relative flex flex-col bg-zinc-900/60 rounded-xl overflow-hidden border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
      {/* Image Container with Hover Zoom */}
      <Link
        to={`/product/${product.id}`}
        className={`relative aspect-[4/3] w-full overflow-hidden block ${imageFailed ? 'flex items-center justify-center bg-zinc-900' : 'bg-zinc-950'}`}
      >
        {imageFailed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 px-4">
            <span className="font-display text-sm tracking-wider uppercase font-bold text-zinc-500">
              {product.brand}
            </span>
          </div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}

        {/* Top Floating Badges / Actions */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {product.isNew ? (
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-cyan-400 bg-zinc-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-cyan-500/30">
              NEW DROP
            </span>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className="pointer-events-auto p-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all active:scale-90"
            aria-label={favorited ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                favorited
                  ? 'text-red-500 fill-red-500'
                  : 'text-zinc-300 group-hover:text-white'
              }`}
            />
          </button>
        </div>

        {/* Subtle bottom gradient on image */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Sizes */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <Link
              to={`/brand/${product.brandSlug}`}
              className="font-bold uppercase tracking-wider text-cyan-400/90 hover:text-cyan-300 transition-colors"
            >
              {product.brand}
            </Link>
            <div className="text-[11px] font-mono text-zinc-400">
              {product.sizes.join(' · ')}
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-white">
            <h3 className="text-sm font-semibold text-zinc-200 line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Buy indicator */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 mt-auto">
          <span className="font-mono text-base font-bold text-white tabular-nums">
            {formatPrice(product.price)}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 group-hover:text-cyan-400 transition-colors"
          >
            <span>Смотреть</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
