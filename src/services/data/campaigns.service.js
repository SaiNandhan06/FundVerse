import { storageService } from '../storage/localStorage.service';
import { STORAGE_KEYS } from '../storage/storageKeys';
import { campaignsApi } from '../api/campaigns.api';
import { isApiMode } from '../api/apiConfig';
import { Campaign } from '../../models/Campaign';

/**
 * Campaign data service
 * Handles both localStorage and API modes seamlessly
 */
class CampaignsService {
  /**
   * Get all campaigns
   */
  async getAll(filters = {}) {
    if (isApiMode()) {
      // Real API call
      const response = await campaignsApi.getAll(filters);
      return response.data || [];
    }

    // localStorage mode
    const campaigns = storageService.get(STORAGE_KEYS.CAMPAIGNS, []);
    
    // Apply filters
    let filtered = campaigns;
    
    if (filters.category && filters.category !== 'All Categories') {
      filtered = filtered.filter(c => c.category === filters.category);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(c => 
        c.campaignTitle?.toLowerCase().includes(searchLower) ||
        c.description?.toLowerCase().includes(searchLower) ||
        c.creator?.name?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'Newest':
          filtered.sort((a, b) => new Date(b.created) - new Date(a.created));
          break;
        case 'Most Funded':
          filtered.sort((a, b) => b.raised - a.raised);
          break;
        case 'Ending Soon':
          filtered.sort((a, b) => {
            const daysA = new Date(a.deadline) - new Date();
            const daysB = new Date(b.deadline) - new Date();
            return daysA - daysB;
          });
          break;
        case 'Most Backers':
          filtered.sort((a, b) => b.backers - a.backers);
          break;
        default: // Trending
          filtered.sort((a, b) => {
            const percentA = a.targetAmount > 0 ? (a.raised / a.targetAmount) : 0;
            const percentB = b.targetAmount > 0 ? (b.raised / b.targetAmount) : 0;
            return percentB - percentA;
          });
      }
    }
    
    return filtered.map(c => Campaign.fromJSON(c));
  }

  /**
   * Get campaign by ID
   */
  async getById(id) {
    if (isApiMode()) {
      const response = await campaignsApi.getById(id);
      return response.data ? Campaign.fromJSON(response.data) : null;
    }

    const campaigns = storageService.get(STORAGE_KEYS.CAMPAIGNS, []);
    const campaign = campaigns.find(c => c.id === id);
    return campaign ? Campaign.fromJSON(campaign) : null;
  }

  /**
   * Create new campaign
   */
  async create(campaignData) {
    const campaign = new Campaign(campaignData);
    
    // Validate
    const validation = campaign.validate();
    if (!validation.isValid) {
      throw new Error(JSON.stringify(validation.errors));
    }

    if (isApiMode()) {
      const response = await campaignsApi.create(campaign.toJSON());
      return Campaign.fromJSON(response.data);
    }

    // localStorage mode
    const campaigns = storageService.get(STORAGE_KEYS.CAMPAIGNS, []);
    campaigns.push(campaign.toJSON());
    storageService.set(STORAGE_KEYS.CAMPAIGNS, campaigns);
    
    return campaign;
  }

  /**
   * Update campaign
   */
  async update(id, campaignData) {
    if (isApiMode()) {
      const response = await campaignsApi.update(id, campaignData);
      return Campaign.fromJSON(response.data);
    }

    // localStorage mode
    const campaigns = storageService.get(STORAGE_KEYS.CAMPAIGNS, []);
    const index = campaigns.findIndex(c => c.id === id);
    
    if (index === -1) {
      throw new Error('Campaign not found');
    }

    campaigns[index] = {
      ...campaigns[index],
      ...campaignData,
      updated: new Date().toISOString(),
    };
    
    storageService.set(STORAGE_KEYS.CAMPAIGNS, campaigns);
    return Campaign.fromJSON(campaigns[index]);
  }

  /**
   * Delete campaign
   */
  async delete(id) {
    if (isApiMode()) {
      await campaignsApi.delete(id);
      return true;
    }

    // localStorage mode
    const campaigns = storageService.get(STORAGE_KEYS.CAMPAIGNS, []);
    const filtered = campaigns.filter(c => c.id !== id);
    storageService.set(STORAGE_KEYS.CAMPAIGNS, filtered);
    return true;
  }

  /**
   * Get user's campaigns
   */
  async getUserCampaigns(userId) {
    if (isApiMode()) {
      const response = await campaignsApi.getUserCampaigns(userId);
      return (response.data || []).map(c => Campaign.fromJSON(c));
    }

    // localStorage mode
    const campaigns = storageService.get(STORAGE_KEYS.CAMPAIGNS, []);
    return campaigns
      .filter(c => {
        const campaign = Campaign.fromJSON(c);
        return campaign.creator?.email === userId || 
               campaign.creator?.id === userId ||
               campaign.email === userId ||
               c.creator?.email === userId ||
               c.creator?.id === userId ||
               c.email === userId;
      })
      .map(c => Campaign.fromJSON(c));
  }

  /**
   * Add contribution to campaign
   */
  async addContribution(campaignId, amount) {
    const campaign = await this.getById(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    campaign.raised += amount;
    campaign.backers += 1;
    
    return await this.update(campaignId, {
      raised: campaign.raised,
      backers: campaign.backers,
    });
  }
}

export const campaignsService = new CampaignsService();
export default campaignsService;

