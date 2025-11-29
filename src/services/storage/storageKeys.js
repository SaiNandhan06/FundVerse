/**
 * Centralized storage keys to prevent typos and ensure consistency
 */
export const STORAGE_KEYS = {
  // User & Auth
  CURRENT_USER: 'fundverse_current_user',
  AUTH_TOKEN: 'fundverse_auth_token',
  USER_ROLE: 'fundverse_user_role',
  USERS: 'fundverse_users', // For localStorage mode - stores all registered users
  
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

