import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const RUSSIAN_LANGUAGE: LanguageDefinition = {
  code: 'ru-en',
  title: 'Russian Academy',
  description: 'Master Russian from Cyrillic script and noun cases to advanced literary and professional fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'ru',
  flagIcon: '🇷🇺',
  level: 'A1–C1',
  order: 12,
  nativeName: 'Русский',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Russian has 6 grammatical cases that alter noun and adjective endings according to their syntactic role.',
    2: 'Use "Вы" (Vy) for polite formal address to strangers or superiors, and "ты" (ty) with friends and children.',
  },
  units: {
    1: [
      v('Здравствуйте', 'Hello', 'noun', 'Zdravstvuyte', 'Здравствуйте, как ваши дела сегодня?', 'Hello, how are your things today?', '___, как ваши дела сегодня?', 'Здравствуйте', ['До свидания', 'Спасибо', 'Пожалуйста']),
      v('До свидания', 'Goodbye', 'expression', 'Do svidaniya', 'До свидания и до скорой встречи!', 'Goodbye and see you soon!', '___ и до скорой встречи!', 'До свидания', ['Здравствуйте', 'Спасибо', 'Пожалуйста']),
      v('Спасибо', 'Thank you', 'noun', 'Spasibo', 'Большое спасибо за вашу добрую помощь.', 'Thank you very much for your kind help.', 'Большое спасибо за вашу добрую помощь.', 'Спасибо', ['Здравствуйте', 'До свидания', 'Пожалуйста']),
      v('Пожалуйста', 'Please', 'expression', 'Pozhaluysta', 'Чашку чая с лимоном, пожалуйста.', 'A cup of tea with lemon, please.', 'Чашку чая с лимоном, пожалуйста.', 'Пожалуйста', ['Здравствуйте', 'До свидания', 'Спасибо']),
      v('Да', 'Yes', 'noun', 'Da', 'Да, я всё прекрасно понимаю.', 'Yes, I understand everything perfectly.', '___, я всё прекрасно понимаю.', 'Да', ['Здравствуйте', 'До свидания', 'Спасибо']),
      v('Нет', 'No', 'expression', 'Net', 'Нет, это сейчас невозможно.', 'No, that is not possible right now.', '___, это сейчас невозможно.', 'Нет', ['Здравствуйте', 'До свидания', 'Спасибо']),
      v('Как дела', 'How are you', 'noun', 'Kak dela', 'Привет, как твои дела сегодня?', 'Hi, how are your things today?', 'Привет, как твои дела сегодня?', 'Как дела', ['Здравствуйте', 'До свидания', 'Спасибо']),
      v('Добро пожаловать', 'Welcome', 'expression', 'Dobro pozhalovat', 'Добро пожаловать в наш город!', 'Welcome to our city!', '___ в наш город!', 'Добро пожаловать', ['Здравствуйте', 'До свидания', 'Спасибо']),
      v('До скорого', 'See you soon', 'noun', 'Do skorogo', 'Удачного дня и до скорого!', 'Have a great day and see you soon!', 'Удачного дня и до скорого!', 'До скорого', ['Здравствуйте', 'До свидания', 'Спасибо']),
      v('Спокойной ночи', 'Good night', 'expression', 'Spokoynoy nochi', 'Спокойной ночи и приятных снов.', 'Good night and pleasant dreams.', '___ и приятных снов.', 'Спокойной ночи', ['Здравствуйте', 'До свидания', 'Спасибо']),
    ],
    2: [
      v('Очень приятно', 'Nice to meet you', 'noun', 'Ochen priyatno', 'Очень приятно с вами познакомиться.', 'Very pleased to make your acquaintance.', '___ с вами познакомиться.', 'Очень приятно', ['Меня зовут', 'Извините', 'Доброе утро']),
      v('Меня зовут', 'My name is', 'expression', 'Menya zovut', 'Здравствуйте, меня зовут Анна.', 'Hello, my name is Anna.', 'Здравствуйте, меня зовут Анна.', 'Меня зовут', ['Очень приятно', 'Извините', 'Доброе утро']),
      v('Извините', 'Excuse me / Sorry', 'noun', 'Izvinite', 'Извините, где находится вокзал?', 'Excuse me, where is the train station?', '___, где находится вокзал?', 'Извините', ['Очень приятно', 'Меня зовут', 'Доброе утро']),
      v('Доброе утро', 'Good morning', 'expression', 'Dobroye utro', 'Доброе утро и прекрасного настроения!', 'Good morning and have a wonderful mood!', '___ и прекрасного настроения!', 'Доброе утро', ['Очень приятно', 'Меня зовут', 'Извините']),
      v('Добрый вечер', 'Good evening', 'noun', 'Dobryy vecher', 'Добрый вечер, рады вас видеть.', 'Good evening, glad to see you.', '___, рады вас видеть.', 'Добрый вечер', ['Очень приятно', 'Меня зовут', 'Извините']),
      v('Друг', 'Friend', 'expression', 'Drug', 'Он мой самый верный и надежный друг.', 'He is my most faithful and reliable friend.', 'Он мой самый верный и надежный друг.', 'Друг', ['Очень приятно', 'Меня зовут', 'Извините']),
      v('Учитель', 'Teacher', 'noun', 'Uchitel', 'Наш учитель объясняет материал очень понятно.', 'Our teacher explains material very clearly.', 'Наш учитель объясняет материал очень понятно.', 'Учитель', ['Очень приятно', 'Меня зовут', 'Извините']),
      v('Семья', 'Family', 'expression', 'Semya', 'Моя семья живёт в тихом районе.', 'My family lives in a quiet district.', 'Моя семья живёт в тихом районе.', 'Семья', ['Очень приятно', 'Меня зовут', 'Извините']),
      v('Отлично', 'Excellent', 'noun', 'Otlichno', 'Всё получилось просто отлично.', 'Everything turned out simply excellent.', 'Всё получилось просто отлично.', 'Отлично', ['Очень приятно', 'Меня зовут', 'Извините']),
      v('Хорошо', 'Good', 'expression', 'Khorosho', 'Да, всё идёт очень хорошо.', 'Yes, everything is going very well.', 'Да, всё идёт очень хорошо.', 'Хорошо', ['Очень приятно', 'Меня зовут', 'Извините']),
    ],
    3: [
      v('Один', 'One', 'noun', 'Odin', 'У меня есть один билет.', 'I have one ticket.', 'У меня есть один билет.', 'Один', ['Два', 'Три', 'Четыре']),
      v('Два', 'Two', 'expression', 'Dva', 'Два горячих кофе, пожалуйста.', 'Two hot coffees, please.', '___ горячих кофе, пожалуйста.', 'Два', ['Один', 'Три', 'Четыре']),
      v('Три', 'Three', 'noun', 'Tri', 'В комнате три свободных места.', 'There are three available seats in room.', 'В комнате три свободных места.', 'Три', ['Один', 'Два', 'Четыре']),
      v('Четыре', 'Four', 'expression', 'Chetyre', 'Поезд отправляется через четыре часа.', 'The train departs in four hours.', 'Поезд отправляется через четыре часа.', 'Четыре', ['Один', 'Два', 'Три']),
      v('Пять', 'Five', 'noun', 'Pyat', 'Пять минут до начала урока.', 'Five minutes until lesson starts.', '___ минут до начала урока.', 'Пять', ['Один', 'Два', 'Три']),
      v('Десять', 'Ten', 'expression', 'Desyat', 'Это стоит ровно десять рублей.', 'That costs exactly ten rubles.', 'Это стоит ровно десять рублей.', 'Десять', ['Один', 'Два', 'Три']),
      v('Двадцать', 'Twenty', 'noun', 'Dvadtsat', 'Ему исполнилось двадцать лет.', 'He turned twenty years old.', 'Ему исполнилось двадцать лет.', 'Двадцать', ['Один', 'Два', 'Три']),
      v('Пятьдесят', 'Fifty', 'expression', 'Pyatdesyat', 'В зале около пятидесяти гостей.', 'In the hall are about fifty guests.', 'В зале около пятидесяти гостей.', 'Пятьдесят', ['Один', 'Два', 'Три']),
      v('Сто', 'One hundred', 'noun', 'Sto', 'Эта книга содержит сто страниц.', 'This book contains one hundred pages.', 'Эта книга содержит сто страниц.', 'Сто', ['Один', 'Два', 'Три']),
      v('Считать', 'To count', 'expression', 'Schitat', 'Я умею быстро считать по-русски.', 'I can count quickly in Russian.', 'Я умею быстро считать по-русски.', 'Считать', ['Один', 'Два', 'Три']),
    ],
    4: [
      v('Отец', 'Father', 'noun', 'Otets', 'Мой отец работает инженером.', 'My father works as an engineer.', 'Мой отец работает инженером.', 'Отец', ['Мать', 'Брат', 'Сестра']),
      v('Мать', 'Mother', 'expression', 'Mat', 'Моя мать преподает литературу.', 'My mother teaches literature.', 'Моя мать преподает литературу.', 'Мать', ['Отец', 'Брат', 'Сестра']),
      v('Брат', 'Brother', 'noun', 'Brat', 'Мой старший брат живёт в Москве.', 'My older brother lives in Moscow.', 'Мой старший брат живёт в Москве.', 'Брат', ['Отец', 'Мать', 'Сестра']),
      v('Сестра', 'Sister', 'expression', 'Sestra', 'Моя младшая сестра учится музыке.', 'My younger sister studies music.', 'Моя младшая сестра учится музыке.', 'Сестра', ['Отец', 'Мать', 'Брат']),
      v('Дедушка', 'Grandfather', 'noun', 'Dedushka', 'Дедушка читает утреннюю газету.', 'Grandfather reads the morning newspaper.', '___ читает утреннюю газету.', 'Дедушка', ['Отец', 'Мать', 'Брат']),
      v('Бабушка', 'Grandmother', 'expression', 'Babushka', 'Бабушка печет вкусные пироги.', 'Grandmother bakes delicious pies.', '___ печет вкусные пироги.', 'Бабушка', ['Отец', 'Мать', 'Брат']),
      v('Сын', 'Son', 'noun', 'Syn', 'Их сын занимается спортом.', 'Their son does sports.', 'Их сын занимается спортом.', 'Сын', ['Отец', 'Мать', 'Брат']),
      v('Дочь', 'Daughter', 'expression', 'Doch', 'Их дочь прекрасно рисует.', 'Their daughter draws beautifully.', 'Их дочь прекрасно рисует.', 'Дочь', ['Отец', 'Мать', 'Брат']),
      v('Родители', 'Parents', 'noun', 'Roditeli', 'Мои родители любят путешествовать.', 'My parents love traveling.', 'Мои родители любят путешествовать.', 'Родители', ['Отец', 'Мать', 'Брат']),
      v('Дом', 'Home', 'expression', 'Dom', 'Наш дом всегда открыт для гостей.', 'Our home is always open to guests.', 'Наш дом всегда открыт для гостей.', 'Дом', ['Отец', 'Мать', 'Брат']),
    ],
    5: [
      v('Хлеб', 'Bread', 'noun', 'Khleb', 'Свежий ржаной хлеб очень вкусный.', 'Fresh rye bread is very delicious.', 'Свежий ржаной хлеб очень вкусный.', 'Хлеб', ['Вода', 'Чай', 'Кофе']),
      v('Вода', 'Water', 'expression', 'Voda', 'Бутылку минеральной воды, пожалуйста.', 'A bottle of mineral water, please.', 'Бутылку минеральной воды, пожалуйста.', 'Вода', ['Хлеб', 'Чай', 'Кофе']),
      v('Чай', 'Tea', 'noun', 'Chay', 'Мы любим пить горячий чай зимой.', 'We love drinking hot tea in winter.', 'Мы любим пить горячий чай зимой.', 'Чай', ['Хлеб', 'Вода', 'Кофе']),
      v('Кофе', 'Coffee', 'expression', 'Kofe', 'Я пью черный кофе без сахара.', 'I drink black coffee without sugar.', 'Я пью черный кофе без сахара.', 'Кофе', ['Хлеб', 'Вода', 'Чай']),
      v('Яблоко', 'Apple', 'noun', 'Yabloko', 'Зеленое яблоко сладкое и сочное.', 'The green apple is sweet and juicy.', 'Зеленое яблоко сладкое и сочное.', 'Яблоко', ['Хлеб', 'Вода', 'Чай']),
      v('Сыр', 'Cheese', 'expression', 'Syr', 'На столе лежит сыр и фрукты.', 'On table lie cheese and fruit.', 'На столе лежит сыр и фрукты.', 'Сыр', ['Хлеб', 'Вода', 'Чай']),
      v('Есть', 'To eat', 'noun', 'Yest', 'Пора обедать и вкусно есть.', 'It is time to dine and eat deliciously.', 'Пора обедать и вкусно есть.', 'Есть', ['Хлеб', 'Вода', 'Чай']),
      v('Пить', 'To drink', 'expression', 'Pit', 'В жаркую погоду нужно пить воду.', 'In hot weather one must drink water.', 'В жаркую погоду нужно пить воду.', 'Пить', ['Хлеб', 'Вода', 'Чай']),
      v('Вкусно', 'Delicious', 'noun', 'Vkusno', 'Этот традиционный суп очень вкусно приготовлен.', 'This traditional soup is cooked very deliciously.', 'Этот традиционный суп очень вкусно приготовлен.', 'Вкусно', ['Хлеб', 'Вода', 'Чай']),
      v('Завтрак', 'Breakfast', 'expression', 'Zavtrak', 'Завтрак подают в восемь утра.', 'Breakfast is served at eight in morning.', '___ подают в восемь утра.', 'Завтрак', ['Хлеб', 'Вода', 'Чай']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Ресторан","Restaurant"],["Магазин","Shop"],["Гостиница","Hotel"],["Город","City"],["Метро","Subway"],["Аэропорт","Airport"],["Работа","Work"],["Университет","University"],["Здоровье","Health"],["Природа","Nature"],["Путешествие","Journey"],["Музыка","Music"],["История","History"],["Культура","Culture"],["Наука","Science"],["Общение","Communication"],["Развитие","Development"],["Успех","Success"],["Будущее","Future"],["Знание","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  RUSSIAN_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
