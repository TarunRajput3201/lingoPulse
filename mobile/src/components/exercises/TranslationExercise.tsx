import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, RADII } from '../../constants/theme';

interface TranslationExerciseProps {
  prompt: string;
  sourceText?: string;
  userAnswer: string;
  onChangeAnswer: (text: string) => void;
  disabled?: boolean;
}

export const TranslationExercise: React.FC<TranslationExerciseProps> = ({
  prompt,
  sourceText,
  userAnswer,
  onChangeAnswer,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>

      {sourceText ? (
        <View style={styles.sourceBox}>
          <Text style={styles.sourceText}>{sourceText}</Text>
        </View>
      ) : null}

      <View style={styles.inputWrapper}>
        <TextInput
          editable={!disabled}
          value={userAnswer}
          onChangeText={onChangeAnswer}
          placeholder="Type in Spanish..."
          placeholderTextColor="#9CA3AF"
          multiline
          style={styles.textInput}
          autoCapitalize="sentences"
          autoCorrect={false}
        />
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
    marginBottom: 16,
  },
  sourceBox: {
    backgroundColor: '#F3F4F6',
    padding: 14,
    borderRadius: RADII.md,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
  },
  sourceText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  inputWrapper: {
    minHeight: 120,
    backgroundColor: COLORS.white,
    borderRadius: RADII.lg,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    padding: 12,
  },
  textInput: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.charcoal,
    textAlignVertical: 'top',
    minHeight: 90,
  },
});
