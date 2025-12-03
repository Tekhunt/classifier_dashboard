/**
 * AuthContext.jsx - Authentication context provider
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getUser());
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    // Verify token on mount
    const verifyAuth = async () => {
      if (authService.isAuthenticated()) {
        const isValid = await authService.verifyToken();
        if (!isValid) {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const { user: userData } = await authService.login(username, password);
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, username, password, fullName) => {
    try {
      await authService.register(email, username, password, fullName);
      // Auto-login after registration
      return await login(username, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

