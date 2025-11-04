import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import ChartSection from '../components/ChartSection';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [showChart, setShowChart] = useState(false);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterAndSortMovies();
  }, [searchQuery, sortBy, movies]);

  const fetchMovies = async () => {
    if (!API_KEY) {
      setError('TMDB API key is missing. Please set VITE_TMDB_API_KEY in your .env file.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch top rated movies
      const response = await axios.get(
        `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );

      const top20Movies = response.data.results.slice(0, 20);

      // Fetch detailed movie data including revenue for each movie
      const detailedMovies = await Promise.all(
        top20Movies.map(async (movie) => {
          try {
            const detailResponse = await axios.get(
              `${API_URL}/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
            );
            return {
              ...movie,
              revenue: detailResponse.data.revenue || 0,
            };
          } catch (err) {
            return {
              ...movie,
              revenue: 0,
            };
          }
        })
      );

      setMovies(detailedMovies);
    } catch (err) {
      setError(
        err.response?.data?.status_message ||
          'Failed to fetch movies. Please check your API key.'
      );
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortMovies = () => {
    let filtered = [...movies];

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'year':
          const yearA = a.release_date
            ? new Date(a.release_date).getFullYear()
            : 0;
          const yearB = b.release_date
            ? new Date(b.release_date).getFullYear()
            : 0;
          return yearB - yearA;
        case 'popularity':
          return b.popularity - a.popularity;
        case 'revenue':
          return (b.revenue || 0) - (a.revenue || 0);
        default:
          return 0;
      }
    });

    setFilteredMovies(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center"
        >
          <p className="font-bold">Error:</p>
          <p>{error}</p>
          <button
            onClick={fetchMovies}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Sort Controls */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <label className="text-gray-700 font-semibold">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          >
            <option value="popularity">Popularity</option>
            <option value="year">Release Year</option>
            <option value="revenue">Revenue</option>
          </select>
        </div>

        {/* Chart Toggle */}
        <button
          onClick={() => setShowChart(!showChart)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
        >
          {showChart ? 'Hide' : 'Show'} Revenue Chart
        </button>

        {/* Results Count */}
        <div className="text-gray-600 font-medium">
          Showing {filteredMovies.length} movies
        </div>
      </div>

      {/* Chart Section */}
      {showChart && <ChartSection movies={movies} />}

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-600 text-xl">
            No movies found matching your search.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredMovies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} rank={index + 1} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Home;

