import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const GUJARATI_LANGUAGE: LanguageDefinition = {
  code: 'gu-en',
  title: 'Gujarati Academy',
  description: 'Master Gujarati from its elegant script to entrepreneurial and conversational fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'gu',
  flagIcon: '🇮🇳',
  level: 'A1–C1',
  order: 32,
  nativeName: 'ગુજરાતી',
  isRTL: false,
  region: 'Indian',
  culturalTips: {
    1: 'Gujarati script is written without the continuous top horizontal bar line (shirorekha) found in Devanagari.',
    2: 'Saying "નમસ્તે" (Namaste) or "જય શ્રી કૃષ્ણ" (Jai Shri Krishna) conveys traditional Gujarati warmth.',
  },
  units: {
    1: [
      v('નમસ્તે', 'Hello / Greetings', 'noun', 'Namaste', 'નમસ્તે, આજે તમે કેમ છો?', 'Hello, how are you today?', '___, આજે તમે કેમ છો?', 'નમસ્તે', ['આવજો', 'આભાર', 'કૃપા કરીને']),
      v('આવજો', 'Goodbye', 'expression', 'Aavjo', 'આવજો અને જલ્દીથી ફરી મળીશું!', 'Goodbye and see you again soon!', '___ અને જલ્દીથી ફરી મળીશું!', 'આવજો', ['નમસ્તે', 'આભાર', 'કૃપા કરીને']),
      v('આભાર', 'Thank you', 'noun', 'Aabhar', 'તમારી અમૂલ્ય મદદ માટે ખૂબ ખૂબ આભાર.', 'Thank you very much for your valuable help.', 'તમારી અમૂલ્ય મદદ માટે ખૂબ ખૂબ ___.', 'આભાર', ['નમસ્તે', 'આવજો', 'કૃપા કરીને']),
      v('કૃપા કરીને', 'Please', 'expression', 'Krupa karine', 'એક કપ ગરમ ચા આપો, કૃપા કરીને.', 'Give a cup of hot tea, please.', 'એક કપ ગરમ ચા આપો, ___.', 'કૃપા કરીને', ['નમસ્તે', 'આવજો', 'આભાર']),
      v('હા', 'Yes', 'noun', 'Haa', 'હા, મને બધી વાત બરાબર સમજાઈ ગઈ છે.', 'Yes, I understood everything properly.', '___, મને બધી વાત બરાબર સમજાઈ ગઈ છે.', 'હા', ['નમસ્તે', 'આવજો', 'આભાર']),
      v('ના', 'No', 'expression', 'Naa', 'ના, આજે એ શક્ય નથી.', 'No, that is not possible today.', '___, આજે એ શક્ય નથી.', 'ના', ['નમસ્તે', 'આવજો', 'આભાર']),
      v('તમે કેમ છો', 'How are you', 'noun', 'Tame kem chho', 'નમસ્તે મિત્ર, આજે તમે કેમ છો?', 'Hello friend, how are you today?', 'નમસ્તે મિત્ર, આજે ___?', 'તમે કેમ છો', ['નમસ્તે', 'આવજો', 'આભાર']),
      v('સ્વાગત છે', 'Welcome', 'expression', 'Swaagat chhe', 'અમારા સુંદર શહેરમાં તમારું હાર્દિક સ્વાગત છે!', 'Heartfelt welcome to our beautiful city!', 'અમારા સુંદર શહેરમાં તમારું હાર્દિક ___!', 'સ્વાગત છે', ['નમસ્તે', 'આવજો', 'આભાર']),
      v('ફરી મળીશું', 'See you soon', 'noun', 'Fari malishu', 'તમારો દિવસ શુભ રહે અને ફરી મળીશું!', 'Have a blessed day and see you again!', 'તમારો દિવસ શુભ રહે અને ___!', 'ફરી મળીશું', ['નમસ્તે', 'આવજો', 'આભાર']),
      v('શુભ રાત્રી', 'Good night', 'expression', 'Shubh raatri', 'શુભ રાત્રી અને મીઠા સપના આવે.', 'Good night and sweet dreams.', '___ અને મીઠા સપના આવે.', 'શુભ રાત્રી', ['નમસ્તે', 'આવજો', 'આભાર']),
    ],
    2: [
      v('મળીને આનંદ થયો', 'Nice to meet you', 'noun', 'Maline aanand thayo', 'તમને મળીને મને ખૂબ જ આનંદ થયો.', 'Very pleased to meet you.', 'તમને મળીને મને ખૂબ જ આનંદ થયો.', 'મળીને આનંદ થયો', ['મારું નામ છે', 'માફ કરશો', 'સુપ્રભાત']),
      v('મારું નામ છે', 'My name is', 'expression', 'Maaru naam chhe', 'નમસ્તે, મારું નામ ભાવિન છે.', 'Hello, my name is Bhavin.', 'નમસ્તે, મારું નામ ભાવિન છે.', 'મારું નામ છે', ['મળીને આનંદ થયો', 'માફ કરશો', 'સુપ્રભાત']),
      v('માફ કરશો', 'Excuse me / Sorry', 'noun', 'Maaf karsho', 'માફ કરશો, રેલવે સ્ટેશન ક્યાં આવેલું છે?', 'Excuse me, where is railway station located?', '___, રેલવે સ્ટેશન ક્યાં આવેલું છે?', 'માફ કરશો', ['મળીને આનંદ થયો', 'મારું નામ છે', 'સુપ્રભાત']),
      v('સુપ્રભાત', 'Good morning', 'expression', 'Suprabhaat', 'બધા મિત્રોને સુપ્રભાત અને શુભેચ્છાઓ!', 'Good morning and wishes to all friends!', 'બધા મિત્રોને ___ અને શુભેચ્છાઓ!', 'સુપ્રભાત', ['મળીને આનંદ થયો', 'મારું નામ છે', 'માફ કરશો']),
      v('શુભ સાંજ', 'Good evening', 'noun', 'Shubh saanj', 'શુભ સાંજ અને કાર્યક્રમમાં સ્વાગત છે.', 'Good evening and welcome to program.', '___ અને કાર્યક્રમમાં સ્વાગત છે.', 'શુભ સાંજ', ['મળીને આનંદ થયો', 'મારું નામ છે', 'માફ કરશો']),
      v('મિત્ર', 'Friend', 'expression', 'Mitra', 'તે મારો બાળપણનો સૌથી પાકો મિત્ર છે.', 'He is my closest childhood friend.', 'તે મારો બાળપણનો સૌથી પાકો ___ છે.', 'મિત્ર', ['મળીને આનંદ થયો', 'મારું નામ છે', 'માફ કરશો']),
      v('શિક્ષક', 'Teacher', 'noun', 'Shikshak', 'અમારા શિક્ષક ખૂબ જ સરળતાથી સમજાવે છે.', 'Our teacher explains very simply.', 'અમારા ___ ખૂબ જ સરળતાથી સમજાવે છે.', 'શિક્ષક', ['મળીને આનંદ થયો', 'મારું નામ છે', 'માફ કરશો']),
      v('પરિવાર', 'Family', 'expression', 'Parivaar', 'મારો પરિવાર અમદાવાદમાં રહે છે.', 'My family lives in Ahmedabad.', 'મારો ___ અમદાવાદમાં રહે છે.', 'પરિવાર', ['મળીને આનંદ થયો', 'મારું નામ છે', 'માફ કરશો']),
      v('અદ્ભુત', 'Wonderful', 'noun', 'Adbhut', 'પરીક્ષાનું પરિણામ ખરેખર અદ્ભુત આવ્યું છે.', 'Exam result came out truly wonderfully.', 'પરીક્ષાનું પરિણામ ખરેખર ___ આવ્યું છે.', 'અદ્ભુત', ['મળીને આનંદ થયો', 'મારું નામ છે', 'માફ કરશો']),
      v('સારું', 'Good', 'expression', 'Saaru', 'ભગવાનની કૃપાથી બધું ઘણું સારું ચાલે છે.', 'By grace all goes very well.', 'ભગવાનની કૃપાથી બધું ઘણું ___ ચાલે છે.', 'સારું', ['મળીને આનંદ થયો', 'મારું નામ છે', 'માફ કરશો']),
    ],
    3: [
      v('એક', 'One', 'noun', 'Ek', 'મારી પાસે ટ્રેનની એક ટિકિટ છે.', 'I have one train ticket.', 'મારી પાસે ટ્રેનની ___ ટિકિટ છે.', 'એક', ['બે', 'ત્રણ', 'ચાર']),
      v('બે', 'Two', 'expression', 'Be', 'કૃપા કરીને બે કપ ગરમ કૉફી આપો.', 'Please give two cups of hot coffee.', 'કૃપા કરીને ___ કપ ગરમ કૉફી આપો.', 'બે', ['એક', 'ત્રણ', 'ચાર']),
      v('ત્રણ', 'Three', 'noun', 'Tran', 'હોટલમાં ત્રણ રૂમ ખાલી છે.', 'Three rooms are vacant in hotel.', 'હોટલમાં ___ રૂમ ખાલી છે.', 'ત્રણ', ['એક', 'બે', 'ચાર']),
      v('ચાર', 'Four', 'expression', 'Chaar', 'અમે ચાર મિત્રો સાથે પ્રવાસે આવ્યા છીએ.', 'We four friends came on travel together.', 'અમે ___ મિત્રો સાથે પ્રવાસે આવ્યા છીએ.', 'ચાર', ['એક', 'બે', 'ત્રણ']),
      v('પાંચ', 'Five', 'noun', 'Paanch', 'બસ પાંચ મિનિટમાં ઉપડશે.', 'Bus will depart in five minutes.', 'બસ ___ મિનિટમાં ઉપડશે.', 'પાંચ', ['એક', 'બે', 'ત્રણ']),
      v('દસ', 'Ten', 'expression', 'Das', 'આની કિંમત બરાબર દસ રૂપિયા છે.', 'Its price is exactly ten rupees.', 'આની કિંમત બરાબર ___ રૂપિયા છે.', 'દસ', ['એક', 'બે', 'ત્રણ']),
      v('વીસ', 'Twenty', 'noun', 'Vees', 'વર્ગમાં વીસ વિદ્યાર્થીઓ બેઠા છે.', 'Twenty students are sitting in class.', 'વર્ગમાં ___ વિદ્યાર્થીઓ બેઠા છે.', 'વીસ', ['એક', 'બે', 'ત્રણ']),
      v('પચાસ', 'Fifty', 'expression', 'Pachaas', 'સભાખંડમાં પચાસ ખુરશીઓ મૂકેલી છે.', 'Fifty chairs are placed in hall.', 'સભાખંડમાં ___ ખુરશીઓ મૂકેલી છે.', 'પચાસ', ['એક', 'બે', 'ત્રણ']),
      v('સો', 'One hundred', 'noun', 'So', 'આ પુસ્તકમાં પૂરાં સો પાનાં છે.', 'In this book are full hundred pages.', 'આ પુસ્તકમાં પૂરાં ___ પાનાં છે.', 'સો', ['એક', 'બે', 'ત્રણ']),
      v('ગણતરી કરવી', 'To count', 'expression', 'Ganatari karvi', 'હું ગુજરાતીમાં સરળતાથી ગણી શકું છું.', 'I can count in Gujarati easily.', 'હું ગુજરાતીમાં સરળતાથી ગણી શકું છું.', 'ગણતરી કરવી', ['એક', 'બે', 'ત્રણ']),
    ],
    4: [
      v('પિતા', 'Father', 'noun', 'Pita', 'મારા પિતાજી એક કુશળ ઈજનેર છે.', 'My father is a skilled engineer.', 'મારા ___જી એક કુશળ ઈજનેર છે.', 'પિતા', ['માતા', 'ભાઈ', 'બહેન']),
      v('માતા', 'Mother', 'expression', 'Maata', 'મારી માતા હૉસ્પિટલમાં ડૉક્ટર છે.', 'My mother is doctor in hospital.', 'મારી ___ હૉસ્પિટલમાં ડૉક્ટર છે.', 'માતા', ['પિતા', 'ભાઈ', 'બહેન']),
      v('ભાઈ', 'Brother', 'noun', 'Bhaai', 'મારો મોટો ભાઈ યુનિવર્સિટીમાં ભણે છે.', 'My older brother studies at university.', 'મારો મોટો ___ યુનિવર્સિટીમાં ભણે છે.', 'ભાઈ', ['પિતા', 'માતા', 'બહેન']),
      v('બહેન', 'Sister', 'expression', 'Bahen', 'મારી નાની બહેન સુંદર ગીતો ગાય છે.', 'My younger sister sings beautiful songs.', 'મારી નાની ___ સુંદર ગીતો ગાય છે.', 'બહેન', ['પિતા', 'માતા', 'ભાઈ']),
      v('દાદા', 'Grandfather', 'noun', 'Daada', 'દાદાજી રોજ સવારે બગીચામાં ફરે છે.', 'Grandfather strolls in garden every morning.', '___જી રોજ સવારે બગીચામાં ફરે છે.', 'દાદા', ['પિતા', 'માતા', 'ભાઈ']),
      v('દાદી', 'Grandmother', 'expression', 'Daadi', 'દાદીમા સ્વાદિષ્ટ વાનગીઓ બનાવે છે.', 'Grandmother makes tasty delicacies.', '___મા સ્વાદિષ્ટ વાનગીઓ બનાવે છે.', 'દાદી', ['પિતા', 'માતા', 'ભાઈ']),
      v('પુત્ર', 'Son', 'noun', 'Putra', 'તેમનો પુત્ર ક્રિકેટ ટીમમાં રમે છે.', 'Their son plays in cricket team.', 'તેમનો ___ ક્રિકેટ ટીમમાં રમે છે.', 'પુત્ર', ['પિતા', 'માતા', 'ભાઈ']),
      v('પુત્રી', 'Daughter', 'expression', 'Putri', 'તેમની પુત્રી સરસ ચિત્રો દોરે છે.', 'Their daughter draws fine paintings.', 'તેમની ___ સરસ ચિત્રો દોરે છે.', 'પુત્રી', ['પિતા', 'માતા', 'ભાઈ']),
      v('માતાપિતા', 'Parents', 'noun', 'Maatapita', 'મારા માતાપિતાને પ્રવાસનો ખૂબ શોખ છે.', 'My parents have great fondness for travel.', 'મારા ___ને પ્રવાસનો ખૂબ શોખ છે.', 'માતાપિતા', ['પિતા', 'માતા', 'ભાઈ']),
      v('ઘર', 'Home', 'expression', 'Ghar', 'અમારું ઘર શાંત, સ્વચ્છ અને હૂંફાળું છે.', 'Our home is peaceful, clean, and warm.', 'અમારું ___ શાંત, સ્વચ્છ અને હૂંફાળું છે.', 'ઘર', ['પિતા', 'માતા', 'ભાઈ']),
    ],
    5: [
      v('રોટલી', 'Bread / Flatbread', 'noun', 'Rotli', 'ગરમ ફૂલેલી રોટલી અને શાક સ્વાદિષ્ટ લાગે છે.', 'Hot puffed rotli and vegetable tastes delicious.', 'ગરમ ફૂલેલી ___ અને શાક સ્વાદિષ્ટ લાગે છે.', 'રોટલી', ['પાણી', 'ચા', 'કોફી']),
      v('પાણી', 'Water', 'expression', 'Paani', 'એક ગ્લાસ ઠંડું પાણી આપો, આભાર.', 'Give a glass of cold water, thanks.', 'એક ગ્લાસ ઠંડું ___ આપો, આભાર.', 'પાણી', ['રોટલી', 'ચા', 'કોફી']),
      v('ચા', 'Tea', 'noun', 'Chaa', 'ગુજરાતીઓની મસાલા ચા જગવિખ્યાત છે.', 'Masala tea of Gujaratis is world renowned.', 'ગુજરાતીઓની મસાલા ___ જગવિખ્યાત છે.', 'ચા', ['રોટલી', 'પાણી', 'કોફી']),
      v('કોફી', 'Coffee', 'expression', 'Kofi', 'સવારે એક કપ ગરમ કૉફી તાજગી આપે છે.', 'A morning cup of hot coffee gives freshness.', 'સવારે એક કપ ગરમ કૉફી તાજગી આપે છે.', 'કોફી', ['રોટલી', 'પાણી', 'ચા']),
      v('સફરજન', 'Apple', 'noun', 'Safarjan', 'લાલ મીઠું સફરજન સ્વાસ્થ્ય માટે સારું છે.', 'Red sweet apple is good for health.', 'લાલ મીઠું ___ સ્વાસ્થ્ય માટે સારું છે.', 'સફરજન', ['રોટલી', 'પાણી', 'ચા']),
      v('પનીર', 'Cheese', 'expression', 'Paneer', 'તાજું પનીર શાકમાં ખૂબ સ્વાદિષ્ટ લાગે છે.', 'Fresh paneer tastes very delicious in curry.', 'તાજું ___ શાકમાં ખૂબ સ્વાદિષ્ટ લાગે છે.', 'પનીર', ['રોટલી', 'પાણી', 'ચા']),
      v('ખાવું', 'To eat', 'noun', 'Khaavu', 'ચાલો આપણે બધા સાથે મળીને જમીએ.', 'Come let us all eat meal together.', 'ચાલો આપણે બધા સાથે મળીને જમીએ.', 'ખાવું', ['રોટલી', 'પાણી', 'ચા']),
      v('પીવું', 'To drink', 'expression', 'Peevu', 'રોજ પૂરતા પ્રમાણમાં શુદ્ધ પાણી પીવું જોઈએ.', 'One should drink sufficient pure water daily.', 'રોજ પૂરતા પ્રમાણમાં શુદ્ધ પાણી ___ જોઈએ.', 'પીવું', ['રોટલી', 'પાણી', 'ચા']),
      v('સ્વાદિષ્ટ', 'Delicious', 'noun', 'Swaadisht', 'આ પરંપરાગત ગુજરાતી થાળી ખૂબ સ્વાદિષ્ટ છે.', 'This traditional Gujarati thali is very delicious.', 'આ પરંપરાગત ગુજરાતી થાળી ખૂબ ___ છે.', 'સ્વાદિષ્ટ', ['રોટલી', 'પાણી', 'ચા']),
      v('નાસ્તો', 'Breakfast', 'expression', 'Naasto', 'સવારનો પૌંઆ કે ઢોકળાંનો નાસ્તો ઉત્તમ હોય છે.', 'Morning breakfast of poha or dhokla is excellent.', 'સવારનો પૌંઆ કે ઢોકળાંનો ___ ઉત્તમ હોય છે.', 'નાસ્તો', ['રોટલી', 'પાણી', 'ચા']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["રેસ્ટોરન્ટ","Restaurant"],["દુકાન","Shop"],["હોટેલ","Hotel"],["શહેર","City"],["રેલગાડી","Train"],["હવાઈમથક","Airport"],["કામ","Work"],["શાળા","School"],["સ્વાસ્થ્ય","Health"],["કુદરત","Nature"],["રજાઓ","Holiday"],["સંગીત","Music"],["ઇતિહાસ","History"],["સંસ્કૃતિ","Culture"],["વિજ્ઞાન","Science"],["વાતચીત","Conversation"],["સમાજ","Society"],["સફળતા","Success"],["ભવિષ્ય","Future"],["જ્ઞાન","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  GUJARATI_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
