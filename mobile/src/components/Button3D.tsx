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
  Platform,
} from 'react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../constants/theme';
import { HapticsService } from '../services/hapticsService';

interface Button3DProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'gold' | 'purple' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
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
  fullWidth = false,
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
      case 'danger':
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
          border: COLORS.grayBorderDark,
          borderSide: COLORS.grayBorder,
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
          paddingVertical: 8,
          paddingHorizontal: 16,
          fontSize: TYPOGRAPHY.sizes.sm,
          minHeight: 40,
          depth: 3,
        };
      case 'lg':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          fontSize: TYPOGRAPHY.sizes.lg,
          minHeight: 56,
          depth: 5,
        };
      case 'md':
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 20,
          fontSize: TYPOGRAPHY.sizes.md,
          minHeight: 50,
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
        fullWidth && { width: '100%' },
        Platform.OS === 'web' && ({ cursor: isInteractive ? 'pointer' : 'not-allowed', userSelect: 'none' } as any),
        {
          minHeight: sizeStyles.minHeight,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          backgroundColor: !isInteractive
            ? COLORS.locked
            : variant === 'ghost'
            ? 'transparent'
            : colors.bg,
          borderBottomColor: !isInteractive
            ? COLORS.lockedDark
            : variant === 'ghost'
            ? 'transparent'
            : colors.border,
          borderBottomWidth: variant === 'ghost' ? 0 : pressed ? 1 : sizeStyles.depth,
          transform: [{ translateY: pressed ? sizeStyles.depth - 1 : 0 }],
        },
        variant === 'outline' && {
          borderWidth: 2,
          borderColor: !isInteractive ? COLORS.lockedDark : COLORS.grayBorder,
          borderBottomWidth: pressed ? 2 : sizeStyles.depth + 1,
          borderBottomColor: !isInteractive ? COLORS.lockedDark : COLORS.grayBorderDark,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? COLORS.charcoal : COLORS.white} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
          <Text
            style={[
              styles.baseText,
              {
                fontSize: sizeStyles.fontSize,
                color: !isInteractive ? COLORS.lockedText : colors.text,
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
    borderRadius: RADII.card,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  baseText: {
    fontWeight: '800',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
