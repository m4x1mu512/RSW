import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PRODUCTS, type Product } from '../data/streetwearData.ts';
import { useFavorites } from '../context/FavoritesContext.tsx';
import { formatPrice, ProductCard } from '../components/ProductCard.tsx';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>(() => {
    return product && product.sizes.length > 0 ? product.sizes[0] : 'M';
  });

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Accordion open states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    description: true,
    composition: false,
    delivery: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Вещь не найдена
        </h2>
        <p className="text-sm text-zinc-400 mb-6">
          Возможно, этот айтем был распродан или снят с производства.
        </p>
        <Link
          to="/catalog"
          className="px-6 py-2.5 text-xs font-bold text-black bg-cyan-400 rounded-lg"
        >
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(product.id);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl];
  const activeImage = gallery[activeImageIndex] || product.imageUrl;

  // Related products from same brand or category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.brandSlug === product.brandSlug || p.category === product.category)
  ).slice(0, 4);

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад в каталог</span>
          </button>

          <div className="text-xs text-zinc-500 font-mono hidden sm:flex items-center gap-2">
            <Link to="/" className="hover:text-zinc-300">Главная</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-zinc-300">Каталог</Link>
            <span>/</span>
            <Link to={`/brand/${product.brandSlug}`} className="hover:text-cyan-400 text-zinc-300">
              {product.brand}
            </Link>
          </div>
        </div>

        {/* Product Grid: Large Gallery Left + Contiguous Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.isNew && (
                <div className="absolute top-4 left-4 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded border border-cyan-500/30">
                  NEW DROP · 2026
                </div>
              )}
            </div>

            {/* Thumbnail switcher if gallery has multiple items */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border transition-all ${
                      activeImageIndex === idx
                        ? 'border-cyan-400 ring-2 ring-cyan-400/30 scale-105'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Brand and SKU */}
              <div className="flex items-center justify-between text-xs">
                <Link
                  to={`/brand/${product.brandSlug}`}
                  className="font-display font-bold uppercase text-base text-cyan-400 hover:text-cyan-300 transition-colors tracking-wide"
                >
                  {product.brand}
                </Link>
                <span className="font-mono text-zinc-400 text-[11px]">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price & Color */}
              <div className="flex items-baseline justify-between pb-6 border-b border-zinc-800">
                <div className="font-mono text-3xl font-bold text-white tabular-nums">
                  {formatPrice(product.price)}
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  Цвет: <span className="text-zinc-200">{product.color}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-zinc-300">
                    Выберите размер
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Оверсайз посадка
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-12 py-2 px-3 text-xs font-mono font-bold rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-zinc-700'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons: "Где купить" & "В избранное" */}
              <div className="space-y-3 pt-2">
                <a
                  href={product.externalShopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-black bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] transition-all rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                  <span>Где купить · Официальный магазин</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold rounded-xl border transition-all ${
                    favorited
                      ? 'bg-zinc-900 border-red-500/50 text-red-400 hover:bg-zinc-800'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-200 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorited ? 'text-red-500 fill-red-500' : 'text-zinc-400'
                    }`}
                  />
                  <span>
                    {favorited ? 'В вашем избранном (удалить)' : 'Добавить в избранное'}
                  </span>
                </button>
              </div>

              {/* Direct Link Guarantee Notice */}
              <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-3 text-xs text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Мы не взимаем комиссию. Кнопка «Где купить» ведет напрямую на проверенный официальный сайт бренда {product.brand}.
                </span>
              </div>

              {/* Accordion Sections: Описание, Состав и уход, Доставка и возврат */}
              <div className="border-t border-zinc-800 pt-2 space-y-1">
                
                {/* 1. Описание */}
                <div className="border-b border-zinc-800/80">
                  <button
                    onClick={() => toggleSection('description')}
                    className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-mono font-bold tracking-wider text-zinc-200 hover:text-cyan-400 transition-colors"
                  >
                    <span>Описание и крой</span>
                    {openSections.description ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>
                  {openSections.description && (
                    <div className="pb-4 text-xs text-zinc-300 leading-relaxed space-y-2 animate-in fade-in duration-150">
                      <p>{product.description}</p>
                    </div>
                  )}
                </div>

                {/* 2. Состав и уход */}
                <div className="border-b border-zinc-800/80">
                  <button
                    onClick={() => toggleSection('composition')}
                    className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-mono font-bold tracking-wider text-zinc-200 hover:text-cyan-400 transition-colors"
                  >
                    <span>Состав и уход</span>
                    {openSections.composition ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>
                  {openSections.composition && (
                    <div className="pb-4 text-xs text-zinc-300 leading-relaxed space-y-2 animate-in fade-in duration-150">
                      <p>
                        <strong className="text-zinc-200">Материал:</strong> {product.composition}
                      </p>
                      <p>
                        <strong className="text-zinc-200">Инструкция по стирке:</strong> {product.careInstructions}
                      </p>
                    </div>
                  )}
                </div>

                {/* 3. Доставка и возврат */}
                <div className="border-b border-zinc-800/80">
                  <button
                    onClick={() => toggleSection('delivery')}
                    className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-mono font-bold tracking-wider text-zinc-200 hover:text-cyan-400 transition-colors"
                  >
                    <span>Доставка и возврат</span>
                    {openSections.delivery ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>
                  {openSections.delivery && (
                    <div className="pb-4 text-xs text-zinc-300 leading-relaxed space-y-2 animate-in fade-in duration-150">
                      <p>{product.deliveryInfo}</p>
                      <p className="text-zinc-400">
                        Возврат возможен в течение 14 дней с момента получения при сохранении товарного вида и бирок.
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                  РЕКОМЕНДАЦИИ
                </span>
                <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                  Вам также может понравиться
                </h2>
              </div>
              <Link
                to={`/brand/${product.brandSlug}`}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 hidden sm:inline"
              >
                Все вещи {product.brand} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
