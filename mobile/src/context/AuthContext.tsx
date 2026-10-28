import React, { createContext, useContext, useEffect, useState } from 'react';
import { StorageService } from '../services/storageService';
import { ENDPOINTS } from '../constants/api';

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  role: string;
  nativeLanguage: string;
  targetLanguage: string;
  learningLevel: string;
  preferences: {
    dailyGoalMinutes: number;
    soundEffects: boolean;
    hapticFeedback: boolean;
    dailyReminder: boolean;
    reminderTime: string;
    theme: string;
    timezone: string;
  };
  hearts: number;
  maxHearts: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  hasCompletedOnboarding: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  register: (payload: any) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  completeOnboarding: (data: any) => Promise<void>;
  refreshUser: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  updateUserLocally: (updater: (prev: UserProfile | null) => UserProfile | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadSession = async () => {
    try {
      const savedToken = await StorageService.getToken();
      const savedUser = await StorageService.getUserCache();

      if (savedToken) {
        setToken(savedToken);
        if (savedUser) {
          setUser(savedUser);
          // Instantly unblock UI with cached credentials
          setIsLoading(false);
        }

        // Fetch fresh profile with safety timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
          const res = await fetch(ENDPOINTS.PROFILE, {
            headers: { Authorization: `Bearer ${savedToken}` },
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            await StorageService.setUserCache(data.user);
          } else if (res.status === 401) {
            // Token expired
            await StorageService.clearAll();
            setToken(null);
            setUser(null);
          }
        } catch (fetchErr) {
          console.warn('[AuthContext] Profile sync deferred or timed out:', fetchErr);
        }
      }
    } catch (e) {
      console.warn('[AuthContext] Error loading session:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || 'Login failed.' };
      }

      setToken(data.tokens.accessToken);
      setUser(data.user);
      await StorageService.setToken(data.tokens.accessToken);
      await StorageService.setUserCache(data.user);
      return { success: true };
    } catch {
      return { success: false, message: 'Network error. Please check your connection.' };
    }
  };

  const register = async (payload: any) => {
    try {
      const res = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || 'Registration failed.' };
      }

      setToken(data.tokens.accessToken);
      setUser(data.user);
      await StorageService.setToken(data.tokens.accessToken);
      await StorageService.setUserCache(data.user);
      return { success: true };
    } catch {
      return { success: false, message: 'Network error. Please check your connection.' };
    }
  };

  const logout = async () => {
    await StorageService.clearAll();
    setToken(null);
    setUser(null);
  };

  const completeOnboarding = async (data: any) => {
    if (!token) return;
    try {
      const res = await fetch(ENDPOINTS.ONBOARDING, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const result = await res.json();
        setUser(result.user);
        await StorageService.setUserCache(result.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await fetch(ENDPOINTS.PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        await StorageService.setUserCache(data.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteAccount = async () => {
    if (!token) return;
    try {
      await fetch(ENDPOINTS.DELETE_ACCOUNT, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } finally {
      await logout();
    }
  };

  const updateUserLocally = (updater: (prev: UserProfile | null) => UserProfile | null) => {
    setUser((prev) => {
      const next = updater(prev);
      if (next) StorageService.setUserCache(next);
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
        completeOnboarding,
        refreshUser,
        deleteAccount,
        updateUserLocally,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
