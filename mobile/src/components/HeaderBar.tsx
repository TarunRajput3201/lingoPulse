import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Modal } from 'react-native';
import { Flame, Diamond, Heart, Plus, ChevronDown, Clock, X, Sparkles } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { HapticsService } from '../services/hapticsService';

export const HeaderBar: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [showHeartsModal, setShowHeartsModal] = useState(false);

  const streak = user?.currentStreak || 0;
  const xp = user?.totalXp || 0;
  const hearts = user?.hearts ?? 100;
  const maxHearts = user?.maxHearts ?? 100;
  const nextHeartInSeconds = user?.nextHeartInSeconds ?? 0;
  const targetLang = user?.targetLanguage?.toLowerCase();

  const formatCountdown = (secs: number) => {
    if (secs <= 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getFlagEmoji = () => {
    switch (targetLang) {
      case 'en': return '🇬🇧';
      case 'fr': return '🇫🇷';
      case 'ja': return '🇯🇵';
      case 'de': return '🇩🇪';
      case 'ko': return '🇰🇷';
      case 'it': return '🇮🇹';
      case 'zh': return '🇨🇳';
      case 'pt': return '🇧🇷';
      case 'hi': return '🇮🇳';
      case 'ar': return '🇸🇦';
      case 'ru': return '🇷🇺';
      case 'nl': return '🇳🇱';
      case 'tr': return '🇹🇷';
      case 'sv': return '🇸🇪';
      case 'es':
      default:
        return '🇪🇸';
    }
  };

  const handleLanguagePress = () => {
    HapticsService.lightTap();
    router.push('/(tabs)/courses');
  };

  const handleHeartPress = () => {
    HapticsService.lightTap();
    setShowHeartsModal(true);
  };

  const handlePracticeFromModal = () => {
    setShowHeartsModal(false);
    HapticsService.lightTap();
    router.push('/(tabs)/practice');
  };

  return (
    <>
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

          {/* Hearts Pill (Max 100 with Countdown) */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${hearts} of ${maxHearts} hearts. Tap to view regeneration details`}
            onPress={handleHeartPress}
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
            {hearts < maxHearts ? (
              <View style={styles.countdownBadge}>
                <Clock size={10} color={COLORS.accentDark} />
                <Text style={styles.countdownBadgeText}>{formatCountdown(nextHeartInSeconds)}</Text>
              </View>
            ) : null}
          </Pressable>
        </View>
      </View>

      {/* Hearts / Lives Detail Modal */}
      <Modal
        visible={showHeartsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowHeartsModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Hearts & Lives</Text>
              <Pressable
                onPress={() => setShowHeartsModal(false)}
                accessibilityRole="button"
                accessibilityLabel="Close hearts modal"
                style={styles.modalCloseButton}
              >
                <X size={20} color={COLORS.grayText} />
              </Pressable>
            </View>

            {/* Heart Big Icon and Count */}
            <View style={styles.modalHeartStage}>
              <Heart size={54} color={COLORS.accent} fill={COLORS.accent} />
              <Text style={styles.modalHeartCountText}>
                {hearts} <Text style={styles.modalHeartMaxText}>/ {maxHearts}</Text>
              </Text>
            </View>

            {/* Visual Health Gauge */}
            <View style={styles.heartGaugeTrack}>
              <View
                style={[
                  styles.heartGaugeFill,
                  { width: `${Math.min(100, Math.max(4, (hearts / maxHearts) * 100))}%` },
                ]}
              />
            </View>

            {/* Regeneration Status Card */}
            <View style={styles.regenInfoBox}>
              {hearts < maxHearts ? (
                <>
                  <View style={styles.regenTimerRow}>
                    <Clock size={18} color={COLORS.accent} />
                    <Text style={styles.regenTimerText}>
                      Next heart in <Text style={styles.regenTimerHighlight}>{formatCountdown(nextHeartInSeconds)}</Text>
                    </Text>
                  </View>
                  <Text style={styles.regenDescription}>
                    Hearts automatically regenerate <Text style={{ fontWeight: '800' }}>1 heart every 10 minutes</Text> up to the maximum of 100 hearts.
                  </Text>
                </>
              ) : (
                <View style={styles.fullHeartsRow}>
                  <Sparkles size={18} color={COLORS.gold} />
                  <Text style={styles.fullHeartsText}>Your hearts are completely full! (100 / 100)</Text>
                </View>
              )}
            </View>

            {/* Practice Button */}
            <Pressable
              onPress={handlePracticeFromModal}
              style={styles.modalPracticeButton}
              accessibilityRole="button"
              accessibilityLabel="Practice to earn hearts"
            >
              <Text style={styles.modalPracticeButtonText}>Practice Review Drill →</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
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
  countdownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: '#FFE4E6',
    marginLeft: 2,
  },
  countdownBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accentDark,
  },
  // Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.charcoal,
  },
  modalCloseButton: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: COLORS.grayBackground,
  },
  modalHeartStage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 12,
  },
  modalHeartCountText: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.accentDark,
  },
  modalHeartMaxText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.grayText,
  },
  heartGaugeTrack: {
    height: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  heartGaugeFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 6,
  },
  regenInfoBox: {
    backgroundColor: '#FFF1F2',
    borderRadius: 16,
    padding: 14,
    marginVertical: 12,
    borderWidth: 1.5,
    borderColor: '#FFE4E6',
  },
  regenTimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  regenTimerText: {
    fontSize: 14,
    color: COLORS.charcoal,
    fontWeight: '700',
  },
  regenTimerHighlight: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.accentDark,
  },
  regenDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.grayText,
  },
  fullHeartsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fullHeartsText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#059669',
  },
  modalPracticeButton: {
    marginTop: 12,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: COLORS.primaryDark,
  },
  modalPracticeButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
  },
});
