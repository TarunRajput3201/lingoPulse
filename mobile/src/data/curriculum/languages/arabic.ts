import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const ARABIC_LANGUAGE: LanguageDefinition = {
  code: 'ar-en',
  title: 'Arabic Academy',
  description: 'Master Modern Standard Arabic from script and root grammar to fluent conversational dialogue from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'ar',
  flagIcon: '🇸🇦',
  level: 'A1–C1',
  order: 11,
  nativeName: 'العربية',
  isRTL: true,
  region: 'Middle Eastern',
  culturalTips: {
    1: 'Greetings like "السلام عليكم" (As-salamu alaykum) carry wishes of peace and are returned with "وعليكم السلام" (Wa alaykumu s-salam).',
    2: 'Arabic words are organized around three-letter consonantal roots conveying core concepts.',
  },
  units: {
    1: [
      v('مرحبا', 'Hello', 'noun', 'Marhaban', 'مرحبا، كيف حالك اليوم؟', 'Hello, how are you today?', '___، كيف حالك اليوم؟', 'مرحبا', ['مع السلامة', 'شكرا', 'من فضلك']),
      v('مع السلامة', 'Goodbye', 'expression', 'Ma\'a as-salama', 'مع السلامة وإلى اللقاء قريبا!', 'Goodbye and see you soon!', '___ وإلى اللقاء قريبا!', 'مع السلامة', ['مرحبا', 'شكرا', 'من فضلك']),
      v('شكرا', 'Thank you', 'noun', 'Shukran', 'شكرا جزيلا لك على مساعدتك.', 'Thank you very much for your help.', '___ جزيلا لك على مساعدتك.', 'شكرا', ['مرحبا', 'مع السلامة', 'من فضلك']),
      v('من فضلك', 'Please', 'expression', 'Min fadlik', 'فنجان قهوة من فضلك.', 'A cup of coffee, please.', 'فنجان قهوة ___.', 'من فضلك', ['مرحبا', 'مع السلامة', 'شكرا']),
      v('نعم', 'Yes', 'noun', 'Na\'am', 'نعم، أنا أفهم بوضوح.', 'Yes, I understand clearly.', '___، أنا أفهم بوضوح.', 'نعم', ['مرحبا', 'مع السلامة', 'شكرا']),
      v('لا', 'No', 'expression', 'La', 'لا، هذا غير ممكن الآن.', 'No, that is not possible now.', '___، هذا غير ممكن الآن.', 'لا', ['مرحبا', 'مع السلامة', 'شكرا']),
      v('كيف حالك', 'How are you', 'noun', 'Kayfa haluk', 'مرحبا يا صديقي، كيف حالك؟', 'Hello my friend, how are you?', 'مرحبا يا صديقي، ___؟', 'كيف حالك', ['مرحبا', 'مع السلامة', 'شكرا']),
      v('أهلا وسهلا', 'Welcome', 'expression', 'Ahlan wa sahlan', 'أهلا وسهلا بكم في بيتنا!', 'Welcome to our home!', '___ بكم في بيتنا!', 'أهلا وسهلا', ['مرحبا', 'مع السلامة', 'شكرا']),
      v('أراك قريبا', 'See you soon', 'noun', 'Araka qariban', 'أتمنى لك يوما سعيدا وأراك قريبا!', 'Have a good day and see you soon!', 'أتمنى لك يوما سعيدا و___!', 'أراك قريبا', ['مرحبا', 'مع السلامة', 'شكرا']),
      v('تصبح على خير', 'Good night', 'expression', 'Tisbah ala khayr', 'تصبح على خير وأحلاما سعيدة.', 'Good night and sweet dreams.', '___ وأحلاما سعيدة.', 'تصبح على خير', ['مرحبا', 'مع السلامة', 'شكرا']),
    ],
    2: [
      v('تشرفت بمعرفتك', 'Nice to meet you', 'noun', 'Tasharraftu bima\'rifatik', 'تشرفت بمعرفتك وسعيد بلقائك.', 'Pleased to meet you and glad to see you.', '___ وسعيد بلقائك.', 'تشرفت بمعرفتك', ['اسمي', 'عفوا', 'صباح الخير']),
      v('اسمي', 'My name is', 'expression', 'Ismi', 'مرحبا، أنا اسمي كريم.', 'Hello, my name is Karim.', 'مرحبا، أنا ___ كريم.', 'اسمي', ['تشرفت بمعرفتك', 'عفوا', 'صباح الخير']),
      v('عفوا', 'Excuse me / You are welcome', 'noun', 'Afwan', 'عفوا، هل يمكنك مساعدتي؟', 'Excuse me, can you help me?', '___، هل يمكنك مساعدتي؟', 'عفوا', ['تشرفت بمعرفتك', 'اسمي', 'صباح الخير']),
      v('صباح الخير', 'Good morning', 'expression', 'Sabah al-khayr', 'صباح الخير والبركة للجميع!', 'Good morning and blessings to all!', '___ والبركة للجميع!', 'صباح الخير', ['تشرفت بمعرفتك', 'اسمي', 'عفوا']),
      v('مساء الخير', 'Good evening', 'noun', 'Masa\' al-khayr', 'مساء الخير ومرحبا بكم جميعا.', 'Good evening and welcome to all.', '___ ومرحبا بكم جميعا.', 'مساء الخير', ['تشرفت بمعرفتك', 'اسمي', 'عفوا']),
      v('صديق', 'Friend', 'expression', 'Sadiq', 'هو صديق مخلص منذ الطفولة.', 'He is a loyal friend since childhood.', 'هو ___ مخلص منذ الطفولة.', 'صديق', ['تشرفت بمعرفتك', 'اسمي', 'عفوا']),
      v('أستاذ', 'Teacher', 'noun', 'Ustadh', 'أستاذنا لطيف ومحبوب جدا.', 'Our teacher is very kind and beloved.', '___نا لطيف ومحبوب جدا.', 'أستاذ', ['تشرفت بمعرفتك', 'اسمي', 'عفوا']),
      v('عائلة', 'Family', 'expression', 'A\'ila', 'عائلتي تعيش في المدينة القديمة.', 'My family lives in the ancient city.', 'عائلتي تعيش في المدينة القديمة.', 'عائلة', ['تشرفت بمعرفتك', 'اسمي', 'عفوا']),
      v('ممتاز', 'Excellent', 'noun', 'Mumtaz', 'أداؤك في الاختبار كان ممتازا.', 'Your performance on the test was excellent.', 'أداؤك في الاختبار كان ___ا.', 'ممتاز', ['تشرفت بمعرفتك', 'اسمي', 'عفوا']),
      v('حسنا', 'Okay / Agreed', 'expression', 'Hasanan', 'حسنا، سنلتقي في المساء.', 'Okay, we will meet in the evening.', '___، سنلتقي في المساء.', 'حسنا', ['تشرفت بمعرفتك', 'اسمي', 'عفوا']),
    ],
    3: [
      v('واحد', 'One', 'noun', 'Wahid', 'لدي كتاب واحد جديد.', 'I have one new book.', 'لدي كتاب ___ جديد.', 'واحد', ['اثنان', 'ثلاثة', 'أربعة']),
      v('اثنان', 'Two', 'expression', 'Ithnan', 'أريد كوبين اثنين من العصير.', 'I want two cups of juice.', 'أريد كوبين اثنين من العصير.', 'اثنان', ['واحد', 'ثلاثة', 'أربعة']),
      v('ثلاثة', 'Three', 'noun', 'Thalatha', 'هناك ثلاثة طلاب في القاعة.', 'There are three students in the hall.', 'هناك ___ طلاب في القاعة.', 'ثلاثة', ['واحد', 'اثنان', 'أربعة']),
      v('أربعة', 'Four', 'expression', 'Arba\'a', 'لدينا أربعة تذاكر سفر.', 'We have four travel tickets.', 'لدينا ___ تذاكر سفر.', 'أربعة', ['واحد', 'اثنان', 'ثلاثة']),
      v('خمسة', 'Five', 'noun', 'Khamsa', 'يصل القطار بعد خمس دقائق.', 'The train arrives in five minutes.', 'يصل القطار بعد خمس دقائق.', 'خمسة', ['واحد', 'اثنان', 'ثلاثة']),
      v('عشرة', 'Ten', 'expression', 'Ashara', 'سعر الوجبة عشرة دنانير.', 'The meal price is ten dinars.', 'سعر الوجبة ___ دنانير.', 'عشرة', ['واحد', 'اثنان', 'ثلاثة']),
      v('عشرون', 'Twenty', 'noun', 'Ishrun', 'في الصف عشرون مقعدا.', 'In the classroom there are twenty seats.', 'في الصف ___ مقعدا.', 'عشرون', ['واحد', 'اثنان', 'ثلاثة']),
      v('خمسون', 'Fifty', 'expression', 'Khamsun', 'المسافة خمسون كيلومترا.', 'The distance is fifty kilometers.', 'المسافة ___ كيلومترا.', 'خمسون', ['واحد', 'اثنان', 'ثلاثة']),
      v('مائة', 'One hundred', 'noun', 'Mi\'a', 'الكتاب يحتوي على مائة صفحة.', 'The book contains one hundred pages.', 'الكتاب يحتوي على ___ صفحة.', 'مائة', ['واحد', 'اثنان', 'ثلاثة']),
      v('عد', 'To count', 'expression', 'Adda', 'أستطيع عد الأرقام بالعربية.', 'I can count numbers in Arabic.', 'أستطيع ___ الأرقام بالعربية.', 'عد', ['واحد', 'اثنان', 'ثلاثة']),
    ],
    4: [
      v('الأب', 'Father', 'noun', 'Al-ab', 'أبي يعمل مهندسا معماريا.', 'My father works as an architect.', 'أبي يعمل مهندسا معماريا.', 'الأب', ['الأم', 'الأخ', 'الأخت']),
      v('الأم', 'Mother', 'expression', 'Al-umm', 'أمي طبيبة في المستشفى العام.', 'My mother is a doctor at public hospital.', 'أمي طبيبة في المستشفى العام.', 'الأم', ['الأب', 'الأخ', 'الأخت']),
      v('الأخ', 'Brother', 'noun', 'Al-akh', 'أخي الأكبر يدرس في الجامعة.', 'My older brother studies at university.', 'أخي الأكبر يدرس في الجامعة.', 'الأخ', ['الأب', 'الأم', 'الأخت']),
      v('الأخت', 'Sister', 'expression', 'Al-ukht', 'أختي الصغيرة تحب القراءة.', 'My little sister loves reading.', 'أختي الصغيرة تحب القراءة.', 'الأخت', ['الأب', 'الأم', 'الأخ']),
      v('الجد', 'Grandfather', 'noun', 'Al-jadd', 'جدي يحكي لنا قصصا ممتعة.', 'My grandfather tells us fun stories.', 'جدي يحكي لنا قصصا ممتعة.', 'الجد', ['الأب', 'الأم', 'الأخ']),
      v('الجدة', 'Grandmother', 'expression', 'Al-jadda', 'جدتي تصنع طعاما شهيا.', 'My grandmother makes delicious food.', 'جدتي تصنع طعاما شهيا.', 'الجدة', ['الأب', 'الأم', 'الأخ']),
      v('الابن', 'Son', 'noun', 'Al-ibn', 'الابن يساعد والده في العمل.', 'The son helps his father at work.', '___ يساعد والده في العمل.', 'الابن', ['الأب', 'الأم', 'الأخ']),
      v('الابنة', 'Daughter', 'expression', 'Al-ibna', 'الابنة ترسم لوحة جميلة.', 'The daughter paints a beautiful picture.', '___ ترسم لوحة جميلة.', 'الابنة', ['الأب', 'الأم', 'الأخ']),
      v('الأهل', 'Parents / Kin', 'noun', 'Al-ahl', 'أهلي يسكنون في الريف.', 'My parents live in the countryside.', 'أهلي يسكنون في الريف.', 'الأهل', ['الأب', 'الأم', 'الأخ']),
      v('المنزل', 'Home', 'expression', 'Al-manzil', 'منزلنا هادئ ومريح جدا.', 'Our home is very quiet and comfortable.', 'منزلنا هادئ ومريح جدا.', 'المنزل', ['الأب', 'الأم', 'الأخ']),
    ],
    5: [
      v('الخبز', 'Bread', 'noun', 'Al-khubz', 'أشتري الخبز الطازج صباحا.', 'I buy fresh bread in the morning.', 'أشتري ___ الطازج صباحا.', 'الخبز', ['الماء', 'الشاي', 'القهوة']),
      v('الماء', 'Water', 'expression', 'Al-ma\'', 'أشرب كوب ماء نقي.', 'I drink a glass of pure water.', 'أشرب كوب ماء نقي.', 'الماء', ['الخبز', 'الشاي', 'القهوة']),
      v('الشاي', 'Tea', 'noun', 'Ash-shay', 'أفضل الشاي بالنعناع.', 'I prefer mint tea.', 'أفضل ___ بالنعناع.', 'الشاي', ['الخبز', 'الماء', 'القهوة']),
      v('القهوة', 'Coffee', 'expression', 'Al-qahwa', 'القهوة العربية لذيذة ومميزة.', 'Arabic coffee is delicious and unique.', '___ العربية لذيذة ومميزة.', 'القهوة', ['الخبز', 'الماء', 'الشاي']),
      v('تفاحة', 'Apple', 'noun', 'Tuffaha', 'أكلت تفاحة حمراء طازجة.', 'I ate a fresh red apple.', 'أكلت ___ حمراء طازجة.', 'تفاحة', ['الخبز', 'الماء', 'الشاي']),
      v('جبن', 'Cheese', 'expression', 'Jubn', 'الجبن الأبيض لذيذ مع الزيتون.', 'White cheese is delicious with olives.', 'ال___ الأبيض لذيذ مع الزيتون.', 'جبن', ['الخبز', 'الماء', 'الشاي']),
      v('أكل', 'To eat', 'noun', 'Akala', 'نحب أن نأكل معا دائما.', 'We always love to eat together.', 'نحب أن ن___ معا دائما.', 'أكل', ['الخبز', 'الماء', 'الشاي']),
      v('شرب', 'To drink', 'expression', 'Shariba', 'من المهم شرب السوائل.', 'It is important to drink liquids.', 'من المهم ___ السوائل.', 'شرب', ['الخبز', 'الماء', 'الشاي']),
      v('لذيذ', 'Delicious', 'noun', 'Ladhidh', 'هذا الطعام التقليدي لذيذ جدا.', 'This traditional food is very delicious.', 'هذا الطعام التقليدي ___ جدا.', 'لذيذ', ['الخبز', 'الماء', 'الشاي']),
      v('الفطور', 'Breakfast', 'expression', 'Al-futur', 'نتناول الفطور في الصباح الباكر.', 'We eat breakfast in the early morning.', 'نتناول ___ في الصباح الباكر.', 'الفطور', ['الخبز', 'الماء', 'الشاي']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["المطعم","Restaurant"],["السوق","Market"],["الفندق","Hotel"],["المدينة","City"],["القطار","Train"],["المطار","Airport"],["العمل","Work"],["المكتبة","Library"],["الصحة","Health"],["الطبيعة","Nature"],["السفر","Travel"],["الموسيقى","Music"],["التاريخ","History"],["الثقافة","Culture"],["العلوم","Science"],["الحوار","Dialogue"],["التواصل","Communication"],["النجاح","Success"],["المستقبل","Future"],["المعرفة","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  ARABIC_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
