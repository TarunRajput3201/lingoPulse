import React, { useState } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  ActivityIndicator,
  View,
} from 'react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../constants/theme';
import { HapticsService } from '../services/hapticsService';

interface Button3DProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'gold' | 'purple' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button3D: React.FC<Button3DProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const [pressed, setPressed] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: COLORS.primary,
          border: COLORS.primaryDark,
          text: COLORS.white,
        };
      case 'secondary':
        return {
          bg: COLORS.secondary,
          border: COLORS.secondaryDark,
          text: COLORS.white,
        };
      case 'accent':
        return {
          bg: COLORS.accent,
          border: COLORS.accentDark,
          text: COLORS.white,
        };
      case 'gold':
        return {
          bg: COLORS.gold,
          border: COLORS.goldDark,
          text: COLORS.charcoal,
        };
      case 'purple':
        return {
          bg: COLORS.purple,
          border: COLORS.purpleDark,
          text: COLORS.white,
        };
      case 'outline':
        return {
          bg: COLORS.white,
          border: COLORS.grayBorder,
          text: COLORS.charcoal,
        };
      case 'ghost':
        return {
          bg: 'transparent',
          border: 'transparent',
          text: COLORS.grayText,
        };
      default:
        return {
          bg: COLORS.primary,
          border: COLORS.primaryDark,
          text: COLORS.white,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: 10,
          paddingHorizontal: 16,
          fontSize: TYPOGRAPHY.sizes.sm,
          minHeight: 40,
          depth: 3,
        };
      case 'lg':
        return {
          paddingVertical: 18,
          paddingHorizontal: 24,
          fontSize: TYPOGRAPHY.sizes.lg,
          minHeight: 56,
          depth: 5,
        };
      case 'md':
      default:
        return {
          paddingVertical: 14,
          paddingHorizontal: 20,
          fontSize: TYPOGRAPHY.sizes.md,
          minHeight: 48,
          depth: 4,
        };
    }
  };

  const colors = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const isInteractive = !disabled && !loading;

  return (
    <Pressable
      disabled={!isInteractive}
      accessibilityRole="button"
      accessibilityState={{ disabled: !isInteractive, busy: loading }}
      onPressIn={() => {
        if (isInteractive) {
          setPressed(true);
          HapticsService.lightTap();
        }
      }}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={[
        styles.baseButton,
        {
          minHeight: sizeStyles.minHeight,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          backgroundColor: !isInteractive
            ? '#E2E8F0'
            : variant === 'ghost'
            ? 'transparent'
            : colors.bg,
          borderBottomColor: !isInteractive
            ? '#CBD5E1'
            : variant === 'ghost'
            ? 'transparent'
            : colors.border,
          borderBottomWidth: variant === 'ghost' ? 0 : pressed ? 1 : sizeStyles.depth,
          transform: [{ translateY: pressed ? sizeStyles.depth - 1 : 0 }],
        },
        variant === 'outline' && {
          borderWidth: 2,
          borderColor: !isInteractive ? '#CBD5E1' : COLORS.grayBorder,
          borderBottomColor: !isInteractive ? '#CBD5E1' : '#CBD5E1',
          borderBottomWidth: pressed ? 2 : sizeStyles.depth,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? COLORS.primary : COLORS.white}
          style={styles.spinner}
        />
      ) : (
        <View style={styles.contentRow}>
          {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
          <Text
            style={[
              styles.baseText,
              {
                fontSize: sizeStyles.fontSize,
                color: !isInteractive
                  ? '#94A3B8'
                  : colors.text,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: RADII.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconContainer: {
    marginRight: 4,
  },
  baseText: {
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  spinner: {
    paddingVertical: 2,
  },
});
