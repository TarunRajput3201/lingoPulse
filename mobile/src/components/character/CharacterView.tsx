import React, { useRef } from 'react';
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
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

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
        toValue: 0.92,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    if (onPress) {
      onPress();
    }
  };

  const imageSource = getImageSource();

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

      {/* 3D Character Avatar Image with Interactive Press */}
      <Pressable onPress={handlePress} disabled={!interactive && !onPress}>
        <Animated.View
          style={[
            styles.imageWrapper,
            {
              width: size,
              height: size,
              borderRadius: roundMask ? size / 2 : 24,
              transform: [{ scale: scaleAnim }],
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
                borderRadius: roundMask ? size / 2 : 24,
              },
            ]}
            resizeMode="cover"
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechBubbleWrapper: {
    alignItems: 'center',
    marginBottom: 8,
    maxWidth: 280,
    zIndex: 10,
  },
  speechBubbleBottom: {
    marginBottom: 0,
    marginTop: 8,
  },
  speechBubble: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    ...SHADOWS.card,
  },
  speechText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.charcoal,
    textAlign: 'center',
    lineHeight: 20,
  },
  bubbleTail: {
    width: 14,
    height: 14,
    backgroundColor: COLORS.white,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#E2E8F0',
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
    ...SHADOWS.float,
  },
  characterBorder: {
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  characterImage: {
    backgroundColor: '#F1F5F9',
  },
});
