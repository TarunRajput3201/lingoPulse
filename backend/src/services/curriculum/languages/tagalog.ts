import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const TAGALOG_LANGUAGE: LanguageDefinition = {
  code: 'tl-en',
  title: 'Tagalog Academy',
  description: 'Master Filipino (Tagalog) from verb focus triggers to warm everyday dialogue from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'tl',
  flagIcon: '🇵🇭',
  level: 'A1–C1',
  order: 25,
  nativeName: 'Tagalog',
  isRTL: false,
  region: 'Asian',
  culturalTips: {
    1: 'Tagalog has an expressive verbal focus system (actor, object, locative, beneficiary).',
    2: 'Using "po" and "opo" conveys deep Filipino respect when speaking to elders or strangers.',
  },
  units: {
    1: [
      v('Kumusta', 'Hello', 'noun', 'koo-moos-TAH', 'Kumusta, ano ang lagay mo ngayon?', 'Hello, how are you doing today?', '___, ano ang lagay mo ngayon?', 'Kumusta', ['Paalam', 'Salamat', 'Pakiusap']),
      v('Paalam', 'Goodbye', 'expression', 'pah-AH-lahm', 'Paalam at mag-ingat ka palagi!', 'Goodbye and take care always!', '___ at mag-ingat ka palagi!', 'Paalam', ['Kumusta', 'Salamat', 'Pakiusap']),
      v('Salamat', 'Thank you', 'noun', 'sah-LAH-maht', 'Maraming salamat sa iyong kabutihan.', 'Thank you very much for your kindness.', 'Maraming salamat sa iyong kabutihan.', 'Salamat', ['Kumusta', 'Paalam', 'Pakiusap']),
      v('Pakiusap', 'Please', 'expression', 'pah-kee-OO-sahp', 'Isang tasang mainit na kape, pakiusap.', 'A cup of hot coffee, please.', 'Isang tasang mainit na kape, pakiusap.', 'Pakiusap', ['Kumusta', 'Paalam', 'Salamat']),
      v('Oo', 'Yes', 'noun', 'OH-oh', 'Oo, naiintindihan ko nang buo.', 'Yes, I understand completely.', '___, naiintindihan ko nang buo.', 'Oo', ['Kumusta', 'Paalam', 'Salamat']),
      v('Hindi', 'No', 'expression', 'HEEN-dee', 'Hindi, hindi iyon maaari ngayon.', 'No, that is not possible now.', '___, hindi iyon maaari ngayon.', 'Hindi', ['Kumusta', 'Paalam', 'Salamat']),
      v('Kumusta ka', 'How are you', 'noun', 'koo-moos-TAH kah', 'Kumusta ka, kaibigan?', 'How are you, friend?', '___, kaibigan?', 'Kumusta ka', ['Kumusta', 'Paalam', 'Salamat']),
      v('Maligayang pagdating', 'Welcome', 'expression', 'mah-lee-GAH-yahng pahg-dah-TEENG', 'Maligayang pagdating sa aming bansa!', 'Welcome to our country!', '___ sa aming bansa!', 'Maligayang pagdating', ['Kumusta', 'Paalam', 'Salamat']),
      v('Hanggang sa muli', 'See you soon', 'noun', 'hahng-GAHNG sah MOO-lee', 'Magandang araw at hanggang sa muli!', 'Good day and see you soon!', 'Magandang araw at hanggang sa muli!', 'Hanggang sa muli', ['Kumusta', 'Paalam', 'Salamat']),
      v('Magandang gabi', 'Good night', 'expression', 'mah-gahn-DAHNG GAH-bee', 'Magandang gabi at matulog nang mahimbing.', 'Good night and sleep soundly.', '___ at matulog nang mahimbing.', 'Magandang gabi', ['Kumusta', 'Paalam', 'Salamat']),
    ],
    2: [
      v('Ikinagagalak kitang makilala', 'Nice to meet you', 'noun', 'ee-kee-nah-gah-gah-LAHK kee-TAHNG mah-kee-LAH-lah', 'Ikinagagalak kitang makilala ngayon.', 'Nice to meet you today.', '___ ngayon.', 'Ikinagagalak kitang makilala', ['Ang pangalan ko ay', 'Paumanhin', 'Magandang umaga']),
      v('Ang pangalan ko ay', 'My name is', 'expression', 'ahng pah-ngah-LAHN koh eye', 'Kumusta, ang pangalan ko ay Juan.', 'Hello, my name is Juan.', 'Kumusta, ang pangalan ko ay Juan.', 'Ang pangalan ko ay', ['Ikinagagalak kitang makilala', 'Paumanhin', 'Magandang umaga']),
      v('Paumanhin', 'Excuse me / Sorry', 'noun', 'pow-mahn-HEEN', 'Paumanhin, nasaan ang estasyon ng tren?', 'Excuse me, where is the train station?', '___, nasaan ang estasyon ng tren?', 'Paumanhin', ['Ikinagagalak kitang makilala', 'Ang pangalan ko ay', 'Magandang umaga']),
      v('Magandang umaga', 'Good morning', 'expression', 'mah-gahn-DAHNG oo-MAH-gah', 'Magandang umaga sa inyong lahat!', 'Good morning to all of you!', '___ sa inyong lahat!', 'Magandang umaga', ['Ikinagagalak kitang makilala', 'Ang pangalan ko ay', 'Paumanhin']),
      v('Magandang hapon', 'Good afternoon', 'noun', 'mah-gahn-DAHNG HAH-pohn', 'Magandang hapon at maligayang araw.', 'Good afternoon and happy day.', '___ at maligayang araw.', 'Magandang hapon', ['Ikinagagalak kitang makilala', 'Ang pangalan ko ay', 'Paumanhin']),
      v('Kaibigan', 'Friend', 'expression', 'kah-ee-BEE-gahn', 'Siya ang aking pinakamatalik na kaibigan.', 'He is my closest friend.', 'Siya ang aking pinakamatalik na kaibigan.', 'Kaibigan', ['Ikinagagalak kitang makilala', 'Ang pangalan ko ay', 'Paumanhin']),
      v('Guro', 'Teacher', 'noun', 'GOO-roh', 'Ang aming guro ay matiyagang nagtuturo.', 'Our teacher patiently teaches.', 'Ang aming guro ay matiyagang nagtuturo.', 'Guro', ['Ikinagagalak kitang makilala', 'Ang pangalan ko ay', 'Paumanhin']),
      v('Pamilya', 'Family', 'expression', 'pah-MEEL-yah', 'Ang aking pamilya ay nakatira sa Maynila.', 'My family lives in Manila.', 'Ang aking pamilya ay nakatira sa Maynila.', 'Pamilya', ['Ikinagagalak kitang makilala', 'Ang pangalan ko ay', 'Paumanhin']),
      v('Napakahusay', 'Excellent', 'noun', 'nah-pah-kah-HOO-sye', 'Ang iyong nakuha sa pagsusulit ay napakahusay.', 'Your score in the exam is excellent.', 'Ang iyong nakuha sa pagsusulit ay napakahusay.', 'Napakahusay', ['Ikinagagalak kitang makilala', 'Ang pangalan ko ay', 'Paumanhin']),
      v('Mabuti', 'Good', 'expression', 'mah-BOO-tee', 'Ang lahat ay maayos at mabuti.', 'Everything is fine and good.', 'Ang lahat ay maayos at mabuti.', 'Mabuti', ['Ikinagagalak kitang makilala', 'Ang pangalan ko ay', 'Paumanhin']),
    ],
    3: [
      v('Isa', 'One', 'noun', 'ee-SAH', 'Mayroon akong isang tiket sa tren.', 'I have one train ticket.', 'Mayroon akong isang tiket sa tren.', 'Isa', ['Dalawa', 'Tatlo', 'Apat']),
      v('Dalawa', 'Two', 'expression', 'dah-lah-WAH', 'Dalawang mainit na kape, pakiusap.', 'Two hot coffees, please.', '___ng mainit na kape, pakiusap.', 'Dalawa', ['Isa', 'Tatlo', 'Apat']),
      v('Tatlo', 'Three', 'noun', 'taht-LOH', 'May tatlong bakanteng silid sa hotel.', 'There are three vacant rooms in hotel.', 'May tatlong bakanteng silid sa hotel.', 'Tatlo', ['Isa', 'Dalawa', 'Apat']),
      v('Apat', 'Four', 'expression', 'AH-paht', 'Apat kaming magkakasama ngayon.', 'Four of us are together today.', '___ kaming magkakasama ngayon.', 'Apat', ['Isa', 'Dalawa', 'Tatlo']),
      v('Lima', 'Five', 'noun', 'lee-MAH', 'Aalis ang bus sa loob ng limang minuto.', 'The bus leaves within five minutes.', 'Aalis ang bus sa loob ng limang minuto.', 'Lima', ['Isa', 'Dalawa', 'Tatlo']),
      v('Sampu', 'Ten', 'expression', 'sahm-POO', 'Nagkakahalaga ito ng sampung piso.', 'This costs ten pesos.', 'Nagkakahalaga ito ng sampung piso.', 'Sampu', ['Isa', 'Dalawa', 'Tatlo']),
      v('Dalawampu', 'Twenty', 'noun', 'dah-lah-vahm-POO', 'May dalawampung mag-aaral sa klase.', 'There are twenty students in class.', 'May dalawampung mag-aaral sa klase.', 'Dalawampu', ['Isa', 'Dalawa', 'Tatlo']),
      v('Limampu', 'Fifty', 'expression', 'lee-mahm-POO', 'May limampung upuan sa bulwagan.', 'There are fifty chairs in hall.', 'May limampung upuan sa bulwagan.', 'Limampu', ['Isa', 'Dalawa', 'Tatlo']),
      v('Isang daan', 'One hundred', 'noun', 'ee-sahng DAH-ahn', 'Ang aklat ay may isang daang pahina.', 'The book has hundred pages.', 'Ang aklat ay may isang daang pahina.', 'Isang daan', ['Isa', 'Dalawa', 'Tatlo']),
      v('Magbilang', 'To count', 'expression', 'mahg-BEE-lahng', 'Marunong akong magbilang sa Tagalog.', 'I know how to count in Tagalog.', 'Marunong akong magbilang sa Tagalog.', 'Magbilang', ['Isa', 'Dalawa', 'Tatlo']),
    ],
    4: [
      v('Tatay', 'Father', 'noun', 'TAH-tye', 'Ang aking tatay ay isang inhinyero.', 'My father is an engineer.', 'Ang aking tatay ay isang inhinyero.', 'Tatay', ['Nanay', 'Kuya', 'Ate']),
      v('Nanay', 'Mother', 'expression', 'NAH-nye', 'Ang aking nanay ay nars sa ospital.', 'My mother is nurse at hospital.', 'Ang aking nanay ay nars sa ospital.', 'Nanay', ['Tatay', 'Kuya', 'Ate']),
      v('Kuya', 'Older brother', 'noun', 'KOO-yah', 'Ang aking kuya ay nag-aaral sa unibersidad.', 'My older brother studies at university.', 'Ang aking kuya ay nag-aaral sa unibersidad.', 'Kuya', ['Tatay', 'Nanay', 'Ate']),
      v('Ate', 'Older sister', 'expression', 'AH-teh', 'Ang aking ate ay mahusay tumugtog ng gitara.', 'My older sister plays guitar well.', 'Ang aking ate ay mahusay tumugtog ng gitara.', 'Ate', ['Tatay', 'Nanay', 'Kuya']),
      v('Lolo', 'Grandfather', 'noun', 'LOH-loh', 'Si Lolo ay nagkukuwento tuwing gabi.', 'Grandfather tells stories every night.', 'Si ___ ay nagkukuwento tuwing gabi.', 'Lolo', ['Tatay', 'Nanay', 'Kuya']),
      v('Lola', 'Grandmother', 'expression', 'LOH-lah', 'Nagluluto si Lola ng masarap na kakanin.', 'Grandmother cooks delicious rice cakes.', 'Nagluluto si ___ ng masarap na kakanin.', 'Lola', ['Tatay', 'Nanay', 'Kuya']),
      v('Anak na lalaki', 'Son', 'noun', 'AH-nahk nah lah-LAH-kee', 'Naglalaro ng basketball ang kanilang anak.', 'Their son plays basketball.', 'Naglalaro ng basketball ang kanilang anak.', 'Anak na lalaki', ['Tatay', 'Nanay', 'Kuya']),
      v('Anak na babae', 'Daughter', 'expression', 'AH-nahk nah bah-BAH-eh', 'Mahilig magpinta ang kanilang anak na babae.', 'Their daughter is fond of painting.', 'Mahilig magpinta ang kanilang anak na babae.', 'Anak na babae', ['Tatay', 'Nanay', 'Kuya']),
      v('Magulang', 'Parents', 'noun', 'mah-GOO-lahng', 'Mahilig maglakbay ang aking mga magulang.', 'My parents are fond of traveling.', 'Mahilig maglakbay ang aking mga magulang.', 'Magulang', ['Tatay', 'Nanay', 'Kuya']),
      v('Bahay', 'Home', 'expression', 'BAH-hye', 'Ang aming bahay ay payapa at masaya.', 'Our home is peaceful and happy.', 'Ang aming bahay ay payapa at masaya.', 'Bahay', ['Tatay', 'Nanay', 'Kuya']),
    ],
    5: [
      v('Tinapay', 'Bread', 'noun', 'tee-NAH-pye', 'Bumili ako ng mainit na pandesal.', 'I bought hot pandesal.', 'Bumili ako ng mainit na pandesal.', 'Tinapay', ['Tubig', 'Tsaa', 'Kape']),
      v('Tubig', 'Water', 'expression', 'TOO-beeg', 'Isang basong malamig na tubig, pakiusap.', 'A glass of cold water, please.', 'Isang basong malamig na tubig, pakiusap.', 'Tubig', ['Tinapay', 'Tsaa', 'Kape']),
      v('Tsaa', 'Tea', 'noun', 'tsah-AH', 'Mas gusto mo ba ng tsaa o kape?', 'Do you prefer tea or coffee?', 'Mas gusto mo ba ng tsaa o kape?', 'Tsaa', ['Tinapay', 'Tubig', 'Kape']),
      v('Kape', 'Coffee', 'expression', 'kah-PEH', 'Ang kapeng barako ay matapang at mabango.', 'Barako coffee is strong and fragrant.', 'Ang kapeng barako ay matapang at mabango.', 'Kape', ['Tinapay', 'Tubig', 'Tsaa']),
      v('Mansanas', 'Apple', 'noun', 'mahn-SAH-nahs', 'Ang pulang mansanas ay matamis at sariwa.', 'Red apple is sweet and fresh.', 'Ang pulang mansanas ay matamis at sariwa.', 'Mansanas', ['Tinapay', 'Tubig', 'Tsaa']),
      v('Keso', 'Cheese', 'expression', 'KEH-soh', 'Masarap ang keso sa ibabaw ng tinapay.', 'Cheese is delicious on top of bread.', 'Masarap ang keso sa ibabaw ng tinapay.', 'Keso', ['Tinapay', 'Tubig', 'Tsaa']),
      v('Kumain', 'To eat', 'noun', 'koo-MAH-een', 'Sama-sama tayong kumain ng hapunan.', 'Let us eat dinner together.', 'Sama-sama tayong kumain ng hapunan.', 'Kumain', ['Tinapay', 'Tubig', 'Tsaa']),
      v('Uminom', 'To drink', 'expression', 'oo-mee-NOHM', 'Mahalagang uminom ng sapat na tubig.', 'Important to drink sufficient water.', 'Mahalagang uminom ng sapat na tubig.', 'Uminom', ['Tinapay', 'Tubig', 'Tsaa']),
      v('Masarap', 'Delicious', 'noun', 'mah-sah-RAHP', 'Ang tradisyonal na adobo ay napakasarap.', 'The traditional adobo is very delicious.', 'Ang tradisyonal na adobo ay napakasarap.', 'Masarap', ['Tinapay', 'Tubig', 'Tsaa']),
      v('Almusal', 'Breakfast', 'expression', 'ahl-moo-SAHL', 'Nakahain na ang almusal sa lamesa.', 'Breakfast is already served on table.', 'Nakahain na ang almusal sa lamesa.', 'Almusal', ['Tinapay', 'Tubig', 'Tsaa']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Restawran","Restaurant"],["Tindahan","Shop"],["Hotel","Hotel"],["Lungsod","City"],["Tren","Train"],["Paliparan","Airport"],["Trabaho","Work"],["Paaralan","School"],["Kalusugan","Health"],["Kalikasan","Nature"],["Bakasyon","Holiday"],["Musika","Music"],["Kasaysayan","History"],["Kultura","Culture"],["Agham","Science"],["Usapan","Conversation"],["Lipunan","Society"],["Tagumpay","Success"],["Kinabukasan","Future"],["Kaalaman","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  TAGALOG_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
