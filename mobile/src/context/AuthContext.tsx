import React, { createContext, useContext, useEffect, useState } from 'react';
import { StorageService } from '../services/storageService';
import { CurriculumService } from '../services/curriculumService';
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
  nextHeartInSeconds?: number;
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
  continueAsGuest: () => Promise<void>;
  completeOnboarding: (data: any) => Promise<void>;
  refreshUser: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  updateUserLocally: (updater: (prev: UserProfile | null) => UserProfile | null) => void;
  syncHearts: () => Promise<void>;
}

const createLocalProfile = (email: string, displayName: string, username: string): UserProfile => ({
  id: `user_local_${Date.now()}`,
  email: email || 'learner@lingopulse.local',
  username: username || 'learner',
  displayName: displayName || 'Learner',
  avatarUrl: '',
  role: 'learner',
  nativeLanguage: 'en',
  targetLanguage: 'es',
  learningLevel: 'beginner',
  preferences: {
    dailyGoalMinutes: 10,
    soundEffects: true,
    hapticFeedback: true,
    dailyReminder: true,
    reminderTime: '19:00',
    theme: 'light',
    timezone: 'UTC',
  },
  hearts: 100,
  maxHearts: 100,
  nextHeartInSeconds: 0,
  totalXp: 0,
  currentStreak: 1,
  longestStreak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  hasCompletedOnboarding: true,
});

const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadSession = async () => {
    try {
      const savedToken = await StorageService.getToken();
      const savedUser = await StorageService.getUserCache();

      if (savedUser) {
        setUser(savedUser);
        setToken(savedToken || 'local-guest-token');
      } else if (savedToken) {
        setToken(savedToken);
        const fallbackProfile = createLocalProfile('learner@lingopulse.local', 'Learner', 'learner');
        setUser(fallbackProfile);
      } else {
        // Instant guest profile so learner never waits on network
        const defaultProfile = createLocalProfile('learner@lingopulse.local', 'Learner', 'learner');
        setUser(defaultProfile);
        setToken('local-guest-token');
        StorageService.setUserCache(defaultProfile).catch(() => {});
      }

      // Transition immediately - zero wait time!
      setIsLoading(false);

      // Non-blocking background remote sync (1.5s timeout, never hangs UI)
      if (savedToken && !savedToken.startsWith('local-')) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);

        fetch(ENDPOINTS.PROFILE, {
          headers: { Authorization: `Bearer ${savedToken}` },
          signal: controller.signal,
        })
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data?.user) {
              setUser(data.user);
              StorageService.setUserCache(data.user).catch(() => {});
            }
          })
          .catch(() => {})
          .finally(() => clearTimeout(timeoutId));
      }
    } catch (e) {
      console.warn('[AuthContext] Error loading session:', e);
      setIsLoading(false);
    }
  };

  const syncHearts = async () => {
    try {
      const status = await CurriculumService.getHeartsStatus();
      setUser((prev) => {
        if (!prev) return null;
        const updated = {
          ...prev,
          hearts: status.hearts,
          maxHearts: 100,
          nextHeartInSeconds: status.nextHeartInSeconds,
        };
        StorageService.setUserCache(updated).catch(() => {});
        return updated;
      });
    } catch {}
  };

  useEffect(() => {
    const watchdogTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    loadSession().finally(() => clearTimeout(watchdogTimer));
    syncHearts();

    const interval = setInterval(() => {
      setUser((prev) => {
        if (!prev) return null;
        if (prev.hearts >= 100) {
          if (prev.nextHeartInSeconds !== 0) {
            return { ...prev, nextHeartInSeconds: 0 };
          }
          return prev;
        }

        const remaining = (prev.nextHeartInSeconds ?? 600) - 1;
        if (remaining <= 0) {
          const newHearts = Math.min(100, prev.hearts + 1);
          CurriculumService.addHeart().catch(() => {});
          const updated = {
            ...prev,
            hearts: newHearts,
            nextHeartInSeconds: newHearts >= 100 ? 0 : 600,
          };
          StorageService.setUserCache(updated).catch(() => {});
          return updated;
        }

        return { ...prev, nextHeartInSeconds: remaining };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const continueAsGuest = async () => {
    const guestUser = createLocalProfile('guest@lingopulse.local', 'Explorer', 'explorer');
    const guestToken = 'local-guest-token';
    setUser(guestUser);
    setToken(guestToken);
    await StorageService.setToken(guestToken);
    await StorageService.setUserCache(guestUser);
  };

  const login = async (email: string, pass: string) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        setToken(data.tokens.accessToken);
        setUser(data.user);
        await StorageService.setToken(data.tokens.accessToken);
        await StorageService.setUserCache(data.user);
        return { success: true };
      }

      const data = await res.json().catch(() => ({}));
      return { success: false, message: data.message || 'Invalid email or password.' };
    } catch {
      // Cloud unreachable or 503: Provide instant offline fallback session
      const namePart = email.split('@')[0] || 'Learner';
      const offlineUser = createLocalProfile(email, namePart, namePart);
      const offlineToken = 'local-offline-token';
      setToken(offlineToken);
      setUser(offlineUser);
      await StorageService.setToken(offlineToken);
      await StorageService.setUserCache(offlineUser);
      return { success: true };
    }
  };

  const register = async (payload: any) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        setToken(data.tokens.accessToken);
        setUser(data.user);
        await StorageService.setToken(data.tokens.accessToken);
        await StorageService.setUserCache(data.user);
        return { success: true };
      }

      const data = await res.json().catch(() => ({}));
      return { success: false, message: data.message || 'Registration failed.' };
    } catch {
      // Cloud unreachable or 503: Create local profile instantly
      const offlineUser = createLocalProfile(
        payload.email,
        payload.displayName || payload.username || 'Learner',
        payload.username || 'learner'
      );
      if (payload.targetLanguage) offlineUser.targetLanguage = payload.targetLanguage;
      if (payload.learningLevel) offlineUser.learningLevel = payload.learningLevel;

      const offlineToken = 'local-offline-token';
      setToken(offlineToken);
      setUser(offlineUser);
      await StorageService.setToken(offlineToken);
      await StorageService.setUserCache(offlineUser);
      return { success: true };
    }
  };

  const logout = async () => {
    await StorageService.clearAll();
    setToken(null);
    setUser(null);
  };

  const completeOnboarding = async (data: any) => {
    if (user) {
      const updatedUser: UserProfile = {
        ...user,
        targetLanguage: data.targetLanguage || user.targetLanguage,
        learningLevel: data.learningLevel || user.learningLevel,
        hasCompletedOnboarding: true,
        preferences: {
          ...user.preferences,
          dailyGoalMinutes: data.dailyGoalMinutes || user.preferences.dailyGoalMinutes,
          reminderTime: data.reminderTime || user.preferences.reminderTime,
        },
      };
      setUser(updatedUser);
      await StorageService.setUserCache(updatedUser);
    }

    if (token && !token.startsWith('local-')) {
      try {
        await fetch(ENDPOINTS.ONBOARDING, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
      } catch {}
    }
  };

  const refreshUser = async () => {
    if (!token || token.startsWith('local-')) return;
    try {
      const res = await fetch(ENDPOINTS.PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        await StorageService.setUserCache(data.user);
      }
    } catch {}
  };

  const deleteAccount = async () => {
    if (token && !token.startsWith('local-')) {
      try {
        await fetch(ENDPOINTS.DELETE_ACCOUNT, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {}
    }
    await logout();
  };

  const updateUserLocally = (updater: (prev: UserProfile | null) => UserProfile | null) => {
    setUser((prev) => {
      const next = updater(prev);
      if (next) {
        StorageService.setUserCache(next).catch(() => {});
      }
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
        continueAsGuest,
        completeOnboarding,
        refreshUser,
        deleteAccount,
        updateUserLocally,
        syncHearts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
