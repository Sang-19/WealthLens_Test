// API Configuration for WealthLens Frontend
import { Platform } from 'react-native';

export const API_CONFIG = {
  // Base API URL - can be overridden by environment variables
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000',
  
  // API Endpoints
  ENDPOINTS: {
    HEALTH: '/health',
    QUERY: '/query',
  },
  
  // Development settings
  DEV: {
    // For mobile development, you might need to use your computer's IP address
    // Replace this with your actual local IP address when testing on mobile
    LOCAL_IP: '192.168.21.247', // Change this to your computer's IP
    USE_LOCAL_IP: false, // Set to true to use local IP instead of localhost
  },
  
  // Timeout settings
  TIMEOUT: {
    CONNECTION_TEST: 5000, // 5 seconds
    QUERY: 30000, // 30 seconds
    DEEP_RESEARCH: 60000, // 60 seconds
  },
};

// Helper function to get the correct API URL
export const getApiUrl = (): string => {
  // Check if we're in development mode and should use local IP
  const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
  if (isDevelopment && API_CONFIG.DEV.USE_LOCAL_IP) {
    return `http://${API_CONFIG.DEV.LOCAL_IP}:8000`;
  }
  return API_CONFIG.BASE_URL;
};

// Helper function to get full endpoint URL
export const getEndpointUrl = (endpoint: string): string => {
  return `${getApiUrl()}${endpoint}`;
};
