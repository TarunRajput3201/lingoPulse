import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Sparkles, Flame, Star, Lightbulb, Heart, Volume2 } from 'lucide-react-native';
import { COLORS, SHADOWS } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';
import { SoundService } from '../../services/soundService';
import {
  CharacterId,
  CharacterMood,
  CHARACTER_PROFILES,
  getCharacterQuote,
} from './Character3DRegistry';
import { EnvironmentType } from './models/Character3DRig';
import { Realtime3DCharacter } from './Realtime3DCharacter';

export interface CharacterViewProps {
  character?: CharacterId;
  pose?: string;
  mood?: CharacterMood;
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
  themeMode?: 'daylight' | 'evening' | 'celebration';
  emotionBadge?: 'star' | 'flame' | 'sparkle' | 'heart' | 'lightbulb';
  autoSpeakMessage?: boolean;
  environmentType?: EnvironmentType;
}

export const CharacterView: React.FC<CharacterViewProps> = ({
  character = 'maya',
  pose,
  mood: initialMood,
  size = 130,
  message: initialMessage,
  messagePosition = 'top',
  interactive = true,
  onPress,
  style,
  containerStyle,
  showBorder = false,
  roundMask = true,
  showStage = false,
  themeMode = 'daylight',
  emotionBadge,
  autoSpeakMessage = false,
  environmentType = 'auto',
}) => {
  const [currentMood, setCurrentMood] = useState<CharacterMood>(initialMood || 'idle');
  const [activeMessage, setActiveMessage] = useState<string | undefined>(initialMessage);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Sync external message and mood updates
  useEffect(() => {
    setActiveMessage(initialMessage);
  }, [initialMessage]);

  useEffect(() => {
    if (initialMood) {
      setCurrentMood(initialMood);
    }
  }, [initialMood]);

  // Map legacy poses to moods if pose is provided
  useEffect(() => {
    if (pose === 'levelUp' || pose === 'celebrate') {
      setCurrentMood('celebrate');
    } else if (pose === 'helper' || pose === 'wink') {
      setCurrentMood('encouraging');
    }
  }, [pose]);

  // Subtle 3D floating animation
  useEffect(() => {
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -5,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );
    floatLoop.start();
    return () => floatLoop.stop();
  }, [floatAnim]);

  // Subscribe to speech events for visual voice indicators
  useEffect(() => {
    const unsubscribe = SoundService.addSpeakingListener((speaking) => {
      setIsSpeaking(speaking);
      if (speaking) {
        setCurrentMood('speaking');
      } else {
        setCurrentMood(initialMood || 'idle');
      }
    });
    return () => {
      unsubscribe();
    };
  }, [initialMood]);

  // Auto-speak message if requested
  useEffect(() => {
    if (autoSpeakMessage && activeMessage) {
      SoundService.speak(activeMessage).catch(() => {});
    }
  }, [autoSpeakMessage, activeMessage]);

  const profile = CHARACTER_PROFILES[character] || CHARACTER_PROFILES.maya;

  const handlePress = () => {
    if (!interactive) return;
    HapticsService.lightTap();

    // Lively interactive bounce
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.92,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3.5,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Trigger spontaneous cheerful quote if no message is pinned
    if (!initialMessage) {
      const quote = getCharacterQuote(character, currentMood);
      setActiveMessage(quote);
      SoundService.speak(quote).catch(() => {});
    }

    if (onPress) {
      onPress();
    }
  };

  const speakCurrentMessage = () => {
    if (activeMessage) {
      HapticsService.lightTap();
      SoundService.speak(activeMessage).catch(() => {});
    }
  };

  return (
    <View style={[styles.outerContainer, containerStyle]}>
      {/* Interactive 3D Speech Bubble */}
      {activeMessage ? (
        <View
          style={[
            styles.speechBubbleWrapper,
            messagePosition === 'bottom' && styles.speechBubbleBottom,
          ]}
        >
          <Pressable onPress={speakCurrentMessage} style={styles.speechBubble}>
            <View style={styles.nameTagRow}>
              <Text style={[styles.nameTagText, { color: profile.darkAccent }]}>
                {profile.name}
              </Text>
              <Text style={styles.roleTagText}>• {profile.role}</Text>
              <View style={styles.audioHintPill}>
                <Volume2 size={13} color={isSpeaking ? profile.accentColor : COLORS.grayText} />
              </View>
            </View>
            <Text style={styles.speechText}>{activeMessage}</Text>
          </Pressable>
          <View
            style={[
              styles.bubbleTail,
              messagePosition === 'bottom' ? styles.bubbleTailBottom : styles.bubbleTailTop,
            ]}
          />
        </View>
      ) : null}

      {/* 3D Character Viewport & Interactive Stage */}
      <Animated.View
        style={[
          styles.stageContainer,
          {
            transform: [{ scale: scaleAnim }, { translateY: floatAnim }],
          },
          style,
        ]}
      >
        <Realtime3DCharacter
          character={character}
          mood={currentMood}
          size={size}
          interactive={interactive}
          onPress={handlePress}
          themeMode={themeMode}
          showStage={showStage}
          environmentType={environmentType}
        />

        {/* Floating Emotion Badge (Optional) */}
        {emotionBadge && (
          <View style={styles.emotionBadgeContainer}>
            {emotionBadge === 'star' && <Star size={16} color="#FFFFFF" fill="#FACC15" />}
            {emotionBadge === 'flame' && <Flame size={16} color="#EA580C" fill="#EA580C" />}
            {emotionBadge === 'sparkle' && <Sparkles size={16} color="#38BDF8" fill="#38BDF8" />}
            {emotionBadge === 'heart' && <Heart size={16} color="#E11D48" fill="#E11D48" />}
            {emotionBadge === 'lightbulb' && <Lightbulb size={16} color="#F59E0B" fill="#F59E0B" />}
          </View>
        )}
      </Animated.View>
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
  speechBubbleWrapper: {
    alignItems: 'center',
    marginBottom: 8,
    maxWidth: 320,
    zIndex: 30,
  },
  speechBubbleBottom: {
    marginBottom: 0,
    marginTop: 8,
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
    gap: 5,
    marginBottom: 4,
  },
  nameTagText: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  roleTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.grayText,
  },
  audioHintPill: {
    marginLeft: 'auto',
    padding: 3,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
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
  emotionBadgeContainer: {
    position: 'absolute',
    top: 6,
    right: 4,
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
});
