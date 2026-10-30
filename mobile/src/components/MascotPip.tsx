import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Path, Ellipse } from 'react-native-svg';
import { COLORS, RADII, TYPOGRAPHY } from '../constants/theme';

interface MascotPipProps {
  mood?: 'happy' | 'encouraging' | 'thinking' | 'celebrating' | 'sad';
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
      {message ? (
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>{message}</Text>
          <View style={styles.bubbleTail} />
        </View>
      ) : null}

      {/* Mascot Vector Artwork (Pip the Chameleon) */}
      <Svg width={size} height={size} viewBox="0 0 120 120">
        {/* Tail Spiral */}
        <Path
          d="M 30 90 C 15 95 10 75 25 70 C 35 68 40 85 30 90 Z"
          fill={COLORS.primaryDark}
        />

        {/* Chameleon Body */}
        <Ellipse cx="60" cy="70" rx="35" ry="25" fill={COLORS.primary} />

        {/* Head */}
        <Circle cx="80" cy="50" r="28" fill={COLORS.primary} />

        {/* Head Crest */}
        <Path
          d="M 75 22 C 85 10 95 28 88 32 Z"
          fill={COLORS.primaryDark}
        />

        {/* Celebrating Crown / Star */}
        {mood === 'celebrating' ? (
          <Path
            d="M 74 16 L 79 6 L 85 14 L 92 6 L 94 16 Z"
            fill={COLORS.gold}
            stroke={COLORS.goldDark}
            strokeWidth="1.5"
          />
        ) : null}

        {/* Big Expressive Eye Outer */}
        <Circle cx="88" cy="46" r="14" fill={COLORS.white} />
        <Circle
          cx={mood === 'thinking' ? 84 : mood === 'sad' ? 88 : 90}
          cy={mood === 'thinking' ? 42 : mood === 'sad' ? 48 : 46}
          r="8"
          fill={COLORS.charcoal}
        />
        <Circle
          cx={mood === 'thinking' ? 82 : mood === 'sad' ? 86 : 88}
          cy={mood === 'thinking' ? 40 : mood === 'sad' ? 46 : 44}
          r="3"
          fill={COLORS.white}
        />

        {/* Rosy Cheek */}
        <Circle cx="76" cy="60" r="5" fill="#FDA4AF" opacity={0.7} />

        {/* Smile / Mouth by Mood */}
        {mood === 'happy' || mood === 'celebrating' ? (
          <Path
            d="M 85 64 Q 96 69 103 60"
            stroke={COLORS.charcoal}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        ) : mood === 'sad' ? (
          <Path
            d="M 86 65 Q 95 59 101 64"
            stroke={COLORS.charcoal}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <Path
            d="M 85 62 Q 95 62 101 62"
            stroke={COLORS.charcoal}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Front Foot */}
        <Ellipse cx="75" cy="92" rx="7" ry="5" fill={COLORS.primaryDark} />
        {/* Back Foot */}
        <Ellipse cx="48" cy="92" rx="7" ry="5" fill={COLORS.primaryDark} />
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
    borderRadius: RADII.lg,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    marginBottom: 8,
    maxWidth: 260,
    position: 'relative',
    shadowColor: COLORS.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  speechText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: '700',
    color: COLORS.charcoal,
    textAlign: 'center',
    lineHeight: 18,
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
