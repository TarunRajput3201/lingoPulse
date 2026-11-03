import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { COLORS, RADII } from '../../constants/theme';

const { width } = Dimensions.get('window');

export const LearningPathSkeleton: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.85,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  // Stepping node horizontal offsets
  const nodeOffsets = [0, 24, -18, 20, 0];

  return (
    <View style={styles.container}>
      {/* Header Bar Skeleton */}
      <View style={styles.headerBar}>
        <Animated.View style={[styles.shimmerPill, { opacity: pulseAnim, width: 85 }]} />
        <View style={styles.headerRight}>
          <Animated.View style={[styles.shimmerPill, { opacity: pulseAnim, width: 55 }]} />
          <Animated.View style={[styles.shimmerPill, { opacity: pulseAnim, width: 55 }]} />
          <Animated.View style={[styles.shimmerPill, { opacity: pulseAnim, width: 55 }]} />
        </View>
      </View>

      {/* Unit Banner Skeleton */}
      <Animated.View style={[styles.unitBanner, { opacity: pulseAnim }]}>
        <View style={styles.unitHeaderRow}>
          <View style={[styles.shimmerBar, { width: 90, height: 14 }]} />
          <View style={[styles.shimmerBar, { width: 60, height: 14 }]} />
        </View>
        <View style={[styles.shimmerBar, { width: 180, height: 22, marginTop: 10 }]} />
        <View style={[styles.shimmerBar, { width: 240, height: 14, marginTop: 8 }]} />
      </Animated.View>

      {/* Path Nodes Skeleton */}
      <View style={styles.nodesContainer}>
        {nodeOffsets.map((offset, idx) => (
          <View
            key={idx}
            style={[
              styles.nodeRow,
              { transform: [{ translateX: offset }] },
            ]}
          >
            <Animated.View
              style={[
                styles.nodeCircle,
                idx === 0 && styles.firstNodeCircle,
                { opacity: pulseAnim },
              ]}
            />
          </View>
        ))}
      </View>

      {/* Character Companion Floating Skeleton */}
      <View style={styles.characterContainer}>
        <Animated.View style={[styles.characterCircle, { opacity: pulseAnim }]} />
        <Animated.View style={[styles.speechCard, { opacity: pulseAnim }]}>
          <View style={[styles.shimmerBar, { width: 140, height: 14 }]} />
          <View style={[styles.shimmerBar, { width: 100, height: 12, marginTop: 6 }]} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FA',
    paddingTop: 8,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: COLORS.white,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  shimmerPill: {
    height: 32,
    borderRadius: RADII.pill,
    backgroundColor: '#E2E8F0',
  },
  shimmerBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 6,
  },
  unitBanner: {
    marginHorizontal: 16,
    marginTop: 14,
    padding: 18,
    borderRadius: RADII.xl,
    backgroundColor: '#10B981',
    borderBottomWidth: 4,
    borderBottomColor: '#059669',
  },
  unitHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nodesContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 28,
  },
  nodeRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#E2E8F0',
    borderBottomWidth: 5,
    borderBottomColor: '#CBD5E1',
  },
  firstNodeCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FEF08A',
    borderBottomWidth: 5,
    borderBottomColor: '#FACC15',
  },
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 14,
    marginTop: 8,
  },
  characterCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#E2E8F0',
    borderWidth: 2,
    borderColor: '#CBD5E1',
  },
  speechCard: {
    flex: 1,
    padding: 14,
    backgroundColor: COLORS.white,
    borderRadius: RADII.lg,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3,
  },
});
