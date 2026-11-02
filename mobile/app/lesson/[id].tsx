import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { X, Heart, CheckCircle2, AlertCircle, Sparkles, Flame, Trophy, Award } from 'lucide-react-native';
import { COLORS, RADII, SHADOWS, TYPOGRAPHY } from '../../src/constants/theme';
import { Button3D } from '../../src/components/Button3D';
import { CharacterView } from '../../src/components/character/CharacterView';
import { AdaptiveEngine } from '../../src/services/adaptiveEngine';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';
import { SoundService } from '../../src/services/soundService';
import { HapticsService } from '../../src/services/hapticsService';
import { CurriculumService } from '../../src/services/curriculumService';
import { StorageService } from '../../src/services/storageService';
import { ProgressiveLearningEngine } from '../../src/services/progressiveLearningEngine';

// Exercise Components
import { MultipleChoiceExercise } from '../../src/components/exercises/MultipleChoiceExercise';
import { TranslationExercise } from '../../src/components/exercises/TranslationExercise';
import { WordOrderExercise } from '../../src/components/exercises/WordOrderExercise';
import { MatchingPairsExercise } from '../../src/components/exercises/MatchingPairsExercise';
import { FillInTheBlankExercise } from '../../src/components/exercises/FillInTheBlankExercise';
import { ListeningExercise } from '../../src/components/exercises/ListeningExercise';
import { TrueFalseExercise } from '../../src/components/exercises/TrueFalseExercise';
import { SpeakingExercise } from '../../src/components/exercises/SpeakingExercise';
import { ImageSelectExercise } from '../../src/components/exercises/ImageSelectExercise';

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, token, refreshUser, updateUserLocally } = useAuth();

  const [course, setCourse] = useState<any>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // User input states for different exercise types
  const [mcSelectedId, setMcSelectedId] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [tfSelectedVal, setTfSelectedVal] = useState<boolean | null>(null);
  const [spokenCaptured, setSpokenCaptured] = useState('');
  const [matchedPairs, setMatchedPairs] = useState<any>(null);

  // Lesson lifecycle & feedback state
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    status: 'none' | 'correct' | 'incorrect';
    correctAnswer?: string;
    explanation?: string;
    pedagogicalTip?: string;
    hasAccentWarning?: boolean;
  }>({ status: 'none' });

  const [attempts, setAttempts] = useState<any[]>([]);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showOutOfHeartsModal, setShowOutOfHeartsModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionResult, setCompletionResult] = useState<any>(null);

  const startTimeRef = useRef<number>(Date.now());

  // Load lesson and exercises
  useEffect(() => {
    if (!id) return;
    AdaptiveEngine.resetLesson();

    // 1. Instant load from local static curriculum
    CurriculumService.getLesson(id as string).then((localData) => {
      if (localData) {
        setCourse(localData.course);
        setLesson(localData.lesson);
        setExercises(localData.exercises || []);
        setLoading(false);
        startTimeRef.current = Date.now();

        // Strict Language Guard
        if (
          localData.course?.toLanguage &&
          user?.targetLanguage &&
          localData.course.toLanguage !== user.targetLanguage
        ) {
          console.log(
            `[LessonScreen] Synchronizing targetLanguage to course language: ${localData.course.toLanguage}`
          );
          updateUserLocally((prev) =>
            prev ? { ...prev, targetLanguage: localData.course.toLanguage } : null
          );
          StorageService.setItem(
            'lingopulse_active_target_lang',
            localData.course.toLanguage
          ).catch(() => {});
        }
      }
    });

    // 2. Optional remote refresh if connected to live server
    if (token && !token.startsWith('local-')) {
      const url = ENDPOINTS.LESSON(id as string);
      fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.lesson && data.exercises?.length) {
            setLesson(data.lesson);
            setExercises(data.exercises);
            setLoading(false);
          }
        })
        .catch(() => {});
    }
  }, [id]);

  const unitNumber =
    lesson?.unitNumber ||
    (lesson?.unitId && parseInt(String(lesson.unitId).replace(/[^0-9]/g, ''), 10)) ||
    1;
  const stepNumber = lesson?.lessonNumber || 1;
  const stepPedagogy = ProgressiveLearningEngine.getStepPedagogy(unitNumber, stepNumber);

  const currentExercise = exercises[currentIndex];

  const getCurrentUserAnswer = () => {
    if (!currentExercise) return null;
    switch (currentExercise.type) {
      case 'MULTIPLE_CHOICE':
      case 'LISTENING_COMPREHENSION':
      case 'IMAGE_SELECT':
        return mcSelectedId;
      case 'TRANSLATION':
      case 'FILL_IN_THE_BLANK':
        return typedAnswer;
      case 'WORD_ORDER':
      case 'SENTENCE_CONSTRUCTION':
        return selectedWords;
      case 'MATCHING_PAIRS':
        return matchedPairs;
      case 'TRUE_FALSE':
        return tfSelectedVal;
      case 'SPEAKING_PRONUNCIATION':
        return spokenCaptured;
      default:
        return typedAnswer;
    }
  };

  const isAnswerProvided = () => {
    const ans = getCurrentUserAnswer();
    if (ans === null || ans === undefined || ans === '') return false;
    if (Array.isArray(ans) && ans.length === 0) return false;
    if (typeof ans === 'object' && !Array.isArray(ans) && Object.keys(ans).length === 0) return false;
    return true;
  };

  // Submit single exercise answer
  const handleCheckAnswer = async () => {
    if (!currentExercise || feedback.status !== 'none' || submitting) return;

    setSubmitting(true);
    const userAnswer = getCurrentUserAnswer();
    const durationMs = Date.now() - startTimeRef.current;

    try {
      const localResult = await CurriculumService.submitAnswer(
        id as string,
        currentExercise.id,
        userAnswer
      );

      // Record in adaptive engine
      AdaptiveEngine.recordAttempt(localResult.isCorrect, durationMs);

      setAttempts((prev) => [
        ...prev,
        {
          exerciseId: currentExercise.id,
          isCorrect: localResult.isCorrect,
          userAnswer,
          durationMs,
        },
      ]);

      if (token && !token.startsWith('local-')) {
        fetch(ENDPOINTS.SUBMIT_ANSWER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            exerciseId: currentExercise.id,
            userAnswer,
            durationMs,
          }),
        }).catch(() => {});
      }

      if (localResult.isCorrect) {
        SoundService.playSuccessChime();
        HapticsService.success();
        setFeedback({
          status: 'correct',
          explanation: localResult.explanation || currentExercise.explanation || 'Nicely done!',
          pedagogicalTip: (localResult as any).pedagogicalTip,
          hasAccentWarning: (localResult as any).hasAccentWarning,
        });
      } else {
        SoundService.playErrorThud();
        HapticsService.error();
        const remaining = localResult.heartsRemaining;
        updateUserLocally((prev) =>
          prev ? { ...prev, hearts: remaining } : null
        );

        setFeedback({
          status: 'incorrect',
          correctAnswer:
            currentExercise.data?.acceptableAnswers?.[0] ||
            currentExercise.data?.fullSentence ||
            currentExercise.explanation ||
            '',
          explanation: localResult.explanation || currentExercise.explanation || '',
        });

        if (remaining <= 0) {
          setTimeout(() => {
            setShowOutOfHeartsModal(true);
          }, 800);
        }
      }
    } catch (e) {
      console.warn('[LessonScreen] Submit error:', e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleContinue = async () => {
    HapticsService.lightTap();

    setMcSelectedId(null);
    setTypedAnswer('');
    setSelectedWords([]);
    setTfSelectedVal(null);
    setSpokenCaptured('');
    setMatchedPairs(null);
    setFeedback({ status: 'none' });
    startTimeRef.current = Date.now();

    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setLoading(true);
      try {
        const xpEarned = lesson?.xpReward || 20;
        const correctCount = attempts.filter((a) => a.isCorrect).length;
        const total = exercises.length || 1;
        const accuracy = Math.round((correctCount / total) * 100);

        const localCompletion = await CurriculumService.completeLesson(id as string, xpEarned);

        const completionData = {
          xpEarned,
          accuracy,
          totalXp: localCompletion.totalXp,
          streak: localCompletion.streak,
          heartsRemaining: localCompletion.hearts,
        };
        setCompletionResult(completionData);
        setIsCompleted(true);
        SoundService.playFanfare();

        updateUserLocally((prev) =>
          prev
            ? {
                ...prev,
                totalXp: localCompletion.totalXp,
                currentStreak: localCompletion.streak,
                hearts: localCompletion.hearts,
              }
            : null
        );

        if (token && !token.startsWith('local-')) {
          fetch(ENDPOINTS.COMPLETE_LESSON, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              lessonId: lesson.id,
              attempts,
              startedAt: new Date(Date.now() - 120000).toISOString(),
              completedAt: new Date().toISOString(),
            }),
          }).catch(() => {});
        }
      } catch (e) {
        console.warn('[LessonScreen] Completion notice:', e);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Preparing interactive lesson...</Text>
      </View>
    );
  }

  // Celebratory Level Up Screen (Screen 4 in Reference Image)
  if (isCompleted && completionResult) {
    return (
      <SafeAreaView style={styles.levelUpContainer}>
        <ScrollView contentContainerStyle={styles.levelUpScroll}>
          {/* Header */}
          <Text style={styles.levelUpHeading}>Level Up! ⭐</Text>

          {/* Golden Ribbon Badge */}
          <View style={styles.goldRibbonBadge}>
            <Text style={styles.goldRibbonText}>Level 2</Text>
          </View>

          {/* Glowing XP Pill */}
          <View style={styles.levelUpXpPill}>
            <Sparkles size={22} color={COLORS.gold} />
            <Text style={styles.levelUpXpText}>+{completionResult.xpEarned || 20} XP</Text>
          </View>

          {/* 3D Pip Robot Celebrating with Star Eyes & Star Medal (Screen 4) */}
          <View style={styles.pipLevelUpStage}>
            <CharacterView
              character="pip"
              pose="levelUp"
              size={180}
              roundMask={false}
              interactive={true}
            />
          </View>

          {/* Stats Bar */}
          <View style={styles.levelUpStatsRow}>
            <View style={styles.statPill}>
              <Flame size={18} color={COLORS.orange} fill={COLORS.orange} />
              <Text style={styles.statPillText}>{completionResult.streak || 5} Days</Text>
            </View>
            <View style={styles.statPill}>
              <CheckCircle2 size={18} color={COLORS.primary} />
              <Text style={styles.statPillText}>{completionResult.accuracy || 100}% Accuracy</Text>
            </View>
          </View>

          {/* Large Gold Continue Button */}
          <Pressable
            onPress={() => router.replace('/(tabs)')}
            style={styles.levelUpContinueButton}
            accessibilityRole="button"
            accessibilityLabel="Continue to home"
          >
            <Text style={styles.levelUpContinueText}>Continue →</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const progressPercent = ((currentIndex + 1) / (exercises.length || 1)) * 100;
  const currentStep = `${currentIndex + 1}/${exercises.length || 1}`;

  return (
    <SafeAreaView style={styles.container}>
      {/* Lesson Header: Exit, Segmented Pill (1/10), Hearts */}
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Quit lesson"
          onPress={() => setShowExitModal(true)}
          style={styles.exitButton}
        >
          <X size={26} color={COLORS.grayText} />
        </Pressable>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>

        <View style={styles.stepCounterPill}>
          <Text style={styles.stepCounterPillText}>{currentStep}</Text>
        </View>

        <View style={styles.heartsContainer}>
          <Heart size={20} color={COLORS.accent} fill={COLORS.accent} />
          <Text style={styles.heartsText}>{user?.hearts ?? 5}</Text>
        </View>
      </View>

      {/* Course & Lesson Indicator Banner with Progressive Difficulty Badge */}
      {course && (
        <View style={styles.courseBadgeContainer}>
          <View style={styles.courseBadge}>
            <Text style={styles.courseBadgeFlag}>{course.flagIcon || '🌐'}</Text>
            <Text style={styles.courseBadgeTitle}>{course.title}</Text>
          </View>
          <View
            style={[
              styles.pedagogyPill,
              stepPedagogy.difficulty === 'easy' && styles.pedagogyPillEasy,
              stepPedagogy.difficulty === 'medium' && styles.pedagogyPillMedium,
              stepPedagogy.difficulty === 'hard' && styles.pedagogyPillHard,
            ]}
          >
            <Text
              style={[
                styles.pedagogyPillText,
                stepPedagogy.difficulty === 'easy' && styles.pedagogyTextEasy,
                stepPedagogy.difficulty === 'medium' && styles.pedagogyTextMedium,
                stepPedagogy.difficulty === 'hard' && styles.pedagogyTextHard,
              ]}
            >
              {stepPedagogy.label}
            </Text>
          </View>
        </View>
      )}

      {/* Main Exercise Question Area */}
      <ScrollView
        contentContainerStyle={[
          styles.exerciseScroll,
          { paddingBottom: insets.bottom + 160 },
        ]}
      >
        {/* IMAGE_SELECT Exercise (Screen 3 in Reference Image) */}
        {(currentExercise?.type === 'IMAGE_SELECT' ||
          currentExercise?.data?.imageKey) && (
          <ImageSelectExercise
            prompt={currentExercise.prompt}
            imageKey={currentExercise.data?.imageKey || 'coffeeCup'}
            options={currentExercise.data?.options || []}
            selectedOptionId={mcSelectedId}
            onSelectOption={setMcSelectedId}
            disabled={feedback.status !== 'none'}
          />
        )}

        {currentExercise?.type === 'MULTIPLE_CHOICE' &&
          !currentExercise?.data?.imageKey && (
            <MultipleChoiceExercise
              prompt={currentExercise.prompt}
              options={currentExercise.data?.options || []}
              selectedOptionId={mcSelectedId}
              onSelectOption={setMcSelectedId}
              disabled={feedback.status !== 'none'}
            />
          )}

        {currentExercise?.type === 'TRANSLATION' && (
          <TranslationExercise
            prompt={currentExercise.prompt}
            sourceText={currentExercise.data?.sourcePrompt || currentExercise.data?.phraseToTranslate}
            userAnswer={typedAnswer}
            onChangeAnswer={setTypedAnswer}
            targetLanguage={course?.toLanguage || user?.targetLanguage || 'fr'}
            disabled={feedback.status !== 'none'}
          />
        )}

        {(currentExercise?.type === 'WORD_ORDER' ||
          currentExercise?.type === 'SENTENCE_CONSTRUCTION') && (
          <WordOrderExercise
            prompt={currentExercise.prompt}
            sourcePrompt={currentExercise.data?.sourcePrompt}
            wordBank={
              currentExercise.data?.wordBank ||
              currentExercise.data?.scrambledWords ||
              []
            }
            selectedWords={selectedWords}
            onChangeWords={setSelectedWords}
            disabled={feedback.status !== 'none'}
          />
        )}

        {currentExercise?.type === 'MATCHING_PAIRS' && (
          <MatchingPairsExercise
            prompt={currentExercise.prompt}
            pairs={currentExercise.data?.pairs || []}
            onCompleteAllPairs={setMatchedPairs}
            disabled={feedback.status !== 'none'}
          />
        )}

        {currentExercise?.type === 'FILL_IN_THE_BLANK' && (
          <FillInTheBlankExercise
            prompt={currentExercise.prompt}
            sentenceWithBlank={currentExercise.data?.sentenceWithBlank || currentExercise.prompt}
            options={currentExercise.data?.options}
            selectedWord={typedAnswer}
            onSelectWord={setTypedAnswer}
            disabled={feedback.status !== 'none'}
          />
        )}

        {currentExercise?.type === 'LISTENING_COMPREHENSION' && (
          <ListeningExercise
            prompt={currentExercise.prompt}
            audioUrl={currentExercise.audioUrl || 'https://actions.google.com/sounds/v1/cartoon/pop.ogg'}
            options={currentExercise.data?.options || []}
            selectedOptionId={mcSelectedId}
            onSelectOption={setMcSelectedId}
            disabled={feedback.status !== 'none'}
          />
        )}

        {currentExercise?.type === 'TRUE_FALSE' && (
          <TrueFalseExercise
            prompt={currentExercise.prompt}
            statement={currentExercise.data?.statement || currentExercise.prompt}
            selectedValue={tfSelectedVal}
            onSelectValue={setTfSelectedVal}
            disabled={feedback.status !== 'none'}
          />
        )}

        {/* Speaking Exercise with Maya 3D character (Screen 2 in Reference Image) */}
        {currentExercise?.type === 'SPEAKING_PRONUNCIATION' && (
          <SpeakingExercise
            prompt={currentExercise.prompt}
            phraseToSpeak={currentExercise.data?.phraseToSpeak || currentExercise.prompt}
            phoneticGuide={currentExercise.data?.phoneticGuide}
            spokenText={spokenCaptured}
            onSpokenRecorded={setSpokenCaptured}
            targetLanguage={course?.toLanguage || user?.targetLanguage || 'fr'}
            disabled={feedback.status !== 'none'}
          />
        )}
      </ScrollView>

      {/* Bottom Feedback Drawer / Action Bar (Screen 3 in Reference Image) */}
      <View
        style={[
          styles.footerBar,
          { paddingBottom: Math.max(16, insets.bottom + 12) },
          feedback.status === 'correct' && styles.footerBarCorrect,
          feedback.status === 'incorrect' && styles.footerBarIncorrect,
        ]}
      >
        {feedback.status === 'correct' && (
          <View style={styles.feedbackInfo}>
            <View style={styles.feedbackTitleRow}>
              <CheckCircle2 size={24} color={COLORS.primaryDark} strokeWidth={3} />
              <Text style={styles.feedbackTitleCorrect}>Excellent! 🌟</Text>
            </View>
            <Text style={styles.feedbackSubCorrect}>You're doing great!</Text>
            {feedback.explanation ? (
              <Text style={styles.feedbackExplanation}>{feedback.explanation}</Text>
            ) : null}
            {feedback.hasAccentWarning && feedback.pedagogicalTip ? (
              <Text style={styles.accentWarningText}>{feedback.pedagogicalTip}</Text>
            ) : null}
          </View>
        )}

        {feedback.status === 'incorrect' && (
          <View style={styles.feedbackInfo}>
            <View style={styles.feedbackTitleRow}>
              <AlertCircle size={24} color={COLORS.accentDark} strokeWidth={3} />
              <Text style={styles.feedbackTitleIncorrect}>Correct Solution:</Text>
            </View>
            <Text style={styles.feedbackCorrectAnswer}>{feedback.correctAnswer}</Text>
            {feedback.explanation ? (
              <Text style={styles.feedbackExplanation}>{feedback.explanation}</Text>
            ) : null}
          </View>
        )}

        <Button3D
          title={
            feedback.status === 'none'
              ? submitting
                ? 'Checking...'
                : 'Check'
              : 'Continue'
          }
          variant={feedback.status === 'incorrect' ? 'accent' : 'primary'}
          onPress={feedback.status === 'none' ? handleCheckAnswer : handleContinue}
          disabled={feedback.status === 'none' && (!isAnswerProvided() || submitting)}
        />
      </View>

      {/* Exit Modal */}
      <Modal visible={showExitModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <CharacterView character="pip" pose="helper" size={80} roundMask={true} />
            <Text style={styles.modalTitle}>Quit Current Session?</Text>
            <Text style={styles.modalDesc}>
              You will lose your in-progress answers if you quit now.
            </Text>

            <Button3D
              title="Keep Learning"
              onPress={() => setShowExitModal(false)}
              style={{ width: '100%', marginTop: 12 }}
            />
            <Button3D
              title="Quit Session"
              variant="outline"
              onPress={() => {
                setShowExitModal(false);
                router.replace('/(tabs)');
              }}
              style={{ width: '100%', marginTop: 8 }}
            />
          </View>
        </View>
      </Modal>

      {/* Out of Hearts Modal */}
      <Modal visible={showOutOfHeartsModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <CharacterView character="pip" pose="helper" size={90} roundMask={true} />
            <Text style={[styles.modalTitle, { color: COLORS.accentDark }]}>
              You Ran Out of Hearts!
            </Text>
            <Text style={styles.modalDesc}>
              Review your previous mistakes in the Practice Hub to earn hearts back!
            </Text>

            <Button3D
              title="Practice & Refill Hearts"
              variant="primary"
              onPress={() => {
                setShowOutOfHeartsModal(false);
                router.replace('/(tabs)/practice');
              }}
              style={{ width: '100%', marginTop: 14 }}
            />
            <Button3D
              title="Return Home"
              variant="outline"
              onPress={() => {
                setShowOutOfHeartsModal(false);
                router.replace('/(tabs)');
              }}
              style={{ width: '100%', marginTop: 8 }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.grayText,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  exitButton: {
    padding: 6,
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
  stepCounterPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADII.pill,
  },
  stepCounterPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  heartsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heartsText: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.accent,
  },
  courseBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  courseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  courseBadgeFlag: {
    fontSize: 14,
  },
  courseBadgeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  courseBadgeLesson: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.grayText,
    marginLeft: 6,
    flex: 1,
  },
  pedagogyPill: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: RADII.pill,
    borderWidth: 1,
  },
  pedagogyPillEasy: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  pedagogyPillMedium: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  pedagogyPillHard: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
  },
  pedagogyPillText: {
    fontSize: 11,
    fontWeight: '800',
  },
  pedagogyTextEasy: {
    color: '#15803D',
  },
  pedagogyTextMedium: {
    color: '#B45309',
  },
  pedagogyTextHard: {
    color: '#B91C1C',
  },
  exerciseScroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: COLORS.white,
    borderTopWidth: 2,
    borderTopColor: '#E2E8F0',
    ...SHADOWS.float,
  },
  footerBarCorrect: {
    backgroundColor: '#DCFCE7',
    borderTopColor: '#86EFAC',
  },
  footerBarIncorrect: {
    backgroundColor: '#FEE2E2',
    borderTopColor: '#FCA5A5',
  },
  feedbackInfo: {
    marginBottom: 10,
  },
  feedbackTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feedbackTitleCorrect: {
    fontSize: 19,
    fontWeight: '900',
    color: '#15803D',
  },
  feedbackSubCorrect: {
    fontSize: 14,
    fontWeight: '700',
    color: '#166534',
    marginTop: 2,
  },
  feedbackTitleIncorrect: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.accentDark,
  },
  feedbackCorrectAnswer: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.accentDark,
    marginTop: 4,
  },
  feedbackExplanation: {
    fontSize: 13,
    color: COLORS.charcoal,
    marginTop: 4,
    fontWeight: '600',
  },
  accentWarningText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '700',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    ...SHADOWS.float,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.charcoal,
    marginTop: 12,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 14,
    color: COLORS.grayText,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 8,
    lineHeight: 20,
  },

  // Level Up Celebratory Styles (Screen 4 in Reference Image)
  levelUpContainer: {
    flex: 1,
    backgroundColor: '#312E81', // Glowing Royal Indigo / Deep Blue-Purple
  },
  levelUpScroll: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  levelUpHeading: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FACC15',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  goldRibbonBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 28,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#FCD34D',
    borderBottomWidth: 4,
    borderBottomColor: '#D97706',
  },
  goldRibbonText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  levelUpXpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(254, 240, 138, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: RADII.pill,
    borderWidth: 1.5,
    borderColor: '#FDE047',
    marginBottom: 20,
  },
  levelUpXpText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FDE047',
  },
  pipLevelUpStage: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelUpStatsRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
    marginBottom: 32,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADII.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  statPillText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  levelUpContinueButton: {
    width: '100%',
    backgroundColor: '#F59E0B',
    borderBottomWidth: 5,
    borderColor: '#B45309',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.float,
  },
  levelUpContinueText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
