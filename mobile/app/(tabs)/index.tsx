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
import { useRouter, useFocusEffect } from 'expo-router';
import { Check, Lock, Star, Sparkles, Flame, Target, BookOpen, X, Gift, ChevronRight } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../src/constants/theme';
import { HeaderBar } from '../../src/components/HeaderBar';
import { Button3D } from '../../src/components/Button3D';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';
import { HapticsService } from '../../src/services/hapticsService';
import { CurriculumService } from '../../src/services/curriculumService';

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
    try {
      // 1. Instant load from local static curriculum
      const localData = await CurriculumService.getLearningPath(undefined, user?.targetLanguage);
      setCourseData(localData.course);
      setUnits(localData.units);

      let foundCurrent: string | null = null;
      for (const u of localData.units) {
        for (const l of u.lessons) {
          if (l.isCurrent) {
            foundCurrent = l.id;
            break;
          }
        }
        if (foundCurrent) break;
      }
      if (!foundCurrent && localData.units?.[0]?.lessons?.[0]) {
        foundCurrent = localData.units[0].lessons[0].id;
      }
      setCurrentLessonId(foundCurrent);
      setLoading(false);

      // 2. Optional remote refresh if online and connected
      if (token && !token.startsWith('local-')) {
        const courseRes = await fetch(ENDPOINTS.COURSES, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (courseRes.ok) {
          const courseJson = await courseRes.json();
          const allCourses = courseJson.courses || [];
          const userTarget = (user?.targetLanguage || 'es').toLowerCase();
          const matchedCourse = allCourses.find((c: any) => {
            return (
              c.toLanguage?.toLowerCase() === userTarget ||
              c.code?.toLowerCase().startsWith(userTarget) ||
              c.title?.toLowerCase().includes(userTarget)
            );
          });

          if (matchedCourse) {
            const pathRes = await fetch(ENDPOINTS.COURSE_PATH(matchedCourse._id), {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (pathRes.ok) {
              const pathJson = await pathRes.json();
              // Verify the returned path matches the active target language before setting state
              if (pathJson.units?.length && pathJson.course?.toLanguage?.toLowerCase() === userTarget) {
                setCourseData(pathJson.course);
                setUnits(pathJson.units);
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn('[HomeScreen] Using offline curriculum:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Re-load whenever active language or token changes
  useEffect(() => {
    loadLearningPath();
  }, [token, user?.targetLanguage]);

  // Re-verify learning path whenever HomeScreen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadLearningPath();
    }, [user?.targetLanguage, token])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadLearningPath();
  };

  const handleLessonNodePress = (lesson: any, unit: any) => {
    if (!lesson.isUnlocked && !lesson.isCompleted) {
      HapticsService.error();
      return;
    }
    HapticsService.lightTap();
    setSelectedLessonModal({ ...lesson, unitTitle: unit.title, unitNumber: unit.unitNumber });
  };

  const handleStartLesson = (lessonId: string) => {
    setSelectedLessonModal(null);
    router.push(`/lesson/${lessonId}`);
  };

  const dailyGoalMinutes = user?.preferences?.dailyGoalMinutes || 10;
  const targetXp = dailyGoalMinutes * 5;
  const currentDailyXp = Math.min(targetXp, (user?.totalXp || 0) % targetXp || 15);
  const dailyProgressPercent = Math.min(100, Math.round((currentDailyXp / targetXp) * 100));

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading curriculum...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        {/* Daily Goal Card */}
        <View style={styles.dailyGoalCard}>
          <View style={styles.dailyGoalHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Flame size={18} color={COLORS.orange} fill={COLORS.orange} />
              <Text style={styles.dailyGoalTitle}>Daily Goal</Text>
            </View>
            <Text style={styles.dailyGoalCounter}>
              {currentDailyXp} / {targetXp} XP
            </Text>
          </View>
          <View style={styles.goalBarBackground}>
            <View style={[styles.goalBarFill, { width: `${Math.max(10, dailyProgressPercent)}%` }]} />
          </View>
        </View>

        {/* Units & Learning Path */}
        {units.map((unit, unitIdx) => (
          <View key={unit.id} style={styles.unitContainer}>
            {/* Unit Header Banner */}
            <View
              style={[
                styles.unitBanner,
                {
                  backgroundColor: unit.themeColor || (unitIdx === 0 ? COLORS.primary : COLORS.secondary),
                  borderColor: unitIdx === 0 ? COLORS.primaryDark : COLORS.secondaryDark,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionBadgeText}>SECTION 1 • UNIT {unit.unitNumber}</Text>
                </View>
                <Text style={styles.unitBannerTitle}>{unit.title}</Text>
                <Text style={styles.unitBannerDesc}>{unit.description}</Text>
              </View>

              <View style={styles.guidebookButton}>
                <BookOpen size={20} color={COLORS.white} />
              </View>
            </View>

            {/* Stepping-Stone Path */}
            <View style={styles.pathWrapper}>
              {(unit.lessons || []).map((lesson: any, lessonIdx: number) => {
                // S-Curve rhythmic offsets: [0, 48, 0, -48]
                const offsets = [0, 46, 0, -46];
                const offsetX = offsets[lessonIdx % offsets.length];

                return (
                  <View
                    key={lesson.id}
                    style={[
                      styles.nodeWrapper,
                      { transform: [{ translateX: offsetX }] },
                    ]}
                  >
                    {/* Floating Animated "START" Bubble */}
                    {lesson.isCurrent && (
                      <View style={styles.startBadgeWrapper}>
                        <View style={styles.startBadge}>
                          <Text style={styles.startBadgeText}>START</Text>
                        </View>
                        <View style={styles.startBadgeArrow} />
                      </View>
                    )}

                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Lesson: ${lesson.title}. Status: ${
                        lesson.isCompleted ? 'Completed' : lesson.isUnlocked ? 'Available' : 'Locked'
                      }`}
                      onPress={() => handleLessonNodePress(lesson, unit)}
                      style={[
                        styles.stoneNode,
                        lesson.isCompleted && styles.stoneCompleted,
                        lesson.isCurrent && styles.stoneCurrent,
                        !lesson.isUnlocked && !lesson.isCompleted && styles.stoneLocked,
                      ]}
                    >
                      {/* Inner Ring Highlight */}
                      <View
                        style={[
                          styles.stoneInnerRing,
                          lesson.isCompleted && styles.ringCompleted,
                          lesson.isCurrent && styles.ringCurrent,
                        ]}
                      >
                        {lesson.isCompleted ? (
                          <Check size={32} color={COLORS.white} strokeWidth={3.5} />
                        ) : lesson.isCurrent ? (
                          <Star size={32} color={COLORS.white} fill={COLORS.white} />
                        ) : (
                          <Lock size={24} color={COLORS.grayLight} />
                        )}
                      </View>
                    </Pressable>

                    <Text style={styles.nodeLabel}>{lesson.title}</Text>
                  </View>
                );
              })}

              {/* Bonus Unit Reward Chest */}
              <View style={styles.nodeWrapper}>
                <View style={styles.chestNode}>
                  <Gift size={28} color={COLORS.goldDark} />
                </View>
                <Text style={styles.chestLabel}>Unit Milestone</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Lesson Preview Bottom Sheet Modal */}
      {selectedLessonModal && (
        <Modal
          visible={true}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedLessonModal(null)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalSheet}>
              {/* Sheet Header */}
              <View style={styles.sheetHeader}>
                <View style={styles.sheetBadge}>
                  <Text style={styles.sheetBadgeText}>
                    UNIT {selectedLessonModal.unitNumber} • LESSON {selectedLessonModal.lessonNumber}
                  </Text>
                </View>
                <Pressable
                  onPress={() => setSelectedLessonModal(null)}
                  style={styles.sheetCloseBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Close preview"
                >
                  <X size={20} color={COLORS.grayText} />
                </Pressable>
              </View>

              <Text style={styles.sheetTitle}>{selectedLessonModal.title}</Text>
              <Text style={styles.sheetSubtitle}>
                Master interactive vocabulary, pronunciation, and sentences with Pip the Chameleon.
              </Text>

              {/* Reward Row */}
              <View style={styles.sheetRewardBox}>
                <Sparkles size={20} color={COLORS.goldDark} />
                <Text style={styles.sheetRewardText}>
                  Earn <Text style={{ fontWeight: '900', color: COLORS.goldDark }}>+{selectedLessonModal.xpReward || 15} XP</Text> upon completion
                </Text>
              </View>

              {/* Start Button */}
              <Button3D
                title={`START +${selectedLessonModal.xpReward || 15} XP`}
                variant="primary"
                size="lg"
                onPress={() => handleStartLesson(selectedLessonModal.id)}
                style={{ marginTop: 20 }}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayBackground,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: COLORS.grayBackground,
    justifyContent: 'center',
    alignItems: 'center',
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
  dailyGoalCard: {
    margin: 16,
    padding: 14,
    backgroundColor: COLORS.white,
    borderRadius: RADII.card,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.grayBorderDark,
  },
  dailyGoalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dailyGoalTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.charcoal,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  dailyGoalCounter: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.grayText,
  },
  goalBarBackground: {
    height: 12,
    backgroundColor: COLORS.grayBorder,
    borderRadius: RADII.pill,
    overflow: 'hidden',
  },
  goalBarFill: {
    height: '100%',
    backgroundColor: COLORS.orange,
    borderRadius: RADII.pill,
  },
  unitContainer: {
    marginBottom: 24,
  },
  unitBanner: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 18,
    borderRadius: RADII.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 4,
  },
  sectionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADII.pill,
    marginBottom: 6,
  },
  sectionBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 0.8,
  },
  unitBannerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 4,
  },
  unitBannerDesc: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },
  guidebookButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  pathWrapper: {
    alignItems: 'center',
    gap: 36,
    paddingVertical: 12,
  },
  nodeWrapper: {
    alignItems: 'center',
    position: 'relative',
  },
  startBadgeWrapper: {
    alignItems: 'center',
    position: 'absolute',
    top: -42,
    zIndex: 10,
  },
  startBadge: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADII.pill,
    borderWidth: 2,
    borderColor: '#E5A500',
    borderBottomWidth: 3,
    borderBottomColor: '#D99200',
    shadowColor: COLORS.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  startBadgeText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#D99200',
    letterSpacing: 1,
  },
  startBadgeArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#E5A500',
    marginTop: -1,
  },
  stoneNode: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 6,
  },
  stoneCompleted: {
    backgroundColor: COLORS.primary,
    borderBottomColor: COLORS.primaryDark,
  },
  stoneCurrent: {
    backgroundColor: COLORS.gold,
    borderBottomColor: COLORS.goldDark,
  },
  stoneLocked: {
    backgroundColor: COLORS.locked,
    borderBottomColor: COLORS.lockedDark,
  },
  stoneInnerRing: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringCompleted: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  ringCurrent: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  nodeLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.charcoal,
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 120,
  },
  chestNode: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.goldLight,
    borderWidth: 2,
    borderColor: COLORS.gold,
    borderBottomWidth: 5,
    borderBottomColor: COLORS.goldDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chestLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.grayText,
    marginTop: 6,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADII.xl,
    borderTopRightRadius: RADII.xl,
    padding: 24,
    paddingBottom: 40,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sheetBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.pill,
  },
  sheetBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.primaryDark,
    letterSpacing: 0.6,
  },
  sheetCloseBtn: {
    padding: 4,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.charcoal,
    marginBottom: 6,
  },
  sheetSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.grayText,
    lineHeight: 20,
    marginBottom: 16,
  },
  sheetRewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: COLORS.goldSubtle,
    borderRadius: RADII.card,
    borderWidth: 1.5,
    borderColor: COLORS.goldLight,
  },
  sheetRewardText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.charcoal,
  },
});
