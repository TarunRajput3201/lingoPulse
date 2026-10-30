import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../src/constants/theme';
import { Button3D } from '../../src/components/Button3D';
import { MascotPip } from '../../src/components/MascotPip';
import { useAuth } from '../../src/context/AuthContext';
import { HapticsService } from '../../src/services/hapticsService';

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useAuth();

  const [step, setStep] = useState(1);
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [learningLevel, setLearningLevel] = useState('beginner');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(10);
  const [submitting, setSubmitting] = useState(false);

  const languages = [
    { code: 'es', name: 'Spanish', flag: '🇪🇸', tagline: '500M+ native speakers worldwide' },
    { code: 'fr', name: 'French', flag: '🇫🇷', tagline: 'The language of culture & diplomacy' },
    { code: 'de', name: 'German', flag: '🇩🇪', tagline: 'Europe’s powerhouse language' },
  ];

  const levels = [
    { id: 'beginner', title: 'New to the language', desc: 'Starting from scratch with the basics' },
    { id: 'elementary', title: 'Know some words', desc: 'Can introduce myself and understand basic phrases' },
    { id: 'intermediate', title: 'Intermediate learner', desc: 'Can hold casual conversations on familiar topics' },
  ];

  const goals = [
    { minutes: 5, label: 'Casual', desc: '5 min / day • Light habit' },
    { minutes: 10, label: 'Regular', desc: '10 min / day • Recommended' },
    { minutes: 15, label: 'Serious', desc: '15 min / day • Rapid progress' },
    { minutes: 20, label: 'Intense', desc: '20 min / day • Total immersion' },
  ];

  const handleNext = async () => {
    HapticsService.lightTap();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save onboarding choices to backend
      setSubmitting(true);
      try {
        await completeOnboarding({
          targetLanguage,
          learningLevel,
          dailyGoalMinutes,
        });
        HapticsService.success();
        router.replace('/(tabs)');
      } catch (e) {
        console.error('[Onboarding] Error:', e);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Top Bar */}
      <View style={[styles.header, { paddingTop: Math.max(50, insets.top + 16) }]}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(step / 3) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.stepCounterText}>Step {step} of 3</Text>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 120 }]}>
        {step === 1 && (
          <View style={styles.stepContainer}>
            <MascotPip mood="happy" size={90} message="What language do you want to master?" />
            <Text style={styles.stepTitle}>Pick a Language</Text>

            <View style={styles.cardsList}>
              {languages.map((lang) => {
                const isSelected = targetLanguage === lang.code;
                return (
                  <Pressable
                    key={lang.code}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => {
                      HapticsService.lightTap();
                      setTargetLanguage(lang.code);
                    }}
                    style={[
                      styles.choiceCard,
                      isSelected && styles.choiceCardSelected,
                    ]}
                  >
                    <Text style={styles.cardEmoji}>{lang.flag}</Text>
                    <View style={styles.cardInfo}>
                      <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                        {lang.name}
                      </Text>
                      <Text style={styles.cardDesc}>{lang.tagline}</Text>
                    </View>
                    {isSelected ? (
                      <View style={styles.checkBadge}>
                        <Check size={16} color={COLORS.white} strokeWidth={3} />
                      </View>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContainer}>
            <MascotPip mood="thinking" size={90} message="How much do you already know?" />
            <Text style={styles.stepTitle}>Select Your Level</Text>

            <View style={styles.cardsList}>
              {levels.map((lvl) => {
                const isSelected = learningLevel === lvl.id;
                return (
                  <Pressable
                    key={lvl.id}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => {
                      HapticsService.lightTap();
                      setLearningLevel(lvl.id);
                    }}
                    style={[
                      styles.choiceCard,
                      isSelected && styles.choiceCardSelected,
                    ]}
                  >
                    <View style={styles.cardInfo}>
                      <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                        {lvl.title}
                      </Text>
                      <Text style={styles.cardDesc}>{lvl.desc}</Text>
                    </View>
                    {isSelected ? (
                      <View style={styles.checkBadge}>
                        <Check size={16} color={COLORS.white} strokeWidth={3} />
                      </View>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContainer}>
            <MascotPip mood="celebrating" size={90} message="Commit to a daily learning habit!" />
            <Text style={styles.stepTitle}>Choose a Daily Goal</Text>

            <View style={styles.cardsList}>
              {goals.map((g) => {
                const isSelected = dailyGoalMinutes === g.minutes;
                return (
                  <Pressable
                    key={g.minutes}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => {
                      HapticsService.lightTap();
                      setDailyGoalMinutes(g.minutes);
                    }}
                    style={[
                      styles.choiceCard,
                      isSelected && styles.choiceCardSelected,
                    ]}
                  >
                    <View style={styles.cardInfo}>
                      <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>
                        {g.label}
                      </Text>
                      <Text style={styles.cardDesc}>{g.desc}</Text>
                    </View>
                    {isSelected ? (
                      <View style={styles.checkBadge}>
                        <Check size={16} color={COLORS.white} strokeWidth={3} />
                      </View>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Safe-Area Aware Bottom Footer (BUG-011 Fix) */}
      <View style={[styles.footer, { paddingBottom: Math.max(16, insets.bottom + 12) }]}>
        <Button3D
          title={step === 3 ? "Let's Go!" : 'Continue'}
          onPress={handleNext}
          loading={submitting}
          disabled={submitting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarBackground: {
    flex: 1,
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: RADII.pill,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADII.pill,
  },
  stepCounterText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.grayText,
  },
  content: {
    paddingHorizontal: 20,
  },
  stepContainer: {
    marginTop: 6,
  },
  stepTitle: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: '900',
    color: COLORS.charcoal,
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsList: {
    gap: 12,
  },
  choiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: '#CBD5E1',
  },
  choiceCardSelected: {
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
    backgroundColor: COLORS.secondarySubtle,
  },
  cardEmoji: {
    fontSize: 34,
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  cardTitleSelected: {
    color: COLORS.secondaryDark,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.grayText,
    marginTop: 2,
  },
  checkBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 14,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.grayBorder,
    backgroundColor: COLORS.white,
  },
});
