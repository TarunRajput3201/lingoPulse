import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';

interface PairItem {
  id: string;
  leftText: string;
  rightText: string;
}

interface MatchingPairsExerciseProps {
  prompt: string;
  pairs: PairItem[];
  matchedPairIds?: string[];
  onCompleteAllPairs: (matches: { [leftId: string]: string }) => void;
  disabled?: boolean;
}

export const MatchingPairsExercise: React.FC<MatchingPairsExerciseProps> = ({
  prompt,
  pairs = [],
  onCompleteAllPairs,
  disabled = false,
}) => {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [completedMatches, setCompletedMatches] = useState<{ [id: string]: boolean }>({});
  const [errorPair, setErrorPair] = useState<{ left: string; right: string } | null>(null);

  // Shuffle right items once upon mounting
  const [shuffledRights] = useState(() =>
    [...pairs].sort(() => Math.random() - 0.5)
  );

  const handleSelectLeft = (id: string) => {
    if (completedMatches[id] || disabled) return;
    HapticsService.lightTap();
    setSelectedLeftId(id);

    if (selectedRightId) {
      evaluatePair(id, selectedRightId);
    }
  };

  const handleSelectRight = (id: string) => {
    if (completedMatches[id] || disabled) return;
    HapticsService.lightTap();
    setSelectedRightId(id);

    if (selectedLeftId) {
      evaluatePair(selectedLeftId, id);
    }
  };

  const evaluatePair = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // Correct Match!
      HapticsService.success();
      const updated = { ...completedMatches, [leftId]: true };
      setCompletedMatches(updated);
      setSelectedLeftId(null);
      setSelectedRightId(null);
      setErrorPair(null);

      // Check if all pairs are matched
      if (Object.keys(updated).length === pairs.length) {
        const payload: { [key: string]: string } = {};
        pairs.forEach((p) => {
          payload[p.id] = p.id;
        });
        onCompleteAllPairs(payload);
      }
    } else {
      // Mismatched
      HapticsService.error();
      setErrorPair({ left: leftId, right: rightId });
      setTimeout(() => {
        setSelectedLeftId(null);
        setSelectedRightId(null);
        setErrorPair(null);
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>

      <View style={styles.columnsWrapper}>
        {/* Left Column */}
        <View style={styles.column}>
          {pairs.map((pair) => {
            const isMatched = completedMatches[pair.id];
            const isSelected = selectedLeftId === pair.id;
            const isError = errorPair?.left === pair.id;

            return (
              <Pressable
                key={`left-${pair.id}`}
                disabled={isMatched || disabled}
                onPress={() => handleSelectLeft(pair.id)}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                  isError && styles.cardError,
                  isMatched && styles.cardMatched,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`${pair.leftText}${isMatched ? ' matched' : ''}`}
              >
                <Text
                  style={[
                    styles.cardText,
                    isSelected && styles.cardTextSelected,
                    isError && styles.cardTextError,
                    isMatched && styles.cardTextMatched,
                  ]}
                >
                  {pair.leftText}
                </Text>
                {isMatched ? (
                  <View style={styles.checkIcon}>
                    <Check size={16} color={COLORS.primary} strokeWidth={3} />
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          {shuffledRights.map((pair) => {
            const isMatched = completedMatches[pair.id];
            const isSelected = selectedRightId === pair.id;
            const isError = errorPair?.right === pair.id;

            return (
              <Pressable
                key={`right-${pair.id}`}
                disabled={isMatched || disabled}
                onPress={() => handleSelectRight(pair.id)}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                  isError && styles.cardError,
                  isMatched && styles.cardMatched,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`${pair.rightText}${isMatched ? ' matched' : ''}`}
              >
                <Text
                  style={[
                    styles.cardText,
                    isSelected && styles.cardTextSelected,
                    isError && styles.cardTextError,
                    isMatched && styles.cardTextMatched,
                  ]}
                >
                  {pair.rightText}
                </Text>
                {isMatched ? (
                  <View style={styles.checkIcon}>
                    <Check size={16} color={COLORS.primary} strokeWidth={3} />
                  </View>
                ) : null}
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
    marginBottom: 20,
  },
  columnsWrapper: {
    flexDirection: 'row',
    gap: 12,
  },
  column: {
    flex: 1,
    gap: 12,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 68,
    position: 'relative',
  },
  cardSelected: {
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
    backgroundColor: COLORS.secondarySubtle,
  },
  cardError: {
    borderColor: COLORS.accent,
    borderBottomColor: COLORS.accentDark,
    backgroundColor: COLORS.accentSubtle,
  },
  cardMatched: {
    borderColor: COLORS.primaryLight,
    borderBottomColor: COLORS.primaryLight,
    backgroundColor: COLORS.primarySubtle,
    borderBottomWidth: 2,
    opacity: 0.7,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.charcoal,
    textAlign: 'center',
  },
  cardTextSelected: {
    color: COLORS.secondaryDark,
    fontWeight: '800',
  },
  cardTextError: {
    color: COLORS.accentDark,
    fontWeight: '800',
  },
  cardTextMatched: {
    color: COLORS.primaryDark,
  },
  checkIcon: {
    position: 'absolute',
    top: 6,
    right: 8,
  },
});
