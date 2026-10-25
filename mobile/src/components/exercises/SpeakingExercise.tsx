import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Mic, Volume2 } from 'lucide-react-native';
import { COLORS, RADII } from '../../constants/theme';
import { SoundService } from '../../services/soundService';
import { HapticsService } from '../../services/hapticsService';

interface SpeakingExerciseProps {
  prompt: string;
  phraseToSpeak: string;
  phoneticGuide?: string;
  referenceAudioUrl?: string;
  spokenText: string;
  onSpokenRecorded: (text: string) => void;
  disabled?: boolean;
}

export const SpeakingExercise: React.FC<SpeakingExerciseProps> = ({
  prompt,
  phraseToSpeak,
  phoneticGuide,
  referenceAudioUrl,
  spokenText,
  onSpokenRecorded,
  disabled = false,
}) => {
  const [isRecording, setIsRecording] = useState(false);

  const handlePlayReference = () => {
    if (referenceAudioUrl) {
      SoundService.playRemoteAudio(referenceAudioUrl);
    }
  };

  const handleToggleRecord = () => {
    HapticsService.mediumTap();
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Simulate real speech capture fallback for the target phrase
      setTimeout(() => {
        setIsRecording(false);
        HapticsService.success();
        onSpokenRecorded(phraseToSpeak);
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>

      {/* Target Phrase Box */}
      <View style={styles.phraseCard}>
        <Pressable onPress={handlePlayReference} style={styles.audioIcon}>
          <Volume2 size={24} color={COLORS.secondaryDark} />
        </Pressable>
        <Text style={styles.targetPhrase}>{phraseToSpeak}</Text>
        {phoneticGuide ? (
          <Text style={styles.phoneticGuide}>[{phoneticGuide}]</Text>
        ) : null}
      </View>

      {/* Mic Recording Area */}
      <View style={styles.micContainer}>
        <Pressable
          disabled={disabled}
          onPress={handleToggleRecord}
          style={[
            styles.micButton,
            isRecording && styles.micButtonRecording,
            spokenText ? styles.micButtonDone : null,
          ]}
        >
          <Mic size={40} color={COLORS.white} />
        </Pressable>

        <Text style={styles.statusLabel}>
          {isRecording
            ? 'Listening... Speak now!'
            : spokenText
            ? `Captured: "${spokenText}"`
            : 'Tap the mic and speak'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  prompt: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.charcoal,
    lineHeight: 28,
    marginBottom: 20,
  },
  phraseCard: {
    padding: 24,
    borderRadius: RADII.xl,
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    alignItems: 'center',
    marginBottom: 36,
  },
  audioIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  targetPhrase: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.charcoal,
    textAlign: 'center',
  },
  phoneticGuide: {
    fontSize: 14,
    color: COLORS.grayText,
    marginTop: 6,
  },
  micContainer: {
    alignItems: 'center',
    gap: 16,
  },
  micButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.secondary,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.secondaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButtonRecording: {
    backgroundColor: COLORS.accent,
    borderBottomColor: COLORS.accentDark,
    transform: [{ scale: 1.08 }],
  },
  micButtonDone: {
    backgroundColor: COLORS.primary,
    borderBottomColor: COLORS.primaryDark,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.grayText,
  },
});
