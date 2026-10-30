import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { COLORS, RADII, TYPOGRAPHY } from '../src/constants/theme';
import { MascotPip } from '../src/components/MascotPip';

export default function RootIndex() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!token || !user) {
      router.replace('/(auth)/login');
    } else if (!user.hasCompletedOnboarding) {
      router.replace('/onboarding/index');
    } else {
      router.replace('/(tabs)');
    }
  }, [isLoading, token, user]);

  return (
    <View style={styles.container}>
      <MascotPip mood="happy" size={110} message="LingoPulse" />
      <Text style={styles.appName}>LingoPulse</Text>
      <Text style={styles.tagline}>Learn languages naturally & effortlessly</Text>

      <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 28 }} />
      <Text style={styles.loadingText}>Starting your journey...</Text>
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
});
