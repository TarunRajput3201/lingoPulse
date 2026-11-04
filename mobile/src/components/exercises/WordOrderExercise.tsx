import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Volume2 } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';
import { SoundService } from '../../services/soundService';

interface WordOrderExerciseProps {
  prompt: string;
  sourcePrompt?: string;
  wordBank: string[];
  selectedWords: string[];
  onSelectWord?: (word: string, index: number) => void;
  onRemoveWord?: (word: string, index: number) => void;
  onChangeWords?: (words: string[]) => void;
  targetLanguage?: string;
  disabled?: boolean;
}

export const WordOrderExercise: React.FC<WordOrderExerciseProps> = ({
  prompt,
  sourcePrompt,
  wordBank = [],
  selectedWords = [],
  onSelectWord,
  onRemoveWord,
  onChangeWords,
  targetLanguage = 'es',
  disabled = false,
}) => {
  // Track selected items by wordBank index to support duplicate words seamlessly (BUG-006 fix)
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  // Keep selectedIndices in sync if parent resets selectedWords or moves to next exercise
  useEffect(() => {
    if (selectedWords.length === 0 && selectedIndices.length > 0) {
      setSelectedIndices([]);
    }
  }, [selectedWords]);

  useEffect(() => {
    setSelectedIndices([]);
  }, [wordBank, prompt]);

  const handleSelectWord = (word: string, bankIndex: number) => {
    if (disabled || selectedIndices.includes(bankIndex)) return;
    HapticsService.lightTap();
    SoundService.speak(word, { lang: targetLanguage });

    const nextIndices = [...selectedIndices, bankIndex];
    setSelectedIndices(nextIndices);

    const nextWords = nextIndices.map((i) => wordBank[i]);
    if (onChangeWords) {
      onChangeWords(nextWords);
    }
    if (onSelectWord) {
      onSelectWord(word, bankIndex);
    }
  };

  const handleRemoveWord = (slotIndex: number) => {
    if (disabled) return;
    HapticsService.lightTap();

    const removedBankIndex = selectedIndices[slotIndex];
    const removedWord = wordBank[removedBankIndex];

    const nextIndices = selectedIndices.filter((_, i) => i !== slotIndex);
    setSelectedIndices(nextIndices);

    const nextWords = nextIndices.map((i) => wordBank[i]);
    if (onChangeWords) {
      onChangeWords(nextWords);
    }
    if (onRemoveWord) {
      onRemoveWord(removedWord, slotIndex);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.promptHeader}>
        <Text style={styles.prompt}>{prompt}</Text>
        {!sourcePrompt ? (
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
        ) : null}
      </View>

      {sourcePrompt ? (
        <View style={styles.sourceBox}>
          <View style={styles.sourceHeaderRow}>
            <Text style={styles.sourceLabel}>Translate:</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Listen to source phrase"
              onPress={() => {
                HapticsService.lightTap();
                SoundService.speak(sourcePrompt, { lang: targetLanguage });
              }}
              style={styles.speakerButton}
            >
              <Volume2 size={20} color={COLORS.secondaryDark} />
            </Pressable>
          </View>
          <Text style={styles.sourceText}>{sourcePrompt}</Text>
        </View>
      ) : null}

      {/* Selected Sentence Construction Slot */}
      <View style={styles.constructionArea}>
        {selectedIndices.length === 0 ? (
          <Text style={styles.placeholderText}>Tap words below to construct the sentence...</Text>
        ) : (
          <View style={styles.tokenRow}>
            {selectedIndices.map((bankIndex, slotIdx) => {
              const rawWord = wordBank[bankIndex];
              const wordText = typeof rawWord === 'string' ? rawWord : (rawWord as any)?.text ?? String(rawWord ?? '');
              return (
                <Pressable
                  key={`slot-${bankIndex}-${slotIdx}`}
                  disabled={disabled}
                  onPress={() => handleRemoveWord(slotIdx)}
                  style={styles.selectedToken}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove word ${wordText}`}
                >
                  <Text style={styles.selectedTokenText}>{wordText}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>

      {/* Word Bank Area */}
      <View style={styles.bankArea}>
        <View style={styles.tokenRow}>
          {wordBank.map((word, bankIdx) => {
            const isUsed = selectedIndices.includes(bankIdx);
            const wordText = typeof word === 'string' ? word : (word as any)?.text ?? String(word ?? '');
            return (
              <Pressable
                key={`bank-${wordText}-${bankIdx}`}
                disabled={disabled || isUsed}
                onPress={() => handleSelectWord(wordText, bankIdx)}
                style={[
                  styles.bankToken,
                  isUsed && styles.bankTokenUsed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Word ${wordText}${isUsed ? ' already selected' : ''}`}
              >
                <Text
                  style={[
                    styles.bankTokenText,
                    isUsed && styles.bankTokenTextUsed,
                  ]}
                >
                  {wordText}
                </Text>
              </Pressable>
            );
          })}
        </View>
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
    alignItems: 'flex-start',
    marginBottom: 16,
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
  sourceBox: {
    backgroundColor: COLORS.surfaceAlt,
    padding: 16,
    borderRadius: RADII.lg,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
  },
  sourceHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  speakerButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#E0F2FE',
  },
  sourceLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.grayText,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sourceText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  constructionArea: {
    minHeight: 110,
    backgroundColor: COLORS.white,
    borderRadius: RADII.xl,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.grayBorderDark,
    padding: 14,
    justifyContent: 'center',
    marginBottom: 24,
  },
  placeholderText: {
    fontSize: 14,
    color: COLORS.grayLight,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  tokenRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  selectedToken: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: RADII.md,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
  },
  selectedTokenText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.secondaryDark,
  },
  bankArea: {
    marginTop: 8,
  },
  bankToken: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: RADII.md,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: COLORS.grayBorderDark,
  },
  bankTokenUsed: {
    backgroundColor: '#E5E5E5',
    borderColor: '#E5E5E5',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 2,
    opacity: 0.4,
  },
  bankTokenText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  bankTokenTextUsed: {
    color: '#AFAFAF',
  },
});
