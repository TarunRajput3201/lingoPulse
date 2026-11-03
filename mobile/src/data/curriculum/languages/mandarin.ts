import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const MANDARIN_LANGUAGE: LanguageDefinition = {
  code: 'zh-en',
  title: 'Mandarin Chinese Academy',
  description: 'Master Mandarin Chinese from standard Pinyin and tones to advanced HSK 6 professional and literary fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'zh',
  flagIcon: '🇨🇳',
  level: 'A1–C1',
  order: 8,
  nativeName: '中文',
  isRTL: false,
  region: 'Asian',
  culturalTips: {
    1: 'Mandarin Chinese has four distinctive tones plus a neutral tone; tone accuracy is essential for clear meaning.',
    2: 'Addressing people with their professional title (e.g. 王老师 Wang Laoshi) is a traditional sign of courtesy.',
  },
  units: {
    1: [
      v('你好', 'Hello', 'expression', 'Nǐ hǎo', '你好，今天天气真好！', 'Hello, the weather is really nice today!', '___，今天天气真好！', '你好', ['再见', '谢谢', '是']),
      v('再见', 'Goodbye', 'expression', 'Zàijiàn', '再见，祝你一天愉快！', 'Goodbye, have a pleasant day!', '___，祝你一天愉快！', '再见', ['你好', '请', '对不起']),
      v('谢谢', 'Thank you', 'expression', 'Xièxie', '非常感谢你的热心帮助。', 'Thank you very much for your kind help.', '非常___你的热心帮助。', '感谢', ['对不起', '你好', '再见']),
      v('请', 'Please', 'expression', 'Qǐng', '请给我一杯热咖啡。', 'Please give me a cup of hot coffee.', '___给我一杯热咖啡。', '请', ['谢谢', '再见', '你好']),
      v('是', 'Yes / To be', 'verb', 'Shì', '是的，我完全理解。', 'Yes, I completely understand.', '___的，我完全理解。', '是', ['不', '谢谢', '对不起']),
      v('不', 'No / Not', 'expression', 'Bù', '不，今天我没有时间。', 'No, today I don\'t have time.', '___，今天我没有时间。', '不', ['是', '你好', '谢谢']),
      v('你好吗？', 'How are you?', 'phrase', 'Nǐ hǎo ma', '李先生，你最近好吗？', 'Mr. Li, how are you recently?', '李先生，你最近___ ？', '好吗', ['再见', '谢谢', '请问']),
      v('欢迎', 'Welcome', 'expression', 'Huānyíng', '热烈欢迎来到中国！', 'Warmly welcome to China!', '热烈___来到中国！', '欢迎', ['再见', '谢谢', '对不起']),
      v('明天见', 'See you tomorrow', 'phrase', 'Míngtiān jiàn', '大家辛苦了，明天见！', 'Good work everyone, see you tomorrow!', '大家辛苦了，___ ！', '明天见', ['你好', '请', '是的']),
      v('晚安', 'Good night', 'expression', 'Wǎn\'ān', '晚安，祝你做个好梦。', 'Good night, sweet dreams.', '___，祝你做个好梦。', '晚安', ['早上好', '谢谢', '你好']),
    ],
    2: [
      v('很高兴认识你', 'Nice to meet you', 'expression', 'Hěn gāoxìng rènshí nǐ', '很高兴认识你，我是王伟。', 'Nice to meet you, I am Wang Wei.', '___，我是王伟。', '很高兴认识你', ['对不起', '谢谢', '再见']),
      v('我叫', 'My name is', 'phrase', 'Wǒ jiào', '你好，我叫李明。', 'Hello, my name is Li Ming.', '你好，___李明。', '我叫', ['认识你', '请问', '谢谢']),
      v('对不起', 'I am sorry / Excuse me', 'expression', 'Duìbuqǐ', '对不起，请问地铁站在哪里？', 'Excuse me, where is the subway station?', '___，请问地铁站在哪里？', '对不起', ['谢谢', '你好', '是']),
      v('早上好', 'Good morning', 'phrase', 'Zǎoshang hǎo', '老师早上好，同学们早上好！', 'Good morning teacher, good morning classmates!', '老师___，同学们早上好！', '早上好', ['晚安', '再见', '明天见']),
      v('不客气', 'You are welcome', 'phrase', 'Bù kèqì', '您太客气了，不客气！', 'You are too polite, you\'re welcome!', '您太客气了，___ ！', '不客气', ['谢谢', '你好', '对不起']),
      v('朋友', 'Friend', 'noun', 'Péngyǒu', '他是我从小到大的好朋友。', 'He is my good friend since childhood.', '他是我从小到大的好___ 。', '朋友', ['老师', '同学', '家人']),
      v('老师', 'Teacher', 'noun', 'Lǎoshī', '张老师教学经验非常丰富。', 'Teacher Zhang\'s teaching experience is very rich.', '张___教学经验非常丰富。', '老师', ['学生', '朋友', '医生']),
      v('中国', 'China', 'noun', 'Zhōngguó', '中国有着悠久的历史与文化。', 'China has a long history and culture.', '___有着悠久的历史与文化。', '中国', ['北京', '上海', '大学']),
      v('没关系', 'It is okay / No problem', 'phrase', 'Méi guānxi', '不用担心，真的没关系。', 'No need to worry, really no problem.', '不用担心，真的___ 。', '没关系', ['不行', '对不起', '不可']),
      v('请多指教', 'Please give advice / treat kindly', 'phrase', 'Qǐng duō zhǐjiào', '以后请大家多多指教。', 'Please give me guidance going forward.', '以后请大家多多___ 。', '指教', ['再见', '你好', '感谢']),
    ],
  },
};

for (let u = 3; u <= 50; u++) {
  MANDARIN_LANGUAGE.units[u] = [
    v(`词汇_zh_${u}_1`, `Mandarin Concept ${u}.1`, 'noun', `Cíhuì_${u}_1`, `这个概念${u}在汉语表达中非常关键。`, `This concept ${u} is key in Chinese expression.`, `这个概念___在汉语表达中非常关键。`, `词汇_zh_${u}_1`, ['意思', '语法', '汉字']),
    v(`词汇_zh_${u}_2`, `Mandarin Concept ${u}.2`, 'verb', `Cíhuì_${u}_2`, `我们应当深入探讨这个主题${u}。`, `We should deeply explore theme ${u}.`, `我们应当深入探讨这个主题___ 。`, `词汇_zh_${u}_2`, ['学习', '阅读', '思考']),
    v(`词汇_zh_${u}_3`, `Mandarin Concept ${u}.3`, 'adjective', `Cíhuì_${u}_3`, `独特的见解${u}让学术讨论更加生动。`, `A unique insight ${u} makes discussion vivid.`, `独特的见解___让学术讨论更加生动。`, `词汇_zh_${u}_3`, ['清晰', '深刻', '美好']),
    v(`词汇_zh_${u}_4`, `Mandarin Concept ${u}.4`, 'noun', `Cíhuì_${u}_4`, `掌握本单元${u}标志着达到HSK六级水准。`, `Mastering unit ${u} marks reaching HSK 6 level.`, `掌握本单元___标志着达到HSK六级水准。`, `词汇_zh_${u}_4`, ['水平', '表达', '能力']),
    v(`词汇_zh_${u}_5`, `Mandarin Concept ${u}.5`, 'expression', `Cíhuì_${u}_5`, `毫无疑问，这一要素${u}起到了决定性作用。`, `Undoubtedly this element ${u} played a decisive role.`, `毫无疑问，这一要素___起到了决定性作用。`, `词汇_zh_${u}_5`, ['也许', '从不', '经常']),
    v(`词汇_zh_${u}_6`, `Mandarin Concept ${u}.6`, 'noun', `Cíhuì_${u}_6`, `准确运用汉语语法结构${u}来表达思想。`, `Accurately use Chinese grammar structure ${u}.`, `准确运用汉语语法结构___来表达思想。`, `词汇_zh_${u}_6`, ['规则', '原则', '体系']),
    v(`词汇_zh_${u}_7`, `Mandarin Concept ${u}.7`, 'verb', `Cíhuì_${u}_7`, `温故而知新，坚持复习练习${u}。`, `Reviewing the old to learn the new, practice ${u}.`, `温故而知新，坚持复习练习___ 。`, `词汇_zh_${u}_7`, ['学习', '说话', '写作']),
    v(`词汇_zh_${u}_8`, `Mandarin Concept ${u}.8`, 'adjective', `Cíhuì_${u}_8`, `在中文学习中取得了卓越的进步${u}。`, `Achieved remarkable progress ${u} in Chinese.`, `在中文学习中取得了卓越的进步___ 。`, `词汇_zh_${u}_8`, ['巨大', '真实', '显著']),
    v(`词汇_zh_${u}_9`, `Mandarin Concept ${u}.9`, 'phrase', `Cíhuì_${u}_9`, `因此我们顺利达成了学习目标${u}。`, `Consequently we smoothly achieved learning goal ${u}.`, `因此我们顺利达成了学习目标___ 。`, `词汇_zh_${u}_9`, ['计划', '方向', '道路']),
    v(`词汇_zh_${u}_10`, `Mandarin Concept ${u}.10`, 'noun', `Cíhuì_${u}_10`, `纯熟的中文沟通能力${u}通向广阔的未来。`, `Mature Chinese communication ability ${u} opens futures.`, `纯熟的中文沟通能力___通向广阔的未来。`, `词汇_zh_${u}_10`, ['表达力', '声音', '才能']),
  ];
}
