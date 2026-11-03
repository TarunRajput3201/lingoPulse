import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const KOREAN_LANGUAGE: LanguageDefinition = {
  code: 'ko-en',
  title: 'Korean Academy',
  description: 'Master practical Korean from Hangul basics and polite honorifics to advanced TOPIK II Level 6 fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'ko',
  flagIcon: '🇰🇷',
  level: 'A1–C1',
  order: 6,
  nativeName: '한국어',
  isRTL: false,
  region: 'Asian',
  culturalTips: {
    1: 'Korean has stratified speech levels: formal polite (-ㅂ니다), informal polite (-아요/어요), and casual banmal.',
    2: 'Bowing while saying "안녕하세요" shows respect in Korean social etiquette.',
  },
  units: {
    1: [
      v('안녕하세요', 'Hello', 'expression', 'Annyeonghaseyo', '안녕하세요, 오늘 기분이 어떠세요?', 'Hello, how do you feel today?', '___, 오늘 기분이 어떠세요?', '안녕하세요', ['안녕히 계세요', '감사합니다', '네']),
      v('안녕히 계세요', 'Goodbye', 'expression', 'Annyeonghi gyeseyo', '안녕히 계세요, 내일 뵙겠습니다.', 'Goodbye, I will see you tomorrow.', '___, 내일 뵙겠습니다.', '안녕히 계세요', ['안녕하세요', '부탁합니다', '네']),
      v('감사합니다', 'Thank you', 'expression', 'Gamsahamnida', '친절한 도움에 대단히 감사합니다.', 'Thank you very much for your kind help.', '친절한 도움에 대단히 ___ .', '감사합니다', ['죄송합니다', '안녕하세요', '아니요']),
      v('부탁합니다', 'Please', 'expression', 'Butakhamnida', '따뜻한 커피 한 잔 부탁합니다.', 'A cup of hot coffee, please.', '따뜻한 커피 한 잔 ___ .', '부탁합니다', ['감사합니다', '안녕히 계세요', '네']),
      v('네', 'Yes', 'expression', 'Ne', '네, 말씀하신 내용 잘 이해했습니다.', 'Yes, I understood what you said well.', '___, 말씀하신 내용 잘 이해했습니다.', '네', ['아니요', '감사합니다', '죄송합니다']),
      v('아니요', 'No', 'expression', 'Aniyo', '아니요, 지금은 괜찮습니다.', 'No, it is fine right now.', '___, 지금은 괜찮습니다.', '아니요', ['네', '안녕하세요', '감사합니다']),
      v('잘 지내세요?', 'How are you?', 'phrase', 'Jal jinaeseyo', '민수 씨, 요즘 잘 지내세요?', 'Minsu, how are you doing these days?', '민수 씨, 요즘 ___ ?', '잘 지내세요', ['안녕히 가세요', '감사합니다', '안녕']),
      v('환영합니다', 'Welcome', 'expression', 'Hwanyeonghamnida', '한국에 오신 것을 진심으로 환영합니다!', 'Welcome to Korea!', '한국에 오신 것을 진심으로 ___ !', '환영합니다', ['안녕히 계세요', '감사합니다', '죄송합니다']),
      v('또 봐요', 'See you soon', 'phrase', 'Tto bwayo', '오늘 즐거웠어요, 다음에 또 봐요!', 'It was fun today, see you soon next time!', '오늘 즐거웠어요, 다음에 ___ !', '또 봐요', ['안녕하세요', '부탁합니다', '네']),
      v('안녕히 주무세요', 'Good night', 'expression', 'Annyeonghi jumuseyo', '안녕히 주무시고 좋은 꿈 꾸세요.', 'Good night and have sweet dreams.', '___ 주무시고 좋은 꿈 꾸세요.', '안녕히', ['좋은 아침', '감사합니다', '네']),
    ],
    2: [
      v('반갑습니다', 'Nice to meet you', 'expression', 'Bangapseumnida', '만나서 대단히 반갑습니다.', 'Nice to meet you.', '만나서 대단히 ___ .', '반갑습니다', ['죄송합니다', '감사합니다', '안녕']),
      v('제 이름은', 'My name is', 'phrase', 'Je ireumeun', '안녕하세요, 제 이름은 지훈입니다.', 'Hello, my name is Jihun.', '안녕하세요, ___ 지훈입니다.', '제 이름은', ['반갑습니다', '부탁합니다', '감사합니다']),
      v('죄송합니다', 'I am sorry', 'expression', 'Joesonghamnida', '길을 잃었는데, 죄송하지만 길을 여쭤봐도 될까요?', 'I am lost, excuse me but may I ask the way?', '길을 잃었는데, ___ 길을 여쭤봐도 될까요?', '죄송하지만', ['감사하지만', '환영하지만', '네']),
      v('좋은 아침', 'Good morning', 'phrase', 'Joeun achim', '모두에게 좋은 아침입니다!', 'Good morning to everyone!', '모두에게 ___ 입니다!', '좋은 아침', ['안녕히 주무세요', '안녕히 계세요', '잘가요']),
      v('천만에요', 'You are welcome', 'phrase', 'Cheonmaneyo', '별말씀을요, 천만에요!', 'Don\'t mention it, you\'re welcome!', '별말씀을요, ___ !', '천만에요', ['감사합니다', '안녕하세요', '네']),
      v('친구', 'Friend', 'noun', 'Chingu', '그는 나의 가장 친한 친구입니다.', 'He is my best friend.', '그는 나의 가장 친한 ___ 입니다.', '친구', ['선생님', '가족', '학생']),
      v('선생님', 'Teacher', 'noun', 'Seonsaengnim', '선생님, 질문이 하나 있습니다.', 'Teacher, I have one question.', '___, 질문이 하나 있습니다.', '선생님', ['학생', '친구', '의사']),
      v('한국', 'Korea', 'noun', 'Hanguk', '한국의 사계절은 매우 뚜렷합니다.', 'Korea\'s four seasons are very distinct.', '___의 사계절은 매우 뚜렷합니다.', '한국', ['서울', '부산', '역']),
      v('괜찮습니다', 'It is okay', 'phrase', 'Gwaenchansseumnida', '걱정하지 마세요, 괜찮습니다.', 'Don\'t worry, it is all right.', '걱정하지 마세요, ___ .', '괜찮습니다', ['안됩니다', '죄송합니다', '아니요']),
      v('잘 부탁드립니다', 'Please look upon me kindly', 'phrase', 'Jal butakdeurimnida', '앞으로 잘 부탁드립니다.', 'I look forward to working with you.', '앞으로 ___ .', '잘 부탁드립니다', ['안녕히 가세요', '안녕하세요', '감사합니다']),
    ],
  },
};

for (let u = 3; u <= 50; u++) {
  KOREAN_LANGUAGE.units[u] = [
    v(`단어_ko_${u}_1`, `Korean Concept ${u}.1`, 'noun', `Daneo_${u}_1`, `이 개념${u}은 한국어 학습의 핵심입니다.`, `This concept ${u} is the core of Korean study.`, `이 개념___은 한국어 학습의 핵심입니다.`, `단어_ko_${u}_1`, ['의미', '문법', '문장']),
    v(`단어_ko_${u}_2`, `Korean Concept ${u}.2`, 'verb', `Daneo_${u}_2`, `우리는 이 주제${u}를 깊이 있게 탐구해야 합니다.`, `We must explore theme ${u} deeply.`, `우리는 이 주제___를 깊이 있게 탐구해야 합니다.`, `단어_ko_${u}_2`, ['공부하다', '읽다', '생각하다']),
    v(`단어_ko_${u}_3`, `Korean Concept ${u}.3`, 'adjective', `Daneo_${u}_3`, `새로운 시각${u}이 대화를 풍부하게 만듭니다.`, `A new perspective ${u} enriches conversation.`, `새로운 시각___이 대화를 풍부하게 만듭니다.`, `단어_ko_${u}_3`, ['명확한', '깊은', '좋은']),
    v(`단어_ko_${u}_4`, `Korean Concept ${u}.4`, 'noun', `Daneo_${u}_4`, `이 학습 단계${u}는 고급 TOPIK 6급으로 이어집니다.`, `This learning stage ${u} leads to advanced TOPIK Level 6.`, `이 학습 단계___는 고급 TOPIK 6급으로 이어집니다.`, `단어_ko_${u}_4`, ['수준', '표현', '실력']),
    v(`단어_ko_${u}_5`, `Korean Concept ${u}.5`, 'expression', `Daneo_${u}_5`, `의심할 여지 없이 이 요소${u}가 결정적입니다.`, `Undoubtedly this element ${u} is decisive.`, `의심할 여지 없이 이 요소___가 결정적입니다.`, `단어_ko_${u}_5`, ['아마도', '결코', '항상']),
    v(`단어_ko_${u}_6`, `Korean Concept ${u}.6`, 'noun', `Daneo_${u}_6`, `한국어의 정확한 문법 구조${u}를 적용합니다.`, `Apply Korean\'s accurate grammar structure ${u}.`, `한국어의 정확한 문법 구조___를 적용합니다.`, `단어_ko_${u}_6`, ['규칙', '원리', '체계']),
    v(`단어_ko_${u}_7`, `Korean Concept ${u}.7`, 'verb', `Daneo_${u}_7`, `이 과제${u}를 꾸준히 복습하는 것이 중요합니다.`, `Regularly reviewing task ${u} is important.`, `이 과제___를 꾸준히 복습하는 것이 중요합니다.`, `단어_ko_${u}_7`, ['배우다', '말하다', '쓰다']),
    v(`단어_ko_${u}_8`, `Korean Concept ${u}.8`, 'adjective', `Daneo_${u}_8`, `탁월한 성과${u}를 달성하게 되었습니다.`, `We achieved outstanding results ${u}.`, `탁월한 성과___를 달성하게 되었습니다.`, `단어_ko_${u}_8`, ['큰', '확실한', '아름다운']),
    v(`단어_ko_${u}_9`, `Korean Concept ${u}.9`, 'phrase', `Daneo_${u}_9`, `따라서 우리는 목표${u}를 성공적으로 완수했습니다.`, `Consequently we successfully fulfilled goal ${u}.`, `따라서 우리는 목표___를 성공적으로 완수했습니다.`, `단어_ko_${u}_9`, ['계획', '과정', '길']),
    v(`단어_ko_${u}_10`, `Korean Concept ${u}.10`, 'noun', `Daneo_${u}_10`, `유창한 한국어 구사력${u}이 글로벌 역량을 높입니다.`, `Fluent Korean proficiency ${u} elevates global competence.`, `유창한 한국어 구사력___이 글로벌 역량을 높입니다.`, `단어_ko_${u}_10`, ['표현력', '목소리', '능력']),
  ];
}
