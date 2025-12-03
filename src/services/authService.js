/**
 * authService.js - Authentication service for API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('access_token');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  // ==================== AUTH METHODS ====================

  async register(email, username, password, fullName = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          username,
          password,
          full_name: fullName
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Registration failed');
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }

      const data = await response.json();
      this.token = data.access_token;
      localStorage.setItem('access_token', this.token);

      // Get user info
      const user = await this.getCurrentUser();
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));

      return { token: data.access_token, user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!this.token;
  }

  getUser() {
    return this.user;
  }

  getAuthHeader() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };
  }

  async getCurrentUser() {
    if (!this.token) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: this.getAuthHeader()
      });

      if (response.status === 401) {
        this.logout();
        return null;
      }

      if (!response.ok) {
        throw new Error('Failed to get user info');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user error:', error);
      this.logout();
      return null;
    }
  }

  async verifyToken() {
    if (!this.token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: this.getAuthHeader()
      });

      if (!response.ok) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  // ==================== API METHODS ====================

  async analyzeSentiment(text) {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: this.getAuthHeader(),
      body: JSON.stringify({ text })
    });

    if (response.status === 401) {
      this.logout();
      throw new Error('Authentication required. Please login again.');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Analysis failed');
    }

    return await response.json();
  }

  async getReviews(page = 1, perPage = 10, sentiment = null) {
    let url = `${API_BASE_URL}/api/reviews?page=${page}&per_page=${perPage}`;
    if (sentiment) {
      url += `&sentiment=${sentiment}`;
    }

    const response = await fetch(url, {
      headers: this.getAuthHeader()
    });

    if (response.status === 401) {
      this.logout();
      throw new Error('Authentication required');
    }

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    return await response.json();
  }

  async getStatistics() {
    const response = await fetch(`${API_BASE_URL}/api/statistics`, {
      headers: this.getAuthHeader()
    });

    if (response.status === 401) {
      this.logout();
      throw new Error('Authentication required');
    }

    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }

    return await response.json();
  }
}

export default new AuthService();

