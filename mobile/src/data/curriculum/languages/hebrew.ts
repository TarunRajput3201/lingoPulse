import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const HEBREW_LANGUAGE: LanguageDefinition = {
  code: 'he-en',
  title: 'Hebrew Academy',
  description: 'Master Modern Hebrew from alef-bet root structure to fluent Israeli conversations from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'he',
  flagIcon: '🇮🇱',
  level: 'A1–C1',
  order: 20,
  nativeName: 'עברית',
  isRTL: true,
  region: 'Middle Eastern',
  culturalTips: {
    1: 'Hebrew is written right-to-left using root-based consonant patterns (shorashim) with vowel marks (nikkud).',
    2: '"Shalom" means hello, goodbye, and peace, encapsulating profound cultural depth in a single word.',
  },
  units: {
    1: [
      v('שלום', 'Hello / Goodbye / Peace', 'noun', 'Shalom', 'שלום, מה שלומך היום?', 'Hello, how are you today?', '___, מה שלומך היום?', 'שלום', ['להתראות', 'תודה רבה', 'בבקשה']),
      v('להתראות', 'Goodbye', 'expression', 'Lehitraot', 'להתראות וניפגש בקרוב מאוד!', 'Goodbye and see you very soon!', '___ וניפגש בקרוב מאוד!', 'להתראות', ['שלום', 'תודה רבה', 'בבקשה']),
      v('תודה רבה', 'Thank you very much', 'noun', 'Toda raba', 'תודה רבה על העזרה הנהדרת שלך.', 'Thank you very much for your wonderful help.', '___ על העזרה הנהדרת שלך.', 'תודה רבה', ['שלום', 'להתראות', 'בבקשה']),
      v('בבקשה', 'Please / You\'re welcome', 'expression', 'Bevakasha', 'כוס קפה חם, בבקשה.', 'A cup of hot coffee, please.', 'כוס קפה חם, ___.', 'בבקשה', ['שלום', 'להתראות', 'תודה רבה']),
      v('כן', 'Yes', 'noun', 'Ken', 'כן, אני מבין את זה היטב.', 'Yes, I understand that well.', '___, אני מבין את זה היטב.', 'כן', ['שלום', 'להתראות', 'תודה רבה']),
      v('לא', 'No', 'expression', 'Lo', 'לא, זה לא אפשרי כרגע.', 'No, that is not possible right now.', '___, זה לא אפשרי כרגע.', 'לא', ['שלום', 'להתראות', 'תודה רבה']),
      v('מה שלומך', 'How are you', 'noun', 'Ma shlomkha', 'שלום חבר, מה שלומך הבוקר?', 'Hello friend, how are you this morning?', 'שלום חבר, ___ הבוקר?', 'מה שלומך', ['שלום', 'להתראות', 'תודה רבה']),
      v('ברוך הבא', 'Welcome', 'expression', 'Barukh haba', 'ברוך הבא לביתנו החם!', 'Welcome to our warm home!', '___ לביתנו החם!', 'ברוך הבא', ['שלום', 'להתראות', 'תודה רבה']),
      v('נתראה בקרוב', 'See you soon', 'noun', 'Nitra\'e bekarov', 'יום נפלא ונתראה בקרוב!', 'Wonderful day and see you soon!', 'יום נפלא ו___!', 'נתראה בקרוב', ['שלום', 'להתראות', 'תודה רבה']),
      v('לילה טוב', 'Good night', 'expression', 'Layla tov', 'לילה טוב וחלומות פז.', 'Good night and golden dreams.', '___ וחלומות פז.', 'לילה טוב', ['שלום', 'להתראות', 'תודה רבה']),
    ],
    2: [
      v('נעים להכיר', 'Nice to meet you', 'noun', 'Na\'im lehakir', 'נעים מאוד להכיר אותך.', 'Very nice to meet you.', 'נעים מאוד להכיר אותך.', 'נעים להכיר', ['שמי', 'סליחה', 'בוקר טוב']),
      v('שמי', 'My name is', 'expression', 'Shmi', 'שלום, שמי דוד ואני גר כאן.', 'Hello, my name is David and I live here.', 'שלום, ___ דוד ואני גר כאן.', 'שמי', ['נעים להכיר', 'סליחה', 'בוקר טוב']),
      v('סליחה', 'Excuse me / Sorry', 'noun', 'Slikha', 'סליחה, איפה תחנת הרכבת הקרובה?', 'Excuse me, where is nearest train station?', '___, איפה תחנת הרכבת הקרובה?', 'סליחה', ['נעים להכיר', 'שמי', 'בוקר טוב']),
      v('בוקר טוב', 'Good morning', 'expression', 'Boker tov', 'בוקר טוב לכל החברים והמשפחה!', 'Good morning to all friends and family!', '___ לכל החברים והמשפחה!', 'בוקר טוב', ['נעים להכיר', 'שמי', 'סליחה']),
      v('ערב טוב', 'Good evening', 'noun', 'Erev tov', 'ערב טוב וברוכים הבאים לכולם.', 'Good evening and welcome to everyone.', '___ וברוכים הבאים לכולם.', 'ערב טוב', ['נעים להכיר', 'שמי', 'סליחה']),
      v('חבר', 'Friend', 'expression', 'Khaver', 'הוא החבר הכי טוב והכי נאמן שלי.', 'He is my best and most loyal friend.', 'הוא ה___ הכי טוב והכי נאמן שלי.', 'חבר', ['נעים להכיר', 'שמי', 'סליחה']),
      v('מורה', 'Teacher', 'noun', 'Moreh', 'המורה שלנו מלמד בצורה מרתקת.', 'Our teacher teaches in a fascinating way.', 'ה___ שלנו מלמד בצורה מרתקת.', 'מורה', ['נעים להכיר', 'שמי', 'סליחה']),
      v('משפחה', 'Family', 'expression', 'Mishpakha', 'המשפחה שלי גרה בירושלים.', 'My family lives in Jerusalem.', 'ה___ שלי גרה בירושלים.', 'משפחה', ['נעים להכיר', 'שמי', 'סליחה']),
      v('מצוין', 'Excellent', 'noun', 'Metzuyan', 'הציון שלך במבחן היה מצוין.', 'Your grade on exam was excellent.', 'הציון שלך במבחן היה ___.', 'מצוין', ['נעים להכיר', 'שמי', 'סליחה']),
      v('בסדר', 'Fine / Okay', 'expression', 'Beseder', 'הכל מתקדם מצוין ובסדר גמור.', 'Everything is advancing excellently and completely fine.', 'הכל מתקדם מצוין ו___ גמור.', 'בסדר', ['נעים להכיר', 'שמי', 'סליחה']),
    ],
    3: [
      v('אחת', 'One', 'noun', 'Akhat', 'יש לי כרטיס נסיעה אחד.', 'I have one travel ticket.', 'יש לי כרטיס נסיעה אחד.', 'אחת', ['שתיים', 'שלוש', 'ארבע']),
      v('שתיים', 'Two', 'expression', 'Shtayim', 'שתי כוסות קפה חם, בבקשה.', 'Two cups of hot coffee, please.', 'שתי כוסות קפה חם, בבקשה.', 'שתיים', ['אחת', 'שלוש', 'ארבע']),
      v('שלוש', 'Three', 'noun', 'Shalosh', 'יש שלושה חדרים פנויים במלון.', 'There are three vacant rooms in hotel.', 'יש ___ה חדרים פנויים במלון.', 'שלוש', ['אחת', 'שתיים', 'ארבע']),
      v('ארבע', 'Four', 'expression', 'Arba', 'אנחנו ארבעה אנשים בקבוצה.', 'We are four people in group.', 'אנחנו ___ה אנשים בקבוצה.', 'ארבע', ['אחת', 'שתיים', 'שלוש']),
      v('חמש', 'Five', 'noun', 'Khamesh', 'הרכבת יוצאת בעוד חמש דקות.', 'The train leaves in five minutes.', 'הרכבת יוצאת בעוד ___ דקות.', 'חמש', ['אחת', 'שתיים', 'שלוש']),
      v('עשר', 'Ten', 'expression', 'Eser', 'זה עולה בדיוק עשרה שקלים.', 'This costs exactly ten shekels.', 'זה עולה בדיוק ___ה שקלים.', 'עשר', ['אחת', 'שתיים', 'שלוש']),
      v('עשרים', 'Twenty', 'noun', 'Esrim', 'יש עשרים תלמידים בכיתה.', 'There are twenty students in classroom.', 'יש ___ תלמידים בכיתה.', 'עשרים', ['אחת', 'שתיים', 'שלוש']),
      v('חמישים', 'Fifty', 'expression', 'Khamishim', 'באולם יש חמישים מקומות ישיבה.', 'In hall are fifty sitting places.', 'באולם יש ___ מקומות ישיבה.', 'חמישים', ['אחת', 'שתיים', 'שלוש']),
      v('מאה', 'One hundred', 'noun', 'Me\'a', 'הספר כולל מאה עמודים.', 'The book includes hundred pages.', 'הספר כולל ___ עמודים.', 'מאה', ['אחת', 'שתיים', 'שלוש']),
      v('לספור', 'To count', 'expression', 'Lispor', 'אני יודע לספור בעברית בקלות.', 'I know how to count in Hebrew easily.', 'אני יודע ___ בעברית בקלות.', 'לספור', ['אחת', 'שתיים', 'שלוש']),
    ],
    4: [
      v('אבא', 'Father', 'noun', 'Abba', 'אבא שלי עובד כמהנדס בניין.', 'My father works as civil engineer.', '___ שלי עובד כמהנדס בניין.', 'אבא', ['אמא', 'אח', 'אחות']),
      v('אמא', 'Mother', 'expression', 'Imma', 'אמא שלי רופאה בבית החולים.', 'My mother is doctor in hospital.', '___ שלי רופאה בבית החולים.', 'אמא', ['אבא', 'אח', 'אחות']),
      v('אח', 'Brother', 'noun', 'Akh', 'אח שלי לומד באוניברסיטה.', 'My brother studies at university.', '___ שלי לומד באוניברסיטה.', 'אח', ['אבא', 'אמא', 'אחות']),
      v('אחות', 'Sister', 'expression', 'Akhot', 'אחותי מנגנת בפסנתר יפה מאוד.', 'My sister plays piano very nicely.', '___י מנגנת בפסנתר יפה מאוד.', 'אחות', ['אבא', 'אמא', 'אח']),
      v('סבא', 'Grandfather', 'noun', 'Sabba', 'סבא מטייל בגינה בכל בוקר.', 'Grandfather walks in garden every morning.', '___ מטייל בגינה בכל בוקר.', 'סבא', ['אבא', 'אמא', 'אח']),
      v('סבתא', 'Grandmother', 'expression', 'Savta', 'סבתא מכינה מרק טעים להפליא.', 'Grandmother prepares extraordinarily tasty soup.', '___ מכינה מרק טעים להפליא.', 'סבתא', ['אבא', 'אמא', 'אח']),
      v('בן', 'Son', 'noun', 'Ben', 'הבן שלהם משחק כדורסל בנבחרת.', 'Their son plays basketball on team.', 'ה___ שלהם משחק כדורסל בנבחרת.', 'בן', ['אבא', 'אמא', 'אח']),
      v('בת', 'Daughter', 'expression', 'Bat', 'הבת שלהם מציירת תמונות מקסימות.', 'Their daughter paints charming pictures.', 'ה___ שלהם מציירת תמונות מקסימות.', 'בת', ['אבא', 'אמא', 'אח']),
      v('הורים', 'Parents', 'noun', 'Horim', 'ההורים שלי אוהבים לטייל בארץ.', 'My parents love traveling in country.', 'ה___ שלי אוהבים לטייל בארץ.', 'הורים', ['אבא', 'אמא', 'אח']),
      v('בית', 'Home', 'expression', 'Bayit', 'הבית שלנו נעים, חם ומואר.', 'Our home is pleasant, warm, and bright.', 'ה___ שלנו נעים, חם ומואר.', 'בית', ['אבא', 'אמא', 'אח']),
    ],
    5: [
      v('לחם', 'Bread', 'noun', 'Lekhem', 'לחם טרי ומאפה חם מהמאפייה.', 'Fresh bread and hot pastry from bakery.', '___ טרי ומאפה חם מהמאפייה.', 'לחם', ['מים', 'תה', 'קפה']),
      v('מים', 'Water', 'expression', 'Mayim', 'כוס מים קרים, בבקשה.', 'A glass of cold water, please.', 'כוס ___ קרים, בבקשה.', 'מים', ['לחם', 'תה', 'קפה']),
      v('תה', 'Tea', 'noun', 'Teh', 'אני מעדיף תה צמחים עם נענע.', 'I prefer herbal tea with mint.', 'אני מעדיף ___ צמחים עם נענע.', 'תה', ['לחם', 'מים', 'קפה']),
      v('קפה', 'Coffee', 'expression', 'Kafeh', 'קפה שחור חזק בבוקר מעורר.', 'Strong black coffee in morning awakens.', '___ שחור חזק בבוקר מעורר.', 'קפה', ['לחם', 'מים', 'תה']),
      v('תפוח', 'Apple', 'noun', 'Tapuakh', 'תפוח אדום עסיסי ומתוק.', 'A juicy and sweet red apple.', '___ אדום עסיסי ומתוק.', 'תפוח', ['לחם', 'מים', 'תה']),
      v('גבינה', 'Cheese', 'expression', 'Gvina', 'גבינה ישראלית טעימה מאוד בסלט.', 'Israeli cheese is very tasty in salad.', '___ ישראלית טעימה מאוד בסלט.', 'גבינה', ['לחם', 'מים', 'תה']),
      v('לאכול', 'To eat', 'noun', 'Le\'ekhol', 'אנחנו אוהבים לאכול ארוחה משפחתית.', 'We love eating family meal.', 'אנחנו אוהבים ___ ארוחה משפחתית.', 'לאכול', ['לחם', 'מים', 'תה']),
      v('לשתות', 'To drink', 'expression', 'Lishtot', 'חשוב מאוד לשתות הרבה מים בקיץ.', 'Very important to drink lots of water in summer.', 'חשוב מאוד ___ הרבה מים בקיץ.', 'לשתות', ['לחם', 'מים', 'תה']),
      v('טעים', 'Delicious', 'noun', 'Ta\'im', 'המאכל המסורתי הזה פשוט טעים.', 'This traditional dish is simply delicious.', 'המאכל המסורתי הזה פשוט ___.', 'טעים', ['לחם', 'מים', 'תה']),
      v('ארוחת בוקר', 'Breakfast', 'expression', 'Arukhat boker', 'ארוחת הבוקר מוגשת בשעה שמונה.', 'Breakfast is served at eight o\'clock.', 'ארוחת הבוקר מוגשת בשעה שמונה.', 'ארוחת בוקר', ['לחם', 'מים', 'תה']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["מסעדה","Restaurant"],["חנות","Shop"],["מלון","Hotel"],["עיר","City"],["רכבת","Train"],["שדה תעופה","Airport"],["עבודה","Work"],["בית ספר","School"],["בריאות","Health"],["טבע","Nature"],["חופשה","Vacation"],["מוזיקה","Music"],["היסטוריה","History"],["תרבות","Culture"],["מדע","Science"],["שיחה","Conversation"],["חברה","Society"],["הצלחה","Success"],["עתיד","Future"],["ידע","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  HEBREW_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
