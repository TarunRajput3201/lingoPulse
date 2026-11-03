import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';

interface MultipleChoiceExerciseProps {
  prompt: string;
  options: Array<{ id: string; text: string; translation?: string }>;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  disabled?: boolean;
}

export const MultipleChoiceExercise: React.FC<MultipleChoiceExerciseProps> = ({
  prompt,
  options = [],
  selectedOptionId,
  onSelectOption,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>

      <View style={styles.optionsList}>
        {options.map((option, index) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <Pressable
              key={option.id || index}
              disabled={disabled}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected, disabled }}
              accessibilityLabel={`Option ${index + 1}: ${option.text}`}
              onPress={() => {
                HapticsService.lightTap();
                onSelectOption(option?.id ?? (typeof option === 'string' ? option : String(index)));
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
  prompt: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: '800',
    color: COLORS.charcoal,
    lineHeight: 28,
    marginBottom: 20,
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

