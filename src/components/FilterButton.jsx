import React from 'react';

function FilterButton({ label, count, active, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
        active 
          ? `${color} text-white scale-105` 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label} ({count})
    </button>
  );
}

export default FilterButton;

