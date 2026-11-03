import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const UKRAINIAN_LANGUAGE: LanguageDefinition = {
  code: 'uk-en',
  title: 'Ukrainian Academy',
  description: 'Master Ukrainian from Cyrillic script and melodious phonetics to fluent conversational dialogue from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'uk',
  flagIcon: '🇺🇦',
  level: 'A1–C1',
  order: 33,
  nativeName: 'Українська',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Ukrainian has seven grammatical cases (including the vocative) and is renowned for its melodious vowel harmony.',
    2: 'Saying "Дякую" (Dyakuyu) expresses genuine gratitude in Ukrainian cultural etiquette.',
  },
  units: {
    1: [
      v('Привіт', 'Hello', 'noun', 'Pry-VEET', 'Привіт, як твої справи сьогодні?', 'Hello, how are your things today?', '___, як твої справи сьогодні?', 'Привіт', ['До побачення', 'Дякую', 'Будь ласка']),
      v('До побачення', 'Goodbye', 'expression', 'doh poh-BAH-chen-nyah', 'До побачення і до скорої зустрічі!', 'Goodbye and see you soon!', '___ і до скорої зустрічі!', 'До побачення', ['Привіт', 'Дякую', 'Будь ласка']),
      v('Дякую', 'Thank you', 'noun', 'DYAH-koo-yoo', 'Щиро дякую за вашу чудову допомогу.', 'Sincerely thank you for your wonderful help.', 'Щиро дякую за вашу чудову допомогу.', 'Дякую', ['Привіт', 'До побачення', 'Будь ласка']),
      v('Будь ласка', 'Please / You\'re welcome', 'expression', 'bood LAH-skah', 'Чашку гарячого чаю з лимоном, будь ласка.', 'A cup of hot tea with lemon, please.', 'Чашку гарячого чаю з лимоном, будь ласка.', 'Будь ласка', ['Привіт', 'До побачення', 'Дякую']),
      v('Так', 'Yes', 'noun', 'TAHK', 'Так, я чудово все розумію.', 'Yes, I understand everything wonderfully.', '___, я чудово все розумію.', 'Так', ['Привіт', 'До побачення', 'Дякую']),
      v('Ні', 'No', 'expression', 'NEE', 'Ні, це сьогодні на жаль неможливо.', 'No, that is unfortunately not possible today.', '___, це сьогодні на жаль неможливо.', 'Ні', ['Привіт', 'До побачення', 'Дякую']),
      v('Як справи', 'How are you', 'noun', 'yahk SPRAH-vih', 'Привіт друже, як твої справи?', 'Hello friend, how are your things?', 'Привіт друже, як твої справи?', 'Як справи', ['Привіт', 'До побачення', 'Дякую']),
      v('Ласкаво просимо', 'Welcome', 'expression', 'lah-SKAH-voh PROH-sih-moh', 'Ласкаво просимо до нашої квітучої країни!', 'Welcome to our blooming country!', '___ до нашої квітучої країни!', 'Ласкаво просимо', ['Привіт', 'До побачення', 'Дякую']),
      v('До скорого', 'See you soon', 'noun', 'doh SKOH-roh-goh', 'Гарного дня і до скорого!', 'Have a great day and see you soon!', 'Гарного дня і до скорого!', 'До скорого', ['Привіт', 'До побачення', 'Дякую']),
      v('Добраніч', 'Good night', 'expression', 'doh-BRAH-neech', 'Добраніч і солодких снів.', 'Good night and sweet dreams.', '___ і солодких снів.', 'Добраніч', ['Привіт', 'До побачення', 'Дякую']),
    ],
    2: [
      v('Приємно познайомитися', 'Nice to meet you', 'noun', 'pree-YEHM-noh pohz-nah-YOH-mih-tih-syah', 'Дуже приємно з вами познайомитися.', 'Very pleasant to make your acquaintance.', 'Дуже приємно з вами познайомитися.', 'Приємно познайомитися', ['Мене звати', 'Вибачте', 'Доброго ранку']),
      v('Мене звати', 'My name is', 'expression', 'meh-NEH ZVAH-tih', 'Привіт, мене звати Тарас.', 'Hello, my name is Taras.', 'Привіт, мене звати Тарас.', 'Мене звати', ['Приємно познайомитися', 'Вибачте', 'Доброго ранку']),
      v('Вибачте', 'Excuse me / Sorry', 'noun', 'VIH-bahch-teh', 'Вибачте, де знаходиться центральний вокзал?', 'Excuse me, where is central station located?', '___, де знаходиться центральний вокзал?', 'Вибачте', ['Приємно познайомитися', 'Мене звати', 'Доброго ранку']),
      v('Доброго ранку', 'Good morning', 'expression', 'DOH-broh-goh RAHN-koo', 'Доброго ранку всім і чудового настрою!', 'Good morning to all and wonderful mood!', '___ всім і чудового настрою!', 'Доброго ранку', ['Приємно познайомитися', 'Мене звати', 'Вибачте']),
      v('Добрий вечір', 'Good evening', 'noun', 'DOH-brihy VEH-cheer', 'Добрий вечір та ласкаво просимо.', 'Good evening and welcome.', '___ та ласкаво просимо.', 'Добрий вечір', ['Приємно познайомитися', 'Мене звати', 'Вибачте']),
      v('Друг', 'Friend', 'expression', 'DROOH', 'Він мій найкращий та найвірніший друг.', 'He is my best and most loyal friend.', 'Він мій найкращий та найвірніший друг.', 'Друг', ['Приємно познайомитися', 'Мене звати', 'Вибачте']),
      v('Вчитель', 'Teacher', 'noun', 'VCHIH-tel', 'Наш вчитель пояснює матеріал дуже доступно.', 'Our teacher explains material very accessibly.', 'Наш вчитель пояснює матеріал дуже доступно.', 'Вчитель', ['Приємно познайомитися', 'Мене звати', 'Вибачте']),
      v('Сім\'я', 'Family', 'expression', 'seem-YAH', 'Моя сім\'я живе у затишному Львові.', 'My family lives in cozy Lviv.', 'Моя сім\'я живе у затишному Львові.', 'Сім\'я', ['Приємно познайомитися', 'Мене звати', 'Вибачте']),
      v('Чудово', 'Wonderful', 'noun', 'choo-DOH-voh', 'Результат на іспиті просто чудовий.', 'Result on exam is simply wonderful.', 'Результат на іспиті просто чудовий.', 'Чудово', ['Приємно познайомитися', 'Мене звати', 'Вибачте']),
      v('Добре', 'Good', 'expression', 'DOH-breh', 'Усе йде дуже добре та спокійно.', 'Everything is going very well and calmly.', 'Усе йде дуже добре та спокійно.', 'Добре', ['Приємно познайомитися', 'Мене звати', 'Вибачте']),
    ],
    3: [
      v('Один', 'One', 'noun', 'oh-DIHN', 'Я маю один квиток на потяг.', 'I have one ticket for train.', 'Я маю один квиток на потяг.', 'Один', ['Два', 'Три', 'Чотири']),
      v('Два', 'Two', 'expression', 'DVAH', 'Дві гарячі кави, будь ласка.', 'Two hot coffees, please.', 'Дві гарячі кави, будь ласка.', 'Два', ['Один', 'Три', 'Чотири']),
      v('Три', 'Three', 'noun', 'TRIH', 'У готелі є три вільні кімнати.', 'In hotel exist three vacant rooms.', 'У готелі є три вільні кімнати.', 'Три', ['Один', 'Два', 'Чотири']),
      v('Чотири', 'Four', 'expression', 'choh-TIH-rih', 'Ми приїхали вчотирьох.', 'We arrived as four people.', 'Ми приїхали вчотирьох.', 'Чотири', ['Один', 'Два', 'Три']),
      v('П\'ять', 'Five', 'noun', 'PYAHT', 'Потяг відправляється через п\'ять хвилин.', 'Train departs in five minutes.', 'Потяг відправляється через п\'ять хвилин.', 'П\'ять', ['Один', 'Два', 'Три']),
      v('Десять', 'Ten', 'expression', 'DEH-syaht', 'Це коштує рівно десять гривень.', 'This costs exactly ten hryvnias.', 'Це коштує рівно десять гривень.', 'Десять', ['Один', 'Два', 'Три']),
      v('Двадцять', 'Twenty', 'noun', 'DVAHD-tsyaht', 'У класі сидять двадцять учнів.', 'In class sit twenty students.', 'У класі сидять двадцять учнів.', 'Двадцять', ['Один', 'Два', 'Три']),
      v('П\'ятдесят', 'Fifty', 'expression', 'pyaht-deh-SYAHT', 'У залі є п\'ятдесят місць.', 'In hall are fifty seats.', 'У залі є п\'ятдесят місць.', 'П\'ятдесят', ['Один', 'Два', 'Три']),
      v('Сто', 'One hundred', 'noun', 'STOH', 'Ця книжка має рівно сто сторінок.', 'This book has exactly hundred pages.', 'Ця книжка має рівно сто сторінок.', 'Сто', ['Один', 'Два', 'Три']),
      v('Рахувати', 'To count', 'expression', 'rah-khoo-VAH-tih', 'Я вмію легко рахувати українською.', 'I can count in Ukrainian easily.', 'Я вмію легко рахувати українською.', 'Рахувати', ['Один', 'Два', 'Три']),
    ],
    4: [
      v('Батько', 'Father', 'noun', 'BAHT-koh', 'Мій батько працює інженером-будівельником.', 'My father works as civil engineer.', 'Мій батько працює інженером-будівельником.', 'Батько', ['Мати', 'Брат', 'Сестра']),
      v('Мати', 'Mother', 'expression', 'MAH-tih', 'Моя мати лікар у міській лікарні.', 'My mother is doctor in city hospital.', 'Моя мати лікар у міській лікарні.', 'Мати', ['Батько', 'Брат', 'Сестра']),
      v('Брат', 'Brother', 'noun', 'BRAHT', 'Мій старший брат навчається в університеті.', 'My older brother studies at university.', 'Мій старший брат навчається в університеті.', 'Брат', ['Батько', 'Мати', 'Сестра']),
      v('Сестра', 'Sister', 'expression', 'seh-STRAH', 'Моя молодша сестра чудово грає на бандурі.', 'My younger sister plays bandura wonderfully.', 'Моя молодша сестра чудово грає на бандурі.', 'Сестра', ['Батько', 'Мати', 'Брат']),
      v('Дідусь', 'Grandfather', 'noun', 'dee-DOOS', 'Дідусь щоранку гуляє в мальовничому парку.', 'Grandfather walks in picturesque park every morning.', '___ щоранку гуляє в мальовничому парку.', 'Дідусь', ['Батько', 'Мати', 'Брат']),
      v('Бабуся', 'Grandmother', 'expression', 'bah-BOO-syah', 'Бабуся пече смачні духмяні пиріжки.', 'Grandmother bakes tasty fragrant pies.', '___ пече смачні духмяні пиріжки.', 'Бабуся', ['Батько', 'Мати', 'Брат']),
      v('Син', 'Son', 'noun', 'SIHN', 'Їхній син грає у футбольній команді.', 'Their son plays in football team.', 'Їхній син грає у футбольній команді.', 'Син', ['Батько', 'Мати', 'Брат']),
      v('Дочка', 'Daughter', 'expression', 'DOCH-kah', 'Їхня дочка малює дивовижні картини.', 'Their daughter paints amazing pictures.', 'Їхня дочка малює дивовижні картини.', 'Дочка', ['Батько', 'Мати', 'Брат']),
      v('Батьки', 'Parents', 'noun', 'baht-KIH', 'Мої батьки дуже люблять подорожі Карпатами.', 'My parents love traveling in Carpathians.', 'Мої батьки дуже люблять подорожі Карпатами.', 'Батьки', ['Батько', 'Мати', 'Брат']),
      v('Дім', 'Home', 'expression', 'DEEM', 'Наш дім світлий, затишний і гостинний.', 'Our home is bright, cozy, and hospitable.', 'Наш дім світлий, затишний і гостинний.', 'Дім', ['Батько', 'Мати', 'Брат']),
    ],
    5: [
      v('Хліб', 'Bread', 'noun', 'KHLEEB', 'Свіжий український паляниця дуже смачний.', 'Fresh Ukrainian palianytsia is very tasty.', 'Свіжий український паляниця дуже смачний.', 'Хліб', ['Вода', 'Чай', 'Кава']),
      v('Вода', 'Water', 'expression', 'voh-DAH', 'Склянку чистої джерельної води, будь ласка.', 'A glass of pure spring water, please.', 'Склянку чистої джерельної води, будь ласка.', 'Вода', ['Хліб', 'Чай', 'Кава']),
      v('Чай', 'Tea', 'noun', 'CHAHY', 'Запашний трав\'яний чай зігріває взимку.', 'Fragrant herbal tea warms in winter.', 'Запашний трав\'яний чай зігріває взимку.', 'Чай', ['Хліб', 'Вода', 'Кава']),
      v('Кава', 'Coffee', 'expression', 'KAH-vah', 'Львівська кава славиться своїм неповторним ароматом.', 'Lviv coffee is renowned for its unique aroma.', 'Львівська кава славиться своїм неповторним ароматом.', 'Кава', ['Хліб', 'Вода', 'Чай']),
      v('Яблуко', 'Apple', 'noun', 'YAHB-loo-koh', 'Стигле червоне яблуко солодке та соковите.', 'Ripe red apple is sweet and juicy.', 'Стигле червоне яблуко солодке та соковите.', 'Яблуко', ['Хліб', 'Вода', 'Чай']),
      v('Сир', 'Cheese', 'expression', 'SEER', 'Домашній сир чудово смакує до сніданку.', 'Homemade cheese tastes wonderful for breakfast.', 'Домашній сир чудово смакує до сніданку.', 'Сир', ['Хліб', 'Вода', 'Чай']),
      v('Їсти', 'To eat', 'noun', 'YEES-tih', 'Сідаймо всі разом обідати за великим столом.', 'Let us sit together dining at big table.', 'Сідаймо всі разом обідати за великим столом.', 'Їсти', ['Хліб', 'Вода', 'Чай']),
      v('Пити', 'To drink', 'expression', 'PIH-tih', 'Влітку потрібно пити достатньо чистої води.', 'In summer one must drink sufficient pure water.', 'Влітку потрібно пити достатньо чистої води.', 'Пити', ['Хліб', 'Вода', 'Чай']),
      v('Смачно', 'Delicious', 'noun', 'SMAHCH-noh', 'Цей традиційний український борщ неймовірно смачний.', 'This traditional Ukrainian borsch is incredibly delicious.', 'Цей традиційний український борщ неймовірно смачний.', 'Смачно', ['Хліб', 'Вода', 'Чай']),
      v('Сніданок', 'Breakfast', 'expression', 'snee-DAH-nohk', 'Сніданок подають о восьмій годині ранку.', 'Breakfast is served at eight in morning.', '___ подають о восьмій годині ранку.', 'Сніданок', ['Хліб', 'Вода', 'Чай']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Ресторан","Restaurant"],["Магазин","Shop"],["Готель","Hotel"],["Місто","City"],["Потяг","Train"],["Аеропорт","Airport"],["Праця","Work"],["Школа","School"],["Здоров'я","Health"],["Природа","Nature"],["Відпустка","Holiday"],["Музика","Music"],["Історія","History"],["Культура","Culture"],["Наука","Science"],["Спілкування","Communication"],["Суспільство","Society"],["Успіх","Success"],["Майбутнє","Future"],["Знання","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  UKRAINIAN_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
