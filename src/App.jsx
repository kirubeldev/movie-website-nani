import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import MovieDetailPage from "./Components/movie";
import { useEffect, useState } from "react";
import MovieDetail from "./Components/movie";
import { searchMovies } from "./Services/api";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <MovieProvider>
     <NavBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch} // Pass handleSearch directly
        setMovies={setSearchResults} // Pass setSearchResults as setMovies
      />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                loading={loading}
                error={error}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          {/* New route for the movie detail page */}
          <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
