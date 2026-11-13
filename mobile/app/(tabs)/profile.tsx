import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Flame, Diamond, Award, Settings, LogOut, Trash2, Globe, CheckCircle2, Heart, Volume2, Smartphone, Bell, Sparkles } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY, LAYOUT } from '../../src/constants/theme';
import { HeaderBar } from '../../src/components/HeaderBar';
import { Button3D } from '../../src/components/Button3D';
import { CharacterView } from '../../src/components/character/CharacterView';
import {
  CharacterId,
  CHARACTER_PROFILES,
  getCharacterQuote,
} from '../../src/components/character/Character3DRegistry';
import { SoundService } from '../../src/services/soundService';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';
import { HapticsService } from '../../src/services/hapticsService';
import { CurriculumService } from '../../src/services/curriculumService';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, token, logout, deleteAccount, updateUserLocally } = useAuth();

  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanion, setSelectedCompanion] = useState<CharacterId>('maya');

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
        {/* 3D Character Showcase & Companion Inspector */}
        <View style={styles.profileHeader}>
          <CharacterView
            character={selectedCompanion}
            mood="idle"
            size={145}
            roundMask={false}
            showStage={true}
            environmentType="auto"
            interactive={true}
            message={getCharacterQuote(selectedCompanion, 'intro')}
            messagePosition="top"
          />
          <Text style={styles.displayName}>{user?.displayName || 'Learner'}</Text>
          <Text style={styles.usernameText}>@{user?.username || 'learner'}</Text>

          {/* Active 3D Companion Badge */}
          <View style={[styles.companionRoleBadge, { borderColor: CHARACTER_PROFILES[selectedCompanion].pedestalBorder }]}>
            <Sparkles size={14} color={CHARACTER_PROFILES[selectedCompanion].accentColor} />
            <Text style={[styles.companionRoleText, { color: CHARACTER_PROFILES[selectedCompanion].accentColor }]}>
              {CHARACTER_PROFILES[selectedCompanion].name} • {CHARACTER_PROFILES[selectedCompanion].title}
            </Text>
          </View>

          {/* Interactive 3D Companion Switcher */}
          <View style={styles.companionPickerRow}>
            {(['maya', 'leo', 'elena', 'kael', 'pip'] as CharacterId[]).map((cid) => {
              const p = CHARACTER_PROFILES[cid];
              const isSelected = selectedCompanion === cid;
              return (
                <Pressable
                  key={cid}
                  onPress={() => {
                    HapticsService.lightTap();
                    setSelectedCompanion(cid);
                    const quote = getCharacterQuote(cid, 'intro');
                    SoundService.speak(quote).catch(() => {});
                  }}
                  style={[
                    styles.companionChip,
                    isSelected && {
                      borderColor: p.accentColor,
                      backgroundColor: '#FFFFFF',
                      shadowColor: p.accentColor,
                      shadowOpacity: 0.25,
                      elevation: 4,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.companionChipText,
                      isSelected && { color: p.accentColor, fontWeight: '900' },
                    ]}
                  >
                    {p.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.langPill}>
            <Globe size={14} color={COLORS.secondaryDark} />
            <Text style={styles.langPillText}>Learning {targetLang}</Text>
          </View>
        </View>

        {/* Stats Grid - 4 core metrics */}
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

          <View style={styles.statBox}>
            <Heart size={24} color={COLORS.accent} fill={COLORS.accent} />
            <Text style={styles.statValue}>{user?.hearts ?? 100}/{user?.maxHearts ?? 100}</Text>
            <Text style={styles.statLabel}>Hearts</Text>
          </View>

          <View style={styles.statBox}>
            <Award size={24} color={COLORS.purple} />
            <Text style={styles.statValue}>{user?.longestStreak || user?.currentStreak || 0}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
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
            <View style={styles.prefLeft}>
              <View style={[styles.prefIconCircle, { backgroundColor: '#DCFCE7' }]}>
                <Volume2 size={18} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.preferenceText}>Sound Effects</Text>
                <Text style={styles.preferenceSub}>Instant audio cues & celebratory chimes</Text>
              </View>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={(val) => handleTogglePreference('soundEffects', val)}
              trackColor={{ true: COLORS.primary, false: '#CBD5E1' }}
            />
          </View>

          <View style={styles.preferenceRow}>
            <View style={styles.prefLeft}>
              <View style={[styles.prefIconCircle, { backgroundColor: '#E0F2FE' }]}>
                <Smartphone size={18} color={COLORS.secondary} />
              </View>
              <View>
                <Text style={styles.preferenceText}>Haptic Feedback</Text>
                <Text style={styles.preferenceSub}>Tactile feedback on taps & answers</Text>
              </View>
            </View>
            <Switch
              value={hapticsEnabled}
              onValueChange={(val) => handleTogglePreference('hapticFeedback', val)}
              trackColor={{ true: COLORS.primary, false: '#CBD5E1' }}
            />
          </View>

          <View style={styles.preferenceRow}>
            <View style={styles.prefLeft}>
              <View style={[styles.prefIconCircle, { backgroundColor: '#FEF3C7' }]}>
                <Bell size={18} color={COLORS.gold} />
              </View>
              <View>
                <Text style={styles.preferenceText}>Daily Reminders</Text>
                <Text style={styles.preferenceSub}>Friendly nudge to protect your streak</Text>
              </View>
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
            fullWidth
            onPress={handleLogout}
            icon={<LogOut size={18} color={COLORS.charcoal} />}
          />

          <Button3D
            title="Delete Account"
            variant="accent"
            fullWidth
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
    padding: LAYOUT.screenPadding,
    paddingBottom: 80,
    maxWidth: LAYOUT.maxWidth,
    width: '100%',
    alignSelf: 'center',
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
  companionRoleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADII.pill,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderBottomWidth: 3,
    marginTop: 8,
  },
  companionRoleText: {
    fontSize: 12,
    fontWeight: '800',
  },
  companionPickerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    maxWidth: 380,
  },
  companionChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADII.pill,
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
  },
  companionChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginVertical: 16,
  },
  statBox: {
    flexBasis: '47%',
    flexGrow: 1,
    padding: 14,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: COLORS.grayBorderDark,
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
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: COLORS.grayBorderDark,
  },
  achievementCardUnlocked: {
    backgroundColor: COLORS.purpleSubtle,
    borderColor: '#DDD6FE',
    borderBottomColor: '#C4B5FD',
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceAlt,
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
    backgroundColor: COLORS.surfaceAlt,
    marginLeft: 8,
  },
  achRewardText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  preferencesCard: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: COLORS.grayBorderDark,
    borderRadius: RADII.xl,
    padding: 16,
    gap: 16,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prefLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginRight: 10,
  },
  prefIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
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
