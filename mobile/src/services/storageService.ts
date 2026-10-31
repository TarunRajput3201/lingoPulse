import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'lingopulse_jwt_token';
const USER_KEY = 'lingopulse_user_cache';

let memoryStorage: { [key: string]: string } = {};

export const StorageService = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch {
      memoryStorage[key] = value;
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      }
      return await SecureStore.getItemAsync(key);
    } catch {
      return memoryStorage[key] || null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
    } catch {
      delete memoryStorage[key];
    }
  },

  async setJSON<T>(key: string, val: T): Promise<void> {
    await this.setItem(key, JSON.stringify(val));
  },

  async getJSON<T>(key: string, defaultVal: T): Promise<T> {
    try {
      const raw = await this.getItem(key);
      if (!raw) return defaultVal;
      return JSON.parse(raw) as T;
    } catch {
      return defaultVal;
    }
  },

  async setToken(token: string): Promise<void> {
    await this.setItem(TOKEN_KEY, token);
  },

  async getToken(): Promise<string | null> {
    return await this.getItem(TOKEN_KEY);
  },

  async removeToken(): Promise<void> {
    await this.removeItem(TOKEN_KEY);
  },

  async setUserCache(user: any): Promise<void> {
    await this.setJSON(USER_KEY, user);
  },

  async getUserCache(): Promise<any | null> {
    return await this.getJSON(USER_KEY, null);
  },

  async clearAll(): Promise<void> {
    await this.removeToken();
    await this.removeItem(USER_KEY);
    memoryStorage = {};
  },
};
