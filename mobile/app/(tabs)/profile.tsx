import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Flame, Diamond, Award, Settings, LogOut, Trash2, Globe, CheckCircle2 } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../src/constants/theme';
import { HeaderBar } from '../../src/components/HeaderBar';
import { Button3D } from '../../src/components/Button3D';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';
import { HapticsService } from '../../src/services/hapticsService';
import { CurriculumService } from '../../src/services/curriculumService';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, token, logout, deleteAccount, updateUserLocally } = useAuth();

  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Preference switches initialized from user profile (BUG-008 Fix)
  const [soundEnabled, setSoundEnabled] = useState(user?.preferences?.soundEffects ?? true);
  const [hapticsEnabled, setHapticsEnabled] = useState(user?.preferences?.hapticFeedback ?? true);
  const [remindersEnabled, setRemindersEnabled] = useState(user?.preferences?.dailyReminder ?? true);

  useEffect(() => {
    if (user?.preferences) {
      setSoundEnabled(user.preferences.soundEffects ?? true);
      setHapticsEnabled(user.preferences.hapticFeedback ?? true);
      setRemindersEnabled(user.preferences.dailyReminder ?? true);
    }
  }, [user]);

  useEffect(() => {
    // 1. Instant load from static achievements
    setAchievements(CurriculumService.getAchievements());
    setLoading(false);

    // 2. Optional remote fetch
    if (token && !token.startsWith('local-')) {
      fetch(ENDPOINTS.ACHIEVEMENTS, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.achievements?.length) {
            setAchievements(data.achievements);
          }
        })
        .catch(() => {});
    }
  }, [token]);


  // Persistent preference updater
  const handleTogglePreference = async (key: 'soundEffects' | 'hapticFeedback' | 'dailyReminder', value: boolean) => {
    if (key === 'soundEffects') setSoundEnabled(value);
    if (key === 'hapticFeedback') setHapticsEnabled(value);
    if (key === 'dailyReminder') setRemindersEnabled(value);

    HapticsService.lightTap();

    // Update locally in context
    updateUserLocally((prev) =>
      prev
        ? {
            ...prev,
            preferences: {
              ...prev.preferences,
              [key]: value,
            },
          }
        : null
    );

    // Persist to cloud backend
    if (token) {
      try {
        await fetch(ENDPOINTS.PROFILE, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            preferences: {
              soundEffects: key === 'soundEffects' ? value : soundEnabled,
              hapticFeedback: key === 'hapticFeedback' ? value : hapticsEnabled,
              dailyReminder: key === 'dailyReminder' ? value : remindersEnabled,
            },
          }),
        });
      } catch (e) {
        console.warn('[ProfileScreen] Failed to sync preference:', e);
      }
    }
  };

  const handleLogout = async () => {
    HapticsService.mediumTap();
    await logout();
    router.replace('/(auth)/login');
  };

  const handleDeleteAccount = () => {
    HapticsService.error();
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account and all learning records? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Forever',
          style: 'destructive',
          onPress: async () => {
            await deleteAccount();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const targetLang = user?.targetLanguage?.toUpperCase() || 'ES';

  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Hero Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarInitial}>
              {(user?.displayName || 'L')[0].toUpperCase()}
            </Text>
          </View>
          <Text style={styles.displayName}>{user?.displayName || 'Learner'}</Text>
          <Text style={styles.usernameText}>@{user?.username || 'learner'}</Text>

          <View style={styles.langPill}>
            <Globe size={14} color={COLORS.secondaryDark} />
            <Text style={styles.langPillText}>Learning {targetLang}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Flame size={24} color={COLORS.gold} fill={COLORS.gold} />
            <Text style={styles.statValue}>{user?.currentStreak || 0}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>

          <View style={styles.statBox}>
            <Diamond size={24} color={COLORS.secondary} fill={COLORS.secondary} />
            <Text style={styles.statValue}>{user?.totalXp || 0}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.sectionHeader}>
          <Award size={20} color={COLORS.purple} />
          <Text style={styles.sectionTitle}>Achievements</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} style={{ marginVertical: 20 }} />
        ) : (
          <View style={styles.achievementsList}>
            {achievements.map((ach) => {
              const maxProg = ach.maxProgress || 1;
              const percent = Math.min(100, Math.round(((ach.progress || 0) / maxProg) * 100));

              return (
                <View
                  key={ach.id}
                  style={[
                    styles.achievementCard,
                    ach.isUnlocked && styles.achievementCardUnlocked,
                  ]}
                >
                  <View
                    style={[
                      styles.achievementIcon,
                      ach.isUnlocked && styles.achievementIconUnlocked,
                    ]}
                  >
                    <Award
                      size={24}
                      color={ach.isUnlocked ? COLORS.white : '#94A3B8'}
                    />
                  </View>

                  <View style={styles.achievementInfo}>
                    <Text style={styles.achTitle}>{ach.title}</Text>
                    <Text style={styles.achDesc}>{ach.description}</Text>

                    {/* Progress Bar */}
                    <View style={styles.achProgressBarBg}>
                      <View
                        style={[
                          styles.achProgressBarFill,
                          { width: `${percent}%` },
                          ach.isUnlocked && { backgroundColor: COLORS.purple },
                        ]}
                      />
                    </View>
                  </View>

                  <View style={styles.achRewardBadge}>
                    <Text style={styles.achRewardText}>+{ach.xpReward} XP</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Settings & Preferences */}
        <View style={[styles.sectionHeader, { marginTop: 28 }]}>
          <Settings size={20} color={COLORS.charcoal} />
          <Text style={styles.sectionTitle}>App Preferences</Text>
        </View>

        <View style={styles.preferencesCard}>
          <View style={styles.preferenceRow}>
            <View>
              <Text style={styles.preferenceText}>Sound Effects</Text>
              <Text style={styles.preferenceSub}>Chimes and audio cues during lessons</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={(val) => handleTogglePreference('soundEffects', val)}
              trackColor={{ true: COLORS.primary, false: '#CBD5E1' }}
            />
          </View>

          <View style={styles.preferenceRow}>
            <View>
              <Text style={styles.preferenceText}>Haptic Feedback</Text>
              <Text style={styles.preferenceSub}>Vibrations on taps and answers</Text>
            </View>
            <Switch
              value={hapticsEnabled}
              onValueChange={(val) => handleTogglePreference('hapticFeedback', val)}
              trackColor={{ true: COLORS.primary, false: '#CBD5E1' }}
            />
          </View>

          <View style={styles.preferenceRow}>
            <View>
              <Text style={styles.preferenceText}>Daily Reminders</Text>
              <Text style={styles.preferenceSub}>Habit notifications to keep your streak</Text>
            </View>
            <Switch
              value={remindersEnabled}
              onValueChange={(val) => handleTogglePreference('dailyReminder', val)}
              trackColor={{ true: COLORS.primary, false: '#CBD5E1' }}
            />
          </View>
        </View>

        {/* Account Controls */}
        <View style={styles.accountButtons}>
          <Button3D
            title="Sign Out"
            variant="outline"
            onPress={handleLogout}
            icon={<LogOut size={18} color={COLORS.charcoal} />}
          />

          <Button3D
            title="Delete Account"
            variant="accent"
            onPress={handleDeleteAccount}
            icon={<Trash2 size={18} color={COLORS.white} />}
            style={{ marginTop: 12 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayBackground,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 16,
  },
  avatarLarge: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: COLORS.secondaryDark,
  },
  avatarInitial: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.white,
  },
  displayName: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.charcoal,
  },
  usernameText: {
    fontSize: 13,
    color: COLORS.grayText,
    fontWeight: '600',
    marginTop: 2,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADII.pill,
    backgroundColor: COLORS.secondarySubtle,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginTop: 10,
  },
  langPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.secondaryDark,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 16,
  },
  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: '#CBD5E1',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.charcoal,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.grayText,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.charcoal,
  },
  achievementsList: {
    gap: 10,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: RADII.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
  },
  achievementCardUnlocked: {
    backgroundColor: COLORS.purpleSubtle,
    borderColor: '#DDD6FE',
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementIconUnlocked: {
    backgroundColor: COLORS.purple,
  },
  achievementInfo: {
    flex: 1,
  },
  achTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  achDesc: {
    fontSize: 12,
    color: COLORS.grayText,
    marginTop: 2,
  },
  achProgressBarBg: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  achProgressBarFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 3,
  },
  achRewardBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADII.pill,
    backgroundColor: '#F1F5F9',
    marginLeft: 8,
  },
  achRewardText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  preferencesCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
    borderRadius: RADII.xl,
    padding: 16,
    gap: 16,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preferenceText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  preferenceSub: {
    fontSize: 12,
    color: COLORS.grayText,
    marginTop: 2,
  },
  accountButtons: {
    marginTop: 28,
  },
});
