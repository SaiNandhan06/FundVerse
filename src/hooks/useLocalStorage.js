import { useState, useEffect } from 'react';
import { storageService } from '../services/storage/localStorage.service';

/**
 * Generic localStorage hook
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @returns {[any, function]} [storedValue, setValue]
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

