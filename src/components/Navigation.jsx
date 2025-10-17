// import React from 'react';
// import NavButton from './NavButton';
// import { Home, Upload, BarChart3, FileText, TrendingUp } from 'lucide-react';
// import { useAppContext } from "../context/appContext";

// function Navigation() {
//   const { navigate, reviews } = useAppContext();  // Now safe with error boundary
//   const reviewCount = reviews.length;

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div 
//             onClick={() => navigate('/')}
//             className="flex items-center space-x-2 cursor-pointer"
//           >
//             <TrendingUp className="w-8 h-8 text-purple-600" />
//             <span className="text-2xl font-bold text-gray-800">ClassifyAI</span>
//           </div>
//           <div className="flex space-x-2">
//             <NavButton 
//               icon={<Home className="w-5 h-5" />}
//               text="Home"
//               to="/"
//               badge={0}
//             />
//             <NavButton 
//               icon={<Upload className="w-5 h-5" />}
//               text="Analyze"
//               to="/analyze"
//               badge={0}
//             />
//             <NavButton 
//               icon={<BarChart3 className="w-5 h-5" />}
//               text="Dashboard"
//               to="/dashboard"
//               badge={0}
//             />
//             <NavButton 
//               icon={<FileText className="w-5 h-5" />}
//               text="Reviews"
//               to="/reviews"
//               badge={reviewCount}
//             />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navigation;




import React, { useState } from 'react';
import NavButton from './NavButton';
import { Home, Upload, BarChart3, FileText, TrendingUp, Menu, X } from 'lucide-react';
import { useAppContext } from "../context/appContext";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // State for mobile menu
  const { navigate, reviews } = useAppContext();
  const reviewCount = reviews.length;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
              className="block w-full text-left px-4 py-2"  // Full-width for mobile
            />
            <NavButton 
              icon={<Upload className="w-5 h-5" />}
              text="Analyze"
              to="/analyze"
              badge={0}
              className="block w-full text-left px-4 py-2"
            />
            <NavButton 
              icon={<BarChart3 className="w-5 h-5" />}
              text="Dashboard"
              to="/dashboard"
              badge={0}
              className="block w-full text-left px-4 py-2"
            />
            <NavButton 
              icon={<FileText className="w-5 h-5" />}
              text="Reviews"
              to="/reviews"
              badge={reviewCount}
              className="block w-full text-left px-4 py-2"
            />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;

