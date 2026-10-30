import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Heart, Target, Sparkles, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../src/constants/theme';
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

  // Interactive Practice Session Mode (BUG-007 Fix)
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [revealedSolution, setRevealedSolution] = useState(false);

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
      console.error('[PracticeScreen] Load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMistakes();
  }, [token]);

  const handleStartPracticeDrill = () => {
    if (mistakes.length === 0) return;
    HapticsService.mediumTap();
    setIsPracticing(true);
    setPracticeIndex(0);
    setRevealedSolution(false);
    setStatusMessage('');
  };

  const handleNextPracticeCard = async () => {
    HapticsService.lightTap();

    if (practiceIndex + 1 < mistakes.length) {
      setPracticeIndex(practiceIndex + 1);
      setRevealedSolution(false);
    } else {
      // Completed all mistake cards! Finalize on backend and recover hearts
      setCompleting(true);
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
        setStatusMessage(data.message || 'Practice complete! Recovered +1 Heart.');
        await refreshUser();
        setMistakes([]);
      } catch (e) {
        console.error('[PracticeScreen] Complete error:', e);
      } finally {
        setCompleting(false);
        setIsPracticing(false);
      }
    }
  };

  const currentMistake = mistakes[practiceIndex];

  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerTitleContainer}>
          <Target size={26} color={COLORS.primary} />
          <Text style={styles.headerTitle}>Practice Hub</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Reinforce weak areas, review previous mistakes, and refill your hearts without waiting for the timer.
        </Text>

        {statusMessage ? (
          <View style={styles.successBanner}>
            <CheckCircle2 size={20} color={COLORS.primaryDark} strokeWidth={3} />
            <Text style={styles.successText}>{statusMessage}</Text>
          </View>
        ) : null}

        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} style={{ marginTop: 24 }} />
        ) : isPracticing && currentMistake ? (
          /* Active Interactive Practice Flashcard Session */
          <View style={styles.drillContainer}>
            <View style={styles.drillHeader}>
              <Text style={styles.drillStepText}>
                Mistake {practiceIndex + 1} of {mistakes.length}
              </Text>
              <Pressable
                onPress={() => setIsPracticing(false)}
                style={styles.drillCancelBtn}
              >
                <Text style={styles.drillCancelText}>Exit</Text>
              </Pressable>
            </View>

            {/* Drill Card */}
            <View style={styles.drillCard}>
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{currentMistake.type}</Text>
              </View>

              <Text style={styles.drillPrompt}>{currentMistake.prompt}</Text>

              {currentMistake.hint ? (
                <View style={styles.hintBox}>
                  <Text style={styles.hintLabel}>Hint:</Text>
                  <Text style={styles.hintText}>{currentMistake.hint}</Text>
                </View>
              ) : null}

              {revealedSolution ? (
                <View style={styles.solutionBox}>
                  <Text style={styles.solutionLabel}>Correct Pattern:</Text>
                  <Text style={styles.solutionText}>
                    {currentMistake.solution || currentMistake.hint || 'Review complete'}
                  </Text>
                </View>
              ) : (
                <Button3D
                  title="Reveal Solution"
                  variant="outline"
                  onPress={() => {
                    HapticsService.lightTap();
                    setRevealedSolution(true);
                  }}
                  style={{ width: '100%', marginTop: 20 }}
                />
              )}
            </View>

            {revealedSolution ? (
              <Button3D
                title={practiceIndex + 1 < mistakes.length ? 'Next Mistake' : 'Finish & Refill Heart'}
                variant="primary"
                onPress={handleNextPracticeCard}
                loading={completing}
                style={{ width: '100%', marginTop: 16 }}
              />
            ) : null}
          </View>
        ) : mistakes.length > 0 ? (
          /* Mistake List Review Overview */
          <View style={styles.mistakesSection}>
            <View style={styles.heartBanner}>
              <Heart size={34} color={COLORS.accent} fill={COLORS.accent} />
              <View style={{ flex: 1 }}>
                <Text style={styles.heartBannerTitle}>Refill Your Hearts</Text>
                <Text style={styles.heartBannerDesc}>
                  Practice your {mistakes.length} previous mistakes to earn +1 Heart and +10 XP.
                </Text>
              </View>
            </View>

            <View style={styles.mistakesList}>
              {mistakes.map((item, idx) => (
                <View key={item.id || idx} style={styles.mistakeCard}>
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
              title={`Start Practice Drill (${mistakes.length} mistakes)`}
              onPress={handleStartPracticeDrill}
              style={{ marginTop: 20 }}
            />
          </View>
        ) : (
          /* All Mistakes Cleaned State */
          <View style={styles.emptyContainer}>
            <MascotPip
              mood="happy"
              size={120}
              message="Your memory is sharp! No mistakes to review right now."
            />
            <View style={styles.perfectCard}>
              <Sparkles size={30} color={COLORS.gold} />
              <Text style={styles.perfectTitle}>All Clean!</Text>
              <Text style={styles.perfectDesc}>
                You have mastered all previously attempted exercises. You're ready to tackle new lessons!
              </Text>
            </View>

            <Button3D
              title="Continue Learning Path"
              variant="primary"
              onPress={() => {
                HapticsService.lightTap();
                // navigate to learning path
              }}
              style={{ width: '100%', marginTop: 24 }}
            />
          </View>
        )}
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.xxl,
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
    backgroundColor: COLORS.primarySubtle,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    marginBottom: 16,
  },
  successText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primaryDark,
    flex: 1,
  },
  mistakesSection: {
    gap: 14,
  },
  heartBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 18,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.accentSubtle,
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
    color: COLORS.slate,
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
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADII.xs,
    backgroundColor: COLORS.secondarySubtle,
    marginBottom: 8,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondaryDark,
    textTransform: 'uppercase',
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
  drillContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: RADII.xl,
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
  },
  drillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  drillStepText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  drillCancelBtn: {
    padding: 4,
  },
  drillCancelText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.grayText,
  },
  drillCard: {
    padding: 20,
    borderRadius: RADII.lg,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
  },
  drillPrompt: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.charcoal,
    lineHeight: 26,
    marginBottom: 12,
  },
  hintBox: {
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: RADII.md,
    marginTop: 8,
  },
  hintLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
    textTransform: 'uppercase',
  },
  hintText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#B45309',
    marginTop: 2,
  },
  solutionBox: {
    backgroundColor: COLORS.primarySubtle,
    padding: 14,
    borderRadius: RADII.md,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    marginTop: 16,
  },
  solutionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primaryDark,
    textTransform: 'uppercase',
  },
  solutionText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDark,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  perfectCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.goldSubtle,
    borderWidth: 2,
    borderColor: '#FDE68A',
    width: '100%',
    marginTop: 16,
  },
  perfectTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#92400E',
    marginTop: 8,
  },
  perfectDesc: {
    fontSize: 13,
    color: '#B45309',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
});
