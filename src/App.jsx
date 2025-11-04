import Navbar from './components/Navbar';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Home />
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        <p className="text-gray-400">
          © 2025 Movie Mojo. Data provided by{' '}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:text-indigo-300"
          >
            The Movie Database (TMDB)
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
