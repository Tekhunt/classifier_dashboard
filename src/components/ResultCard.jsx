import React from 'react';

function ResultCard({ sentiment, confidence, onViewAll }) {
  const colors = {
    positive: 'bg-green-100 text-green-800 border-green-300',
    negative: 'bg-red-100 text-red-800 border-red-300',
    neutral: 'bg-gray-100 text-gray-800 border-gray-300'
  };

  const icons = {
    positive: '😊',
    negative: '😞',
    neutral: '😐'
  };

  return (
    <div className={`mt-6 p-6 border-2 rounded-lg ${colors[sentiment]}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold mb-2">Analysis Result {icons[sentiment]}</h4>
          <p className="text-3xl font-bold capitalize">{sentiment}</p>
          <p className="text-sm mt-2">Confidence: {(confidence * 100).toFixed(1)}%</p>
        </div>
        <button
          onClick={onViewAll}
          className="px-4 py-2 bg-white rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          View All Reviews
        </button>
      </div>
    </div>
  );
}

export default ResultCard;

