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
import { Check, Globe, Sparkles } from 'lucide-react-native';
import { COLORS, RADII } from '../../src/constants/theme';
import { HeaderBar } from '../../src/components/HeaderBar';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';
import { HapticsService } from '../../src/services/hapticsService';

export default function CoursesScreen() {
  const router = useRouter();
  const { user, token, refreshUser } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(ENDPOINTS.COURSES, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [token]);

  const handleSelectCourse = async (course: any) => {
    HapticsService.lightTap();
    if (!token) return;
    try {
      // Update user target language
      await fetch(ENDPOINTS.PROFILE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetLanguage: course.toLanguage }),
      });
      await refreshUser();
      router.push('/(tabs)');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerTitleContainer}>
          <Globe size={24} color={COLORS.secondary} />
          <Text style={styles.headerTitle}>Language Courses</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Choose your active language. Your progress is saved independently across all courses.
        </Text>

        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} style={{ marginTop: 24 }} />
        ) : (
          <View style={styles.coursesList}>
            {courses.map((course) => {
              const isCurrent = user?.targetLanguage === course.toLanguage;
              return (
                <Pressable
                  key={course._id}
                  onPress={() => handleSelectCourse(course)}
                  style={[
                    styles.courseCard,
                    isCurrent && styles.courseCardActive,
                  ]}
                >
                  <Text style={styles.flagEmoji}>{course.flagIcon}</Text>
                  <View style={styles.courseDetails}>
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    <Text style={styles.courseDesc}>{course.description}</Text>
                    <View style={styles.metricsRow}>
                      <Text style={styles.metricText}>
                        {course.totalUnits || 2} Units • {course.totalLessons || 4} Lessons
                      </Text>
                    </View>
                  </View>

                  {isCurrent ? (
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
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 22,
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
    padding: 16,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
  },
  courseCardActive: {
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
    backgroundColor: '#F0F9FF',
  },
  flagEmoji: {
    fontSize: 36,
    marginRight: 16,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  courseDesc: {
    fontSize: 12,
    color: COLORS.grayText,
    marginTop: 2,
    lineHeight: 16,
  },
  metricsRow: {
    marginTop: 6,
  },
  metricText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondaryDark,
  },
  activeCheckBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
