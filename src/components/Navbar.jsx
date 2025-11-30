import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSearch } from '../context/SearchContext';
import logo from '../assets/my-logo.png.png';
import { STORAGE_KEYS } from '../services/storage/storageKeys';

// Navigation links data
const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/discover', label: 'Discover' },
  { path: '/create', label: 'Create' }
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    const userStr = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setCurrentUser(null);
    navigate('/');
  };

  const getDashboardPath = () => {
    if (currentUser?.role === 'student') return '/student/dashboard';
    if (currentUser?.role === 'company') return '/company/dashboard';
    if (currentUser?.role === 'admin') return '/admin/dashboard';
    return '/login';
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== '/discover') {
      navigate('/discover');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-main">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="FundVerse" className="h-10 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`transition-colors relative ${location.pathname === path
                  ? 'text-blue-600'
                  : 'text-gray-900 hover:text-blue-600'
                  }`}
              >
                {label}
                {location.pathname === path && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="search-icon">
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={handleSearch}
                className="input-search"
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <Link
                  to={getDashboardPath()}
                  className="hidden md:block text-gray-900 hover:text-blue-600 transition-colors font-medium"
                >
                  {currentUser.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
