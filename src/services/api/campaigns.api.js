import { apiClient } from './apiClient';
import { isApiMode } from './apiConfig';

/**
 * Campaign API endpoints
 * These functions will call the real API when backend is ready
 */
export const campaignsApi = {
  /**
   * Get all campaigns
   */
  async getAll(filters = {}) {
    if (!isApiMode()) {
      // Return empty - data service will handle localStorage
      return { data: [], total: 0 };
    }
    
    return apiClient.get('/campaigns', filters);
  },

  /**
   * Get campaign by ID
   */
  async getById(id) {
    if (!isApiMode()) {
      return { data: null };
    }
    
    return apiClient.get(`/campaigns/${id}`);
  },

  /**
   * Create new campaign
   */
  async create(campaignData) {
    if (!isApiMode()) {
      return { data: null, success: false };
    }
    
    return apiClient.post('/campaigns', campaignData);
  },

  /**
   * Update campaign
   */
  async update(id, campaignData) {
    if (!isApiMode()) {
      return { data: null, success: false };
    }
    
    return apiClient.put(`/campaigns/${id}`, campaignData);
  },

  /**
   * Delete campaign
   */
  async delete(id) {
    if (!isApiMode()) {
      return { success: false };
    }
    
    return apiClient.delete(`/campaigns/${id}`);
  },

  /**
   * Get user's campaigns
   */
  async getUserCampaigns(userId) {
    if (!isApiMode()) {
      return { data: [] };
    }
    
    return apiClient.get(`/campaigns/user/${userId}`);
  },
};

