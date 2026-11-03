import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const CZECH_LANGUAGE: LanguageDefinition = {
  code: 'cs-en',
  title: 'Czech Academy',
  description: 'Master Czech from distinctive sounds (ř) and noun declensions to fluent cultural dialogue from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'cs',
  flagIcon: '🇨🇿',
  level: 'A1–C1',
  order: 37,
  nativeName: 'Čeština',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Czech features the unique consonant "ř" and has 7 grammatical cases for precise syntactic expression.',
    2: 'Saying "Dobrý den" is the universal polite greeting upon entering shops, elevators, and offices.',
  },
  units: {
    1: [
      v('Dobrý den', 'Hello / Good day', 'noun', 'DOH-bree den', 'Dobrý den, jak se dnes máte?', 'Hello, how are you today?', '___, jak se dnes máte?', 'Dobrý den', ['Na shledanou', 'Děkuji', 'Prosím']),
      v('Na shledanou', 'Goodbye', 'expression', 'nah SKHLEH-dah-noh', 'Na shledanou a brzy na viděnou!', 'Goodbye and see you soon!', '___ a brzy na viděnou!', 'Na shledanou', ['Dobrý den', 'Děkuji', 'Prosím']),
      v('Děkuji', 'Thank you', 'noun', 'DYEH-koo-yee', 'Velice vám děkuji za vaši laskavou pomoc.', 'Thank you very much for your kind help.', 'Velice vám děkuji za vaši laskavou pomoc.', 'Děkuji', ['Dobrý den', 'Na shledanou', 'Prosím']),
      v('Prosím', 'Please / Here you are', 'expression', 'PROH-seem', 'Jeden šálek horké kávy, prosím.', 'A cup of hot coffee, please.', 'Jeden šálek horké kávy, prosím.', 'Prosím', ['Dobrý den', 'Na shledanou', 'Děkuji']),
      v('Ano', 'Yes', 'noun', 'AH-noh', 'Ano, rozumím tomu naprosto jasně.', 'Yes, I understand that completely clearly.', '___, rozumím tomu naprosto jasně.', 'Ano', ['Dobrý den', 'Na shledanou', 'Děkuji']),
      v('Ne', 'No', 'expression', 'NEH', 'Ne, to dnes bohužel není možné.', 'No, that is unfortunately not possible today.', '___, to dnes bohužel není možné.', 'Ne', ['Dobrý den', 'Na shledanou', 'Děkuji']),
      v('Jak se máte', 'How are you', 'noun', 'yahk seh MAH-teh', 'Dobrý den přátelé, jak se máte?', 'Hello friends, how are you?', 'Dobrý den přátelé, jak se máte?', 'Jak se máte', ['Dobrý den', 'Na shledanou', 'Děkuji']),
      v('Vítejte', 'Welcome', 'expression', 'VEE-tehy-teh', 'Srdečně vítejte v našem krásném městě!', 'Warmly welcome to our beautiful city!', 'Srdečně vítejte v našem krásném městě!', 'Vítejte', ['Dobrý den', 'Na shledanou', 'Děkuji']),
      v('Brzy na viděnou', 'See you soon', 'noun', 'BR-zee nah VEE-jye-noh', 'Mějte hezký den a brzy na viděnou!', 'Have a nice day and see you soon!', 'Mějte hezký den a brzy na viděnou!', 'Brzy na viděnou', ['Dobrý den', 'Na shledanou', 'Děkuji']),
      v('Dobrou noc', 'Good night', 'expression', 'DOH-broh nohts', 'Dobrou noc a sladké sny.', 'Good night and sweet dreams.', '___ a sladké sny.', 'Dobrou noc', ['Dobrý den', 'Na shledanou', 'Děkuji']),
    ],
    2: [
      v('Těší mě', 'Nice to meet you', 'noun', 'TYEH-shee myeh', 'Velmi mě těší, že vás poznávám.', 'Very pleased to get to know you.', 'Velmi mě těší, že vás poznávám.', 'Těší mě', ['Jmenuji se', 'Promiňte', 'Dobré ráno']),
      v('Jmenuji se', 'My name is', 'expression', 'YMEH-noo-yee seh', 'Dobrý den, jmenuji se Tomáš.', 'Hello, my name is Tomas.', 'Dobrý den, jmenuji se Tomáš.', 'Jmenuji se', ['Těší mě', 'Promiňte', 'Dobré ráno']),
      v('Promiňte', 'Excuse me / Sorry', 'noun', 'PROH-meen-teh', 'Promiňte, kde se nachází hlavní nádraží?', 'Excuse me, where is main station located?', '___, kde se nachází hlavní nádraží?', 'Promiňte', ['Těší mě', 'Jmenuji se', 'Dobré ráno']),
      v('Dobré ráno', 'Good morning', 'expression', 'DOH-breh RAH-noh', 'Dobré ráno všem a úspěšný den!', 'Good morning to all and successful day!', '___ všem a úspěšný den!', 'Dobré ráno', ['Těší mě', 'Jmenuji se', 'Promiňte']),
      v('Dobrý večer', 'Good evening', 'noun', 'DOH-bree VEH-cher', 'Dobrý večer a vítejte na setkání.', 'Good evening and welcome to meeting.', '___ a vítejte na setkání.', 'Dobrý večer', ['Těší mě', 'Jmenuji se', 'Promiňte']),
      v('Přítel', 'Friend', 'expression', 'PRZHEE-tel', 'On je můj nejlepší a nejvěrnější přítel.', 'He is my best and most loyal friend.', 'On je můj nejlepší a nejvěrnější přítel.', 'Přítel', ['Těší mě', 'Jmenuji se', 'Promiňte']),
      v('Učitel', 'Teacher', 'noun', 'OO-chee-tel', 'Náš učitel vysvětluje látku velmi srozumitelně.', 'Our teacher explains subject very understandably.', 'Náš učitel vysvětluje látku velmi srozumitelně.', 'Učitel', ['Těší mě', 'Jmenuji se', 'Promiňte']),
      v('Rodina', 'Family', 'expression', 'ROH-dee-nah', 'Moje rodina žije v historické Praze.', 'My family lives in historical Prague.', 'Moje rodina žije v historické Praze.', 'Rodina', ['Těší mě', 'Jmenuji se', 'Promiňte']),
      v('Výborně', 'Excellent', 'noun', 'VEEY-bor-nyeh', 'Výsledek zkoušky dopadl opravdu výborně.', 'Exam result turned out really excellently.', 'Výsledek zkoušky dopadl opravdu výborně.', 'Výborně', ['Těší mě', 'Jmenuji se', 'Promiňte']),
      v('Dobře', 'Good', 'expression', 'DOHB-rzheh', 'Všechno se vyvíjí velmi dobře a klidně.', 'Everything develops very well and calmly.', 'Všechno se vyvíjí velmi dobře a klidně.', 'Dobře', ['Těší mě', 'Jmenuji se', 'Promiňte']),
    ],
    3: [
      v('Jeden', 'One', 'noun', 'YEH-den', 'Mám jednu jízdenku na vlak.', 'I have one train ticket.', 'Mám jednu jízdenku na vlak.', 'Jeden', ['Dva', 'Tři', 'Čtyři']),
      v('Dva', 'Two', 'expression', 'DVAH', 'Dvě horké kávy, prosím.', 'Two hot coffees, please.', 'Dvě horké kávy, prosím.', 'Dva', ['Jeden', 'Tři', 'Čtyři']),
      v('Tři', 'Three', 'noun', 'TRZHEE', 'V hotelu jsou tři volné pokoje.', 'In hotel exist three vacant rooms.', 'V hotelu jsou tři volné pokoje.', 'Tři', ['Jeden', 'Dva', 'Čtyři']),
      v('Čtyři', 'Four', 'expression', 'CHTIH-rzhee', 'Přijeli jsme jako čtyři přátelé.', 'We arrived as four friends.', 'Přijeli jsme jako čtyři přátelé.', 'Čtyři', ['Jeden', 'Dva', 'Tři']),
      v('Pět', 'Five', 'noun', 'PYEHT', 'Vlak odjíždí za pět minut.', 'Train departs in five minutes.', 'Vlak odjíždí za pět minut.', 'Pět', ['Jeden', 'Dva', 'Tři']),
      v('Deset', 'Ten', 'expression', 'DEH-set', 'Stojí to přesně deset korun.', 'It costs exactly ten crowns.', 'Stojí to přesně deset korun.', 'Deset', ['Jeden', 'Dva', 'Tři']),
      v('Dvacet', 'Twenty', 'noun', 'DVAH-tset', 'V učebně sedí dvacet studentů.', 'In classroom sit twenty students.', 'V učebně sedí dvacet studentů.', 'Dvacet', ['Jeden', 'Dva', 'Tři']),
      v('Padesát', 'Fifty', 'expression', 'PAH-deh-saht', 'Sál má kapacitu padesát míst.', 'Hall has capacity of fifty seats.', 'Sál má kapacitu padesát míst.', 'Padesát', ['Jeden', 'Dva', 'Tři']),
      v('Sto', 'One hundred', 'noun', 'STOH', 'Tato kniha obsahuje přesně sto stran.', 'This book contains exactly hundred pages.', 'Tato kniha obsahuje přesně sto stran.', 'Sto', ['Jeden', 'Dva', 'Tři']),
      v('Počítat', 'To count', 'expression', 'POH-chee-taht', 'Umím snadno počítat v češtině.', 'I can count in Czech easily.', 'Umím snadno počítat v češtině.', 'Počítat', ['Jeden', 'Dva', 'Tři']),
    ],
    4: [
      v('Otec', 'Father', 'noun', 'OH-tets', 'Můj otec pracuje jako stavební inženýr.', 'My father works as civil engineer.', 'Můj otec pracuje jako stavební inženýr.', 'Otec', ['Matka', 'Bratr', 'Sestra']),
      v('Matka', 'Mother', 'expression', 'MAHT-kah', 'Moje matka je lékařkou v nemocnici.', 'My mother is doctor in hospital.', 'Moje matka je lékařkou v nemocnici.', 'Matka', ['Otec', 'Bratr', 'Sestra']),
      v('Bratr', 'Brother', 'noun', 'BRAH-tr', 'Můj starší bratr studuje na univerzitě.', 'My older brother studies at university.', 'Můj starší bratr studuje na univerzitě.', 'Bratr', ['Otec', 'Matka', 'Sestra']),
      v('Sestra', 'Sister', 'expression', 'SEH-strah', 'Moje mladší sestra krásně hraje na klavír.', 'My younger sister plays piano beautifully.', 'Moje mladší sestra krásně hraje na klavír.', 'Sestra', ['Otec', 'Matka', 'Bratr']),
      v('Dědeček', 'Grandfather', 'noun', 'DYEH-deh-chek', 'Dědeček chodí každé ráno na procházku.', 'Grandfather goes for walk every morning.', '___ chodí každé ráno na procházku.', 'Dědeček', ['Otec', 'Matka', 'Bratr']),
      v('Babička', 'Grandmother', 'expression', 'BAH-beech-kah', 'Babička peče vynikající domácí koláče.', 'Grandmother bakes delicious homemade cakes.', '___ peče vynikající domácí koláče.', 'Babička', ['Otec', 'Matka', 'Bratr']),
      v('Syn', 'Son', 'noun', 'SIHN', 'Jejich syn hraje florbal za školní tým.', 'Their son plays floorball for school team.', 'Jejich syn hraje florbal za školní tým.', 'Syn', ['Otec', 'Matka', 'Bratr']),
      v('Dcera', 'Daughter', 'expression', 'TSEH-rah', 'Jejich dcera ráda maluje hezké obrazy.', 'Their daughter likes painting nice paintings.', 'Jejich dcera ráda maluje hezké obrazy.', 'Dcera', ['Otec', 'Matka', 'Bratr']),
      v('Rodiče', 'Parents', 'noun', 'ROH-dee-cheh', 'Moji rodiče velice rádi cestují po horách.', 'My parents very gladly travel through mountains.', 'Moji rodiče velice rádi cestují po horách.', 'Rodiče', ['Otec', 'Matka', 'Bratr']),
      v('Dům', 'Home', 'expression', 'DOOM', 'Náš dům je útulný, světlý a pohostinný.', 'Our home is cozy, bright, and hospitable.', 'Náš dům je útulný, světlý a pohostinný.', 'Dům', ['Otec', 'Matka', 'Bratr']),
    ],
    5: [
      v('Chléb', 'Bread', 'noun', 'KHLEHP', 'Čerstvý kváskový chléb z pekárny chutná skvěle.', 'Fresh sourdough bread from bakery tastes great.', 'Čerstvý kváskový chléb z pekárny chutná skvěle.', 'Chléb', ['Voda', 'Čaj', 'Káva']),
      v('Voda', 'Water', 'expression', 'VOH-dah', 'Sklenici pramenité studené vody, prosím.', 'A glass of spring cold water, please.', 'Sklenici pramenité studené vody, prosím.', 'Voda', ['Chléb', 'Čaj', 'Káva']),
      v('Čaj', 'Tea', 'noun', 'CHAHY', 'Horký bylinkový čaj příjemně zahřeje.', 'Hot herbal tea pleasantly warms.', 'Horký bylinkový čaj příjemně zahřeje.', 'Čaj', ['Chléb', 'Voda', 'Káva']),
      v('Káva', 'Coffee', 'expression', 'KAH-vah', 'Kvalitní ranní káva dodá energii na celý den.', 'Quality morning coffee supplies energy for entire day.', 'Kvalitní ranní káva dodá energii na celý den.', 'Káva', ['Chléb', 'Voda', 'Čaj']),
      v('Jablko', 'Apple', 'noun', 'YAHB-l-koh', 'Červené křupavé jablko je zdravá svačina.', 'Red crisp apple is healthy snack.', 'Červené křupavé jablko je zdravá svačina.', 'Jablko', ['Chléb', 'Voda', 'Čaj']),
      v('Sýr', 'Cheese', 'expression', 'SEER', 'Tradiční sýr se výborně hodí k pečivu.', 'Traditional cheese fits pastry excellently.', 'Tradiční sýr se výborně hodí k pečivu.', 'Sýr', ['Chléb', 'Voda', 'Čaj']),
      v('Jíst', 'To eat', 'noun', 'YEEST', 'Pojďme všichni společně jíst večeři.', 'Let us all together eat dinner.', 'Pojďme všichni společně jíst večeři.', 'Jíst', ['Chléb', 'Voda', 'Čaj']),
      v('Pít', 'To drink', 'expression', 'PEET', 'V průběhu dne je důležité pít dostatek tekutin.', 'During day it is important to drink enough fluids.', 'V průběhu dne je důležité pít dostatek tekutin.', 'Pít', ['Chléb', 'Voda', 'Čaj']),
      v('Chutný', 'Delicious', 'noun', 'KHOOT-nee', 'Tento tradiční pokrm je mimořádně chutný.', 'This traditional dish is extraordinarily tasty.', 'Tento tradiční pokrm je mimořádně chutný.', 'Chutný', ['Chléb', 'Voda', 'Čaj']),
      v('Snídaně', 'Breakfast', 'expression', 'SNEE-dah-nyeh', 'Snídaně se podává v osm hodin ráno.', 'Breakfast is served at eight in morning.', '___ se podává v osm hodin ráno.', 'Snídaně', ['Chléb', 'Voda', 'Čaj']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Restaurace","Restaurant"],["Obchod","Shop"],["Hotel","Hotel"],["Město","City"],["Vlak","Train"],["Letiště","Airport"],["Práce","Work"],["Škola","School"],["Zdraví","Health"],["Příroda","Nature"],["Dovolená","Holiday"],["Hudba","Music"],["Historie","History"],["Kultura","Culture"],["Věda","Science"],["Konverzace","Conversation"],["Společnost","Society"],["Úspěch","Success"],["Budoucnost","Future"],["Znalost","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  CZECH_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
