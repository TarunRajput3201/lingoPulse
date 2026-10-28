import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Heart, Target, Sparkles, CheckCircle2 } from 'lucide-react-native';
import { COLORS, RADII } from '../../src/constants/theme';
import { HeaderBar } from '../../src/components/HeaderBar';
import { Button3D } from '../../src/components/Button3D';
import { MascotPip } from '../../src/components/MascotPip';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';
import { SoundService } from '../../src/services/soundService';
import { HapticsService } from '../../src/services/hapticsService';

export default function PracticeScreen() {
  const { user, token, refreshUser } = useAuth();
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const loadMistakes = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(ENDPOINTS.PRACTICE_MISTAKES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMistakes(data.practiceItems || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMistakes();
  }, [token]);

  const handleStartPractice = async () => {
    if (!token) return;
    setCompleting(true);
    HapticsService.lightTap();

    try {
      const resolvedIds = mistakes.map((m) => m.id);
      const res = await fetch(ENDPOINTS.COMPLETE_PRACTICE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resolvedExerciseIds: resolvedIds }),
      });
      const data = await res.json();

      SoundService.playSuccessChime();
      HapticsService.success();
      setStatusMessage(data.message || 'Practice complete! Recovered 1 Heart.');
      await refreshUser();
      setMistakes([]);
    } catch (e) {
      console.error(e);
    } finally {
      setCompleting(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerTitleContainer}>
          <Target size={24} color={COLORS.accent} />
          <Text style={styles.headerTitle}>Practice & Review</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Review your mistakes to reinforce memory and recover hearts without waiting for the timer.
        </Text>

        {statusMessage ? (
          <View style={styles.successBanner}>
            <CheckCircle2 size={20} color={COLORS.primaryDark} />
            <Text style={styles.successText}>{statusMessage}</Text>
          </View>
        ) : null}

        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} style={{ marginTop: 24 }} />
        ) : mistakes.length > 0 ? (
          <View style={styles.mistakesSection}>
            <View style={styles.heartBanner}>
              <Heart size={32} color={COLORS.accent} fill={COLORS.accent} />
              <View style={{ flex: 1 }}>
                <Text style={styles.heartBannerTitle}>Refill Your Hearts</Text>
                <Text style={styles.heartBannerDesc}>
                  Practice your {mistakes.length} previous mistakes to earn +1 Heart and +10 XP.
                </Text>
              </View>
            </View>

            <View style={styles.mistakesList}>
              {mistakes.map((item, idx) => (
                <View key={item.id} style={styles.mistakeCard}>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeBadgeText}>{item.type}</Text>
                  </View>
                  <Text style={styles.mistakePrompt}>{item.prompt}</Text>
                  {item.hint ? (
                    <Text style={styles.mistakeHint}>Hint: {item.hint}</Text>
                  ) : null}
                </View>
              ))}
            </View>

            <Button3D
              title={completing ? 'Completing...' : 'Practice Now (+1 Heart)'}
              onPress={handleStartPractice}
              disabled={completing}
              style={{ marginTop: 16 }}
            />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <MascotPip
              mood="happy"
              size={120}
              message="Your memory is sharp! No mistakes to review right now."
            />
            <View style={styles.perfectCard}>
              <Sparkles size={28} color={COLORS.gold} />
              <Text style={styles.perfectTitle}>All Clean!</Text>
              <Text style={styles.perfectDesc}>
                You have mastered all previously attempted exercises. Keep exploring new lessons on your learning path!
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.charcoal,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.grayText,
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 20,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: RADII.lg,
    backgroundColor: '#DCFCE7',
    borderWidth: 1.5,
    borderColor: COLORS.primaryDark,
    marginBottom: 16,
  },
  successText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primaryDark,
    flex: 1,
  },
  mistakesSection: {
    gap: 12,
  },
  heartBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 18,
    borderRadius: RADII.xl,
    backgroundColor: '#FFF1F2',
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: '#FECDD3',
  },
  heartBannerTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.accentDark,
  },
  heartBannerDesc: {
    fontSize: 13,
    color: COLORS.charcoal,
    marginTop: 2,
    lineHeight: 18,
  },
  mistakesList: {
    gap: 10,
    marginTop: 8,
  },
  mistakeCard: {
    padding: 16,
    borderRadius: RADII.lg,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#E0F2FE',
    marginBottom: 6,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondaryDark,
  },
  mistakePrompt: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  mistakeHint: {
    fontSize: 12,
    color: COLORS.grayText,
    marginTop: 4,
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  perfectCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: RADII.xl,
    backgroundColor: '#FFFBEB',
    borderWidth: 2,
    borderColor: '#FDE68A',
    width: '100%',
    marginTop: 16,
  },
  perfectTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#B45309',
    marginTop: 8,
  },
  perfectDesc: {
    fontSize: 13,
    color: '#92400E',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
});
