import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Volume2 } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../constants/theme';
import { HapticsService } from '../../services/hapticsService';
import { SoundService } from '../../services/soundService';

interface TranslationExerciseProps {
  prompt: string;
  sourceText?: string;
  userAnswer: string;
  onChangeAnswer: (text: string) => void;
  targetLanguage?: string;
  disabled?: boolean;
}

export const TranslationExercise: React.FC<TranslationExerciseProps> = ({
  prompt,
  sourceText,
  userAnswer,
  onChangeAnswer,
  targetLanguage = 'es',
  disabled = false,
}) => {
  const getLanguageDetails = () => {
    const lang = targetLanguage.toLowerCase().trim();
    switch (lang) {
      case 'ar':
        return { name: 'Arabic', placeholder: 'اكتب إجابتك بالعربية...', accents: [], isRTL: true };
      case 'he':
        return { name: 'Hebrew', placeholder: 'הקלד את תשובתך בעברית...', accents: [], isRTL: true };
      case 'ur':
        return { name: 'Urdu', placeholder: 'اپنا جواب اردو میں لکھیں...', accents: [], isRTL: true };
      case 'fa':
        return { name: 'Persian', placeholder: 'پاسخ خود را به فارسی بنویسید...', accents: [], isRTL: true };
      case 'ru':
        return { name: 'Russian', placeholder: 'Введите ваш ответ по-русски...', accents: [], isRTL: false };
      case 'uk':
        return { name: 'Ukrainian', placeholder: 'Введіть вашу відповідь українською...', accents: [], isRTL: false };
      case 'el':
        return { name: 'Greek', placeholder: 'Πληκτρολογήστε την απάντησή σας στα ελληνικά...', accents: ['ά', 'έ', 'ή', 'ί', 'ό', 'ύ', 'ώ'], isRTL: false };
      case 'th':
        return { name: 'Thai', placeholder: 'พิมพ์คำตอบเป็นภาษาไทย...', accents: [], isRTL: false };
      case 'hi':
        return { name: 'Hindi', placeholder: 'अपना उत्तर हिन्दी में लिखें...', accents: [], isRTL: false };
      case 'bn':
        return { name: 'Bengali', placeholder: 'আপনার উত্তর বাংলায় লিখুন...', accents: [], isRTL: false };
      case 'pa':
        return { name: 'Punjabi', placeholder: 'ਆਪਣਾ ਜਵਾਬ ਪੰਜਾਬੀ ਵਿੱਚ ਲਿਖੋ...', accents: [], isRTL: false };
      case 'ta':
        return { name: 'Tamil', placeholder: 'உங்கள் பதிலை தமிழில் எழுதுங்கள்...', accents: [], isRTL: false };
      case 'te':
        return { name: 'Telugu', placeholder: 'మీ సమాధానాన్ని తెలుగులో వ్రాయండి...', accents: [], isRTL: false };
      case 'mr':
        return { name: 'Marathi', placeholder: 'तुमचे उत्तर मराठीत लिहा...', accents: [], isRTL: false };
      case 'gu':
        return { name: 'Gujarati', placeholder: 'તમારો જવાબ ગુજરાતીમાં લખો...', accents: [], isRTL: false };
      case 'ja':
        return { name: 'Japanese', placeholder: '日本語で入力してください...', accents: [], isRTL: false };
      case 'ko':
        return { name: 'Korean', placeholder: '한국어로 입력하세요...', accents: [], isRTL: false };
      case 'zh':
        return { name: 'Chinese', placeholder: '请用中文输入...', accents: [], isRTL: false };
      case 'tr':
        return { name: 'Turkish', placeholder: 'Cevabınızı Türkçe yazın...', accents: ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü', 'İ'], isRTL: false };
      case 'pl':
        return { name: 'Polish', placeholder: 'Wpisz odpowiedź po polsku...', accents: ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'], isRTL: false };
      case 'ro':
        return { name: 'Romanian', placeholder: 'Introduceți răspunsul în română...', accents: ['ă', 'â', 'î', 'ș', 'ț'], isRTL: false };
      case 'cs':
        return { name: 'Czech', placeholder: 'Napište svou odpověď v češtině...', accents: ['á', 'č', 'ď', 'é', 'ě', 'í', 'ň', 'ó', 'ř', 'š', 'ť', 'ú', 'ů', 'ý', 'ž'], isRTL: false };
      case 'hu':
        return { name: 'Hungarian', placeholder: 'Írja be válaszát magyarul...', accents: ['á', 'é', 'í', 'ó', 'ö', 'ő', 'ú', 'ü', 'ű'], isRTL: false };
      case 'sv':
        return { name: 'Swedish', placeholder: 'Skriv ditt svar på svenska...', accents: ['å', 'ä', 'ö', 'Å', 'Ä', 'Ö'], isRTL: false };
      case 'no':
        return { name: 'Norwegian', placeholder: 'Skriv svaret ditt på norsk...', accents: ['æ', 'ø', 'å', 'Æ', 'Ø', 'Å'], isRTL: false };
      case 'da':
        return { name: 'Danish', placeholder: 'Skriv dit svar på dansk...', accents: ['æ', 'ø', 'å', 'Æ', 'Ø', 'Å'], isRTL: false };
      case 'vi':
        return { name: 'Vietnamese', placeholder: 'Nhập câu trả lời bằng tiếng Việt...', accents: ['à', 'á', 'ả', 'ã', 'ạ', 'ă', 'â', 'đ', 'è', 'é', 'ê', 'ì', 'í', 'ò', 'ó', 'ô', 'ơ', 'ù', 'ú', 'ư'], isRTL: false };
      case 'nl':
        return { name: 'Dutch', placeholder: 'Typ je antwoord in het Nederlands...', accents: ['é', 'ë', 'ï'], isRTL: false };
      case 'id':
        return { name: 'Indonesian', placeholder: 'Ketik jawaban Anda dalam bahasa Indonesia...', accents: [], isRTL: false };
      case 'ms':
        return { name: 'Malay', placeholder: 'Taip jawapan anda dalam bahasa Melayu...', accents: [], isRTL: false };
      case 'tl':
        return { name: 'Tagalog', placeholder: 'I-type ang iyong sagot sa Tagalog...', accents: [], isRTL: false };
      case 'sw':
        return { name: 'Swahili', placeholder: 'Andika jibu lako kwa Kiswahili...', accents: [], isRTL: false };
      case 'fr':
        return { name: 'French', placeholder: 'Type your answer in French...', accents: ['à', 'â', 'ç', 'é', 'è', 'ê', 'ë', 'î', 'ô', 'ù'], isRTL: false };
      case 'de':
        return { name: 'German', placeholder: 'Type your answer in German...', accents: ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'], isRTL: false };
      case 'it':
        return { name: 'Italian', placeholder: 'Type your answer in Italian...', accents: ['à', 'è', 'é', 'ì', 'í', 'î', 'ò', 'ó', 'ù', 'ú'], isRTL: false };
      case 'pt':
        return { name: 'Portuguese', placeholder: 'Type your answer in Portuguese...', accents: ['á', 'â', 'ã', 'à', 'ç', 'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú'], isRTL: false };
      case 'en':
        return { name: 'English', placeholder: 'Type your answer in English...', accents: [], isRTL: false };
      case 'es':
      default:
        return { name: 'Spanish', placeholder: 'Type your answer in Spanish...', accents: ['á', 'é', 'í', 'ó', 'ú', 'ñ', '¿', '¡'], isRTL: false };
    }
  };

  const { placeholder, accents, isRTL } = getLanguageDetails();

  const handleInsertAccent = (char: string) => {
    if (disabled) return;
    HapticsService.lightTap();
    onChangeAnswer((userAnswer || '') + char);
  };

  // Only show source box if genuine phrase to translate (not an instruction)
  const shouldShowSourceBox =
    Boolean(sourceText) &&
    !sourceText?.trim().toLowerCase().startsWith('type your') &&
    !sourceText?.trim().toLowerCase().startsWith('translate to') &&
    !sourceText?.trim().toLowerCase().startsWith('enter your') &&
    sourceText?.trim() !== prompt.trim();

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>

      {shouldShowSourceBox ? (
        <View style={styles.sourceBox}>
          <View style={styles.sourceHeaderRow}>
            <Text style={styles.sourceLabel}>Phrase:</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Listen to phrase pronunciation"
              onPress={() => {
                HapticsService.lightTap();
                SoundService.speak(sourceText!, { lang: targetLanguage });
              }}
              style={styles.speakerButton}
            >
              <Volume2 size={20} color={COLORS.secondaryDark} />
            </Pressable>
          </View>
          <Text style={styles.sourceText}>{sourceText}</Text>
        </View>
      ) : null}

      <View style={styles.inputWrapper}>
        <TextInput
          editable={!disabled}
          value={userAnswer || ''}
          onChangeText={onChangeAnswer}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          multiline
          style={[
            styles.textInput,
            isRTL && { textAlign: 'right', writingDirection: 'rtl' },
          ]}
          autoCapitalize="sentences"
          autoCorrect={false}
        />
      </View>

      {/* Quick Diacritics Bar for Mobile Learners */}
      {accents && accents.length > 0 && !disabled ? (
        <View style={styles.accentsContainer}>
          <Text style={styles.accentsHint}>Accents:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.accentsRow}
          >
            {accents.map((char) => (
              <Pressable
                key={char}
                onPress={() => handleInsertAccent(char)}
                style={styles.accentKey}
                accessibilityRole="button"
                accessibilityLabel={`Insert ${char}`}
              >
                <Text style={styles.accentText}>{char}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  prompt: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: '800',
    color: COLORS.charcoal,
    lineHeight: 28,
    marginBottom: 16,
  },
  sourceBox: {
    backgroundColor: COLORS.surfaceAlt,
    padding: 16,
    borderRadius: RADII.lg,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
  },
  sourceHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  speakerButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#E0F2FE',
  },
  sourceLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.grayText,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  sourceText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  inputWrapper: {
    minHeight: 120,
    backgroundColor: COLORS.white,
    borderRadius: RADII.xl,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: COLORS.grayBorder,
    borderBottomColor: COLORS.grayBorderDark,
    padding: 14,
  },
  textInput: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.charcoal,
    textAlignVertical: 'top',
    minHeight: 90,
  },
  accentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  accentsHint: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.grayText,
  },
  accentsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  accentKey: {
    width: 38,
    height: 38,
    borderRadius: RADII.md,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 2,
    borderBottomWidth: 3,
    borderColor: COLORS.grayBorder,
    borderBottomColor: COLORS.grayBorderDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
});
