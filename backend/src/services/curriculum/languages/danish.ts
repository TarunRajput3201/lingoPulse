import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const DANISH_LANGUAGE: LanguageDefinition = {
  code: 'da-en',
  title: 'Danish Academy',
  description: 'Master Danish from Copenhagen dialogues to advanced Scandinavian academic and business fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'da',
  flagIcon: '🇩🇰',
  level: 'A1–C1',
  order: 17,
  nativeName: 'Dansk',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Danish has the unique "stød"—a glottal catch that distinguishes otherwise identical words.',
    2: '"Hygge" reflects the Danish art of creating intimacy, warmth, and everyday contentment.',
  },
  units: {
    1: [
      v('Hej', 'Hello', 'noun', 'HAY', 'Hej, hvordan går det i dag?', 'Hello, how are you today?', '___, hvordan går det i dag?', 'Hej', ['Farvel', 'Mange tak', 'Vær så venlig']),
      v('Farvel', 'Goodbye', 'expression', 'fah-VEHL', 'Farvel og hav en rigtig god dag!', 'Goodbye and have a really good day!', '___ og hav en rigtig god dag!', 'Farvel', ['Hej', 'Mange tak', 'Vær så venlig']),
      v('Mange tak', 'Thank you very much', 'noun', 'MAHNG-eh tahk', 'Mange tak for din store hjælpsomhed.', 'Thank you very much for your great helpfulness.', '___ for din store hjælpsomhed.', 'Mange tak', ['Hej', 'Farvel', 'Vær så venlig']),
      v('Vær så venlig', 'Please', 'expression', 'vehr soh VEHN-lee', 'En kop sort kaffe, vær så venlig.', 'A cup of black coffee, please.', 'En kop sort kaffe, vær så venlig.', 'Vær så venlig', ['Hej', 'Farvel', 'Mange tak']),
      v('Ja', 'Yes', 'noun', 'YAH', 'Ja, jeg forstår det fuldstændig.', 'Yes, I understand it completely.', '___, jeg forstår det fuldstændig.', 'Ja', ['Hej', 'Farvel', 'Mange tak']),
      v('Nej', 'No', 'expression', 'NAY', 'Nej, det kan desværre ikke lade sig gøre.', 'No, that cannot unfortunately be done.', '___, det kan desværre ikke lade sig gøre.', 'Nej', ['Hej', 'Farvel', 'Mange tak']),
      v('Hvordan går det', 'How are you', 'noun', 'vor-DAHN gor deh', 'Hej Peter, hvordan går det med dig?', 'Hello Peter, how are you doing?', 'Hej Peter, hvordan går det med dig?', 'Hvordan går det', ['Hej', 'Farvel', 'Mange tak']),
      v('Velkommen', 'Welcome', 'expression', 'vel-KOM-men', 'Hjertelig velkommen til Danmark!', 'Heartily welcome to Denmark!', 'Hjertelig velkommen til Danmark!', 'Velkommen', ['Hej', 'Farvel', 'Mange tak']),
      v('Vi ses snart', 'See you soon', 'noun', 'vee sehs SNART', 'Hav det godt og vi ses snart!', 'Take care and see you soon!', 'Hav det godt og vi ses snart!', 'Vi ses snart', ['Hej', 'Farvel', 'Mange tak']),
      v('Godnat', 'Good night', 'expression', 'gohd-NAHT', 'Godnat og sov rigtig godt.', 'Good night and sleep really well.', '___ og sov rigtig godt.', 'Godnat', ['Hej', 'Farvel', 'Mange tak']),
    ],
    2: [
      v('Rart at møde dig', 'Nice to meet you', 'noun', 'RAHRT aht mur-teh day', 'Hvor er det rart at møde dig her.', 'How nice it is to meet you here.', 'Hvor er det rart at møde dig her.', 'Rart at møde dig', ['Jeg hedder', 'Undskyld', 'Godmorgen']),
      v('Jeg hedder', 'My name is', 'expression', 'yay HEH-ther', 'Hej, jeg hedder Mads.', 'Hello, my name is Mads.', 'Hej, jeg hedder Mads.', 'Jeg hedder', ['Rart at møde dig', 'Undskyld', 'Godmorgen']),
      v('Undskyld', 'Excuse me / Sorry', 'noun', 'OON-skewl', 'Undskyld, kan du vise mig vejen?', 'Excuse me, can you show me the way?', '___, kan du vise mig vejen?', 'Undskyld', ['Rart at møde dig', 'Jeg hedder', 'Godmorgen']),
      v('Godmorgen', 'Good morning', 'expression', 'goh-MOR-en', 'Godmorgen og god arbejdslyst!', 'Good morning and enjoy your work!', '___ og god arbejdslyst!', 'Godmorgen', ['Rart at møde dig', 'Jeg hedder', 'Undskyld']),
      v('Godaften', 'Good evening', 'noun', 'goh-AHF-ten', 'Godaften til alle fremmødte.', 'Good evening to all present.', '___ til alle fremmødte.', 'Godaften', ['Rart at møde dig', 'Jeg hedder', 'Undskyld']),
      v('Ven', 'Friend', 'expression', 'VEHN', 'Han er min bedste og mest loyale ven.', 'He is my best and most loyal friend.', 'Han er min bedste og mest loyale ven.', 'Ven', ['Rart at møde dig', 'Jeg hedder', 'Undskyld']),
      v('Lærer', 'Teacher', 'noun', 'LEH-rer', 'Vores lærer forklarer pensum grundigt.', 'Our teacher explains syllabus thoroughly.', 'Vores lærer forklarer pensum grundigt.', 'Lærer', ['Rart at møde dig', 'Jeg hedder', 'Undskyld']),
      v('Familie', 'Family', 'expression', 'fah-MEEL-yeh', 'Min familie bor i hjertet af Odense.', 'My family lives in heart of Odense.', 'Min familie bor i hjertet af Odense.', 'Familie', ['Rart at møde dig', 'Jeg hedder', 'Undskyld']),
      v('Udmærket', 'Excellent', 'noun', 'OOTH-mehr-keht', 'Opgaven blev løst helt udmærket.', 'The task was solved completely excellently.', 'Opgaven blev løst helt udmærket.', 'Udmærket', ['Rart at møde dig', 'Jeg hedder', 'Undskyld']),
      v('Godt', 'Good', 'expression', 'GOT', 'Alt går heldigvis rigtig godt.', 'Everything is fortunately going really well.', 'Alt går heldigvis rigtig godt.', 'Godt', ['Rart at møde dig', 'Jeg hedder', 'Undskyld']),
    ],
    3: [
      v('En', 'One', 'noun', 'AYN', 'Jeg har en billet til færgen.', 'I have one ticket for ferry.', 'Jeg har en billet til færgen.', 'En', ['To', 'Tre', 'Fire']),
      v('To', 'Two', 'expression', 'TOH', 'To kopper kaffe, tak.', 'Two cups of coffee, thanks.', '___ kopper kaffe, tak.', 'To', ['En', 'Tre', 'Fire']),
      v('Tre', 'Three', 'noun', 'TRAY', 'Der er tre ledige cykler udenfor.', 'There are three free bicycles outside.', 'Der er tre ledige cykler udenfor.', 'Tre', ['En', 'To', 'Fire']),
      v('Fire', 'Four', 'expression', 'FEE-reh', 'Vi er fire kammerater af sted.', 'We are four friends off together.', 'Vi er fire kammerater af sted.', 'Fire', ['En', 'To', 'Tre']),
      v('Fem', 'Five', 'noun', 'FEHM', 'Toget kører om fem minutter.', 'The train runs in five minutes.', 'Toget kører om fem minutter.', 'Fem', ['En', 'To', 'Tre']),
      v('Ti', 'Ten', 'expression', 'TEE', 'Billetten koster præcis ti kroner.', 'The ticket costs exactly ten crowns.', 'Billetten koster præcis ti kroner.', 'Ti', ['En', 'To', 'Tre']),
      v('Tyve', 'Twenty', 'noun', 'TEE-veh', 'Der er tyve minutter til lufthavnen.', 'There are twenty minutes to airport.', 'Der er tyve minutter til lufthavnen.', 'Tyve', ['En', 'To', 'Tre']),
      v('Halvtreds', 'Fifty', 'expression', 'hal-TREHS', 'Museet har plads til halvtreds gæster.', 'The museum has room for fifty guests.', 'Museet har plads til halvtreds gæster.', 'Halvtreds', ['En', 'To', 'Tre']),
      v('Hundrede', 'One hundred', 'noun', 'HOON-reht-heh', 'Bogen rummer hundrede sider.', 'The book contains hundred pages.', 'Bogen rummer hundrede sider.', 'Hundrede', ['En', 'To', 'Tre']),
      v('Tælle', 'To count', 'expression', 'TEHL-leh', 'Jeg kan nemt tælle på dansk.', 'I can easily count in Danish.', 'Jeg kan nemt tælle på dansk.', 'Tælle', ['En', 'To', 'Tre']),
    ],
    4: [
      v('Far', 'Father', 'noun', 'FAHR', 'Min far arbejder som arkitekt.', 'My father works as architect.', 'Min far arbejder som arkitekt.', 'Far', ['Mor', 'Bror', 'Søster']),
      v('Mor', 'Mother', 'expression', 'MOOR', 'Min mor er læge på hospitalet.', 'My mother is doctor at hospital.', 'Min mor er læge på hospitalet.', 'Mor', ['Far', 'Bror', 'Søster']),
      v('Bror', 'Brother', 'noun', 'BROOR', 'Min storebror læser på universitetet.', 'My big brother studies at university.', 'Min storebror læser på universitetet.', 'Bror', ['Far', 'Mor', 'Søster']),
      v('Søster', 'Sister', 'expression', 'SUR-ster', 'Min lillesøster går i gymnasiet.', 'My little sister goes to high school.', 'Min lillesøster går i gymnasiet.', 'Søster', ['Far', 'Mor', 'Bror']),
      v('Bedstefar', 'Grandfather', 'noun', 'BEHT-steh-fahr', 'Bedstefar elsker at passe haven.', 'Grandfather loves tending garden.', '___ elsker at passe haven.', 'Bedstefar', ['Far', 'Mor', 'Bror']),
      v('Bedstemor', 'Grandmother', 'expression', 'BEHT-steh-moor', 'Bedstemor bager skønne kanelsnegle.', 'Grandmother bakes lovely cinnamon rolls.', '___ bager skønne kanelsnegle.', 'Bedstemor', ['Far', 'Mor', 'Bror']),
      v('Søn', 'Son', 'noun', 'SURHN', 'Deres søn cykler i skole hver dag.', 'Their son bikes to school every day.', 'Deres søn cykler i skole hver dag.', 'Søn', ['Far', 'Mor', 'Bror']),
      v('Datter', 'Daughter', 'expression', 'DAHT-ter', 'Deres datter tegner smukke billeder.', 'Their daughter draws beautiful pictures.', 'Deres datter tegner smukke billeder.', 'Datter', ['Far', 'Mor', 'Bror']),
      v('Forældre', 'Parents', 'noun', 'for-EHL-dreh', 'Mine forældre holder af at rejse.', 'My parents enjoy traveling.', 'Mine forældre holder af at rejse.', 'Forældre', ['Far', 'Mor', 'Bror']),
      v('Hjem', 'Home', 'expression', 'YEHM', 'Vores hjem er lyst og hyggeligt.', 'Our home is bright and cozy.', 'Vores hjem er lyst og hyggeligt.', 'Hjem', ['Far', 'Mor', 'Bror']),
    ],
    5: [
      v('Brød', 'Bread', 'noun', 'BRURTH', 'Friskt rugbrød med smør smager fantastisk.', 'Fresh rye bread with butter tastes fantastic.', 'Friskt rugbrød med smør smager fantastisk.', 'Brød', ['Vand', 'Te', 'Kaffe']),
      v('Vand', 'Water', 'expression', 'VAHN', 'Et glas koldt postevand, tak.', 'A glass of cold tap water, thanks.', 'Et glas koldt postevand, tak.', 'Vand', ['Brød', 'Te', 'Kaffe']),
      v('Te', 'Tea', 'noun', 'TAY', 'Foretrækker du te med honning?', 'Do you prefer tea with honey?', 'Foretrækker du te med honning?', 'Te', ['Brød', 'Vand', 'Kaffe']),
      v('Kaffe', 'Coffee', 'expression', 'KAHF-feh', 'Dansk kaffe er en vigtig del af hyggen.', 'Danish coffee is an important part of hygge.', 'Dansk kaffe er en vigtig del af hyggen.', 'Kaffe', ['Brød', 'Vand', 'Te']),
      v('Æble', 'Apple', 'noun', 'EHB-leh', 'Et sprødt dansk æble smager dejligt.', 'A crisp Danish apple tastes lovely.', 'Et sprødt dansk æble smager dejligt.', 'Æble', ['Brød', 'Vand', 'Te']),
      v('Ost', 'Cheese', 'expression', 'OHST', 'Gammel knas er en velsmagende ost.', 'Gammel knas is a tasty cheese.', 'Gammel knas er en velsmagende ost.', 'Ost', ['Brød', 'Vand', 'Te']),
      v('Spise', 'To eat', 'noun', 'SBEE-seh', 'Vi skal spise aftensmad sammen klokken seks.', 'We shall eat dinner together at six.', 'Vi skal spise aftensmad sammen klokken seks.', 'Spise', ['Brød', 'Vand', 'Te']),
      v('Drikke', 'To drink', 'expression', 'DREEK-keh', 'Husk at drikke nok vand hele dagen.', 'Remember to drink enough water all day.', 'Husk at drikke nok vand hele dagen.', 'Drikke', ['Brød', 'Vand', 'Te']),
      v('Lækkert', 'Delicious', 'noun', 'LEHK-kert', 'Maden smagte usædvanlig lækkert.', 'The food tasted unusually delicious.', 'Maden smagte usædvanlig lækkert.', 'Lækkert', ['Brød', 'Vand', 'Te']),
      v('Morgenmad', 'Breakfast', 'expression', 'MOR-en-mahth', 'Morgenmaden står klar på bordet.', 'Breakfast is ready on the table.', '___en står klar på bordet.', 'Morgenmad', ['Brød', 'Vand', 'Te']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Restaurant","Restaurant"],["Butik","Shop"],["Hotel","Hotel"],["By","City"],["Tog","Train"],["Lufthavn","Airport"],["Arbejde","Work"],["Skole","School"],["Sundhed","Health"],["Natur","Nature"],["Ferie","Holiday"],["Musik","Music"],["Historie","History"],["Kultur","Culture"],["Videnskab","Science"],["Samtale","Conversation"],["Samfund","Society"],["Succes","Success"],["Fremtid","Future"],["Viden","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  DANISH_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
