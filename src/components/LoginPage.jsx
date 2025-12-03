/**
 * LoginPage.jsx - Login and Registration page
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(loginForm.username, loginForm.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register(
        registerForm.email,
        registerForm.username,
        registerForm.password,
        registerForm.fullName
      );
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-white/80">
            {isLogin
              ? 'Sign in to access your sentiment analysis dashboard'
              : 'Register to start analyzing sentiments'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={registerForm.username}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, username: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Full Name (Optional)
              </label>
              <input
                type="text"
                value={registerForm.fullName}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, fullName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Create a password (min 6 characters)"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={registerForm.confirmPassword}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    confirmPassword: e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}

        {/* Toggle between Login and Register */}
        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-white/80 hover:text-white transition-colors"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

