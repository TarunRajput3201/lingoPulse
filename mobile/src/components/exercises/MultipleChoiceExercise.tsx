import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Volume2 } from 'lucide-react-native';
import { COLORS, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';
import { SoundService } from '../../services/soundService';

interface MultipleChoiceExerciseProps {
  prompt: string;
  options: Array<{ id: string; text: string; translation?: string }>;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  targetLanguage?: string;
  disabled?: boolean;
}

export const MultipleChoiceExercise: React.FC<MultipleChoiceExerciseProps> = ({
  prompt,
  options = [],
  selectedOptionId,
  onSelectOption,
  targetLanguage = 'es',
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.promptHeader}>
        <Text style={styles.prompt}>{prompt}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Read prompt aloud"
          onPress={() => {
            HapticsService.lightTap();
            SoundService.speak(prompt, { lang: targetLanguage });
          }}
          style={styles.speakerIconBtn}
        >
          <Volume2 size={22} color={COLORS.secondaryDark} />
        </Pressable>
      </View>

      <View style={styles.optionsList}>
        {options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;
          const optText = typeof option === 'string' ? option : (option?.text ?? String(option ?? ''));
          const optId = typeof option === 'string' ? option : (option?.id ?? optText);
          return (
            <Pressable
              key={optId || index}
              disabled={disabled}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected, disabled }}
              accessibilityLabel={`Option ${index + 1}: ${optText}`}
              onPress={() => {
                HapticsService.lightTap();
                SoundService.speak(optText, { lang: targetLanguage });
                onSelectOption(optId);
              }}
              style={[
                styles.optionCard,
                isSelected && styles.optionCardSelected,
              ]}
            >
              <View style={[styles.indexBadge, isSelected && styles.indexBadgeSelected]}>
                <Text style={[styles.indexText, isSelected && styles.indexTextSelected]}>
                  {index + 1}
                </Text>
              </View>

              <View style={styles.optionContent}>
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {typeof option === 'string' ? option : (option?.text ?? String(option ?? ''))}
                </Text>
              </View>
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
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  prompt: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: '800',
    color: COLORS.charcoal,
    lineHeight: 28,
  },
  speakerIconBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsList: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    minHeight: 66,
    ...SHADOWS.card3D,
  },
  optionCardSelected: {
    borderColor: COLORS.secondaryDark,
    borderBottomColor: '#0284C7',
    borderBottomWidth: 5,
    backgroundColor: '#F0F9FF',
  },
  indexBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1.5,
    borderBottomWidth: 2.5,
    borderColor: '#CBD5E1',
    borderBottomColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: COLORS.white,
  },
  indexBadgeSelected: {
    borderColor: '#38BDF8',
    borderBottomColor: '#0284C7',
    backgroundColor: COLORS.secondaryDark,
  },
  indexText: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.grayText,
  },
  indexTextSelected: {
    color: COLORS.white,
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  optionTextSelected: {
    color: COLORS.secondaryDark,
    fontWeight: '800',
  },
});

