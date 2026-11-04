import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Volume2 } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';
import { SoundService } from '../../services/soundService';

interface FillInTheBlankExerciseProps {
  prompt: string;
  sentenceWithBlank: string;
  options?: (string | { id?: string; text: string; [key: string]: any })[];
  selectedWord: string;
  onSelectWord: (word: string) => void;
  targetLanguage?: string;
  disabled?: boolean;
}

export const FillInTheBlankExercise: React.FC<FillInTheBlankExerciseProps> = ({
  prompt,
  sentenceWithBlank = '',
  options = [],
  selectedWord,
  onSelectWord,
  targetLanguage = 'es',
  disabled = false,
}) => {
  // Support standard blanks: ___, ____, [blank], <blank>, or missing value markers
  const blankRegex = /_{2,}|\[blank\]|<blank>/i;
  const parts = sentenceWithBlank.includes('___')
    ? sentenceWithBlank.split('___')
    : sentenceWithBlank.split(blankRegex);

  return (
    <View style={styles.container}>
      <View style={styles.promptHeader}>
        <Text style={styles.prompt}>{prompt}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Read sentence aloud"
          onPress={() => {
            HapticsService.lightTap();
            const textToSpeak =
              selectedWord
                ? `${parts[0]} ${typeof selectedWord === 'string' ? selectedWord : (selectedWord as any)?.text ?? String(selectedWord)} ${parts[1] || ''}`
                : sentenceWithBlank.replace(/_{2,}|\[blank\]|<blank>/g, '...') || prompt;
            SoundService.speak(textToSpeak, { lang: targetLanguage });
          }}
          style={styles.speakerIconBtn}
        >
          <Volume2 size={22} color={COLORS.secondaryDark} />
        </Pressable>
      </View>

      {/* Sentence with Blank Card - Tap to clear if filled */}
      <Pressable
        disabled={disabled || !selectedWord}
        accessibilityRole="button"
        accessibilityLabel="Clear filled slot"
        onPress={() => {
          if (selectedWord) {
            HapticsService.lightTap();
            onSelectWord('');
          }
        }}
        style={styles.sentenceCard}
      >
        <Text style={styles.sentenceText}>
          {parts[0]}
          <Text style={[styles.blankSlot, selectedWord ? styles.blankSlotFilled : null]}>
            {selectedWord ? ` ${typeof selectedWord === 'string' ? selectedWord : (selectedWord as any)?.text ?? String(selectedWord)} ` : ' _______ '}
          </Text>
          {parts[1] || ''}
        </Text>
      </Pressable>

      {/* Word Options Chips or Input */}
      {options && options.length > 0 ? (
        <View style={styles.optionsGrid}>
          {options.map((opt, idx) => {
            const optText = typeof opt === 'string' ? opt : (opt?.text ?? String(opt ?? ''));
            const optId = typeof opt === 'string' ? opt : (opt?.id ?? optText);
            const isSelected = selectedWord === optText || selectedWord === optId;
            return (
              <Pressable
                key={`${optId}-${idx}`}
                disabled={disabled}
                onPress={() => {
                  HapticsService.lightTap();
                  if (isSelected) {
                    onSelectWord(''); // Toggle off
                  } else {
                    onSelectWord(optText);
                    SoundService.speak(optText, { lang: targetLanguage });
                  }
                }}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Word option: ${optText}`}
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
      ) : (
        <View style={styles.textInputWrapper}>
          <TextInput
            editable={!disabled}
            value={selectedWord}
            onChangeText={onSelectWord}
            placeholder="Type missing word..."
            placeholderTextColor="#94A3B8"
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
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    borderRadius: RADII.md,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentenceCard: {
    padding: 24,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
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
  blankSlotFilled: {
    color: COLORS.secondaryDark,
    backgroundColor: COLORS.secondaryLight,
    paddingHorizontal: 10,
    borderRadius: 8,
    overflow: 'hidden',
    textDecorationLine: 'none',
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
    borderBottomColor: COLORS.grayBorderDark,
    minWidth: 100,
    alignItems: 'center',
  },
  optionButtonSelected: {
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
    backgroundColor: COLORS.secondarySubtle,
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
    borderRadius: RADII.xl,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: COLORS.grayBorderDark,
    padding: 14,
  },
  textInput: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
});
