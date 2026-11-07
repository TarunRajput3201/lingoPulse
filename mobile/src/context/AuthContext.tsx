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
  isGuest?: boolean;
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
  lastHeartRefillAt?: string;
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

const createLocalProfile = (email: string, displayName: string, username: string, isGuest = false): UserProfile => ({
  id: isGuest ? `guest_${Date.now()}` : `user_local_${Date.now()}`,
  email: email || (isGuest ? 'guest@lingopulse.local' : 'learner@lingopulse.local'),
  username: username || (isGuest ? 'guest' : 'learner'),
  displayName: displayName || (isGuest ? 'Guest Learner' : 'Learner'),
  avatarUrl: '',
  role: isGuest ? 'guest' : 'learner',
  isGuest,
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
  hearts: isGuest ? 10 : 100,
  maxHearts: isGuest ? 10 : 100,
  nextHeartInSeconds: 0,
  lastHeartRefillAt: new Date().toISOString(),
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
        const isGuest = savedUser.role === 'guest' || Boolean(savedUser.isGuest);
        if (!isGuest) {
          // Calculate accumulated hearts from real elapsed time using savedUser.lastHeartRefillAt:
          const now = Date.now();
          let hearts = typeof savedUser.hearts === 'number' ? savedUser.hearts : 100;
          const lastRefillTime = savedUser.lastHeartRefillAt ? new Date(savedUser.lastHeartRefillAt).getTime() : now;
          const elapsedMs = Math.max(0, now - lastRefillTime);
          const REFILL_MS = 10 * 60 * 1000;

          if (hearts >= 100) {
            savedUser.hearts = 100;
            savedUser.maxHearts = 100;
            savedUser.nextHeartInSeconds = 0;
          } else {
            const regenerated = Math.floor(elapsedMs / REFILL_MS);
            if (regenerated > 0) {
              const newHearts = Math.min(100, hearts + regenerated);
              savedUser.hearts = newHearts;
              savedUser.maxHearts = 100;
              if (newHearts >= 100) {
                savedUser.lastHeartRefillAt = new Date(now).toISOString();
                savedUser.nextHeartInSeconds = 0;
              } else {
                const remainderMs = elapsedMs % REFILL_MS;
                savedUser.lastHeartRefillAt = new Date(now - remainderMs).toISOString();
                savedUser.nextHeartInSeconds = Math.max(0, Math.ceil((REFILL_MS - remainderMs) / 1000));
              }
            } else {
              savedUser.maxHearts = 100;
              savedUser.nextHeartInSeconds = Math.max(0, Math.ceil((REFILL_MS - elapsedMs) / 1000));
            }
          }
        } else {
          // Guest user: strictly capped at 10, no regeneration, zero countdown
          savedUser.hearts = Math.min(10, Math.max(0, savedUser.hearts ?? 10));
          savedUser.maxHearts = 10;
          savedUser.nextHeartInSeconds = 0;
        }

        setUser(savedUser);
        setToken(savedToken || (savedUser.isGuest ? 'local-guest-token' : 'local-token'));
        await StorageService.setUserCache(savedUser);
      } else if (savedToken && !savedToken.startsWith('local-guest')) {
        setToken(savedToken);
        const fallbackProfile = createLocalProfile('learner@lingopulse.local', 'Learner', 'learner', false);
        setUser(fallbackProfile);
      } else {
        // Fresh install guest: 10 hearts
        const guestProfile = createLocalProfile('guest@lingopulse.local', 'Guest Learner', 'guest', true);
        setUser(guestProfile);
        setToken('local-guest-token');
        await StorageService.setUserCache(guestProfile);
      }

      // Transition immediately - zero wait time!
      setIsLoading(false);

      // Non-blocking background remote sync (2s timeout, never hangs UI)
      if (savedToken && !savedToken.startsWith('local-')) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

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
      const savedToken = await StorageService.getToken();
      if (savedToken && !savedToken.startsWith('local-')) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const res = await fetch(ENDPOINTS.HEARTS, {
          headers: { Authorization: `Bearer ${savedToken}` },
          signal: controller.signal,
        }).catch(() => null);
        clearTimeout(timeoutId);

        if (res && res.ok) {
          const data = await res.json();
          setUser((prev) => {
            if (!prev) return null;
            const updated = {
              ...prev,
              hearts: data.hearts,
              maxHearts: data.maxHearts || (prev.isGuest ? 10 : 100),
              nextHeartInSeconds: data.nextHeartInSeconds ?? 0,
              lastHeartRefillAt: data.lastHeartRefillAt || prev.lastHeartRefillAt,
            };
            StorageService.setUserCache(updated).catch(() => {});
            return updated;
          });
          return;
        }
      }

      const status = await CurriculumService.getHeartsStatus();
      setUser((prev) => {
        if (!prev) return null;
        const updated = {
          ...prev,
          hearts: status.hearts,
          maxHearts: status.maxHearts,
          nextHeartInSeconds: status.nextHeartInSeconds,
          lastHeartRefillAt: status.lastHeartRefillAt || prev.lastHeartRefillAt,
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
        // Guests never regenerate hearts!
        if (prev.role === 'guest' || prev.isGuest) {
          if (prev.nextHeartInSeconds !== 0) {
            return { ...prev, nextHeartInSeconds: 0 };
          }
          return prev;
        }

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
            maxHearts: 100,
            nextHeartInSeconds: newHearts >= 100 ? 0 : 600,
            lastHeartRefillAt: new Date().toISOString(),
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
    try {
      const deviceId = await StorageService.getDeviceId();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(ENDPOINTS.GUEST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.tokens.accessToken);
        await StorageService.setToken(data.tokens.accessToken);
        await StorageService.setUserCache(data.user);
        return;
      }
    } catch {}

    const guestUser = createLocalProfile('guest@lingopulse.local', 'Guest Learner', 'guest', true);
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
        isAuthenticated: !!user && !!token && user.role !== 'guest' && !user.isGuest && !token.startsWith('local-guest'),
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
