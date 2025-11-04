import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center"
            >
              <span className="text-2xl">🎬</span>
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Movie Mojo
            </h1>
          </div>
          <div className="text-sm text-white/90">
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Powered by TMDB
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;

