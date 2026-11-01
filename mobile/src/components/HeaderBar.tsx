import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Flame, Diamond, Heart, Plus, ChevronDown } from 'lucide-react-native';
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
        <ChevronDown size={14} color={COLORS.grayText} strokeWidth={2.5} style={{ marginLeft: 4 }} />
      </Pressable>

      {/* Stats Pills Row */}
      <View style={styles.statsRow}>
        {/* Streak Pill */}
        <View
          style={[
            styles.statPill,
            streak > 0 ? styles.streakPillActive : styles.statPillInactive,
          ]}
          accessibilityLabel={`${streak} day streak`}
        >
          <Flame
            size={18}
            color={streak > 0 ? COLORS.orange : COLORS.grayLight}
            fill={streak > 0 ? COLORS.orange : 'transparent'}
          />
          <Text
            style={[
              styles.statText,
              { color: streak > 0 ? COLORS.orange : COLORS.grayLight },
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
            size={16}
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
          <Text
            style={[
              styles.statText,
              { color: hearts > 0 ? COLORS.accentDark : COLORS.grayLight },
            ]}
          >
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
    borderBottomWidth: 2,
    borderBottomColor: COLORS.grayBorder,
  },
  flagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADII.pill,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.grayBorderDark,
  },
  flagText: {
    fontSize: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADII.pill,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.grayBorderDark,
    gap: 5,
  },
  streakPillActive: {
    borderColor: '#FFEACC',
    borderBottomColor: '#FFD699',
    backgroundColor: '#FFFDF9',
  },
  statPillInactive: {
    borderColor: COLORS.grayBorder,
  },
  xpPill: {
    borderColor: COLORS.secondaryLight,
    borderBottomColor: '#BAE6FD',
    backgroundColor: COLORS.secondarySubtle,
  },
  heartPill: {
    borderColor: COLORS.accentLight,
    borderBottomColor: '#FECACA',
    backgroundColor: COLORS.accentSubtle,
  },
  statText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: '800',
  },
  plusBadge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
  },
});
