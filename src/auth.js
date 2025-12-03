// auth.js - Frontend authentication helper

class AuthService {
  constructor() {
    this.token = localStorage.getItem('access_token');
  }

  async register(email, username, password, fullName = "") {
    const response = await fetch('/auth/register', {
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
      throw new Error(error.detail);
    }

    return await response.json();
  }

  async login(username, password) {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail);
    }

    const data = await response.json();
    this.token = data.access_token;
    localStorage.setItem('access_token', this.token);
    return data;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  isAuthenticated() {
    return !!this.token;
  }

  getAuthHeader() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };
  }

  async analyzeSentiment(text) {
    const response = await fetch('/analyze', {
      method: 'POST',
      headers: this.getAuthHeader(),
      body: JSON.stringify({ text })
    });

    if (response.status === 401) {
      this.logout();
      throw new Error('Authentication required');
    }

    if (!response.ok) {
      throw new Error('Analysis failed');
    }

    return await response.json();
  }

  async getReviews(page = 1, perPage = 10) {
    const response = await fetch(
      `/reviews?page=${page}&per_page=${perPage}`,
      {
        headers: this.getAuthHeader()
      }
    );

    if (response.status === 401) {
      this.logout();
      throw new Error('Authentication required');
    }

    return await response.json();
  }

  async getCurrentUser() {
    const response = await fetch('/auth/me', {
      headers: this.getAuthHeader()
    });

    if (response.status === 401) {
      this.logout();
      return null;
    }

    return await response.json();
  }
}

// Usage
const authService = new AuthService();

// Register
try {
  await authService.register('user@example.com', 'john_doe', 'secure_password', 'John Doe');
  console.log('Registration successful!');
} catch (error) {
  console.error('Registration failed:', error.message);
}

// Login
try {
  await authService.login('john_doe', 'secure_password');
  console.log('Login successful!');
} catch (error) {
  console.error('Login failed:', error.message);
}

// Analyze sentiment
try {
  const result = await authService.analyzeSentiment('This product is amazing!');
  console.log('Sentiment:', result);
} catch (error) {
  console.error('Analysis failed:', error.message);
}

