import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Check, Lock, Star, Sparkles } from 'lucide-react-native';
import { COLORS, RADII } from '../../src/constants/theme';
import { HeaderBar } from '../../src/components/HeaderBar';
import { Button3D } from '../../src/components/Button3D';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';
import { HapticsService } from '../../src/services/hapticsService';

export default function HomeScreen() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);
  const [units, setUnits] = useState<any[]>([]);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  // If learner is not logged in, redirect to login
  useEffect(() => {
    if (!token && !loading) {
      router.replace('/(auth)/login');
    }
  }, [token, loading]);

  const loadLearningPath = async () => {
    if (!token) return;
    try {
      // 1. Fetch available courses to get current course ID
      const courseRes = await fetch(ENDPOINTS.COURSES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const courseJson = await courseRes.json();
      const firstCourse = courseJson.courses?.[0];

      if (firstCourse) {
        // 2. Fetch learning path for this course
        const pathRes = await fetch(ENDPOINTS.COURSE_PATH(firstCourse._id), {
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

  const handleLessonPress = (lesson: any) => {
    if (lesson.isLocked) {
      HapticsService.error();
      return;
    }
    HapticsService.lightTap();
    router.push(`/lesson/${lesson.id}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading your learning path...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }
      >
        {units.map((unit, unitIdx) => (
          <View key={unit.id} style={styles.unitSection}>
            {/* Unit Header Card */}
            <View
              style={[
                styles.unitHeaderCard,
                { backgroundColor: unit.themeColor || COLORS.primary },
              ]}
            >
              <View>
                <Text style={styles.unitBadge}>Unit {unit.unitNumber}</Text>
                <Text style={styles.unitTitle}>{unit.title}</Text>
                <Text style={styles.unitDesc}>{unit.description}</Text>
              </View>
              <View style={styles.unitSparkle}>
                <Sparkles size={24} color={COLORS.white} />
              </View>
            </View>

            {/* Winding Path of Lesson Nodes */}
            <View style={styles.pathWrapper}>
              {(unit.lessons || []).map((lesson: any, lessonIdx: number) => {
                // Compute horizontal offset for Duolingo-like S-curve
                const offsets = [0, 45, 0, -45];
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
                      onPress={() => handleLessonPress(lesson)}
                      style={[
                        styles.lessonNode,
                        lesson.isCompleted && styles.lessonNodeCompleted,
                        lesson.isCurrent && styles.lessonNodeCurrent,
                        lesson.isLocked && styles.lessonNodeLocked,
                      ]}
                    >
                      {lesson.isCompleted ? (
                        <Check size={32} color={COLORS.white} strokeWidth={3.5} />
                      ) : lesson.isCurrent ? (
                        <Star size={32} color={COLORS.white} fill={COLORS.white} />
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
        ))}
      </ScrollView>

      {/* Floating Continue Bottom Button */}
      {currentLessonId && (
        <View style={styles.floatingButtonContainer}>
          <Button3D
            title="Continue Learning"
            onPress={() => router.push(`/lesson/${currentLessonId}`)}
            style={styles.continueButton}
          />
        </View>
      )}
    </View>
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
  scrollContent: {
    paddingBottom: 120,
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
    shadowColor: '#000',
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
    gap: 28,
  },
  nodeContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  startBubble: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADII.pill,
    position: 'absolute',
    top: -38,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startBubbleText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.primaryDark,
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
    borderTopColor: COLORS.grayBorder,
  },
  lessonNode: {
    width: 76,
    height: 76,
    borderRadius: 38,
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
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 12,
    left: 20,
    right: 20,
  },
  continueButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
});
