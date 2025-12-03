import React, { useState } from 'react';
import NavButton from './NavButton';
import { Home, Upload, BarChart3, FileText, TrendingUp, Menu, X, LogOut, User } from 'lucide-react';
import { useAppContext } from "../context/appContext";
import { useAuth } from '../context/authContext';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigate, reviews } = useAppContext();
  const { isAuthenticated, user, logout } = useAuth();
  const reviewCount = reviews.length;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Always visible */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 cursor-pointer flex-shrink-0"
          >
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">ClassifyAI</span>
          </div>

          {/* Desktop Nav - Hidden on mobile */}
          <div className="hidden md:flex space-x-2 items-center">
            <NavButton 
              icon={<Home className="w-5 h-5" />}
              text="Home"
              to="/"
              badge={0}
            />
            
            {isAuthenticated ? (
              <>
                <NavButton 
                  icon={<Upload className="w-5 h-5" />}
                  text="Analyze"
                  to="/analyze"
                  badge={0}
                />
                <NavButton 
                  icon={<BarChart3 className="w-5 h-5" />}
                  text="Dashboard"
                  to="/dashboard"
                  badge={0}
                />
                <NavButton 
                  icon={<FileText className="w-5 h-5" />}
                  text="Reviews"
                  to="/reviews"
                  badge={reviewCount}
                />

                {/* User Info & Logout */}
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{user?.username || 'User'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center p-2 text-gray-700 hover:text-purple-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2">
            <NavButton 
              icon={<Home className="w-5 h-5" />}
              text="Home"
              to="/"
              badge={0}
              className="block w-full text-left px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {isAuthenticated ? (
              <>
                <NavButton 
                  icon={<Upload className="w-5 h-5" />}
                  text="Analyze"
                  to="/analyze"
                  badge={0}
                  className="block w-full text-left px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                />
                <NavButton 
                  icon={<BarChart3 className="w-5 h-5" />}
                  text="Dashboard"
                  to="/dashboard"
                  badge={0}
                  className="block w-full text-left px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                />
                <NavButton 
                  icon={<FileText className="w-5 h-5" />}
                  text="Reviews"
                  to="/reviews"
                  badge={reviewCount}
                  className="block w-full text-left px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                />

                {/* Mobile User Info */}
                <div className="px-4 py-3 border-t border-gray-200 mt-2">
                  <div className="flex items-center space-x-2 text-gray-700 mb-3">
                    <User className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{user?.username || 'User'}</span>
                    {user?.full_name && (
                      <span className="text-sm text-gray-500">({user.full_name})</span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 py-3 border-t border-gray-200 mt-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
