import { useState, useEffect, useRef } from "react";
import { getPopularMovies } from "../Services/api";
import MovieCard from "../Components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import "../App.css"

function Home({ searchResults, loading }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [error, setError] = useState(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRefs = useRef([]);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setPopularMovies(popularMovies);
        const cleanerMovie = {
          id: 1125899,
          title: "Cleaner",
          overview: "When a group of radical activists take over an energy company's annual gala, seizing 300 hostages, an ex-soldier turned window cleaner suspended 50 storeys up on the outside of the building must save those trapped inside, including her younger brother.",
          backdrop_path: "/gsQJOfeW45KLiQeEIsom94QPQwb.jpg",
          poster_path: "/mwzDApMZAGeYCEVjhegKvCzDX0W.jpg",
          release_date: "2025-02-19",
          genre_ids: [28, 53],
          vote_average: 6.7,
        };
        const featured = [cleanerMovie, ...popularMovies.slice(0, 4)];
        setFeaturedMovies(featured);
        sliderRefs.current = featured.map((_, index) => sliderRefs.current[index] || { current: null });
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      }
    };

    loadPopularMovies();
  }, []);

  useEffect(() => {
    if (searchResults.length > 0) {
      setPopularMovies(searchResults);
      setFeaturedMovies(searchResults.slice(0, 3));
    } else {
      const resetMovies = async () => {
        const popularMovies = await getPopularMovies();
        setPopularMovies(popularMovies);
        const cleanerMovie = {
          id: 1125899,
          title: "Cleaner",
          overview: "When a group of radical activists take over an energy company's annual gala, seizing 300 hostages, an ex-soldier turned window cleaner suspended 50 storeys up on the outside of the building must save those trapped inside, including her younger brother.",
          backdrop_path: "/gsQJOfeW45KLiQeEIsom94QPQwb.jpg",
          poster_path: "/mwzDApMZAGeYCEVjhegKvCzDX0W.jpg",
          release_date: "2025-02-19",
          genre_ids: [28, 53],
          vote_average: 6.7,
        };
        const featured = [cleanerMovie, ...popularMovies.slice(0, 4)];
        setFeaturedMovies(featured);
      };
      resetMovies();
    }
  }, [searchResults]);

  const slideInterval = useRef(null);

  useEffect(() => {
    if (featuredMovies.length > 0) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
      }, 5000);
    }

    return () => clearInterval(slideInterval.current);
  }, [featuredMovies]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetInterval();
  };

  const scrollHeroSlide = (direction) => {
    if (direction === "left") {
      setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
    } else {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }
    resetInterval();
  };

  const resetInterval = () => {
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
  };

  const getMoviesByCategory = (genreId) => {
    return popularMovies.filter(movie => movie.genre_ids.includes(genreId));
  };

  const categories = [
    { name: "Popular Movies", genreId: null },
    { name: "Action", genreId: 28 },
    { name: "Comedy", genreId: 35 },
    { name: "Drama", genreId: 18 },
    { name: "Sci-Fi", genreId: 878 },
  ];

  const scrollSlider = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Slider */}
      {featuredMovies.length > 0 && (
        <div className="relative h-[70vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent z-10"></div>
          
          {featuredMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12">
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">{movie.title}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full text-yellow-400">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-400">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-lg mb-6 line-clamp-2">{movie.overview}</p>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition">
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={() => scrollHeroSlide("left")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollHeroSlide("right")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition ${
                  currentSlide === index ? "bg-white w-6" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        </div>
      )}

      {/* Movie Categories */}
      {!loading && (
        <div className="container mx-auto px-4 py-8">
          {categories.map((category, index) => {
            const categoryMovies = category.genreId
              ? getMoviesByCategory(category.genreId)
              : popularMovies;
            if (categoryMovies.length === 0) return null;

            return (
              <div key={category.name} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => scrollSlider(sliderRefs.current[index], "left")}
                      className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollSlider(sliderRefs.current[index], "right")}
                      className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  ref={(el) => (sliderRefs.current[index] = { current: el })}
                  className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide"
                >
                  {categoryMovies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-white mb-4">MovieHub</h3>
            <p className="text-center md:text-left mb-4">
              The best place to discover and watch your favorite movies and TV shows.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto mt-8 pt-8 border-t border-gray-700 text-center">
          <p>© {new Date().getFullYear()} MovieHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;