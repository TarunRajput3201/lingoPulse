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
  targetLanguage?: string;
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
  targetLanguage = 'es',
}) => {
  const [currentMood, setCurrentMood] = useState<CharacterMood>(initialMood || 'idle');
  const [activeMessage, setActiveMessage] = useState<string | undefined>(initialMessage);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  // Subscribe to speech events for visual voice indicators & mouth sync
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

  // Auto-speak message in target language if requested
  useEffect(() => {
    if (autoSpeakMessage && activeMessage) {
      SoundService.speak(activeMessage, { lang: targetLanguage }).catch(() => {});
    }
  }, [autoSpeakMessage, activeMessage, targetLanguage]);

  const profile = CHARACTER_PROFILES[character] || CHARACTER_PROFILES.maya;

  const handlePress = () => {
    if (!interactive) return;
    HapticsService.lightTap();

    // Natural tactile feedback bounce
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.94,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 110,
        useNativeDriver: true,
      }),
    ]).start();

    // Trigger spontaneous cheerful quote in active learning language if no message is pinned
    if (!initialMessage) {
      const quote = getCharacterQuote(character, currentMood, targetLanguage);
      setActiveMessage(quote);
      SoundService.speak(quote, { lang: targetLanguage }).catch(() => {});
    }

    if (onPress) {
      onPress();
    }
  };

  const speakCurrentMessage = () => {
    if (activeMessage) {
      HapticsService.lightTap();
      SoundService.speak(activeMessage, { lang: targetLanguage }).catch(() => {});
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

      {/* 3D Character Viewport & Grounded Stage (No floating detachment) */}
      <Animated.View
        style={[
          styles.stageContainer,
          {
            transform: [{ scale: scaleAnim }],
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
    zIndex: 10,
    width: '100%',
    maxWidth: 360,
  },
  speechBubbleBottom: {
    marginTop: 8,
    marginBottom: 0,
  },
  speechBubble: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    ...SHADOWS.card3D,
    width: '100%',
  },
  nameTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  nameTagText: {
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  roleTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  audioHintPill: {
    marginLeft: 'auto',
    padding: 2,
  },
  speechText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.charcoal,
    lineHeight: 19,
  },
  bubbleTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  bubbleTailTop: {
    borderTopWidth: 8,
    borderTopColor: '#E2E8F0',
  },
  bubbleTailBottom: {
    borderBottomWidth: 8,
    borderBottomColor: '#E2E8F0',
  },
  emotionBadgeContainer: {
    position: 'absolute',
    top: 4,
    right: 8,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 5,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...SHADOWS.sm,
  },
});
