import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, RADII } from '../../src/constants/theme';
import { Button3D } from '../../src/components/Button3D';
import { MascotPip } from '../../src/components/MascotPip';
import { useAuth } from '../../src/context/AuthContext';
import { HapticsService } from '../../src/services/hapticsService';

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();

  const [step, setStep] = useState(1);
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [learningLevel, setLearningLevel] = useState('beginner');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(10);

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
    { minutes: 5, label: 'Casual', desc: '5 min / day' },
    { minutes: 10, label: 'Regular', desc: '10 min / day (Recommended)' },
    { minutes: 15, label: 'Serious', desc: '15 min / day' },
    { minutes: 20, label: 'Intense', desc: '20 min / day' },
  ];

  const handleNext = async () => {
    HapticsService.lightTap();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save onboarding choices to backend
      await completeOnboarding({
        targetLanguage,
        learningLevel,
        dailyGoalMinutes,
      });
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Top Bar */}
      <View style={styles.header}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(step / 3) * 100}%` },
            ]}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
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
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer Continue Bar */}
      <View style={styles.footer}>
        <Button3D
          title={step === 3 ? "Let's Go!" : 'Continue'}
          onPress={handleNext}
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
    paddingTop: 50,
    paddingBottom: 10,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: RADII.pill,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADII.pill,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  stepContainer: {
    marginTop: 10,
  },
  stepTitle: {
    fontSize: 24,
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
    borderRadius: RADII.lg,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
  },
  choiceCardSelected: {
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
    backgroundColor: '#F0F9FF',
  },
  cardEmoji: {
    fontSize: 32,
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 2,
    borderTopColor: COLORS.grayBorder,
    backgroundColor: COLORS.white,
  },
});
