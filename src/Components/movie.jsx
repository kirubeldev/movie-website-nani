import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetail } from "../Services/api";
import { useMovieContext } from "../contexts/MovieContext"; 

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const movieDetail = await getMovieDetail(id);
        setMovie(movieDetail);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetail();
  }, [id]);

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen text-red-500 text-xl">
      Error: {error}
    </div>
  );

  if (!movie) return (
    <div className="flex justify-center items-center h-screen text-white text-xl">
      Movie not found
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop */}
      <div className="relative h-96 w-full overflow-hidden">
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-xl border-4 border-white"
            />
          </div>

          {/* Details */}
          <div className="w-full md:w-2/3 lg:w-3/4 bg-gray-800/70 backdrop-blur-sm p-8 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {movie.title}
                  <span className="text-gray-400 ml-2">
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                </h1>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="flex items-center bg-yellow-500/20 px-3 py-1 rounded-full text-yellow-400">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-400">
                    {movie.runtime} min
                  </span>
                  {movie.genres?.map(genre => (
                    <span key={genre.id} className="bg-purple-500/20 px-3 py-1 rounded-full text-purple-400">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleFavoriteClick}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  isFavorite(movie.id)
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
              >
                {isFavorite(movie.id) ? "❤️ Remove Favorite" : "♡ Add Favorite"}
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Details</h3>
                <ul className="space-y-2">
                  <li>
                    <span className="text-gray-400">Release Date:</span>{" "}
                    <span className="text-white">{movie.release_date}</span>
                  </li>
                  <li>
                    <span className="text-gray-400">Original Language:</span>{" "}
                    <span className="text-white">{movie.original_language}</span>
                  </li>
                  {movie.budget > 0 && (
                    <li>
                      <span className="text-gray-400">Budget:</span>{" "}
                      <span className="text-white">${movie.budget.toLocaleString()}</span>
                    </li>
                  )}
                  {movie.revenue > 0 && (
                    <li>
                      <span className="text-gray-400">Revenue:</span>{" "}
                      <span className="text-white">${movie.revenue.toLocaleString()}</span>
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Production</h3>
                {movie.production_companies?.length > 0 && (
                  <div>
                    <h4 className="text-gray-400 mb-2">Companies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {movie.production_companies.map(company => (
                        <span key={company.id} className="bg-gray-700/50 px-3 py-1 rounded-full">
                          {company.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;