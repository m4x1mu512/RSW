import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS, BRANDS, type Product, type Brand } from './src/data/streetwearData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory brand applications submitted via "Для брендов" form
interface BrandApplication {
  id: string;
  brandName: string;
  city: string;
  website: string;
  telegram: string;
  contactName: string;
  contactEmail: string;
  description: string;
  lookbookUrl: string;
  submittedAt: string;
}

const brandApplications: BrandApplication[] = [
  {
    id: 'app-01',
    brandName: 'SEVER-81',
    city: 'Мурманск',
    website: 'https://sever81.ru',
    telegram: '@sever81',
    contactName: 'Алексей',
    contactEmail: 'alex@sever81.ru',
    description: 'Северный минимализм и непромокаемая одежда для штормовой погоды.',
    lookbookUrl: 'https://sever81.ru/lookbook-24',
    submittedAt: new Date().toISOString()
  }
];

// API Endpoints
// GET /api/brands
app.get('/api/brands', (_req, res) => {
  res.json({ success: true, brands: BRANDS });
});

// GET /api/brands/:slug
app.get('/api/brands/:slug', (req, res) => {
  const { slug } = req.params;
  const brand = BRANDS.find((b) => b.slug === slug || b.id === slug);
  if (!brand) {
    return res.status(404).json({ success: false, message: 'Brand not found' });
  }
  const brandProducts = PRODUCTS.filter((p) => p.brandSlug === brand.slug);
  res.json({ success: true, brand: { ...brand, products: brandProducts } });
});

// GET /api/products
app.get('/api/products', (req, res) => {
  let filtered = [...PRODUCTS];
  const { brand, category, search, sort, size, minPrice, maxPrice, featured } = req.query;

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (brand && brand !== 'all') {
    const brandSlugs = String(brand).split(',');
    filtered = filtered.filter((p) => brandSlugs.includes(p.brandSlug));
  }

  if (size && size !== 'all') {
    filtered = filtered.filter((p) => p.sizes.includes(String(size)));
  }

  if (minPrice) {
    const min = Number(minPrice);
    if (!isNaN(min)) filtered = filtered.filter((p) => p.price >= min);
  }

  if (maxPrice) {
    const max = Number(maxPrice);
    if (!isNaN(max)) filtered = filtered.filter((p) => p.price <= max);
  }

  if (featured === 'true') {
    filtered = filtered.filter((p) => p.featured);
  }

  if (search) {
    const q = String(search).toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
    );
  }

  if (sort === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'newest') {
    filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  res.json({
    success: true,
    total: filtered.length,
    products: filtered
  });
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.brandSlug === product.brandSlug || p.category === product.category)
  ).slice(0, 4);

  res.json({ success: true, product, related });
});

// POST /api/brand-applications
app.post('/api/brand-applications', (req, res) => {
  const { brandName, city, website, telegram, contactName, contactEmail, description, lookbookUrl } = req.body;
  if (!brandName || !city || !contactEmail) {
    return res.status(400).json({ success: false, message: 'Не все обязательные поля заполнены.' });
  }

  const newApp: BrandApplication = {
    id: `app-${Date.now()}`,
    brandName,
    city,
    website: website || '',
    telegram: telegram || '',
    contactName: contactName || '',
    contactEmail,
    description: description || '',
    lookbookUrl: lookbookUrl || '',
    submittedAt: new Date().toISOString()
  };

  brandApplications.push(newApp);
  res.status(201).json({
    success: true,
    message: 'Заявка успешно принята! Наш куратор свяжется с вами в течение 24 часов.',
    application: newApp
  });
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RUSSIAN STREETWEAR CLUB running at http://0.0.0.0:${PORT} [${isProduction ? 'prod' : 'dev'}]`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
});
