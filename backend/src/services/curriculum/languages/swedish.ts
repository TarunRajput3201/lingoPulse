import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const SWEDISH_LANGUAGE: LanguageDefinition = {
  code: 'sv-en',
  title: 'Swedish Academy',
  description: 'Master Swedish from foundational fika culture to advanced Nordic professional fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'sv',
  flagIcon: '🇸🇪',
  level: 'A1–C1',
  order: 15,
  nativeName: 'Svenska',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Swedish has tonal pitch accent and three additional vowels: å, ä, and ö.',
    2: '"Fika" is much more than having coffee—it is an institution of daily social connection.',
  },
  units: {
    1: [
      v('Hej', 'Hello', 'noun', 'HEY', 'Hej, hur mår du i dag?', 'Hello, how are you today?', '___, hur mår du i dag?', 'Hej', ['Hej då', 'Tack så mycket', 'Snälla']),
      v('Hej då', 'Goodbye', 'expression', 'hey DOH', 'Hej då och vi ses snart igen!', 'Goodbye and see you soon again!', '___ och vi ses snart igen!', 'Hej då', ['Hej', 'Tack så mycket', 'Snälla']),
      v('Tack så mycket', 'Thank you very much', 'noun', 'tahk soh MEW-keh', 'Tack så mycket för din stora hjälp.', 'Thank you very much for your great help.', '___ för din stora hjälp.', 'Tack så mycket', ['Hej', 'Hej då', 'Snälla']),
      v('Snälla', 'Please', 'expression', 'SNEL-lah', 'En kopp varmt kaffe, snälla.', 'A cup of hot coffee, please.', 'En kopp varmt kaffe, snälla.', 'Snälla', ['Hej', 'Hej då', 'Tack så mycket']),
      v('Ja', 'Yes', 'noun', 'YAH', 'Ja, jag förstår precis vad du menar.', 'Yes, I understand exactly what you mean.', '___, jag förstår precis vad du menar.', 'Ja', ['Hej', 'Hej då', 'Tack så mycket']),
      v('Nej', 'No', 'expression', 'NAY', 'Nej, det är tyvärr inte möjligt i dag.', 'No, that is unfortunately not possible today.', '___, det är tyvärr inte möjligt i dag.', 'Nej', ['Hej', 'Hej då', 'Tack så mycket']),
      v('Hur mår du', 'How are you', 'noun', 'hoor mohr DOO', 'Hej Johan, hur mår du i dag?', 'Hello Johan, how are you today?', 'Hej Johan, hur mår du i dag?', 'Hur mår du', ['Hej', 'Hej då', 'Tack så mycket']),
      v('Välkommen', 'Welcome', 'expression', 'VEL-kom-men', 'Varmt välkommen till vår vackra stad!', 'Warmly welcome to our beautiful city!', 'Varmt välkommen till vår vackra stad!', 'Välkommen', ['Hej', 'Hej då', 'Tack så mycket']),
      v('Vi ses snart', 'See you soon', 'noun', 'vee sehs SNART', 'Ha en bra dag och vi ses snart!', 'Have a good day and see you soon!', 'Ha en bra dag och vi ses snart!', 'Vi ses snart', ['Hej', 'Hej då', 'Tack så mycket']),
      v('God natt', 'Good night', 'expression', 'gohd NAHT', 'God natt och sov så gott.', 'Good night and sleep so well.', '___ och sov så gott.', 'God natt', ['Hej', 'Hej då', 'Tack så mycket']),
    ],
    2: [
      v('Trevligt att träffas', 'Nice to meet you', 'noun', 'TREHV-leet aht TREHF-fahs', 'Trevligt att träffas och lära känna dig.', 'Nice to meet you and get to know you.', '___ och lära känna dig.', 'Trevligt att träffas', ['Jag heter', 'Ursäkta', 'God morgon']),
      v('Jag heter', 'My name is', 'expression', 'yah HEE-ter', 'Hej, jag heter Elsa.', 'Hello, my name is Elsa.', 'Hej, jag heter Elsa.', 'Jag heter', ['Trevligt att träffas', 'Ursäkta', 'God morgon']),
      v('Ursäkta', 'Excuse me / Sorry', 'noun', 'EWR-shehk-tah', 'Ursäkta, var ligger centralstationen?', 'Excuse me, where is central station?', '___, var ligger centralstationen?', 'Ursäkta', ['Trevligt att träffas', 'Jag heter', 'God morgon']),
      v('God morgon', 'Good morning', 'expression', 'gohd MOR-ron', 'God morgon till alla vänner här!', 'Good morning to all friends here!', '___ till alla vänner här!', 'God morgon', ['Trevligt att träffas', 'Jag heter', 'Ursäkta']),
      v('God kväll', 'Good evening', 'noun', 'gohd KVEHL', 'God kväll och välkomna i kväll.', 'Good evening and welcome tonight.', '___ och välkomna i kväll.', 'God kväll', ['Trevligt att träffas', 'Jag heter', 'Ursäkta']),
      v('Vän', 'Friend', 'expression', 'VEHN', 'Han är min allra bästa och äldsta vän.', 'He is my very best and oldest friend.', 'Han är min allra bästa och äldsta vän.', 'Vän', ['Trevligt att träffas', 'Jag heter', 'Ursäkta']),
      v('Lärare', 'Teacher', 'noun', 'LEH-rah-reh', 'Vår lärare förklarar allting mycket tydligt.', 'Our teacher explains everything very clearly.', 'Vår lärare förklarar allting mycket tydligt.', 'Lärare', ['Trevligt att träffas', 'Jag heter', 'Ursäkta']),
      v('Familj', 'Family', 'expression', 'fah-MEEL-yuh', 'Min familj bor i Stockholm.', 'My family lives in Stockholm.', 'Min familj bor i Stockholm.', 'Familj', ['Trevligt att träffas', 'Jag heter', 'Ursäkta']),
      v('Utmärkt', 'Excellent', 'noun', 'EWT-mehrkt', 'Resultatet på provet var helt utmärkt.', 'The result on the test was completely excellent.', 'Resultatet på provet var helt utmärkt.', 'Utmärkt', ['Trevligt att träffas', 'Jag heter', 'Ursäkta']),
      v('Bra', 'Good', 'expression', 'BRAH', 'Allting går alldeles utmärkt och bra.', 'Everything is going completely fine and good.', 'Allting går alldeles utmärkt och bra.', 'Bra', ['Trevligt att träffas', 'Jag heter', 'Ursäkta']),
    ],
    3: [
      v('Ett', 'One', 'noun', 'EHT', 'Jag har en biljett till tåget.', 'I have one ticket to train.', 'Jag har en biljett till tåget.', 'Ett', ['Två', 'Tre', 'Fyra']),
      v('Två', 'Two', 'expression', 'TVOH', 'Två varma koppar kaffe, tack.', 'Two hot cups of coffee, please.', '___ varma koppar kaffe, tack.', 'Två', ['Ett', 'Tre', 'Fyra']),
      v('Tre', 'Three', 'noun', 'TRAY', 'Det finns tre lediga rum här.', 'There are three available rooms here.', 'Det finns tre lediga rum här.', 'Tre', ['Ett', 'Två', 'Fyra']),
      v('Fyra', 'Four', 'expression', 'FEW-rah', 'Vi är fyra personer i sällskapet.', 'We are four persons in party.', 'Vi är fyra personer i sällskapet.', 'Fyra', ['Ett', 'Två', 'Tre']),
      v('Fem', 'Fem', 'noun', 'FEHM', 'Bussen avgår om fem minuter.', 'The bus departs in five minutes.', 'Bussen avgår om fem minuter.', 'Fem', ['Ett', 'Två', 'Tre']),
      v('Tio', 'Ten', 'expression', 'TEE-oh', 'Boken kostar exakt tio kronor.', 'The book costs exactly ten crowns.', 'Boken kostar exakt tio kronor.', 'Tio', ['Ett', 'Två', 'Tre']),
      v('Tjugo', 'Twenty', 'noun', 'SHEW-goh', 'Det är tjugo meter till museet.', 'It is twenty meters to museum.', 'Det är tjugo meter till museet.', 'Tjugo', ['Ett', 'Två', 'Tre']),
      v('Femtio', 'Fifty', 'expression', 'FEHM-tee-oh', 'Salen har femtio bekväma platser.', 'The hall has fifty comfortable seats.', 'Salen har femtio bekväma platser.', 'Femtio', ['Ett', 'Två', 'Tre']),
      v('Hundra', 'One hundred', 'noun', 'HOON-drah', 'Denna bok innehåller hundra sidor.', 'This book contains hundred pages.', 'Denna bok innehåller hundra sidor.', 'Hundra', ['Ett', 'Två', 'Tre']),
      v('Räkna', 'To count', 'expression', 'REHK-nah', 'Jag kan enkelt räkna på svenska.', 'I can easily count in Swedish.', 'Jag kan enkelt räkna på svenska.', 'Räkna', ['Ett', 'Två', 'Tre']),
    ],
    4: [
      v('Far', 'Father', 'noun', 'FAHR', 'Min far arbetar som ingenjör.', 'My father works as engineer.', 'Min far arbetar som ingenjör.', 'Far', ['Mor', 'Bror', 'Syster']),
      v('Mor', 'Mother', 'expression', 'MOOR', 'Min mor arbetar som arkitekt.', 'My mother works as architect.', 'Min mor arbetar som arkitekt.', 'Mor', ['Far', 'Bror', 'Syster']),
      v('Bror', 'Brother', 'noun', 'BROOR', 'Min äldre bror studerar i Uppsala.', 'My older brother studies in Uppsala.', 'Min äldre bror studerar i Uppsala.', 'Bror', ['Far', 'Mor', 'Syster']),
      v('Syster', 'Sister', 'expression', 'SEW-ster', 'Min yngre syster tycker om att spela piano.', 'My younger sister likes playing piano.', 'Min yngre syster tycker om att spela piano.', 'Syster', ['Far', 'Mor', 'Bror']),
      v('Farfar', 'Grandfather', 'noun', 'FAHR-fahr', 'Min farfar går en promenad varje morgon.', 'My grandfather takes a walk every morning.', 'Min farfar går en promenad varje morgon.', 'Farfar', ['Far', 'Mor', 'Bror']),
      v('Farmor', 'Grandmother', 'expression', 'FAHR-moor', 'Min farmor bakar fantastiskt goda bullar.', 'My grandmother bakes fantastic buns.', 'Min farmor bakar fantastiskt goda bullar.', 'Farmor', ['Far', 'Mor', 'Bror']),
      v('Son', 'Son', 'noun', 'SOHN', 'Deras son spelar fotboll i laget.', 'Their son plays soccer in the team.', 'Deras son spelar fotboll i laget.', 'Son', ['Far', 'Mor', 'Bror']),
      v('Dotter', 'Daughter', 'expression', 'DOT-ter', 'Deras dotter lär sig måla akvarell.', 'Their daughter learns painting watercolor.', 'Deras dotter lär sig måla akvarell.', 'Dotter', ['Far', 'Mor', 'Bror']),
      v('Föräldrar', 'Parents', 'noun', 'fur-EHL-drahr', 'Mina föräldrar älskar att resa i norr.', 'My parents love traveling in north.', 'Mina föräldrar älskar att resa i norr.', 'Föräldrar', ['Far', 'Mor', 'Bror']),
      v('Hem', 'Home', 'expression', 'HEHM', 'Vårt hem är ljust, varmt och hemtrevligt.', 'Our home is bright, warm, and cozy.', 'Vårt hem är ljust, varmt och hemtrevligt.', 'Hem', ['Far', 'Mor', 'Bror']),
    ],
    5: [
      v('Bröd', 'Bread', 'noun', 'BRURD', 'Jag köper färskt rågbröd i bageriet.', 'I buy fresh rye bread at bakery.', 'Jag köper färskt rågbröd i bageriet.', 'Bröd', ['Vatten', 'Te', 'Kaffe']),
      v('Vatten', 'Water', 'expression', 'VAHT-ten', 'Ett glas kallt vatten, tack.', 'A glass of cold water, please.', 'Ett glas kallt vatten, tack.', 'Vatten', ['Bröd', 'Te', 'Kaffe']),
      v('Te', 'Tea', 'noun', 'TAY', 'Vill du hellre dricka te eller kaffe?', 'Would you rather drink tea or coffee?', 'Vill du hellre dricka te eller kaffe?', 'Te', ['Bröd', 'Vatten', 'Kaffe']),
      v('Kaffe', 'Coffee', 'expression', 'KAHF-feh', 'Svenskt kaffe är starkt och fylligt.', 'Swedish coffee is strong and full-bodied.', 'Svenskt kaffe är starkt och fylligt.', 'Kaffe', ['Bröd', 'Vatten', 'Te']),
      v('Äpple', 'Apple', 'noun', 'EHP-pleh', 'Ett gott krispigt rött äpple.', 'A tasty crisp red apple.', 'Ett gott krispigt rött äpple.', 'Äpple', ['Bröd', 'Vatten', 'Te']),
      v('Ost', 'Cheese', 'expression', 'OHST', 'Västerbottensost är mycket populär i Sverige.', 'Västerbotten cheese is very popular in Sweden.', 'Västerbottensost är mycket populär i Sverige.', 'Ost', ['Bröd', 'Vatten', 'Te']),
      v('Äta', 'To eat', 'noun', 'EH-tah', 'Vi ska äta middag tillsammans i kväll.', 'We shall eat dinner together tonight.', 'Vi ska äta middag tillsammans i kväll.', 'Äta', ['Bröd', 'Vatten', 'Te']),
      v('Dricka', 'To drink', 'expression', 'DREEK-kah', 'Det är viktigt att dricka tillräckligt med vatten.', 'It is important to drink enough water.', 'Det är viktigt att dricka tillräckligt med vatten.', 'Dricka', ['Bröd', 'Vatten', 'Te']),
      v('Läcker', 'Delicious', 'noun', 'LEHK-ker', 'Denna måltid smakar alldeles läckert.', 'This meal tastes completely delicious.', 'Denna måltid smakar alldeles läckert.', 'Läcker', ['Bröd', 'Vatten', 'Te']),
      v('Frukost', 'Breakfast', 'expression', 'FREW-kost', 'Frukosten serveras klockan åtta på hotellet.', 'Breakfast is served at eight at hotel.', '___en serveras klockan åtta på hotellet.', 'Frukost', ['Bröd', 'Vatten', 'Te']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Restaurang","Restaurant"],["Affär","Shop"],["Hotell","Hotel"],["Stad","City"],["Tåg","Train"],["Flygplats","Airport"],["Arbete","Work"],["Skola","School"],["Hälsa","Health"],["Natur","Nature"],["Semester","Holiday"],["Musik","Music"],["Historia","History"],["Kultur","Culture"],["Vetenskap","Science"],["Samtal","Conversation"],["Samhälle","Society"],["Framgång","Success"],["Framtid","Future"],["Kunskap","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  SWEDISH_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
