import React from 'react';
import NavButton from './NavButton';
import { Home, Upload, BarChart3, FileText, TrendingUp } from 'lucide-react';
import { useAppContext } from "../context/appContext";

function Navigation() {
  const { navigate, reviews } = useAppContext();  // Now safe with error boundary
  const reviewCount = reviews.length;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">ClassifyAI</span>
          </div>
          <div className="flex space-x-2">
            <NavButton 
              icon={<Home className="w-5 h-5" />}
              text="Home"
              to="/"
              badge={0}
            />
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
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
