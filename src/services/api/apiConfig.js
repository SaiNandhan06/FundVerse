/**
 * API configuration - easily switch between localStorage and real API
 */
export const API_CONFIG = {
  // Set to 'localStorage' for current implementation
  // Set to 'api' when backend is ready
  mode: 'localStorage', // 'localStorage' | 'api'
  
  // API base URL (used when mode is 'api')
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
  // API timeout
  timeout: 10000,
  
  // Default headers
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Check if we're using API mode
 */
export const isApiMode = () => API_CONFIG.mode === 'api';

/**
 * Get API base URL
 */
export const getApiBaseUrl = () => API_CONFIG.baseURL;

