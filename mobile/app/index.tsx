import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { COLORS, RADII, TYPOGRAPHY } from '../src/constants/theme';
import { MascotPip } from '../src/components/MascotPip';

export default function RootIndex() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();
  const [showManualContinue, setShowManualContinue] = useState(false);
  const hasNavigatedRef = useRef(false);

  const performNavigation = useCallback(() => {
    if (hasNavigatedRef.current) return;

    try {
      if (!token || !user) {
        hasNavigatedRef.current = true;
        router.replace('/(auth)/login');
      } else if (!user.hasCompletedOnboarding) {
        hasNavigatedRef.current = true;
        router.replace('/onboarding/index');
      } else {
        hasNavigatedRef.current = true;
        router.replace('/(tabs)');
      }
    } catch (e) {
      console.warn('[RootIndex] Navigation error, allowing retry:', e);
      hasNavigatedRef.current = false;
    }
  }, [token, user, router]);

  // Main transition effect
  useEffect(() => {
    if (isLoading) return;

    const initialTimer = setTimeout(() => {
      performNavigation();
    }, 60);

    // Watchdog retry: In case navigator wasn't ready on first tick
    const retryInterval = setInterval(() => {
      if (!hasNavigatedRef.current) {
        performNavigation();
      }
    }, 400);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(retryInterval);
    };
  }, [isLoading, performNavigation]);

  // Fail-safe watchdog: Guarantee manual continue button appears if screen doesn't transition within 1.2s
  useEffect(() => {
    const watchdog = setTimeout(() => {
      if (!hasNavigatedRef.current) {
        performNavigation();
        setShowManualContinue(true);
      }
    }, 1200);

    return () => clearTimeout(watchdog);
  }, [performNavigation]);

  const handleManualPress = () => {
    hasNavigatedRef.current = false;
    performNavigation();
  };

  return (
    <View style={styles.container}>
      <MascotPip mood="happy" size={110} message="LingoPulse" />
      <Text style={styles.appName}>LingoPulse</Text>
      <Text style={styles.tagline}>Learn languages naturally & effortlessly</Text>

      {!showManualContinue ? (
        <>
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 28 }} />
          <Text style={styles.loadingText}>Starting your journey...</Text>
        </>
      ) : (
        <View style={styles.fallbackContainer}>
          <Pressable
            style={styles.continueButton}
            onPress={handleManualPress}
            accessibilityRole="button"
            accessibilityLabel="Continue to application"
          >
            <Text style={styles.continueButtonText}>Start Learning →</Text>
          </Pressable>
          <Text style={styles.readyText}>Your learning journey is ready</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 24,
  },
  appName: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '900',
    color: COLORS.charcoal,
    marginTop: 12,
  },
  tagline: {
    fontSize: 14,
    color: COLORS.grayText,
    marginTop: 4,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 14,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.grayLight,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  fallbackContainer: {
    marginTop: 28,
    alignItems: 'center',
    width: '100%',
    maxWidth: 280,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: RADII.lg,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.primaryDark,
    width: '100%',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  readyText: {
    marginTop: 10,
    fontSize: 12,
    color: COLORS.grayText,
    fontWeight: '600',
  },
});
