import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from './SearchBar';

export function Navigation() {
  const location = useLocation();
  const isReaderPanel = location.pathname === '/reader';

  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log('Searching for:', query);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and main navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">InnovateInk</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  to="/reader"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/reader'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Reader Panel
                </Link>
                <Link
                  to="/writer"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/writer'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Writer Panel
                </Link>
              </div>
            </div>
          </div>

          {/* Center - Search Bar (only show on reader panel) */}
          <div className="flex-1 max-w-xl mx-4">
            {isReaderPanel && <SearchBar onSearch={handleSearch} />}
          </div>

          {/* Right side - Theme toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/reader"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/reader'
                ? 'bg-primary text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Reader Panel
          </Link>
          <Link
            to="/writer"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/writer'
                ? 'bg-primary text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Writer Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}