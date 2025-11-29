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

