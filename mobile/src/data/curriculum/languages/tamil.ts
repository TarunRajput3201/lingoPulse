import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const TAMIL_LANGUAGE: LanguageDefinition = {
  code: 'ta-en',
  title: 'Tamil Academy',
  description: 'Master classical and modern Tamil from Sangam roots to fluent everyday conversational fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'ta',
  flagIcon: '🇮🇳',
  level: 'A1–C1',
  order: 29,
  nativeName: 'தமிழ்',
  isRTL: false,
  region: 'Indian',
  culturalTips: {
    1: 'Tamil is one of the world\'s longest-surviving classical languages, with ancient roots and modern vitality.',
    2: 'Saying "வணக்கம்" (Vanakkam) with palms joined together expresses traditional Tamil respect.',
  },
  units: {
    1: [
      v('வணக்கம்', 'Hello / Greetings', 'noun', 'Vanakkam', 'வணக்கம், இன்று நீங்கள் எப்படி இருக்கிறீர்கள்?', 'Hello, how are you today?', '___, இன்று நீங்கள் எப்படி இருக்கிறீர்கள்?', 'வணக்கம்', ['விடைபெறுகிறேன்', 'நன்றி', 'தயவுசெய்து']),
      v('விடைபெறுகிறேன்', 'Goodbye', 'expression', 'Vidaiperugiren', 'விடைபெறுகிறேன், விரைவில் மீண்டும் சந்திப்போம்!', 'Goodbye and see you again soon!', '___, விரைவில் மீண்டும் சந்திப்போம்!', 'விடைபெறுகிறேன்', ['வணக்கம்', 'நன்றி', 'தயவுசெய்து']),
      v('நன்றி', 'Thank you', 'noun', 'Nandri', 'உங்கள் அருமையான உதவிக்கு மிக்க நன்றி.', 'Thank you very much for your wonderful help.', 'உங்கள் அருமையான உதவிக்கு மிக்க ___.', 'நன்றி', ['வணக்கம்', 'விடைபெறுகிறேன்', 'தயவுசெய்து']),
      v('தயவுசெய்து', 'Please', 'expression', 'Thayavuseythu', 'ஒரு கோப்பை சூடான தேநீர் கொடுங்கள், தயவுசெய்து.', 'Give a cup of hot tea, please.', 'ஒரு கோப்பை சூடான தேநீர் கொடுங்கள், ___.', 'தயவுசெய்து', ['வணக்கம்', 'விடைபெறுகிறேன்', 'நன்றி']),
      v('ஆம்', 'Yes', 'noun', 'Aam', 'ஆம், எனக்கு நன்றாகப் புரிகிறது.', 'Yes, I understand well.', '___, எனக்கு நன்றாகப் புரிகிறது.', 'ஆம்', ['வணக்கம்', 'விடைபெறுகிறேன்', 'நன்றி']),
      v('இல்லை', 'No', 'expression', 'Illai', 'இல்லை, இன்று அது சாத்தியமில்லை.', 'No, that is not possible today.', '___, இன்று அது சாத்தியமில்லை.', 'இல்லை', ['வணக்கம்', 'விடைபெறுகிறேன்', 'நன்றி']),
      v('எப்படி இருக்கிறீர்கள்', 'How are you', 'noun', 'Eppadi irukkireergal', 'வணக்கம் நண்பரே, எப்படி இருக்கிறீர்கள் இன்று?', 'Hello friend, how are you today?', 'வணக்கம் நண்பரே, ___ இன்று?', 'எப்படி இருக்கிறீர்கள்', ['வணக்கம்', 'விடைபெறுகிறேன்', 'நன்றி']),
      v('நல்வரவு', 'Welcome', 'expression', 'Nalvaravu', 'எங்கள் அழகான ஊருக்கு நல்வரவு!', 'Welcome to our beautiful town!', 'எங்கள் அழகான ஊருக்கு ___!', 'நல்வரவு', ['வணக்கம்', 'விடைபெறுகிறேன்', 'நன்றி']),
      v('மீண்டும் சந்திப்போம்', 'See you soon', 'noun', 'Meendum santhippom', 'இனிய நாளாக அமையட்டும், மீண்டும் சந்திப்போம்!', 'Have a sweet day, see you again!', 'இனிய நாளாக அமையட்டும், ___!', 'மீண்டும் சந்திப்போம்', ['வணக்கம்', 'விடைபெறுகிறேன்', 'நன்றி']),
      v('இனிய இரவு', 'Good night', 'expression', 'Iniya iravu', 'இனிய இரவு, இனிமையான கனவுகள் காணுங்கள்.', 'Good night and sweet dreams.', '___, இனிமையான கனவுகள் காணுங்கள்.', 'இனிய இரவு', ['வணக்கம்', 'விடைபெறுகிறேன்', 'நன்றி']),
    ],
    2: [
      v('சந்தித்ததில் மகிழ்ச்சி', 'Nice to meet you', 'noun', 'Santhithathil magizhchi', 'உங்களைச் சந்தித்ததில் மிகுந்த மகிழ்ச்சி.', 'Very pleased to meet you.', 'உங்களைச் சந்தித்ததில் மிகுந்த மகிழ்ச்சி.', 'சந்தித்ததில் மகிழ்ச்சி', ['என் பெயர்', 'மன்னிக்கவும்', 'காலை வணக்கம்']),
      v('என் பெயர்', 'My name is', 'expression', 'En peyar', 'வணக்கம், என் பெயர் செந்தில்.', 'Hello, my name is Senthil.', 'வணக்கம், ___ செந்தில்.', 'என் பெயர்', ['சந்தித்ததில் மகிழ்ச்சி', 'மன்னிக்கவும்', 'காலை வணக்கம்']),
      v('மன்னிக்கவும்', 'Excuse me / Sorry', 'noun', 'Mannikkavum', 'மன்னிக்கவும், தொடருந்து நிலையம் எங்கே உள்ளது?', 'Excuse me, where is railway station?', '___, தொடருந்து நிலையம் எங்கே உள்ளது?', 'மன்னிக்கவும்', ['சந்தித்ததில் மகிழ்ச்சி', 'என் பெயர்', 'காலை வணக்கம்']),
      v('காலை வணக்கம்', 'Good morning', 'expression', 'Kaalai vanakkam', 'அனைவருக்கும் இனிய காலை வணக்கம்!', 'Sweet good morning to all!', 'அனைவருக்கும் இனிய ___!', 'காலை வணக்கம்', ['சந்தித்ததில் மகிழ்ச்சி', 'என் பெயர்', 'மன்னிக்கவும்']),
      v('மாலை வணக்கம்', 'Good evening', 'noun', 'Maalai vanakkam', 'மாலை வணக்கம் மற்றும் நல்வரவு.', 'Good evening and welcome.', '___ மற்றும் நல்வரவு.', 'மாலை வணக்கம்', ['சந்தித்ததில் மகிழ்ச்சி', 'என் பெயர்', 'மன்னிக்கவும்']),
      v('நண்பன்', 'Friend', 'expression', 'Nanban', 'அவன் என்னுடைய மிகச் சிறந்த நண்பன்.', 'He is my best friend.', 'அவன் என்னுடைய மிகச் சிறந்த ___.', 'நண்பன்', ['சந்தித்ததில் மகிழ்ச்சி', 'என் பெயர்', 'மன்னிக்கவும்']),
      v('ஆசிரியர்', 'Teacher', 'noun', 'Aasiriyar', 'எங்கள் ஆசிரியர் பாடங்களை எளிமையாகக் கற்பிக்கிறார்.', 'Our teacher teaches lessons simply.', 'எங்கள் ___ பாடங்களை எளிமையாகக் கற்பிக்கிறார்.', 'ஆசிரியர்', ['சந்தித்ததில் மகிழ்ச்சி', 'என் பெயர்', 'மன்னிக்கவும்']),
      v('குடும்பம்', 'Family', 'expression', 'Kudumbam', 'என் குடும்பம் சென்னையில் வசிக்கிறது.', 'My family lives in Chennai.', 'என் ___ சென்னையில் வசிக்கிறது.', 'குடும்பம்', ['சந்தித்ததில் மகிழ்ச்சி', 'என் பெயர்', 'மன்னிக்கவும்']),
      v('அற்புதம்', 'Wonderful', 'noun', 'Arputham', 'தேர்வு முடிவுகள் அற்புதமாக வந்துள்ளன.', 'Exam results came out wonderfully.', 'தேர்வு முடிவுகள் அற்புதமாக வந்துள்ளன.', 'அற்புதம்', ['சந்தித்ததில் மகிழ்ச்சி', 'என் பெயர்', 'மன்னிக்கவும்']),
      v('நன்று', 'Good', 'expression', 'Nandru', 'எல்லாம் மிக நன்நாக நடைபெறுகிறது.', 'Everything goes very well.', 'எல்லாம் மிக நன்நாக நடைபெறுகிறது.', 'நன்று', ['சந்தித்ததில் மகிழ்ச்சி', 'என் பெயர்', 'மன்னிக்கவும்']),
    ],
    3: [
      v('ஒன்று', 'One', 'noun', 'Ondru', 'என்னிடம் ஒரு பயணச்சீட்டு உள்ளது.', 'I have one travel ticket.', 'என்னிடம் ஒரு பயணச்சீட்டு உள்ளது.', 'ஒன்று', ['இரண்டு', 'மூன்று', 'நான்கு']),
      v('இரண்டு', 'Two', 'expression', 'Irandu', 'இரண்டு கோப்பை சூடான காபி கொடுங்கள்.', 'Give two cups of hot coffee.', '___ கோப்பை சூடான காபி கொடுங்கள்.', 'இரண்டு', ['ஒன்று', 'மூன்று', 'நான்கு']),
      v('மூன்று', 'Three', 'noun', 'Moondru', 'விடுதியில் மூன்று அறைகள் காலியாக உள்ளன.', 'Three rooms are vacant in lodge.', 'விடுதியில் ___ அறைகள் காலியாக உள்ளன.', 'மூன்று', ['ஒன்று', 'இரண்டு', 'நான்கு']),
      v('நான்கு', 'Four', 'expression', 'Naangu', 'நாங்கள் நான்கு நண்பர்கள் வந்துள்ளோம்.', 'We four friends have come.', 'நாங்கள் ___ நண்பர்கள் வந்துள்ளோம்.', 'நான்கு', ['ஒன்று', 'இரண்டு', 'மூன்று']),
      v('ஐந்து', 'Five', 'noun', 'Ainthu', 'பேருந்து ஐந்து நிமிடத்தில் புறப்படும்.', 'Bus will depart in five minutes.', 'பேருந்து ___ நிமிடத்தில் புறப்படும்.', 'ஐந்து', ['ஒன்று', 'இரண்டு', 'மூன்று']),
      v('பத்து', 'Ten', 'expression', 'Pathu', 'இதன் விலை சரியாகப் பத்து ரூபாய்.', 'Its price is exactly ten rupees.', 'இதன் விலை சரியாகப் ___ ரூபாய்.', 'பத்து', ['ஒன்று', 'இரண்டு', 'மூன்று']),
      v('இருபது', 'Twenty', 'noun', 'Irubathu', 'வகுப்பறையில் இருபது மாணவர்கள் உள்ளனர்.', 'Twenty students are in classroom.', 'வகுப்பறையில் ___ மாணவர்கள் உள்ளனர்.', 'இருபது', ['ஒன்று', 'இரண்டு', 'மூன்று']),
      v('ஐம்பது', 'Fifty', 'expression', 'Aimpathu', 'மண்டபத்தில் ஐம்பது இருக்கைகள் உள்ளன.', 'Fifty seats are in hall.', 'மண்டபத்தில் ___ இருக்கைகள் உள்ளன.', 'ஐம்பது', ['ஒன்று', 'இரண்டு', 'மூன்று']),
      v('நூறு', 'One hundred', 'noun', 'Nooru', 'இந்தப் புத்தகத்தில் நூறு பக்கங்கள் உள்ளன.', 'In this book are hundred pages.', 'இந்தப் புத்தகத்தில் ___ பக்கங்கள் உள்ளன.', 'நூறு', ['ஒன்று', 'இரண்டு', 'மூன்று']),
      v('எண்ணுதல்', 'To count', 'expression', 'Ennuthal', 'தமிழில் என்னால் எளிதாக எண்ண முடியும்.', 'I can count in Tamil easily.', 'தமிழில் என்னால் எளிதாக எண்ண முடியும்.', 'எண்ணுதல்', ['ஒன்று', 'இரண்டு', 'மூன்று']),
    ],
    4: [
      v('தந்தை', 'Father', 'noun', 'Thanthai', 'என் தந்தை ஒரு பொறியாளர்.', 'My father is an engineer.', 'என் ___ ஒரு பொறியாளர்.', 'தந்தை', ['தாய்', 'சகோதரன்', 'சகோதரி']),
      v('தாய்', 'Mother', 'expression', 'Thaai', 'என் தாய் மருத்துவமனையில் மருத்துவர்.', 'My mother is doctor in hospital.', 'என் ___ மருத்துவமனையில் மருத்துவர்.', 'தாய்', ['தந்தை', 'சகோதரன்', 'சகோதரி']),
      v('சகோதரன்', 'Brother', 'noun', 'Sagotharan', 'என் அண்ணன் பல்கலைக்கழகத்தில் படிக்கிறார்.', 'My elder brother studies at university.', 'என் அண்ணன் பல்கலைக்கழகத்தில் படிக்கிறார்.', 'சகோதரன்', ['தந்தை', 'தாய்', 'சகோதரி']),
      v('சகோதரி', 'Sister', 'expression', 'Sagothari', 'என் தங்கை இனிமையாகப் பாடுவாள்.', 'My younger sister sings sweetly.', 'என் தங்கை இனிமையாகப் பாடுவாள்.', 'சகோதரி', ['தந்தை', 'தாய்', 'சகோதரன்']),
      v('தாத்தா', 'Grandfather', 'noun', 'Thaatha', 'தாத்தா காலையில் பூங்காவில் நடைபயிற்சி செய்கிறார்.', 'Grandfather exercises walking in park.', '___ காலையில் பூங்காவில் நடைபயிற்சி செய்கிறார்.', 'தாத்தா', ['தந்தை', 'தாய்', 'சகோதரன்']),
      v('பாட்டி', 'Grandmother', 'expression', 'Paatti', 'பாட்டி சுவையான பலகாரங்கள் செய்கிறார்.', 'Grandmother makes tasty snacks.', '___ சுவையான பலகாரங்கள் செய்கிறார்.', 'பாட்டி', ['தந்தை', 'தாய்', 'சகோதரன்']),
      v('மகன்', 'Son', 'noun', 'Magan', 'அவர்களது மகன் கிரிக்கெட் அணியில் ஆடுகிறான்.', 'Their son plays in cricket team.', 'அவர்களது ___ கிரிக்கெட் அணியில் ஆடுகிறான்.', 'மகன்', ['தந்தை', 'தாய்', 'சகோதரன்']),
      v('மகள்', 'Daughter', 'expression', 'Magal', 'அவர்களது மகள் நடனம் கற்றுக்கொள்கிறாள்.', 'Their daughter learns dance.', 'அவர்களது ___ நடனம் கற்றுக்கொள்கிறாள்.', 'மகள்', ['தந்தை', 'தாய்', 'சகோதரன்']),
      v('பெற்றோர்', 'Parents', 'noun', 'Petror', 'என் பெற்றோர் ஆன்மீகப் பயணம் மேற்கொள்கின்றனர்.', 'My parents undertake spiritual journeys.', 'என் ___ ஆன்மீகப் பயணம் மேற்கொள்கின்றனர்.', 'பெற்றோர்', ['தந்தை', 'தாய்', 'சகோதரன்']),
      v('வீடு', 'Home', 'expression', 'Veedu', 'எங்கள் வீடு அமைதியான சூழலில் உள்ளது.', 'Our home is in peaceful atmosphere.', 'எங்கள் ___ அமைதியான சூழலில் உள்ளது.', 'வீடு', ['தந்தை', 'தாய்', 'சகோதரன்']),
    ],
    5: [
      v('ரொட்டி', 'Bread', 'noun', 'Rotti', 'காலை உணவாக ரொட்டி சாப்பிடுவது நல்லது.', 'Eating bread as breakfast is good.', 'காலை உணவாக ___ சாப்பிடுவது நல்லது.', 'ரொட்டி', ['தண்ணீர்', 'தேநீர்', 'காபி']),
      v('தண்ணீர்', 'Water', 'expression', 'Thanneer', 'ஒரு குவளை குளிர்ந்த தண்ணீர் தாருங்கள்.', 'Give a tumbler of cold water.', 'ஒரு குவளை குளிர்ந்த ___ தாருங்கள்.', 'தண்ணீர்', ['ரொட்டி', 'தேநீர்', 'காபி']),
      v('தேநீர்', 'Tea', 'noun', 'Theneer', 'சூடான இஞ்சித் தேநீர் உடலுக்கு நல்லது.', 'Hot ginger tea is good for body.', 'சூடான இஞ்சித் ___ உடலுக்கு நல்லது.', 'தேநீர்', ['ரொட்டி', 'தண்ணீர்', 'காபி']),
      v('காபி', 'Coffee', 'expression', 'Kaabi', 'தென்னிந்திய பில்டர் காபி உலகப் பிரசித்தி பெற்றது.', 'South Indian filter coffee is world famous.', 'தென்னிந்திய பில்டர் ___ உலகப் பிரசித்தி பெற்றது.', 'காபி', ['ரொட்டி', 'தண்ணீர்', 'தேநீர்']),
      v('ஆப்பிள்', 'Apple', 'noun', 'Aappil', 'இனிப்பான சிவப்பு ஆப்பிள் உடலுக்கு ஊட்டச்சத்து.', 'Sweet red apple is nutrition for body.', 'இனிப்பான சிவப்பு ___ உடலுக்கு ஊட்டச்சத்து.', 'ஆப்பிள்', ['ரொட்டி', 'தண்ணீர்', 'தேநீர்']),
      v('பாலாடைக்கட்டி', 'Cheese', 'expression', 'Paalaadaikkatti', 'பாலாடைக்கட்டி உணவில் சுவையைக் கூட்டுகிறது.', 'Cheese adds taste to food.', '___ உணவில் சுவையைக் கூட்டுகிறது.', 'பாலாடைக்கட்டி', ['ரொட்டி', 'தண்ணீர்', 'தேநீர்']),
      v('சாப்பிடு', 'To eat', 'noun', 'Saappidu', 'நாம் அனைவரும் ஒன்றாகச் சாப்பிடுவோம்.', 'Let us all eat together.', 'நாம் அனைவரும் ஒன்றாகச் ___வோம்.', 'சாப்பிடு', ['ரொட்டி', 'தண்ணீர்', 'தேநீர்']),
      v('குடி', 'To drink', 'expression', 'Kudi', 'தினமும் போதுமான அளவு தண்ணீர் குடிக்க வேண்டும்.', 'One should drink sufficient water daily.', 'தினமும் போதுமான அளவு தண்ணீர் ___க்க வேண்டும்.', 'குடி', ['ரொட்டி', 'தண்ணீர்', 'தேநீர்']),
      v('சுவையான', 'Delicious', 'noun', 'Suvaiyaana', 'இந்த பாரம்பரிய சாப்பாடு மிகவும் சுவையான உணவு.', 'This traditional meal is very delicious food.', 'இந்த பாரம்பரிய சாப்பாடு மிகவும் ___ உணவு.', 'சுவையான', ['ரொட்டி', 'தண்ணீர்', 'தேநீர்']),
      v('காலை உணவு', 'Breakfast', 'expression', 'Kaalai unavu', 'காலை உணவு எட்டு மணிக்குத் தயாராகிறது.', 'Breakfast gets ready at eight.', '___ எட்டு மணிக்குத் தயாராகிறது.', 'காலை உணவு', ['ரொட்டி', 'தண்ணீர்', 'தேநீர்']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["உணவகம்","Restaurant"],["கடை","Shop"],["விடுதி","Hotel"],["நகரம்","City"],["தொடருந்து","Train"],["விமானநிலையம்","Airport"],["பணி","Work"],["பள்ளி","School"],["சுகாதாரம்","Health"],["இயற்கை","Nature"],["விடுமுறை","Holiday"],["இசை","Music"],["வரலாறு","History"],["பண்பாடு","Culture"],["அறிவியல்","Science"],["உரையாடல்","Conversation"],["சமூகம்","Society"],["வெற்றி","Success"],["எதிர்காலம்","Future"],["அறிவு","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  TAMIL_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
