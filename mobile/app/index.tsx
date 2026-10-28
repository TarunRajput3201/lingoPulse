import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { COLORS } from '../src/constants/theme';
import { MascotPip } from '../src/components/MascotPip';

export default function RootIndex() {
  const router = useRouter();
  const { user, token, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!token || !user) {
      router.replace('/(auth)/login');
    } else if (!user.hasCompletedOnboarding) {
      router.replace('/onboarding');
    } else {
      router.replace('/(tabs)');
    }
  }, [isLoading, token, user]);

  return (
    <View style={styles.container}>
      <MascotPip mood="happy" size={100} message="LingoPulse" />
      <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 24 }} />
      <Text style={styles.text}>Starting LingoPulse...</Text>
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
  text: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.grayText,
  },
});
