import { useState, useEffect, useCallback } from 'react';
import { campaignsService } from '../services/data/campaigns.service';

/**
 * Hook for managing campaigns
 * @param {Object} filters - Filter options (search, category, sortBy, userId)
 * @returns {Object} { campaigns, loading, error, refetch, createCampaign, updateCampaign, deleteCampaign }
 */
export function useCampaigns(filters = {}) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await campaignsService.getAll(filters);
      setCampaigns(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching campaigns:', err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]); // Stringify to avoid infinite loops

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const createCampaign = useCallback(async (campaignData) => {
    try {
      setLoading(true);
      setError(null);
      const newCampaign = await campaignsService.create(campaignData);
      setCampaigns(prev => [...prev, newCampaign]);
      return newCampaign;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCampaign = useCallback(async (id, campaignData) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await campaignsService.update(id, campaignData);
      setCampaigns(prev => prev.map(c => c.id === id ? updated : c));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCampaign = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await campaignsService.delete(id);
      setCampaigns(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    campaigns,
    loading,
    error,
    refetch: fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  };
}

