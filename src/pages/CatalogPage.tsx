import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronDown,
  Layers
} from 'lucide-react';
import { PRODUCTS as STATIC_PRODUCTS, BRANDS as STATIC_BRANDS, CATEGORIES, SIZES, type Product } from '../data/streetwearData.ts';
import { supabase } from '../lib/supabase.ts';
import { ProductCard } from '../components/ProductCard.tsx';

const ITEMS_PER_PAGE = 8;

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract query params
  const categoryParam = searchParams.get('category') || 'all';
  const brandParam = searchParams.get('brand') || 'all';
  const sizeParam = searchParams.get('size') || 'all';
  const sortParam = searchParams.get('sort') || 'default';
  const searchParam = searchParams.get('q') || '';
  const maxPriceParam = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 15000;
  const cityParam = searchParams.get('city') || 'all';

  // Local state for UI
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    brandParam === 'all' ? [] : brandParam.split(',')
  );
  const [selectedSize, setSelectedSize] = useState(sizeParam);
  const [maxPrice, setMaxPrice] = useState<number>(maxPriceParam);
  const [selectedCities, setSelectedCities] = useState<string[]>(cityParam === 'all' ? [] : cityParam.split(','));
  const [sortBy, setSortBy] = useState(sortParam);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Public catalog data is gated by Supabase publication status (RLS also limits
  // anonymous reads to published rows).
  const [publishedBrandSlugs, setPublishedBrandSlugs] = useState<string[] | null>(null);
  const [publishedProductSlugs, setPublishedProductSlugs] = useState<string[] | null>(null);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');

  useEffect(() => {
    let active = true;

    const loadPublishedCatalog = async () => {
      try {
        const [brandsResult, productsResult] = await Promise.all([
          supabase.from('brands').select('slug').eq('status', 'published'),
          supabase.from('products').select('slug').eq('status', 'published'),
        ]);

        if (!active) return;

        if (brandsResult.error || productsResult.error) {
          throw brandsResult.error || productsResult.error;
        }

        setPublishedBrandSlugs((brandsResult.data || []).map((brand) => brand.slug));
        setPublishedProductSlugs((productsResult.data || []).map((product) => product.slug));
      } catch (error) {
        if (!active) return;
        setCatalogError(error instanceof Error ? error.message : 'Не удалось загрузить опубликованный каталог.');
        setPublishedBrandSlugs([]);
        setPublishedProductSlugs([]);
      } finally {
        if (active) setCatalogLoading(false);
      }
    };

    void loadPublishedCatalog();
    return () => {
      active = false;
    };
  }, []);

  const catalogBrands = useMemo(
    () => STATIC_BRANDS.filter((brand) => publishedBrandSlugs?.includes(brand.slug)),
    [publishedBrandSlugs]
  );
  const catalogProducts = useMemo(
    () => STATIC_PRODUCTS.filter(
      (product) =>
        publishedProductSlugs?.includes(product.id) &&
        publishedBrandSlugs?.includes(product.brandSlug)
    ),
    [publishedBrandSlugs, publishedProductSlugs]
  );

  // Sync state with URL params
  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSelectedBrands(brandParam === 'all' ? [] : brandParam.split(','));
    setSelectedSize(sizeParam);
    setSortBy(sortParam);
    setMaxPrice(maxPriceParam);
    setSelectedCities(cityParam === 'all' ? [] : cityParam.split(','));
    setSearchQuery(searchParam);
  }, [categoryParam, brandParam, sizeParam, sortParam, maxPriceParam, cityParam, searchParam]);

  const updateFilters = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === 'all' || val === '' || (key === 'maxPrice' && Number(val) >= 15000)) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    setSearchParams(params);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const toggleBrand = (slug: string) => {
    let next: string[];
    if (selectedBrands.includes(slug)) {
      next = selectedBrands.filter((b) => b !== slug);
    } else {
      next = [...selectedBrands, slug];
    }
    setSelectedBrands(next);
    updateFilters({ brand: next.length > 0 ? next.join(',') : null });
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    updateFilters({ category: catId === 'all' ? null : catId });
  };

  const handleSizeSelect = (size: string) => {
    const nextSize = selectedSize === size ? 'all' : size;
    setSelectedSize(nextSize);
    updateFilters({ size: nextSize === 'all' ? null : nextSize });
  };

  const handlePriceChange = (price: number) => {
    setMaxPrice(price);
    updateFilters({ maxPrice: price >= 15000 ? null : String(price) });
  };

  const toggleCity = (city: string) => {
    const next = selectedCities.includes(city) ? selectedCities.filter((item) => item !== city) : [...selectedCities, city];
    setSelectedCities(next);
    updateFilters({ city: next.length ? next.join(',') : null });
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    updateFilters({ sort: newSort === 'default' ? null : newSort });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ q: searchQuery.trim() || null });
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setSelectedSize('all');
    setMaxPrice(15000);
    setSelectedCities([]);
    setSortBy('default');
    setSearchQuery('');
    setSearchParams({});
    setVisibleCount(ITEMS_PER_PAGE);
  };

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return catalogProducts.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(item.brandSlug)) {
        return false;
      }
      // Size filter
      if (selectedSize !== 'all' && !item.sizes.includes(selectedSize)) {
        return false;
      }
      // Price filter
      if (item.price > maxPrice) {
        return false;
      }
      // City filter (each product inherits its brand's city)
      if (selectedCities.length > 0) {
        const productCity = catalogBrands.find((brand) => brand.slug === item.brandSlug)?.city;
        if (!productCity || !selectedCities.includes(productCity)) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesBrand = item.brand.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesColor = item.color.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesColor) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // default
    });
  }, [catalogProducts, catalogBrands, selectedCategory, selectedBrands, selectedSize, maxPrice, selectedCities, searchQuery, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedBrands.length +
    (selectedSize !== 'all' ? 1 : 0) +
    (maxPrice < 15000 ? 1 : 0) +
    selectedCities.length +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>ОФИЦИАЛЬНЫЙ КАТАЛОГ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Каталог айтемов
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'вещь' : 'вещей'} доступно напрямую у брендов
            </p>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Поиск по марке, названию, цвету..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-9 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  updateFilters({ q: null });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Action Bar (Mobile filter trigger + Sorting dropdown) */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Фильтры</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-cyan-400 text-black text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Сбросить все</span>
              </button>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-zinc-400 hidden sm:inline">Сортировка:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 pr-8 text-xs font-semibold text-zinc-200 hover:text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
              >
                <option value="default">По умолчанию</option>
                <option value="price_asc">Цена: по возрастанию</option>
                <option value="price_desc">Цена: по убыванию</option>
                <option value="newest">Новинки</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-8 pr-4">
            
            {/* Category Filter */}
            <div>
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-zinc-300 mb-3">
                Категория
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const count =
                    cat.id === 'all'
                      ? catalogProducts.length
                      : catalogProducts.filter((p) => p.category === cat.id).length;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                        isSelected
                          ? 'bg-zinc-800 text-cyan-400 font-semibold'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="text-[11px] font-mono text-zinc-400">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brands Filter */}
            <div>
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-zinc-300 mb-3">
                Бренд
              </h3>
              <div className="space-y-2 pr-2" style={{ height: '120px', overflowY: 'auto' }}>
                {catalogBrands.map((brand) => {
                  const count = catalogProducts.filter((p) => p.brandSlug === brand.slug).length;
                  const isChecked = selectedBrands.includes(brand.slug);

                  return (
                    <label
                      key={brand.id}
                      className="flex items-center justify-between text-xs text-zinc-300 hover:text-white cursor-pointer select-none py-1 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleBrand(brand.slug)}
                          className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-cyan-400 focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer accent-cyan-400"
                        />
                        <span className={isChecked ? 'text-cyan-400 font-semibold' : ''}>
                          {brand.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-zinc-300 mb-3">
                Размер
              </h3>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-cyan-400 text-black border-cyan-400 font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-zinc-300">
                  Макс. цена
                </h3>
                <span className="text-xs font-mono font-bold text-cyan-400 tabular-nums">
                  до {maxPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <input
                type="range"
                min="3000"
                max="15000"
                step="500"
                value={maxPrice}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer bg-zinc-800 h-1.5 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-1">
                <span>3 000 ₽</span>
                <span>15 000 ₽</span>
              </div>
            </div>

            {/* City Filter */}
            <div>
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-zinc-300 mb-3">Город</h3>
              <div className="space-y-2 pr-2" style={{ height: '120px', overflowY: 'auto' }}>
                {Array.from(new Set(catalogBrands.map((brand) => brand.city))).map((city) => {
                  const isChecked = selectedCities.includes(city);
                  const count = catalogProducts.filter((product) => catalogBrands.some((brand) => brand.slug === product.brandSlug && brand.city === city)).length;
                  return (
                    <label key={city} className="flex items-center justify-between text-xs text-zinc-300 hover:text-white cursor-pointer select-none py-1">
                      <span className="flex items-center gap-2.5">
                        <input type="checkbox" checked={isChecked} onChange={() => toggleCity(city)} className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-cyan-400 focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer accent-cyan-400" />
                        <span className={isChecked ? 'text-cyan-400 font-semibold' : ''}>{city}</span>
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {catalogLoading ? (
              <div className="py-20 text-center text-sm text-zinc-400">Загружаем опубликованный каталог…</div>
            ) : catalogError ? (
              <div role="alert" className="py-12 text-center rounded-2xl border border-red-900/60 bg-red-950/20 px-4 text-sm text-red-200">
                Не удалось загрузить каталог. Обновите страницу, чтобы попробовать снова.
              </div>
            ) : visibleProducts.length === 0 ? (
              <div className="py-20 text-center bg-zinc-900/30 rounded-2xl border border-zinc-800/80 px-4">
                <h3 className="text-lg font-display font-bold text-white mb-2">
                  Ничего не найдено
                </h3>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto mb-6">
                  По заданным параметрам фильтрации подходящих вещей не найдено. Попробуйте сбросить фильтры или изменить запрос.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  Сбросить все фильтры
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center pt-6">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                      className="px-8 py-3 text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all active:scale-95"
                    >
                      Показать еще ({filteredProducts.length - visibleCount} осталось)
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/80 backdrop-blur-sm lg:hidden animate-in fade-in duration-150">
          <div
            className="w-full max-w-xs bg-zinc-950 p-6 h-full overflow-y-auto space-y-6 ml-auto border-l border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h2 className="font-display font-bold text-base text-white uppercase">
                Фильтры
              </h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category */}
            <div>
              <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-zinc-300 mb-2">
                Категория
              </h4>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`w-full text-left px-3 py-1.5 rounded text-xs ${
                      selectedCategory === cat.id
                        ? 'bg-zinc-800 text-cyan-400 font-semibold'
                        : 'text-zinc-400'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-zinc-300 mb-2">
                Бренд
              </h4>
              <div className="space-y-1.5 pr-2" style={{ height: '120px', overflowY: 'auto' }}>
                {catalogBrands.map((brand) => (
                  <label
                    key={brand.id}
                    className="flex items-center gap-2 text-xs text-zinc-300 py-1"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.slug)}
                      onChange={() => toggleBrand(brand.slug)}
                      className="accent-cyan-400"
                    />
                    <span>{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-zinc-300 mb-2">
                Размер
              </h4>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`px-3 py-1 text-xs font-mono rounded border ${
                      selectedSize === size
                        ? 'bg-cyan-400 text-black border-cyan-400 font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-300">До</span>
                <span className="font-mono text-cyan-400">{maxPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <input type="range" min="3000" max="15000" step="500" value={maxPrice} onChange={(e) => handlePriceChange(Number(e.target.value))} className="w-full accent-cyan-400" />
            </div>
            {/* City */}
            <div>
              <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-zinc-300 mb-2">Город</h4>
              <div className="space-y-1.5 pr-2" style={{ height: '120px', overflowY: 'auto' }}>
                {Array.from(new Set(catalogBrands.map((brand) => brand.city))).map((city) => (
                  <label key={city} className="flex items-center gap-2 text-xs text-zinc-300 py-1">
                    <input type="checkbox" checked={selectedCities.includes(city)} onChange={() => toggleCity(city)} className="accent-cyan-400" />
                    <span>{city}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex gap-2">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-2 text-xs font-semibold text-zinc-400 bg-zinc-900 rounded"
              >
                Сбросить
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 text-xs font-bold text-black bg-cyan-400 rounded"
              >
                Применить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
