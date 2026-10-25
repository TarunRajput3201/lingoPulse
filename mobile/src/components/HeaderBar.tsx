import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Flame, Diamond, Heart } from 'lucide-react-native';
import { COLORS, RADII } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export const HeaderBar: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const streak = user?.currentStreak || 0;
  const xp = user?.totalXp || 0;
  const hearts = user?.hearts ?? 5;

  return (
    <View style={styles.container}>
      {/* Target Language Flag */}
      <Pressable
        onPress={() => router.push('/(tabs)/courses')}
        style={styles.flagButton}
      >
        <Text style={styles.flagText}>
          {user?.targetLanguage === 'fr'
            ? '🇫🇷'
            : user?.targetLanguage === 'de'
            ? '🇩🇪'
            : '🇪🇸'}
        </Text>
      </Pressable>

      {/* Stats row */}
      <View style={styles.statsRow}>
        {/* Streak */}
        <View style={styles.statPill}>
          <Flame
            size={18}
            color={streak > 0 ? COLORS.gold : '#9CA3AF'}
            fill={streak > 0 ? COLORS.gold : 'transparent'}
          />
          <Text
            style={[
              styles.statText,
              { color: streak > 0 ? COLORS.goldDark : '#9CA3AF' },
            ]}
          >
            {streak}
          </Text>
        </View>

        {/* Gems / Total XP */}
        <View style={styles.statPill}>
          <Diamond
            size={18}
            color={COLORS.secondary}
            fill={COLORS.secondary}
          />
          <Text style={[styles.statText, { color: COLORS.secondaryDark }]}>
            {xp}
          </Text>
        </View>

        {/* Hearts */}
        <Pressable
          onPress={() => router.push('/(tabs)/practice')}
          style={styles.statPill}
        >
          <Heart
            size={18}
            color={COLORS.accent}
            fill={hearts > 0 ? COLORS.accent : 'transparent'}
          />
          <Text style={[styles.statText, { color: COLORS.accentDark }]}>
            {hearts}
          </Text>
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
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.grayBorder,
  },
  flagButton: {
    padding: 6,
    borderRadius: RADII.md,
    backgroundColor: '#F3F4F6',
  },
  flagText: {
    fontSize: 22,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADII.pill,
  },
  statText: {
    fontSize: 14,
    fontWeight: '800',
  },
});
