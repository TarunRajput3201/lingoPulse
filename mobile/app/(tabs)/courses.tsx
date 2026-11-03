import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Check, Globe, BookOpen, Search, X } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../src/constants/theme';
import { HeaderBar } from '../../src/components/HeaderBar';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';
import { HapticsService } from '../../src/services/hapticsService';
import { StorageService } from '../../src/services/storageService';
import { CurriculumService } from '../../src/services/curriculumService';

const REGIONS = [
  'All',
  'Popular',
  'European',
  'Asian',
  'Middle Eastern',
  'Indian',
  'African',
] as const;

export default function CoursesScreen() {
  const router = useRouter();
  const { user, token, updateUserLocally } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [switchingId, setSwitchingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

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

    const courseKey = course._id || course.id || course.code;
    setSwitchingId(courseKey);
    try {
      updateUserLocally((prev) =>
        prev ? { ...prev, targetLanguage: course.toLanguage } : null
      );

      await StorageService.setItem('lingopulse_active_course_code', course.code);
      await StorageService.setItem('lingopulse_active_target_lang', course.toLanguage);

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
      router.replace('/(tabs)');
    } catch (e) {
      console.warn('[CoursesScreen] Switch notice:', e);
    } finally {
      setSwitchingId(null);
    }
  };

  // Filtered courses based on search & region
  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return courses.filter((c) => {
      // Region filter
      if (selectedRegion === 'Popular') {
        const isPopular = (c.order && c.order <= 10) || ['es', 'fr', 'de', 'ja', 'it', 'ko', 'zh', 'pt', 'hi', 'en'].includes(c.toLanguage?.toLowerCase());
        if (!isPopular) return false;
      } else if (selectedRegion !== 'All') {
        if (c.region?.toLowerCase() !== selectedRegion.toLowerCase()) {
          return false;
        }
      }

      // Search query filter
      if (!q) return true;
      const titleMatch = c.title?.toLowerCase().includes(q);
      const nativeMatch = c.nativeName?.toLowerCase().includes(q);
      const codeMatch = c.code?.toLowerCase().includes(q) || c.toLanguage?.toLowerCase().includes(q);
      const descMatch = c.description?.toLowerCase().includes(q);
      return titleMatch || nativeMatch || codeMatch || descMatch;
    });
  }, [courses, searchQuery, selectedRegion]);

  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerTitleContainer}>
          <Globe size={26} color={COLORS.secondary} />
          <Text style={styles.headerTitle}>Language Courses</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Explore 38 comprehensive language courses. Your learning progress and streaks are preserved independently across all languages.
        </Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={18} color={COLORS.grayText} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search language, script, or country..."
            placeholderTextColor={COLORS.grayText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery ? (
            <Pressable onPress={() => setSearchQuery('')} hitSlop={8} style={styles.clearSearchBtn}>
              <X size={16} color={COLORS.grayText} />
            </Pressable>
          ) : null}
        </View>

        {/* Region Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.regionFilterRow}
        >
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <Pressable
                key={region}
                onPress={() => {
                  HapticsService.lightTap();
                  setSelectedRegion(region);
                }}
                style={[styles.regionChip, isSelected && styles.regionChipSelected]}
              >
                <Text
                  style={[styles.regionChipText, isSelected && styles.regionChipTextSelected]}
                >
                  {region} {region === 'All' ? `(${courses.length})` : ''}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} style={{ marginTop: 24 }} />
        ) : filteredCourses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No courses found</Text>
            <Text style={styles.emptySubtitle}>Try searching with different terms or select "All".</Text>
          </View>
        ) : (
          <View style={styles.coursesList}>
            {filteredCourses.map((course) => {
              const isCurrent = user?.targetLanguage?.toLowerCase() === course.toLanguage?.toLowerCase();
              const courseKey = course._id || course.id || course.code;
              const isSwitching = switchingId === courseKey;

              return (
                <Pressable
                  key={courseKey}
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
                      {course.nativeName ? (
                        <Text style={styles.nativeScriptBadge}>
                          {course.nativeName}
                        </Text>
                      ) : null}
                      {course.isRTL ? (
                        <View style={styles.rtlBadge}>
                          <Text style={styles.rtlText}>RTL</Text>
                        </View>
                      ) : null}
                      <View style={styles.cefrBadge}>
                        <Text style={styles.cefrText}>CEFR {course.level || 'A1–C1'}</Text>
                      </View>
                    </View>

                    <Text style={styles.courseDesc}>{course.description}</Text>

                    <View style={styles.metricsRow}>
                      <BookOpen size={14} color={COLORS.grayText} />
                      <Text style={styles.metricText}>
                        {course.totalUnits || 50} Units • {course.totalLessons || 250} Lessons
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
    marginBottom: 16,
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADII.lg,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    paddingHorizontal: 12,
    marginBottom: 14,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.charcoal,
  },
  clearSearchBtn: {
    padding: 4,
  },
  regionFilterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
    paddingVertical: 2,
  },
  regionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADII.pill,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
  },
  regionChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  regionChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.grayText,
  },
  regionChipTextSelected: {
    color: COLORS.white,
    fontWeight: '800',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.charcoal,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.grayText,
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
    borderBottomColor: COLORS.grayBorderDark,
  },
  courseCardActive: {
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
    backgroundColor: COLORS.secondarySubtle,
  },
  flagEmoji: {
    fontSize: 36,
    marginRight: 14,
  },
  courseDetails: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  nativeScriptBadge: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.secondary,
    backgroundColor: COLORS.secondarySubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADII.xs,
  },
  rtlBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: RADII.xs,
    backgroundColor: '#FDE047',
  },
  rtlText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#854D0E',
  },
  cefrBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADII.xs,
    backgroundColor: COLORS.surfaceAlt,
  },
  cefrText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.grayText,
  },
  courseDesc: {
    fontSize: 12,
    color: COLORS.grayText,
    marginTop: 4,
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
