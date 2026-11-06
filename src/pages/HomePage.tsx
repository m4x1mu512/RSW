import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight, Flame, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS, BRANDS } from '../data/streetwearData.ts';
import { ProductCard } from '../components/ProductCard.tsx';

interface HomePageProps {
  onOpenBrandModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBrandModal }) => {
  const brandScrollRef = useRef<HTMLDivElement>(null);

  const scrollBrands = (direction: 'left' | 'right') => {
    if (brandScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      brandScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono font-medium text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>RUSSIAN STREETWEAR CLUB · ДРОПЫ 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white uppercase leading-[1.05] text-balance">
                Российский стритвир. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
                  Без компромиссов.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed">
                Единый курируемый хаб независимых отечественных брендов. Прямой доступ к оригинальным релизам, тяжелому хлопку, кастомной фурнитуре и архивным дропам без перекупщиков.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-black bg-cyan-400 hover:bg-cyan-300 active:scale-95 transition-all rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] whitespace-nowrap"
                >
                  <span>Смотреть каталог</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/brands"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:text-white bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 transition-all rounded-lg whitespace-nowrap"
                >
                  <span>Все бренды ({BRANDS.length})</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 text-xs font-mono text-zinc-400">
                <div>
                  <div className="text-white font-bold text-base font-display">6 МАРОК</div>
                  <div className="text-[11px] text-zinc-400">Официальные связи</div>
                </div>
                <div>
                  <div className="text-white font-bold text-base font-display">100% DIRECT</div>
                  <div className="text-[11px] text-zinc-400">Покупка у авторов</div>
                </div>
                <div>
                  <div className="text-white font-bold text-base font-display">0% НАЦЕНКИ</div>
                  <div className="text-[11px] text-zinc-400">Реальные цены дропов</div>
                </div>
              </div>
            </div>

            {/* Right Editorial Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 group">
                <img
                  src="/src/assets/images/hero_streetwear_editorial_1793989864740.jpg"
                  alt="Российский стритвир лукбук"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                {/* Editorial Caption Tag */}
                <div className="absolute bottom-5 inset-x-5 flex items-end justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold">
                      СЕЗОННЫЙ ЛУКБУК // 2026
                    </span>
                    <h2 className="text-lg font-display font-bold text-white">
                      Уличная эстетика Севера
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Москва · Санкт-Петербург · Урал
                    </p>
                  </div>
                  <Link
                    to="/catalog"
                    className="p-2.5 rounded-full bg-cyan-400/90 text-black hover:bg-cyan-300 transition-colors shadow-lg"
                    aria-label="В каталог"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Horizontal Scrollable "Бренды" Section */}
      <section className="py-12 border-b border-zinc-800/80 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
                <Flame className="w-3.5 h-3.5" />
                <span>РЕЗИДЕНТЫ КЛУБА</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                Бренды
              </h2>
            </div>

            {/* Scroll Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollBrands('left')}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="Листать бренды влево"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollBrands('right')}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="Листать бренды вправо"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scroll Container */}
          <div
            ref={brandScrollRef}
            className="flex items-stretch gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {BRANDS.map((brand) => (
              <Link
                key={brand.id}
                to={`/brand/${brand.slug}`}
                className="snap-start shrink-0 w-64 sm:w-72 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-cyan-500/40 rounded-xl p-5 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display font-black text-xl text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                      {brand.name}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {brand.city}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {brand.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-zinc-800/60 font-mono text-zinc-400">
                  <span>Основан в {brand.foundedYear}</span>
                  <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-sans font-semibold">
                    <span>Товары</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Products Grid (8 items) */}
      <section className="py-16 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>АКТУАЛЬНЫЕ РЕЛИЗЫ</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                Избранные дропы
              </h2>
            </div>

            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 group self-start sm:self-auto"
            >
              <span>Смотреть все ({PRODUCTS.length})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-black bg-cyan-400 hover:bg-cyan-300 active:scale-95 transition-all rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.25)]"
            >
              <span>Перейти в полный каталог</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Manifesto Section "О клубе" */}
      <section id="about" className="py-16 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
                МАНИФЕСТ СООБЩЕСТВА
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                Почему мы создали этот клуб
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Российская уличная мода давно переросла статус локального эксперимента. Наши бренды шьют из сверхплотного хлопка, разрабатывают кастомные анатомические лекала, используют высокотехнологичные ткани и мембраны.
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Мы создали платформу, которая исключает посредников: здесь вы находите лучшие вещи и переходите напрямую на официальные сайты дизайнеров для покупки без скрытых комиссий.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenBrandModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-700 hover:border-cyan-400 text-white hover:text-cyan-400 text-xs font-semibold rounded-lg transition-colors"
                >
                  <span>Вы создаете стритвир? Добавьте свой бренд</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-xl space-y-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <h3 className="font-display font-bold text-base text-white">
                  Прямой контакт
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Покупка происходит напрямую в официальных магазинах создателей без сторонних наценок.
                </p>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-xl space-y-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <h3 className="font-display font-bold text-base text-white">
                  Кураторский отбор
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Только самобытные бренды с собственной философией, честным производством и качественными тканями.
                </p>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-xl space-y-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <h3 className="font-display font-bold text-base text-white">
                  Тяжелый хлопок
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  От 280 г/м² на футболках до 480 г/м² на худи. Вещи, которые держат форму годами.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
