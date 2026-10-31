import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Check, Globe, Sparkles, BookOpen } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../src/constants/theme';
import { HeaderBar } from '../../src/components/HeaderBar';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';
import { HapticsService } from '../../src/services/hapticsService';
import { CurriculumService } from '../../src/services/curriculumService';

export default function CoursesScreen() {
  const router = useRouter();
  const { user, token, updateUserLocally } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [switchingId, setSwitchingId] = useState<string | null>(null);

  useEffect(() => {
    // 1. Instant load from local static catalog
    CurriculumService.getCourses().then((localList) => {
      setCourses(localList);
      setLoading(false);
    });

    // 2. Optional remote fetch
    if (token && !token.startsWith('local-')) {
      fetch(ENDPOINTS.COURSES, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.courses?.length) {
            setCourses(data.courses);
          }
        })
        .catch(() => {});
    }
  }, [token]);

  const handleSelectCourse = async (course: any) => {
    HapticsService.lightTap();
    if (switchingId) return;

    setSwitchingId(course._id || course.id);
    try {
      updateUserLocally((prev) =>
        prev ? { ...prev, targetLanguage: course.toLanguage } : null
      );

      // Optional cloud sync
      if (token && !token.startsWith('local-')) {
        fetch(ENDPOINTS.PROFILE, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ targetLanguage: course.toLanguage }),
        }).catch(() => {});
      }

      HapticsService.success();
      router.push('/(tabs)');
    } catch (e) {
      console.warn('[CoursesScreen] Switch notice:', e);
    } finally {
      setSwitchingId(null);
    }
  };


  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerTitleContainer}>
          <Globe size={26} color={COLORS.secondary} />
          <Text style={styles.headerTitle}>Language Courses</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Choose your active language course. Your learning progress and streaks are preserved independently across all languages.
        </Text>

        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} style={{ marginTop: 24 }} />
        ) : (
          <View style={styles.coursesList}>
            {courses.map((course) => {
              const isCurrent = user?.targetLanguage?.toLowerCase() === course.toLanguage?.toLowerCase();
              const isSwitching = switchingId === course._id;

              return (
                <Pressable
                  key={course._id}
                  disabled={isSwitching}
                  onPress={() => handleSelectCourse(course)}
                  style={[
                    styles.courseCard,
                    isCurrent && styles.courseCardActive,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Course: ${course.title}. ${isCurrent ? 'Currently active' : 'Tap to switch'}`}
                >
                  <Text style={styles.flagEmoji}>{course.flagIcon || '🌐'}</Text>

                  <View style={styles.courseDetails}>
                    <View style={styles.titleRow}>
                      <Text style={styles.courseTitle}>{course.title}</Text>
                      <View style={styles.cefrBadge}>
                        <Text style={styles.cefrText}>CEFR {course.level || 'A1'}</Text>
                      </View>
                    </View>

                    <Text style={styles.courseDesc}>{course.description}</Text>

                    <View style={styles.metricsRow}>
                      <BookOpen size={14} color={COLORS.grayText} />
                      <Text style={styles.metricText}>
                        {course.totalUnits || 2} Units • {course.totalLessons || 4} Lessons
                      </Text>
                    </View>
                  </View>

                  {isSwitching ? (
                    <ActivityIndicator size="small" color={COLORS.secondary} style={{ marginLeft: 8 }} />
                  ) : isCurrent ? (
                    <View style={styles.activeCheckBadge}>
                      <Check size={18} color={COLORS.white} strokeWidth={3} />
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
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
  coursesList: {
    gap: 14,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: '#CBD5E1',
  },
  courseCardActive: {
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
    backgroundColor: COLORS.secondarySubtle,
  },
  flagEmoji: {
    fontSize: 38,
    marginRight: 16,
  },
  courseDetails: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  cefrBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADII.xs,
    backgroundColor: '#F1F5F9',
  },
  cefrText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.grayText,
  },
  courseDesc: {
    fontSize: 12,
    color: COLORS.grayText,
    marginTop: 3,
    lineHeight: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  metricText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.grayText,
  },
  activeCheckBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
