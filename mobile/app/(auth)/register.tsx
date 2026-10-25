import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, RADII } from '../../src/constants/theme';
import { Button3D } from '../../src/components/Button3D';
import { MascotPip } from '../../src/components/MascotPip';
import { useAuth } from '../../src/context/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setErrorMsg('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setErrorMsg('');
    setLoading(true);
    const res = await register({
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      password,
      displayName: username,
      nativeLanguage: 'en',
      targetLanguage: 'es',
    });
    setLoading(false);

    if (res.success) {
      router.replace('/onboarding');
    } else {
      setErrorMsg(res.message || 'Registration failed.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MascotPip mood="celebrating" size={110} message="Start your learning adventure today!" />

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join millions mastering languages daily</Text>

        {errorMsg ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="e.g. maria_explorer"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="e.g. maria@example.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="At least 6 characters"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <Button3D
            title={loading ? 'Creating...' : 'Create Account'}
            onPress={handleRegister}
            disabled={loading}
            style={styles.submitButton}
          />

          <View style={styles.switchAuthRow}>
            <Text style={styles.switchText}>Already have an account? </Text>
            <Pressable onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.switchLink}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.charcoal,
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.grayText,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#F87171',
    padding: 12,
    borderRadius: RADII.md,
    marginBottom: 16,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.charcoal,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    borderRadius: RADII.lg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.charcoal,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 8,
  },
  switchAuthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  switchText: {
    fontSize: 14,
    color: COLORS.grayText,
  },
  switchLink: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.secondaryDark,
  },
});
