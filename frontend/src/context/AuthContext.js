import React, { createContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../utils/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/auth/profile');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token, fetchUserProfile]);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', { email, password });
      const { token: newToken, ...userData } = response.data;
      if (newToken) {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('token', newToken);
        return { success: true };
      } else {
        return {
          success: false,
          message: 'Login failed: No token received',
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Login failed. Please check your credentials.',
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axiosInstance.post('/api/auth/register', userData);
      const { token: newToken, ...user } = response.data;
      if (newToken) {
        setToken(newToken);
        setUser(user);
        localStorage.setItem('token', newToken);
        return { success: true };
      } else {
        return {
          success: false,
          message: 'Registration failed: No token received',
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Registration failed. Please try again.',
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
