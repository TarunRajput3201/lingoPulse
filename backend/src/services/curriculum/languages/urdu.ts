import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const URDU_LANGUAGE: LanguageDefinition = {
  code: 'ur-en',
  title: 'Urdu Academy',
  description: 'Master Urdu from Nastaliq script and adab courtesy to poetic and conversational fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'ur',
  flagIcon: '🇵🇰',
  level: 'A1–C1',
  order: 27,
  nativeName: 'اردو',
  isRTL: true,
  region: 'Middle Eastern',
  culturalTips: {
    1: 'Urdu is written right-to-left in the graceful Nastaliq script and has rich Persian and Arabic loanwords.',
    2: 'Saying "آپ" (Aap) and terms like "جناب" (Janab) reflect the culture of polite etiquette (adab).',
  },
  units: {
    1: [
      v('السلام علیکم', 'Hello / Peace be upon you', 'noun', 'As-salamu alaykum', 'السلام علیکم، آپ کا کیا حال ہے؟', 'Hello, how are you?', '___، آپ کا کیا حال ہے؟', 'السلام علیکم', ['خدا حافظ', 'شکریہ', 'براہ کرم']),
      v('خدا حافظ', 'Goodbye', 'expression', 'Khuda hafiz', 'خدا حافظ اور جلد دوبارہ ملاقات ہوگی!', 'Goodbye and see you again soon!', '___ اور جلد دوبارہ ملاقات ہوگی!', 'خدا حافظ', ['السلام علیکم', 'شکریہ', 'براہ کرم']),
      v('شکریہ', 'Thank you', 'noun', 'Shukriya', 'آپ کی قیمتی مدد کا بہت بہت شکریہ۔', 'Thank you very much for your valuable help.', 'آپ کی قیمتی مدد کا بہت بہت ___۔', 'شکریہ', ['السلام علیکم', 'خدا حافظ', 'براہ کرم']),
      v('براہ کرم', 'Please', 'expression', 'Barahe karam', 'ایک کپ گرم چائے دیجئے، براہ کرم۔', 'Give a cup of hot tea, please.', 'ایک کپ گرم چائے دیجئے، ___۔', 'براہ کرم', ['السلام علیکم', 'خدا حافظ', 'شکریہ']),
      v('جی ہاں', 'Yes', 'noun', 'Jee haan', 'جی ہاں، میں بات اچھی طرح سمجھ گیا ہوں۔', 'Yes, I understood the matter well.', '___، میں بات اچھی طرح سمجھ گیا ہوں۔', 'جی ہاں', ['السلام علیکم', 'خدا حافظ', 'شکریہ']),
      v('نہیں', 'No', 'expression', 'Nahin', 'نہیں، یہ کام فی الحال ممکن نہیں ہے۔', 'No, this work is not possible currently.', '___، یہ کام فی الحال ممکن نہیں ہے۔', 'نہیں', ['السلام علیکم', 'خدا حافظ', 'شکریہ']),
      v('آپ کیسے ہیں', 'How are you', 'noun', 'Aap kaise hain', 'السلام علیکم دوست، آپ کیسے ہیں؟', 'Hello friend, how are you?', 'السلام علیکم دوست، ___؟', 'آپ کیسے ہیں', ['السلام علیکم', 'خدا حافظ', 'شکریہ']),
      v('خوش آمدید', 'Welcome', 'expression', 'Khush aamdeed', 'ہمارے پیارے شہر میں آپ کو خوش آمدید!', 'Welcome to our lovely city!', 'ہمارے پیارے شہر میں آپ کو ___!', 'خوش آمدید', ['السلام علیکم', 'خدا حافظ', 'شکریہ']),
      v('پھر ملیں گے', 'See you soon', 'noun', 'Phir milenge', 'آپ کا دن اچھا گزرے اور پھر ملیں گے!', 'Have a good day and see you soon!', 'آپ کا دن اچھا گزرے اور ___!', 'پھر ملیں گے', ['السلام علیکم', 'خدا حافظ', 'شکریہ']),
      v('شب بخیر', 'Good night', 'expression', 'Shab bakhair', 'شب بخیر اور میٹھے خواب دیکھیں۔', 'Good night and sweet dreams.', '___ اور میٹھے خواب دیکھیں۔', 'شب بخیر', ['السلام علیکم', 'خدا حافظ', 'شکریہ']),
    ],
    2: [
      v('مل کر خوشی ہوئی', 'Nice to meet you', 'noun', 'Mil kar khushi hui', 'آپ سے مل کر بہت خوشی ہوئی۔', 'Very pleased to meet you.', 'آپ سے مل کر بہت خوشی ہوئی۔', 'مل کر خوشی ہوئی', ['میرا نام ہے', 'معاف کیجئے گا', 'صبح بخیر']),
      v('میرا نام ہے', 'My name is', 'expression', 'Mera naam hai', 'السلام علیکم، میرا نام طارق ہے۔', 'Hello, my name is Tariq.', 'السلام علیکم، میرا نام طارق ہے۔', 'میرا نام ہے', ['مل کر خوشی ہوئی', 'معاف کیجئے گا', 'صبح بخیر']),
      v('معاف کیجئے گا', 'Excuse me / Sorry', 'noun', 'Maaf kijiye ga', 'معاف کیجئے گا، ریلوے اسٹیشن کہاں ہے؟', 'Excuse me, where is railway station?', '___، ریلوے اسٹیشن کہاں ہے؟', 'معاف کیجئے گا', ['مل کر خوشی ہوئی', 'میرا نام ہے', 'صبح بخیر']),
      v('صبح بخیر', 'Good morning', 'expression', 'Subah bakhair', 'تمام دوستوں کو صبح بخیر اور نیک تمنائیں!', 'Good morning and best wishes to all friends!', 'تمام دوستوں کو ___ اور نیک تمنائیں!', 'صبح بخیر', ['مل کر خوشی ہوئی', 'میرا نام ہے', 'معاف کیجئے گا']),
      v('شام بخیر', 'Good evening', 'noun', 'Shaam bakhair', 'شام بخیر اور محفل میں خوش آمدید۔', 'Good evening and welcome to gathering.', '___ اور محفل میں خوش آمدید۔', 'شام بخیر', ['مل کر خوشی ہوئی', 'میرا نام ہے', 'معاف کیجئے گا']),
      v('دوست', 'Friend', 'expression', 'Dost', 'وہ میرا بچپن کا سب سے مخلص دوست ہے۔', 'He is my most sincere childhood friend.', 'وہ میرا بچپن کا سب سے مخلص ___ ہے۔', 'دوست', ['مل کر خوشی ہوئی', 'میرا نام ہے', 'معاف کیجئے گا']),
      v('استاد', 'Teacher', 'noun', 'Ustaad', 'ہمارے استاد بہت شفیق اور عالم ہیں۔', 'Our teacher is very affectionate and learned.', 'ہمارے ___ بہت شفیق اور عالم ہیں۔', 'استاد', ['مل کر خوشی ہوئی', 'میرا نام ہے', 'معاف کیجئے گا']),
      v('خاندان', 'Family', 'expression', 'Khandan', 'میرا خاندان لاہور میں رہتا ہے۔', 'My family lives in Lahore.', 'میرا ___ لاہور میں رہتا ہے۔', 'خاندان', ['مل کر خوشی ہوئی', 'میرا نام ہے', 'معاف کیجئے گا']),
      v('شاندار', 'Wonderful', 'noun', 'Shandar', 'امتحان میں آپ کی کامیابی شاندار رہی۔', 'Your success in exam was wonderful.', 'امتحان میں آپ کی کامیابی ___ رہی۔', 'شاندار', ['مل کر خوشی ہوئی', 'میرا نام ہے', 'معاف کیجئے گا']),
      v('ٹھیک', 'Fine / Good', 'expression', 'Theek', 'خدا کا شکر ہے سب ٹھیک ٹھاک ہے۔', 'Thank God everything is fine.', 'خدا کا شکر ہے سب ___ ٹھاک ہے۔', 'ٹھیک', ['مل کر خوشی ہوئی', 'میرا نام ہے', 'معاف کیجئے گا']),
    ],
    3: [
      v('ایک', 'One', 'noun', 'Ek', 'میرے پاس ریل گاڑی کا ایک ٹکٹ ہے۔', 'I have one train ticket.', 'میرے پاس ریل گاڑی کا ___ ٹکٹ ہے۔', 'ایک', ['دو', 'تین', 'چار']),
      v('دو', 'Two', 'expression', 'Do', 'دو کپ گرم چائے لائیں، براہ کرم۔', 'Bring two cups of hot tea, please.', '___ کپ گرم چائے لائیں، براہ کرم۔', 'دو', ['ایک', 'تین', 'چار']),
      v('تین', 'Three', 'noun', 'Teen', 'ہوٹل میں تین کمرے خالی ہیں۔', 'Three rooms are vacant in hotel.', 'ہوٹل میں ___ کمرے خالی ہیں۔', 'تین', ['ایک', 'دو', 'چار']),
      v('چار', 'Four', 'expression', 'Chaar', 'ہم کل چار افراد سفر کر رہے ہیں۔', 'Four people are traveling together.', 'ہم کل ___ افراد سفر کر رہے ہیں۔', 'چار', ['ایک', 'دو', 'تین']),
      v('پانچ', 'Five', 'noun', 'Paanch', 'گاڑی پانچ منٹ میں روانہ ہوگی۔', 'Train will depart in five minutes.', 'گاڑی ___ منٹ میں روانہ ہوگی۔', 'پانچ', ['ایک', 'دو', 'تین']),
      v('دس', 'Ten', 'expression', 'Das', 'اس کی قیمت صرف دس روپے ہے۔', 'Its price is only ten rupees.', 'اس کی قیمت صرف ___ روپے ہے۔', 'دس', ['ایک', 'دو', 'تین']),
      v('بیس', 'Twenty', 'noun', 'Bees', 'کمرہ جماعت میں بیس طلبا موجود ہیں۔', 'Twenty students are present in classroom.', 'کمرہ جماعت میں ___ طلبا موجود ہیں۔', 'بیس', ['ایک', 'دو', 'تین']),
      v('پچاس', 'Fifty', 'expression', 'Pachaas', 'تالار میں پچاس نشستیں ہیں۔', 'In hall are fifty seats.', 'تالار میں ___ نشستیں ہیں۔', 'پچاس', ['ایک', 'دو', 'تین']),
      v('ایک سو', 'One hundred', 'noun', 'Ek sau', 'اس کتاب میں ایک سو صفحات ہیں۔', 'In this book are hundred pages.', 'اس کتاب میں ___ صفحات ہیں۔', 'ایک سو', ['ایک', 'دو', 'تین']),
      v('گننا', 'To count', 'expression', 'Gin-na', 'میں اردو میں آسانی سے گن سکتا ہوں۔', 'I can count in Urdu easily.', 'میں اردو میں آسانی سے گن سکتا ہوں۔', 'گننا', ['ایک', 'دو', 'تین']),
    ],
    4: [
      v('والد', 'Father', 'noun', 'Walid', 'میرے والد ایک محنتی انجینئر ہیں۔', 'My father is a hardworking engineer.', 'میرے ___ ایک محنتی انجینئر ہیں۔', 'والد', ['والدہ', 'بھائی', 'بہن']),
      v('والدہ', 'Mother', 'expression', 'Walida', 'میری والدہ ہسپتال میں ڈاکٹر ہیں۔', 'My mother is doctor in hospital.', 'میری ___ ہسپتال میں ڈاکٹر ہیں۔', 'والدہ', ['والد', 'بھائی', 'بہن']),
      v('بھائی', 'Brother', 'noun', 'Bhai', 'میرا بڑا بھائی جامعہ میں پڑھتا ہے۔', 'My older brother studies at university.', 'میرا بڑا ___ جامعہ میں پڑھتا ہے۔', 'بھائی', ['والد', 'والدہ', 'بہن']),
      v('بہن', 'Sister', 'expression', 'Behan', 'میری چھوٹی بہن بہت ذہین ہے۔', 'My younger sister is very intelligent.', 'میری چھوٹی ___ بہت ذہین ہے۔', 'بہن', ['والد', 'والدہ', 'بھائی']),
      v('دادا', 'Grandfather', 'noun', 'Dada', 'دادا جان روزانہ صبح سیر کرتے ہیں۔', 'Grandfather walks daily in morning.', '___ جان روزانہ صبح سیر کرتے ہیں۔', 'دادا', ['والد', 'والدہ', 'بھائی']),
      v('دادی', 'Grandmother', 'expression', 'Dadi', 'دادی اماں لذیذ کھانے بناتی ہیں۔', 'Grandmother cooks delicious meals.', '___ اماں لذیذ کھانے بناتی ہیں۔', 'دادی', ['والد', 'والدہ', 'بھائی']),
      v('بیٹا', 'Son', 'noun', 'Beta', 'ان کا بیٹا کرکٹ کا اچھا کھلاڑی ہے۔', 'Their son is good cricket player.', 'ان کا ___ کرکٹ کا اچھا کھلاڑی ہے۔', 'بیٹا', ['والد', 'والدہ', 'بھائی']),
      v('بیٹی', 'Daughter', 'expression', 'Beti', 'ان کی بیٹی مصوری کا شوق رکھتی ہے۔', 'Their daughter has passion for painting.', 'ان کی ___ مصوری کا شوق رکھتی ہے۔', 'بیٹی', ['والد', 'والدہ', 'بھائی']),
      v('والدین', 'Parents', 'noun', 'Walidain', 'میرے والدین کو سیاحت کا شوق ہے۔', 'My parents have passion for tourism.', 'میرے ___ کو سیاحت کا شوق ہے۔', 'والدین', ['والد', 'والدہ', 'بھائی']),
      v('گھر', 'Home', 'expression', 'Ghar', 'ہمارا گھر پرسکون اور روشن ہے۔', 'Our home is peaceful and bright.', 'ہمارا ___ پرسکون اور روشن ہے۔', 'گھر', ['والد', 'والدہ', 'بھائی']),
    ],
    5: [
      v('روٹی', 'Bread', 'noun', 'Roti', 'تندور کی گرم روٹی بہت لذیذ ہوتی ہے۔', 'Hot tandoori bread is very delicious.', 'تندور کی گرم ___ بہت لذیذ ہوتی ہے۔', 'روٹی', ['پانی', 'چائے', 'کافی']),
      v('پانی', 'Water', 'expression', 'Paani', 'ایک گلاس ٹھنڈا پانی دیجئے، شکریہ۔', 'Give a glass of cold water, thanks.', 'ایک گلاس ٹھنڈا ___ دیجئے، شکریہ۔', 'پانی', ['روٹی', 'چائے', 'کافی']),
      v('چائے', 'Tea', 'noun', 'Chai', 'کشمیری چائے کا ذائقہ منفرد ہوتا ہے۔', 'Kashmiri tea has unique flavor.', 'کشمیری ___ کا ذائقہ منفرد ہوتا ہے۔', 'چائے', ['روٹی', 'پانی', 'کافی']),
      v('کافی', 'Coffee', 'expression', 'Kofi', 'صبح کی گرم کافی تازگی بخشتی ہے۔', 'Morning hot coffee provides freshness.', 'صبح کی گرم ___ تازگی بخشتی ہے۔', 'کافی', ['روٹی', 'پانی', 'چائے']),
      v('سیب', 'Apple', 'noun', 'Saib', 'میٹھے لال سیب صحت کے لیے مفید ہیں۔', 'Sweet red apples are beneficial for health.', 'میٹھے لال ___ صحت کے لیے مفید ہیں۔', 'سیب', ['روٹی', 'پانی', 'چائے']),
      v('پنیر', 'Cheese', 'expression', 'Paneer', 'پنیر سے بنے پکوان بہت ذائقہ دار ہوتے ہیں۔', 'Dishes made of paneer are very flavorful.', '___ سے بنے پکوان بہت ذائقہ دار ہوتے ہیں۔', 'پنیر', ['روٹی', 'پانی', 'چائے']),
      v('کھانا', 'To eat', 'noun', 'Khana', 'ہم سب مل کر رات کا کھانا کھاتے ہیں۔', 'We all eat dinner together.', 'ہم سب مل کر رات کا ___ کھاتے ہیں۔', 'کھانا', ['روٹی', 'پانی', 'چائے']),
      v('پینا', 'To drink', 'expression', 'Peena', 'صحت کے لیے صاف پانی پینا ضروری ہے۔', 'Drinking clean water is necessary for health.', 'صحت کے لیے صاف پانی ___ ضروری ہے۔', 'پینا', ['روٹی', 'پانی', 'چائے']),
      v('لذیذ', 'Delicious', 'noun', 'Laziz', 'یہ روایتی بریانی واقعی بہت لذیذ ہے۔', 'This traditional biryani is really very delicious.', 'یہ روایتی بریانی واقعی بہت ___ ہے۔', 'لذیذ', ['روٹی', 'پانی', 'چائے']),
      v('ناشتہ', 'Breakfast', 'expression', 'Nashta', 'صبح کا ناشتہ آٹھ بجے تیار ہوتا ہے۔', 'Morning breakfast is ready at eight.', 'صبح کا ___ آٹھ بجے تیار ہوتا ہے۔', 'ناشتہ', ['روٹی', 'پانی', 'چائے']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["ریستوران","Restaurant"],["دکان","Shop"],["ہوٹل","Hotel"],["شہر","City"],["ریل گاڑی","Train"],["ہوائی اڈہ","Airport"],["کام","Work"],["اسکول","School"],["صحت","Health"],["قدرت","Nature"],["چھٹیاں","Holiday"],["موسیقی","Music"],["تاریخ","History"],["ثقافت","Culture"],["سائنس","Science"],["گفتگو","Conversation"],["معاشرہ","Society"],["کامیابی","Success"],["مستقبل","Future"],["علم","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  URDU_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
    const num = idx + 1;
    const targetTerm = `${rootT}_${u}_${num}`;
    const englishTerm = `${rootE} Concept ${u}.${num}`;
    const exTarget = `${targetTerm} is used contextually in ${rootE} unit ${u}.`;
    const exEng = `${englishTerm} is essential for advanced language comprehension.`;
    const distractors = [
      `${rootT}_${u}_${(num % 10) + 1}`,
      `${rootT}_${u}_${((num + 1) % 10) + 1}`,
      `${rootT}_${u}_${((num + 2) % 10) + 1}`,
    ];
    return v(
      targetTerm,
      englishTerm,
      idx % 2 === 0 ? 'noun' : 'verb',
      targetTerm,
      exTarget,
      exEng,
      exTarget.replace(targetTerm, '___'),
      targetTerm,
      distractors
    );
  });
}
