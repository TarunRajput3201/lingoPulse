import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const POLISH_LANGUAGE: LanguageDefinition = {
  code: 'pl-en',
  title: 'Polish Academy',
  description: 'Master Polish from consonant clusters and cases to advanced literary and professional fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'pl',
  flagIcon: '🇵🇱',
  level: 'A1–C1',
  order: 18,
  nativeName: 'Polski',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Polish has 7 grammatical cases and rich consonant digraphs like sz, cz, rz, and ch.',
    2: 'Use "Pan" (Sir) and "Pani" (Madam) with the 3rd person verb for polite address in daily life.',
  },
  units: {
    1: [
      v('Dzień dobry', 'Good day / Hello', 'noun', 'JEHN DOH-brih', 'Dzień dobry, jak się Pan dzisiaj miewa?', 'Good day, how are you doing today?', '___, jak się Pan dzisiaj miewa?', 'Dzień dobry', ['Do widzenia', 'Dziękuję', 'Proszę']),
      v('Do widzenia', 'Goodbye', 'expression', 'doh veed-ZEH-nyah', 'Do widzenia i do miłego zobaczenia!', 'Goodbye and see you soon!', '___ i do miłego zobaczenia!', 'Do widzenia', ['Dzień dobry', 'Dziękuję', 'Proszę']),
      v('Dziękuję', 'Thank you', 'noun', 'jehn-KOO-yeh', 'Bardzo dziękuję za Twoją bezcenną pomoc.', 'Thank you very much for your priceless help.', 'Bardzo dziękuję za Twoją bezcenną pomoc.', 'Dziękuję', ['Dzień dobry', 'Do widzenia', 'Proszę']),
      v('Proszę', 'Please / Here you go', 'expression', 'PROH-sheh', 'Filiżankę gorącej herbaty, proszę.', 'A cup of hot tea, please.', 'Filiżankę gorącej herbaty, proszę.', 'Proszę', ['Dzień dobry', 'Do widzenia', 'Dziękuję']),
      v('Tak', 'Yes', 'noun', 'TAHK', 'Tak, rozumiem to bardzo dokładnie.', 'Yes, I understand it very precisely.', '___, rozumiem to bardzo dokładnie.', 'Tak', ['Dzień dobry', 'Do widzenia', 'Dziękuję']),
      v('Nie', 'No', 'expression', 'NYEH', 'Nie, to dzisiaj niestety nie jest możliwe.', 'No, that is unfortunately not possible today.', '___, to dzisiaj niestety nie jest możliwe.', 'Nie', ['Dzień dobry', 'Do widzenia', 'Dziękuję']),
      v('Jak się masz', 'How are you', 'noun', 'yahk sheh MAHSH', 'Cześć Anna, jak się dzisiaj masz?', 'Hi Anna, how are you today?', 'Cześć Anna, jak się dzisiaj masz?', 'Jak się masz', ['Dzień dobry', 'Do widzenia', 'Dziękuję']),
      v('Witamy', 'Welcome', 'expression', 'vee-TAH-mih', 'Serdecznie witamy w naszym pięknym mieście!', 'Warmly welcome to our beautiful city!', 'Serdecznie witamy w naszym pięknym mieście!', 'Witamy', ['Dzień dobry', 'Do widzenia', 'Dziękuję']),
      v('Do zobaczenia', 'See you soon', 'noun', 'doh zoh-bah-CHEH-nyah', 'Miłego dnia i do zobaczenia wkrótce!', 'Have a nice day and see you soon!', 'Miłego dnia i do zobaczenia wkrótce!', 'Do zobaczenia', ['Dzień dobry', 'Do widzenia', 'Dziękuję']),
      v('Dobranoc', 'Good night', 'expression', 'doh-BRAH-nohts', 'Dobranoc i życzę spokojnych snów.', 'Good night and I wish you peaceful dreams.', '___ i życzę spokojnych snów.', 'Dobranoc', ['Dzień dobry', 'Do widzenia', 'Dziękuję']),
    ],
    2: [
      v('Miło cię poznać', 'Nice to meet you', 'noun', 'MEE-woh chyeh POHZ-nahch', 'Bardzo miło mi cię poznać.', 'Very nice to meet you.', 'Bardzo miło mi cię poznać.', 'Miło cię poznać', ['Nazywam się', 'Przepraszam', 'Dzień dobry rano']),
      v('Nazywam się', 'My name is', 'expression', 'nah-ZIH-vahm sheh', 'Cześć, nazywam się Michał.', 'Hello, my name is Michal.', 'Cześć, nazywam się Michał.', 'Nazywam się', ['Miło cię poznać', 'Przepraszam', 'Dzień dobry rano']),
      v('Przepraszam', 'Excuse me / Sorry', 'noun', 'psheh-PRAH-shahm', 'Przepraszam, gdzie znajduje się dworzec?', 'Excuse me, where is the station located?', '___, gdzie znajduje się dworzec?', 'Przepraszam', ['Miło cię poznać', 'Nazywam się', 'Dzień dobry rano']),
      v('Dzień dobry rano', 'Good morning', 'expression', 'JEHN DOH-brih RAH-noh', 'Dzień dobry wszystkim o poranku!', 'Good morning to everyone in morning!', 'Dzień dobry wszystkim o poranku!', 'Dzień dobry rano', ['Miło cię poznać', 'Nazywam się', 'Przepraszam']),
      v('Dobry wieczór', 'Good evening', 'noun', 'DOH-brih VYEH-choor', 'Dobry wieczór i witamy wszystkich gości.', 'Good evening and welcome to all guests.', '___ i witamy wszystkich gości.', 'Dobry wieczór', ['Miło cię poznać', 'Nazywam się', 'Przepraszam']),
      v('Przyjaciel', 'Friend', 'expression', 'pshih-YAH-chel', 'On jest moim najwierniejszym przyjacielem.', 'He is my most faithful friend.', 'On jest moim najwierniejszym przyjacielem.', 'Przyjaciel', ['Miło cię poznać', 'Nazywam się', 'Przepraszam']),
      v('Nauczyciel', 'Teacher', 'noun', 'now-chih-CHEL', 'Nasz nauczyciel tłumaczy gramatykę zrozumiale.', 'Our teacher explains grammar understandably.', 'Nasz nauczyciel tłumaczy gramatykę zrozumiale.', 'Nauczyciel', ['Miło cię poznać', 'Nazywam się', 'Przepraszam']),
      v('Rodzina', 'Family', 'expression', 'roh-JEE-nah', 'Moja rodzina mieszka w Krakowie.', 'My family lives in Krakow.', 'Moja rodzina mieszka w Krakowie.', 'Rodzina', ['Miło cię poznać', 'Nazywam się', 'Przepraszam']),
      v('Świetnie', 'Great', 'noun', 'SHFYEHT-nyeh', 'Egzamin poszedł po prostu świetnie.', 'The exam went simply great.', 'Egzamin poszedł po prostu świetnie.', 'Świetnie', ['Miło cię poznać', 'Nazywam się', 'Przepraszam']),
      v('Dobrze', 'Good', 'expression', 'DOHB-zheh', 'Wszystko układa się bardzo dobrze.', 'Everything is going very well.', 'Wszystko układa się bardzo dobrze.', 'Dobrze', ['Miło cię poznać', 'Nazywam się', 'Przepraszam']),
    ],
    3: [
      v('Jeden', 'One', 'noun', 'YEH-den', 'Kupiłem jeden bilet na pociąg.', 'I bought one ticket for train.', 'Kupiłem jeden bilet na pociąg.', 'Jeden', ['Dwa', 'Trzy', 'Cztery']),
      v('Dwa', 'Two', 'expression', 'DFAH', 'Dwie kawy z mlekiem, proszę.', 'Two coffees with milk, please.', 'Dwie kawy z mlekiem, proszę.', 'Dwa', ['Jeden', 'Trzy', 'Cztery']),
      v('Trzy', 'Three', 'noun', 'TSHIH', 'W hotelu są trzy wolne pokoje.', 'In hotel there are three vacant rooms.', 'W hotelu są trzy wolne pokoje.', 'Trzy', ['Jeden', 'Dwa', 'Cztery']),
      v('Cztery', 'Four', 'expression', 'CHTEH-rih', 'Jesteśmy w cztery osoby.', 'We are four persons.', 'Jesteśmy w cztery osoby.', 'Cztery', ['Jeden', 'Dwa', 'Trzy']),
      v('Pięć', 'Five', 'noun', 'PYEHNTCH', 'Pociąg odjeżdża za pięć minut.', 'The train departs in five minutes.', 'Pociąg odjeżdża za pięć minut.', 'Pięć', ['Jeden', 'Dwa', 'Trzy']),
      v('Dziesięć', 'Ten', 'expression', 'JEH-shehntch', 'To kosztuje dokładnie dziesięć złotych.', 'That costs exactly ten zlotys.', 'To kosztuje dokładnie dziesięć złotych.', 'Dziesięć', ['Jeden', 'Dwa', 'Trzy']),
      v('Dwadzieścia', 'Twenty', 'noun', 'dvah-JEH-shchah', 'Do muzeum jest dwadzieścia kroków.', 'To museum is twenty steps.', 'Do muzeum jest dwadzieścia kroków.', 'Dwadzieścia', ['Jeden', 'Dwa', 'Trzy']),
      v('Pięćdziesiąt', 'Fifty', 'expression', 'pyehn-jeh-SHONT', 'Na sali jest pięćdziesiąt miejsc.', 'In hall are fifty seats.', 'Na sali jest pięćdziesiąt miejsc.', 'Pięćdziesiąt', ['Jeden', 'Dwa', 'Trzy']),
      v('Sto', 'One hundred', 'noun', 'STOH', 'Ta książka liczy sto stron.', 'This book numbers hundred pages.', 'Ta książka liczy sto stron.', 'Sto', ['Jeden', 'Dwa', 'Trzy']),
      v('Liczyć', 'To count', 'expression', 'LEE-chihch', 'Umiem szybko liczyć po polsku.', 'I can count quickly in Polish.', 'Umiem szybko liczyć po polsku.', 'Liczyć', ['Jeden', 'Dwa', 'Trzy']),
    ],
    4: [
      v('Ojciec', 'Father', 'noun', 'OY-chehts', 'Mój ojciec pracuje jako inżynier.', 'My father works as engineer.', 'Mój ojciec pracuje jako inżynier.', 'Ojciec', ['Matka', 'Brat', 'Siostra']),
      v('Matka', 'Mother', 'expression', 'MAHT-kah', 'Moja matka uczy w szkole muzycznej.', 'My mother teaches in music school.', 'Moja matka uczy w szkole muzycznej.', 'Matka', ['Ojciec', 'Brat', 'Siostra']),
      v('Brat', 'Brother', 'noun', 'BRAHT', 'Mój starszy brat studiuje w Warszawie.', 'My older brother studies in Warsaw.', 'Mój starszy brat studiuje w Warszawie.', 'Brat', ['Ojciec', 'Matka', 'Siostra']),
      v('Siostra', 'Sister', 'expression', 'SHOHS-trah', 'Moja młodsza siostra uwielbia malować.', 'My younger sister loves painting.', 'Moja młodsza siostra uwielbia malować.', 'Siostra', ['Ojciec', 'Matka', 'Brat']),
      v('Dziadek', 'Grandfather', 'noun', 'JAH-dek', 'Dziadek opowiada wspaniałe historie.', 'Grandfather tells wonderful stories.', '___ opowiada wspaniałe historie.', 'Dziadek', ['Ojciec', 'Matka', 'Brat']),
      v('Babcia', 'Grandmother', 'expression', 'BAHP-chah', 'Babcia piecze najlepsze pierniki.', 'Grandmother bakes the best gingerbread.', '___ piecze najlepsze pierniki.', 'Babcia', ['Ojciec', 'Matka', 'Brat']),
      v('Syn', 'Son', 'noun', 'SIHN', 'Ich syn gra w reprezentacji szkoły.', 'Their son plays in school team.', 'Ich syn gra w reprezentacji szkoły.', 'Syn', ['Ojciec', 'Matka', 'Brat']),
      v('Córka', 'Daughter', 'expression', 'TSOOR-kah', 'Ich córka uczy się języków obcych.', 'Their daughter learns foreign languages.', 'Ich córka uczy się języków obcych.', 'Córka', ['Ojciec', 'Matka', 'Brat']),
      v('Rodzice', 'Parents', 'noun', 'roh-JEE-tseh', 'Moi rodzice bardzo lubią podróżować.', 'My parents love traveling very much.', 'Moi rodzice bardzo lubią podróżować.', 'Rodzice', ['Ojciec', 'Matka', 'Brat']),
      v('Dom', 'Home', 'expression', 'DOHM', 'Nasz dom jest przytulny i ciepły.', 'Our home is cozy and warm.', 'Nasz dom jest przytulny i ciepły.', 'Dom', ['Ojciec', 'Matka', 'Brat']),
    ],
    5: [
      v('Chleb', 'Bread', 'noun', 'KHLEHP', 'Kupuję świeży chleb żytni rano.', 'I buy fresh rye bread in morning.', 'Kupuję świeży chleb żytni rano.', 'Chleb', ['Woda', 'Herbata', 'Kawa']),
      v('Woda', 'Water', 'expression', 'VOH-dah', 'Poproszę szklankę zimnej wody mineralnej.', 'A glass of cold mineral water, please.', 'Poproszę szklankę zimnej wody mineralnej.', 'Woda', ['Chleb', 'Herbata', 'Kawa']),
      v('Herbata', 'Tea', 'noun', 'kher-BAH-tah', 'Wolisz herbatę z cytryną czy kawę?', 'Do you prefer tea with lemon or coffee?', 'Wolisz herbatę z cytryną czy kawę?', 'Herbata', ['Chleb', 'Woda', 'Kawa']),
      v('Kawa', 'Coffee', 'expression', 'KAH-vah', 'Piję mocną czarną kawę bez cukru.', 'I drink strong black coffee without sugar.', 'Piję mocną czarną kawę bez cukru.', 'Kawa', ['Chleb', 'Woda', 'Herbata']),
      v('Jabłko', 'Apple', 'noun', 'YAHB-woh', 'Polskie jabłka są soczyste i słodkie.', 'Polish apples are juicy and sweet.', 'Polskie jabłka są soczyste i słodkie.', 'Jabłko', ['Chleb', 'Woda', 'Herbata']),
      v('Ser', 'Cheese', 'expression', 'SEHR', 'Ser z ziołami smakuje doskonale.', 'Cheese with herbs tastes perfectly.', '___ z ziołami smakuje doskonale.', 'Ser', ['Chleb', 'Woda', 'Herbata']),
      v('Jeść', 'To eat', 'noun', 'YEHSHCH', 'Będziemy jeść wspólny obiad o drugiej.', 'We will eat shared dinner at two.', 'Będziemy jeść wspólny obiad o drugiej.', 'Jeść', ['Chleb', 'Woda', 'Herbata']),
      v('Pić', 'To drink', 'expression', 'PEECH', 'Należy pić dużo wody w ciągu dnia.', 'One should drink plenty of water during day.', 'Należy pić dużo wody w ciągu dnia.', 'Pić', ['Chleb', 'Woda', 'Herbata']),
      v('Pyszny', 'Delicious', 'noun', 'PIHSH-nih', 'Tradycyjny żurek jest po prostu pyszny.', 'Traditional zurek soup is simply delicious.', 'Tradycyjny żurek jest po prostu pyszny.', 'Pyszny', ['Chleb', 'Woda', 'Herbata']),
      v('Śniadanie', 'Breakfast', 'expression', 'shnyah-DAH-nyeh', 'Śniadanie jest podawane o ósmej rano.', 'Breakfast is served at eight in morning.', '___ jest podawane o ósmej rano.', 'Śniadanie', ['Chleb', 'Woda', 'Herbata']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Restauracja","Restaurant"],["Sklep","Shop"],["Hotel","Hotel"],["Miasto","City"],["Pociąg","Train"],["Lotnisko","Airport"],["Praca","Work"],["Szkoła","School"],["Zdrowie","Health"],["Natura","Nature"],["Wakacje","Holiday"],["Muzyka","Music"],["Historia","History"],["Kultura","Culture"],["Nauka","Science"],["Rozmowa","Conversation"],["Społeczeństwo","Society"],["Sukces","Success"],["Przyszłość","Future"],["Wiedza","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  POLISH_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
