import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Modal,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X, Heart, CheckCircle2, AlertCircle, Sparkles, Flame } from 'lucide-react-native';
import { COLORS, RADII } from '../../src/constants/theme';
import { Button3D } from '../../src/components/Button3D';
import { MascotPip } from '../../src/components/MascotPip';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';
import { SoundService } from '../../src/services/soundService';
import { HapticsService } from '../../src/services/hapticsService';

// Exercise Components
import { MultipleChoiceExercise } from '../../src/components/exercises/MultipleChoiceExercise';
import { TranslationExercise } from '../../src/components/exercises/TranslationExercise';
import { WordOrderExercise } from '../../src/components/exercises/WordOrderExercise';
import { MatchingPairsExercise } from '../../src/components/exercises/MatchingPairsExercise';
import { FillInTheBlankExercise } from '../../src/components/exercises/FillInTheBlankExercise';
import { ListeningExercise } from '../../src/components/exercises/ListeningExercise';
import { TrueFalseExercise } from '../../src/components/exercises/TrueFalseExercise';
import { SpeakingExercise } from '../../src/components/exercises/SpeakingExercise';

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user, token, refreshUser, updateUserLocally } = useAuth();

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
  }>({ status: 'none' });

  const [attempts, setAttempts] = useState<any[]>([]);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionResult, setCompletionResult] = useState<any>(null);

  const startTimeRef = useRef<number>(Date.now());

  // Load lesson and exercises
  useEffect(() => {
    if (!token || !id) return;
    fetch(ENDPOINTS.LESSON(id as string), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setLesson(data.lesson);
        setExercises(data.exercises || []);
        setLoading(false);
        startTimeRef.current = Date.now();
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [token, id]);

  const currentExercise = exercises[currentIndex];

  // Helper to get user's current answer based on exercise type
  const getCurrentUserAnswer = () => {
    if (!currentExercise) return null;
    switch (currentExercise.type) {
      case 'MULTIPLE_CHOICE':
      case 'IMAGE_SELECT':
      case 'LISTENING_COMPREHENSION':
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
    return true;
  };

  // Submit single exercise answer
  const handleCheckAnswer = async () => {
    if (!currentExercise || feedback.status !== 'none' || submitting) return;

    setSubmitting(true);
    const userAnswer = getCurrentUserAnswer();
    const durationMs = Date.now() - startTimeRef.current;

    try {
      const res = await fetch(ENDPOINTS.SUBMIT_ANSWER, {
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
      });

      const result = await res.json();

      // Record this attempt in our local list
      setAttempts((prev) => [
        ...prev,
        {
          exerciseId: currentExercise.id,
          isCorrect: result.isCorrect,
          userAnswer,
          durationMs,
        },
      ]);

      if (result.isCorrect) {
        SoundService.playSuccessChime();
        HapticsService.success();
        setFeedback({
          status: 'correct',
          explanation: result.explanation || 'Excellent work!',
        });
      } else {
        SoundService.playErrorThud();
        HapticsService.error();
        // Update user hearts locally
        updateUserLocally((prev) =>
          prev ? { ...prev, hearts: result.heartsRemaining } : null
        );
        setFeedback({
          status: 'incorrect',
          correctAnswer: String(result.correctAnswer),
          explanation: result.explanation || '',
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  // Move to next exercise or finalize lesson
  const handleContinue = async () => {
    HapticsService.lightTap();

    // Reset inputs
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
      // Completed all exercises! Call /complete endpoint
      setLoading(true);
      try {
        const res = await fetch(ENDPOINTS.COMPLETE_LESSON, {
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
        });
        const completionData = await res.json();
        setCompletionResult(completionData);
        setIsCompleted(true);
        SoundService.playFanfare();
        await refreshUser();
      } catch (e) {
        console.error(e);
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

  // Celebratory Completion Screen
  if (isCompleted && completionResult) {
    return (
      <SafeAreaView style={styles.completedContainer}>
        <ScrollView contentContainerStyle={styles.completedScroll}>
          <MascotPip mood="celebrating" size={130} message="Lesson Finished! You're on fire!" />

          <Text style={styles.completedTitle}>Lesson Complete!</Text>
          <Text style={styles.completedSubtitle}>You’re making remarkable daily progress</Text>

          {/* Reward Badges Grid */}
          <View style={styles.rewardsGrid}>
            <View style={styles.rewardCard}>
              <Sparkles size={28} color={COLORS.gold} />
              <Text style={styles.rewardValue}>+{completionResult.xpAwarded} XP</Text>
              <Text style={styles.rewardLabel}>Total XP Earned</Text>
            </View>

            <View style={styles.rewardCard}>
              <Flame size={28} color={COLORS.gold} fill={COLORS.gold} />
              <Text style={styles.rewardValue}>{completionResult.newStreak} Days</Text>
              <Text style={styles.rewardLabel}>Daily Streak</Text>
            </View>

            <View style={styles.rewardCard}>
              <CheckCircle2 size={28} color={COLORS.primary} />
              <Text style={styles.rewardValue}>{completionResult.accuracyPercentage}%</Text>
              <Text style={styles.rewardLabel}>Accuracy</Text>
            </View>
          </View>

          <Button3D
            title="Finish & Continue"
            onPress={() => router.replace('/(tabs)')}
            style={{ width: '100%', marginTop: 32 }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const progressPercent = ((currentIndex + 1) / (exercises.length || 1)) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Lesson Header: Exit, Progress Bar, Hearts */}
      <View style={styles.header}>
        <Pressable
          onPress={() => setShowExitModal(true)}
          style={styles.exitButton}
        >
          <X size={26} color={COLORS.grayText} />
        </Pressable>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>

        <View style={styles.heartsContainer}>
          <Heart size={22} color={COLORS.accent} fill={COLORS.accent} />
          <Text style={styles.heartsText}>{user?.hearts ?? 5}</Text>
        </View>
      </View>

      {/* Main Exercise Question Renderer */}
      <ScrollView contentContainerStyle={styles.exerciseScroll}>
        {currentExercise?.type === 'MULTIPLE_CHOICE' && (
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
            sourceText={currentExercise.instruction}
            userAnswer={typedAnswer}
            onChangeAnswer={setTypedAnswer}
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
            onSelectWord={(w) => setSelectedWords((prev) => [...prev, w])}
            onRemoveWord={(w, idx) =>
              setSelectedWords((prev) => prev.filter((_, i) => i !== idx))
            }
            disabled={feedback.status !== 'none'}
          />
        )}

        {currentExercise?.type === 'MATCHING_PAIRS' && (
          <MatchingPairsExercise
            prompt={currentExercise.prompt}
            pairs={currentExercise.data?.pairs || []}
            matchedPairIds={[]}
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

        {currentExercise?.type === 'SPEAKING_PRONUNCIATION' && (
          <SpeakingExercise
            prompt={currentExercise.prompt}
            phraseToSpeak={currentExercise.data?.phraseToSpeak || currentExercise.prompt}
            phoneticGuide={currentExercise.data?.phoneticGuide}
            spokenText={spokenCaptured}
            onSpokenRecorded={setSpokenCaptured}
            disabled={feedback.status !== 'none'}
          />
        )}
      </ScrollView>

      {/* Bottom Feedback Drawer / Action Bar */}
      <View
        style={[
          styles.footerBar,
          feedback.status === 'correct' && styles.footerBarCorrect,
          feedback.status === 'incorrect' && styles.footerBarIncorrect,
        ]}
      >
        {feedback.status === 'correct' && (
          <View style={styles.feedbackInfo}>
            <View style={styles.feedbackTitleRow}>
              <CheckCircle2 size={24} color={COLORS.primaryDark} />
              <Text style={styles.feedbackTitleCorrect}>Nicely done!</Text>
            </View>
            <Text style={styles.feedbackExplanation}>{feedback.explanation}</Text>
          </View>
        )}

        {feedback.status === 'incorrect' && (
          <View style={styles.feedbackInfo}>
            <View style={styles.feedbackTitleRow}>
              <AlertCircle size={24} color={COLORS.accentDark} />
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

      {/* Exit Confirmation Modal */}
      <Modal visible={showExitModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <MascotPip mood="thinking" size={90} />
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  exitButton: {
    padding: 6,
  },
  progressBarBackground: {
    flex: 1,
    height: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: RADII.pill,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADII.pill,
  },
  heartsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heartsText: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.accentDark,
  },
  exerciseScroll: {
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 2,
    borderTopColor: COLORS.grayBorder,
  },
  footerBarCorrect: {
    backgroundColor: '#D7FFB8',
    borderTopColor: COLORS.primaryDark,
  },
  footerBarIncorrect: {
    backgroundColor: '#FFDFE0',
    borderTopColor: COLORS.accentDark,
  },
  feedbackInfo: {
    marginBottom: 12,
  },
  feedbackTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feedbackTitleCorrect: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primaryDark,
  },
  feedbackTitleIncorrect: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.accentDark,
  },
  feedbackCorrectAnswer: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.charcoal,
    marginTop: 4,
  },
  feedbackExplanation: {
    fontSize: 13,
    color: COLORS.charcoal,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADII.xl,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
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
  },
  completedContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  completedScroll: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  completedTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.charcoal,
    textAlign: 'center',
    marginTop: 12,
  },
  completedSubtitle: {
    fontSize: 15,
    color: COLORS.grayText,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 28,
  },
  rewardsGrid: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  rewardCard: {
    flex: 1,
    padding: 16,
    borderRadius: RADII.xl,
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    alignItems: 'center',
  },
  rewardValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.charcoal,
    marginTop: 8,
  },
  rewardLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.grayText,
    textTransform: 'uppercase',
    marginTop: 2,
    textAlign: 'center',
  },
});
