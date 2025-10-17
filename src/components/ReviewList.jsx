// components/ReviewsList.jsx
import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewsList = ({ reviews, totalCount }) => {
  if (reviews.length === 0) {
    return (
      <div className="reviews-section">
        <h2>📋 Recent Reviews (0)</h2>
        <div className="reviews-list">
          <div className="empty-state">
            No reviews yet. Start by analyzing a review above!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <h2>📋 Recent Reviews ({totalCount})</h2>
      <div className="reviews-list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;