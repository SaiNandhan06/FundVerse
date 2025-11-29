import { API_CONFIG, isApiMode, getApiBaseUrl } from './apiConfig';

/**
 * Universal API client that works with localStorage or real API
 * This abstraction allows seamless switching between storage methods
 */
class ApiClient {
  constructor() {
    this.baseURL = getApiBaseUrl();
    this.timeout = API_CONFIG.timeout;
    this.headers = { ...API_CONFIG.headers };
  }

  /**
   * Set authentication token
   */
  setAuthToken(token) {
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Remove authentication token
   */
  removeAuthToken() {
    delete this.headers['Authorization'];
  }

  /**
   * Generic request method
   */
  async request(endpoint, options = {}) {
    const { method = 'GET', data = null, params = null } = options;

    // If localStorage mode, delegate to storage service
    if (!isApiMode()) {
      return this.localStorageRequest(endpoint, method, data, params);
    }

    // Real API request
    try {
      const url = new URL(`${this.baseURL}${endpoint}`);
      
      // Add query parameters
      if (params) {
        Object.keys(params).forEach(key => {
          url.searchParams.append(key, params[key]);
        });
      }

      const config = {
        method,
        headers: this.headers,
        signal: AbortSignal.timeout(this.timeout),
      };

      if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  /**
   * Handle localStorage requests (fallback)
   * This will be replaced by real API calls when backend is ready
   */
  async localStorageRequest(endpoint, method, data, params) {
    // This is a placeholder - actual implementation will be in data services
    console.warn('localStorage mode: Request handled by data service');
    return { success: true, data: null };
  }

  // Convenience methods
  async get(endpoint, params = null) {
    return this.request(endpoint, { method: 'GET', params });
  }

  async post(endpoint, data) {
    return this.request(endpoint, { method: 'POST', data });
  }

  async put(endpoint, data) {
    return this.request(endpoint, { method: 'PUT', data });
  }

  async patch(endpoint, data) {
    return this.request(endpoint, { method: 'PATCH', data });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;

