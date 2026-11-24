import {
  createContext,
  useContext,
  ReactNode,
} from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

interface FavoritesContextValue {
  favorites: number[];

  toggleFavorite: (id: number) => void;

  isFavorite: (id: number) => boolean;

  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useLocalStorage<number[]>(
    "favorites",
    []
  );

  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  function isFavorite(id: number) {
    return favorites.includes(id);
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites должен использоваться внутри FavoritesProvider"
    );
  }

  return context;
}