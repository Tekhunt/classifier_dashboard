import React from 'react';

function StatCard({ title, count, percentage, color, icon }) {
  return (
    <div className={`${color} text-white rounded-xl p-6 shadow-lg hover:scale-105 transition-transform cursor-pointer`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold opacity-90">{title}</h3>
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-5xl font-bold mt-2">{count}</p>
      <div className="mt-4 pt-4 border-t border-white border-opacity-30">
        <p className="text-sm opacity-90">{percentage}% of total reviews</p>
      </div>
    </div>
  );
}

export default StatCard;

