import { motion } from 'framer-motion';

const MovieCard = ({ movie, rank }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  const revenue = movie.revenue
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(movie.revenue)
    : null;

  const popularity = movie.popularity
    ? Math.round(movie.popularity * 10) / 10
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-96 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
          }}
        />
        <div className="absolute top-4 left-4">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="bg-indigo-600 text-white font-bold text-lg px-3 py-1 rounded-full shadow-lg"
          >
            #{rank}
          </motion.span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-600 mb-3">
          <span className="font-semibold">Release Year:</span> {releaseYear}
        </p>
        {revenue && (
          <div className="mb-2">
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
              💰 {revenue}
            </span>
          </div>
        )}
        {popularity && !revenue && (
          <div className="mb-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              ⭐ {popularity} Popularity
            </span>
          </div>
        )}
        {movie.vote_average && (
          <div className="flex items-center mt-2">
            <svg
              className="w-5 h-5 text-yellow-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-700 font-medium">
              {movie.vote_average.toFixed(1)}/10
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MovieCard;

