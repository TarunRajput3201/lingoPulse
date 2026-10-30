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
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../src/constants/theme';
import { Button3D } from '../../src/components/Button3D';
import { MascotPip } from '../../src/components/MascotPip';
import { useAuth } from '../../src/context/AuthContext';
import { HapticsService } from '../../src/services/hapticsService';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    Keyboard.dismiss();
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
      displayName: username.trim(),
      nativeLanguage: 'en',
      targetLanguage: 'es',
    });
    setLoading(false);

    if (res.success) {
      HapticsService.success();
      router.replace('/onboarding/index');
    } else {
      HapticsService.error();
      setErrorMsg(res.message || 'Registration failed.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <MascotPip mood="celebrating" size={110} message="Start your learning adventure today!" />

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join millions mastering languages daily</Text>

          {errorMsg ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : null}

          <View style={styles.form}>
            {/* Username */}
            <View>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputWrapper}>
                <User size={20} color={COLORS.grayLight} style={styles.inputIcon} />
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="e.g. maria_explorer"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                />
              </View>
            </View>

            {/* Email Address */}
            <View>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Mail size={20} color={COLORS.grayLight} style={styles.inputIcon} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="e.g. maria@example.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={20} color={COLORS.grayLight} style={styles.inputIcon} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="At least 6 characters"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  style={styles.input}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={COLORS.grayText} />
                  ) : (
                    <Eye size={20} color={COLORS.grayText} />
                  )}
                </Pressable>
              </View>
            </View>

            <Button3D
              title="Create Account"
              onPress={handleRegister}
              loading={loading}
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
    </TouchableWithoutFeedback>
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
    fontSize: TYPOGRAPHY.sizes.display,
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
    backgroundColor: COLORS.accentSubtle,
    borderWidth: 1.5,
    borderColor: '#F87171',
    padding: 12,
    borderRadius: RADII.md,
    marginBottom: 16,
  },
  errorText: {
    color: COLORS.accentDark,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.charcoal,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    borderRadius: RADII.lg,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.charcoal,
    fontWeight: '600',
  },
  eyeBtn: {
    padding: 8,
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
    color: COLORS.secondary,
  },
});
