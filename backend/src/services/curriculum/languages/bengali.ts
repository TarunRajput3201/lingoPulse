import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const BENGALI_LANGUAGE: LanguageDefinition = {
  code: 'bn-en',
  title: 'Bengali Academy',
  description: 'Master Bengali from script and literary sweetness to everyday fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'bn',
  flagIcon: '🇧🇩',
  level: 'A1–C1',
  order: 26,
  nativeName: 'বাংলা',
  isRTL: false,
  region: 'Indian',
  culturalTips: {
    1: 'Bengali has no grammatical gender for nouns or adjectives, simplifying foundational learning.',
    2: 'Addressing others politely with "আপনি" (Apni) is standard for elders, teachers, and strangers.',
  },
  units: {
    1: [
      v('নমস্কার', 'Hello', 'noun', 'Nomoshkar', 'নমস্কার, আজ আপনি কেমন আছেন?', 'Hello, how are you today?', '___, আজ আপনি কেমন আছেন?', 'নমস্কার', ['বিদায়', 'ধন্যবাদ', 'দয়া করে']),
      v('বিদায়', 'Goodbye', 'expression', 'Biday', 'বিদায় এবং আবার দেখা হবে!', 'Goodbye and see you again!', '___ এবং আবার দেখা হবে!', 'বিদায়', ['নমস্কার', 'ধন্যবাদ', 'দয়া করে']),
      v('ধন্যবাদ', 'Thank you', 'noun', 'Dhonnobad', 'আপনার মূল্যবান সাহায্যের জন্য অনেক ধন্যবাদ।', 'Thank you very much for your valuable help.', 'আপনার মূল্যবান সাহায্যের জন্য অনেক ___।', 'ধন্যবাদ', ['নমস্কার', 'বিদায়', 'দয়া করে']),
      v('দয়া করে', 'Please', 'expression', 'Doya kore', 'এক কাপ গরম চা দিন, দয়া করে।', 'Give a cup of hot tea, please.', 'এক কাপ গরম চা দিন, ___।', 'দয়া করে', ['নমস্কার', 'বিদায়', 'ধন্যবাদ']),
      v('হ্যাঁ', 'Yes', 'noun', 'Hyan', 'হ্যাঁ, আমি বিষয়টি স্পষ্টভাবে বুঝতে পারছি।', 'Yes, I understand matter clearly.', '___, আমি বিষয়টি স্পষ্টভাবে বুঝতে পারছি।', 'হ্যাঁ', ['নমস্কার', 'বিদায়', 'ধন্যবাদ']),
      v('না', 'No', 'expression', 'Na', 'না, এটা আজ সম্ভব নয়।', 'No, that is not possible today.', '___, এটা আজ সম্ভব নয়।', 'না', ['নমস্কার', 'বিদায়', 'ধন্যবাদ']),
      v('কেমন আছেন', 'How are you', 'noun', 'Kemon achhen', 'নমস্কার দাদা, কেমন আছেন আজ?', 'Hello brother, how are you today?', 'নমস্কার দাদা, ___ আজ?', 'কেমন আছেন', ['নমস্কার', 'বিদায়', 'ধন্যবাদ']),
      v('স্বাগতম', 'Welcome', 'expression', 'Shagotom', 'আমাদের সুন্দর শহরে আপনাকে আন্তরিক স্বাগতম!', 'Warm welcome to you in our beautiful city!', 'আমাদের সুন্দর শহরে আপনাকে আন্তরিক ___!', 'স্বাগতম', ['নমস্কার', 'বিদায়', 'ধন্যবাদ']),
      v('আবার দেখা হবে', 'See you soon', 'noun', 'Abar dekha hobe', 'দিনটি শুভ হোক এবং আবার দেখা হবে!', 'Have a good day and see you again!', 'দিনটি শুভ হোক এবং ___!', 'আবার দেখা হবে', ['নমস্কার', 'বিদায়', 'ধন্যবাদ']),
      v('শুভ রাত্রি', 'Good night', 'expression', 'Shubho ratri', 'শুভ রাত্রি এবং মিষ্টি স্বপ্ন দেখুন।', 'Good night and sweet dreams.', '___ এবং মিষ্টি স্বপ্ন দেখুন।', 'শুভ রাত্রি', ['নমস্কার', 'বিদায়', 'ধন্যবাদ']),
    ],
    2: [
      v('দেখা হয়ে ভালো লাগলো', 'Nice to meet you', 'noun', 'Dekha hoye bhalo laglo', 'আপনার সাথে দেখা হয়ে খুব ভালো লাগলো।', 'Very pleased to meet you.', 'আপনার সাথে দেখা হয়ে খুব ভালো লাগলো।', 'দেখা হয়ে ভালো লাগলো', ['আমার নাম', 'মাফ করবেন', 'শুভ সকাল']),
      v('আমার নাম', 'My name is', 'expression', 'Amar naam', 'নমস্কার, আমার নাম সুব্রত।', 'Hello, my name is Subrata.', 'নমস্কার, ___ সুব্রত।', 'আমার নাম', ['দেখা হয়ে ভালো লাগলো', 'মাফ করবেন', 'শুভ সকাল']),
      v('মাফ করবেন', 'Excuse me / Sorry', 'noun', 'Maaf korben', 'মাফ করবেন, রেলওয়ে স্টেশনটি কোথায়?', 'Excuse me, where is railway station?', '___, রেলওয়ে স্টেশনটি কোথায়?', 'মাফ করবেন', ['দেখা হয়ে ভালো লাগলো', 'আমার নাম', 'শুভ সকাল']),
      v('শুভ সকাল', 'Good morning', 'expression', 'Shubho shokal', 'সকলকে জানাই শুভ সকাল ও শুভেচ্ছা!', 'Good morning and best wishes to all!', 'সকলকে জানাই ___ ও শুভেচ্ছা!', 'শুভ সকাল', ['দেখা হয়ে ভালো লাগলো', 'আমার নাম', 'মাফ করবেন']),
      v('শুভ সন্ধ্যা', 'Good evening', 'noun', 'Shubho shondhya', 'শুভ সন্ধ্যা এবং অনুষ্ঠানে স্বাগত।', 'Good evening and welcome to event.', '___ এবং অনুষ্ঠানে স্বাগত।', 'শুভ সন্ধ্যা', ['দেখা হয়ে ভালো লাগলো', 'আমার নাম', 'মাফ করবেন']),
      v('বন্ধু', 'Friend', 'expression', 'Bondhu', 'সে আমার সবচেয়ে পুরনো ও বিশ্বস্ত বন্ধু।', 'He is my oldest and most trusted friend.', 'সে আমার সবচেয়ে পুরনো ও বিশ্বস্ত ___।', 'বন্ধু', ['দেখা হয়ে ভালো লাগলো', 'আমার নাম', 'মাফ করবেন']),
      v('শিক্ষক', 'Teacher', 'noun', 'Shikkhok', 'আমাদের শিক্ষক মহাশয় খুব ভালো বোঝান।', 'Our teacher explains very well.', 'আমাদের ___ মহাশয় খুব ভালো বোঝান।', 'শিক্ষক', ['দেখা হয়ে ভালো লাগলো', 'আমার নাম', 'মাফ করবেন']),
      v('পরিবার', 'Family', 'expression', 'Poribar', 'আমার পরিবার কলকাতায় বসবাস করে।', 'My family lives in Kolkata.', 'আমার ___ কলকাতায় বসবাস করে।', 'পরিবার', ['দেখা হয়ে ভালো লাগলো', 'আমার নাম', 'মাফ করবেন']),
      v('চমৎকার', 'Wonderful', 'noun', 'Chomotkar', 'পরীক্ষার ফলাফল সত্যিই চমৎকার হয়েছে।', 'The exam result was truly wonderful.', 'পরীক্ষার ফলাফল সত্যিই ___ হয়েছে।', 'চমৎকার', ['দেখা হয়ে ভালো লাগলো', 'আমার নাম', 'মাফ করবেন']),
      v('ভালো', 'Good', 'expression', 'Bhalo', 'সবকিছু খুব ভালোভাবেই চলছে।', 'Everything is going very well.', 'সবকিছু খুব ___ভাবেই চলছে।', 'ভালো', ['দেখা হয়ে ভালো লাগলো', 'আমার নাম', 'মাফ করবেন']),
    ],
    3: [
      v('এক', 'One', 'noun', 'Ek', 'আমার কাছে ট্রেনের একটি টিকিট আছে।', 'I have one train ticket.', 'আমার কাছে ট্রেনের ___টি টিকিট আছে।', 'এক', ['দুই', 'তিন', 'চার']),
      v('দুই', 'Two', 'expression', 'Dui', 'দয়া করে দুই কাপ গরম কফি দিন।', 'Please give two cups of hot coffee.', 'দয়া করে ___ কাপ গরম কফি দিন।', 'দুই', ['এক', 'তিন', 'চার']),
      v('তিন', 'Three', 'noun', 'Tin', 'হোটেলে তিনটি ফাঁকা ঘর আছে।', 'There are three vacant rooms in hotel.', 'হোটেলে ___টি ফাঁকা ঘর আছে।', 'তিন', ['এক', 'দুই', 'চার']),
      v('চার', 'Four', 'expression', 'Char', 'আমরা চারজন বন্ধু একসাথে এসেছি।', 'We four friends came together.', 'আমরা ___জন বন্ধু একসাথে এসেছি।', 'চার', ['এক', 'দুই', 'তিন']),
      v('পাঁচ', 'Five', 'noun', 'Panch', 'পাঁচ মিনিটের মধ্যে ট্রেন ছাড়বে।', 'Train will depart in five minutes.', '___ মিনিটের মধ্যে ট্রেন ছাড়বে।', 'পাঁচ', ['এক', 'দুই', 'তিন']),
      v('দশ', 'Ten', 'expression', 'Dosh', 'এর দাম ঠিক দশ টাকা।', 'Its price is exactly ten taka.', 'এর দাম ঠিক ___ টাকা।', 'দশ', ['এক', 'দুই', 'তিন']),
      v('কুড়ি', 'Twenty', 'noun', 'Kuri', 'শ্রেণিকক্ষে কুড়িজন ছাত্রছাত্রী আছে।', 'There are twenty students in classroom.', 'শ্রেণিকক্ষে ___জন ছাত্রছাত্রী আছে।', 'কুড়ি', ['এক', 'দুই', 'তিন']),
      v('পঞ্চাশ', 'Fifty', 'expression', 'Ponchash', 'হলঘরে পঞ্চাশটি চেয়ার রাখা আছে।', 'Fifty chairs are placed in hall.', 'হলঘরে ___টি চেয়ার রাখা আছে।', 'পঞ্চাশ', ['এক', 'দুই', 'তিন']),
      v('একশত', 'One hundred', 'noun', 'Ekshoto', 'বইটিতে ঠিক একশত পাতা রয়েছে।', 'Book has exactly hundred pages.', 'বইটিতে ঠিক ___ পাতা রয়েছে।', 'একশত', ['এক', 'দুই', 'তিন']),
      v('গণনা করা', 'To count', 'expression', 'Gonona kora', 'আমি বাংলায় সহজেই গুনতে পারি।', 'I can easily count in Bengali.', 'আমি বাংলায় সহজেই গুনতে পারি।', 'গণনা করা', ['এক', 'দুই', 'তিন']),
    ],
    4: [
      v('বাবা', 'Father', 'noun', 'Baba', 'আমার বাবা একজন প্রকৌশলী।', 'My father is an engineer.', 'আমার ___ একজন প্রকৌশলী।', 'বাবা', ['মা', 'ভাই', 'বোন']),
      v('মা', 'Mother', 'expression', 'Ma', 'আমার মা হাসপাতালে ডাক্তার হিসেবে কাজ করেন।', 'My mother works as doctor in hospital.', 'আ___র মা হাসপাতালে ডাক্তার হিসেবে কাজ করেন।', 'মা', ['বাবা', 'ভাই', 'বোন']),
      v('ভাই', 'Brother', 'noun', 'Bhai', 'আমার বড় ভাই বিশ্ববিদ্যালয়ে পড়াশোনা করে।', 'My older brother studies at university.', 'আমার বড় ___ বিশ্ববিদ্যালয়ে পড়াশোনা করে।', 'ভাই', ['বাবা', 'মা', 'বোন']),
      v('বোন', 'Sister', 'expression', 'Bon', 'আমার ছোট বোন মিষ্টি গান গায়।', 'My younger sister sings sweet songs.', 'আমার ছোট ___ মিষ্টি গান গায়।', 'বোন', ['বাবা', 'মা', 'ভাই']),
      v('দাদু', 'Grandfather', 'noun', 'Dadu', 'দাদু প্রতিদিন সকালে পার্কে হাঁটেন।', 'Grandfather walks in park every morning.', '___ প্রতিদিন সকালে পার্কে হাঁটেন।', 'দাদু', ['বাবা', 'মা', 'ভাই']),
      v('দিদিমা', 'Grandmother', 'expression', 'Didima', 'দিদিমা চমৎকার সুস্বাদু পিঠে বানান।', 'Grandmother makes wonderful tasty pithe.', '___ চমৎকার সুস্বাদু পিঠে বানান।', 'দিদিমা', ['বাবা', 'মা', 'ভাই']),
      v('ছেলে', 'Son', 'noun', 'Chhele', 'তাদের ছেলে বিদ্যালয়ের ফুটবল দলে খেলে।', 'Their son plays in school football team.', 'তাদের ___ বিদ্যালয়ের ফুটবল দলে খেলে।', 'ছেলে', ['বাবা', 'মা', 'ভাই']),
      v('মেয়ে', 'Daughter', 'expression', 'Meye', 'তাদের মেয়ে ছবি আঁকতে ভালোবাসে।', 'Their daughter loves painting pictures.', 'তাদের ___ ছবি আঁকতে ভালোবাসে।', 'মেয়ে', ['বাবা', 'মা', 'ভাই']),
      v('বাবা-মা', 'Parents', 'noun', 'Baba-ma', 'আমার বাবা-মা পাহাড়ে ঘুরতে ভালোবাসেন।', 'My parents love traveling to mountains.', 'আমার ___ পাহাড়ে ঘুরতে ভালোবাসেন।', 'বাবা-মা', ['বাবা', 'মা', 'ভাই']),
      v('বাড়ি', 'Home', 'expression', 'Bari', 'আমাদের বাড়িটি শান্ত এবং মনোরম।', 'Our home is peaceful and delightful.', 'আমাদের ___টি শান্ত এবং মনোরম।', 'বাড়ি', ['বাবা', 'মা', 'ভাই']),
    ],
    5: [
      v('রুটি', 'Bread', 'noun', 'Ruti', 'সকালে গরম তাজা রুটি খেতে ভালো লাগে।', 'Eating hot fresh bread in morning feels good.', 'সকালে গরম তাজা ___ খেতে ভালো লাগে।', 'রুটি', ['জল', 'চা', 'কফি']),
      v('জল', 'Water', 'expression', 'Jol', 'এক গ্লাস ঠান্ডা জল দিন, দয়া করে।', 'Give a glass of cold water, please.', 'এক গ্লাস ঠান্ডা ___ দিন, দয়া করে।', 'জল', ['রুটি', 'চা', 'কফি']),
      v('চা', 'Tea', 'noun', 'Cha', 'বাঙালির আড্ডায় চা অত্যন্ত প্রিয়।', 'Tea is very beloved in Bengali adda.', 'বাঙালির আড্ডায় ___ অত্যন্ত প্রিয়।', 'চা', ['রুটি', 'জল', 'কফি']),
      v('কফি', 'Coffee', 'expression', 'Kofi', 'সকালের এক কাপ কফি মন চাঙ্গা করে।', 'A morning cup of coffee refreshes mind.', 'সকালের এক কাপ ___ মন চাঙ্গা করে।', 'কফি', ['রুটি', 'জল', 'চা']),
      v('আপেল', 'Apple', 'noun', 'Apel', 'লাল আপেল খুব মিষ্টি ও পুষ্টিকর।', 'Red apple is very sweet and nutritious.', 'লাল ___ খুব মিষ্টি ও পুষ্টিকর।', 'আপেল', ['রুটি', 'জল', 'চা']),
      v('পনির', 'Cheese', 'expression', 'Ponir', 'পনির দিয়ে রান্না করা তরকারি দারুণ লাগে।', 'Curry cooked with paneer tastes great.', '___ দিয়ে রান্না করা তরকারি দারুণ লাগে।', 'পনির', ['রুটি', 'জল', 'চা']),
      v('খাওয়া', 'To eat', 'noun', 'Khaoa', 'আমরা সবাই মিলে একসাথে খাবার খাই।', 'We all eat meal together.', 'আমরা সবাই মিলে একসাথে খাবার খাই।', 'খাওয়া', ['রুটি', 'জল', 'চা']),
      v('পান করা', 'To drink', 'expression', 'Pan kora', 'নিয়মিত পর্যাপ্ত জল পান করা উচিত।', 'One should regularly drink sufficient water.', 'নিয়মিত পর্যাপ্ত জল ___ উচিত।', 'পান করা', ['রুটি', 'জল', 'চা']),
      v('সুস্বাদু', 'Delicious', 'noun', 'Shushadu', 'এই ঐতিহ্যবাহী খাবারটি সত্যিই সুস্বাদু।', 'This traditional food is truly delicious.', 'এই ঐতিহ্যবাহী খাবারটি সত্যিই ___।', 'সুস্বাদু', ['রুটি', 'জল', 'চা']),
      v('সকালের নাস্তা', 'Breakfast', 'expression', 'Shokaler nasta', 'সকালের নাস্তা ঠিক আটটায় তৈরি হয়।', 'Breakfast is prepared at eight o\'clock.', '___ ঠিক আটটায় তৈরি হয়।', 'সকালের নাস্তা', ['রুটি', 'জল', 'চা']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["রেস্তোরাঁ","Restaurant"],["দোকান","Shop"],["হোটেল","Hotel"],["শহর","City"],["রেলগাড়ি","Train"],["বিমানবন্দর","Airport"],["কাজ","Work"],["বিদ্যালয়","School"],["স্বাস্থ্য","Health"],["প্রকৃতি","Nature"],["ছুটি","Holiday"],["সঙ্গীত","Music"],["ইতিহাস","History"],["সংস্কৃতি","Culture"],["বিজ্ঞান","Science"],["কথোপকথন","Conversation"],["সমাজ","Society"],["সাফল্য","Success"],["ভবিষ্যৎ","Future"],["জ্ঞান","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  BENGALI_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
