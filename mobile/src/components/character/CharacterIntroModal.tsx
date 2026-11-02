import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { X, Sparkles, Clock, Compass } from 'lucide-react-native';
import { COLORS, RADII, SHADOWS, TYPOGRAPHY } from '../../constants/theme';
import { Button3D } from '../Button3D';
import { CharacterView } from './CharacterView';

interface CharacterIntroModalProps {
  visible: boolean;
  onClose: () => void;
  onStart: () => void;
  lesson: {
    id: string;
    title: string;
    lessonNumber?: number;
    unitTitle?: string;
    xpReward?: number;
    estimatedMinutes?: number;
    culturalTip?: string;
  } | null;
  targetLanguage?: string;
  languageName?: string;
}

export const CharacterIntroModal: React.FC<CharacterIntroModalProps> = ({
  visible,
  onClose,
  onStart,
  lesson,
  targetLanguage = 'fr',
  languageName = 'French',
}) => {
  if (!lesson) return null;

  const isFrench = targetLanguage === 'fr';
  const characterPose = isFrench ? 'french' : 'welcome';
  const greetingWord = isFrench
    ? 'Bonjour! 🇫🇷'
    : targetLanguage === 'es'
    ? '¡Hola! 🇪🇸'
    : targetLanguage === 'ja'
    ? 'Konnichiwa! 🇯🇵'
    : targetLanguage === 'de'
    ? 'Hallo! 🇩🇪'
    : targetLanguage === 'it'
    ? 'Ciao! 🇮🇹'
    : 'Hello! 🌐';

  const defaultTip = isFrench
    ? 'Tip: In France, always greet shopkeepers with "Bonjour" before asking for anything!'
    : `Practice pronunciation out loud to build natural muscle memory in ${languageName}!`;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Close button */}
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <X size={22} color={COLORS.grayText} />
          </Pressable>

          {/* 3D Character Avatar */}
          <View style={styles.characterContainer}>
            <CharacterView
              character="maya"
              pose={characterPose}
              size={130}
              interactive={true}
              roundMask={true}
            />
          </View>

          {/* Speech / Welcome Banner */}
          <View style={styles.speechBubble}>
            <Text style={styles.speechGreeting}>{greetingWord}</Text>
            <Text style={styles.speechSubtitle}>
              I'm Maya, your personal guide! Let's master{' '}
              <Text style={{ color: COLORS.primaryDark, fontWeight: '900' }}>
                {lesson.title}
              </Text>{' '}
              together — at your own pace!
            </Text>
          </View>

          {/* Lesson Metadata Pills */}
          <View style={styles.metaRow}>
            <View style={styles.metaBadge}>
              <Clock size={16} color={COLORS.secondaryDark} />
              <Text style={styles.metaText}>{lesson.estimatedMinutes || 5} min</Text>
            </View>

            <View style={styles.metaBadge}>
              <Sparkles size={16} color={COLORS.gold} />
              <Text style={styles.metaText}>+{lesson.xpReward || 15} XP</Text>
            </View>

            <View style={styles.metaBadge}>
              <Compass size={16} color={COLORS.primaryDark} />
              <Text style={styles.metaText}>Step {lesson.lessonNumber || 1}</Text>
            </View>
          </View>

          {/* Cultural Tip Card */}
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 Cultural Pro-Tip</Text>
            <Text style={styles.tipDesc}>{lesson.culturalTip || defaultTip}</Text>
          </View>

          {/* Action Button */}
          <Button3D
            title="Let's Go! →"
            variant="primary"
            onPress={onStart}
            style={{ width: '100%', marginTop: 20 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    ...SHADOWS.float,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 18,
    right: 18,
    padding: 6,
    zIndex: 10,
  },
  characterContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  speechBubble: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  speechGreeting: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.charcoal,
    marginBottom: 4,
  },
  speechSubtitle: {
    fontSize: 13,
    color: COLORS.grayText,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADII.pill,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  tipCard: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    borderRadius: 16,
    padding: 12,
    width: '100%',
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#92400E',
    marginBottom: 2,
  },
  tipDesc: {
    fontSize: 12,
    fontWeight: '600',
    color: '#78350F',
    lineHeight: 16,
  },
});
