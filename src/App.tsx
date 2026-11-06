import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { BrandSubmissionModal } from './components/BrandSubmissionModal.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { CatalogPage } from './pages/CatalogPage.tsx';
import { ProductDetailPage } from './pages/ProductDetailPage.tsx';
import { BrandsPage } from './pages/BrandsPage.tsx';
import { BrandDetailPage } from './pages/BrandDetailPage.tsx';
import { FavoritesPage } from './pages/FavoritesPage.tsx';

// Scroll to top automatically when location changes
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // If it's a hash anchor like #about, let default scroll handle or smoothly scroll
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, search]);

  return null;
}

export default function App() {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#09090b] text-[#f4f4f5]">
          <Navbar onOpenBrandModal={() => setIsBrandModalOpen(true)} />

          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={<HomePage onOpenBrandModal={() => setIsBrandModalOpen(true)} />}
              />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route
                path="/brands"
                element={<BrandsPage onOpenBrandModal={() => setIsBrandModalOpen(true)} />}
              />
              <Route path="/brand/:slug" element={<BrandDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              {/* Catch-all route redirect to home */}
              <Route
                path="*"
                element={<HomePage onOpenBrandModal={() => setIsBrandModalOpen(true)} />}
              />
            </Routes>
          </main>

          <Footer onOpenBrandModal={() => setIsBrandModalOpen(true)} />

          {/* Submission Modal for Independent Streetwear Brands */}
          <BrandSubmissionModal
            isOpen={isBrandModalOpen}
            onClose={() => setIsBrandModalOpen(false)}
          />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
