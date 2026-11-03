import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Animated,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Sparkles, Flame, Star, Lightbulb, Heart } from 'lucide-react-native';
import { COLORS, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';
import { CHARACTER_IMAGES, CharacterId } from './CharacterAssets';

interface CharacterViewProps {
  character?: CharacterId;
  pose?: string;
  size?: number;
  message?: string;
  messagePosition?: 'top' | 'right' | 'left' | 'bottom';
  interactive?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  showBorder?: boolean;
  roundMask?: boolean;
  showStage?: boolean;
  emotionBadge?: 'star' | 'flame' | 'sparkle' | 'heart' | 'lightbulb';
}

export const CharacterView: React.FC<CharacterViewProps> = ({
  character = 'maya',
  pose = 'welcome',
  size = 120,
  message,
  messagePosition = 'top',
  interactive = true,
  onPress,
  style,
  containerStyle,
  showBorder = false,
  roundMask = true,
  showStage = false,
  emotionBadge,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const auraPulse = useRef(new Animated.Value(0.85)).current;

  // Continuous subtle 3D breathing & floating animation
  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(floatAnim, {
            toValue: -6,
            duration: 1600,
            useNativeDriver: true,
          }),
          Animated.timing(auraPulse, {
            toValue: 1.05,
            duration: 1600,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 1600,
            useNativeDriver: true,
          }),
          Animated.timing(auraPulse, {
            toValue: 0.85,
            duration: 1600,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    floatLoop.start();
    return () => floatLoop.stop();
  }, [floatAnim, auraPulse]);

  // Character Theme Colors & Metas
  const characterMeta = {
    maya: {
      name: 'Maya',
      role: 'Guide',
      haloColor: 'rgba(88, 204, 2, 0.22)',
      pedestalColor: '#DCFCE7',
      pedestalBorder: '#86EFAC',
      pedestalBottom: '#16A34A',
    },
    pip: {
      name: 'Pip',
      role: 'Companion',
      haloColor: 'rgba(14, 165, 233, 0.22)',
      pedestalColor: '#E0F2FE',
      pedestalBorder: '#7DD3FC',
      pedestalBottom: '#0284C7',
    },
    leo: {
      name: 'Leo',
      role: 'Mentor',
      haloColor: 'rgba(245, 158, 11, 0.22)',
      pedestalColor: '#FEF3C7',
      pedestalBorder: '#FCD34D',
      pedestalBottom: '#D97706',
    },
  }[character] || {
    name: 'Maya',
    role: 'Guide',
    haloColor: 'rgba(88, 204, 2, 0.22)',
    pedestalColor: '#DCFCE7',
    pedestalBorder: '#86EFAC',
    pedestalBottom: '#16A34A',
  };

  // Resolve image source safely
  const getImageSource = () => {
    if (character === 'maya') {
      if (pose === 'french') return CHARACTER_IMAGES.maya.french;
      if (pose === 'wink') return CHARACTER_IMAGES.maya.wink;
      return CHARACTER_IMAGES.maya.welcome;
    }
    if (character === 'pip') {
      if (pose === 'levelUp' || pose === 'celebrate') return CHARACTER_IMAGES.pip.levelUp;
      if (pose === 'helper') return CHARACTER_IMAGES.pip.helper;
      return CHARACTER_IMAGES.pip.companion;
    }
    if (character === 'leo') {
      return CHARACTER_IMAGES.leo.mentor;
    }
    return CHARACTER_IMAGES.maya.welcome;
  };

  const handlePress = () => {
    if (!interactive) return;
    HapticsService.lightTap();

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.90,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3.5,
        tension: 90,
        useNativeDriver: true,
      }),
    ]).start();

    if (onPress) {
      onPress();
    }
  };

  const imageSource = getImageSource();
  const borderRadius = roundMask ? size / 2 : 28;

  return (
    <View style={[styles.outerContainer, containerStyle]}>
      {/* Speech Bubble (when message is provided) */}
      {message ? (
        <View
          style={[
            styles.speechBubbleWrapper,
            messagePosition === 'bottom' && styles.speechBubbleBottom,
          ]}
        >
          <View style={styles.speechBubble}>
            <View style={styles.nameTagRow}>
              <Text style={styles.nameTagText}>{characterMeta.name}</Text>
              <Text style={styles.roleTagText}>• {characterMeta.role}</Text>
            </View>
            <Text style={styles.speechText}>{message}</Text>
          </View>
          <View
            style={[
              styles.bubbleTail,
              messagePosition === 'bottom' ? styles.bubbleTailBottom : styles.bubbleTailTop,
            ]}
          />
        </View>
      ) : null}

      {/* 3D Character Stage & Interactive Avatar */}
      <Pressable onPress={handlePress} disabled={!interactive && !onPress}>
        <View style={styles.stageContainer}>
          {/* Ambient Lighting Aura Glow */}
          <Animated.View
            style={[
              styles.auraRing,
              {
                width: size * 1.25,
                height: size * 1.25,
                borderRadius: (size * 1.25) / 2,
                backgroundColor: characterMeta.haloColor,
                transform: [{ scale: auraPulse }],
              },
            ]}
          />

          {/* Floating Character Body */}
          <Animated.View
            style={[
              styles.imageWrapper,
              {
                width: size,
                height: size,
                borderRadius,
                transform: [{ scale: scaleAnim }, { translateY: floatAnim }],
              },
              showBorder && styles.characterBorder,
              style,
            ]}
          >
            <Image
              source={imageSource}
              style={[
                styles.characterImage,
                {
                  width: size,
                  height: size,
                  borderRadius,
                },
              ]}
              resizeMode="cover"
            />

            {/* Specular Rim Light Bevel */}
            <View style={[styles.rimLight, { borderRadius }]} pointerEvents="none" />
          </Animated.View>

          {/* Floating Emotion Badge (Optional) */}
          {emotionBadge && (
            <Animated.View
              style={[
                styles.emotionBadgeContainer,
                { transform: [{ translateY: floatAnim }] },
              ]}
            >
              {emotionBadge === 'star' && <Star size={16} color="#FFFFFF" fill="#FACC15" />}
              {emotionBadge === 'flame' && <Flame size={16} color="#EA580C" fill="#EA580C" />}
              {emotionBadge === 'sparkle' && <Sparkles size={16} color="#38BDF8" fill="#38BDF8" />}
              {emotionBadge === 'heart' && <Heart size={16} color="#E11D48" fill="#E11D48" />}
              {emotionBadge === 'lightbulb' && <Lightbulb size={16} color="#F59E0B" fill="#F59E0B" />}
            </Animated.View>
          )}

          {/* 3D Island Pedestal Platform (when showStage is true or size > 100) */}
          {showStage && (
            <View
              style={[
                styles.stagePlatform,
                {
                  width: size * 1.15,
                  backgroundColor: characterMeta.pedestalColor,
                  borderColor: characterMeta.pedestalBorder,
                  borderBottomColor: characterMeta.pedestalBottom,
                },
              ]}
            />
          )}

          {/* Soft Ground Contact Shadow */}
          <View
            style={[
              styles.contactShadow,
              {
                width: size * 0.72,
                height: Math.max(7, size * 0.1),
                borderRadius: 999,
              },
            ]}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  auraRing: {
    position: 'absolute',
    top: -10,
    zIndex: 1,
  },
  speechBubbleWrapper: {
    alignItems: 'center',
    marginBottom: 10,
    maxWidth: 290,
    zIndex: 20,
  },
  speechBubbleBottom: {
    marginBottom: 0,
    marginTop: 10,
  },
  speechBubble: {
    ...SHADOWS.card3D,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    borderBottomColor: '#CBD5E1',
  },
  nameTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  nameTagText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  roleTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.grayText,
  },
  speechText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.charcoal,
    lineHeight: 20,
  },
  bubbleTail: {
    width: 14,
    height: 14,
    backgroundColor: COLORS.white,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#CBD5E1',
    transform: [{ rotate: '45deg' }],
    alignSelf: 'center',
  },
  bubbleTailTop: {
    marginTop: -7,
  },
  bubbleTailBottom: {
    marginTop: 0,
    marginBottom: -7,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 2,
    borderTopWidth: 2,
  },
  imageWrapper: {
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    ...SHADOWS.float,
  },
  characterBorder: {
    borderWidth: 3.5,
    borderColor: '#FFFFFF',
  },
  characterImage: {
    backgroundColor: '#F1F5F9',
  },
  rimLight: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  emotionBadgeContainer: {
    position: 'absolute',
    top: 4,
    right: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3,
    borderBottomColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 25,
    ...SHADOWS.float,
  },
  stagePlatform: {
    height: 18,
    borderRadius: 999,
    borderWidth: 2,
    borderBottomWidth: 5,
    marginTop: -8,
    zIndex: 5,
  },
  contactShadow: {
    backgroundColor: 'rgba(15, 23, 42, 0.16)',
    alignSelf: 'center',
    marginTop: 6,
    zIndex: 2,
  },
});
