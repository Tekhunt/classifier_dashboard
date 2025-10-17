import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import FilterButton from './FilterButton';
import ReviewItem from './ReviewItem';
import { formatPercentage, formatTimestamp } from '../utils/sentimentUtils';
import { useAppContext } from '../context/appContext';

function ReviewsPage() {
  const navigate = useNavigate();
  const { reviews, loadReviews, clearReviews, loading, error } = useAppContext();
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const isFetchingRef = useRef(false);  // Ref to track ongoing fetch

  // Memoized fetch with guard
  const fetchReviews = useCallback(async () => {
    if (isFetchingRef.current || loading) return;  // Prevent duplicates
    isFetchingRef.current = true;
    try {
      await loadReviews(page, 10);
    } finally {
      isFetchingRef.current = false;
    }
  }, [loadReviews, page, loading]);

//   useEffect(() => {
//     fetchReviews();
//   }, [fetchReviews]);

    // ReviewsPage.js
    useEffect(() => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    
    loadReviews(page, 10).finally(() => {
        isFetchingRef.current = false;
    });
    }, [page]); // ONLY depend on page

// Remove the fetchReviews callback entirely

  // Debounced page change to prevent spam on rapid clicks
  const handlePageChange = useCallback((newPage) => {
    if (isFetchingRef.current || loading) return;
    setPage(newPage);
  }, [loading]);

  const filteredReviews = filter === 'all' ? reviews : reviews.filter(r => r.sentiment === filter);
  const sentimentCounts = reviews.reduce((acc, r) => {
    acc[r.sentiment] = (acc[r.sentiment] || 0) + 1;
    return acc;
  }, { positive: 0, negative: 0, neutral: 0 });

  if (loading && page === 1) return <div className="text-center py-16 text-white">Loading reviews...</div>;  // Only show on initial load
  if (error) return <div className="text-center py-16 text-red-300">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>

      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">All Reviews</h2>
          {reviews.length > 0 && (
            <button
              onClick={clearReviews}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Clear All
            </button>
          )}
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 mb-4">No reviews analyzed yet</p>
            <button
              onClick={() => navigate('/analyze')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Analyze Your First Review
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-3 mb-6 flex-wrap">
              <FilterButton
                label="All"
                count={reviews.length}
                active={filter === 'all'}
                onClick={() => setFilter('all')}
                color="bg-purple-600"
              />
              <FilterButton
                label="Positive"
                count={sentimentCounts.positive}
                active={filter === 'positive'}
                onClick={() => setFilter('positive')}
                color="bg-green-600"
              />
              <FilterButton
                label="Negative"
                count={sentimentCounts.negative}
                active={filter === 'negative'}
                onClick={() => setFilter('negative')}
                color="bg-red-600"
              />
              <FilterButton
                label="Neutral"
                count={sentimentCounts.neutral}
                active={filter === 'neutral'}
                onClick={() => setFilter('neutral')}
                color="bg-gray-600"
              />
            </div>

            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </div>

            {/* Pagination with ref guard */}
            {reviews.length >= 10 && (
              <div className="mt-8 flex justify-center gap-2">
                <button 
                  onClick={() => handlePageChange(Math.max(1, page - 1))} 
                  disabled={page === 1 || loading || isFetchingRef.current} 
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <span className="px-4 py-2">Page {page}</span>
                <button 
                  onClick={() => handlePageChange(page + 1)} 
                  disabled={loading || isFetchingRef.current || reviews.length < 10} 
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Showing <span className="font-bold text-purple-600">{filteredReviews.length}</span> of{' '}
                <span className="font-bold text-purple-600">{reviews.length}</span> reviews
                {reviews[0]?.timestamp && ` (Last updated: ${formatTimestamp(reviews[0].timestamp)})`}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewsPage;
