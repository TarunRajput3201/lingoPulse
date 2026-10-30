import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Check, Lock, Star, Sparkles, Flame, Target, BookOpen, X } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../src/constants/theme';
import { HeaderBar } from '../../src/components/HeaderBar';
import { Button3D } from '../../src/components/Button3D';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';
import { HapticsService } from '../../src/services/hapticsService';

export default function HomeScreen() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);
  const [units, setUnits] = useState<any[]>([]);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [selectedLessonModal, setSelectedLessonModal] = useState<any | null>(null);

  // If learner is not logged in, redirect to login
  useEffect(() => {
    if (!isLoading && !token) {
      router.replace('/(auth)/login');
    }
  }, [token, isLoading]);

  const loadLearningPath = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      // 1. Fetch available courses to get current course ID
      const courseRes = await fetch(ENDPOINTS.COURSES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const courseJson = await courseRes.json();
      const allCourses = courseJson.courses || [];
      const userTarget = user?.targetLanguage?.toLowerCase();
      const matchedCourse = allCourses.find((c: any) => {
        if (!userTarget) return false;
        return (
          c.toLanguage?.toLowerCase() === userTarget ||
          c.code?.toLowerCase().startsWith(userTarget) ||
          c.title?.toLowerCase().includes(userTarget)
        );
      }) || allCourses[0];

      if (matchedCourse) {
        // 2. Fetch learning path for this course
        const pathRes = await fetch(ENDPOINTS.COURSE_PATH(matchedCourse._id), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pathJson = await pathRes.json();

        setCourseData(pathJson.course);
        setUnits(pathJson.units || []);

        // Find current incomplete lesson
        let foundCurrent: string | null = null;
        for (const u of pathJson.units || []) {
          for (const l of u.lessons || []) {
            if (l.isCurrent) {
              foundCurrent = l.id;
              break;
            }
          }
          if (foundCurrent) break;
        }

        // If none is current (e.g. all completed), default to first lesson
        if (!foundCurrent && pathJson.units?.[0]?.lessons?.[0]) {
          foundCurrent = pathJson.units[0].lessons[0].id;
        }

        setCurrentLessonId(foundCurrent);
      }
    } catch (e) {
      console.error('[HomeScreen] Error loading path:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLearningPath();
  }, [token]);

  const onRefresh = () => {
    setRefreshing(true);
    loadLearningPath();
  };

  const handleLessonNodePress = (lesson: any, unit: any) => {
    if (lesson.isLocked) {
      HapticsService.error();
      return;
    }
    HapticsService.lightTap();
    setSelectedLessonModal({ ...lesson, unitTitle: unit.title, unitNumber: unit.unitNumber });
  };

  const startLesson = (lessonId: string) => {
    setSelectedLessonModal(null);
    HapticsService.mediumTap();
    router.push(`/lesson/${lessonId}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading your learning path...</Text>
      </View>
    );
  }

  const dailyGoalMinutes = user?.preferences?.dailyGoalMinutes || 10;
  const userXp = user?.totalXp || 0;
  const targetDailyXp = dailyGoalMinutes * 3;
  const dailyProgressPercent = Math.min(100, Math.round(((userXp % targetDailyXp) / targetDailyXp) * 100));

  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }
      >
        {/* Daily Motivation & Goal Progress Card */}
        <View style={styles.goalCard}>
          <View style={styles.goalTopRow}>
            <View style={styles.goalIconCircle}>
              <Target size={22} color={COLORS.primary} strokeWidth={2.5} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.goalTitle}>Daily Learning Goal</Text>
              <Text style={styles.goalSubtitle}>
                {user?.currentStreak ? `${user.currentStreak} Day Streak 🔥` : 'Start your streak today!'}
              </Text>
            </View>
            <Text style={styles.goalPercentage}>{dailyProgressPercent}%</Text>
          </View>

          {/* Goal Progress Bar */}
          <View style={styles.goalProgressBarBg}>
            <View
              style={[
                styles.goalProgressBarFill,
                { width: `${Math.max(8, dailyProgressPercent)}%` },
              ]}
            />
          </View>
        </View>

        {units.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Sparkles size={48} color={COLORS.primary} />
            <Text style={styles.emptyTitle}>Welcome to LingoPulse!</Text>
            <Text style={styles.emptyDesc}>
              Explore available courses to start your learning journey.
            </Text>
            <Button3D
              title="Explore Courses"
              onPress={() => router.push('/(tabs)/courses')}
              style={{ marginTop: 24, width: 220 }}
            />
          </View>
        ) : (
          units.map((unit) => (
            <View key={unit.id} style={styles.unitSection}>
              {/* Unit Header Card */}
              <View
                style={[
                  styles.unitHeaderCard,
                  { backgroundColor: unit.themeColor || COLORS.primary },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.unitBadge}>Unit {unit.unitNumber}</Text>
                  <Text style={styles.unitTitle}>{unit.title}</Text>
                  <Text style={styles.unitDesc}>{unit.description}</Text>
                </View>
                <View style={styles.unitSparkle}>
                  <BookOpen size={24} color={COLORS.white} />
                </View>
              </View>

              {/* Winding S-Curve Learning Path */}
              <View style={styles.pathWrapper}>
                {(unit.lessons || []).map((lesson: any, lessonIdx: number) => {
                  // Compute S-curve alternating horizontal offsets: [0, 48, 0, -48]
                  const offsets = [0, 48, 0, -48];
                  const offsetX = offsets[lessonIdx % offsets.length];

                  return (
                    <View
                      key={lesson.id}
                      style={[
                        styles.nodeContainer,
                        { transform: [{ translateX: offsetX }] },
                      ]}
                    >
                      {/* Floating Start Bubble on current lesson */}
                      {lesson.isCurrent && (
                        <View style={styles.startBubble}>
                          <Text style={styles.startBubbleText}>START</Text>
                          <View style={styles.bubbleArrow} />
                        </View>
                      )}

                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Lesson: ${lesson.title}. Status: ${
                          lesson.isCompleted ? 'Completed' : lesson.isLocked ? 'Locked' : 'Available'
                        }`}
                        onPress={() => handleLessonNodePress(lesson, unit)}
                        style={[
                          styles.lessonNode,
                          lesson.isCompleted && styles.lessonNodeCompleted,
                          lesson.isCurrent && styles.lessonNodeCurrent,
                          lesson.isLocked && styles.lessonNodeLocked,
                        ]}
                      >
                        {lesson.isCompleted ? (
                          <Check size={34} color={COLORS.white} strokeWidth={3.5} />
                        ) : lesson.isCurrent ? (
                          <Star size={34} color={COLORS.white} fill={COLORS.white} />
                        ) : (
                          <Lock size={26} color="#94A3B8" />
                        )}
                      </Pressable>

                      <Text style={styles.nodeTitle}>{lesson.title}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Lesson Node Preview Modal */}
      <Modal visible={!!selectedLessonModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalBadge}>
                <Text style={styles.modalBadgeText}>
                  Unit {selectedLessonModal?.unitNumber}
                </Text>
              </View>
              <Pressable
                onPress={() => setSelectedLessonModal(null)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color={COLORS.grayText} />
              </Pressable>
            </View>

            <Text style={styles.modalLessonTitle}>{selectedLessonModal?.title}</Text>
            <Text style={styles.modalLessonDesc}>
              {selectedLessonModal?.description || 'Practice core vocabulary and conversational patterns.'}
            </Text>

            <View style={styles.modalRewardRow}>
              <Sparkles size={20} color={COLORS.gold} />
              <Text style={styles.modalRewardText}>
                +{selectedLessonModal?.xpReward || 15} XP Reward on completion
              </Text>
            </View>

            <Button3D
              title="Start Lesson"
              variant="primary"
              onPress={() => startLesson(selectedLessonModal?.id)}
              style={{ width: '100%', marginTop: 20 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayBackground,
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
  scrollContent: {
    paddingBottom: 40,
  },
  goalCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 14,
    padding: 16,
    borderRadius: RADII.xl,
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
    shadowColor: COLORS.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  goalTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  goalIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  goalSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.grayText,
    marginTop: 2,
  },
  goalPercentage: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primaryDark,
  },
  goalProgressBarBg: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: RADII.pill,
    overflow: 'hidden',
  },
  goalProgressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADII.pill,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.charcoal,
    marginTop: 16,
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.grayText,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  unitSection: {
    marginBottom: 28,
  },
  unitHeaderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: RADII.xl,
    shadowColor: COLORS.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  unitBadge: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  unitTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 2,
  },
  unitDesc: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
    maxWidth: 240,
    lineHeight: 18,
  },
  unitSparkle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pathWrapper: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 32,
  },
  nodeContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  startBubble: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: '#FDE68A',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADII.pill,
    position: 'absolute',
    top: -40,
    shadowColor: COLORS.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  startBubbleText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.goldDark,
    letterSpacing: 0.8,
  },
  bubbleArrow: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    marginLeft: -4,
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FDE68A',
  },
  lessonNode: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonNodeCompleted: {
    backgroundColor: COLORS.primary,
    borderBottomWidth: 6,
    borderBottomColor: COLORS.primaryDark,
  },
  lessonNodeCurrent: {
    backgroundColor: COLORS.gold,
    borderBottomWidth: 6,
    borderBottomColor: COLORS.goldDark,
    transform: [{ scale: 1.08 }],
  },
  lessonNodeLocked: {
    backgroundColor: '#E2E8F0',
    borderBottomWidth: 6,
    borderBottomColor: '#CBD5E1',
  },
  nodeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.charcoal,
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 120,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADII.xl,
    borderTopRightRadius: RADII.xl,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.pill,
    backgroundColor: COLORS.primarySubtle,
  },
  modalBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primaryDark,
    textTransform: 'uppercase',
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalLessonTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.charcoal,
    marginBottom: 6,
  },
  modalLessonDesc: {
    fontSize: 14,
    color: COLORS.grayText,
    lineHeight: 20,
    marginBottom: 16,
  },
  modalRewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: RADII.lg,
    backgroundColor: COLORS.goldSubtle,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  modalRewardText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.goldDark,
  },
});
