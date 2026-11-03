import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const MARATHI_LANGUAGE: LanguageDefinition = {
  code: 'mr-en',
  title: 'Marathi Academy',
  description: 'Master Marathi from Devanagari script and historic culture to everyday conversation from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'mr',
  flagIcon: '🇮🇳',
  level: 'A1–C1',
  order: 31,
  nativeName: 'मराठी',
  isRTL: false,
  region: 'Indian',
  culturalTips: {
    1: 'Marathi features three genders (masculine, feminine, neuter) and distinct retroflex sounds (ळ - ḷa).',
    2: 'Saying "नमस्कार" (Namaskar) with folded hands is the traditional greeting across Maharashtra.',
  },
  units: {
    1: [
      v('नमस्कार', 'Hello / Greetings', 'noun', 'Namaskar', 'नमस्कार, आज तुम्ही कसे आहात?', 'Hello, how are you today?', '___, आज तुम्ही कसे आहात?', 'नमस्कार', ['पुन्हा भेटू', 'धन्यवाद', 'कृपया']),
      v('पुन्हा भेटू', 'Goodbye', 'expression', 'Punha bhetu', 'पुन्हा भेटू आणि लवकरच भेटूया!', 'Goodbye and see you soon!', '___ आणि लवकरच भेटूया!', 'पुन्हा भेटू', ['नमस्कार', 'धन्यवाद', 'कृपया']),
      v('धन्यवाद', 'Thank you', 'noun', 'Dhanyavaad', 'तुमच्या बहुमूल্য मदतीबद्दल खूप खूप धन्यवाद.', 'Thank you very much for your valuable help.', 'तुमच्या बहुमूल্য मदतीबद्दल खूप खूप ___.', 'धन्यवाद', ['नमस्कार', 'पुन्हा भेटू', 'कृपया']),
      v('कृपया', 'Please', 'expression', 'Krupaya', 'कृपया एक कप गरम चहा द्या.', 'Please give a cup of hot tea.', '___ एक कप गरम चहा द्या.', 'कृपया', ['नमस्कार', 'पुन्हा भेटू', 'धन्यवाद']),
      v('होय', 'Yes', 'noun', 'Hoy', 'होय, मला सर्व काही नीट समजले आहे.', 'Yes, I understood everything properly.', '___, मला सर्व काही नीट समजले आहे.', 'होय', ['नमस्कार', 'पुन्हा भेटू', 'धन्यवाद']),
      v('नाही', 'No', 'expression', 'Naahi', 'नाही, हे आज शक्य नाही.', 'No, this is not possible today.', '___, हे आज शक्य नाही.', 'नाही', ['नमस्कार', 'पुन्हा भेटू', 'धन्यवाद']),
      v('तुम्ही कसे आहात', 'How are you', 'noun', 'Tumhi kase aahaat', 'नमस्कार मित्रा, तुम्ही कसे आहात आज?', 'Hello friend, how are you today?', 'नमस्कार मित्रा, ___ आज?', 'तुम्ही कसे आहात', ['नमस्कार', 'पुन्हा भेटू', 'धन्यवाद']),
      v('स्वागत आहे', 'Welcome', 'expression', 'Swaagat aahe', 'आमच्या सुंदर शहरात आपले मनापासून स्वागत आहे!', 'Heartfelt welcome to our beautiful city!', 'आमच्या सुंदर शहरात आपले मनापासून ___!', 'स्वागत आहे', ['नमस्कार', 'पुन्हा भेटू', 'धन्यवाद']),
      v('लवकरच भेटू', 'See you soon', 'noun', 'Lavkarach bhetu', 'तुमचा दिवस चांगला जावो, लवकरच भेटू!', 'Have a good day, see you soon!', 'तुमचा दिवस चांगला जावो, ___!', 'लवकरच भेटू', ['नमस्कार', 'पुन्हा भेटू', 'धन्यवाद']),
      v('शुभ रात्री', 'Good night', 'expression', 'Shubh raatri', 'शुभ रात्री आणि गोड स्वप्ने पडावीत.', 'Good night and sweet dreams.', '___ आणि गोड स्वप्ने पडावीत.', 'शुभ रात्री', ['नमस्कार', 'पुन्हा भेटू', 'धन्यवाद']),
    ],
    2: [
      v('भेटून आनंद झाला', 'Nice to meet you', 'noun', 'Bhetun aanand zhaala', 'तुम्हाला भेटून मला अतिशय आनंद झाला.', 'Very pleased to meet you.', 'तुम्हाला भेटून मला अतिशय आनंद झाला.', 'भेटून आनंद झाला', ['माझे नाव आहे', 'माफ करा', 'शुभ प्रभात']),
      v('माझे नाव आहे', 'My name is', 'expression', 'Maazhe naav aahe', 'नमस्कार, माझे नाव सचिन आहे.', 'Hello, my name is Sachin.', 'नमस्कार, माझे नाव सचिन आहे.', 'माझे नाव आहे', ['भेटून आनंद झाला', 'माफ करा', 'शुभ प्रभात']),
      v('माफ करा', 'Excuse me / Sorry', 'noun', 'Maaf kara', 'माफ करा, रेल्वे स्टेशन कुठे आहे?', 'Excuse me, where is railway station?', '___, रेल्वे स्टेशन कुठे आहे?', 'माफ करा', ['भेटून आनंद झाला', 'माझे नाव आहे', 'शुभ प्रभात']),
      v('शुभ प्रभात', 'Good morning', 'expression', 'Shubh prabhaat', 'सर्वांना शुभ प्रभात आणि खूप खूप शुभेच्छा!', 'Good morning and wishes to all!', 'सर्वांना ___ आणि खूप खूप शुभेच्छा!', 'शुभ प्रभात', ['भेटून आनंद झाला', 'माझे नाव आहे', 'माफ करा']),
      v('शुभ संध्याकाळ', 'Good evening', 'noun', 'Shubh sandhyaakaal', 'शुभ संध्याकाळ आणि कार्यक्रमात स्वागत.', 'Good evening and welcome to program.', '___ आणि कार्यक्रमात स्वागत.', 'शुभ संध्याकाळ', ['भेटून आनंद झाला', 'माझे नाव आहे', 'माफ करा']),
      v('मित्र', 'Friend', 'expression', 'Mitra', 'तो माझा बालपणीचा सर्वात जवळचा मित्र आहे.', 'He is my closest childhood friend.', 'तो माझा बालपणीचा सर्वात जवळचा ___ आहे.', 'मित्र', ['भेटून आनंद झाला', 'माझे नाव आहे', 'माफ करा']),
      v('शिक्षक', 'Teacher', 'noun', 'Shikshak', 'आमचे शिक्षक खूप छान आणि सोपे शिकवतात.', 'Our teacher teaches very nicely and simply.', 'आमचे ___ खूप छान आणि सोपे शिकवतात.', 'शिक्षक', ['भेटून आनंद झाला', 'माझे नाव आहे', 'माफ करा']),
      v('कुटुंब', 'Family', 'expression', 'Kutumb', 'माझे कुटुंब पुण्यामध्ये राहते.', 'My family lives in Pune.', 'माझे ___ पुण्यामध्ये राहते.', 'कुटुंब', ['भेटून आनंद झाला', 'माझे नाव आहे', 'माफ करा']),
      v('उत्तम', 'Excellent', 'noun', 'Uttam', 'परीक्षेचा निकाल अगदी उत्तम लागला आहे.', 'Exam result came out really excellent.', 'परीक्षेचा निकाल अगदी ___ लागला आहे.', 'उत्तम', ['भेटून आनंद झाला', 'माझे नाव आहे', 'माफ करा']),
      v('छान', 'Good', 'expression', 'Chhaan', 'सर्व काही खूप छान आणि व्यवस्थित चालले आहे.', 'Everything is going very nicely and orderly.', 'सर्व काही खूप ___ आणि व्यवस्थित चालले आहे.', 'छान', ['भेटून आनंद झाला', 'माझे नाव आहे', 'माफ करा']),
    ],
    3: [
      v('एक', 'One', 'noun', 'Ek', 'माझ्याकडे लोकल ट्रेनचे एक तिकीट आहे.', 'I have one local train ticket.', 'माझ्याकडे लोकल ट्रेनचे ___ तिकीट आहे.', 'एक', ['दोन', 'तीन', 'चार']),
      v('दोन', 'Two', 'expression', 'Don', 'कृपया दोन कप गरम कॉफी द्या.', 'Please give two cups of hot coffee.', 'कृपया ___ कप गरम कॉफी द्या.', 'दोन', ['एक', 'तीन', 'चार']),
      v('तीन', 'Three', 'noun', 'Teen', 'हॉटेलमध्ये तीन खोल्या रिकाम्या आहेत.', 'Three rooms are vacant in hotel.', 'हॉटेलमध्ये ___ खोल्या रिकाम्या आहेत.', 'तीन', ['एक', 'दोन', 'चार']),
      v('चार', 'Four', 'expression', 'Chaar', 'आम्ही चार मित्र एकत्र आलो आहोत.', 'We four friends came together.', 'आम्ही ___ मित्र एकत्र आलो आहोत.', 'चार', ['एक', 'दोन', 'तीन']),
      v('पाच', 'Five', 'noun', 'Paach', 'गाडी पाच मिनिटांत सुटेल.', 'Train will leave in five minutes.', 'गाडी ___ मिनिटांत सुटेल.', 'पाच', ['एक', 'दोन', 'तीन']),
      v('दहा', 'Ten', 'expression', 'Daha', 'याची किंमत बरोबर दहा रुपये आहे.', 'Its price is exactly ten rupees.', 'याची किंमत बरोबर ___ रुपये आहे.', 'दहा', ['एक', 'दोन', 'तीन']),
      v('वीस', 'Twenty', 'noun', 'Vees', 'वर्गात वीस विद्यार्थी उपस्थित आहेत.', 'Twenty students are present in class.', 'वर्गात ___ विद्यार्थी उपस्थित आहेत.', 'वीस', ['एक', 'दोन', 'तीन']),
      v('पन्नास', 'Fifty', 'expression', 'Pannaas', 'सभागृहात पन्नास खुर्च्या मांडल्या आहेत.', 'Fifty chairs are arranged in auditorium.', 'सभागृहात ___ खुर्च्या मांडल्या आहेत.', 'पन्नास', ['एक', 'दोन', 'तीन']),
      v('शंभर', 'One hundred', 'noun', 'Shambhar', 'या पुस्तकात पूर्ण शंभर पाने आहेत.', 'In this book are full hundred pages.', 'या पुस्तकात पूर्ण ___ पाने आहेत.', 'शंभर', ['एक', 'दोन', 'तीन']),
      v('मोजणे', 'To count', 'expression', 'Mozne', 'मी मराठीत सहजपणे मोजू शकतो.', 'I can count in Marathi easily.', 'मी मराठीत सहजपणे मोजू शकतो.', 'मोजणे', ['एक', 'दोन', 'तीन']),
    ],
    4: [
      v('वडील', 'Father', 'noun', 'Vadeel', 'माझे वडील एक नामांकित अभियंता आहेत.', 'My father is a reputed engineer.', 'माझे ___ एक नामांकित अभियंता आहेत.', 'वडील', ['आई', 'भाऊ', 'बहीण']),
      v('आई', 'Mother', 'expression', 'Aai', 'माझी आई रुग्णालयात डॉक्टर म्हणून काम करते.', 'My mother works as doctor in hospital.', 'माझी ___ रुग्णालयात डॉक्टर म्हणून काम करते.', 'आई', ['वडील', 'भाऊ', 'बहीण']),
      v('भाऊ', 'Brother', 'noun', 'Bhaau', 'माझा मोठा भाऊ विद्यापीठात शिकतो.', 'My older brother studies at university.', 'माझा मोठा ___ विद्यापीठात शिकतो.', 'भाऊ', ['वडील', 'आई', 'बहीण']),
      v('बहीण', 'Sister', 'expression', 'Baheen', 'माझी लहान बहीण सुंदर गाणी गाते.', 'My younger sister sings beautiful songs.', 'माझी लहान ___ सुंदर गाणी गाते.', 'बहीण', ['वडील', 'आई', 'भाऊ']),
      v('आजोबा', 'Grandfather', 'noun', 'Aajoba', 'आजोबा रोज सकाळी बागेत फिरायला जातात.', 'Grandfather goes to garden for walk daily morning.', '___ रोज सकाळी बागेत फिरायला जातात.', 'आजोबा', ['वडील', 'आई', 'भाऊ']),
      v('आजी', 'Grandmother', 'expression', 'Aaji', 'आजी रुचकर मोदक आणि पुरणपोळी बनवते.', 'Grandmother makes tasty modak and puranpoli.', '___ रुचकर मोदक आणि पुरणपोळी बनवते.', 'आजी', ['वडील', 'आई', 'भाऊ']),
      v('मुलगा', 'Son', 'noun', 'Mulga', 'त्यांचा मुलगा शाळेच्या क्रिकेट संघात खेळतो.', 'Their son plays in school cricket team.', 'त्यांचा ___ शाळेच्या क्रिकेट संघात खेळतो.', 'मुलगा', ['वडील', 'आई', 'भाऊ']),
      v('मुलगी', 'Daughter', 'expression', 'Mulgi', 'त्यांची मुलगी उत्तम चित्रे काढते.', 'Their daughter draws fine paintings.', 'त्यांची ___ उत्तम चित्रे काढते.', 'मुलगी', ['वडील', 'आई', 'भाऊ']),
      v('पालक', 'Parents', 'noun', 'Paalak', 'माझे पालक पर्यटनाची खूप आवड बाळगतात.', 'My parents hold great fondness for tourism.', 'माझे ___ पर्यटनाची खूप आवड बाळगतात.', 'पालक', ['वडील', 'आई', 'भाऊ']),
      v('घर', 'Home', 'expression', 'Ghar', 'आमचे घर शांत, स्वच्छ आणि सुंदर आहे.', 'Our home is peaceful, clean, and beautiful.', 'आमचे ___ शांत, स्वच्छ आणि सुंदर आहे.', 'घर', ['वडील', 'आई', 'भाऊ']),
    ],
    5: [
      v('पोळी', 'Bread / Chapati', 'noun', 'Poli', 'गरम ताजी पोळी आणि भाजी चविष्ट लागते.', 'Hot fresh chapati and vegetable tastes delicious.', 'गरम ताजी ___ आणि भाजी चविष्ट लागते.', 'पोळी', ['पाणी', 'चहा', 'कॉफी']),
      v('पाणी', 'Water', 'expression', 'Paani', 'एक ग्लास थंड पाणी द्या, धन्यवाद.', 'Give a glass of cold water, thanks.', 'एक ग्लास थंड ___ द्या, धन्यवाद.', 'पाणी', ['पोळी', 'चहा', 'कॉफी']),
      v('चहा', 'Tea', 'noun', 'Chaha', 'महाराष्ट्रात आलं घातलेला चहा खूप लोकप्रिय आहे.', 'Ginger tea is very popular in Maharashtra.', 'महाराष्ट्रात आलं घातलेला ___ खूप लोकप्रिय आहे.', 'चहा', ['पोळी', 'पाणी', 'कॉफी']),
      v('कॉफी', 'Coffee', 'expression', 'Kofi', 'सकाळची एक कप गरम कॉफी उत्साह देते.', 'A morning cup of hot coffee gives enthusiasm.', 'सकाळची एक कप गरम ___ उत्साह देते.', 'कॉफी', ['पोळी', 'पाणी', 'चहा']),
      v('सफरचंद', 'Apple', 'noun', 'Safarchand', 'लाल गोड सफरचंद आरोग्यासाठी उत्तम असते.', 'Red sweet apple is great for health.', 'लाल गोड ___ आरोग्यासाठी उत्तम असते.', 'सफरचंद', ['पोळी', 'पाणी', 'चहा']),
      v('चीज', 'Cheese', 'expression', 'Cheez', 'सँडविचवर किसलेले चीज खूप छान लागते.', 'Grated cheese on sandwich tastes very good.', 'सँडविचवर किसलेले ___ खूप छान लागते.', 'चीज', ['पोळी', 'पाणी', 'चहा']),
      v('खाणे', 'To eat', 'noun', 'Khaane', 'आपण सर्व मिळून एकत्र जेवण करूया.', 'Let us all have meal together.', 'आपण सर्व मिळून एकत्र जेवण करूया.', 'खाणे', ['पोळी', 'पाणी', 'चहा']),
      v('पिणे', 'To drink', 'expression', 'Pine', 'निरोगी राहण्यासाठी भरपूर पाणी पिणे आवश्यक आहे.', 'Drinking plenty of water is essential to stay healthy.', 'निरोगी राहण्यासाठी भरपूर पाणी ___ आवश्यक आहे.', 'पिणे', ['पोळी', 'पाणी', 'चहा']),
      v('चवदार', 'Delicious', 'noun', 'Chavdaar', 'हा पारंपरिक महाराष्ट्रीयन बेत फार चवदार आहे.', 'This traditional Maharashtrian menu is very tasty.', 'हा पारंपरिक महाराष्ट्रीयन बेत फार ___ आहे.', 'चवदार', ['पोळी', 'पाणी', 'चहा']),
      v('नाश्ता', 'Breakfast', 'expression', 'Naashta', 'सकाळचा पोहे किंवा उपम्याचा नाश्ता छान असतो.', 'Morning breakfast of poha or upma is nice.', 'सकाळचा पोहे किंवा उपम्याचा ___ छान असतो.', 'नाश्ता', ['पोळी', 'पाणी', 'चहा']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["उपहारगृह","Restaurant"],["दुकान","Shop"],["हॉटेल","Hotel"],["शहर","City"],["रेल्वे","Train"],["विमानतळ","Airport"],["काम","Work"],["शाळा","School"],["आरोग्य","Health"],["निसर्ग","Nature"],["सुट्टी","Holiday"],["संगीत","Music"],["इतिहास","History"],["संस्कृती","Culture"],["विज्ञान","Science"],["संवाद","Conversation"],["समाज","Society"],["यश","Success"],["भविष्य","Future"],["ज्ञान","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  MARATHI_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
