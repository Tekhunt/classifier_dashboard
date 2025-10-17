import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Upload, BarChart3, FileText, TrendingUp } from 'lucide-react'; // Import icons

function NavButton({ icon, text, to, badge }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all relative hover:bg-purple-100 hover:text-purple-600 text-gray-700"
    >
      {icon}
      <span>{text}</span>
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
}
export default NavButton;