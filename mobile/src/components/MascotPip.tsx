import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CharacterView } from './character/CharacterView';

interface MascotPipProps {
  mood?: 'happy' | 'encouraging' | 'thinking' | 'celebrating' | 'sad';
  size?: number;
  message?: string;
  interactive?: boolean;
  targetLanguage?: string;
}

export const MascotPip: React.FC<MascotPipProps> = ({
  mood = 'happy',
  size = 120,
  message,
  interactive = true,
  targetLanguage = 'fr',
}) => {
  const getPose = () => {
    switch (mood) {
      case 'celebrating':
        return 'levelUp';
      case 'encouraging':
      case 'thinking':
        return 'helper';
      case 'sad':
        return 'companion';
      case 'happy':
      default:
        return 'companion';
    }
  };

  const getEmotionBadge = () => {
    switch (mood) {
      case 'celebrating':
        return 'star' as const;
      case 'encouraging':
        return 'sparkle' as const;
      case 'thinking':
        return 'lightbulb' as const;
      default:
        return undefined;
    }
  };

  return (
    <View style={styles.container}>
      <CharacterView
        character="pip"
        pose={getPose()}
        size={size}
        message={message}
        interactive={interactive}
        roundMask={false}
        showStage={true}
        emotionBadge={getEmotionBadge()}
        targetLanguage={targetLanguage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
