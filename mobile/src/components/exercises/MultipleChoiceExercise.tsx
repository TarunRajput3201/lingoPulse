import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../constants/theme';
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
                onSelectOption(option.id);
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
                  {option.text}
                </Text>
                {option.translation ? (
                  <Text style={styles.translationText}>{option.translation}</Text>
                ) : null}
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
    padding: 16,
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
  indexBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: '#F8FAFC',
  },
  indexBadgeSelected: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
  },
  indexText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.grayText,
  },
  indexTextSelected: {
    color: COLORS.white,
  },
  optionContent: {
    flex: 1,
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
  translationText: {
    fontSize: 12,
    color: COLORS.grayText,
    marginTop: 2,
  },
});
