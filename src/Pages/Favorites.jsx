import MovieCard from "../Components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import { FaHeart, FaRegSadTear } from "react-icons/fa";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="home bg-gradient-to-b from-[#1f1e1e] to-black text-white min-h-screen px-4 py-10">
        <h2 className="mb-10 text-4xl text-white text-center drop-shadow-lg flex items-center justify-center gap-3">
          <FaHeart className="text-red-500 animate-pulse" />
          Your Favorites
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center max-w-6xl mx-auto animate-fade-in">
          {favorites.map((movie) => (
            <div className="w-full max-w-xs transform transition duration-300 hover:scale-105">
              <MovieCard movie={movie} key={movie.id} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center p-16 bg-white/5 rounded-2xl mx-auto my-16 max-w-3xl animate-fade-in">
      <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
        <FaRegSadTear className="text-4xl animate-bounce" />
        <h2 className="text-3xl font-semibold">No Favorite Movies Yet</h2>
      </div>
      <p className="text-gray-400 text-lg leading-relaxed">
        Start adding movies to your favorites and they will appear here!
      </p>
    </div>
  );
}

export default Favorites;
