import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation(); 
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="relative w-48 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:z-10 group"
    >
      {/* Poster Image */}
      <div className="relative w-full aspect-[2/3]">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
        />
        
        {/* Favorite Button */}
        <button
          onClick={onFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
            favorite 
              ? "bg-red-500 text-white" 
              : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/90 hover:text-white"
          }`}
        >
          {favorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
        
        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent transition-all duration-300 opacity-0 group-hover:opacity-100">
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{movie.title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 text-xs flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-300 text-xs">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;