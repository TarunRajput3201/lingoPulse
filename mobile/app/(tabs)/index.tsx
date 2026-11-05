import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import {
  Check,
  Lock,
  Star,
  Sparkles,
  Flame,
  BookOpen,
  Trophy,
  BookMarked,
  FileText,
  Headphones,
  Mic,
  Clock,
  Play,
} from 'lucide-react-native';
import { COLORS, RADII, SHADOWS, TYPOGRAPHY } from '../../src/constants/theme';
import { HeaderBar } from '../../src/components/HeaderBar';
import { Button3D } from '../../src/components/Button3D';
import { CharacterView } from '../../src/components/character/CharacterView';
import { CharacterIntroModal } from '../../src/components/character/CharacterIntroModal';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';
import { HapticsService } from '../../src/services/hapticsService';
import { CurriculumService } from '../../src/services/curriculumService';
import { LearningPathSkeleton } from '../../src/components/skeletons/LearningPathSkeleton';

export default function HomeScreen() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);
  const [units, setUnits] = useState<any[]>([]);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [selectedLessonModal, setSelectedLessonModal] = useState<any | null>(null);
  const lastRemoteSyncRef = useRef<number>(0);

  // If learner is not logged in, redirect to login
  useEffect(() => {
    if (!isLoading && !token) {
      router.replace('/(auth)/login');
    }
  }, [token, isLoading]);

  // Watchdog timer: Guarantee HomeScreen skeleton never hangs indefinitely
  useEffect(() => {
    const watchdog = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(watchdog);
  }, []);

  const loadLearningPath = async (forceRemote: boolean = false) => {
    try {
      // 1. Instant load from local static curriculum (instant < 1ms)
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

      // 2. Non-blocking throttled remote refresh (only once per 60s or on manual refresh)
      const shouldSyncRemote = forceRemote || (Date.now() - lastRemoteSyncRef.current > 60000);
      if (token && !token.startsWith('local-') && shouldSyncRemote) {
        lastRemoteSyncRef.current = Date.now();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        try {
          const courseRes = await fetch(ENDPOINTS.COURSES, {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
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
                signal: controller.signal,
              });
              if (pathRes.ok) {
                const pathJson = await pathRes.json();
                if (pathJson.units?.length && pathJson.course?.toLanguage?.toLowerCase() === userTarget) {
                  setCourseData(pathJson.course);
                  setUnits(pathJson.units);
                }
              }
            }
          }
        } catch {
          // Cloud sync deferred - local curriculum already active
        } finally {
          clearTimeout(timeoutId);
        }
      }
    } catch (e) {
      console.warn('[HomeScreen] Using offline curriculum:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLearningPath();
  }, [token, user?.targetLanguage]);

  useFocusEffect(
    React.useCallback(() => {
      loadLearningPath();
    }, [user?.targetLanguage, token])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadLearningPath(true);
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
    const targetId = selectedLessonModal?.staticId || lessonId;
    setSelectedLessonModal(null);
    router.push(`/lesson/${targetId}`);
  };

  // Find next actionable lesson
  const allLessons = units.flatMap((u) => u.lessons || []);
  const activeLesson =
    allLessons.find((l) => l.id === currentLessonId) ||
    allLessons.find((l) => l.isUnlocked && !l.isCompleted) ||
    allLessons[0];
  const activeUnit = units.find((u) => u.lessons?.some((l: any) => l.id === activeLesson?.id)) || units[0];

  if (loading) {
    return <LearningPathSkeleton />;
  }

  const targetLang = user?.targetLanguage || 'fr';
  const languageName =
    targetLang === 'fr'
      ? 'French'
      : targetLang === 'es'
      ? 'Spanish'
      : targetLang === 'de'
      ? 'German'
      : targetLang === 'it'
      ? 'Italian'
      : targetLang === 'ja'
      ? 'Japanese'
      : 'Language';

  const renderHeader = () => (
    <>
      {/* 1. Top Learner Progress Banner (Screen 5) */}
      <View style={styles.learnerBanner}>
        <View style={styles.learnerBannerLeft}>
          <CharacterView
            character="maya"
            mood="idle"
            size={72}
            roundMask={false}
            interactive={true}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.learnerTitle}>
              Amazing Progress, {user?.displayName || 'Learner'}! ✨
            </Text>
            <View style={styles.streakBadgeRow}>
              <Flame size={16} color={COLORS.orange} fill={COLORS.orange} />
              <Text style={styles.streakBadgeText}>
                {user?.currentStreak ?? 5} Day Streak
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 2. Level Progress Card (Screen 5) */}
      <View style={styles.levelCard}>
        <View style={styles.levelCardHeader}>
          <View style={styles.levelIconWrapper}>
            <Trophy size={20} color={COLORS.gold} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.levelLabel}>Your Level</Text>
            <Text style={styles.levelValue}>
              {user?.learningLevel === 'intermediate'
                ? 'B1 Intermediate'
                : user?.learningLevel === 'elementary'
                ? 'A2 Elementary'
                : 'A2 Beginner'}
            </Text>
          </View>
          <Text style={styles.levelPercentText}>60%</Text>
        </View>

        <View style={styles.levelBarBackground}>
          <View style={[styles.levelBarFill, { width: '60%' }]} />
        </View>
      </View>

      {/* 3. Your Skills Row (Screen 5) */}
      <View style={styles.skillsSection}>
        <Text style={styles.sectionHeaderTitle}>Your Skills</Text>
        <View style={styles.skillsRow}>
          {/* Vocabulary */}
          <View style={styles.skillItem}>
            <View style={[styles.skillIconCircle, { backgroundColor: '#FFEDD5', borderColor: '#FDBA74', borderBottomColor: '#EA580C' }]}>
              <BookMarked size={22} color="#EA580C" />
            </View>
            <Text style={styles.skillLabel}>Vocabulary</Text>
          </View>

          {/* Grammar */}
          <View style={styles.skillItem}>
            <View style={[styles.skillIconCircle, { backgroundColor: '#DCFCE7', borderColor: '#86EFAC', borderBottomColor: '#16A34A' }]}>
              <FileText size={22} color="#16A34A" />
            </View>
            <Text style={styles.skillLabel}>Grammar</Text>
          </View>

          {/* Listening */}
          <View style={styles.skillItem}>
            <View style={[styles.skillIconCircle, { backgroundColor: '#E0F2FE', borderColor: '#7DD3FC', borderBottomColor: '#0284C7' }]}>
              <Headphones size={22} color="#0284C7" />
            </View>
            <Text style={styles.skillLabel}>Listening</Text>
          </View>

          {/* Speaking */}
          <View style={styles.skillItem}>
            <View style={[styles.skillIconCircle, { backgroundColor: '#FFE4E6', borderColor: '#FDA4AF', borderBottomColor: '#E11D48' }]}>
              <Mic size={22} color="#E11D48" />
            </View>
            <Text style={styles.skillLabel}>Speaking</Text>
          </View>
        </View>
      </View>

      {/* 4. Next Lesson Banner (Screen 5) */}
      {activeLesson && (
        <View style={styles.nextLessonBanner}>
          <View style={styles.nextLessonThumbnail}>
            <Text style={{ fontSize: 32 }}>{courseData?.flagIcon || '🗼'}</Text>
          </View>

          <View style={styles.nextLessonInfo}>
            <Text style={styles.nextLessonTag}>Next Lesson</Text>
            <Text style={styles.nextLessonTitle} numberOfLines={1}>
              {activeLesson.title}
            </Text>
            <View style={styles.durationRow}>
              <Clock size={14} color={COLORS.grayText} />
              <Text style={styles.durationText}>5 min • +{activeLesson.xpReward || 15} XP</Text>
            </View>
          </View>

          <Pressable
            onPress={() => handleLessonNodePress(activeLesson, activeUnit)}
            style={styles.nextLessonButton}
            accessibilityRole="button"
            accessibilityLabel="Start next lesson"
          >
            <Text style={styles.nextLessonButtonText}>Start →</Text>
          </Pressable>
        </View>
      )}
    </>
  );

  const renderUnitItem = ({ item: unit, index: unitIdx }: { item: any; index: number }) => (
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
            <Text style={styles.sectionBadgeText}>
              SECTION {Math.ceil(unit.unitNumber / 10)} ({unit.unitNumber <= 10 ? 'A1' : unit.unitNumber <= 20 ? 'A2' : unit.unitNumber <= 30 ? 'B1' : unit.unitNumber <= 40 ? 'B2' : 'C1'}) • UNIT {unit.unitNumber}
            </Text>
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
                accessibilityLabel={`${lesson.title}, ${
                  lesson.isCompleted
                    ? 'Completed'
                    : lesson.isUnlocked
                    ? 'Available'
                    : 'Locked'
                }`}
                onPress={() => handleLessonNodePress(lesson, unit)}
                style={[
                  styles.lessonNode,
                  lesson.isCompleted && styles.lessonNodeCompleted,
                  lesson.isCurrent && styles.lessonNodeCurrent,
                  !lesson.isUnlocked && !lesson.isCompleted && styles.lessonNodeLocked,
                ]}
              >
                {/* Top Specular Sheen for 3D depth */}
                <View style={styles.stoneSheen} />
                {lesson.isCompleted ? (
                  <Check size={32} color={COLORS.white} strokeWidth={3.5} />
                ) : !lesson.isUnlocked ? (
                  <Lock size={28} color={COLORS.grayBorderDark} />
                ) : (
                  <Star size={34} color={COLORS.white} fill={COLORS.white} />
                )}
              </Pressable>

              {/* Best Score Badge / Repeat Indicator */}
              {lesson.bestScore > 0 ? (
                <View
                  style={[
                    styles.nodeScoreBadge,
                    lesson.isCompleted ? styles.nodeScoreBadgePass : styles.nodeScoreBadgeRepeat,
                  ]}
                >
                  {lesson.isCompleted ? (
                    <Trophy size={10} color="#854D0E" />
                  ) : null}
                  <Text
                    style={[
                      styles.nodeScoreBadgeText,
                      lesson.isCompleted ? styles.nodeScoreBadgePassText : styles.nodeScoreBadgeRepeatText,
                    ]}
                  >
                    {lesson.isCompleted ? `${lesson.bestScore}%` : `Repeat (${lesson.bestScore}%)`}
                  </Text>
                </View>
              ) : null}

              {/* Ground contact shadow under each 3D stepping stone island */}
              <View style={styles.stoneGroundShadow} />
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderBar />

      <FlatList
        data={units}
        keyExtractor={(item) => item.id || `unit-${item.unitNumber}`}
        renderItem={renderUnitItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.scrollContent}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={7}
        removeClippedSubviews={Platform.OS === 'android'}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      />

      {/* Maya 3D Character Pre-Lesson Intro Modal */}
      <CharacterIntroModal
        visible={Boolean(selectedLessonModal)}
        onClose={() => setSelectedLessonModal(null)}
        onStart={() => selectedLessonModal && handleStartLesson(selectedLessonModal.id)}
        lesson={selectedLessonModal}
        targetLanguage={targetLang}
        languageName={languageName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    paddingBottom: 60,
  },
  learnerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 14,
    padding: 14,
    borderRadius: 24,
    ...SHADOWS.card3D,
  },
  learnerBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learnerTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.charcoal,
  },
  streakBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
    backgroundColor: '#FEF3C7',
    borderWidth: 1.5,
    borderColor: '#FCD34D',
    borderBottomWidth: 3,
    borderBottomColor: '#F59E0B',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  streakBadgeText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#D97706',
  },
  levelCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 14,
    padding: 16,
    borderRadius: 24,
    ...SHADOWS.card3D,
  },
  levelCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  levelIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FEF3C7',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderBottomWidth: 3,
    borderBottomColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.grayText,
    textTransform: 'uppercase',
  },
  levelValue: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.charcoal,
  },
  levelPercentText: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.gold,
  },
  levelBarBackground: {
    height: 14,
    backgroundColor: '#E2E8F0',
    borderRadius: RADII.pill,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  levelBarFill: {
    height: '100%',
    backgroundColor: COLORS.gold,
    borderRadius: RADII.pill,
    borderTopWidth: 2,
    borderTopColor: 'rgba(255, 255, 255, 0.45)',
  },
  skillsSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.charcoal,
    marginBottom: 10,
  },
  skillsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 12,
    ...SHADOWS.card3D,
  },
  skillItem: {
    alignItems: 'center',
    flex: 1,
  },
  skillIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1.5,
    borderBottomWidth: 3.5,
  },
  skillLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  nextLessonBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
    padding: 14,
    borderRadius: 24,
    ...SHADOWS.card3D,
  },
  nextLessonThumbnail: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
  },
  nextLessonInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nextLessonTag: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primaryDark,
    textTransform: 'uppercase',
  },
  nextLessonTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.charcoal,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.grayText,
  },
  nextLessonButton: {
    backgroundColor: '#8B5CF6',
    borderWidth: 1.5,
    borderColor: '#A78BFA',
    borderBottomWidth: 4,
    borderBottomColor: '#6D28D9',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
    ...SHADOWS.float,
  },
  nextLessonButtonText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 13,
  },
  unitContainer: {
    marginTop: 14,
    marginHorizontal: 16,
  },
  unitBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 26,
    borderWidth: 2,
    borderBottomWidth: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 6,
  },
  sectionBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.pill,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  sectionBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  unitBannerTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: -0.3,
  },
  unitBannerDesc: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 3,
    fontWeight: '600',
  },
  guidebookButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  pathWrapper: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 20,
  },
  nodeWrapper: {
    alignItems: 'center',
    position: 'relative',
  },
  startBadgeWrapper: {
    position: 'absolute',
    top: -38,
    alignItems: 'center',
    zIndex: 10,
  },
  startBadge: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADII.pill,
    ...SHADOWS.card3D,
  },
  startBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.primaryDark,
    letterSpacing: 0.8,
  },
  startBadgeArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#E2E8F0',
    marginTop: -1,
  },
  lessonNode: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    borderBottomWidth: 7,
    borderBottomColor: COLORS.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 6,
  },
  lessonNodeCompleted: {
    backgroundColor: COLORS.gold,
    borderColor: '#FDE68A',
    borderBottomColor: COLORS.goldDark,
  },
  lessonNodeCurrent: {
    transform: [{ scale: 1.06 }],
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
  lessonNodeLocked: {
    backgroundColor: '#E2E8F0',
    borderColor: '#CBD5E1',
    borderBottomWidth: 6,
    borderBottomColor: '#94A3B8',
  },
  stoneGroundShadow: {
    width: 64,
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(15, 23, 42, 0.12)',
    marginTop: 4,
    alignSelf: 'center',
  },
  stoneSheen: {
    position: 'absolute',
    top: 5,
    width: 48,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  nodeScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 6,
    borderWidth: 1,
    alignSelf: 'center',
    zIndex: 10,
  },
  nodeScoreBadgePass: {
    backgroundColor: '#FEF9C3',
    borderColor: '#FACC15',
  },
  nodeScoreBadgeRepeat: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  nodeScoreBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  nodeScoreBadgePassText: {
    color: '#854D0E',
  },
  nodeScoreBadgeRepeatText: {
    color: '#B45309',
  },
});
