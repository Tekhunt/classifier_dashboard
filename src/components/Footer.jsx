import React from 'react';
import { Home, Upload, BarChart3, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white shadow-lg border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="text-gray-600 mb-2">
              © {new Date().getFullYear()} Midterm Classifier. Built with ❤️.
            </p>
            <p className="text-sm text-gray-500">
              Analyze sentiments, uncover insights.
            </p>
            <p className="text-sm text-gray-500">
              Humber College, Toronto.
            </p>
          </div>
          <div className="flex justify-center md:justify-end space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors text-sm"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => navigate('/analyze')}
              className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors text-sm"
            >
              <Upload className="w-4 h-4" />
              <span>Analyze</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors text-sm"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/reviews')}
              className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors text-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Reviews</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

