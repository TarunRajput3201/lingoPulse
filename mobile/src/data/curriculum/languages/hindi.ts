import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const HINDI_LANGUAGE: LanguageDefinition = {
  code: 'hi-en',
  title: 'Hindi Academy',
  description: 'Master practical Hindi from Devanagari script and polite salutations to advanced literary and conversational fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'hi',
  flagIcon: '🇮🇳',
  level: 'A1–C1',
  order: 10,
  culturalTips: {
    1: 'Saying "नमस्ते" (Namaste) with hands folded at chest level (añjali mudrā) expresses spiritual greeting and reverence.',
    2: 'Use "आप" (Aap) for elders and respected acquaintances, "तुम" (Tum) for informal friends, and avoid "तू" (Tu) unless intimate.',
  },
  units: {
    1: [
      v('नमस्ते', 'Hello', 'expression', 'Namaste', 'नमस्ते, आप कैसे हैं?', 'Hello, how are you?', '___, आप कैसे हैं?', 'नमस्ते', ['अलविदा', 'धन्यवाद', 'हाँ']),
      v('अलविदा', 'Goodbye', 'expression', 'Alvida', 'अलविदा, फिर मिलेंगे!', 'Goodbye, see you again!', '___, फिर मिलेंगे!', 'अलविदा', ['नमस्ते', 'कृपया', 'हाँ']),
      v('धन्यवाद', 'Thank you', 'expression', 'Dhanyavaad', 'आपकी बहुमूल्य सहायता के लिए बहुत-बहुत धन्यवाद।', 'Thank you very much for your valuable help.', 'आपकी बहुमूल्य सहायता के लिए बहुत-बहुत ___ ।', 'धन्यवाद', ['माफ़ कीजिए', 'नमस्ते', 'नहीं']),
      v('कृपया', 'Please', 'expression', 'Kripya', 'कृपया मुझे एक कप गर्म चाय दीजिए।', 'Please give me a cup of hot tea.', '___ मुझे एक कप गर्म चाय दीजिए।', 'कृपया', ['धन्यवाद', 'अलविदा', 'नमस्ते']),
      v('हाँ', 'Yes', 'expression', 'Haan', 'हाँ, मैं पूरी तरह समझता हूँ।', 'Yes, I completely understand.', '___, मैं पूरी तरह समझता हूँ।', 'हाँ', ['नहीं', 'धन्यवाद', 'माफ़ कीजिए']),
      v('नहीं', 'No', 'expression', 'Nahin', 'नहीं, यह संभव नहीं है।', 'No, this is not possible.', '___, यह संभव नहीं है।', 'नहीं', ['हाँ', 'नमस्ते', 'धन्यवाद']),
      v('आप कैसे हैं?', 'How are you?', 'phrase', 'Aap kaise hain', 'नमस्ते, आप सब कैसे हैं?', 'Hello, how are you all?', 'नमस्ते, आप सब ___ ?', 'कैसे हैं', ['अलविदा', 'धन्यवाद', 'शुभ प्रभात']),
      v('स्वागत है', 'Welcome', 'expression', 'Swagat hai', 'भारत में आपका हार्दिक स्वागत है!', 'Warm welcome to India!', 'भारत में आपका हार्दिक ___ !', 'स्वागत है', ['अलविदा', 'धन्यवाद', 'माफ़ कीजिए']),
      v('फिर मिलेंगे', 'See you later', 'phrase', 'Phir milenge', 'शुभ दिन और फिर मिलेंगे!', 'Have a good day and see you again!', 'शुभ दिन और ___ !', 'फिर मिलेंगे', ['नमस्ते', 'कृपया', 'हाँ']),
      v('शुभ रात्रि', 'Good night', 'expression', 'Shubh raatri', 'शुभ रात्रि, मीठे सपने देखें।', 'Good night, sweet dreams.', '___, मीठे सपने देखें।', 'शुभ रात्रि', ['सुप्रभात', 'धन्यवाद', 'हाँ']),
    ],
    2: [
      v('आपसे मिलकर खुशी हुई', 'Nice to meet you', 'expression', 'Aapse milkar khushi hui', 'आपसे मिलकर बहुत खुशी हुई।', 'Very pleased to meet you.', 'आपसे मिलकर बहुत ___ ।', 'खुशी हुई', ['माफ़ कीजिए', 'धन्यवाद', 'अलविदा']),
      v('मेरा नाम है', 'My name is', 'phrase', 'Mera naam hai', 'नमस्ते, मेरा नाम राहुल है।', 'Hello, my name is Rahul.', 'नमस्ते, ___ राहुल है।', 'मेरा नाम', ['खुशी हुई', 'कृपया', 'धन्यवाद']),
      v('माफ़ कीजिए', 'Excuse me / Sorry', 'expression', 'Maaf kijiye', 'माफ़ कीजिए, क्या आप मेरी मदद कर सकते हैं?', 'Excuse me, can you help me?', '___, क्या आप मेरी मदद कर सकते हैं?', 'माफ़ कीजिए', ['धन्यवाद', 'नमस्ते', 'हाँ']),
      v('सुप्रभात', 'Good morning', 'phrase', 'Suprabhaat', 'सभी मित्रों को सुप्रभात!', 'Good morning to all friends!', 'सभी मित्रों को ___ !', 'सुप्रभात', ['शुभ रात्रि', 'अलविदा', 'नमस्ते']),
      v('कोई बात नहीं', 'No problem / Welcome', 'phrase', 'Koi baat nahin', 'अरे कोई बात नहीं, यह मेरा सौभाग्य है!', 'Oh no problem, it is my pleasure!', 'अरे ___ , यह मेरा सौभाग्य है!', 'कोई बात नहीं', ['धन्यवाद', 'नमस्ते', 'हाँ']),
      v('दोस्त', 'Friend', 'noun', 'Dost', 'वह मेरा सबसे पुराना और अच्छा दोस्त है।', 'He is my oldest and best friend.', 'वह मेरा सबसे पुराना और अच्छा ___ है।', 'दोस्त', ['अध्यापक', 'भाई', 'विद्यार्थी']),
      v('शिक्षक', 'Teacher', 'noun', 'Shikshak', 'हमारे शिक्षक बहुत ज्ञानी और दयालु हैं।', 'Our teacher is very knowledgeable and kind.', 'हमारे ___ बहुत ज्ञानी और दयालु हैं।', 'शिक्षक', ['विद्यार्थी', 'दोस्त', 'डॉक्टर']),
      v('भारत', 'India', 'noun', 'Bharat', 'भारत एक सांस्कृतिक रूप से समृद्ध देश है।', 'India is a culturally rich country.', '___ एक सांस्कृतिक रूप से समृद्ध देश है।', 'भारत', ['दिल्ली', 'मुंबई', 'स्टेशन']),
      v('सब ठीक है', 'All is well', 'phrase', 'Sab theek hai', 'चिंता मत कीजिए, सब ठीक है।', 'Don\'t worry, all is well.', 'चिंता मत कीजिए, ___ ।', 'सब ठीक है', ['गलत है', 'माफ़ कीजिए', 'नहीं']),
      v('सादर प्रणाम', 'Respectful greetings', 'phrase', 'Saadar pranaam', 'बड़ों को मेरा सादर प्रणाम।', 'My respectful greetings to elders.', 'बड़ों को मेरा ___ ।', 'सादर प्रणाम', ['अलविदा', 'नमस्ते', 'धन्यवाद']),
    ],
  },
};

for (let u = 3; u <= 50; u++) {
  HINDI_LANGUAGE.units[u] = [
    v(`शब्द_hi_${u}_1`, `Hindi Concept ${u}.1`, 'noun', `Shabd_${u}_1`, `यह संकल्पना${u} भाषा के अध्ययन में अत्यंत आवश्यक है।`, `This concept ${u} is essential in language study.`, `यह संकल्पना___ भाषा के अध्ययन में अत्यंत आवश्यक है।`, `शब्द_hi_${u}_1`, ['अर्थ', 'व्याकरण', 'वाक्य']),
    v(`शब्द_hi_${u}_2`, `Hindi Concept ${u}.2`, 'verb', `Shabd_${u}_2`, `हमें इस विषय${u} का गहन अध्ययन करना चाहिए।`, `We should study theme ${u} deeply.`, `हमें इस विषय___ का गहन अध्ययन करना चाहिए।`, `शब्द_hi_${u}_2`, ['सीखना', 'पढ़ना', 'सोचना']),
    v(`शब्द_hi_${u}_3`, `Hindi Concept ${u}.3`, 'adjective', `Shabd_${u}_3`, `नवीन दृष्टिकोण${u} बातचीत को समृद्ध बनाता है।`, `A new perspective ${u} enriches conversation.`, `नवीन दृष्टिकोण___ बातचीत को समृद्ध बनाता है।`, `शब्द_hi_${u}_3`, ['स्पष्ट', 'गहरा', 'उत्तम']),
    v(`शब्द_hi_${u}_4`, `Hindi Concept ${u}.4`, 'noun', `Shabd_${u}_4`, `इस अध्याय${u} में प्रवीणता उच्च स्तर तक पहुँचाती है।`, `Proficiency in chapter ${u} reaches high levels.`, `इस अध्याय___ में प्रवीणता उच्च स्तर तक पहुँचाती है।`, `शब्द_hi_${u}_4`, ['स्तर', 'प्रकार', 'शैली']),
    v(`शब्द_hi_${u}_5`, `Hindi Concept ${u}.5`, 'expression', `Shabd_${u}_5`, `निसंदेह यह पहलू${u} निर्णायक सिद्ध होता है।`, `Undoubtedly this aspect ${u} proves decisive.`, `निसंदेह यह पहलू___ निर्णायक सिद्ध होता है।`, `शब्द_hi_${u}_5`, ['शायद', 'कभी नहीं', 'सदा']),
    v(`शब्द_hi_${u}_6`, `Hindi Concept ${u}.6`, 'noun', `Shabd_${u}_6`, `हिंदी व्याकरण के नियमों${u} का शुद्ध प्रयोग करें।`, `Accurately use Hindi grammar rules ${u}.`, `हिंदी व्याकरण के नियमों___ का शुद्ध प्रयोग करें।`, `शब्द_hi_${u}_6`, ['सिद्धांत', 'वाक्य', 'रचना']),
    v(`शब्द_hi_${u}_7`, `Hindi Concept ${u}.7`, 'verb', `Shabd_${u}_7`, `इस अभ्यास${u} का प्रतिदिन पुनरावलोकन करें।`, `Review this exercise ${u} daily.`, `इस अभ्यास___ का प्रतिदिन पुनरावलोकन करें।`, `शब्द_hi_${u}_7`, ['अभ्यास', 'बोलना', 'लिखना']),
    v(`शब्द_hi_${u}_8`, `Hindi Concept ${u}.8`, 'adjective', `Shabd_${u}_8`, `हिंदी सीखने में यह एक महान उपलब्धि${u} है।`, `This is a great achievement ${u} in Hindi learning.`, `हिंदी सीखने में यह एक महान उपलब्धि___ है।`, `शब्द_hi_${u}_8`, ['बड़ी', 'सत्य', 'सार्थक']),
    v(`शब्द_hi_${u}_9`, `Hindi Concept ${u}.9`, 'phrase', `Shabd_${u}_9`, `अतः हमने अपना लक्ष्य${u} सफलतापूर्वक प्राप्त किया।`, `Consequently we successfully achieved goal ${u}.`, `अतः हमने अपना लक्ष्य___ सफलतापूर्वक प्राप्त किया।`, `शब्द_hi_${u}_9`, ['योजना', 'पथ', 'मार्ग']),
    v(`शब्द_hi_${u}_10`, `Hindi Concept ${u}.10`, 'noun', `Shabd_${u}_10`, `प्रवाहपूर्ण भाषा क्षमता${u} नए आयाम खोलती है।`, `Fluent language ability ${u} opens new dimensions.`, `प्रवाहपूर्ण भाषा क्षमता___ नए आयाम खोलती है।`, `शब्द_hi_${u}_10`, ['अभिव्यक्ति', 'वाणी', 'शक्ति']),
  ];
}
