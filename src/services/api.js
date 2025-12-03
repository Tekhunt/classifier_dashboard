/**
 * api.js - API service with authentication support
 */

import authService from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function for authenticated API calls
const authenticatedApiCall = async (endpoint, options = {}) => {
  try {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        ...authService.getAuthHeader(),
        ...options.headers,
      },
      ...options,
    });

    // Handle 401 Unauthorized - token expired
    if (response.status === 401) {
      authService.logout();
      window.location.href = '/login';
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Call Failed: ${endpoint}`, error);
    throw error;
  }
};

// Helper function for public API calls (no auth required)
const publicApiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Call Failed: ${endpoint}`, error);
    throw error;
  }
};

// ==================== PROTECTED ENDPOINTS (Require Authentication) ====================

// Analyze a single review
export const analyzeReviewAPI = async (text) => {
  return authenticatedApiCall('/analyze', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
};

// Batch analyze multiple reviews
export const batchAnalyzeAPI = async (reviews) => {
  return authenticatedApiCall('/batch_analyze', {
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
  return authenticatedApiCall(endpoint);
};

// Get a specific review by ID
export const fetchReviewById = async (id) => {
  return authenticatedApiCall(`/reviews/${id}`);
};

// Search reviews
export const searchReviews = async (query, limit = 10) => {
  return authenticatedApiCall(`/reviews/search?q=${encodeURIComponent(query)}&limit=${limit}`);
};

// Get recent reviews
export const fetchRecentReviews = async (limit = 10) => {
  return authenticatedApiCall(`/reviews/recent?limit=${limit}`);
};

// Get statistics
export const fetchStatistics = async () => {
  return authenticatedApiCall('/statistics');
};

// Get detailed statistics
export const fetchDetailedStatistics = async () => {
  return authenticatedApiCall('/statistics/detailed');
};

// Clear all reviews
export const clearReviewsAPI = async () => {
  return authenticatedApiCall('/clear', {
    method: 'DELETE',
  });
};

// Retrain model (admin feature)
export const retrainModel = async () => {
  return authenticatedApiCall('/retrain', {
    method: 'POST',
  });
};

// Get model info
export const fetchModelInfo = async () => {
  return authenticatedApiCall('/model_info');
};

// ==================== PUBLIC ENDPOINTS (No Authentication Required) ====================

// Get sample reviews
export const fetchSampleReviews = async () => {
  return publicApiCall('/sample_reviews');
};

// Health check
export const healthCheck = async () => {
  return publicApiCall('/health');
};

// ==================== EXPORT DEFAULT ====================

export default {
  // Protected endpoints
  analyzeReviewAPI,
  batchAnalyzeAPI,
  fetchReviews,
  fetchReviewById,
  searchReviews,
  fetchRecentReviews,
  fetchStatistics,
  fetchDetailedStatistics,
  clearReviewsAPI,
  retrainModel,
  fetchModelInfo,
  
  // Public endpoints
  fetchSampleReviews,
  healthCheck,
};

