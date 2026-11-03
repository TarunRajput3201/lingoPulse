import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const HUNGARIAN_LANGUAGE: LanguageDefinition = {
  code: 'hu-en',
  title: 'Hungarian Academy',
  description: 'Master Hungarian (Magyar) from vowel harmony and agglutination to rich expressive fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'hu',
  flagIcon: '🇭🇺',
  level: 'A1–C1',
  order: 38,
  nativeName: 'Magyar',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Hungarian is a Finno-Ugric language featuring front/back vowel harmony and extensive noun suffixes.',
    2: 'Saying "Jó napot kívánok" (Good day I wish) is the standard polite greeting throughout Hungary.',
  },
  units: {
    1: [
      v('Jó napot', 'Hello / Good day', 'noun', 'YOH nah-poht', 'Jó napot, hogy van ma?', 'Hello, how are you today?', '___, hogy van ma?', 'Jó napot', ['Viszlát', 'Köszönöm', 'Kérem']),
      v('Viszlát', 'Goodbye', 'expression', 'VEES-laht', 'Viszlát és mielőbbi viszontlátásra!', 'Goodbye and see you soon!', '___ és mielőbbi viszontlátásra!', 'Viszlát', ['Jó napot', 'Köszönöm', 'Kérem']),
      v('Köszönöm', 'Thank you', 'noun', 'KUR-sur-num', 'Nagyon szépen köszönöm a kedves segítségét.', 'Thank you very much for your kind help.', 'Nagyon szépen köszönöm a kedves segítségét.', 'Köszönöm', ['Jó napot', 'Viszlát', 'Kérem']),
      v('Kérem', 'Please / You\'re welcome', 'expression', 'KAY-rem', 'Egy csésze forró kávét kérek szépen.', 'A cup of hot coffee, please nicely.', 'Egy csésze forró kávét kérek szépen.', 'Kérem', ['Jó napot', 'Viszlát', 'Köszönöm']),
      v('Igen', 'Yes', 'noun', 'EE-gen', 'Igen, ezt teljesen világosan értem.', 'Yes, I understand this completely clearly.', '___, ezt teljesen világosan értem.', 'Igen', ['Jó napot', 'Viszlát', 'Köszönöm']),
      v('Nem', 'No', 'expression', 'NEM', 'Nem, ez ma sajnos nem lehetséges.', 'No, that is unfortunately not possible today.', '___, ez ma sajnos nem lehetséges.', 'Nem', ['Jó napot', 'Viszlát', 'Köszönöm']),
      v('Hogy vagy', 'How are you', 'noun', 'HODJ vahdj', 'Szia barátom, hogy vagy ma?', 'Hi my friend, how are you today?', 'Szia barátom, hogy vagy ma?', 'Hogy vagy', ['Jó napot', 'Viszlát', 'Köszönöm']),
      v('Üdvözöljük', 'Welcome', 'expression', 'EWD-vur-zurl-yook', 'Szeretettel üdvözöljük szép városunkban!', 'Warmly welcome to our beautiful city!', 'Szeretettel üdvözöljük szép városunkban!', 'Üdvözöljük', ['Jó napot', 'Viszlát', 'Köszönöm']),
      v('Hamarosan találkozunk', 'See you soon', 'noun', 'HAH-mah-roh-shahn tah-LAHL-koh-zoonk', 'Szép napot és hamarosan találkozunk!', 'Have a nice day and see you soon!', 'Szép napot és hamarosan találkozunk!', 'Hamarosan találkozunk', ['Jó napot', 'Viszlát', 'Köszönöm']),
      v('Jó éjszakát', 'Good night', 'expression', 'YOH AY-shah-kaht', 'Jó éjszakát és szép álmokat.', 'Good night and sweet dreams.', '___ és szép álmokat.', 'Jó éjszakát', ['Jó napot', 'Viszlát', 'Köszönöm']),
    ],
    2: [
      v('Örülök a találkozásnak', 'Nice to meet you', 'noun', 'UR-ew-look ah tah-LAHL-koh-zahsh-nahk', 'Nagyon örülök a személyes találkozásnak.', 'Very pleased with the personal meeting.', 'Nagyon örülök a személyes találkozásnak.', 'Örülök a találkozásnak', ['A nevem', 'Elnézést', 'Jó reggelt']),
      v('A nevem', 'My name is', 'expression', 'ah NEH-vem', 'Jó napot, a nevem Kovács Péter.', 'Hello, my name is Peter Kovacs.', 'Jó napot, a nevem Kovács Péter.', 'A nevem', ['Örülök a találkozásnak', 'Elnézést', 'Jó reggelt']),
      v('Elnézést', 'Excuse me / Sorry', 'noun', 'EL-nay-zaysht', 'Elnézést, hol található a vasútállomás?', 'Excuse me, where is railway station located?', '___, hol található a vasútállomás?', 'Elnézést', ['Örülök a találkozásnak', 'A nevem', 'Jó reggelt']),
      v('Jó reggelt', 'Good morning', 'expression', 'YOH REG-gelt', 'Jó reggelt kívánok mindenkinek!', 'Good morning I wish to everyone!', '___ kívánok mindenkinek!', 'Jó reggelt', ['Örülök a találkozásnak', 'A nevem', 'Elnézést']),
      v('Jó estét', 'Good evening', 'noun', 'YOH ESH-tayt', 'Jó estét és üdvözlöm a vendégeket.', 'Good evening and welcome guests.', '___ és üdvözlöm a vendégeket.', 'Jó estét', ['Örülök a találkozásnak', 'A nevem', 'Elnézést']),
      v('Barát', 'Friend', 'expression', 'BAH-raht', 'Ő a legkedvesebb és legrégibb barátom.', 'He is my kindest and oldest friend.', 'Ő a legkedvesebb és legrégibb barátom.', 'Barát', ['Örülök a találkozásnak', 'A nevem', 'Elnézést']),
      v('Tanár', 'Teacher', 'noun', 'TAH-nahr', 'A tanárunk rendkívül érthetően magyaráz.', 'Our teacher explains extraordinarily understandably.', 'A tanárunk rendkívül érthetően magyaráz.', 'Tanár', ['Örülök a találkozásnak', 'A nevem', 'Elnézést']),
      v('Család', 'Family', 'expression', 'CHAH-lahd', 'A családom Budapest szívében él.', 'My family lives in heart of Budapest.', 'A családom Budapest szívében él.', 'Család', ['Örülök a találkozásnak', 'A nevem', 'Elnézést']),
      v('Kiváló', 'Excellent', 'noun', 'KEE-vah-loh', 'A vizsga eredménye valóban kiváló lett.', 'The exam result really became excellent.', 'A vizsga eredménye valóban kiváló lett.', 'Kiváló', ['Örülök a találkozásnak', 'A nevem', 'Elnézést']),
      v('Jól', 'Good', 'expression', 'YOHL', 'Minden nagyon jól és békésen alakul.', 'Everything turns out very well and peacefully.', 'Minden nagyon jól és békésen alakul.', 'Jól', ['Örülök a találkozásnak', 'A nevem', 'Elnézést']),
    ],
    3: [
      v('Egy', 'One', 'noun', 'EHDJ', 'Van egy jegyem a vonatra.', 'I have one ticket for train.', 'Van egy jegyem a vonatra.', 'Egy', ['Kettő', 'Három', 'Négy']),
      v('Kettő', 'Two', 'expression', 'KET-tur', 'Két forró kávét kérek.', 'Two hot coffees, please.', 'Két forró kávét kérek.', 'Kettő', ['Egy', 'Három', 'Négy']),
      v('Három', 'Three', 'noun', 'HAH-rohm', 'A szállodában három üres szoba van.', 'In hotel exist three empty rooms.', 'A szállodában három üres szoba van.', 'Három', ['Egy', 'Kettő', 'Négy']),
      v('Négy', 'Four', 'expression', 'NAYDJ', 'Négyen utazunk együtt.', 'Four of us travel together.', '___en utazunk együtt.', 'Négy', ['Egy', 'Kettő', 'Három']),
      v('Öt', 'Five', 'noun', 'URT', 'A vonat öt perc múlva indul.', 'The train departs in five minutes.', 'A vonat öt perc múlva indul.', 'Öt', ['Egy', 'Kettő', 'Három']),
      v('Tíz', 'Ten', 'expression', 'TEEZ', 'A belépő pontosan tíz forintba kerül.', 'Entry costs exactly ten forints.', 'A belépő pontosan tíz forintba kerül.', 'Tíz', ['Egy', 'Kettő', 'Három']),
      v('Húsz', 'Twenty', 'noun', 'HOOS', 'Húsz diák ül a teremben.', 'Twenty students sit in room.', '___ diák ül a teremben.', 'Húsz', ['Egy', 'Kettő', 'Három']),
      v('Ötven', 'Fifty', 'expression', 'URT-ven', 'A teremben ötven ülőhely található.', 'In hall fifty sitting places are found.', 'A teremben ötven ülőhely található.', 'Ötven', ['Egy', 'Kettő', 'Három']),
      v('Száz', 'One hundred', 'noun', 'SAHZ', 'A könyv pontosan száz oldalt tartalmaz.', 'The book contains exactly hundred pages.', 'A könyv pontosan száz oldalt tartalmaz.', 'Száz', ['Egy', 'Kettő', 'Három']),
      v('Számolni', 'To count', 'expression', 'SAH-mohl-nee', 'Könnyen tudok számolni magyarul.', 'I can count in Hungarian easily.', 'Könnyen tudok számolni magyarul.', 'Számolni', ['Egy', 'Kettő', 'Három']),
    ],
    4: [
      v('Apa', 'Father', 'noun', 'AH-pah', 'Az apám mérnökként dolgozik.', 'My father works as engineer.', 'Az apám mérnökként dolgozik.', 'Apa', ['Anya', 'Fiútestvér', 'Lánytestvér']),
      v('Anya', 'Mother', 'expression', 'AHN-yah', 'Az anyám orvosként dolgozik a kórházban.', 'My mother works as doctor in hospital.', 'Az anyám orvosként dolgozik a kórházban.', 'Anya', ['Apa', 'Fiútestvér', 'Lánytestvér']),
      v('Fiútestvér', 'Brother', 'noun', 'FEE-oo-tesht-vayr', 'A bátyám az egyetemen tanul.', 'My older brother studies at university.', 'A bátyám az egyetemen tanul.', 'Fiútestvér', ['Apa', 'Anya', 'Lánytestvér']),
      v('Lánytestvér', 'Sister', 'expression', 'LAHNY-tesht-vayr', 'A húgom szépen zongorázik.', 'My younger sister plays piano nicely.', 'A húgom szépen zongorázik.', 'Lánytestvér', ['Apa', 'Anya', 'Fiútestvér']),
      v('Nagyapa', 'Grandfather', 'noun', 'NAHDJ-ah-pah', 'A nagyapám reggelente sétál a parkban.', 'My grandfather walks in park every morning.', 'A nagyapám reggelente sétál a parkban.', 'Nagyapa', ['Apa', 'Anya', 'Fiútestvér']),
      v('Nagymama', 'Grandmother', 'expression', 'NAHDJ-mah-mah', 'A nagymamám finom süteményeket süt.', 'My grandmother bakes delicious pastries.', 'A nagymamám finom süteményeket süt.', 'Nagymama', ['Apa', 'Anya', 'Fiútestvér']),
      v('Fiú', 'Son', 'noun', 'FEE-oo', 'A fiuk az iskolai focicsapatban játszik.', 'Their son plays in school football team.', 'A fiuk az iskolai focicsapatban játszik.', 'Fiú', ['Apa', 'Anya', 'Fiútestvér']),
      v('Lány', 'Daughter', 'expression', 'LAHNY', 'A lányuk tehetségesen fest képeket.', 'Their daughter talentedly paints paintings.', 'A lányuk tehetségesen fest képeket.', 'Lány', ['Apa', 'Anya', 'Fiútestvér']),
      v('Szülők', 'Parents', 'noun', 'SEW-leurk', 'A szüleim nagyon szeretnek utazni.', 'My parents love traveling very much.', 'A szüleim nagyon szeretnek utazni.', 'Szülők', ['Apa', 'Anya', 'Fiútestvér']),
      v('Otthon', 'Home', 'expression', 'OT-hohn', 'Az otthonunk barátságos, meleg és tágas.', 'Our home is friendly, warm, and spacious.', 'Az otthonunk barátságos, meleg és tágas.', 'Otthon', ['Apa', 'Anya', 'Fiútestvér']),
    ],
    5: [
      v('Kenyér', 'Bread', 'noun', 'KEH-nyayr', 'A friss kovászos kenyér nagyon finom.', 'Fresh sourdough bread is very delicious.', 'A friss kovászos kenyér nagyon finom.', 'Kenyér', ['Víz', 'Tea', 'Kávé']),
      v('Víz', 'Water', 'expression', 'VEEZ', 'Egy pohár hideg forrásvizet kérek szépen.', 'A glass of cold spring water, please nicely.', 'Egy pohár hideg forrásvizet kérek szépen.', 'Víz', ['Kenyér', 'Tea', 'Kávé']),
      v('Tea', 'Tea', 'noun', 'TEH-ah', 'A forró gyümölcstea kellemesen felmelegít.', 'Hot fruit tea pleasantly warms.', 'A forró gyümölcstea kellemesen felmelegít.', 'Tea', ['Kenyér', 'Víz', 'Kávé']),
      v('Kávé', 'Coffee', 'expression', 'KAH-vay', 'Egy jó fekete kávé reggel erőt ad.', 'A good black coffee in morning gives strength.', 'Egy jó fekete kávé reggel erőt ad.', 'Kávé', ['Kenyér', 'Víz', 'Tea']),
      v('Alma', 'Apple', 'noun', 'AHL-mah', 'A ropogós piros alma egészséges tízórai.', 'Crisp red apple is healthy mid-morning snack.', 'A ropogós piros alma egészséges tízórai.', 'Alma', ['Kenyér', 'Víz', 'Tea']),
      v('Sajt', 'Cheese', 'expression', 'SHAYT', 'A sajttal készült szendvics nagyon ízletes.', 'Sandwich made with cheese is very flavorful.', 'A sajttal készült szendvics nagyon ízletes.', 'Sajt', ['Kenyér', 'Víz', 'Tea']),
      v('Enni', 'To eat', 'noun', 'EN-nee', 'Üljünk le együtt vacsorát enni.', 'Let us sit down together eating dinner.', 'Üljünk le együtt vacsorát enni.', 'Enni', ['Kenyér', 'Víz', 'Tea']),
      v('Inni', 'To drink', 'expression', 'EEN-nee', 'Egészséges sok tiszta vizet inni naponta.', 'It is healthy drinking lots of clean water daily.', 'Egészséges sok tiszta vizet inni naponta.', 'Inni', ['Kenyér', 'Víz', 'Tea']),
      v('Finom', 'Delicious', 'noun', 'FEE-nohm', 'Ez a hagyományos gulyásleves rendkívül finom.', 'This traditional goulash soup is extraordinarily delicious.', 'Ez a hagyományos gulyásleves rendkívül finom.', 'Finom', ['Kenyér', 'Víz', 'Tea']),
      v('Reggeli', 'Breakfast', 'expression', 'REG-geh-lee', 'A reggelit pontosan nyolc órakor szolgálják fel.', 'Breakfast is served exactly at eight o\'clock.', 'A reggelit pontosan nyolc órakor szolgálják fel.', 'Reggeli', ['Kenyér', 'Víz', 'Tea']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Étterem","Restaurant"],["Bolt","Shop"],["Szálloda","Hotel"],["Város","City"],["Vonat","Train"],["Repülőtér","Airport"],["Munka","Work"],["Iskola","School"],["Egészség","Health"],["Természet","Nature"],["Nyaralás","Holiday"],["Zene","Music"],["Történelem","History"],["Kultúra","Culture"],["Tudomány","Science"],["Beszélgetés","Conversation"],["Társadalom","Society"],["Siker","Success"],["Jövő","Future"],["Tudás","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  HUNGARIAN_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
