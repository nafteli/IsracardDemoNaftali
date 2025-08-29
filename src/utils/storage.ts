import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Global AsyncStorage management utility
 * Universal functions for reading and writing to device storage
 */

export class Storage {
  /**
   * Save data to AsyncStorage
   * @param key Storage key
   * @param value Value to save (object, string, number, boolean)
   * @returns Promise<boolean> - Whether the save operation succeeded
   */
  static async setItem<T>(key: string, value: T): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error(`Error saving to storage with key "${key}":`, error);
      return false;
    }
  }

  /**
   * Read data from AsyncStorage
   * @param key Storage key to read
   * @param defaultValue Default value if key doesn't exist
   * @returns Promise<T | null> - The value or null if not found
   */
  static async getItem<T>(key: string, defaultValue?: T): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue === null) {
        return defaultValue ?? null;
      }
      return JSON.parse(jsonValue) as T;
    } catch (error) {
      console.error(`Error reading from storage with key "${key}":`, error);
      return defaultValue ?? null;
    }
  }

  /**
   * Remove data from AsyncStorage
   * @param key Storage key to remove
   * @returns Promise<boolean> - Whether the removal succeeded
   */
  static async removeItem(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from storage with key "${key}":`, error);
      return false;
    }
  }

  /**
   * Check if a key exists in AsyncStorage
   * @param key Storage key to check
   * @returns Promise<boolean> - Whether the key exists
   */
  static async hasItem(key: string): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null;
    } catch (error) {
      console.error(`Error checking storage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Clear all data from AsyncStorage
   * Warning! This deletes everything!
   * @returns Promise<boolean> - Whether the clear operation succeeded
   */
  static async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  /**
   * Get all keys from AsyncStorage
   * @returns Promise<string[]> - Array of all storage keys
   */
  static async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys from storage:', error);
      return [];
    }
  }

  /**
   * Get multiple items simultaneously
   * @param keys Array of storage keys
   * @returns Promise<Record<string, any>> - Object with all values
   */
  static async getMultiple(keys: string[]): Promise<Record<string, unknown>> {
    try {
      const values = await AsyncStorage.multiGet(keys);
      const result: Record<string, unknown> = {};
      
      values.forEach(([key, value]: [string, string | null]) => {
        if (value !== null) {
          try {
            result[key] = JSON.parse(value);
          } catch {
            result[key] = value;
          }
        }
      });
      
      return result;
    } catch (error) {
      console.error('Error getting multiple items from storage:', error);
      return {};
    }
  }

  /**
   * Save multiple items simultaneously
   * @param items Object with key-value pairs
   * @returns Promise<boolean> - Whether the save operation succeeded
   */
  static async setMultiple(items: Record<string, unknown>): Promise<boolean> {
    try {
      const keyValuePairs: [string, string][] = Object.entries(items).map(([key, value]: [string, unknown]) => [
        key,
        JSON.stringify(value)
      ]);
      
      await AsyncStorage.multiSet(keyValuePairs);
      return true;
    } catch (error) {
      console.error('Error setting multiple items to storage:', error);
      return false;
    }
  }
}

// Storage keys constants for app-wide usage
export const STORAGE_KEYS = {
  THEME_PREFERENCE: 'user-theme-preference',
  LANGUAGE_PREFERENCE: 'user-language-preference',
} as const;

// Type definitions for theme and language
export type ThemeMode = 'light' | 'dark' | 'system';
export type LanguageCode = 'he' | 'en';

// Convenience functions for specific topics
export const ThemeStorage = {
  async getThemeMode(): Promise<ThemeMode> {
    const result = await Storage.getItem<ThemeMode>(STORAGE_KEYS.THEME_PREFERENCE, 'system');
    return result || 'system';
  },
  
  async setThemeMode(mode: ThemeMode): Promise<boolean> {
    return await Storage.setItem(STORAGE_KEYS.THEME_PREFERENCE, mode);
  }
};

export const LanguageStorage = {
  async getLanguage(): Promise<LanguageCode> {
    const result = await Storage.getItem<LanguageCode>(STORAGE_KEYS.LANGUAGE_PREFERENCE, 'he');
    return result || 'he';
  },
  
  async setLanguage(language: LanguageCode): Promise<boolean> {
    return await Storage.setItem(STORAGE_KEYS.LANGUAGE_PREFERENCE, language);
  }
};
