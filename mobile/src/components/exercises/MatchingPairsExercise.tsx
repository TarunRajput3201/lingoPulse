import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, RADII } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';

interface PairItem {
  id: string;
  leftText: string;
  rightText: string;
}

interface MatchingPairsExerciseProps {
  prompt: string;
  pairs: PairItem[];
  matchedPairIds: string[];
  onCompleteAllPairs: (matches: { [leftId: string]: string }) => void;
  disabled?: boolean;
}

export const MatchingPairsExercise: React.FC<MatchingPairsExerciseProps> = ({
  prompt,
  pairs,
  matchedPairIds,
  onCompleteAllPairs,
  disabled = false,
}) => {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const [completedMatches, setCompletedMatches] = useState<{ [id: string]: boolean }>({});
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
      setTimeout(() => {
        setSelectedLeftId(null);
        setSelectedRightId(null);
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

            return (
              <Pressable
                key={`left-${pair.id}`}
                disabled={isMatched || disabled}
                onPress={() => handleSelectLeft(pair.id)}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                  isMatched && styles.cardMatched,
                ]}
              >
                <Text
                  style={[
                    styles.cardText,
                    isSelected && styles.cardTextSelected,
                    isMatched && styles.cardTextMatched,
                  ]}
                >
                  {pair.leftText}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          {shuffledRights.map((pair) => {
            const isMatched = completedMatches[pair.id];
            const isSelected = selectedRightId === pair.id;

            return (
              <Pressable
                key={`right-${pair.id}`}
                disabled={isMatched || disabled}
                onPress={() => handleSelectRight(pair.id)}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                  isMatched && styles.cardMatched,
                ]}
              >
                <Text
                  style={[
                    styles.cardText,
                    isSelected && styles.cardTextSelected,
                    isMatched && styles.cardTextMatched,
                  ]}
                >
                  {pair.rightText}
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
    borderRadius: RADII.lg,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64,
  },
  cardSelected: {
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
    backgroundColor: '#F0F9FF',
  },
  cardMatched: {
    borderColor: COLORS.primary,
    borderBottomColor: COLORS.primaryDark,
    backgroundColor: '#F2FCE2',
    opacity: 0.6,
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
  cardTextMatched: {
    color: COLORS.primaryDark,
  },
});
