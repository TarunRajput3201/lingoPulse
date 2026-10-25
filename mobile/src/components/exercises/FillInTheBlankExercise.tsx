import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { COLORS, RADII } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';

interface FillInTheBlankExerciseProps {
  prompt: string;
  sentenceWithBlank: string;
  options?: string[];
  selectedWord: string;
  onSelectWord: (word: string) => void;
  disabled?: boolean;
}

export const FillInTheBlankExercise: React.FC<FillInTheBlankExerciseProps> = ({
  prompt,
  sentenceWithBlank,
  options = [],
  selectedWord,
  onSelectWord,
  disabled = false,
}) => {
  const parts = sentenceWithBlank.split('___');

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>

      {/* Sentence with Blank Container */}
      <View style={styles.sentenceCard}>
        <Text style={styles.sentenceText}>
          {parts[0]}
          <Text style={styles.blankSlot}>
            {selectedWord ? ` ${selectedWord} ` : ' ______ '}
          </Text>
          {parts[1] || ''}
        </Text>
      </View>

      {/* Word Options or Input */}
      {options && options.length > 0 ? (
        <View style={styles.optionsGrid}>
          {options.map((opt, idx) => {
            const isSelected = selectedWord === opt;
            return (
              <Pressable
                key={`${opt}-${idx}`}
                disabled={disabled}
                onPress={() => {
                  HapticsService.lightTap();
                  onSelectWord(opt);
                }}
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
                  {opt}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : (
        <View style={styles.textInputWrapper}>
          <TextInput
            editable={!disabled}
            value={selectedWord}
            onChangeText={onSelectWord}
            placeholder="Type missing word..."
            placeholderTextColor="#9CA3AF"
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
      )}
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
  sentenceCard: {
    padding: 20,
    borderRadius: RADII.lg,
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    marginBottom: 24,
    alignItems: 'center',
  },
  sentenceText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.charcoal,
    lineHeight: 34,
    textAlign: 'center',
  },
  blankSlot: {
    color: COLORS.secondaryDark,
    fontWeight: '900',
    textDecorationLine: 'underline',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  optionButton: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: RADII.lg,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    minWidth: 100,
    alignItems: 'center',
  },
  optionButtonSelected: {
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
    backgroundColor: '#F0F9FF',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  optionTextSelected: {
    color: COLORS.secondaryDark,
  },
  textInputWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: RADII.lg,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    padding: 14,
  },
  textInput: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
});
