import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
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

// Scroll to top on route changes and handle in-app hash anchors safely.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  return (
    <FavoritesProvider>
      <HashRouter>
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
      </HashRouter>
    </FavoritesProvider>
  );
}
