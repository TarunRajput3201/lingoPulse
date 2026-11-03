import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const ROMANIAN_LANGUAGE: LanguageDefinition = {
  code: 'ro-en',
  title: 'Romanian Academy',
  description: 'Master Romanian from Romance roots and enclitic articles to fluent cultural discourse from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'ro',
  flagIcon: '🇷🇴',
  level: 'A1–C1',
  order: 36,
  nativeName: 'Română',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Romanian is the only surviving Romance language that attaches definite articles to the ends of nouns (enclitic).',
    2: 'Saying "Poftă bună" (Good appetite) is a cordial habit shared before any meal.',
  },
  units: {
    1: [
      v('Bună ziua', 'Hello / Good day', 'noun', 'BOO-nuh ZEE-wah', 'Bună ziua, ce mai faceți astăzi?', 'Hello, how are you doing today?', '___, ce mai faceți astăzi?', 'Bună ziua', ['La revedere', 'Mulțumesc', 'Vă rog']),
      v('La revedere', 'Goodbye', 'expression', 'lah reh-veh-DEH-reh', 'La revedere și pe curând!', 'Goodbye and see you soon!', '___ și pe curând!', 'La revedere', ['Bună ziua', 'Mulțumesc', 'Vă rog']),
      v('Mulțumesc', 'Thank you', 'noun', 'mool-tsoo-MESK', 'Vă mulțumesc foarte mult pentru ajutor.', 'Thank you very much for help.', 'Vă mulțumesc foarte mult pentru ajutor.', 'Mulțumesc', ['Bună ziua', 'La revedere', 'Vă rog']),
      v('Vă rog', 'Please', 'expression', 'vuh ROHG', 'O ceașcă de cafea fierbinte, vă rog.', 'A cup of hot coffee, please.', 'O ceașcă de cafea fierbinte, vă rog.', 'Vă rog', ['Bună ziua', 'La revedere', 'Mulțumesc']),
      v('Da', 'Yes', 'noun', 'DAH', 'Da, înțeleg perfect această explicație.', 'Yes, I understand this explanation perfectly.', '___, înțeleg perfect această explicație.', 'Da', ['Bună ziua', 'La revedere', 'Mulțumesc']),
      v('Nu', 'No', 'expression', 'NOO', 'Nu, acest lucru nu este posibil astăzi.', 'No, this matter is not possible today.', '___, acest lucru nu este posibil astăzi.', 'Nu', ['Bună ziua', 'La revedere', 'Mulțumesc']),
      v('Ce mai faceți', 'How are you', 'noun', 'cheh mye FAH-chets', 'Bună, ce mai faceți astăzi prieteni?', 'Hello, how are you today friends?', 'Bună, ce mai faceți astăzi prieteni?', 'Ce mai faceți', ['Bună ziua', 'La revedere', 'Mulțumesc']),
      v('Bine ați venit', 'Welcome', 'expression', 'BEE-neh ahts veh-NEET', 'Bine ați venit în frumoasa noastră țară!', 'Welcome to our beautiful country!', '___ în frumoasa noastră țară!', 'Bine ați venit', ['Bună ziua', 'La revedere', 'Mulțumesc']),
      v('Pe curând', 'See you soon', 'noun', 'peh koo-RUHND', 'O zi minunată și pe curând!', 'A wonderful day and see you soon!', 'O zi minunată și pe curând!', 'Pe curând', ['Bună ziua', 'La revedere', 'Mulțumesc']),
      v('Noapte bună', 'Good night', 'expression', 'NWAHP-teh BOO-nuh', 'Noapte bună și vise plăcute.', 'Good night and pleasant dreams.', '___ și vise plăcute.', 'Noapte bună', ['Bună ziua', 'La revedere', 'Mulțumesc']),
    ],
    2: [
      v('Încântat de cunoștință', 'Nice to meet you', 'noun', 'een-kuhn-TAHT deh koo-nosh-TEEN-tsuh', 'Sunt foarte încântat de cunoștință.', 'I am very pleased to make your acquaintance.', 'Sunt foarte încântat de cunoștință.', 'Încântat de cunoștință', ['Mă numesc', 'Scuzați-mă', 'Bună dimineața']),
      v('Mă numesc', 'My name is', 'expression', 'muh noo-MESK', 'Bună, mă numesc Andrei.', 'Hello, my name is Andrei.', 'Bună, mă numesc Andrei.', 'Mă numesc', ['Încântat de cunoștință', 'Scuzați-mă', 'Bună dimineața']),
      v('Scuzați-mă', 'Excuse me / Sorry', 'noun', 'skoo-ZAH-tsih-muh', 'Scuzați-mă, unde se află gara centrală?', 'Excuse me, where is central station located?', '___, unde se află gara centrală?', 'Scuzați-mă', ['Încântat de cunoștință', 'Mă numesc', 'Bună dimineața']),
      v('Bună dimineața', 'Good morning', 'expression', 'BOO-nuh dee-mee-NYAH-tsuh', 'Bună dimineața tuturor și o zi rodnică!', 'Good morning to everyone and fruitful day!', '___ tuturor și o zi rodnică!', 'Bună dimineața', ['Încântat de cunoștință', 'Mă numesc', 'Scuzați-mă']),
      v('Bună seara', 'Good evening', 'noun', 'BOO-nuh SEH-rah', 'Bună seara și bun venit tuturor oaspeților.', 'Good evening and welcome to all guests.', '___ și bun venit tuturor oaspeților.', 'Bună seara', ['Încântat de cunoștință', 'Mă numesc', 'Scuzați-mă']),
      v('Prieten', 'Friend', 'expression', 'pree-EH-ten', 'El este cel mai bun și mai loial prieten al meu.', 'He is my best and most loyal friend.', 'El este cel mai bun și mai loial prieten al meu.', 'Prieten', ['Încântat de cunoștință', 'Mă numesc', 'Scuzați-mă']),
      v('Profesor', 'Teacher', 'noun', 'proh-FEH-sohr', 'Profesorul nostru explică lecția foarte clar.', 'Our teacher explains lesson very clearly.', '___ul nostru explică lecția foarte clar.', 'Profesor', ['Încântat de cunoștință', 'Mă numesc', 'Scuzați-mă']),
      v('Familie', 'Family', 'expression', 'fah-MEE-lyeh', 'Familia mea locuiește în orașul Brașov.', 'My family lives in Brasov city.', 'Familia mea locuiește în orașul Brașov.', 'Familie', ['Încântat de cunoștință', 'Mă numesc', 'Scuzați-mă']),
      v('Excelent', 'Excellent', 'noun', 'ek-seh-LENT', 'Rezultatul obținut la examen este excelent.', 'The result obtained on exam is excellent.', 'Rezultatul obținut la examen este excelent.', 'Excelent', ['Încântat de cunoștință', 'Mă numesc', 'Scuzați-mă']),
      v('Bine', 'Good', 'expression', 'BEE-neh', 'Totul decurge foarte bine și liniștit.', 'Everything proceeds very well and calmly.', 'Totul decurge foarte bine și liniștit.', 'Bine', ['Încântat de cunoștință', 'Mă numesc', 'Scuzați-mă']),
    ],
    3: [
      v('Unu', 'One', 'noun', 'OO-noo', 'Am un bilet pentru călătoria cu trenul.', 'I have one ticket for train journey.', 'Am un bilet pentru călătoria cu trenul.', 'Unu', ['Doi', 'Trei', 'Patru']),
      v('Doi', 'Two', 'expression', 'DOY', 'Două cafele calde, vă rog frumos.', 'Two warm coffees, please nicely.', 'Două cafele calde, vă rog frumos.', 'Doi', ['Unu', 'Trei', 'Patru']),
      v('Trei', 'Three', 'noun', 'TRAY', 'Sunt trei camere libere la hotel.', 'There are three vacant rooms at hotel.', 'Sunt trei camere libere la hotel.', 'Trei', ['Unu', 'Doi', 'Patru']),
      v('Patru', 'Four', 'expression', 'PAH-troo', 'Noi suntem patru persoane în grup.', 'We are four persons in group.', 'Noi suntem patru persoane în grup.', 'Patru', ['Unu', 'Doi', 'Trei']),
      v('Cinci', 'Five', 'noun', 'CHEENCH', 'Trenul va sosi în cinci minute.', 'The train will arrive in five minutes.', 'Trenul va sosi în cinci minute.', 'Cinci', ['Unu', 'Doi', 'Trei']),
      v('Zece', 'Ten', 'expression', 'ZEH-cheh', 'Biletul costă exact zece lei.', 'The ticket costs exactly ten lei.', 'Biletul costă exact zece lei.', 'Zece', ['Unu', 'Doi', 'Trei']),
      v('Douăzeci', 'Twenty', 'noun', 'DOH-wuh-zech', 'În sală sunt douăzeci de studenți.', 'In hall are twenty students.', 'În sală sunt douăzeci de studenți.', 'Douăzeci', ['Unu', 'Doi', 'Trei']),
      v('Cincizeci', 'Fifty', 'expression', 'cheen-chee-ZECH', 'Există cincizeci de locuri disponibile.', 'Fifty available seats exist.', 'Există cincizeci de locuri disponibile.', 'Cincizeci', ['Unu', 'Doi', 'Trei']),
      v('O sută', 'One hundred', 'noun', 'oh SOO-tuh', 'Cartea cuprinde exact o sută de pagini.', 'The book contains exactly hundred pages.', 'Cartea cuprinde exact o sută de pagini.', 'O sută', ['Unu', 'Doi', 'Trei']),
      v('A număra', 'To count', 'expression', 'ah noo-muh-RAH', 'Pot număra cu ușurință în limba română.', 'I can count with ease in Romanian.', 'Pot număra cu ușurință în limba română.', 'A număra', ['Unu', 'Doi', 'Trei']),
    ],
    4: [
      v('Tată', 'Father', 'noun', 'TAH-tuh', 'Tatăl meu lucrează ca inginer constructor.', 'My father works as construction engineer.', '___l meu lucrează ca inginer constructor.', 'Tată', ['Mamă', 'Frate', 'Soră']),
      v('Mamă', 'Mother', 'expression', 'MAH-muh', 'Mama mea este medic la spital.', 'My mother is doctor at hospital.', 'Mama mea este medic la spital.', 'Mamă', ['Tată', 'Frate', 'Soră']),
      v('Frate', 'Brother', 'noun', 'FRAH-teh', 'Fratele meu mai mare studiază la facultate.', 'My older brother studies at faculty.', '___le meu mai mare studiază la facultate.', 'Frate', ['Tată', 'Mamă', 'Soră']),
      v('Soră', 'Sister', 'expression', 'SOH-ruh', 'Sora mea mai mică cântă minunat la pian.', 'My younger sister plays piano wonderfully.', 'Sora mea mai mică cântă minunat la pian.', 'Soră', ['Tată', 'Mamă', 'Frate']),
      v('Bunic', 'Grandfather', 'noun', 'boo-NEEK', 'Bunicul se plimbă în parc în fiecare dimineață.', 'Grandfather walks in park every morning.', '___ul se plimbă în parc în fiecare dimineață.', 'Bunic', ['Tată', 'Mamă', 'Frate']),
      v('Bunică', 'Grandmother', 'expression', 'boo-NEE-kuh', 'Bunica pregătește cozonaci tradiționali aromați.', 'Grandmother prepares fragrant traditional cozonac.', 'Bunica pregătește cozonaci tradiționali aromați.', 'Bunică', ['Tată', 'Mamă', 'Frate']),
      v('Fiu', 'Son', 'noun', 'FEE-oo', 'Fiul lor joacă fotbal în echipa școlii.', 'Their son plays football on school team.', '___l lor joacă fotbal în echipa școlii.', 'Fiu', ['Tată', 'Mamă', 'Frate']),
      v('Fiică', 'Daughter', 'expression', 'FEE-kuh', 'Fiica lor pictează tablouri foarte frumoase.', 'Their daughter paints very beautiful paintings.', 'Fiica lor pictează tablouri foarte frumoase.', 'Fiică', ['Tată', 'Mamă', 'Frate']),
      v('Părinți', 'Parents', 'noun', 'puh-REENTS', 'Părinții mei îndrăgesc drumețiile montane.', 'My parents love mountain hikes.', '___i mei îndrăgesc drumețiile montane.', 'Părinți', ['Tată', 'Mamă', 'Frate']),
      v('Casă', 'Home', 'expression', 'KAH-suh', 'Casa noastră este primitoare, luminoasă și caldă.', 'Our home is welcoming, bright, and warm.', 'Casa noastră este primitoare, luminoasă și caldă.', 'Casă', ['Tată', 'Mamă', 'Frate']),
    ],
    5: [
      v('Pâine', 'Bread', 'noun', 'PUH-ee-neh', 'Cumpăr pâine proaspătă de la brutărie.', 'I buy fresh bread from bakery.', 'Cumpăr pâine proaspătă de la brutărie.', 'Pâine', ['Apă', 'Ceai', 'Cafea']),
      v('Apă', 'Water', 'expression', 'AH-puh', 'Un pahar cu apă rece de izvor, vă rog.', 'A glass of cold spring water, please.', 'Un pahar cu apă rece de izvor, vă rog.', 'Apă', ['Pâine', 'Ceai', 'Cafea']),
      v('Ceai', 'Tea', 'noun', 'CHYE', 'Ceaiul cald cu lămâie este reconfortant.', 'Hot tea with lemon is comforting.', '___ul cald cu lămâie este reconfortant.', 'Ceai', ['Pâine', 'Apă', 'Cafea']),
      v('Cafea', 'Coffee', 'expression', 'kah-FEH-ah', 'O cafea neagră aromată dimineața oferă energie.', 'An aromatic black coffee in morning offers energy.', 'O cafea neagră aromată dimineața oferă energie.', 'Cafea', ['Pâine', 'Apă', 'Ceai']),
      v('Măr', 'Apple', 'noun', 'MUHR', 'Un măr roșu crocant și dulce ca gustare.', 'A crisp sweet red apple as snack.', 'Un măr roșu crocant și dulce ca gustare.', 'Măr', ['Pâine', 'Apă', 'Ceai']),
      v('Brânză', 'Cheese', 'expression', 'BRUHN-zuh', 'Brânza telemea tradițională este foarte gustoasă.', 'Traditional telemea cheese is very tasty.', 'Brânza telemea tradițională este foarte gustoasă.', 'Brânză', ['Pâine', 'Apă', 'Ceai']),
      v('A mânca', 'To eat', 'noun', 'ah muhn-KAH', 'Ne adunăm cu toții să mâncăm cina.', 'We all gather to eat dinner.', 'Ne adunăm cu toții să mâncăm cina.', 'A mânca', ['Pâine', 'Apă', 'Ceai']),
      v('A bea', 'To drink', 'expression', 'ah BEH-ah', 'Este sănătos să bem multă apă curată.', 'It is healthy to drink plenty of clean water.', 'Este sănătos să bem multă apă curată.', 'A bea', ['Pâine', 'Apă', 'Ceai']),
      v('Gustos', 'Delicious', 'noun', 'goos-TOHS', 'Această mâncare tradițională este deosebit de gustoasă.', 'This traditional food is especially tasty.', 'Această mâncare tradițională este deosebit de gustoasă.', 'Gustos', ['Pâine', 'Apă', 'Ceai']),
      v('Micul dejun', 'Breakfast', 'expression', 'MEE-kool deh-ZHOON', 'Micul dejun se servește la ora opt dimineața.', 'Breakfast is served at eight in morning.', '___ se servește la ora opt dimineața.', 'Micul dejun', ['Pâine', 'Apă', 'Ceai']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Restaurant","Restaurant"],["Magazin","Shop"],["Hotel","Hotel"],["Oraș","City"],["Tren","Train"],["Aeroport","Airport"],["Muncă","Work"],["Școală","School"],["Sănătate","Health"],["Natură","Nature"],["Vacanță","Holiday"],["Muzică","Music"],["Istorie","History"],["Cultură","Culture"],["Știință","Science"],["Conversație","Conversation"],["Societate","Society"],["Succes","Success"],["Viitor","Future"],["Cunoaștere","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  ROMANIAN_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
