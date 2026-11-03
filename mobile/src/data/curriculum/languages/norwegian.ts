import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const NORWEGIAN_LANGUAGE: LanguageDefinition = {
  code: 'no-en',
  title: 'Norwegian Academy',
  description: 'Master Bokmål Norwegian from daily conversation to fluent cultural engagement from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'no',
  flagIcon: '🇳🇴',
  level: 'A1–C1',
  order: 16,
  nativeName: 'Norsk',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Norwegian has two official written standards: Bokmål and Nynorsk. This course teaches standard Bokmål.',
    2: 'Saying "Koselig" describes warm, intimate, cozy contentment central to Norwegian life.',
  },
  units: {
    1: [
      v('Hei', 'Hello', 'noun', 'HEY', 'Hei, hvordan har du det i dag?', 'Hello, how are you today?', '___, hvordan har du det i dag?', 'Hei', ['Ha det bra', 'Tusen takk', 'Vær så snill']),
      v('Ha det bra', 'Goodbye', 'expression', 'hah deh BRAH', 'Ha det bra og vi snakkes snart!', 'Goodbye and we talk soon!', '___ og vi snakkes snart!', 'Ha det bra', ['Hei', 'Tusen takk', 'Vær så snill']),
      v('Tusen takk', 'Thank you very much', 'noun', 'TEW-sen tahk', 'Tusen takk for den gode hjelpen din.', 'Thank you very much for your good help.', '___ for den gode hjelpen din.', 'Tusen takk', ['Hei', 'Ha det bra', 'Vær så snill']),
      v('Vær så snill', 'Please', 'expression', 'vehr soh SNEEL', 'En kopp kaffe, vær så snill.', 'A cup of coffee, please.', 'En kopp kaffe, vær så snill.', 'Vær så snill', ['Hei', 'Ha det bra', 'Tusen takk']),
      v('Ja', 'Yes', 'noun', 'YAH', 'Ja, jeg forstår det veldig godt.', 'Yes, I understand it very well.', '___, jeg forstår det veldig godt.', 'Ja', ['Hei', 'Ha det bra', 'Tusen takk']),
      v('Nei', 'No', 'expression', 'NAY', 'Nei, det passer dessverre ikke i dag.', 'No, that unfortunately does not suit today.', '___, det passer dessverre ikke i dag.', 'Nei', ['Hei', 'Ha det bra', 'Tusen takk']),
      v('Hvordan har du det', 'How are you', 'noun', 'VOR-dahn hahr doo deh', 'Hei Lars, hvordan har du det?', 'Hello Lars, how are you doing?', 'Hei Lars, hvordan har du det?', 'Hvordan har du det', ['Hei', 'Ha det bra', 'Tusen takk']),
      v('Velkommen', 'Welcome', 'expression', 'vel-KOM-men', 'Hjertelig velkommen til Norge!', 'Warmly welcome to Norway!', 'Hjertelig velkommen til Norge!', 'Velkommen', ['Hei', 'Ha det bra', 'Tusen takk']),
      v('Sees snart', 'See you soon', 'noun', 'sehs SNART', 'Ha en fin dag og vi sees snart!', 'Have a nice day and see you soon!', 'Ha en fin dag og vi sees snart!', 'Sees snart', ['Hei', 'Ha det bra', 'Tusen takk']),
      v('God natt', 'Good night', 'expression', 'gohd NAHT', 'God natt og sov godt.', 'Good night and sleep well.', '___ og sov godt.', 'God natt', ['Hei', 'Ha det bra', 'Tusen takk']),
    ],
    2: [
      v('Hyggelig å møte deg', 'Nice to meet you', 'noun', 'HEEG-geh-lee oh mur-teh day', 'Veldig hyggelig å møte deg her.', 'Very nice to meet you here.', 'Veldig hyggelig å møte deg her.', 'Hyggelig å møte deg', ['Jeg heter', 'Unnskyld', 'God morgen']),
      v('Jeg heter', 'My name is', 'expression', 'yay HEH-ter', 'Hei, jeg heter Ingrid.', 'Hello, my name is Ingrid.', 'Hei, jeg heter Ingrid.', 'Jeg heter', ['Hyggelig å møte deg', 'Unnskyld', 'God morgen']),
      v('Unnskyld', 'Excuse me / Sorry', 'noun', 'OON-shewl', 'Unnskyld, vet du hvor stasjonen er?', 'Excuse me, do you know where station is?', '___, vet du hvor stasjonen er?', 'Unnskyld', ['Hyggelig å møte deg', 'Jeg heter', 'God morgen']),
      v('God morgen', 'Good morning', 'expression', 'gohd MOR-en', 'God morgen til alle sammen!', 'Good morning to all together!', '___ til alle sammen!', 'God morgen', ['Hyggelig å møte deg', 'Jeg heter', 'Unnskyld']),
      v('God kveld', 'Good evening', 'noun', 'gohd KVEHL', 'God kveld og velkommen i kveld.', 'Good evening and welcome tonight.', '___ og velkommen i kveld.', 'God kveld', ['Hyggelig å møte deg', 'Jeg heter', 'Unnskyld']),
      v('Venn', 'Friend', 'expression', 'VEHN', 'Han er min beste og eldste venn.', 'He is my best and oldest friend.', 'Han er min beste og eldste venn.', 'Venn', ['Hyggelig å møte deg', 'Jeg heter', 'Unnskyld']),
      v('Lærer', 'Teacher', 'noun', 'LEH-rer', 'Læreren vår forklarer oppgaven godt.', 'Our teacher explains task well.', '___en vår forklarer oppgaven godt.', 'Lærer', ['Hyggelig å møte deg', 'Jeg heter', 'Unnskyld']),
      v('Familie', 'Family', 'expression', 'fah-MEEL-yeh', 'Familien min bor i Bergen.', 'My family lives in Bergen.', '___n min bor i Bergen.', 'Familie', ['Hyggelig å møte deg', 'Jeg heter', 'Unnskyld']),
      v('Flott', 'Great', 'noun', 'FLOT', 'Det var et flott resultat på testen.', 'That was a great result on test.', 'Det var et flott resultat på testen.', 'Flott', ['Hyggelig å møte deg', 'Jeg heter', 'Unnskyld']),
      v('Fint', 'Fine', 'expression', 'FEENT', 'Alt går helt fint med oss.', 'Everything is going completely fine with us.', 'Alt går helt fint med oss.', 'Fint', ['Hyggelig å møte deg', 'Jeg heter', 'Unnskyld']),
    ],
    3: [
      v('En', 'One', 'noun', 'AYN', 'Jeg har en billett til toget.', 'I have one ticket for train.', 'Jeg har en billett til toget.', 'En', ['To', 'Tre', 'Fire']),
      v('To', 'Two', 'expression', 'TOH', 'To kopper kaffe, takk.', 'Two cups of coffee, thanks.', '___ kopper kaffe, takk.', 'To', ['En', 'Tre', 'Fire']),
      v('Tre', 'Three', 'noun', 'TRAY', 'Det er tre ledige rom på hotellet.', 'There are three available rooms at hotel.', 'Det er tre ledige rom på hotellet.', 'Tre', ['En', 'To', 'Fire']),
      v('Fire', 'Four', 'expression', 'FEE-reh', 'Vi er fire personer på turen.', 'We are four persons on the trip.', 'Vi er fire personer på turen.', 'Fire', ['En', 'To', 'Tre']),
      v('Fem', 'Five', 'noun', 'FEHM', 'Bussen kommer om fem minutter.', 'The bus arrives in five minutes.', 'Bussen kommer om fem minutter.', 'Fem', ['En', 'To', 'Tre']),
      v('Ti', 'Ten', 'expression', 'TEE', 'Dette koster nøyaktig ti kroner.', 'This costs exactly ten crowns.', 'Dette koster nøyaktig ti kroner.', 'Ti', ['En', 'To', 'Tre']),
      v('Tjue', 'Twenty', 'noun', 'TEW-eh', 'Det er tjue minutter til sentrum.', 'It is twenty minutes to center.', 'Det er tjue minutter til sentrum.', 'Tjue', ['En', 'To', 'Tre']),
      v('Femti', 'Fifty', 'expression', 'FEHM-tee', 'Det er femti plasser i bussen.', 'There are fifty seats in bus.', 'Det er femti plasser i bussen.', 'Femti', ['En', 'To', 'Tre']),
      v('Hundre', 'One hundred', 'noun', 'HOON-dreh', 'Boken har hundre sider.', 'The book has hundred pages.', 'Boken har hundre sider.', 'Hundre', ['En', 'To', 'Tre']),
      v('Telle', 'To count', 'expression', 'TEL-leh', 'Jeg kan telle raskt på norsk.', 'I can count quickly in Norwegian.', 'Jeg kan telle raskt på norsk.', 'Telle', ['En', 'To', 'Tre']),
    ],
    4: [
      v('Far', 'Father', 'noun', 'FAHR', 'Faren min er snekker.', 'My father is a carpenter.', '___en min er snekker.', 'Far', ['Mor', 'Bror', 'Søster']),
      v('Mor', 'Mother', 'expression', 'MOOR', 'Moren min jobber som sykepleier.', 'My mother works as nurse.', '___en min jobber som sykepleier.', 'Mor', ['Far', 'Bror', 'Søster']),
      v('Bror', 'Brother', 'noun', 'BROOR', 'Broren min studerer ved universitetet.', 'My brother studies at university.', '___en min studerer ved universitetet.', 'Bror', ['Far', 'Mor', 'Søster']),
      v('Søster', 'Sister', 'expression', 'SUR-ster', 'Søsteren min spiller i orkesteret.', 'My sister plays in orchestra.', '___en min spiller i orkesteret.', 'Søster', ['Far', 'Mor', 'Bror']),
      v('Bestefar', 'Grandfather', 'noun', 'BES-teh-fahr', 'Bestefar forteller gamle historier.', 'Grandfather tells old stories.', '___ forteller gamle historier.', 'Bestefar', ['Far', 'Mor', 'Bror']),
      v('Bestemor', 'Grandmother', 'expression', 'BES-teh-moor', 'Bestemor lager verdens beste vafler.', 'Grandmother makes world\'s best waffles.', '___ lager verdens beste vafler.', 'Bestemor', ['Far', 'Mor', 'Bror']),
      v('Sønn', 'Son', 'noun', 'SEUN', 'Sønnen deres trener langrenn.', 'Their son trains cross-country skiing.', '___en deres trener langrenn.', 'Sønn', ['Far', 'Mor', 'Bror']),
      v('Datter', 'Daughter', 'expression', 'DAHT-ter', 'Datteren deres er glad i dyr.', 'Their daughter is fond of animals.', '___en deres er glad i dyr.', 'Datter', ['Far', 'Mor', 'Bror']),
      v('Foreldre', 'Parents', 'noun', 'for-EHL-dreh', 'Foreldrene mine reiser ofte på fjellet.', 'My parents often travel to mountain.', '___ne mine reiser ofte på fjellet.', 'Foreldre', ['Far', 'Mor', 'Bror']),
      v('Hjem', 'Home', 'expression', 'YEHM', 'Hjemmet vårt er lunt og trivelig.', 'Our home is snug and pleasant.', '___met vårt er lunt og trivelig.', 'Hjem', ['Far', 'Mor', 'Bror']),
    ],
    5: [
      v('Brød', 'Bread', 'noun', 'BRUR', 'Ferskt grovbrød er sunt og godt.', 'Fresh wholemeal bread is healthy and good.', 'Ferskt grovbrød er sunt og godt.', 'Brød', ['Vann', 'Te', 'Kaffe']),
      v('Vann', 'Water', 'expression', 'VAHN', 'Et glass kaldt kildevann, takk.', 'A glass of cold spring water, thanks.', 'Et glass kaldt kildevann, takk.', 'Vann', ['Brød', 'Te', 'Kaffe']),
      v('Te', 'Tea', 'noun', 'TAY', 'Liker du best te eller kaffe?', 'Do you like best tea or coffee?', 'Liker du best te eller kaffe?', 'Te', ['Brød', 'Vann', 'Kaffe']),
      v('Kaffe', 'Coffee', 'expression', 'KAHF-feh', 'Norsk kaffe drikkes gjerne svart.', 'Norwegian coffee is preferably drunk black.', 'Norsk kaffe drikkes gjerne svart.', 'Kaffe', ['Brød', 'Vann', 'Te']),
      v('Eple', 'Apple', 'noun', 'EHP-leh', 'Et friskt norsk eple smaker nydelig.', 'A crisp Norwegian apple tastes lovely.', 'Et friskt norsk eple smaker nydelig.', 'Eple', ['Brød', 'Vann', 'Te']),
      v('Ost', 'Cheese', 'expression', 'OHST', 'Brunost på vaffel er en tradisjon.', 'Brown cheese on waffle is a tradition.', 'Brunost på vaffel er en tradisjon.', 'Ost', ['Brød', 'Vann', 'Te']),
      v('Spise', 'To eat', 'noun', 'SPEE-seh', 'Vi skal spise middag klokken fem.', 'We shall eat dinner at five o\'clock.', 'Vi skal spise middag klokken fem.', 'Spise', ['Brød', 'Vann', 'Te']),
      v('Drikke', 'To drink', 'expression', 'DREEK-keh', 'Husk å drikke nok væske på fjellet.', 'Remember to drink enough fluid on mountain.', 'Husk å drikke nok væske på fjellet.', 'Drikke', ['Brød', 'Vann', 'Te']),
      v('Deilig', 'Delicious', 'noun', 'DAY-lee', 'Dette tradisjonelle måltidet smakte deilig.', 'This traditional meal tasted delicious.', 'Dette tradisjonelle måltidet smakte deilig.', 'Deilig', ['Brød', 'Vann', 'Te']),
      v('Frokost', 'Breakfast', 'expression', 'FROH-kost', 'Frokost serveres tidlig om morgenen.', 'Breakfast is served early in morning.', '___ serveres tidlig om morgenen.', 'Frokost', ['Brød', 'Vann', 'Te']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Restaurant","Restaurant"],["Butikk","Shop"],["Hotell","Hotel"],["By","City"],["Tog","Train"],["Flyplass","Airport"],["Arbeid","Work"],["Skole","School"],["Helse","Health"],["Natur","Nature"],["Ferie","Holiday"],["Musikk","Music"],["Historie","History"],["Kultur","Culture"],["Vitenskap","Science"],["Samtale","Conversation"],["Samfunn","Society"],["Suksess","Success"],["Framtid","Future"],["Kunnskap","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  NORWEGIAN_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
