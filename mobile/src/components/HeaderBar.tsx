import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Flame, Diamond, Heart, Plus } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { HapticsService } from '../services/hapticsService';

export const HeaderBar: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const streak = user?.currentStreak || 0;
  const xp = user?.totalXp || 0;
  const hearts = user?.hearts ?? 5;
  const targetLang = user?.targetLanguage?.toLowerCase();

  const getFlagEmoji = () => {
    switch (targetLang) {
      case 'fr':
        return '🇫🇷';
      case 'de':
        return '🇩🇪';
      case 'it':
        return '🇮🇹';
      case 'ja':
        return '🇯🇵';
      case 'es':
      default:
        return '🇪🇸';
    }
  };

  const handleLanguagePress = () => {
    HapticsService.lightTap();
    router.push('/(tabs)/courses');
  };

  const handlePracticePress = () => {
    HapticsService.lightTap();
    router.push('/(tabs)/practice');
  };

  return (
    <View style={styles.container}>
      {/* Target Language Flag Selector */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Change learning language"
        onPress={handleLanguagePress}
        style={styles.flagButton}
      >
        <Text style={styles.flagText}>{getFlagEmoji()}</Text>
      </Pressable>

      {/* Stats Pills Row */}
      <View style={styles.statsRow}>
        {/* Streak Pill */}
        <View
          style={[
            styles.statPill,
            styles.streakPill,
            streak > 0 && styles.streakPillActive,
          ]}
          accessibilityLabel={`${streak} day streak`}
        >
          <Flame
            size={18}
            color={streak > 0 ? COLORS.goldDark : COLORS.grayLight}
            fill={streak > 0 ? COLORS.gold : 'transparent'}
          />
          <Text
            style={[
              styles.statText,
              { color: streak > 0 ? COLORS.goldDark : COLORS.grayLight },
            ]}
          >
            {streak}
          </Text>
        </View>

        {/* Gems / Total XP Pill */}
        <View
          style={[styles.statPill, styles.xpPill]}
          accessibilityLabel={`${xp} total XP points`}
        >
          <Diamond
            size={18}
            color={COLORS.secondary}
            fill={COLORS.secondary}
          />
          <Text style={[styles.statText, { color: COLORS.secondaryDark }]}>
            {xp}
          </Text>
        </View>

        {/* Hearts Pill with Refill Action */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${hearts} hearts remaining. Tap to practice and refill`}
          onPress={handlePracticePress}
          style={[styles.statPill, styles.heartPill]}
        >
          <Heart
            size={18}
            color={COLORS.accent}
            fill={hearts > 0 ? COLORS.accent : 'transparent'}
          />
          <Text style={[styles.statText, { color: COLORS.accentDark }]}>
            {hearts}
          </Text>
          {hearts < 5 ? (
            <View style={styles.plusBadge}>
              <Plus size={10} color={COLORS.white} strokeWidth={3} />
            </View>
          ) : null}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.grayBorder,
  },
  flagButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADII.md,
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
  },
  flagText: {
    fontSize: 22,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADII.pill,
    borderWidth: 1.5,
  },
  streakPill: {
    backgroundColor: '#F8FAFC',
    borderColor: COLORS.grayBorder,
  },
  streakPillActive: {
    backgroundColor: COLORS.goldSubtle,
    borderColor: '#FDE68A',
  },
  xpPill: {
    backgroundColor: COLORS.secondarySubtle,
    borderColor: '#BFDBFE',
  },
  heartPill: {
    backgroundColor: COLORS.accentSubtle,
    borderColor: '#FECDD3',
  },
  statText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: '800',
  },
  plusBadge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
});
