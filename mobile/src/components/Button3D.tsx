import React, { useState } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { COLORS, RADII } from '../constants/theme';
import { HapticsService } from '../services/hapticsService';

interface Button3DProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button3D: React.FC<Button3DProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const [pressed, setPressed] = useState(false);

  const getColors = () => {
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

  const colors = getColors();

  return (
    <Pressable
      disabled={disabled}
      onPressIn={() => {
        if (!disabled) {
          setPressed(true);
          HapticsService.lightTap();
        }
      }}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={[
        styles.baseButton,
        {
          backgroundColor: disabled ? '#E5E5E5' : colors.bg,
          borderBottomColor: disabled ? '#D1D5DB' : colors.border,
          borderBottomWidth: variant === 'ghost' ? 0 : pressed ? 1 : 4,
          transform: [{ translateY: pressed ? 3 : 0 }],
        },
        variant === 'outline' && {
          borderWidth: 2,
          borderBottomWidth: pressed ? 2 : 4,
          borderColor: COLORS.grayBorder,
        },
        style,
      ]}
    >
      {icon}
      <Text
        style={[
          styles.baseText,
          { color: disabled ? '#9CA3AF' : colors.text },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: RADII.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  baseText: {
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
