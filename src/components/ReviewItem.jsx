import React from 'react';

function ReviewItem({ review }) {
  const sentimentColors = {
    positive: 'border-l-green-500 bg-green-50',
    negative: 'border-l-red-500 bg-red-50',
    neutral: 'border-l-gray-500 bg-gray-50'
  };

  const badgeColors = {
    positive: 'bg-green-500',
    negative: 'bg-red-500',
    neutral: 'bg-gray-500'
  };

  const icons = {
    positive: '😊',
    negative: '😞',
    neutral: '😐'
  };
// border-l-4 ${sentimentColors[review.sentiment]}
  return (
    <div className={`p-6 rounded-lg shadow-lg hover:shadow-lg transition-all`}>
      <p className="text-gray-800 text-lg mb-4 leading-relaxed">{review.text}</p>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${badgeColors[review.sentiment]} flex items-center space-x-1`}>
            <span>{icons[review.sentiment]}</span>
            <span>{review.sentiment.toUpperCase()}</span>
          </span>
          <span className="text-gray-600 text-sm font-medium">
            Confidence: {(review.confidence * 100).toFixed(1)}%
          </span>
        </div>
        <div className="text-xs text-gray-500">
          ID: {review.id}
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;

