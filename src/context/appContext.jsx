// import React, { createContext, useContext, useState } from 'react';
// import * as api from '../services/api';  // Adjust path to your services/api.js
// import { simulateSentiment } from '../utils/sentimentUtils';  // For fallback
// import { sampleReviews } from '../utils/sentimentUtils';  // For fallback bulk

// const AppContext = createContext();

// export const AppProvider = ({ children, navigate }) => {  // Accept navigate prop if using in Layout
//   const [reviews, setReviews] = useState([]);
//   const [stats, setStats] = useState({ positive: 0, negative: 0, neutral: 0 });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);



//   // Load reviews (API with fallback)
//   const loadReviews = async (page = 1, perPage = 10, sentiment = null) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await api.fetchReviews(page, perPage, sentiment);
//       setReviews(data.reviews || data);  // Adjust based on API response shape (e.g., { reviews: [] })
//     } catch (err) {
//       console.warn('Load reviews API failed, using samples:', err);
//       setError('Using sample data (API unavailable)');
//       setReviews(sampleReviews.map((text, index) => {
//         const sentiment = simulateSentiment(text);
//         const confidence = 0.7 + Math.random() * 0.3;
//         return { text, sentiment, confidence, id: Date.now() + index, timestamp: new Date().toISOString() };
//       }).slice(0, perPage));  // Limit to perPage
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load stats (API with fallback)
//   const loadStats = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await api.fetchStatistics();
//       setStats(data);
//     } catch (err) {
//       console.warn('Load stats API failed, using defaults:', err);
//       setError('Using default stats (API unavailable)');
//       setStats({ positive: 3, negative: 2, neutral: 5 });  // Sample fallback
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add single review (API with fallback)
//   const addReview = async (reviewText) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await api.analyzeReviewAPI(reviewText);
//       const newReview = { ...data, id: Date.now(), text: reviewText };
//       setReviews(prev => [...prev, newReview]);
//       setStats(prev => ({ ...prev, [data.sentiment]: prev[data.sentiment] + 1 }));
//       return newReview;
//     } catch (err) {
//       console.warn('API failed, using simulation:', err);
//       setError('Using simulated analysis (API unavailable)');
//       const sentiment = simulateSentiment(reviewText);
//       const confidence = 0.7 + Math.random() * 0.3;
//       const newReview = { text: reviewText, sentiment, confidence, id: Date.now() };
//       setReviews(prev => [...prev, newReview]);
//       setStats(prev => ({ ...prev, [sentiment]: prev[sentiment] + 1 }));
//       return newReview;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add bulk reviews (API with fallback)
//   const addBulkReviews = async (reviewsArray) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const reviewsToAnalyze = reviewsArray || sampleReviews;
//       const data = await api.batchAnalyzeAPI(reviewsToAnalyze);
//       const newReviews = data.map((item, index) => ({
//         ...item,
//         id: Date.now() + index,
//         text: reviewsToAnalyze[index]
//       }));
//       setReviews(prev => [...prev, ...newReviews]);
//       newReviews.forEach(review => {
//         setStats(prev => ({ ...prev, [review.sentiment]: prev[review.sentiment] + 1 }));
//       });
//       return newReviews;
//     } catch (err) {
//       console.warn('Bulk API failed, using simulation:', err);
//       setError('Using simulated bulk analysis (API unavailable)');
//       const simulated = reviewsArray?.length ? reviewsArray : sampleReviews;
//       const newReviews = simulated.map((text, index) => {
//         const sentiment = simulateSentiment(text);
//         const confidence = 0.7 + Math.random() * 0.3;
//         return { text, sentiment, confidence, id: Date.now() + index };
//       });
//       setReviews(prev => [...prev, ...newReviews]);
//       newReviews.forEach(review => {
//         setStats(prev => ({ ...prev, [review.sentiment]: prev[review.sentiment] + 1 }));
//       });
//       return newReviews;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Clear reviews (API with fallback)
//   const clearReviews = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       await api.clearReviewsAPI();
//       setReviews([]);
//       setStats({ positive: 0, negative: 0, neutral: 0 });
//     } catch (err) {
//       console.warn('Clear API failed, resetting locally:', err);
//       setError('Cleared locally (API unavailable)');
//       setReviews([]);
//       setStats({ positive: 0, negative: 0, neutral: 0 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const value = {
//     reviews,
//     stats,
//     loading,
//     error,
//     setError,
//     addReview,
//     loadStats,
//     loadReviews,  // Now defined
//     addBulkReviews,
//     clearReviews,  // Now defined and included
//     navigate  // Pass through if provided
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error('useAppContext must be used within an AppProvider');
//   }
//   return context;
// };




import React, { createContext, useContext, useState, useCallback } from 'react';
import * as api from '../services/api';  // Adjust path to your services/api.js
import { simulateSentiment } from '../utils/sentimentUtils';  // For fallback
import { sampleReviews } from '../utils/sentimentUtils';  // For fallback bulk

const AppContext = createContext();

export const AppProvider = ({ children, navigate }) => {  // Accept navigate prop if using in Layout
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ positive: 0, negative: 0, neutral: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load reviews (API with fallback) - memoized with useCallback
  const loadReviews = useCallback(async (page = 1, perPage = 10, sentiment = null) => {
    if (loading) return;  // Prevent concurrent calls
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchReviews(page, perPage, sentiment);
      setReviews(data.reviews || data);  // Adjust based on API response shape (e.g., { reviews: [] })
    } catch (err) {
      console.warn('Load reviews API failed, using samples:', err);
      setError('Using sample data (API unavailable)');
      setReviews(sampleReviews.map((text, index) => {
        const sentiment = simulateSentiment(text);
        const confidence = 0.7 + Math.random() * 0.3;
        return { text, sentiment, confidence, id: Date.now() + index, timestamp: new Date().toISOString() };
      }).slice(0, perPage));  // Limit to perPage
    } finally {
      setLoading(false);
    }
  }, [loading]);  // Depend on loading to prevent spam

  // Load stats (API with fallback) - memoized
  const loadStats = useCallback(async () => {
    if (loading) return;  // Prevent concurrent calls
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchStatistics();
      setStats(data);
    } catch (err) {
      console.warn('Load stats API failed, using defaults:', err);
      setError('Using default stats (API unavailable)');
      setStats({ positive: 3, negative: 2, neutral: 5 });  // Sample fallback
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Add single review (API with fallback) - memoized
  const addReview = useCallback(async (reviewText) => {
    if (loading) return;  // Prevent concurrent calls
    setLoading(true);
    setError(null);
    try {
      const data = await api.analyzeReviewAPI(reviewText);
      const newReview = { ...data, id: Date.now(), text: reviewText, timestamp: new Date().toISOString() };
      setReviews(prev => [...prev, newReview]);
      setStats(prev => ({ ...prev, [data.sentiment]: prev[data.sentiment] + 1 }));
      return newReview;
    } catch (err) {
      console.warn('API failed, using simulation:', err);
      setError('Using simulated analysis (API unavailable)');
      const sentiment = simulateSentiment(reviewText);
      const confidence = 0.7 + Math.random() * 0.3;
      const newReview = { text: reviewText, sentiment, confidence, id: Date.now(), timestamp: new Date().toISOString() };
      setReviews(prev => [...prev, newReview]);
      setStats(prev => ({ ...prev, [sentiment]: prev[sentiment] + 1 }));
      return newReview;
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Add bulk reviews (API with fallback) - memoized
  const addBulkReviews = useCallback(async (reviewsArray) => {
    if (loading) return;  // Prevent concurrent calls
    setLoading(true);
    setError(null);
    try {
      const reviewsToAnalyze = reviewsArray || sampleReviews;
      const data = await api.batchAnalyzeAPI(reviewsToAnalyze);
      const newReviews = data.map((item, index) => ({
        ...item,
        id: Date.now() + index,
        text: reviewsToAnalyze[index],
        timestamp: new Date().toISOString()
      }));
      setReviews(prev => [...prev, ...newReviews]);
      newReviews.forEach(review => {
        setStats(prev => ({ ...prev, [review.sentiment]: prev[review.sentiment] + 1 }));
      });
      return newReviews;
    } catch (err) {
      console.warn('Bulk API failed, using simulation:', err);
      setError('Using simulated bulk analysis (API unavailable)');
      const simulated = reviewsArray?.length ? reviewsArray : sampleReviews;
      const newReviews = simulated.map((text, index) => {
        const sentiment = simulateSentiment(text);
        const confidence = 0.7 + Math.random() * 0.3;
        return { text, sentiment, confidence, id: Date.now() + index, timestamp: new Date().toISOString() };
      });
      setReviews(prev => [...prev, ...newReviews]);
      newReviews.forEach(review => {
        setStats(prev => ({ ...prev, [review.sentiment]: prev[review.sentiment] + 1 }));
      });
      return newReviews;
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Clear reviews (API with fallback) - memoized
  const clearReviews = useCallback(async () => {
    if (loading) return;  // Prevent concurrent calls
    setLoading(true);
    setError(null);
    try {
      await api.clearReviewsAPI();
      setReviews([]);
      setStats({ positive: 0, negative: 0, neutral: 0 });
    } catch (err) {
      console.warn('Clear API failed, resetting locally:', err);
      setError('Cleared locally (API unavailable)');
      setReviews([]);
      setStats({ positive: 0, negative: 0, neutral: 0 });
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const value = {
    reviews,
    stats,
    loading,
    error,
    setError,
    loadReviews,  // Stable function
    loadStats,   // Stable function
    addReview,   // Stable function
    addBulkReviews,  // Stable function
    clearReviews,  // Stable function
    navigate  // Pass through if provided
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
