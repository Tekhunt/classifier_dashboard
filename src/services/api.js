// services/api.js - API Service Layer
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const API_BASE_URL = 'http://localhost:8000/api';  // No env needed

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Call Failed: ${endpoint}`, error);
    throw error;
  }
};

// Analyze a single review
export const analyzeReviewAPI = async (text) => {
  return apiCall('/analyze', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
};

// Batch analyze multiple reviews
export const batchAnalyzeAPI = async (reviews) => {
  return apiCall('/batch_analyze', {
    method: 'POST',
    body: JSON.stringify({ reviews }),
  });
};

// Get all reviews with pagination
export const fetchReviews = async (page = 1, perPage = 10, sentiment = null) => {
  let endpoint = `/reviews?page=${page}&per_page=${perPage}`;
  if (sentiment) {
    endpoint += `&sentiment=${sentiment}`;
  }
  return apiCall(endpoint);
};

// Get a specific review by ID
export const fetchReviewById = async (id) => {
  return apiCall(`/reviews/${id}`);
};

// Search reviews
export const searchReviews = async (query, limit = 10) => {
  return apiCall(`/reviews/search?q=${encodeURIComponent(query)}&limit=${limit}`);
};

// Get recent reviews
export const fetchRecentReviews = async (limit = 10) => {
  return apiCall(`/reviews/recent?limit=${limit}`);
};

// Get statistics
export const fetchStatistics = async () => {
  return apiCall('/statistics');
};

// Get detailed statistics
export const fetchDetailedStatistics = async () => {
  return apiCall('/statistics/detailed');
};

// Clear all reviews
export const clearReviewsAPI = async () => {
  return apiCall('/clear', {
    method: 'DELETE',
  });
};

// Get sample reviews
export const fetchSampleReviews = async () => {
  return apiCall('/sample_reviews');
};

// Health check
export const healthCheck = async () => {
  return apiCall('/health');
};

// Retrain model
export const retrainModel = async () => {
  return apiCall('/retrain', {
    method: 'POST',
  });
};

// Get model info
export const fetchModelInfo = async () => {
  return apiCall('/model_info');
};