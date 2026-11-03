import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const JAPANESE_LANGUAGE: LanguageDefinition = {
  code: 'ja-en',
  title: 'Japanese Academy',
  description: 'Master practical Japanese from foundational kana and keigo etiquette to advanced JLPT N1 fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'ja',
  flagIcon: '🇯🇵',
  level: 'A1–C1',
  order: 4,
  nativeName: '日本語',
  isRTL: false,
  region: 'Asian',
  culturalTips: {
    1: 'Bowing (ojigi) is a fundamental part of greetings and expressing respect in Japanese culture.',
    2: 'Honorifics like "-san", "-kun", and "-sensei" convey polite social nuance and distance.',
  },
  units: {
    1: [
      v('こんにちは', 'Hello', 'expression', 'Konnichiwa', 'こんにちは、お元気ですか？', 'Hello, how are you?', '___、お元気ですか？', 'こんにちは', ['さようなら', 'ありがとう', 'はい']),
      v('さようなら', 'Goodbye', 'expression', 'Sayounara', 'さようなら、また明日！', 'Goodbye, see you tomorrow!', '___、また明日！', 'さようなら', ['こんにちは', 'お願いします', 'はい']),
      v('ありがとう', 'Thank you', 'expression', 'Arigatou', 'どうもありがとうございます。', 'Thank you very much.', 'どうも___ございます。', 'ありがとう', ['すみません', 'こんにちは', 'いいえ']),
      v('お願いします', 'Please', 'expression', 'Onegaishimasu', 'お水を一杯お願いします。', 'A glass of water, please.', 'お水を一杯___ 。', 'お願いします', ['ありがとう', 'さようなら', 'はい']),
      v('はい', 'Yes', 'expression', 'Hai', 'はい、よく理解できました。', 'Yes, I understood well.', '___、よく理解できました。', 'はい', ['いいえ', 'ありがとう', 'すみません']),
      v('いいえ', 'No', 'expression', 'Iie', 'いいえ、結構です。', 'No, that is fine / no thank you.', '___、結構です。', 'いいえ', ['はい', 'こんにちは', 'ありがとう']),
      v('お元気ですか', 'How are you?', 'phrase', 'Ogenki desu ka', '田中さん、お元気ですか？', 'Mr. Tanaka, how are you?', '田中さん、___ ？', 'お元気ですか', ['さようなら', 'ありがとう', 'おやすみ']),
      v('ようこそ', 'Welcome', 'expression', 'Youkoso', '日本へようこそ！', 'Welcome to Japan!', '日本へ___ ！', 'ようこそ', ['さようなら', 'ありがとう', 'すみません']),
      v('またね', 'See you soon', 'phrase', 'Mata ne', 'またね、気をつけてね！', 'See you soon, take care!', '___、気をつけてね！', 'またね', ['こんにちは', 'お願いします', 'はい']),
      v('おやすみなさい', 'Good night', 'expression', 'Oyasuminasai', 'おやすみなさい、良い夢を。', 'Good night, sweet dreams.', '___、良い夢を。', 'おやすみなさい', ['おはよう', 'ありがとう', 'はい']),
    ],
    2: [
      v('初めまして', 'Nice to meet you', 'expression', 'Hajimemashite', '初めまして、よろしくお願いします。', 'Nice to meet you, please treat me well.', '___、よろしくお願いします。', '初めまして', ['すみません', 'ありがとう', 'さようなら']),
      v('私の名前は', 'My name is', 'phrase', 'Watashi no namae wa', '私の名前はケンです。', 'My name is Ken.', '___ケンです。', '私の名前は', ['初めまして', 'お願いします', 'ありがとう']),
      v('すみません', 'Excuse me / Sorry', 'expression', 'Sumimasen', 'すみません、駅はどこですか？', 'Excuse me, where is the station?', '___、駅はどこですか？', 'すみません', ['ありがとう', 'こんにちは', 'はい']),
      v('おはようございます', 'Good morning', 'phrase', 'Ohayou gozaimasu', '皆さん、おはようございます！', 'Good morning everyone!', '皆さん、___ ！', 'おはようございます', ['おやすみなさい', 'さようなら', 'じゃあね']),
      v('どういたしまして', 'You are welcome', 'phrase', 'Douitashimashite', 'いいえ、どういたしまして！', 'No problem, you\'re welcome!', 'いいえ、___ ！', 'どういたしまして', ['ありがとう', 'こんにちは', 'はい']),
      v('友達', 'Friend', 'noun', 'Tomodachi', '彼は私の大切な友達です。', 'He is my precious friend.', '彼は私の大切な___です。', '友達', ['先生', '家族', '学生']),
      v('先生', 'Teacher', 'noun', 'Sensei', '先生、質問があります。', 'Teacher, I have a question.', '___、質問があります。', '先生', ['学生', '友達', '医者']),
      v('日本', 'Japan', 'noun', 'Nihon', '日本は四季が美しい国です。', 'Japan is a country with beautiful four seasons.', '___は四季が美しい国です。', '日本', ['東京', '京都', '駅']),
      v('大丈夫です', 'All right / It is okay', 'phrase', 'Daijoubu desu', '心配しないで、大丈夫です。', 'Don\'t worry, it is all right.', '心配しないで、___ 。', '大丈夫です', ['だめです', 'すみません', 'いいえ']),
      v('よろしくお願いします', 'Please treat me kindly', 'phrase', 'Yoroshiku onegaishimasu', 'これからよろしくお願いします。', 'I look forward to working with you.', 'これから___ 。', 'よろしくお願いします', ['さようなら', 'こんにちは', 'ありがとう']),
    ],
  },
};

for (let u = 3; u <= 50; u++) {
  JAPANESE_LANGUAGE.units[u] = [
    v(`言葉_ja_${u}_1`, `Japanese Concept ${u}.1`, 'noun', `Kotoba_${u}_1`, `この概念${u}は日本語学習において大切です。`, `This concept ${u} is important in Japanese study.`, `この概念___は日本語学習において大切です。`, `言葉_ja_${u}_1`, ['意味', '文法', '漢字']),
    v(`言葉_ja_${u}_2`, `Japanese Concept ${u}.2`, 'verb', `Kotoba_${u}_2`, `このテーマ${u}を深く理解しましょう。`, `Let's understand theme ${u} deeply.`, `このテーマ___を深く理解しましょう。`, `言葉_ja_${u}_2`, ['勉強する', '読む', '考える']),
    v(`言葉_ja_${u}_3`, `Japanese Concept ${u}.3`, 'adjective', `Kotoba_${u}_3`, `新しい視点${u}が会話を豊かにします。`, `A new perspective ${u} enriches conversation.`, `新しい視点___が会話を豊かにします。`, `言葉_ja_${u}_3`, ['明確な', '深い', '良い']),
    v(`言葉_ja_${u}_4`, `Japanese Concept ${u}.4`, 'noun', `Kotoba_${u}_4`, `このレッスン${u}の習得がN1レベルにつながります。`, `Mastering lesson ${u} leads to N1 level.`, `このレッスン___の習得がN1レベルにつながります。`, `言葉_ja_${u}_4`, ['レベル', '文脈', '表現']),
    v(`言葉_ja_${u}_5`, `Japanese Concept ${u}.5`, 'expression', `Kotoba_${u}_5`, `間違いなくこの要素${u}が決定打となります。`, `Undoubtedly this element ${u} is decisive.`, `間違いなくこの要素___が決定打となります。`, `言葉_ja_${u}_5`, ['おそらく', '決して', 'いつも']),
    v(`言葉_ja_${u}_6`, `Japanese Concept ${u}.6`, 'noun', `Kotoba_${u}_6`, `日本語の文法${u}を正確に使いこなします。`, `Use Japanese grammar ${u} accurately.`, `日本語の文法___を正確に使いこなします。`, `言葉_ja_${u}_6`, ['規則', '文章', '文字']),
    v(`言葉_ja_${u}_7`, `Japanese Concept ${u}.7`, 'verb', `Kotoba_${u}_7`, `この練習${u}を毎日復習することが大切です。`, `Reviewing practice ${u} daily is key.`, `この練習___を毎日復習することが大切です。`, `言葉_ja_${u}_7`, ['学ぶ', '話す', '書く']),
    v(`言葉_ja_${u}_8`, `Japanese Concept ${u}.8`, 'adjective', `Kotoba_${u}_8`, `素晴らしい成果${u}を上げることができました。`, `We achieved wonderful results ${u}.`, `素晴らしい成果___を上げることができました。`, `言葉_ja_${u}_8`, ['大きな', '確かな', '美しい']),
    v(`言葉_ja_${u}_9`, `Japanese Concept ${u}.9`, 'phrase', `Kotoba_${u}_9`, `したがって目標${u}を無事に達成しました。`, `Consequently, we successfully achieved goal ${u}.`, `したがって目標___を無事に達成しました。`, `言葉_ja_${u}_9`, ['計画', '段階', '道']),
    v(`言葉_ja_${u}_10`, `Japanese Concept ${u}.10`, 'noun', `Kotoba_${u}_10`, `高度な語学力${u}が国際的な未来を拓きます。`, `Advanced language proficiency ${u} opens international futures.`, `高度な語学力___が国際的な未来を拓きます。`, `言葉_ja_${u}_10`, ['表現力', '声', '力']),
  ];
}
