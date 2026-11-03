import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Check } from 'lucide-react-native';
import { COLORS, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';
import { CHARACTER_IMAGES } from '../character/CharacterAssets';

interface Option {
  id: string;
  text: string;
  translation?: string;
}

interface ImageSelectExerciseProps {
  prompt: string;
  imageKey?: string;
  options: Option[];
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  disabled?: boolean;
}

export const ImageSelectExercise: React.FC<ImageSelectExerciseProps> = ({
  prompt,
  imageKey = 'coffeeCup',
  options,
  selectedOptionId,
  onSelectOption,
  disabled = false,
}) => {
  const handleSelect = (id: string) => {
    if (disabled) return;
    HapticsService.lightTap();
    onSelectOption(id);
  };

  // Determine image asset
  const imageSource =
    imageKey === 'coffeeCup' || !imageKey
      ? CHARACTER_IMAGES.objects.coffeeCup
      : { uri: imageKey };

  return (
    <View style={styles.container}>
      <Text style={styles.promptText}>{prompt || 'Choose the correct translation:'}</Text>

      {/* 3D Visual Render Card */}
      <View style={styles.imageCard}>
        <Image source={imageSource} style={styles.exerciseImage} resizeMode="cover" />
      </View>

      {/* Tactile Option Cards Grid / List */}
      <View style={styles.optionsList}>
        {options.map((opt, idx) => {
          const optText = typeof opt === 'string' ? opt : (opt?.text ?? String(opt ?? ''));
          const optId = typeof opt === 'string' ? opt : (opt?.id ?? optText);
          const isSelected = selectedOptionId === optId;
          return (
            <Pressable
              key={`${optId}-${idx}`}
              disabled={disabled}
              onPress={() => handleSelect(optId)}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected,
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
              {isSelected ? (
                <View style={styles.checkIconBadge}>
                  <Check size={16} color={COLORS.white} strokeWidth={3} />
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  promptText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.charcoal,
    textAlign: 'center',
    marginBottom: 16,
  },
  imageCard: {
    width: 210,
    height: 170,
    backgroundColor: '#F8FAFC',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 20,
    ...SHADOWS.card3D,
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
  },
  optionsList: {
    width: '100%',
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    ...SHADOWS.card3D,
  },
  optionButtonSelected: {
    backgroundColor: '#F0FDF4',
    borderColor: COLORS.primaryDark,
    borderBottomColor: '#15803D',
    borderBottomWidth: 5,
  },
  optionText: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  optionTextSelected: {
    color: COLORS.primaryDark,
  },
  checkIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
