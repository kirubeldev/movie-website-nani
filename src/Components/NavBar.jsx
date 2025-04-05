import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { useMovieContext } from "../contexts/MovieContext";

function NavBar({ searchQuery, setSearchQuery, handleSearch }) {
  const { favorites } = useMovieContext();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      navigate("/");
    } else {
      handleSearch(searchQuery); // Pass the search query to the handler
      navigate("/search"); // Navigate to search results page
    }
  };

  return (
    <nav className="bg-black z-200 px-8 py-4 flex flex-col md:flex-row justify-between items-center shadow-md sticky top-0 z-[4000] gap-4">
      {/* Logo */}
      <div className="text-2xl font-bold text-white">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-red-600 px-2 py-1 rounded">Movie</span>
          <span>Hub</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex-1 w-full md:max-w-2xl mx-4">
        <form onSubmit={handleFormSubmit} className="w-full flex gap-2">
          <div className="relative flex-1">
            <input
              name="search"
              id="search"
              autoComplete="off"
              autoFocus={true}
              type="text"
              placeholder="Search for movies..."
              className="w-full p-3 text-white rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <BiSearchAlt2 className="text-xl" />
            </button>
          </div>
        </form>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-4">
        <Link 
          to="/" 
          className="text-white px-4 py-2 rounded-md transition hover:bg-white/10 flex items-center gap-2"
        >
          <AiFillHome className="text-xl" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <Link 
          to="/favorites" 
          className="text-white px-4 py-2 rounded-md transition hover:bg-white/10 flex items-center gap-2 relative"
        >
          <div className="relative">
            <FaHeart className="text-red-500 text-xl" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="hidden sm:inline">Favorites</span>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;