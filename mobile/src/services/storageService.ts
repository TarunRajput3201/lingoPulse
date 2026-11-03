import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'lingopulse_jwt_token';
const USER_KEY = 'lingopulse_user_cache';
const CHUNK_SIZE = 1500; // Well below Android 2048-byte limit

const memoryStorage: { [key: string]: string } = {};

function isWebEnvironment(): boolean {
  return typeof localStorage !== 'undefined';
}

function sanitizeKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export const StorageService = {
  async setItem(key: string, value: string): Promise<void> {
    const stringValue = typeof value === 'string' ? value : String(value ?? '');
    memoryStorage[key] = stringValue;

    try {
      if (isWebEnvironment()) {
        localStorage.setItem(key, stringValue);
        return;
      }

      if (typeof SecureStore.setItemAsync === 'function') {
        const safeKey = sanitizeKey(key);

        if (stringValue.length <= CHUNK_SIZE) {
          await SecureStore.setItemAsync(safeKey, stringValue);
          SecureStore.deleteItemAsync(`${safeKey}__cnt`).catch(() => {});
        } else {
          // Chunk large value across multiple 1.5KB safe keys
          const totalChunks = Math.ceil(stringValue.length / CHUNK_SIZE);
          await SecureStore.setItemAsync(`${safeKey}__cnt`, String(totalChunks));

          for (let i = 0; i < totalChunks; i++) {
            const chunk = stringValue.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
            await SecureStore.setItemAsync(`${safeKey}__${i}`, chunk);
          }
          SecureStore.deleteItemAsync(safeKey).catch(() => {});
        }
      }
    } catch (err) {
      // Memory storage is already populated and consistent
    }
  },

  async getItem(key: string): Promise<string | null> {
    if (memoryStorage[key] !== undefined) {
      return memoryStorage[key];
    }

    try {
      if (isWebEnvironment()) {
        const val = localStorage.getItem(key);
        if (val !== null) {
          memoryStorage[key] = val;
          return val;
        }
        return null;
      }

      if (typeof SecureStore.getItemAsync === 'function') {
        const safeKey = sanitizeKey(key);
        const countRaw = await SecureStore.getItemAsync(`${safeKey}__cnt`).catch(() => null);

        if (countRaw) {
          const count = parseInt(countRaw, 10);
          if (!isNaN(count) && count > 0) {
            let assembled = '';
            for (let i = 0; i < count; i++) {
              const chunk = await SecureStore.getItemAsync(`${safeKey}__${i}`).catch(() => '');
              assembled += chunk || '';
            }
            if (assembled.length > 0) {
              memoryStorage[key] = assembled;
              return assembled;
            }
          }
        }

        const directVal = await SecureStore.getItemAsync(safeKey).catch(() => null);
        if (directVal !== null) {
          memoryStorage[key] = directVal;
          return directVal;
        }
      }
    } catch {
      // Fallback to in-memory state
    }

    return memoryStorage[key] ?? null;
  },

  async removeItem(key: string): Promise<void> {
    delete memoryStorage[key];

    try {
      if (isWebEnvironment()) {
        localStorage.removeItem(key);
        return;
      }

      if (typeof SecureStore.deleteItemAsync === 'function') {
        const safeKey = sanitizeKey(key);
        const countRaw = await SecureStore.getItemAsync(`${safeKey}__cnt`).catch(() => null);
        if (countRaw) {
          const count = parseInt(countRaw, 10) || 0;
          for (let i = 0; i < count; i++) {
            SecureStore.deleteItemAsync(`${safeKey}__${i}`).catch(() => {});
          }
          SecureStore.deleteItemAsync(`${safeKey}__cnt`).catch(() => {});
        }
        await SecureStore.deleteItemAsync(safeKey).catch(() => {});
      }
    } catch {}
  },

  async setJSON<T>(key: string, val: T): Promise<void> {
    try {
      await this.setItem(key, JSON.stringify(val));
    } catch {}
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
    for (const k of Object.keys(memoryStorage)) {
      delete memoryStorage[k];
    }
  },

  async clear(): Promise<void> {
    await this.clearAll();
  },
};
