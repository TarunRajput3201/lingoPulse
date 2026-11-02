import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check, Globe2 } from 'lucide-react-native';
import { COLORS, RADII, SHADOWS, TYPOGRAPHY } from '../../src/constants/theme';
import { Button3D } from '../../src/components/Button3D';
import { CharacterView } from '../../src/components/character/CharacterView';
import { useAuth } from '../../src/context/AuthContext';
import { HapticsService } from '../../src/services/hapticsService';
import { StorageService } from '../../src/services/storageService';

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useAuth();

  const [step, setStep] = useState(1);
  const [targetLanguage, setTargetLanguage] = useState('fr'); // Default to French like reference image
  const [learningLevel, setLearningLevel] = useState('beginner');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(10);
  const [submitting, setSubmitting] = useState(false);

  const languages = [
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  ];

  const levels = [
    { id: 'beginner', title: 'Absolute Beginner', desc: 'Starting from scratch with basics' },
    { id: 'elementary', title: 'A2 Elementary', desc: 'Can introduce myself & simple phrases' },
    { id: 'intermediate', title: 'B1 Intermediate', desc: 'Can hold casual conversations comfortably' },
  ];

  const goals = [
    { minutes: 5, label: 'Casual', desc: '5 min / day • Light habit' },
    { minutes: 10, label: 'Regular', desc: '10 min / day • Recommended' },
    { minutes: 15, label: 'Serious', desc: '15 min / day • Rapid progress' },
    { minutes: 20, label: 'Intense', desc: '20 min / day • Total immersion' },
  ];

  const selectedLang = languages.find((l) => l.code === targetLanguage) || languages[0];

  const handleNext = async () => {
    HapticsService.lightTap();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSubmitting(true);
      try {
        await StorageService.setItem('lingopulse_active_target_lang', targetLanguage);
        await StorageService.setItem('lingopulse_active_course_code', `en-${targetLanguage}`);
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
      {/* Progress Header */}
      <View style={[styles.header, { paddingTop: Math.max(50, insets.top + 12) }]}>
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

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 140 }]}>
        {step === 1 && (
          <View style={styles.stepContainer}>
            {/* Header Icon & Title */}
            <View style={styles.titleRow}>
              <View style={styles.globeBadge}>
                <Globe2 size={24} color={COLORS.secondaryDark} />
              </View>
              <Text style={styles.screenHeading}>Choose Your Language</Text>
            </View>

            {/* 2-Column Grid of Languages (Screen 1 in Reference Image) */}
            <View style={styles.languageGrid}>
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
                      styles.gridCard,
                      isSelected && styles.gridCardSelected,
                    ]}
                  >
                    <Text style={styles.flagEmoji}>{lang.flag}</Text>
                    <Text style={[styles.gridCardTitle, isSelected && styles.gridCardTitleSelected]}>
                      {lang.name}
                    </Text>

                    {isSelected ? (
                      <View style={styles.selectedCheckBadge}>
                        <Check size={14} color={COLORS.white} strokeWidth={3} />
                      </View>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>

            {/* Maya Character Encouragement Card (Screen 1 Bottom) */}
            <View style={styles.mayaBanner}>
              <CharacterView
                character="maya"
                pose="wink"
                size={80}
                roundMask={true}
                interactive={false}
              />
              <View style={styles.mayaSpeechBubble}>
                <Text style={styles.mayaSpeechTitle}>Great choice!</Text>
                <Text style={styles.mayaSpeechText}>
                  Let's start with {selectedLang.name}!
                </Text>
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContainer}>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <CharacterView
                character="pip"
                pose="helper"
                size={90}
                roundMask={true}
                interactive={false}
                message="How much do you already know?"
              />
            </View>
            <Text style={styles.screenHeading}>Select Your Level</Text>

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
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <CharacterView
                character="maya"
                pose="welcome"
                size={90}
                roundMask={true}
                interactive={false}
                message="Set a daily goal that fits your lifestyle!"
              />
            </View>
            <Text style={styles.screenHeading}>Choose a Daily Goal</Text>

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
                        {g.label} ({g.minutes} min)
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

      {/* Floating Bottom Sticky Bar */}
      <View
        style={[
          styles.footerBar,
          { paddingBottom: Math.max(16, insets.bottom + 12) },
        ]}
      >
        <Button3D
          title={
            step === 1
              ? 'Start Learning →'
              : step === 3
              ? submitting
                ? 'Creating Adventure...'
                : 'Complete & Begin'
              : 'Next Step →'
          }
          variant="primary"
          onPress={handleNext}
          disabled={submitting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.grayText,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  stepContainer: {
    width: '100%',
  },
  titleRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  globeBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  screenHeading: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.charcoal,
    textAlign: 'center',
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 20,
    alignItems: 'center',
    position: 'relative',
    ...SHADOWS.card3D,
  },
  gridCardSelected: {
    backgroundColor: '#F0F9FF',
    borderColor: COLORS.secondaryDark,
    borderBottomColor: '#0284C7',
    borderBottomWidth: 5,
  },
  flagEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  gridCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  gridCardTitleSelected: {
    color: COLORS.secondaryDark,
    fontWeight: '900',
  },
  selectedCheckBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.secondaryDark,
    borderWidth: 1.5,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mayaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 26,
    padding: 16,
    gap: 14,
    marginTop: 10,
    ...SHADOWS.card3D,
  },
  mayaSpeechBubble: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  mayaSpeechTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.charcoal,
  },
  mayaSpeechText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginTop: 2,
  },
  cardsList: {
    gap: 12,
    marginTop: 16,
  },
  choiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    gap: 12,
    ...SHADOWS.card3D,
  },
  choiceCardSelected: {
    backgroundColor: '#F0FDF4',
    borderColor: COLORS.primaryDark,
    borderBottomColor: '#15803D',
    borderBottomWidth: 5,
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
    color: COLORS.primaryDark,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.grayText,
    marginTop: 4,
  },
  checkBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 2,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: 20,
    paddingTop: 12,
    ...SHADOWS.float,
  },
});
