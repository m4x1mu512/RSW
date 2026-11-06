import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  clearFavorites: () => void;
  toastMessage: string | null;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'rsw_club_favorites';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2400);
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        showToast('Удалено из избранного');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Добавлено в избранное');
        return [...prev, productId];
      }
    });
  };

  const removeFavorite = (productId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== productId));
    showToast('Удалено из избранного');
  };

  const clearFavorites = () => {
    setFavorites([]);
    showToast('Список избранного очищен');
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
        toastMessage,
      }}
    >
      {children}
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-zinc-900 border border-zinc-700/80 text-white px-4 py-3 rounded-lg shadow-2xl text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          {toastMessage}
        </div>
      )}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
