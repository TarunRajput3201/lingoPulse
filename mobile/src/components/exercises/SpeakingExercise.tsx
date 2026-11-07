import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Mic, Volume2 } from 'lucide-react-native';
import { COLORS, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';
import { SoundService } from '../../services/soundService';
import { HapticsService } from '../../services/hapticsService';
import { CharacterView } from '../character/CharacterView';
import { AdaptiveEngine } from '../../services/adaptiveEngine';

interface SpeakingExerciseProps {
  prompt: string;
  phraseToSpeak: string;
  phoneticGuide?: string;
  referenceAudioUrl?: string;
  spokenText: string;
  onSpokenRecorded: (text: string) => void;
  targetLanguage?: string;
  disabled?: boolean;
}

export const SpeakingExercise: React.FC<SpeakingExerciseProps> = ({
  prompt,
  phraseToSpeak,
  phoneticGuide,
  referenceAudioUrl,
  spokenText,
  onSpokenRecorded,
  targetLanguage = 'fr',
  disabled = false,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState(false);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      SoundService.stopSpeaking().catch(() => {});
    };
  }, []);

  const handlePlayReference = async () => {
    HapticsService.lightTap();
    await SoundService.stopSpeaking().catch(() => {});
    setIsPlayingAudio(true);
    setAudioError(false);

    const effectiveAudioUrl =
      referenceAudioUrl || SoundService.getTTSAudioUrl(phraseToSpeak, targetLanguage);

    try {
      const ok = await SoundService.speak(phraseToSpeak, {
        lang: targetLanguage,
        rate: 0.88,
        onStart: () => setIsPlayingAudio(true),
        onDone: () => setIsPlayingAudio(false),
        onError: async () => {
          if (effectiveAudioUrl) {
            const played = await SoundService.playRemoteAudio(effectiveAudioUrl, { timeoutMs: 5000 });
            setIsPlayingAudio(false);
            if (!played) setAudioError(true);
          } else {
            setIsPlayingAudio(false);
            setAudioError(true);
          }
        },
      });

      if (!ok && effectiveAudioUrl) {
        await SoundService.playRemoteAudio(effectiveAudioUrl, { timeoutMs: 5000 });
      }

      setTimeout(() => {
        setIsPlayingAudio(false);
      }, Math.max(1500, phraseToSpeak.length * 100));
    } catch {
      setIsPlayingAudio(false);
      setAudioError(true);
    }
  };

  const handleToggleRecord = () => {
    if (disabled) return;
    HapticsService.mediumTap();
    if (isRecording) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsRecording(false);
    } else {
      setIsRecording(true);
      timerRef.current = setTimeout(() => {
        setIsRecording(false);
        HapticsService.success();
        onSpokenRecorded(phraseToSpeak);
      }, 1400);
    }
  };

  const isFrench = targetLanguage === 'fr';

  return (
    <View style={styles.container}>
      {/* 3D Character Stage: Maya with speech bubble */}
      <View style={styles.characterStage}>
        <CharacterView
          character="maya"
          pose={isFrench ? 'french' : 'welcome'}
          size={140}
          roundMask={false}
          showStage={true}
          interactive={true}
          emotionBadge="heart"
        />

        {/* Floating Speech Bubble */}
        <View style={styles.speechCard}>
          <Text style={styles.sayPrefix}>Say:</Text>
          <Text style={styles.speechPhrase}>"{phraseToSpeak}"</Text>
          {phoneticGuide ? (
            <Text style={styles.phoneticGuide}>[{phoneticGuide}]</Text>
          ) : null}
        </View>
      </View>

      {/* Interactive Controls Row: Audio listen + Mic record */}
      <View style={styles.controlsRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isPlayingAudio ? 'Playing reference audio' : 'Listen to native pronunciation'}
          onPress={handlePlayReference}
          style={[
            styles.listenButton,
            isPlayingAudio && styles.listenButtonPlaying,
          ]}
        >
          <Volume2 size={26} color={COLORS.white} />
        </Pressable>

        <Pressable
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={isRecording ? 'Listening' : 'Tap to speak'}
          onPress={handleToggleRecord}
          style={[
            styles.micButton,
            isRecording && styles.micButtonRecording,
            spokenText ? styles.micButtonDone : null,
          ]}
        >
          <Mic size={34} color={COLORS.white} />
        </Pressable>
      </View>

      <Text style={styles.micInstructionText}>
        {isRecording
          ? 'Listening... Speak now! 🎙️'
          : spokenText
          ? `✓ Captured: "${spokenText}"`
          : 'Tap to speak'}
      </Text>

      {/* Pip Robot Companion Assistance Badge */}
      <View style={styles.pipAssistBadge}>
        <CharacterView
          character="pip"
          pose="helper"
          size={36}
          roundMask={true}
          interactive={false}
        />
        <Text style={styles.pipAssistText}>
          {AdaptiveEngine.getPipDialogue('start')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  characterStage: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  speechCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    ...SHADOWS.card3D,
  },
  sayPrefix: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.grayText,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  speechPhrase: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.charcoal,
    marginTop: 2,
  },
  phoneticGuide: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.secondaryDark,
    marginTop: 4,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginVertical: 14,
  },
  listenButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#7DD3FC',
    borderBottomWidth: 4,
    borderBottomColor: COLORS.secondaryDark,
    ...SHADOWS.float,
  },
  listenButtonPlaying: {
    backgroundColor: '#0284C7',
    borderColor: '#38BDF8',
    borderBottomColor: '#0369A1',
    transform: [{ scale: 1.06 }],
  },
  micButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#C4B5FD',
    borderBottomWidth: 5,
    borderBottomColor: '#6D28D9',
    ...SHADOWS.float,
  },
  micButtonRecording: {
    backgroundColor: COLORS.accent,
    borderColor: '#FCA5A5',
    borderBottomColor: COLORS.accentDark,
    transform: [{ scale: 1.05 }],
  },
  micButtonDone: {
    backgroundColor: COLORS.primary,
    borderColor: '#86EFAC',
    borderBottomColor: COLORS.primaryDark,
  },
  micInstructionText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.grayText,
    marginBottom: 16,
  },
  pipAssistBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F0F9FF',
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
    borderRadius: RADII.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
    ...SHADOWS.float,
  },
  pipAssistText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0369A1',
  },
});
