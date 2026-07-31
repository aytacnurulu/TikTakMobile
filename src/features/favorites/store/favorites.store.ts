import { create } from 'zustand';

interface FavoritesStore {
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>(() => ({
  favorites: new Set(),
  toggleFavorite: () => {},
}));
