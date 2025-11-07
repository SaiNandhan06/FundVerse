import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/my-logo.png.png';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-[#FFFFFF] border-b border-[#E5E7EB] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="FundVerse" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-[#111827] hover:text-[#3B82F6] transition-colors relative ${
                location.pathname === '/' ? 'text-[#3B82F6]' : ''
              }`}
            >
              Home
              {location.pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"></span>
              )}
            </Link>
            <Link
              to="/discover"
              className={`text-[#111827] hover:text-[#3B82F6] transition-colors relative ${
                location.pathname === '/discover' ? 'text-[#3B82F6]' : ''
              }`}
            >
              Discover
              {location.pathname === '/discover' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"></span>
              )}
            </Link>
            <Link
              to="/create"
              className={`text-[#111827] hover:text-[#3B82F6] transition-colors relative ${
                location.pathname === '/create' ? 'text-[#3B82F6]' : ''
              }`}
            >
              Create
              {location.pathname === '/create' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"></span>
              )}
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent text-[#111827]"
              />
            </div>
          </div>

          {/* Login Button */}
          <div>
            <Link
              to="/login"
              className="px-6 py-2 border-2 border-[#2563EB] text-[#2563EB] rounded-lg font-medium hover:bg-[#2563EB] hover:text-white transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
