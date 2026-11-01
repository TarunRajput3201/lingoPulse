import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Path, Ellipse, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS, RADII, TYPOGRAPHY } from '../constants/theme';

interface MascotPipProps {
  mood?: 'happy' | 'encouraging' | 'thinking' | 'celebrating' | 'sad';
  size?: number;
  message?: string;
}

export const MascotPip: React.FC<MascotPipProps> = ({
  mood = 'happy',
  size = 110,
  message,
}) => {
  return (
    <View style={styles.container}>
      {message ? (
        <View style={styles.speechBubbleWrapper}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>{message}</Text>
          </View>
          <View style={styles.bubbleTail} />
        </View>
      ) : null}

      {/* Mascot Vector Artwork (Pip the Chameleon) */}
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <Defs>
          <LinearGradient id="pipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#78E01A" />
            <Stop offset="100%" stopColor="#58CC02" />
          </LinearGradient>
          <LinearGradient id="bellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#A8F242" />
            <Stop offset="100%" stopColor="#84E31E" />
          </LinearGradient>
        </Defs>

        {/* Tail Spiral */}
        <Path
          d="M 32 94 C 14 100 8 76 26 70 C 38 66 44 86 32 94 Z"
          fill="#46A302"
        />

        {/* Back Feet */}
        <Ellipse cx="40" cy="98" rx="8" ry="5" fill="#46A302" />
        <Ellipse cx="72" cy="98" rx="8" ry="5" fill="#46A302" />

        {/* Chameleon Body */}
        <Ellipse cx="58" cy="74" rx="34" ry="26" fill="url(#pipGrad)" />

        {/* Cute Light Belly */}
        <Ellipse cx="58" cy="80" rx="22" ry="16" fill="url(#bellyGrad)" />

        {/* Head */}
        <Circle cx="80" cy="50" r="27" fill="url(#pipGrad)" />

        {/* Head Crest Spike */}
        <Path
          d="M 72 26 C 80 12 92 28 85 34 Z"
          fill="#46A302"
        />

        {/* Celebrating Crown / Star */}
        {mood === 'celebrating' ? (
          <Path
            d="M 70 20 L 76 8 L 84 18 L 92 8 L 96 20 Z"
            fill="#FFC800"
            stroke="#E5A500"
            strokeWidth="2"
          />
        ) : null}

        {/* Big Expressive Eye (Outer White) */}
        <Circle cx="88" cy="46" r="14" fill="#FFFFFF" stroke="#46A302" strokeWidth="2" />

        {/* Eye Pupil with Mood Direction */}
        <Circle
          cx={mood === 'thinking' ? 84 : mood === 'sad' ? 88 : 90}
          cy={mood === 'thinking' ? 42 : mood === 'sad' ? 48 : 46}
          r="8"
          fill="#4B4B4B"
        />

        {/* Eye Catchlight (Reflection Sparkle) */}
        <Circle
          cx={mood === 'thinking' ? 82 : mood === 'sad' ? 86 : 88}
          cy={mood === 'thinking' ? 40 : mood === 'sad' ? 46 : 44}
          r="3"
          fill="#FFFFFF"
        />

        {/* Cute Rosy Cheek */}
        <Circle cx="76" cy="60" r="5" fill="#FF8BA7" opacity={0.6} />

        {/* Mouth by Mood */}
        {mood === 'happy' || mood === 'celebrating' ? (
          <Path
            d="M 85 62 Q 95 69 104 59"
            stroke="#4B4B4B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        ) : mood === 'sad' ? (
          <Path
            d="M 86 65 Q 95 58 102 65"
            stroke="#4B4B4B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <Path
            d="M 86 62 Q 95 62 102 62"
            stroke="#4B4B4B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechBubbleWrapper: {
    alignItems: 'center',
    marginBottom: 8,
  },
  speechBubble: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADII.card,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.grayBorderDark,
    maxWidth: 260,
  },
  speechText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: '800',
    color: COLORS.charcoal,
    textAlign: 'center',
  },
  bubbleTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.grayBorderDark,
    marginTop: -1,
  },
});
