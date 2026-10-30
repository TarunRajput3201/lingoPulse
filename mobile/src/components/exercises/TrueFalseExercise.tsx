import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';

interface TrueFalseExerciseProps {
  prompt: string;
  statement: string;
  selectedValue: boolean | null;
  onSelectValue: (val: boolean) => void;
  disabled?: boolean;
}

export const TrueFalseExercise: React.FC<TrueFalseExerciseProps> = ({
  prompt,
  statement,
  selectedValue,
  onSelectValue,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>

      <View style={styles.statementCard}>
        <Text style={styles.statementText}>{statement}</Text>
      </View>

      <View style={styles.buttonsRow}>
        {/* True Option */}
        <Pressable
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel="True"
          onPress={() => {
            HapticsService.lightTap();
            onSelectValue(true);
          }}
          style={[
            styles.choiceButton,
            selectedValue === true && styles.choiceButtonSelectedTrue,
          ]}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
            <Check size={28} color={COLORS.primaryDark} strokeWidth={3} />
          </View>
          <Text
            style={[
              styles.choiceText,
              selectedValue === true && { color: COLORS.primaryDark },
            ]}
          >
            True
          </Text>
        </Pressable>

        {/* False Option */}
        <Pressable
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel="False"
          onPress={() => {
            HapticsService.lightTap();
            onSelectValue(false);
          }}
          style={[
            styles.choiceButton,
            selectedValue === false && styles.choiceButtonSelectedFalse,
          ]}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#FEE2E2' }]}>
            <X size={28} color={COLORS.accentDark} strokeWidth={3} />
          </View>
          <Text
            style={[
              styles.choiceText,
              selectedValue === false && { color: COLORS.accentDark },
            ]}
          >
            False
          </Text>
        </Pressable>
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
  statementCard: {
    padding: 24,
    borderRadius: RADII.xl,
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    marginBottom: 32,
    alignItems: 'center',
  },
  statementText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.charcoal,
    textAlign: 'center',
    lineHeight: 28,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  choiceButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  choiceButtonSelectedTrue: {
    borderColor: COLORS.primary,
    borderBottomColor: COLORS.primaryDark,
    backgroundColor: COLORS.primarySubtle,
  },
  choiceButtonSelectedFalse: {
    borderColor: COLORS.accent,
    borderBottomColor: COLORS.accentDark,
    backgroundColor: COLORS.accentSubtle,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
});
