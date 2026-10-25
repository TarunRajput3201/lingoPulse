import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'lingopulse_jwt_token';
const USER_KEY = 'lingopulse_user_cache';

let memoryStorage: { [key: string]: string } = {};

export const StorageService = {
  async setToken(token: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
      }
    } catch {
      memoryStorage[TOKEN_KEY] = token;
    }
  },

  async getToken(): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(TOKEN_KEY);
      }
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch {
      return memoryStorage[TOKEN_KEY] || null;
    }
  },

  async removeToken(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(TOKEN_KEY);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
    } catch {
      delete memoryStorage[TOKEN_KEY];
    }
  },

  async setUserCache(user: any): Promise<void> {
    try {
      const serialized = JSON.stringify(user);
      if (Platform.OS === 'web') {
        localStorage.setItem(USER_KEY, serialized);
      } else {
        await SecureStore.setItemAsync(USER_KEY, serialized);
      }
    } catch {
      memoryStorage[USER_KEY] = JSON.stringify(user);
    }
  },

  async getUserCache(): Promise<any | null> {
    try {
      let raw: string | null = null;
      if (Platform.OS === 'web') {
        raw = localStorage.getItem(USER_KEY);
      } else {
        raw = await SecureStore.getItemAsync(USER_KEY);
      }
      return raw ? JSON.parse(raw) : null;
    } catch {
      const raw = memoryStorage[USER_KEY];
      return raw ? JSON.parse(raw) : null;
    }
  },

  async clearAll(): Promise<void> {
    await this.removeToken();
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(USER_KEY);
      } else {
        await SecureStore.deleteItemAsync(USER_KEY);
      }
    } catch {}
    memoryStorage = {};
  },
};
