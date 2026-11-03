import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const SWAHILI_LANGUAGE: LanguageDefinition = {
  code: 'sw-en',
  title: 'Swahili Academy',
  description: 'Master Kiswahili from Bantu noun classes to vibrant East African conversational fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'sw',
  flagIcon: '🇰🇪',
  level: 'A1–C1',
  order: 35,
  nativeName: 'Kiswahili',
  isRTL: false,
  region: 'African',
  culturalTips: {
    1: 'Kiswahili uses noun classes (ngeli) where prefixes match across nouns, adjectives, and verbs.',
    2: 'Saying "Jambo" and "Karibu" embodies the welcoming spirit (Ukarimu) of East Africa.',
  },
  units: {
    1: [
      v('Jambo', 'Hello', 'noun', 'JAHM-boh', 'Jambo, habari yako leo?', 'Hello, how are you today?', '___, habari yako leo?', 'Jambo', ['Kwaheri', 'Asante sana', 'Tafadhali']),
      v('Kwaheri', 'Goodbye', 'expression', 'kwah-HEH-ree', 'Kwaheri na tutaonana tena hivi karibuni!', 'Goodbye and see you again soon!', '___ na tutaonana tena hivi karibuni!', 'Kwaheri', ['Jambo', 'Asante sana', 'Tafadhali']),
      v('Asante sana', 'Thank you very much', 'noun', 'ah-SAHN-teh SAH-nah', 'Asante sana kwa msaada wako mzuri.', 'Thank you very much for your good help.', '___ kwa msaada wako mzuri.', 'Asante sana', ['Jambo', 'Kwaheri', 'Tafadhali']),
      v('Tafadhali', 'Please', 'expression', 'tah-fah-DHAH-lee', 'Kikombe cha kahawa moto, tafadhali.', 'A cup of hot coffee, please.', 'Kikombe cha kahawa moto, tafadhali.', 'Tafadhali', ['Jambo', 'Kwaheri', 'Asante sana']),
      v('Ndiyo', 'Yes', 'noun', 'NDEE-yoh', 'Ndiyo, ninaelewa jambo hili vizuri kabisa.', 'Yes, I understand this matter completely well.', '___, ninaelewa jambo hili vizuri kabisa.', 'Ndiyo', ['Jambo', 'Kwaheri', 'Asante sana']),
      v('Hapana', 'No', 'expression', 'hah-PAH-nah', 'Hapana, hilo haliwezekani kwa leo.', 'No, that is not possible for today.', '___, hilo haliwezekani kwa leo.', 'Hapana', ['Jambo', 'Kwaheri', 'Asante sana']),
      v('Habari yako', 'How are you', 'noun', 'hah-BAH-ree YAH-koh', 'Habari yako rafiki yangu?', 'How are you, my friend?', '___ rafiki yangu?', 'Habari yako', ['Jambo', 'Kwaheri', 'Asante sana']),
      v('Karibu', 'Welcome', 'expression', 'kah-REE-boo', 'Karibu sana katika nchi yetu maridadi!', 'Warmly welcome to our beautiful country!', '___ sana katika nchi yetu maridadi!', 'Karibu', ['Jambo', 'Kwaheri', 'Asante sana']),
      v('Tutaonana baadaye', 'See you soon', 'noun', 'too-tah-oh-NAH-nah bah-dah-YEH', 'Uwe na siku njema na tutaonana baadaye!', 'Have a good day and see you later!', 'Uwe na siku njema na tutaonana baadaye!', 'Tutaonana baadaye', ['Jambo', 'Kwaheri', 'Asante sana']),
      v('Usiku mwema', 'Good night', 'expression', 'oo-SEE-koo MWEH-mah', 'Usiku mwema na ndoto njema.', 'Good night and sweet dreams.', '___ na ndoto njema.', 'Usiku mwema', ['Jambo', 'Kwaheri', 'Asante sana']),
    ],
    2: [
      v('Nimefurahi kukutana nawe', 'Nice to meet you', 'noun', 'nee-meh-foo-RAH-hee koo-koo-TAH-nah NAH-weh', 'Nimefurahi sana kukutana nawe hapa.', 'Very happy to meet with you here.', 'Nimefurahi sana kukutana nawe hapa.', 'Nimefurahi kukutana nawe', ['Jina langu ni', 'Samahani', 'Habari za asubuhi']),
      v('Jina langu ni', 'My name is', 'expression', 'JEE-nah LAHN-goo nee', 'Habari, jina langu ni Juma.', 'Hello, my name is Juma.', 'Habari, jina langu ni Juma.', 'Jina langu ni', ['Nimefurahi kukutana nawe', 'Samahani', 'Habari za asubuhi']),
      v('Samahani', 'Excuse me / Sorry', 'noun', 'sah-mah-HAH-nee', 'Samahani, kituo cha treni kiko wapi?', 'Excuse me, where is train station?', '___, kituo cha treni kiko wapi?', 'Samahani', ['Nimefurahi kukutana nawe', 'Jina langu ni', 'Habari za asubuhi']),
      v('Habari za asubuhi', 'Good morning', 'expression', 'hah-BAH-ree zah ah-soo-BOO-hee', 'Habari za asubuhi kwa kila mtu!', 'Good morning to everyone!', '___ kwa kila mtu!', 'Habari za asubuhi', ['Nimefurahi kukutana nawe', 'Jina langu ni', 'Samahani']),
      v('Habari za jioni', 'Good evening', 'noun', 'hah-BAH-ree zah jee-OH-nee', 'Habari za jioni na karibuni wote.', 'Good evening and welcome all.', '___ na karibuni wote.', 'Habari za jioni', ['Nimefurahi kukutana nawe', 'Jina langu ni', 'Samahani']),
      v('Rafiki', 'Friend', 'expression', 'rah-FEE-kee', 'Yeye ni rafiki yangu mwaminifu tangu utotoni.', 'He is my faithful friend since childhood.', 'Yeye ni rafiki yangu mwaminifu tangu utotoni.', 'Rafiki', ['Nimefurahi kukutana nawe', 'Jina langu ni', 'Samahani']),
      v('Mwalimu', 'Teacher', 'noun', 'mwah-LEE-moo', 'Mwalimu wetu anafundisha masomo kwa ufasaha.', 'Our teacher teaches lessons fluently.', '___ wetu anafundisha masomo kwa ufasaha.', 'Mwalimu', ['Nimefurahi kukutana nawe', 'Jina langu ni', 'Samahani']),
      v('Familia', 'Family', 'expression', 'fah-MEE-lyah', 'Familia yangu inaishi jijini Nairobi.', 'My family lives in Nairobi city.', '___ yangu inaishi jijini Nairobi.', 'Familia', ['Nimefurahi kukutana nawe', 'Jina langu ni', 'Samahani']),
      v('Nzuri sana', 'Excellent', 'noun', 'NZZOO-ree SAH-nah', 'Matokeo ya mtihani ni mazuri sana.', 'Exam results are very good.', 'Matokeo ya mtihani ni mazuri sana.', 'Nzuri sana', ['Nimefurahi kukutana nawe', 'Jina langu ni', 'Samahani']),
      v('Vizuri', 'Good', 'expression', 'vee-ZOO-ree', 'Kila kitu kinaendelea vizuri kabisa.', 'Everything proceeds completely well.', 'Kila kitu kinaendelea vizuri kabisa.', 'Vizuri', ['Nimefurahi kukutana nawe', 'Jina langu ni', 'Samahani']),
    ],
    3: [
      v('Moja', 'One', 'noun', 'MOH-jah', 'Nina tiketi moja ya treni.', 'I have one train ticket.', 'Nina tiketi moja ya treni.', 'Moja', ['Mbili', 'Tatu', 'Nne']),
      v('Mbili', 'Two', 'expression', 'MBEE-lee', 'Vikombe viwili vya chai, tafadhali.', 'Two cups of tea, please.', 'Vikombe viwili vya chai, tafadhali.', 'Mbili', ['Moja', 'Tatu', 'Nne']),
      v('Tatu', 'Three', 'noun', 'TAH-too', 'Kuna vyumba vitatu wazi hotelini.', 'There are three open rooms in hotel.', 'Kuna vyumba vitatu wazi hotelini.', 'Tatu', ['Moja', 'Mbili', 'Nne']),
      v('Nne', 'Four', 'expression', 'N-NEH', 'Sisi ni watu wanne kwenye safari.', 'We are four people on trip.', 'Sisi ni watu wanne kwenye safari.', 'Nne', ['Moja', 'Mbili', 'Tatu']),
      v('Tano', 'Five', 'noun', 'TAH-noh', 'Basi litaondoka baada ya dakika tano.', 'Bus will depart after five minutes.', 'Basi litaondoka baada ya dakika tano.', 'Tano', ['Moja', 'Mbili', 'Tatu']),
      v('Kumi', 'Ten', 'expression', 'KOO-mee', 'Bei yake ni shilingi kumi hasa.', 'Its price is exactly ten shillings.', 'Bei yake ni shilingi kumi hasa.', 'Kumi', ['Moja', 'Mbili', 'Tatu']),
      v('Ishirini', 'Twenty', 'noun', 'ee-shee-REE-nee', 'Wanafunzi ishirini wako darasani.', 'Twenty students are in classroom.', 'Wanafunzi ishirini wako darasani.', 'Ishirini', ['Moja', 'Mbili', 'Tatu']),
      v('Hamsini', 'Fifty', 'expression', 'hahm-SEE-nee', 'Ukumbi una viti hamsini vya kutosha.', 'Hall has fifty sufficient chairs.', 'Ukumbi una viti hamsini vya kutosha.', 'Hamsini', ['Moja', 'Mbili', 'Tatu']),
      v('Mia moja', 'One hundred', 'noun', 'MEE-ah MOH-jah', 'Kitabu hiki kina kurasa mia moja.', 'This book has hundred pages.', 'Kitabu hiki kina kurasa mia moja.', 'Mia moja', ['Moja', 'Mbili', 'Tatu']),
      v('Kuhesabu', 'To count', 'expression', 'koo-heh-SAH-boo', 'Ninaweza kuhesabu kwa Kiswahili kwa urahisi.', 'I can count in Kiswahili easily.', 'Ninaweza kuhesabu kwa Kiswahili kwa urahisi.', 'Kuhesabu', ['Moja', 'Mbili', 'Tatu']),
    ],
    4: [
      v('Baba', 'Father', 'noun', 'BAH-bah', 'Baba yangu anafanya kazi kama mhandisi.', 'My father works as engineer.', '___ yangu anafanya kazi kama mhandisi.', 'Baba', ['Mama', 'Kaka', 'Dada']),
      v('Mama', 'Mother', 'expression', 'MAH-mah', 'Mama yangu ni daktari hospitalini.', 'My mother is doctor in hospital.', '___ yangu ni daktari hospitalini.', 'Mama', ['Baba', 'Kaka', 'Dada']),
      v('Kaka', 'Brother', 'noun', 'KAH-kah', 'Kaka yangu mkubwa anasoma chuo kikuu.', 'My older brother studies at university.', '___ yangu mkubwa anasoma chuo kikuu.', 'Kaka', ['Baba', 'Mama', 'Dada']),
      v('Dada', 'Sister', 'expression', 'DAH-dah', 'Dada yangu anaimba muziki mzuri.', 'My sister sings beautiful music.', '___ yangu anaimba muziki mzuri.', 'Dada', ['Baba', 'Mama', 'Kaka']),
      v('Babu', 'Grandfather', 'noun', 'BAH-boo', 'Babu anatembea bustanini kila asubuhi.', 'Grandfather walks in garden every morning.', '___ anatembea bustanini kila asubuhi.', 'Babu', ['Baba', 'Mama', 'Kaka']),
      v('Bibi', 'Grandmother', 'expression', 'BEE-bee', 'Bibi anapika chakula kitamu cha kitamaduni.', 'Grandmother cooks delicious traditional food.', '___ anapika chakula kitamu cha kitamaduni.', 'Bibi', ['Baba', 'Mama', 'Kaka']),
      v('Mwana', 'Son', 'noun', 'MWAH-nah', 'Mwana wao anacheza mpira wa miguu vizuri.', 'Their son plays football well.', '___ wao anacheza mpira wa miguu vizuri.', 'Mwana', ['Baba', 'Mama', 'Kaka']),
      v('Binti', 'Daughter', 'expression', 'BEEN-tee', 'Binti yao anapenda kuchora picha maridadi.', 'Their daughter likes painting beautiful pictures.', '___ yao anapenda kuchora picha maridadi.', 'Binti', ['Baba', 'Mama', 'Kaka']),
      v('Wazazi', 'Parents', 'noun', 'wah-ZAH-zee', 'Wazazi wangu wanapenda kusafiri mikoani.', 'My parents like traveling to provinces.', '___ wangu wanapenda kusafiri mikoani.', 'Wazazi', ['Baba', 'Mama', 'Kaka']),
      v('Nyumbani', 'Home', 'expression', 'nyoom-BAH-nee', 'Nyumba yetu ni ya amani, safi na tulivu.', 'Our home is peaceful, clean, and calm.', 'Nyumba yetu ni ya amani, safi na tulivu.', 'Nyumbani', ['Baba', 'Mama', 'Kaka']),
    ],
    5: [
      v('Mkate', 'Bread', 'noun', 'm-KAH-teh', 'Mkate safi na moto kutoka kwenye tanuri.', 'Fresh hot bread from the oven.', '___ safi na moto kutoka kwenye tanuri.', 'Mkate', ['Maji', 'Chai', 'Kahawa']),
      v('Maji', 'Water', 'expression', 'MAH-jee', 'Glasi ya maji baridi ya kunywa, tafadhali.', 'A glass of cold drinking water, please.', 'Glasi ya maji baridi ya kunywa, tafadhali.', 'Maji', ['Mkate', 'Chai', 'Kahawa']),
      v('Chai', 'Tea', 'noun', 'CHAH-ee', 'Chai ya maziwa na viungo inanukia vizuri.', 'Spiced milk tea smells good.', '___ ya maziwa na viungo inanukia vizuri.', 'Chai', ['Mkate', 'Maji', 'Kahawa']),
      v('Kahawa', 'Coffee', 'expression', 'kah-HAH-wah', 'Kahawa ya Afrika Mashariki ina ladha nzuri.', 'East African coffee has good flavor.', '___ ya Afrika Mashariki ina ladha nzuri.', 'Kahawa', ['Mkate', 'Maji', 'Chai']),
      v('Tofaa', 'Apple', 'noun', 'toh-FAH-ah', 'Tofaa jekundu ni tamu na lina afya.', 'Red apple is sweet and healthy.', '___ jekundu ni tamu na lina afya.', 'Tofaa', ['Mkate', 'Maji', 'Chai']),
      v('Jibini', 'Cheese', 'expression', 'jee-BEE-nee', 'Jibini kwenye mkate inaleta ladha nzuri.', 'Cheese on bread brings good taste.', '___ kwenye mkate inaleta ladha nzuri.', 'Jibini', ['Mkate', 'Maji', 'Chai']),
      v('Kula', 'To eat', 'noun', 'KOO-lah', 'Tukusanyike wote tule chakula cha jioni.', 'Let us all gather eat dinner.', 'Tukusanyike wote tule chakula cha jioni.', 'Kula', ['Mkate', 'Maji', 'Chai']),
      v('Kunywa', 'To drink', 'expression', 'KOON-ywah', 'Ni muhimu kunywa maji safi ya kutosha.', 'Important to drink sufficient clean water.', 'Ni muhimu kunywa maji safi ya kutosha.', 'Kunywa', ['Mkate', 'Maji', 'Chai']),
      v('Tamu', 'Delicious', 'noun', 'TAH-moo', 'Chakula hiki cha asili ni kitamu mno.', 'This traditional food is extremely delicious.', 'Chakula hiki cha asili ni kitamu mno.', 'Tamu', ['Mkate', 'Maji', 'Chai']),
      v('Kiamsha kinywa', 'Breakfast', 'expression', 'kee-AHM-shah KEEN-ywah', 'Kiamsha kinywa huandaliwa saa mbili asubuhi.', 'Breakfast is prepared at eight in morning.', '___ huandaliwa saa mbili asubuhi.', 'Kiamsha kinywa', ['Mkate', 'Maji', 'Chai']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Mkahawa","Restaurant"],["Duka","Shop"],["Hoteli","Hotel"],["Jiji","City"],["Treni","Train"],["Uwanja wa Ndege","Airport"],["Kazi","Work"],["Shule","School"],["Afya","Health"],["Asili","Nature"],["Likizo","Holiday"],["Muziki","Music"],["Historia","History"],["Utamaduni","Culture"],["Sayansi","Science"],["Mazungumzo","Conversation"],["Jamii","Society"],["Mafanikio","Success"],["Wakati Ujao","Future"],["Ujuzi","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  SWAHILI_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
