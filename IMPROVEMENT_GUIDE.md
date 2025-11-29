# FundVerse - Complete Code Improvement Guide

## Table of Contents
1. [Current State Analysis](#current-state-analysis)
2. [New Folder Structure](#new-folder-structure)
3. [Step 1: Create localStorage Service Layer](#step-1-create-localstorage-service-layer)
4. [Step 2: Create Data Models & Types](#step-2-create-data-models--types)
5. [Step 3: Create API Service Layer (Future-Ready)](#step-3-create-api-service-layer-future-ready)
6. [Step 4: Create Custom Hooks](#step-4-create-custom-hooks)
7. [Step 5: Refactor Components](#step-5-refactor-components)
8. [Step 6: Add Error Handling & Loading States](#step-6-add-error-handling--loading-states)
9. [Step 7: Migration Plan](#step-7-migration-plan)
10. [Step 8: Backend Integration Guide](#step-8-backend-integration-guide)

---

## Current State Analysis

### Hardcoded Data Locations

1. **StudentDashboard.jsx** (Lines 22-65)
   - `studentProfile` object
   - `myProjects` array
   - `analytics` object
   - `recentSupporters` array

2. **CompanyDashboard.jsx** (Lines 23-44)
   - `companySummary` object
   - `recentCampaigns` array
   - `adminInsights` object

3. **ProjectGrid.jsx** (Lines 5-84)
   - `projects` array (6 hardcoded projects)

4. **CampaignDetails.jsx** (Lines 13-40)
   - `campaign` object with all details

5. **AuthPage.jsx** (Lines 11-20)
   - `DUMMY_CREDENTIALS` object

6. **CreateCampaignForm.jsx**
   - Form data is collected but not persisted

---

## New Folder Structure

```
src/
├── services/
│   ├── storage/
│   │   ├── localStorage.service.js      # localStorage wrapper
│   │   └── storageKeys.js               # Storage key constants
│   ├── api/
│   │   ├── apiClient.js                 # API client (axios/fetch wrapper)
│   │   ├── campaigns.api.js             # Campaign API calls
│   │   ├── users.api.js                 # User API calls
│   │   ├── payments.api.js             # Payment API calls
│   │   └── apiConfig.js                 # API configuration
│   └── data/
│       ├── campaigns.service.js         # Campaign data service (localStorage → API)
│       ├── users.service.js             # User data service
│       └── payments.service.js          # Payment data service
├── hooks/
│   ├── useCampaigns.js                  # Campaign data hook
│   ├── useUser.js                       # User data hook
│   ├── useLocalStorage.js               # Generic localStorage hook
│   ├── useAuth.js                       # Authentication hook
│   └── useApi.js                        # Generic API hook
├── utils/
│   ├── validation.js                    # Validation utilities
│   ├── formatters.js                    # Currency, date formatters
│   └── constants.js                     # App constants
├── context/
│   ├── AuthContext.jsx                  # Authentication context
│   └── CampaignContext.jsx              # Campaign context (optional)
├── models/
│   ├── Campaign.js                      # Campaign data model
│   ├── User.js                          # User data model
│   └── Payment.js                       # Payment data model
└── components/
    └── ... (existing components)
```

---

## Step 1: Create localStorage Service Layer

### File: `src/services/storage/storageKeys.js`

```javascript
/**
 * Centralized storage keys to prevent typos and ensure consistency
 */
export const STORAGE_KEYS = {
  // User & Auth
  CURRENT_USER: 'fundverse_current_user',
  AUTH_TOKEN: 'fundverse_auth_token',
  USER_ROLE: 'fundverse_user_role',
  
  // Campaigns
  CAMPAIGNS: 'fundverse_campaigns',
  USER_CAMPAIGNS: 'fundverse_user_campaigns',
  
  // Payments
  PAYMENTS: 'fundverse_payments',
  PAYMENT_HISTORY: 'fundverse_payment_history',
  
  // UI Preferences
  SIDEBAR_STATE: 'fundverse_sidebar_state',
  STUDENT_SIDEBAR_OPEN: 'studentSidebarOpen',
  COMPANY_SIDEBAR_OPEN: 'companySidebarOpen',
  
  // Settings
  USER_PREFERENCES: 'fundverse_user_preferences',
};

/**
 * Get namespaced key to avoid conflicts
 */
export const getStorageKey = (key) => {
  return `fundverse_${key}`;
};
```

### File: `src/services/storage/localStorage.service.js`

```javascript
/**
 * Safe localStorage wrapper with error handling and type safety
 */
class LocalStorageService {
  /**
   * Check if localStorage is available
   */
  isAvailable() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Get item from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} Parsed value or default
   */
  get(key, defaultValue = null) {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available');
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store (will be JSON stringified)
   * @returns {boolean} Success status
   */
  set(key, value) {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      
      // Handle quota exceeded error
      if (error.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded. Consider clearing old data.');
        // Optionally: Clear old data or notify user
        this.clearOldData();
      }
      return false;
    }
  }

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} Success status
   */
  remove(key) {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Clear all FundVerse data from localStorage
   * @returns {boolean} Success status
   */
  clearAll() {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('fundverse_')) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  /**
   * Clear old data to free up space (optional helper)
   */
  clearOldData() {
    // Example: Remove data older than 30 days
    // Implement based on your needs
    console.warn('Clearing old localStorage data...');
  }

  /**
   * Get all items with a specific prefix
   * @param {string} prefix - Key prefix
   * @returns {Object} Object with all matching keys and values
   */
  getAll(prefix) {
    if (!this.isAvailable()) {
      return {};
    }

    const result = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          result[key] = this.get(key);
        }
      }
    } catch (error) {
      console.error('Error getting all items:', error);
    }
    return result;
  }
}

// Export singleton instance
export const storageService = new LocalStorageService();
export default storageService;
```

---

## Step 2: Create Data Models & Types

### File: `src/models/Campaign.js`

```javascript
/**
 * Campaign data model with validation and defaults
 */
export class Campaign {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.campaignTitle = data.campaignTitle || '';
    this.campaignTagline = data.campaignTagline || '';
    this.category = data.category || '';
    this.creatorType = data.creatorType || 'Student';
    this.description = data.description || '';
    this.targetAmount = data.targetAmount || 0;
    this.minimumContribution = data.minimumContribution || 0;
    this.deadline = data.deadline || '';
    this.raised = data.raised || 0;
    this.backers = data.backers || 0;
    this.status = data.status || 'Pending';
    this.created = data.created || new Date().toISOString();
    this.updated = data.updated || new Date().toISOString();
    this.creator = {
      name: data.creator?.name || '',
      email: data.creator?.email || '',
      organization: data.creator?.organization || '',
      city: data.creator?.city || '',
      state: data.creator?.state || '',
    };
    this.milestones = data.milestones || [];
    this.images = data.images || {
      cover: null,
      additional: [],
    };
    this.pitchDeck = data.pitchDeck || null;
    this.idProof = data.idProof || null;
  }

  generateId() {
    return `campaign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Calculate funded percentage
   */
  getFundedPercent() {
    if (this.targetAmount === 0) return 0;
    return Math.min(100, Math.round((this.raised / this.targetAmount) * 100));
  }

  /**
   * Calculate days left
   */
  getDaysLeft() {
    if (!this.deadline) return 0;
    const deadline = new Date(this.deadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  /**
   * Validate campaign data
   */
  validate() {
    const errors = {};
    
    if (!this.campaignTitle.trim()) {
      errors.campaignTitle = 'Campaign title is required';
    }
    if (!this.campaignTagline.trim()) {
      errors.campaignTagline = 'Campaign tagline is required';
    }
    if (!this.category) {
      errors.category = 'Category is required';
    }
    if (!this.description.trim() || this.description.length < 50) {
      errors.description = 'Description must be at least 50 characters';
    }
    if (!this.targetAmount || this.targetAmount <= 0) {
      errors.targetAmount = 'Valid target amount is required';
    }
    if (!this.deadline) {
      errors.deadline = 'Deadline is required';
    }
    if (!this.creator.name.trim()) {
      errors.creatorName = 'Creator name is required';
    }
    if (!this.creator.email.trim() || !/\S+@\S+\.\S+/.test(this.creator.email)) {
      errors.email = 'Valid email is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Convert to JSON for storage
   */
  toJSON() {
    return {
      id: this.id,
      campaignTitle: this.campaignTitle,
      campaignTagline: this.campaignTagline,
      category: this.category,
      creatorType: this.creatorType,
      description: this.description,
      targetAmount: this.targetAmount,
      minimumContribution: this.minimumContribution,
      deadline: this.deadline,
      raised: this.raised,
      backers: this.backers,
      status: this.status,
      created: this.created,
      updated: this.updated,
      creator: this.creator,
      milestones: this.milestones,
      images: this.images,
      pitchDeck: this.pitchDeck,
      idProof: this.idProof,
    };
  }

  /**
   * Create from JSON
   */
  static fromJSON(json) {
    return new Campaign(json);
  }
}
```

### File: `src/models/User.js`

```javascript
/**
 * User data model
 */
export class User {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.name = data.name || '';
    this.email = data.email || '';
    this.role = data.role || 'student'; // 'student' | 'company'
    this.college = data.college || '';
    this.major = data.major || '';
    this.city = data.city || '';
    this.state = data.state || '';
    this.profilePicture = data.profilePicture || null;
    this.created = data.created || new Date().toISOString();
    this.updated = data.updated || new Date().toISOString();
  }

  generateId() {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      college: this.college,
      major: this.major,
      city: this.city,
      state: this.state,
      profilePicture: this.profilePicture,
      created: this.created,
      updated: this.updated,
    };
  }

  static fromJSON(json) {
    return new User(json);
  }
}
```

### File: `src/models/Payment.js`

```javascript
/**
 * Payment data model
 */
export class Payment {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.campaignId = data.campaignId || '';
    this.userId = data.userId || '';
    this.amount = data.amount || 0;
    this.platformFee = data.platformFee || 0;
    this.total = data.total || 0;
    this.paymentMethod = data.paymentMethod || 'card';
    this.isAnonymous = data.isAnonymous || false;
    this.status = data.status || 'pending'; // 'pending' | 'completed' | 'failed'
    this.created = data.created || new Date().toISOString();
  }

  generateId() {
    return `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  calculateTotal() {
    this.platformFee = this.amount * 0.05; // 5% platform fee
    this.total = this.amount + this.platformFee;
    return this.total;
  }

  toJSON() {
    return {
      id: this.id,
      campaignId: this.campaignId,
      userId: this.userId,
      amount: this.amount,
      platformFee: this.platformFee,
      total: this.total,
      paymentMethod: this.paymentMethod,
      isAnonymous: this.isAnonymous,
      status: this.status,
      created: this.created,
    };
  }

  static fromJSON(json) {
    return new Payment(json);
  }
}
```

---

## Step 3: Create API Service Layer (Future-Ready)

### File: `src/services/api/apiConfig.js`

```javascript
/**
 * API configuration - easily switch between localStorage and real API
 */
export const API_CONFIG = {
  // Set to 'localStorage' for current implementation
  // Set to 'api' when backend is ready
  mode: 'localStorage', // 'localStorage' | 'api'
  
  // API base URL (used when mode is 'api')
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
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
```

### File: `src/services/api/apiClient.js`

```javascript
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
```

### File: `src/services/api/campaigns.api.js`

```javascript
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
```

### File: `src/services/api/users.api.js`

```javascript
import { apiClient } from './apiClient';
import { isApiMode } from './apiConfig';

export const usersApi = {
  async login(credentials) {
    if (!isApiMode()) {
      return { data: null, token: null };
    }
    
    return apiClient.post('/auth/login', credentials);
  },

  async register(userData) {
    if (!isApiMode()) {
      return { data: null, token: null };
    }
    
    return apiClient.post('/auth/register', userData);
  },

  async getCurrentUser() {
    if (!isApiMode()) {
      return { data: null };
    }
    
    return apiClient.get('/users/me');
  },

  async updateProfile(userId, userData) {
    if (!isApiMode()) {
      return { data: null };
    }
    
    return apiClient.put(`/users/${userId}`, userData);
  },
};
```

---

## Step 4: Create Data Services (localStorage → API Bridge)

### File: `src/services/data/campaigns.service.js`

```javascript
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
    if (filters.category) {
      filtered = filtered.filter(c => c.category === filters.category);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(c => 
        c.campaignTitle.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower)
      );
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
      .filter(c => c.creator?.email === userId || c.creator?.id === userId)
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
```

### File: `src/services/data/users.service.js`

```javascript
import { storageService } from '../storage/localStorage.service';
import { STORAGE_KEYS } from '../storage/storageKeys';
import { usersApi } from '../api/users.api';
import { isApiMode } from '../api/apiConfig';
import { User } from '../../models/User';

class UsersService {
  async getCurrentUser() {
    if (isApiMode()) {
      const response = await usersApi.getCurrentUser();
      return response.data ? User.fromJSON(response.data) : null;
    }

    // localStorage mode
    return storageService.get(STORAGE_KEYS.CURRENT_USER, null);
  }

  async setCurrentUser(user) {
    if (isApiMode()) {
      // User is managed by backend
      return;
    }

    const userObj = user instanceof User ? user.toJSON() : user;
    storageService.set(STORAGE_KEYS.CURRENT_USER, userObj);
  }

  async login(credentials) {
    if (isApiMode()) {
      const response = await usersApi.login(credentials);
      if (response.token) {
        // Store token
        storageService.set(STORAGE_KEYS.AUTH_TOKEN, response.token);
        apiClient.setAuthToken(response.token);
      }
      return response.data ? User.fromJSON(response.data) : null;
    }

    // localStorage mode - check against stored users
    const users = storageService.get(STORAGE_KEYS.USERS, []);
    const user = users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      const userObj = User.fromJSON(user);
      this.setCurrentUser(userObj);
      return userObj;
    }
    
    return null;
  }

  async register(userData) {
    const user = new User(userData);
    
    if (isApiMode()) {
      const response = await usersApi.register(user.toJSON());
      if (response.token) {
        storageService.set(STORAGE_KEYS.AUTH_TOKEN, response.token);
      }
      return response.data ? User.fromJSON(response.data) : null;
    }

    // localStorage mode
    const users = storageService.get(STORAGE_KEYS.USERS, []);
    
    // Check if user already exists
    if (users.find(u => u.email === user.email)) {
      throw new Error('User with this email already exists');
    }
    
    users.push(user.toJSON());
    storageService.set(STORAGE_KEYS.USERS, users);
    this.setCurrentUser(user);
    
    return user;
  }

  async logout() {
    if (isApiMode()) {
      apiClient.removeAuthToken();
    }
    storageService.remove(STORAGE_KEYS.CURRENT_USER);
    storageService.remove(STORAGE_KEYS.AUTH_TOKEN);
  }
}

export const usersService = new UsersService();
export default usersService;
```

---

## Step 5: Create Custom Hooks

### File: `src/hooks/useLocalStorage.js`

```javascript
import { useState, useEffect } from 'react';
import { storageService } from '../services/storage/localStorage.service';

/**
 * Generic localStorage hook
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = storageService.get(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      storageService.set(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

### File: `src/hooks/useCampaigns.js`

```javascript
import { useState, useEffect, useCallback } from 'react';
import { campaignsService } from '../services/data/campaigns.service';

/**
 * Hook for managing campaigns
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
  }, [filters]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const createCampaign = useCallback(async (campaignData) => {
    try {
      setLoading(true);
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
```

### File: `src/hooks/useAuth.js`

```javascript
import { useState, useEffect, useCallback } from 'react';
import { usersService } from '../services/data/users.service';
import { storageService } from '../services/storage/localStorage.service';
import { STORAGE_KEYS } from '../services/storage/storageKeys';

/**
 * Authentication hook
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await usersService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const loggedInUser = await usersService.login(credentials);
      if (loggedInUser) {
        setUser(loggedInUser);
        return loggedInUser;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await usersService.register(userData);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await usersService.logout();
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
```

---

## Step 6: Refactor Components

### File: `src/components/ProjectGrid.jsx` (REFACTORED)

```javascript
import { useCampaigns } from '../hooks/useCampaigns';
import ProjectCard from './ProjectCard';
import { useState } from 'react';

function ProjectGrid({ filters = {} }) {
  const { campaigns, loading, error } = useCampaigns(filters);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p>Error loading campaigns: {error}</p>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6B7280] text-lg">No campaigns found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((project) => (
        <ProjectCard
          key={project.id}
          projectId={project.id}
          image={project.images?.cover}
          category={project.category}
          title={project.campaignTitle}
          description={project.description}
          creator={project.creator?.name || 'Unknown'}
          raised={`₹${project.raised.toLocaleString('en-IN')}`}
          goal={`₹${project.targetAmount.toLocaleString('en-IN')}`}
          fundedPercent={project.getFundedPercent().toString()}
          backers={project.backers.toString()}
          daysLeft={project.getDaysLeft().toString()}
        />
      ))}
    </div>
  );
}

export default ProjectGrid;
```

### File: `src/pages/StudentDashboard.jsx` (REFACTORED - Key Changes)

```javascript
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCampaigns } from '../hooks/useCampaigns';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../services/storage/storageKeys';

function StudentDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  // Use localStorage hook for sidebar state
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    STORAGE_KEYS.STUDENT_SIDEBAR_OPEN,
    window.innerWidth >= 768
  );

  // Fetch user's campaigns
  const { campaigns: myProjects, loading: campaignsLoading } = useCampaigns({
    userId: user?.id,
  });

  // Calculate analytics from actual data
  const analytics = {
    totalCampaigns: myProjects.length,
    successRate: myProjects.length > 0
      ? `${Math.round((myProjects.filter(p => p.status === 'Completed').length / myProjects.length) * 100)}%`
      : '0%',
    totalBackers: myProjects.reduce((sum, p) => sum + p.backers, 0),
  };

  // Get recent supporters from payments (would need payments service)
  const recentSupporters = []; // TODO: Implement with payments service

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  // Use user data from auth
  const studentProfile = {
    name: user.name,
    college: user.college,
    major: user.major,
    ongoingProjects: myProjects.filter(p => p.status === 'Active').length,
    totalRaised: `₹${myProjects.reduce((sum, p) => sum + p.raised, 0).toLocaleString('en-IN')}`,
    profilePicture: user.profilePicture,
  };

  // ... rest of component remains similar but uses dynamic data
}
```

### File: `src/pages/CreateCampaignForm.jsx` (REFACTORED - Key Changes)

```javascript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCampaigns } from '../hooks/useCampaigns';
import { Campaign } from '../models/Campaign';

function CreateCampaignForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createCampaign, loading } = useCampaigns();

  const [formData, setFormData] = useState({
    campaignTitle: '',
    campaignTagline: '',
    category: '',
    creatorType: user?.role || 'Student',
    description: '',
    targetAmount: '',
    minimumContribution: '',
    deadline: '',
    hasMilestones: false,
    milestones: [{ title: '', amount: '', description: '' }],
    coverImage: null,
    additionalImages: [],
    pitchDeck: null,
    idProof: null,
  });

  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Pre-fill creator info from user
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        creatorName: user.name,
        email: user.email,
        organization: user.college || '',
        city: user.city || '',
        state: user.state || '',
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create Campaign model instance
    const campaignData = {
      ...formData,
      creator: {
        name: formData.creatorName,
        email: formData.email,
        organization: formData.organization,
        city: formData.city,
        state: formData.state,
      },
      images: {
        cover: formData.coverImage,
        additional: formData.additionalImages,
      },
      targetAmount: parseFloat(formData.targetAmount),
      minimumContribution: parseFloat(formData.minimumContribution),
    };

    try {
      const campaign = new Campaign(campaignData);
      const validation = campaign.validate();
      
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      await createCampaign(campaign.toJSON());
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/discover');
      }, 2000);
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  // ... rest of form JSX remains similar
}
```

---

## Step 7: Migration Plan

### Phase 1: Setup Infrastructure (Week 1)
1. ✅ Create folder structure
2. ✅ Create localStorage service
3. ✅ Create data models
4. ✅ Create API service layer (skeleton)
5. ✅ Create custom hooks

### Phase 2: Refactor Components (Week 2)
1. ✅ Refactor ProjectGrid to use useCampaigns
2. ✅ Refactor StudentDashboard to use dynamic data
3. ✅ Refactor CompanyDashboard to use dynamic data
4. ✅ Refactor CreateCampaignForm to save to localStorage
5. ✅ Refactor AuthPage to use useAuth hook

### Phase 3: Add Features (Week 3)
1. ✅ Add loading states to all components
2. ✅ Add error handling
3. ✅ Add form validation improvements
4. ✅ Add payment tracking
5. ✅ Add user profile management

### Phase 4: Backend Integration (Week 4+)
1. Switch API_CONFIG.mode to 'api'
2. Implement real API endpoints
3. Test and migrate data
4. Remove localStorage fallback (optional)

---

## Step 8: Backend Integration Guide

### Option A: Node.js + Express + MongoDB

**Backend Structure:**
```
backend/
├── routes/
│   ├── campaigns.js
│   ├── users.js
│   └── payments.js
├── models/
│   ├── Campaign.js
│   ├── User.js
│   └── Payment.js
├── controllers/
│   ├── campaignsController.js
│   ├── usersController.js
│   └── paymentsController.js
└── server.js
```

**To Switch:**
1. Update `src/services/api/apiConfig.js`:
```javascript
export const API_CONFIG = {
  mode: 'api', // Change from 'localStorage'
  baseURL: 'http://localhost:3000/api',
};
```

2. Implement API endpoints in backend
3. Update API client if needed (CORS, authentication)

### Option B: Firebase

**Setup:**
1. Install Firebase:
```bash
npm install firebase
```

2. Create `src/services/firebase/config.js`:
```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your config
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

3. Create Firebase service:
```javascript
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './config';

export const firebaseCampaignsService = {
  async getAll() {
    const snapshot = await getDocs(collection(db, 'campaigns'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  
  async create(data) {
    const docRef = await addDoc(collection(db, 'campaigns'), data);
    return { id: docRef.id, ...data };
  },
  
  // ... other methods
};
```

4. Update `campaigns.service.js` to use Firebase when in API mode

### Option C: Supabase

Similar to Firebase but with PostgreSQL backend.

---

## Exact File Changes Summary

### Files to CREATE:
1. `src/services/storage/storageKeys.js`
2. `src/services/storage/localStorage.service.js`
3. `src/services/api/apiConfig.js`
4. `src/services/api/apiClient.js`
5. `src/services/api/campaigns.api.js`
6. `src/services/api/users.api.js`
7. `src/services/data/campaigns.service.js`
8. `src/services/data/users.service.js`
9. `src/models/Campaign.js`
10. `src/models/User.js`
11. `src/models/Payment.js`
12. `src/hooks/useLocalStorage.js`
13. `src/hooks/useCampaigns.js`
14. `src/hooks/useAuth.js`

### Files to MODIFY:
1. `src/components/ProjectGrid.jsx` - Use useCampaigns hook
2. `src/pages/StudentDashboard.jsx` - Use dynamic data
3. `src/pages/CompanyDashboard.jsx` - Use dynamic data
4. `src/pages/CreateCampaignForm.jsx` - Save to localStorage
5. `src/pages/AuthPage.jsx` - Use useAuth hook
6. `src/pages/Discover.jsx` - Pass filters to ProjectGrid
7. `src/pages/CampaignDetails.jsx` - Fetch from service
8. `src/pages/SupportAmount.jsx` - Save contributions
9. `src/pages/PaymentPage.jsx` - Save payments

---

This guide provides a complete roadmap for transforming your hardcoded data into a dynamic, scalable, and backend-ready application. Each step builds on the previous one, ensuring a smooth migration path.

