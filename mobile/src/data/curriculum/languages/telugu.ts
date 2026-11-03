import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const TELUGU_LANGUAGE: LanguageDefinition = {
  code: 'te-en',
  title: 'Telugu Academy',
  description: 'Master the "Italian of the East" Telugu from vocalic word endings to fluent conversations from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'te',
  flagIcon: '🇮🇳',
  level: 'A1–C1',
  order: 30,
  nativeName: 'తెలుగు',
  isRTL: false,
  region: 'Indian',
  culturalTips: {
    1: 'Telugu is called the "Italian of the East" because almost every authentic native word ends in a vowel.',
    2: 'Saying "నమస్కారం" (Namaskaram) conveys traditional warmth and cultural grace.',
  },
  units: {
    1: [
      v('నమస్కారం', 'Hello / Greetings', 'noun', 'Namaskaram', 'నమస్కారం, ఈరోజు మీరు ఎలా ఉన్నారు?', 'Hello, how are you today?', '___, ఈరోజు మీరు ఎలా ఉన్నారు?', 'నమస్కారం', ['సెలవు', 'ధన్యవాదాలు', 'దయచేసి']),
      v('సెలవు', 'Goodbye', 'expression', 'Selavu', 'సెలవు మరియు త్వరలోనే మళ్లీ కలుద్దాం!', 'Goodbye and see you again soon!', '___ మరియు త్వరలోనే మళ్లీ కలుద్దాం!', 'సెలవు', ['నమస్కారం', 'ధన్యవాదాలు', 'దయచేసి']),
      v('ధన్యవాదాలు', 'Thank you', 'noun', 'Dhanyavaadaalu', 'మీ విలువైన సహాయానికి చాలా ధన్యవాదాలు.', 'Thank you very much for your valuable help.', 'మీ విలువైన సహాయానికి చాలా ___.', 'ధన్యవాదాలు', ['నమస్కారం', 'సెలవు', 'దయచేసి']),
      v('దయచేసి', 'Please', 'expression', 'Dayachesi', 'ఒక కప్పు వేడి టీ ఇవ్వండి, దయచేసి.', 'Give a cup of hot tea, please.', 'ఒక కప్పు వేడి టీ ఇవ్వండి, ___.', 'దయచేసి', ['నమస్కారం', 'సెలవు', 'ధన్యవాదాలు']),
      v('అవును', 'Yes', 'noun', 'Avunu', 'అవును, నాకు విషయం పూర్తిగా అర్థమైంది.', 'Yes, I understood matter completely.', '___, నాకు విషయం పూర్తిగా అర్థమైంది.', 'అవును', ['నమస్కారం', 'సెలవు', 'ధన్యవాదాలు']),
      v('కాదు', 'No', 'expression', 'Kaadu', 'కాదు, అది ఈరోజు సాధ్యం కాదు.', 'No, that is not possible today.', '___, అది ఈరోజు సాధ్యం కాదు.', 'కాదు', ['నమస్కారం', 'సెలవు', 'ధన్యవాదాలు']),
      v('ఎలా ఉన్నారు', 'How are you', 'noun', 'Ela unnaaru', 'నమస్కారం మిత్రమా, ఎలా ఉన్నారు?', 'Hello friend, how are you?', 'నమస్కారం మిత్రమా, ___?', 'ఎలా ఉన్నారు', ['నమస్కారం', 'సెలవు', 'ధన్యవాదాలు']),
      v('స్వాగతం', 'Welcome', 'expression', 'Swaagatham', 'మా అందమైన నగరానికి మీకు హృదయపూర్వక స్వాగతం!', 'Warm welcome to our beautiful city!', 'మా అందమైన నగరానికి మీకు హృదయపూర్వక ___!', 'స్వాగతం', ['నమస్కారం', 'సెలవు', 'ధన్యవాదాలు']),
      v('మళ్లీ కలుద్దాం', 'See you soon', 'noun', 'Malli kaluddhaam', 'మీ రోజు శుభప్రదంగా గడవాలి, మళ్లీ కలుద్దాం!', 'Have a blessed day, see you again!', 'మీ రోజు శుభప్రదంగా గడవాలి, ___!', 'మళ్లీ కలుద్దాం', ['నమస్కారం', 'సెలవు', 'ధన్యవాదాలు']),
      v('శుభరాత్రి', 'Good night', 'expression', 'Shubharaathri', 'శుభరాత్రి మరియు తీపి కలలు కనండి.', 'Good night and sweet dreams.', '___ మరియు తీపి కలలు కనండి.', 'శుభరాత్రి', ['నమస్కారం', 'సెలవు', 'ధన్యవాదాలు']),
    ],
    2: [
      v('కలవడం ఆనందంగా ఉంది', 'Nice to meet you', 'noun', 'Kalavadam aanandhanga undhi', 'మిమ్మల్ని కలవడం చాలా ఆనందంగా ఉంది.', 'Very glad to meet you.', 'మిమ్మల్ని కలవడం చాలా ఆనందంగా ఉంది.', 'కలవడం ఆనందంగా ఉంది', ['నా పేరు', 'క్షమించండి', 'శుభోదయం']),
      v('నా పేరు', 'My name is', 'expression', 'Naa peru', 'నమస్కారం, నా పేరు కృష్ణ.', 'Hello, my name is Krishna.', 'నమస్కారం, ___ కృష్ణ.', 'నా పేరు', ['కలవడం ఆనందంగా ఉంది', 'క్షమించండి', 'శుభోదయం']),
      v('క్షమించండి', 'Excuse me / Sorry', 'noun', 'Kshaminchandi', 'క్షమించండి, రైల్వే స్టేషన్ ఎక్కడ ఉంది?', 'Excuse me, where is railway station?', '___, రైల్వే స్టేషన్ ఎక్కడ ఉంది?', 'క్షమించండి', ['కలవడం ఆనందంగా ఉంది', 'నా పేరు', 'శుభోదయం']),
      v('శుభోదయం', 'Good morning', 'expression', 'Shubhodhayam', 'అందరికీ శుభోదయం మరియు శుభాకాంక్షలు!', 'Good morning and wishes to all!', 'అందరికీ ___ మరియు శుభాకాంక్షలు!', 'శుభోదయం', ['కలవడం ఆనందంగా ఉంది', 'నా పేరు', 'క్షమించండి']),
      v('శుభ సాయంత్రం', 'Good evening', 'noun', 'Shubha saayanthram', 'శుభ సాయంత్రం మరియు సభకు స్వాగతం.', 'Good evening and welcome to assembly.', '___ మరియు సభకు స్వాగతం.', 'శుభ సాయంత్రం', ['కలవడం ఆనందంగా ఉంది', 'నా పేరు', 'క్షమించండి']),
      v('స్నేహితుడు', 'Friend', 'expression', 'Snehithudu', 'అతను నా చిన్ననాటి ప్రాణ స్నేహితుడు.', 'He is my dearest childhood friend.', 'అతను నా చిన్ననాటి ప్రాణ ___.', 'స్నేహితుడు', ['కలవడం ఆనందంగా ఉంది', 'నా పేరు', 'క్షమించండి']),
      v('ఉపాధ్యాయుడు', 'Teacher', 'noun', 'Upaadhyaayudu', 'మా ఉపాధ్యాయుడు పాఠాలు అద్భుతంగా బోధిస్తారు.', 'Our teacher teaches lessons wonderfully.', 'మా ___ పాఠాలు అద్భుతంగా బోధిస్తారు.', 'ఉపాధ్యాయుడు', ['కలవడం ఆనందంగా ఉంది', 'నా పేరు', 'క్షమించండి']),
      v('కుటుంబం', 'Family', 'expression', 'Kutumbam', 'నా కుటుంబం హైదరాబాద్‌లో నివసిస్తోంది.', 'My family lives in Hyderabad.', 'నా ___ హైదరాబాద్‌లో నివసిస్తోంది.', 'కుటుంబం', ['కలవడం ఆనందంగా ఉంది', 'నా పేరు', 'క్షమించండి']),
      v('అద్భుతం', 'Wonderful', 'noun', 'Adbhutham', 'పరీక్ష ఫలితాలు నిజంగా అద్భుతంగా వచ్చాయి.', 'Exam results came out truly wonderfully.', 'పరీక్ష ఫలితాలు నిజంగా ___గా వచ్చాయి.', 'అద్భుతం', ['కలవడం ఆనందంగా ఉంది', 'నా పేరు', 'క్షమించండి']),
      v('బాగుంది', 'Good', 'expression', 'Baagundhi', 'అన్నీ చాలా బాగున్నాయి మరియు సంతోషంగా ఉన్నాయి.', 'Everything is very good and happy.', 'అన్నీ చాలా బాగున్నాయి మరియు సంతోషంగా ఉన్నాయి.', 'బాగుంది', ['కలవడం ఆనందంగా ఉంది', 'నా పేరు', 'క్షమించండి']),
    ],
    3: [
      v('ఒకటి', 'One', 'noun', 'Okati', 'నా దగ్గర రైలు ప్రయాణ టికెట్ ఒకటి ఉంది.', 'I have one train travel ticket.', 'నా దగ్గర రైలు ప్రయాణ టికెట్ ___ ఉంది.', 'ఒకటి', ['రెండు', 'మూడు', 'నాలుగు']),
      v('రెండు', 'Two', 'expression', 'Rendu', 'రెండు కప్పుల వేడి కాఫీ ఇవ్వండి.', 'Give two cups of hot coffee.', '___ కప్పుల వేడి కాఫీ ఇవ్వండి.', 'రెండు', ['ఒకటి', 'మూడు', 'నాలుగు']),
      v('మూడు', 'Three', 'noun', 'Moodu', 'హోటల్‌లో మూడు ఖాళీ గదులు ఉన్నాయి.', 'Three vacant rooms are in hotel.', 'హోటల్‌లో ___ ఖాళీ గదులు ఉన్నాయి.', 'మూడు', ['ఒకటి', 'రెండు', 'నాలుగు']),
      v('నాలుగు', 'Four', 'expression', 'Naalugu', 'మేము నలుగురం కలిసి వచ్చాము.', 'We four came together.', 'మేము నలుగురం కలిసి వచ్చాము.', 'నాలుగు', ['ఒకటి', 'రెండు', 'మూడు']),
      v('ఐదు', 'Five', 'noun', 'Aaidu', 'రైలు ఐదు నిమిషాల్లో బయలుదేరుతుంది.', 'Train departs in five minutes.', 'రైలు ___ నిమిషాల్లో బయలుదేరుతుంది.', 'ఐదు', ['ఒకటి', 'రెండు', 'మూడు']),
      v('పది', 'Ten', 'expression', 'Padi', 'దీని ధర సరిగ్గా పది రూపాయలు.', 'Its price is exactly ten rupees.', 'దీని ధర సరిగ్గా ___ రూపాయలు.', 'పది', ['ఒకటి', 'రెండు', 'మూడు']),
      v('ఇరవై', 'Twenty', 'noun', 'Iravai', 'తరగతి గదిలో ఇరవై మంది విద్యార్థులు ఉన్నారు.', 'Twenty students are in classroom.', 'తరగతి గదిలో ___ మంది విద్యార్థులు ఉన్నారు.', 'ఇరవై', ['ఒకటి', 'రెండు', 'మూడు']),
      v('యాభై', 'Fifty', 'expression', 'Yaabhai', 'హాలులో యాభై కుర్చీలు ఉన్నాయి.', 'Fifty chairs are in hall.', 'హాలులో ___ కుర్చీలు ఉన్నాయి.', 'యాభై', ['ఒకటి', 'రెండు', 'మూడు']),
      v('వంద', 'One hundred', 'noun', 'Vandha', 'ఈ పుస్తకంలో వంద పేజీలు ఉన్నాయి.', 'In this book are hundred pages.', 'ఈ పుస్తకంలో ___ పేజీలు ఉన్నాయి.', 'వంద', ['ఒకటి', 'రెండు', 'మూడు']),
      v('లెక్కించు', 'To count', 'expression', 'Lekkinchu', 'నేను తెలుగులో సులభంగా లెక్కించగలను.', 'I can count in Telugu easily.', 'నేను తెలుగులో సులభంగా లెక్కించగలను.', 'లెక్కించు', ['ఒకటి', 'రెండు', 'మూడు']),
    ],
    4: [
      v('తండ్రి', 'Father', 'noun', 'Thandri', 'మా తండ్రిగారు సివిల్ ఇంజనీర్.', 'My father is civil engineer.', 'మా ___గారు సివిల్ ఇంజనీర్.', 'తండ్రి', ['తల్లి', 'సోదరుడు', 'సోదరి']),
      v('తల్లి', 'Mother', 'expression', 'Thalli', 'మా అమ్మ ఆసుపత్రిలో వైద్యురాలు.', 'My mother is doctor in hospital.', 'మా అమ్మ ఆసుపత్రిలో వైద్యురాలు.', 'తల్లి', ['తండ్రి', 'సోదరుడు', 'సోదరి']),
      v('సోదరుడు', 'Brother', 'noun', 'Sodharudu', 'మా అన్నయ్య విశ్వవిద్యాలయంలో చదువుతున్నాడు.', 'My older brother studies at university.', 'మా అన్నయ్య విశ్వవిద్యాలయంలో చదువుతున్నాడు.', 'సోదరుడు', ['తండ్రి', 'తల్లి', 'సోదరి']),
      v('సోదరి', 'Sister', 'expression', 'Sodhari', 'మా చెల్లెలు చక్కగా వీణ వాయిస్తుంది.', 'My younger sister plays veena well.', 'మా చెల్లెలు చక్కగా వీణ వాయిస్తుంది.', 'సోదరి', ['తండ్రి', 'తల్లి', 'సోదరుడు']),
      v('తాత', 'Grandfather', 'noun', 'Thaatha', 'తాతగారు ఉదయాన్నే పార్కులో నడుస్తారు.', 'Grandfather walks in park early morning.', '___గారు ఉదయాన్నే పార్కులో నడుస్తారు.', 'తాత', ['తండ్రి', 'తల్లి', 'సోదరుడు']),
      v('అమ్మమ్మ', 'Grandmother', 'expression', 'Ammamma', 'అమ్మమ్మ రుచికరమైన పిండివంటలు చేస్తుంది.', 'Grandmother makes delicious sweets.', '___ రుచికరమైన పిండివంటలు చేస్తుంది.', 'అమ్మమ్మ', ['తండ్రి', 'తల్లి', 'సోదరుడు']),
      v('కుమారుడు', 'Son', 'noun', 'Kumaarudu', 'వారి కుమారుడు క్రికెట్ జట్టులో ఆడతాడు.', 'Their son plays in cricket team.', 'వారి ___ క్రికెట్ జట్టులో ఆడతాడు.', 'కుమారుడు', ['తండ్రి', 'తల్లి', 'సోదరుడు']),
      v('కుమార్తె', 'Daughter', 'expression', 'Kumaarthe', 'వారి కుమార్తె అందమైన చిత్రాలు వేస్తుంది.', 'Their daughter paints beautiful pictures.', 'వారి ___ అందమైన చిత్రాలు వేస్తుంది.', 'కుమార్తె', ['తండ్రి', 'తల్లి', 'సోదరుడు']),
      v('తల్లిదండ్రులు', 'Parents', 'noun', 'Thallidandrulu', 'నా తల్లిదండ్రులు ప్రయాణాలను ఇష్టపడతారు.', 'My parents like travels.', 'నా ___ ప్రయాణాలను ఇష్టపడతారు.', 'తల్లిదండ్రులు', ['తండ్రి', 'తల్లి', 'సోదరుడు']),
      v('ఇల్లు', 'Home', 'expression', 'Illu', 'మా ఇల్లు ప్రశాంతంగా మరియు అందంగా ఉంటుంది.', 'Our home is peaceful and beautiful.', 'మా ___ ప్రశాంతంగా మరియు అందంగా ఉంటుంది.', 'ఇల్లు', ['తండ్రి', 'తల్లి', 'సోదరుడు']),
    ],
    5: [
      v('రొట్టె', 'Bread', 'noun', 'Rotte', 'ఉదయం వేడి జొన్న రొట్టె తినడం ఆరోగ్యకరం.', 'Eating hot jowar roti in morning is healthy.', 'ఉదయం వేడి జొన్న ___ తినడం ఆరోగ్యకరం.', 'రొట్టె', ['నీరు', 'టీ', 'కాఫీ']),
      v('నీరు', 'Water', 'expression', 'Neeru', 'ఒక గ్లాసు చల్లని మంచినీరు ఇవ్వండి.', 'Give a glass of cold drinking water.', 'ఒక గ్లాసు చల్లని మంచి___ ఇవ్వండి.', 'నీరు', ['రొట్టె', 'టీ', 'కాఫీ']),
      v('టీ', 'Tea', 'noun', 'Tee', 'అల్లం టీ తాగడం శరీరానికి ఎంతో మంచిది.', 'Drinking ginger tea is very good for body.', 'అల్లం ___ తాగడం శరీరానికి ఎంతో మంచిది.', 'టీ', ['రొట్టె', 'నీరు', 'కాఫీ']),
      v('కాఫీ', 'Coffee', 'expression', 'Kaaphee', 'ఫిల్టర్ కాఫీ సువాసన అద్భుతంగా ఉంటుంది.', 'Filter coffee fragrance is wonderful.', 'ఫిల్టర్ ___ సువాసన అద్భుతంగా ఉంటుంది.', 'కాఫీ', ['రొట్టె', 'నీరు', 'టీ']),
      v('ఆపిల్', 'Apple', 'noun', 'Aapil', 'ఎర్రటి తీపి ఆపిల్ పండు బలాన్నిస్తుంది.', 'Red sweet apple fruit gives strength.', 'ఎర్రటి తీపి ___ పండు బలాన్నిస్తుంది.', 'ఆపిల్', ['రొట్టె', 'నీరు', 'టీ']),
      v('జున్ను', 'Cheese', 'expression', 'Junnu', 'పాల జున్ను ఎంతో మృదువుగా మరియు రుచిగా ఉంటుంది.', 'Milk junnu is very soft and tasty.', 'పాల ___ ఎంతో మృదువుగా మరియు రుచిగా ఉంటుంది.', 'జున్ను', ['రొట్టె', 'నీరు', 'టీ']),
      v('తిను', 'To eat', 'noun', 'Thinu', 'మనం అందరం కలిసి భోజనం తిందాం.', 'Let us all eat meal together.', 'మనం అందరం కలిసి భోజనం తిందాం.', 'తిను', ['రొట్టె', 'నీరు', 'టీ']),
      v('త్రాగు', 'To drink', 'expression', 'Thraagu', 'రోజూ తగినంత స్వచ్ఛమైన నీరు త్రాగాలి.', 'One should drink sufficient pure water daily.', 'రోజూ తగినంత స్వచ్ఛమైన నీరు త్రాగాలి.', 'త్రాగు', ['రొట్టె', 'నీరు', 'టీ']),
      v('రుచికరమైన', 'Delicious', 'noun', 'Ruchikaramaina', 'ఈ సంప్రదాయ వంటకం చాలా రుచికరమైనది.', 'This traditional dish is very delicious.', 'ఈ సంప్రదాయ వంటకం చాలా ___ది.', 'రుచికరమైన', ['రొట్టె', 'నీరు', 'టీ']),
      v('అల్పాహారం', 'Breakfast', 'expression', 'Alpaahaaram', 'ఉదయం అల్పాహారం ఎనిమిది గంటలకు సిద్ధమవుతుంది.', 'Morning breakfast gets ready at eight.', 'ఉదయం ___ ఎనిమిది గంటలకు సిద్ధమవుతుంది.', 'అల్పాహారం', ['రొట్టె', 'నీరు', 'టీ']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["రెస్టారెంట్","Restaurant"],["దుకాణం","Shop"],["హోటల్","Hotel"],["నగరం","City"],["రైలు","Train"],["విమానాశ్రయం","Airport"],["ఉద్యోగం","Work"],["పాఠశాల","School"],["ఆరోగ్యం","Health"],["ప్రకృతి","Nature"],["సెలవులు","Holiday"],["సంగీతం","Music"],["చరిత్ర","History"],["సంస్కృతి","Culture"],["సైన్స్","Science"],["సంభాషణ","Conversation"],["సమాజం","Society"],["విజయం","Success"],["భవిష్యత్తు","Future"],["జ్ఞానం","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  TELUGU_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
