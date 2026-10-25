import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Path, Ellipse } from 'react-native-svg';
import { COLORS } from '../constants/theme';

interface MascotPipProps {
  mood?: 'happy' | 'encouraging' | 'thinking' | 'celebrating';
  size?: number;
  message?: string;
}

export const MascotPip: React.FC<MascotPipProps> = ({
  mood = 'happy',
  size = 100,
  message,
}) => {
  return (
    <View style={styles.container}>
      {message && (
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>{message}</Text>
          <View style={styles.bubbleTail} />
        </View>
      )}

      {/* Mascot Vector Artwork */}
      <Svg width={size} height={size} viewBox="0 0 120 120">
        {/* Tail Spiral */}
        <Path
          d="M 30 90 C 15 95 10 75 25 70 C 35 68 40 85 30 90 Z"
          fill="#46A302"
        />

        {/* Chameleon Body */}
        <Ellipse cx="60" cy="70" rx="35" ry="25" fill="#58CC02" />

        {/* Head */}
        <Circle cx="80" cy="50" r="28" fill="#58CC02" />

        {/* Head Crest */}
        <Path
          d="M 75 22 C 85 10 95 28 88 32 Z"
          fill="#46A302"
        />

        {/* Big Expressive Eye Outer */}
        <Circle cx="88" cy="46" r="14" fill="#FFFFFF" />
        <Circle
          cx={mood === 'thinking' ? 84 : 90}
          cy={mood === 'thinking' ? 42 : 46}
          r="8"
          fill="#1E293B"
        />
        <Circle
          cx={mood === 'thinking' ? 82 : 88}
          cy={mood === 'thinking' ? 40 : 44}
          r="3"
          fill="#FFFFFF"
        />

        {/* Rosy Cheek */}
        <Circle cx="76" cy="60" r="5" fill="#FF8CA3" opacity={0.6} />

        {/* Smile / Mouth */}
        {mood === 'happy' || mood === 'celebrating' ? (
          <Path
            d="M 85 64 Q 96 68 102 60"
            stroke="#1E293B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <Path
            d="M 85 62 Q 95 62 100 62"
            stroke="#1E293B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Front Foot */}
        <Ellipse cx="75" cy="92" rx="7" ry="5" fill="#46A302" />
        {/* Back Foot */}
        <Ellipse cx="48" cy="92" rx="7" ry="5" fill="#46A302" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 12,
  },
  speechBubble: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    marginBottom: 8,
    maxWidth: 240,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  speechText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.charcoal,
    textAlign: 'center',
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.grayBorder,
  },
});
