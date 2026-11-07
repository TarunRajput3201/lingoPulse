import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, ActivityIndicator } from 'react-native';
import { Volume2, VolumeX, Turtle, RotateCcw, AlertCircle } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../constants/theme';
import { SoundService } from '../../services/soundService';
import { HapticsService } from '../../services/hapticsService';

interface ListeningExerciseProps {
  prompt: string;
  audioUrl?: string;
  textToSpeak?: string;
  targetLanguage?: string;
  options: Array<{ id: string; text: string }>;
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  disabled?: boolean;
}

export const ListeningExercise: React.FC<ListeningExerciseProps> = ({
  prompt,
  audioUrl,
  textToSpeak,
  targetLanguage = 'es',
  options = [],
  selectedOptionId,
  onSelectOption,
  disabled = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSpeed, setActiveSpeed] = useState<'normal' | 'slow'>('normal');
  const [hasError, setHasError] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const isMountedRef = useRef(true);

  // Component lifecycle: set isMountedRef and stop audio on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      SoundService.stopSpeaking().catch(() => {});
    };
  }, []);

  // Pulse animation while audio is speaking
  useEffect(() => {
    if (isPlaying) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.12,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1.0,
            duration: 350,
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      return () => {
        loop.stop();
        pulseAnim.setValue(1);
      };
    } else {
      pulseAnim.setValue(1);
    }
  }, [isPlaying]);

  // Autoplay audio once on exercise entry
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isMountedRef.current) {
        handlePlayAudio(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [textToSpeak, audioUrl]);

  const handlePlayAudio = async (isSlow: boolean = false) => {
    HapticsService.lightTap();
    await SoundService.stopSpeaking().catch(() => {});
    setActiveSpeed(isSlow ? 'slow' : 'normal');
    setIsLoading(true);
    setHasError(false);

    const spokenText = textToSpeak || prompt;
    const rate = isSlow ? 0.65 : 1.0;
    const effectiveAudioUrl = audioUrl || (spokenText ? SoundService.getTTSAudioUrl(spokenText, targetLanguage) : '');

    try {
      // 1. Primary path: Native/Web TTS pronunciation in authentic language
      if (spokenText) {
        setIsLoading(false);
        setIsPlaying(true);

        const ok = await SoundService.speak(spokenText, {
          lang: targetLanguage,
          rate,
          onStart: () => {
            if (isMountedRef.current) setIsPlaying(true);
          },
          onDone: () => {
            if (isMountedRef.current) setIsPlaying(false);
          },
          onError: async () => {
            if (effectiveAudioUrl && isMountedRef.current) {
              const played = await SoundService.playRemoteAudio(effectiveAudioUrl, { timeoutMs: 5000 });
              if (isMountedRef.current) {
                setIsPlaying(false);
                if (!played) setHasError(true);
              }
            } else if (isMountedRef.current) {
              setIsPlaying(false);
              setHasError(true);
            }
          },
        });

        if (ok) {
          // Fallback auto-timer in case speech engine onDone doesn't fire
          setTimeout(() => {
            if (isMountedRef.current) setIsPlaying(false);
          }, Math.max(1500, spokenText.length * 100));
          return;
        }
      }

      // 2. Secondary fallback path: Remote audio URL
      if (effectiveAudioUrl) {
        setIsLoading(true);
        const played = await SoundService.playRemoteAudio(effectiveAudioUrl, { timeoutMs: 5000 });
        if (isMountedRef.current) {
          setIsLoading(false);
          setIsPlaying(false);
          if (!played && !spokenText) {
            setHasError(true);
          }
        }
      } else {
        if (isMountedRef.current) {
          setIsLoading(false);
          setIsPlaying(false);
        }
      }
    } catch {
      if (isMountedRef.current) {
        setIsLoading(false);
        setIsPlaying(false);
        setHasError(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>

      {/* Audio Playback Controls */}
      <View style={styles.audioRow}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isPlaying ? 'Audio playing' : 'Play pronunciation audio'}
            onPress={() => handlePlayAudio(false)}
            style={[
              styles.bigAudioButton,
              isPlaying && styles.bigAudioButtonPlaying,
            ]}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : isPlaying ? (
              <Volume2 size={38} color={COLORS.white} />
            ) : (
              <Volume2 size={36} color={COLORS.white} />
            )}
          </Pressable>
        </Animated.View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Play pronunciation slowly"
          onPress={() => handlePlayAudio(true)}
          style={[
            styles.slowAudioButton,
            activeSpeed === 'slow' && isPlaying && styles.slowAudioButtonActive,
          ]}
        >
          <Turtle
            size={26}
            color={activeSpeed === 'slow' && isPlaying ? COLORS.white : COLORS.secondaryDark}
          />
        </Pressable>

        {/* Replay Pill */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Replay audio"
          onPress={() => handlePlayAudio(activeSpeed === 'slow')}
          style={styles.replayPill}
        >
          <RotateCcw size={16} color={COLORS.grayText} />
          <Text style={styles.replayText}>Replay</Text>
        </Pressable>
      </View>

      {/* Visible Error State with Retry */}
      {hasError && (
        <Pressable
          style={styles.errorBanner}
          onPress={() => handlePlayAudio(false)}
          accessibilityRole="button"
          accessibilityLabel="Audio unavailable. Tap to retry."
        >
          <AlertCircle size={16} color={COLORS.accentDark} />
          <Text style={styles.errorBannerText}>Audio tap failed. Tap to retry pronunciation.</Text>
        </Pressable>
      )}

      {/* Options List */}
      <View style={styles.optionsList}>
        {options.map((opt) => {
          const optText = typeof opt === 'string' ? opt : (opt?.text ?? String(opt ?? ''));
          const optId = typeof opt === 'string' ? opt : (opt?.id ?? optText);
          const isSelected = selectedOptionId === optId;
          return (
            <Pressable
              key={optId}
              disabled={disabled}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected, disabled }}
              accessibilityLabel={`Answer option: ${optText}`}
              onPress={() => {
                HapticsService.lightTap();
                onSelectOption(optId);
              }}
              style={[
                styles.optionCard,
                isSelected && styles.optionCardSelected,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {optText}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  prompt: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: '800',
    color: COLORS.charcoal,
    lineHeight: 28,
    marginBottom: 20,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  bigAudioButton: {
    width: 76,
    height: 76,
    borderRadius: 26,
    backgroundColor: COLORS.secondary,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.secondaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.secondaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  bigAudioButtonPlaying: {
    backgroundColor: '#0284C7',
    borderBottomColor: '#0369A1',
    transform: [{ scale: 1.04 }],
  },
  slowAudioButton: {
    width: 54,
    height: 54,
    borderRadius: 20,
    backgroundColor: COLORS.secondarySubtle,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: '#BAE6FD',
    borderBottomColor: '#7DD3FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slowAudioButtonActive: {
    backgroundColor: COLORS.secondaryDark,
    borderColor: COLORS.secondaryDark,
  },
  replayPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADII.pill,
    backgroundColor: COLORS.grayBackground,
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
  },
  replayText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    borderRadius: RADII.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  errorBannerText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accentDark,
  },
  optionsList: {
    gap: 12,
  },
  optionCard: {
    padding: 18,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: COLORS.grayBorderDark,
    minHeight: 64,
  },
  optionCardSelected: {
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
    backgroundColor: COLORS.secondarySubtle,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  optionTextSelected: {
    color: COLORS.secondaryDark,
    fontWeight: '800',
  },
});
