import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, RADII } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';

interface WordOrderExerciseProps {
  prompt: string;
  sourcePrompt?: string;
  wordBank: string[];
  selectedWords: string[];
  onSelectWord: (word: string, index: number) => void;
  onRemoveWord: (word: string, index: number) => void;
  disabled?: boolean;
}

export const WordOrderExercise: React.FC<WordOrderExerciseProps> = ({
  prompt,
  sourcePrompt,
  wordBank,
  selectedWords,
  onSelectWord,
  onRemoveWord,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>

      {sourcePrompt ? (
        <View style={styles.sourceBox}>
          <Text style={styles.sourceText}>{sourcePrompt}</Text>
        </View>
      ) : null}

      {/* Selected Words Construction Slot */}
      <View style={styles.constructionArea}>
        {selectedWords.length === 0 ? (
          <Text style={styles.placeholderText}>Tap words below in order...</Text>
        ) : (
          <View style={styles.tokenRow}>
            {selectedWords.map((word, idx) => (
              <Pressable
                key={`${word}-${idx}`}
                disabled={disabled}
                onPress={() => {
                  HapticsService.lightTap();
                  onRemoveWord(word, idx);
                }}
                style={styles.selectedToken}
              >
                <Text style={styles.selectedTokenText}>{word}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Scrambled Word Bank */}
      <View style={styles.bankArea}>
        <View style={styles.tokenRow}>
          {wordBank.map((word, idx) => {
            const isUsed = selectedWords.includes(word);
            return (
              <Pressable
                key={`${word}-${idx}`}
                disabled={disabled || isUsed}
                onPress={() => {
                  HapticsService.lightTap();
                  onSelectWord(word, idx);
                }}
                style={[
                  styles.bankToken,
                  isUsed && styles.bankTokenUsed,
                ]}
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
  constructionArea: {
    minHeight: 110,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.grayBorder,
    borderTopWidth: 2,
    borderTopColor: COLORS.grayBorder,
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 24,
  },
  placeholderText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  tokenRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedToken: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
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
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADII.md,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: '#CBD5E1',
  },
  bankTokenUsed: {
    backgroundColor: '#E2E8F0',
    borderColor: '#E2E8F0',
    borderBottomColor: '#E2E8F0',
    opacity: 0.4,
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
