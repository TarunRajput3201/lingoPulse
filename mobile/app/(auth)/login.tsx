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
import { Mail, Lock, Eye, EyeOff, Sparkles, Heart } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY, LAYOUT } from '../../src/constants/theme';
import { Button3D } from '../../src/components/Button3D';
import { MascotPip } from '../../src/components/MascotPip';
import { useAuth } from '../../src/context/AuthContext';
import { HapticsService } from '../../src/services/hapticsService';

export default function LoginScreen() {
  const router = useRouter();
  const { login, continueAsGuest } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setErrorMsg('');
    setLoading(true);
    const res = await login(email.trim(), password);
    setLoading(false);

    if (res.success) {
      HapticsService.success();
      router.replace('/(tabs)');
    } else {
      HapticsService.error();
      setErrorMsg(res.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleGuestLogin = async () => {
    Keyboard.dismiss();
    HapticsService.mediumTap();
    await continueAsGuest();
    router.replace('/(tabs)');
  };

  const handleDemoLogin = () => {
    HapticsService.lightTap();
    setEmail('learner@lingopulse.com');
    setPassword('LearnerPassword123!');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardContainer}>
            {/* Mascot Welcome Header */}
            <View style={styles.mascotWrapper}>
              <MascotPip mood="happy" size={104} message="Welcome back! Ready to learn?" />
            </View>

            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>Continue your daily learning streak</Text>

            {errorMsg ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            <View style={styles.form}>
              {/* Email Field */}
              <View>
                <Text style={styles.label}>Email Address</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    isEmailFocused && styles.inputWrapperFocused,
                  ]}
                >
                  <Mail
                    size={20}
                    color={isEmailFocused ? COLORS.secondaryDark : COLORS.grayLight}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    placeholder="e.g. learner@lingopulse.com"
                    placeholderTextColor="#94A3B8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                  />
                </View>
              </View>

              {/* Password Field */}
              <View>
                <Text style={styles.label}>Password</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    isPasswordFocused && styles.inputWrapperFocused,
                  ]}
                >
                  <Lock
                    size={20}
                    color={isPasswordFocused ? COLORS.secondaryDark : COLORS.grayLight}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    placeholder="••••••••"
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
                title="Log In"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                fullWidth
                style={styles.submitButton}
              />

              {/* Instant Offline / Guest Learning */}
              <Button3D
                title="Start Learning (10 Free Hearts)"
                variant="secondary"
                onPress={handleGuestLogin}
                fullWidth
                icon={<Heart size={16} color={COLORS.white} fill={COLORS.white} />}
                style={styles.guestButton}
              />

              {/* Quick Demo Fill Button */}
              <Button3D
                title="Use Demo Account"
                variant="outline"
                onPress={handleDemoLogin}
                fullWidth
                icon={<Sparkles size={16} color={COLORS.goldDark} />}
                style={styles.demoButton}
              />

              <View style={styles.switchAuthRow}>
                <Text style={styles.switchText}>Don't have an account? </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Switch to sign up"
                  onPress={() => router.push('/(auth)/register')}
                >
                  <Text style={styles.switchLink}>Sign Up</Text>
                </Pressable>
              </View>
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
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'web' ? 40 : 32,
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    maxWidth: LAYOUT.authMaxWidth,
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 28,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderBottomWidth: 5,
    borderBottomColor: '#CBD5E1',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  mascotWrapper: {
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '900',
    color: COLORS.charcoal,
    textAlign: 'center',
    marginTop: 6,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.grayText,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
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
    gap: 14,
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
    borderColor: '#E2E8F0',
    borderRadius: RADII.lg,
    paddingHorizontal: 14,
    minHeight: 50,
  },
  inputWrapperFocused: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.white,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.secondaryDark,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.charcoal,
    fontWeight: '600',
  },
  eyeBtn: {
    padding: 8,
  },
  submitButton: {
    marginTop: 6,
  },
  guestButton: {
    marginTop: 2,
  },
  demoButton: {
    marginTop: 2,
  },
  switchAuthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
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
