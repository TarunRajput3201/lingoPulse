import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Volume2, Turtle } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../constants/theme';
import { SoundService } from '../../services/soundService';
import { HapticsService } from '../../services/hapticsService';

interface ListeningExerciseProps {
  prompt: string;
  audioUrl: string;
  options: Array<{ id: string; text: string }>;
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  disabled?: boolean;
}

export const ListeningExercise: React.FC<ListeningExerciseProps> = ({
  prompt,
  audioUrl,
  options = [],
  selectedOptionId,
  onSelectOption,
  disabled = false,
}) => {
  const handlePlayAudio = (isSlow: boolean = false) => {
    HapticsService.lightTap();
    SoundService.playRemoteAudio(audioUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>

      {/* Audio Playback Controls */}
      <View style={styles.audioRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Play audio"
          onPress={() => handlePlayAudio(false)}
          style={styles.bigAudioButton}
        >
          <Volume2 size={36} color={COLORS.white} />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Play audio slowly"
          onPress={() => handlePlayAudio(true)}
          style={styles.slowAudioButton}
        >
          <Turtle size={24} color={COLORS.secondaryDark} />
        </Pressable>
      </View>

      {/* Options List */}
      <View style={styles.optionsList}>
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <Pressable
              key={opt.id}
              disabled={disabled}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected, disabled }}
              accessibilityLabel={`Answer option: ${opt.text}`}
              onPress={() => {
                HapticsService.lightTap();
                onSelectOption(opt.id);
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
                {opt.text}
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
    marginBottom: 28,
  },
  bigAudioButton: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: COLORS.secondary,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.secondaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slowAudioButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: COLORS.secondarySubtle,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: '#BAE6FD',
    borderBottomColor: '#7DD3FC',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderBottomColor: '#CBD5E1',
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
