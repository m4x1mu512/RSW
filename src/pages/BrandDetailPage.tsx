import React,{useEffect,useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Send, MapPin, Calendar } from 'lucide-react';
import { BRANDS, PRODUCTS } from '../data/streetwearData.ts';
import { ProductCard } from '../components/ProductCard.tsx';
import { supabase } from '../lib/supabase.ts';

export const BrandDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const staticBrand = BRANDS.find((b) => b.slug === slug || b.id === slug);
  const [dbBrand,setDbBrand]=useState<any>(null);
  const [dbProducts,setDbProducts]=useState<any[]>([]);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    if(!slug||staticBrand){setDbBrand(null);setDbProducts([]);setLoading(false);return;}
    let active=true;
    setLoading(true);
    const load=async()=>{
      const {data:brand,error}=await supabase.from('brands').select('*').eq('slug',slug).maybeSingle();
      if(!active)return;
      if(error||!brand){setDbBrand(null);setDbProducts([]);setLoading(false);return;}
      const {data:products}=await supabase.from('products').select('*').eq('brand_id',brand.id).eq('status','published').order('created_at',{ascending:false});
      if(!active)return;
      setDbBrand(brand);
      setDbProducts(products||[]);
      setLoading(false);
    };
    void load();
    return ()=>{active=false;};
  },[slug,staticBrand]);

  const brand=staticBrand||(dbBrand?{
    id:dbBrand.id,
    name:dbBrand.name,
    slug:dbBrand.slug,
    city:dbBrand.city||'',
    foundedYear:dbBrand.founded_year,
    description:dbBrand.description||'',
    logoText:dbBrand.logo_text||dbBrand.name,
    logoUrl:dbBrand.logo_url||'',
    website:dbBrand.website||'',
    telegram:dbBrand.telegram||'',
    aesthetic:dbBrand.aesthetic||''
  }:null);
  const brandProducts=staticBrand?PRODUCTS.filter((p)=>p.brandSlug===staticBrand.slug):dbProducts;

  if(loading&&!brand){
    return <div className="min-h-[60vh] flex items-center justify-center text-sm text-zinc-400">Загрузка бренда…</div>;
  }
  if (!brand) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-display font-bold text-white mb-2">Бренд не найден</h2>
        <p className="text-sm text-zinc-400 mb-6">Бренд с таким адресом еще не добавлен в клуб.</p>
        <Link to="/brands" className="px-6 py-2.5 text-xs font-bold text-black bg-cyan-400 rounded-lg">Все бренды</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/brands" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-cyan-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /><span>Ко всем брендам</span>
          </Link>
        </div>
        <div className="p-8 sm:p-10 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-2xl mb-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                {('logoUrl' in brand)&&brand.logoUrl?(
                  <img src={brand.logoUrl} alt="" className="w-12 h-12 rounded-xl border border-zinc-800 object-cover"/>
                ):(
                  <span className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center font-display font-black text-base text-cyan-400">{brand.logoText.slice(0,3)}</span>
                )}
                <div>
                  <h1 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">{brand.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 mt-0.5">
                    {brand.city&&<span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-400"/>{brand.city}</span>}
                    {brand.foundedYear&&<><span aria-hidden="true">·</span><span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-zinc-400"/>{brand.foundedYear}</span></>}
                    {brand.aesthetic&&<><span aria-hidden="true">·</span><span className="text-cyan-400/90">{brand.aesthetic}</span></>}
                  </div>
                </div>
              </div>
              {brand.description&&<p className="text-sm text-zinc-300 leading-relaxed">{brand.description}</p>}
            </div>
            <div className="flex flex-wrap sm:flex-col gap-3 shrink-0">
              {brand.website&&<a href={brand.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all"><span>Официальный магазин</span><ExternalLink className="w-3.5 h-3.5"/></a>}
              {brand.telegram&&<a href={brand.telegram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"><Send className="w-3.5 h-3.5 text-cyan-400"/><span>Telegram канал</span></a>}
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight">Товары бренда ({brandProducts.length})</h2>
            {staticBrand&&<Link to={`/catalog?brand=${brand.slug}`} className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">Фильтровать в каталоге →</Link>}
          </div>
          {brandProducts.length===0?(
            <div className="py-16 text-center bg-zinc-900/30 rounded-2xl border border-zinc-800"><p className="text-sm text-zinc-400">У этого бренда пока нет опубликованных товаров.</p></div>
          ):staticBrand?(
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{brandProducts.map((product)=><ProductCard key={product.id} product={product}/>)}</div>
          ):(
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dbProducts.map((product)=>(
                <article key={product.id} className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/60">
                  {product.image_url&&<img src={product.image_url} alt={product.name} className="aspect-[4/3] w-full object-cover bg-zinc-950"/>}
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div><h3 className="text-sm font-semibold text-zinc-100">{product.name}</h3>{product.description&&<p className="mt-2 text-xs leading-relaxed text-zinc-400">{product.description}</p>}</div>
                    <div className="mt-auto flex items-center justify-between border-t border-zinc-800/60 pt-3">
                      <span className="font-mono text-base font-bold text-white">{Number(product.price).toLocaleString('ru-RU')} ₽</span>
                      {product.external_shop_url&&<a href={product.external_shop_url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">К товару ↗</a>}
                    </div>
                    {Array.isArray(product.sizes)&&product.sizes.length>0&&<p className="text-[11px] font-mono text-zinc-500">{product.sizes.join(' · ')}</p>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
