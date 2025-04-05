// api.js

const API_KEY = "2a29d3d3c3a4259249962820059266fb";// In your API service file (e.g., services/api.js)
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=2a29d3d3c3a4259249962820059266fb`
  );
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=2a29d3d3c3a4259249962820059266fb&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
};
export const getMovieDetail = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};
