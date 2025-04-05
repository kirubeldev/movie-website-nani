import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // Track if initial load is complete

  // Load favorites from localStorage on initial render
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("favorites");
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) { // Only save after initial load is complete
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
      }
    }
  }, [favorites, isLoaded]);

  const addToFavorites = (movie) => {
    // Check if movie is already in favorites
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites((prev) => [...prev, movie]);
    }
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};