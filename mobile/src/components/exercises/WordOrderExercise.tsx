import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';

interface WordOrderExerciseProps {
  prompt: string;
  sourcePrompt?: string;
  wordBank: string[];
  selectedWords: string[];
  onSelectWord?: (word: string, index: number) => void;
  onRemoveWord?: (word: string, index: number) => void;
  onChangeWords?: (words: string[]) => void;
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
  disabled = false,
}) => {
  // Track selected items by wordBank index to support duplicate words seamlessly (BUG-006 fix)
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  // Keep selectedIndices in sync if parent resets selectedWords to empty
  useEffect(() => {
    if (selectedWords.length === 0 && selectedIndices.length > 0) {
      setSelectedIndices([]);
    }
  }, [selectedWords]);

  const handleSelectWord = (word: string, bankIndex: number) => {
    if (disabled || selectedIndices.includes(bankIndex)) return;
    HapticsService.lightTap();

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
      <Text style={styles.prompt}>{prompt}</Text>

      {sourcePrompt ? (
        <View style={styles.sourceBox}>
          <Text style={styles.sourceLabel}>Translate:</Text>
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
              const word = wordBank[bankIndex];
              return (
                <Pressable
                  key={`slot-${bankIndex}-${slotIdx}`}
                  disabled={disabled}
                  onPress={() => handleRemoveWord(slotIdx)}
                  style={styles.selectedToken}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove word ${word}`}
                >
                  <Text style={styles.selectedTokenText}>{word}</Text>
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
            return (
              <Pressable
                key={`bank-${word}-${bankIdx}`}
                disabled={disabled || isUsed}
                onPress={() => handleSelectWord(word, bankIdx)}
                style={[
                  styles.bankToken,
                  isUsed && styles.bankTokenUsed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Word ${word}${isUsed ? ' already selected' : ''}`}
              >
                <Text
                  style={[
                    styles.bankTokenText,
                    isUsed && styles.bankTokenTextUsed,
                  ]}
                >
                  {word}
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
  constructionArea: {
    minHeight: 110,
    backgroundColor: COLORS.white,
    borderRadius: RADII.xl,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
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
    borderBottomColor: '#CBD5E1',
  },
  bankTokenUsed: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
    borderBottomColor: '#E2E8F0',
    borderBottomWidth: 2,
    opacity: 0.35,
  },
  bankTokenText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  bankTokenTextUsed: {
    color: '#94A3B8',
  },
});
