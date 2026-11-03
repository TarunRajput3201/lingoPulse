import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const DUTCH_LANGUAGE: LanguageDefinition = {
  code: 'nl-en',
  title: 'Dutch Academy',
  description: 'Master Dutch from everyday conversations to advanced academic and professional fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'nl',
  flagIcon: '🇳🇱',
  level: 'A1–C1',
  order: 13,
  nativeName: 'Nederlands',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Dutch uses two definite articles: "de" (common gender) and "het" (neuter).',
    2: 'Saying "Gezellig" describes cozy, enjoyable, convivial social atmosphere unique to Dutch culture.',
  },
  units: {
    1: [
      v('Hallo', 'Hello', 'noun', 'HAH-loh', 'Hallo, hoe gaat het vandaag met jou?', 'Hello, how are you today?', '___, hoe gaat het vandaag met jou?', 'Hallo', ['Tot ziens', 'Dank je wel', 'Alstublieft']),
      v('Tot ziens', 'Goodbye', 'expression', 'tot ZEENS', 'Tot ziens en tot de volgende keer!', 'Goodbye and until next time!', '___ en tot de volgende keer!', 'Tot ziens', ['Hallo', 'Dank je wel', 'Alstublieft']),
      v('Dank je wel', 'Thank you', 'noun', 'dahnk yuh VEL', 'Hartelijk dank je wel voor je hulp.', 'Thank you very much for your help.', 'Hartelijk dank je wel voor je hulp.', 'Dank je wel', ['Hallo', 'Tot ziens', 'Alstublieft']),
      v('Alstublieft', 'Please', 'expression', 'ahl-stew-BLEEFT', 'Een kopje koffie, alstublieft.', 'A cup of coffee, please.', 'Een kopje koffie, alstublieft.', 'Alstublieft', ['Hallo', 'Tot ziens', 'Dank je wel']),
      v('Ja', 'Yes', 'noun', 'YAH', 'Ja, ik begrijp het helemaal.', 'Yes, I understand it completely.', '___, ik begrijp het helemaal.', 'Ja', ['Hallo', 'Tot ziens', 'Dank je wel']),
      v('Nee', 'No', 'expression', 'NAY', 'Nee, dat is vandaag niet mogelijk.', 'No, that is not possible today.', '___, dat is vandaag niet mogelijk.', 'Nee', ['Hallo', 'Tot ziens', 'Dank je wel']),
      v('Hoe gaat het', 'How are you', 'noun', 'hoo GAHT het', 'Hallo Sophie, hoe gaat het met jou?', 'Hello Sophie, how are you doing?', 'Hallo Sophie, hoe gaat het met jou?', 'Hoe gaat het', ['Hallo', 'Tot ziens', 'Dank je wel']),
      v('Welkom', 'Welcome', 'expression', 'VEL-kom', 'Welkom in onze mooie stad!', 'Welcome to our beautiful city!', '___ in onze mooie stad!', 'Welkom', ['Hallo', 'Tot ziens', 'Dank je wel']),
      v('Tot snel', 'See you soon', 'noun', 'tot SNEL', 'Fijne dag en tot snel!', 'Have a great day and see you soon!', 'Fijne dag en tot snel!', 'Tot snel', ['Hallo', 'Tot ziens', 'Dank je wel']),
      v('Goedenacht', 'Good night', 'expression', 'GOO-duh-nahkht', 'Goedenacht en slaap lekker.', 'Good night and sleep well.', '___ en slaap lekker.', 'Goedenacht', ['Hallo', 'Tot ziens', 'Dank je wel']),
    ],
    2: [
      v('Aangenaam', 'Nice to meet you', 'noun', 'AHN-guh-nahm', 'Aangenaam kennis met u te maken.', 'Nice to make your acquaintance.', '___ kennis met u te maken.', 'Aangenaam', ['Mijn naam is', 'Pardon', 'Goedemorgen']),
      v('Mijn naam is', 'My name is', 'expression', 'mayn NAHM is', 'Hallo, mijn naam is Lucas.', 'Hello, my name is Lucas.', 'Hallo, mijn naam is Lucas.', 'Mijn naam is', ['Aangenaam', 'Pardon', 'Goedemorgen']),
      v('Pardon', 'Excuse me / Sorry', 'noun', 'pahr-DOHN', 'Pardon, waar is het centraal station?', 'Excuse me, where is central station?', '___, waar is het centraal station?', 'Pardon', ['Aangenaam', 'Mijn naam is', 'Goedemorgen']),
      v('Goedemorgen', 'Good morning', 'expression', 'GOO-duh-mor-guh', 'Goedemorgen aan iedereen hier!', 'Good morning to everyone here!', '___ aan iedereen hier!', 'Goedemorgen', ['Aangenaam', 'Mijn naam is', 'Pardon']),
      v('Goedenavond', 'Good evening', 'noun', 'GOO-duh-nah-vond', 'Goedenavond en welkom vanavond.', 'Good evening and welcome tonight.', '___ en welkom vanavond.', 'Goedenavond', ['Aangenaam', 'Mijn naam is', 'Pardon']),
      v('Vriend', 'Friend', 'expression', 'VREENT', 'Hij is mijn beste en oudste vriend.', 'He is my best and oldest friend.', 'Hij is mijn beste en oudste vriend.', 'Vriend', ['Aangenaam', 'Mijn naam is', 'Pardon']),
      v('Leraar', 'Teacher', 'noun', 'LAY-rahr', 'Onze leraar legt alles heel duidelijk uit.', 'Our teacher explains everything very clearly.', 'Onze leraar legt alles heel duidelijk uit.', 'Leraar', ['Aangenaam', 'Mijn naam is', 'Pardon']),
      v('Familie', 'Family', 'expression', 'fah-MEE-lee', 'Mijn familie woont in Utrecht.', 'My family lives in Utrecht.', 'Mijn familie woont in Utrecht.', 'Familie', ['Aangenaam', 'Mijn naam is', 'Pardon']),
      v('Uitstekend', 'Excellent', 'noun', 'OWT-stay-kend', 'Het resultaat is werkelijk uitstekend.', 'The result is truly excellent.', 'Het resultaat is werkelijk uitstekend.', 'Uitstekend', ['Aangenaam', 'Mijn naam is', 'Pardon']),
      v('Goed', 'Good', 'expression', 'GOOT', 'Alles gaat gelukkig heel goed.', 'Everything is going very well luckily.', 'Alles gaat gelukkig heel goed.', 'Goed', ['Aangenaam', 'Mijn naam is', 'Pardon']),
    ],
    3: [
      v('Eén', 'One', 'noun', 'AYN', 'Ik heb één treinkaartje gekocht.', 'I bought one train ticket.', 'Ik heb één treinkaartje gekocht.', 'Eén', ['Twee', 'Drie', 'Vier']),
      v('Twee', 'Two', 'expression', 'TVAY', 'Twee warme dranken, alstublieft.', 'Two hot drinks, please.', '___ warme dranken, alstublieft.', 'Twee', ['Eén', 'Drie', 'Vier']),
      v('Drie', 'Three', 'noun', 'DREE', 'Er zijn drie kamers vrij.', 'There are three rooms available.', 'Er zijn drie kamers vrij.', 'Drie', ['Eén', 'Twee', 'Vier']),
      v('Vier', 'Four', 'expression', 'FEER', 'Wij zijn met vier personen.', 'We are four persons.', 'Wij zijn met vier personen.', 'Vier', ['Eén', 'Twee', 'Drie']),
      v('Vijf', 'Five', 'noun', 'FAYF', 'De trein vertrekt over vijf minuten.', 'The train departs in five minutes.', 'De trein vertrekt over vijf minuten.', 'Vijf', ['Eén', 'Twee', 'Drie']),
      v('Tien', 'Ten', 'expression', 'TEEN', 'Dat kost precies tien euro.', 'That costs exactly ten euros.', 'Dat kost precies tien euro.', 'Tien', ['Eén', 'Twee', 'Drie']),
      v('Twintig', 'Twenty', 'noun', 'TVIN-tukh', 'Het museum is twintig meter verder.', 'The museum is twenty meters ahead.', 'Het museum is twintig meter verder.', 'Twintig', ['Eén', 'Twee', 'Drie']),
      v('Vijftig', 'Fifty', 'expression', 'FAYF-tukh', 'Er zijn vijftig zitplaatsen in de zaal.', 'There are fifty seats in the room.', 'Er zijn vijftig zitplaatsen in de zaal.', 'Vijftig', ['Eén', 'Twee', 'Drie']),
      v('Honderd', 'One hundred', 'noun', 'HON-dert', 'Dit boek telt precies honderd pagina\'s.', 'This book counts exactly hundred pages.', 'Dit boek telt precies honderd pagina\'s.', 'Honderd', ['Eén', 'Twee', 'Drie']),
      v('Tellen', 'To count', 'expression', 'TEL-luh', 'Ik kan gemakkelijk tot honderd tellen.', 'I can easily count to hundred.', 'Ik kan gemakkelijk tot honderd tellen.', 'Tellen', ['Eén', 'Twee', 'Drie']),
    ],
    4: [
      v('Vader', 'Father', 'noun', 'FAH-der', 'Mijn vader werkt bij de bank.', 'My father works at the bank.', 'Mijn vader werkt bij de bank.', 'Vader', ['Moeder', 'Broer', 'Zus']),
      v('Moeder', 'Mother', 'expression', 'MOO-der', 'Mijn moeder is architect van beroep.', 'My mother is an architect by profession.', 'Mijn moeder is architect van beroep.', 'Moeder', ['Vader', 'Broer', 'Zus']),
      v('Broer', 'Brother', 'noun', 'BROOR', 'Mijn oudere broer woont in Rotterdam.', 'My older brother lives in Rotterdam.', 'Mijn oudere broer woont in Rotterdam.', 'Broer', ['Vader', 'Moeder', 'Zus']),
      v('Zus', 'Sister', 'expression', 'ZUS', 'Mijn zus studeert rechten in Leiden.', 'My sister studies law in Leiden.', 'Mijn zus studeert rechten in Leiden.', 'Zus', ['Vader', 'Moeder', 'Broer']),
      v('Grootvader', 'Grandfather', 'noun', 'GROHT-fah-der', 'Mijn grootvader wandelt elke ochtend.', 'My grandfather walks every morning.', 'Mijn grootvader wandelt elke ochtend.', 'Grootvader', ['Vader', 'Moeder', 'Broer']),
      v('Grootmoeder', 'Grandmother', 'expression', 'GROHT-moo-der', 'Mijn grootmoeder bakt heerlijke appeltaart.', 'My grandmother bakes delicious apple pie.', 'Mijn grootmoeder bakt heerlijke appeltaart.', 'Grootmoeder', ['Vader', 'Moeder', 'Broer']),
      v('Zoon', 'Son', 'noun', 'ZOHN', 'Hun zoon speelt voetbal bij de club.', 'Their son plays soccer at the club.', 'Hun zoon speelt voetbal bij de club.', 'Zoon', ['Vader', 'Moeder', 'Broer']),
      v('Dochter', 'Daughter', 'expression', 'DOKH-ter', 'Hun dochter leert viool spelen.', 'Their daughter learns to play violin.', 'Hun dochter leert viool spelen.', 'Dochter', ['Vader', 'Moeder', 'Broer']),
      v('Ouders', 'Parents', 'noun', 'OW-ders', 'Mijn ouders reizen heel graag samen.', 'My parents love traveling together.', 'Mijn ouders reizen heel graag samen.', 'Ouders', ['Vader', 'Moeder', 'Broer']),
      v('Huis', 'Home', 'expression', 'HOWS', 'Ons nieuwe huis is ruim en licht.', 'Our new home is spacious and light.', 'Ons nieuwe huis is ruim en licht.', 'Huis', ['Vader', 'Moeder', 'Broer']),
    ],
    5: [
      v('Brood', 'Bread', 'noun', 'BROHT', 'Ik koop vers volkorenbrood bij de bakker.', 'I buy fresh whole wheat bread at bakery.', 'Ik koop vers volkorenbrood bij de bakker.', 'Brood', ['Water', 'Thee', 'Koffie']),
      v('Water', 'Water', 'expression', 'VAH-ter', 'Een glas koud water, alstublieft.', 'A glass of cold water, please.', 'Een glas koud water, alstublieft.', 'Water', ['Brood', 'Thee', 'Koffie']),
      v('Thee', 'Tea', 'noun', 'TAY', 'Drink je liever thee of koffie?', 'Do you prefer drinking tea or coffee?', 'Drink je liever thee of koffie?', 'Thee', ['Brood', 'Water', 'Koffie']),
      v('Koffie', 'Coffee', 'expression', 'KOF-fee', 'Ik drink \'s ochtends sterke zwarte koffie.', 'I drink strong black coffee in morning.', 'Ik drink \'s ochtends sterke zwarte koffie.', 'Koffie', ['Brood', 'Water', 'Thee']),
      v('Appel', 'Apple', 'noun', 'AHP-pul', 'Een frisse rode appel als tussendoortje.', 'A fresh red apple as snack.', 'Een frisse rode appel als tussendoortje.', 'Appel', ['Brood', 'Water', 'Thee']),
      v('Kaas', 'Cheese', 'expression', 'KAHS', 'Goudse kaas smaakt uitstekend op brood.', 'Gouda cheese tastes excellent on bread.', 'Goudse kaas smaakt uitstekend op brood.', 'Kaas', ['Brood', 'Water', 'Thee']),
      v('Eten', 'To eat', 'noun', 'AY-tuh', 'Wij gaan vanavond samen gezellig eten.', 'We are going to eat together cozily tonight.', 'Wij gaan vanavond samen gezellig eten.', 'Eten', ['Brood', 'Water', 'Thee']),
      v('Drinken', 'To drink', 'expression', 'DRING-kuh', 'Het is gezond veel water te drinken.', 'It is healthy to drink plenty of water.', 'Het is gezond veel water te drinken.', 'Drinken', ['Brood', 'Water', 'Thee']),
      v('Heerlijk', 'Delicious', 'noun', 'HAYR-lukh', 'Deze verse maaltijd smaakt werkelijk heerlijk.', 'This fresh meal tastes truly delicious.', 'Deze verse maaltijd smaakt werkelijk heerlijk.', 'Heerlijk', ['Brood', 'Water', 'Thee']),
      v('Ontbijt', 'Breakfast', 'expression', 'ONT-bayt', 'Het ontbijt wordt geserveerd om acht uur.', 'Breakfast is served at eight o\'clock.', 'Het ontbijt wordt geserveerd om acht uur.', 'Ontbijt', ['Brood', 'Water', 'Thee']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Restaurant","Restaurant"],["Winkel","Shop"],["Hotel","Hotel"],["Stad","City"],["Trein","Train"],["Luchthaven","Airport"],["Werk","Work"],["School","School"],["Gezondheid","Health"],["Natuur","Nature"],["Vakantie","Vacation"],["Muziek","Music"],["Geschiedenis","History"],["Cultuur","Culture"],["Wetenschap","Science"],["Gesprek","Conversation"],["Samenleving","Society"],["Succes","Success"],["Toekomst","Future"],["Kennis","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  DUTCH_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
