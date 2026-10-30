import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';

interface TranslationExerciseProps {
  prompt: string;
  sourceText?: string;
  userAnswer: string;
  onChangeAnswer: (text: string) => void;
  targetLanguage?: string;
  disabled?: boolean;
}

export const TranslationExercise: React.FC<TranslationExerciseProps> = ({
  prompt,
  sourceText,
  userAnswer,
  onChangeAnswer,
  targetLanguage = 'es',
  disabled = false,
}) => {
  const getLanguageDetails = () => {
    switch (targetLanguage.toLowerCase()) {
      case 'fr':
        return {
          name: 'French',
          placeholder: 'Type your answer in French...',
          accents: ['à', 'â', 'ç', 'é', 'è', 'ê', 'ë', 'î', 'ô', 'ù'],
        };
      case 'de':
        return {
          name: 'German',
          placeholder: 'Type your answer in German...',
          accents: ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'],
        };
      case 'es':
      default:
        return {
          name: 'Spanish',
          placeholder: 'Type your answer in Spanish...',
          accents: ['á', 'é', 'í', 'ó', 'ú', 'ñ', '¿', '¡'],
        };
    }
  };

  const { placeholder, accents } = getLanguageDetails();

  const handleInsertAccent = (char: string) => {
    if (disabled) return;
    HapticsService.lightTap();
    onChangeAnswer((userAnswer || '') + char);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>

      {sourceText ? (
        <View style={styles.sourceBox}>
          <Text style={styles.sourceLabel}>Phrase:</Text>
          <Text style={styles.sourceText}>{sourceText}</Text>
        </View>
      ) : null}

      <View style={styles.inputWrapper}>
        <TextInput
          editable={!disabled}
          value={userAnswer}
          onChangeText={onChangeAnswer}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          multiline
          style={styles.textInput}
          autoCapitalize="sentences"
          autoCorrect={false}
        />
      </View>

      {/* Quick Diacritics Bar for Mobile Learners */}
      {accents && accents.length > 0 && !disabled ? (
        <View style={styles.accentsContainer}>
          <Text style={styles.accentsHint}>Accents:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.accentsRow}
          >
            {accents.map((char) => (
              <Pressable
                key={char}
                onPress={() => handleInsertAccent(char)}
                style={styles.accentKey}
                accessibilityRole="button"
                accessibilityLabel={`Insert ${char}`}
              >
                <Text style={styles.accentText}>{char}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}
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
    marginBottom: 16,
  },
  sourceBox: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: RADII.lg,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
  },
  sourceLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.grayText,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  sourceText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  inputWrapper: {
    minHeight: 120,
    backgroundColor: COLORS.white,
    borderRadius: RADII.xl,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: '#CBD5E1',
    padding: 14,
  },
  textInput: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.charcoal,
    textAlignVertical: 'top',
    minHeight: 90,
  },
  accentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  accentsHint: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.grayText,
  },
  accentsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  accentKey: {
    width: 38,
    height: 38,
    borderRadius: RADII.md,
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: COLORS.grayBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
});
