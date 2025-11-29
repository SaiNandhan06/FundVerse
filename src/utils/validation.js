/**
 * Validation utility functions
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

/**
 * Validate required field
 * @param {string} value - Value to check
 * @returns {boolean} Is not empty
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== '';
};

/**
 * Validate minimum length
 * @param {string} value - Value to check
 * @param {number} minLength - Minimum length
 * @returns {boolean} Meets minimum length
 */
export const minLength = (value, minLength) => {
  return String(value).length >= minLength;
};

/**
 * Validate number is positive
 * @param {number|string} value - Value to check
 * @returns {boolean} Is positive number
 */
export const isPositiveNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

/**
 * Validate date is in future
 * @param {string|Date} date - Date to check
 * @returns {boolean} Is future date
 */
export const isFutureDate = (date) => {
  const d = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d > today;
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Allowed MIME types
 * @returns {boolean} Is valid file type
 */
export const isValidFileType = (file, allowedTypes) => {
  if (!file) return false;
  return allowedTypes.includes(file.type);
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {boolean} Is within size limit
 */
export const isValidFileSize = (file, maxSizeMB) => {
  if (!file) return false;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

