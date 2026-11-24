import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Mic, Volume2, AlertCircle, CheckCircle, MicOff, RefreshCw } from 'lucide-react-native';
import { COLORS, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';
import { SoundService } from '../../services/soundService';
import { HapticsService } from '../../services/hapticsService';
import { CharacterView } from '../character/CharacterView';
import { AdaptiveEngine } from '../../services/adaptiveEngine';
import {
  MicrophoneSpeechService,
  MicrophoneStatus,
  SpeechEvaluationResult,
} from '../../services/microphoneSpeechService';

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
  const [micStatus, setMicStatus] = useState<MicrophoneStatus>('IDLE');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [volumeLevel, setVolumeLevel] = useState<number>(0);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [evaluation, setEvaluation] = useState<SpeechEvaluationResult | null>(null);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const waveBars = [
    useRef(new Animated.Value(6)).current,
    useRef(new Animated.Value(12)).current,
    useRef(new Animated.Value(18)).current,
    useRef(new Animated.Value(12)).current,
    useRef(new Animated.Value(6)).current,
  ];

  useEffect(() => {
    return () => {
      MicrophoneSpeechService.cancelRecording().catch(() => {});
      SoundService.stopSpeaking().catch(() => {});
    };
  }, []);

  // Animate waveform bars according to live microphone volume
  useEffect(() => {
    if (isRecording) {
      waveBars.forEach((bar, i) => {
        const factor = 1 + (i % 2 === 0 ? 0.8 : 1.4);
        const targetHeight = Math.max(6, Math.min(36, 8 + volumeLevel * 28 * factor));
        Animated.timing(bar, {
          toValue: targetHeight,
          duration: 90,
          useNativeDriver: false,
        }).start();
      });
    } else {
      waveBars.forEach((bar) => {
        Animated.timing(bar, {
          toValue: 6,
          duration: 150,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [isRecording, volumeLevel]);

  const handlePlayReference = async () => {
    HapticsService.lightTap();
    await SoundService.stopSpeaking().catch(() => {});
    setIsPlayingAudio(true);
    setAudioError(false);

    try {
      const ok = await SoundService.speak(phraseToSpeak, {
        lang: targetLanguage,
        rate: 0.88,
        onStart: () => setIsPlayingAudio(true),
        onDone: () => setIsPlayingAudio(false),
        onError: () => {
          setIsPlayingAudio(false);
          setAudioError(true);
        },
      });

      if (!ok && referenceAudioUrl) {
        await SoundService.playRemoteAudio(referenceAudioUrl, { timeoutMs: 5000 });
      }

      setTimeout(() => {
        setIsPlayingAudio(false);
      }, Math.max(1200, phraseToSpeak.length * 90));
    } catch {
      setIsPlayingAudio(false);
      setAudioError(true);
    }
  };

  const handleStartRecording = async () => {
    if (disabled) return;
    HapticsService.mediumTap();
    setStatusMessage('');
    setLiveTranscript('');
    setEvaluation(null);

    const session = await MicrophoneSpeechService.startRecording({
      targetLanguage,
      phraseToSpeak,
      onVolume: (rms) => setVolumeLevel(rms),
      onInterimResult: (text) => setLiveTranscript(text),
    });

    if (!session.started) {
      setMicStatus(session.status);
      setStatusMessage(session.errorMessage || 'Failed to start recording');
      setIsRecording(false);
      onSpokenRecorded('');
      return;
    }

    setMicStatus('RECORDING');
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    HapticsService.lightTap();

    const evalResult = await MicrophoneSpeechService.stopRecording(phraseToSpeak);
    setEvaluation(evalResult);
    setMicStatus(evalResult.status);
    setStatusMessage(evalResult.message);

    if (evalResult.status === 'NO_SPEECH') {
      // STRICT: Clear answer so empty silence cannot pass
      onSpokenRecorded('');
      HapticsService.error();
    } else if (evalResult.status === 'SUCCESS') {
      onSpokenRecorded(evalResult.transcript);
      HapticsService.success();
    } else {
      // Spoke but pronunciation did not match
      onSpokenRecorded(evalResult.transcript || 'unclear speech');
      HapticsService.error();
    }
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  return (
    <View style={styles.container}>
      {/* 3D Character Stage: Maya with speech bubble */}
      <View style={styles.characterStage}>
        <CharacterView
          character="leo"
          mood={isRecording ? 'speaking' : evaluation?.success ? 'celebrate' : 'idle'}
          size={140}
          roundMask={false}
          showStage={true}
          interactive={true}
          targetLanguage={targetLanguage}
          environmentType="studio"
          emotionBadge={evaluation?.success ? 'star' : undefined}
        />

        {/* Target Phrase Card */}
        <View style={styles.speechCard}>
          <Text style={styles.sayPrefix}>Pronounce in {targetLanguage.toUpperCase()}:</Text>
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
          accessibilityLabel={isRecording ? 'Stop recording' : 'Tap to speak'}
          onPress={handleToggleRecord}
          style={[
            styles.micButton,
            isRecording && styles.micButtonRecording,
            evaluation?.success ? styles.micButtonDone : null,
          ]}
        >
          {micStatus === 'PERMISSION_DENIED' ? (
            <MicOff size={32} color={COLORS.white} />
          ) : (
            <Mic size={34} color={COLORS.white} />
          )}
        </Pressable>
      </View>

      {/* Audio Waveform Meter while Recording */}
      {isRecording && (
        <View style={styles.waveformContainer}>
          {waveBars.map((barAnim, idx) => (
            <Animated.View
              key={idx}
              style={[
                styles.waveformBar,
                { height: barAnim },
              ]}
            />
          ))}
          <Text style={styles.listeningLiveText}>
            {liveTranscript ? `"${liveTranscript}"` : 'Listening for your voice...'}
          </Text>
        </View>
      )}

      {/* Feedback Messages & Error Banners */}
      {!isRecording && statusMessage ? (
        <View
          style={[
            styles.feedbackBanner,
            micStatus === 'SUCCESS' && styles.feedbackBannerSuccess,
            (micStatus === 'NO_SPEECH' || micStatus === 'RECOGNITION_FAILED') &&
              styles.feedbackBannerWarning,
            (micStatus === 'PERMISSION_DENIED' || micStatus === 'UNAVAILABLE') &&
              styles.feedbackBannerError,
          ]}
        >
          {micStatus === 'SUCCESS' && (
            <CheckCircle size={20} color="#059669" style={{ marginRight: 8 }} />
          )}
          {(micStatus === 'NO_SPEECH' || micStatus === 'RECOGNITION_FAILED') && (
            <AlertCircle size={20} color="#D97706" style={{ marginRight: 8 }} />
          )}
          {(micStatus === 'PERMISSION_DENIED' || micStatus === 'UNAVAILABLE') && (
            <MicOff size={20} color="#DC2626" style={{ marginRight: 8 }} />
          )}
          <Text
            style={[
              styles.feedbackBannerText,
              micStatus === 'SUCCESS' && { color: '#047857' },
              (micStatus === 'NO_SPEECH' || micStatus === 'RECOGNITION_FAILED') && {
                color: '#B45309',
              },
              (micStatus === 'PERMISSION_DENIED' || micStatus === 'UNAVAILABLE') && {
                color: '#B91C1C',
              },
            ]}
          >
            {statusMessage}
          </Text>
        </View>
      ) : null}

      {!isRecording && !statusMessage && (
        <Text style={styles.micInstructionText}>
          {spokenText ? `Captured: "${spokenText}"` : 'Tap the microphone and speak aloud'}
        </Text>
      )}

      {/* Pronunciation Coach Leo Badge */}
      <View style={styles.pipAssistBadge}>
        <CharacterView
          character="pip"
          mood="idle"
          size={36}
          roundMask={true}
          interactive={false}
          targetLanguage={targetLanguage}
        />
        <Text style={styles.pipAssistText}>
          {isRecording
            ? 'Pip is listening to your native cadence...'
            : evaluation?.success
            ? 'Fantastic accent! You sounded like a native speaker!'
            : 'Speak clearly into the microphone. Practice makes fluency!'}
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
    marginBottom: 16,
    width: '100%',
  },
  speechCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    ...SHADOWS.card3D,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    width: '100%',
    maxWidth: 380,
  },
  sayPrefix: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  speechPhrase: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.charcoal,
    textAlign: 'center',
  },
  phoneticGuide: {
    fontSize: 14,
    color: COLORS.secondaryDark,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
    marginBottom: 12,
  },
  listenButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: COLORS.secondaryDark,
    ...SHADOWS.md,
  },
  listenButtonPlaying: {
    backgroundColor: COLORS.secondaryDark,
    transform: [{ scale: 0.95 }],
  },
  micButton: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 5,
    borderBottomColor: COLORS.primaryDark,
    ...SHADOWS.lg,
  },
  micButtonRecording: {
    backgroundColor: '#DC2626',
    borderBottomColor: '#991B1B',
    transform: [{ scale: 1.05 }],
  },
  micButtonDone: {
    backgroundColor: '#059669',
    borderBottomColor: '#047857',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 44,
    marginVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
  },
  waveformBar: {
    width: 5,
    backgroundColor: '#DC2626',
    borderRadius: 3,
  },
  listeningLiveText: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  feedbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: RADII.lg,
    width: '100%',
    maxWidth: 380,
    marginTop: 8,
    marginBottom: 6,
  },
  feedbackBannerSuccess: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
  },
  feedbackBannerWarning: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  feedbackBannerError: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FECACA',
  },
  feedbackBannerText: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    flex: 1,
  },
  micInstructionText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
  },
  pipAssistBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 14,
    maxWidth: 380,
    gap: 10,
  },
  pipAssistText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    flex: 1,
    lineHeight: 16,
  },
});
