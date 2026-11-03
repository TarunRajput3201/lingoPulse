import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const PERSIAN_LANGUAGE: LanguageDefinition = {
  code: 'fa-en',
  title: 'Persian Academy',
  description: 'Master Persian (Farsi) from poetic rhythm and ta\'arof politeness to everyday conversation from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'fa',
  flagIcon: '🇮🇷',
  level: 'A1–C1',
  order: 34,
  nativeName: 'فارسی',
  isRTL: true,
  region: 'Middle Eastern',
  culturalTips: {
    1: 'Persian is an Indo-European language written in Perso-Arabic script with rich poetic heritage.',
    2: '"Ta\'arof" is the culturally revered art of social etiquette, gracious deferral, and hospitality.',
  },
  units: {
    1: [
      v('سلام', 'Hello', 'noun', 'Salam', 'سلام، حال شما امروز چطور است؟', 'Hello, how is your state today?', '___، حال شما امروز چطور است؟', 'سلام', ['خداحافظ', 'سپاسگزارم', 'لطفاً']),
      v('خداحافظ', 'Goodbye', 'expression', 'Khodahafez', 'خداحافظ و به امید دیدار دوباره!', 'Goodbye and hope for seeing again!', '___ و به امید دیدار دوباره!', 'خداحافظ', ['سلام', 'سپاسگزارم', 'لطفاً']),
      v('سپاسگزارم', 'Thank you', 'noun', 'Sepasgozaram', 'از کمک بسیار ارزشمند شما سپاسگزارم.', 'I thank you for your very valuable help.', 'از کمک بسیار ارزشمند شما ___.', 'سپاسگزارم', ['سلام', 'خداحافظ', 'لطفاً']),
      v('لطفاً', 'Please', 'expression', 'Lotfan', 'یک فنجان چای داغ، لطفاً.', 'A cup of hot tea, please.', 'یک فنجان چای داغ، ___.', 'لطفاً', ['سلام', 'خداحافظ', 'سپاسگزارم']),
      v('بله', 'Yes', 'noun', 'Baleh', 'بله، من این موضوع را به خوبی متوجه می‌شوم.', 'Yes, I understand this matter well.', '___، من این موضوع را به خوبی متوجه می‌شوم.', 'بله', ['سلام', 'خداحافظ', 'سپاسگزارم']),
      v('خیر', 'No', 'expression', 'Kheyr', 'خیر، متأسفانه امروز این کار مقدور نیست.', 'No, unfortunately that is not possible today.', '___، متأسفانه امروز این کار مقدور نیست.', 'خیر', ['سلام', 'خداحافظ', 'سپاسگزارم']),
      v('حال شما چطور است', 'How are you', 'noun', 'Hale shoma chetor ast', 'سلام دوست من، حال شما چطور است؟', 'Hello my friend, how are you?', 'سلام دوست من، ___؟', 'حال شما چطور است', ['سلام', 'خداحافظ', 'سپاسگزارم']),
      v('خوش آمدید', 'Welcome', 'expression', 'Khosh amadid', 'به کشور زیبای ما خوش آمدید!', 'Welcome to our beautiful country!', 'به کشور زیبای ما ___!', 'خوش آمدید', ['سلام', 'خداحافظ', 'سپاسگزارم']),
      v('به زودی می‌بینمت', 'See you soon', 'noun', 'Be zoodi mibinamet', 'روز خوش و به زودی می‌بینمت!', 'Good day and see you soon!', 'روز خوش و ___!', 'به زودی می‌بینمت', ['سلام', 'خداحافظ', 'سپاسگزارم']),
      v('شب بخیر', 'Good night', 'expression', 'Shab bekheyr', 'شب بخیر و خواب‌های شیرین ببینید.', 'Good night and see sweet dreams.', '___ و خواب‌های شیرین ببینید.', 'شب بخیر', ['سلام', 'خداحافظ', 'سپاسگزارم']),
    ],
    2: [
      v('از آشنایی با شما خوشبختم', 'Nice to meet you', 'noun', 'Az ashnaei ba shoma khoshbakhtam', 'از آشنایی با شما بسیار خوشبختم.', 'Very happy to make your acquaintance.', 'از آشنایی با شما بسیار خوشبختم.', 'از آشنایی با شما خوشبختم', ['نام من است', 'ببخشید', 'صبح بخیر']),
      v('نام من است', 'My name is', 'expression', 'Name man ast', 'سلام، نام من سهراب است.', 'Hello, my name is Sohrab.', 'سلام، نام من سهراب است.', 'نام من است', ['از آشنایی با شما خوشبختم', 'ببخشید', 'صبح بخیر']),
      v('ببخشید', 'Excuse me / Sorry', 'noun', 'Bebakhshid', 'ببخشید، ایستگاه قطار کجاست؟', 'Excuse me, where is train station?', '___، ایستگاه قطار کجاست؟', 'ببخشید', ['از آشنایی با شما خوشبختم', 'نام من است', 'صبح بخیر']),
      v('صبح بخیر', 'Good morning', 'expression', 'Sobh bekheyr', 'صبح بخیر به همه دوستان گرامی!', 'Good morning to all dear friends!', '___ به همه دوستان گرامی!', 'صبح بخیر', ['از آشنایی با شما خوشبختم', 'نام من است', 'ببخشید']),
      v('عصر بخیر', 'Good evening', 'noun', 'Asr bekheyr', 'عصر بخیر و به جمع ما خوش آمدید.', 'Good evening and welcome to our gathering.', '___ و به جمع ما خوش آمدید.', 'عصر بخیر', ['از آشنایی با شما خوشبختم', 'نام من است', 'ببخشید']),
      v('دوست', 'Friend', 'expression', 'Doost', 'او بهترین و وفادارترین دوست من است.', 'He is my best and most loyal friend.', 'او بهترین و وفادارترین ___ من است.', 'دوست', ['از آشنایی با شما خوشبختم', 'نام من است', 'ببخشید']),
      v('معلم', 'Teacher', 'noun', 'Mo\'allem', 'معلم ما درس را بسیار شیرین توضیح می‌دهد.', 'Our teacher explains lesson very sweetly.', '___ ما درس را بسیار شیرین توضیح می‌دهد.', 'معلم', ['از آشنایی با شما خوشبختم', 'نام من است', 'ببخشید']),
      v('خانواده', 'Family', 'expression', 'Khanevadeh', 'خانواده من در شهر شیراز زندگی می‌کنند.', 'My family lives in Shiraz city.', '___ من در شهر شیراز زندگی می‌کنند.', 'خانواده', ['از آشنایی با شما خوشبختم', 'نام من است', 'ببخشید']),
      v('عالی', 'Excellent', 'noun', 'Aali', 'نتیجه آزمون شما واقعاً عالی بود.', 'Your exam result was really excellent.', 'نتیجه آزمون شما واقعاً ___ بود.', 'عالی', ['از آشنایی با شما خوشبختم', 'نام من است', 'ببخشید']),
      v('خوب', 'Good', 'expression', 'Khoob', 'خوشبختانه همه چیز به خوبی پیش می‌رود.', 'Fortunately everything goes well.', 'خوشبختانه همه چیز به ___ی پیش می‌رود.', 'خوب', ['از آشنایی با شما خوشبختم', 'نام من است', 'ببخشید']),
    ],
    3: [
      v('یک', 'One', 'noun', 'Yek', 'من یک بلیط قطار خریدم.', 'I bought one train ticket.', 'من ___ بلیط قطار خریدم.', 'یک', ['دو', 'سه', 'چهار']),
      v('دو', 'Two', 'expression', 'Do', 'دو فنجان چای زعفرانی، لطفاً.', 'Two cups of saffron tea, please.', '___ فنجان چای زعفرانی، لطفاً.', 'دو', ['یک', 'سه', 'چهار']),
      v('سه', 'Three', 'noun', 'Seh', 'سه اتاق خالی در هتل وجود دارد.', 'There are three vacant rooms in hotel.', '___ اتاق خالی در هتل وجود دارد.', 'سه', ['یک', 'دو', 'چهار']),
      v('چهار', 'Four', 'expression', 'Chahar', 'ما چهار نفر مسافر هستیم.', 'We are four travelers.', 'ما ___ نفر مسافر هستیم.', 'چهار', ['یک', 'دو', 'سه']),
      v('پنج', 'Five', 'noun', 'Panj', 'اتوبوس پنج دقیقه دیگر حرکت می‌کند.', 'Bus departs in five minutes.', 'اتوبوس ___ دقیقه دیگر حرکت می‌کند.', 'پنج', ['یک', 'دو', 'سه']),
      v('ده', 'Ten', 'expression', 'Dah', 'قیمت آن دقیقاً ده تومان است.', 'Its price is exactly ten tomans.', 'قیمت آن دقیقاً ___ تومان است.', 'ده', ['یک', 'دو', 'سه']),
      v('بیست', 'Twenty', 'noun', 'Bist', 'بیست دانش‌آموز در کلاس حضور دارند.', 'Twenty students are present in class.', '___ دانش‌آموز در کلاس حضور دارند.', 'بیست', ['یک', 'دو', 'سه']),
      v('پنجاه', 'Fifty', 'expression', 'Panjah', 'پنجاه صندلی در سالن قرار دارد.', 'Fifty chairs are situated in hall.', '___ صندلی در سالن قرار دارد.', 'پنجاه', ['یک', 'دو', 'سه']),
      v('صد', 'One hundred', 'noun', 'Sad', 'این کتاب شامل صد صفحه است.', 'This book contains hundred pages.', 'این کتاب شامل ___ صفحه است.', 'صد', ['یک', 'دو', 'سه']),
      v('شمردن', 'To count', 'expression', 'Shemordan', 'من می‌توانم به زبان فارسی بشمارم.', 'I can count in Persian language.', 'من می‌توانم به زبان فارسی بشمارم.', 'شمردن', ['یک', 'دو', 'سه']),
    ],
    4: [
      v('پدر', 'Father', 'noun', 'Pedar', 'پدرم مهندس ساختمان است.', 'My father is civil engineer.', '___م مهندس ساختمان است.', 'پدر', ['مادر', 'برادر', 'خواهر']),
      v('مادر', 'Mother', 'expression', 'Madar', 'مادرم در بیمارستان پزشک است.', 'My mother is doctor in hospital.', '___م در بیمارستان پزشک است.', 'مادر', ['پدر', 'برادر', 'خواهر']),
      v('برادر', 'Brother', 'noun', 'Baradar', 'برادر بزرگترم در دانشگاه درس می‌خواند.', 'My older brother studies in university.', '___ بزرگترم در دانشگاه درس می‌خواند.', 'برادر', ['پدر', 'مادر', 'خواهر']),
      v('خواهر', 'Sister', 'expression', 'Khahar', 'خواهرم تار و سه تار می‌نوازد.', 'My sister plays tar and setar.', '___م تار و سه تار می‌نوازد.', 'خواهر', ['پدر', 'مادر', 'برادر']),
      v('پدربزرگ', 'Grandfather', 'noun', 'Pedarbozorg', 'پدربزرگ هر صبح در باغچه قدم می‌زند.', 'Grandfather walks in garden every morning.', '___ هر صبح در باغچه قدم می‌زند.', 'پدربزرگ', ['پدر', 'مادر', 'برادر']),
      v('مادربزرگ', 'Grandmother', 'expression', 'Madarbozorg', 'مادربزرگ غذاهای سنتی خوشمزه می‌پزد.', 'Grandmother cooks tasty traditional food.', '___ غذاهای سنتی خوشمزه می‌پزد.', 'مادربزرگ', ['پدر', 'مادر', 'برادر']),
      v('پسر', 'Son', 'noun', 'Pesar', 'پسر آنها در تیم فوتبال بازی می‌کند.', 'Their son plays in football team.', '___ آنها در تیم فوتبال بازی می‌کند.', 'پسر', ['پدر', 'مادر', 'برادر']),
      v('دختر', 'Daughter', 'expression', 'Dokhtar', 'دختر آنها نقاشی‌های زیبا می‌کشد.', 'Their daughter draws beautiful paintings.', '___ آنها نقاشی‌های زیبا می‌کشد.', 'دختر', ['پدر', 'مادر', 'برادر']),
      v('والدین', 'Parents', 'noun', 'Valedain', 'والدین من عاشق سفر به شهرهای تاریخی هستند.', 'My parents love traveling to historic cities.', '___ من عاشق سفر به شهرهای تاریخی هستند.', 'والدین', ['پدر', 'مادر', 'برادر']),
      v('خانه', 'Home', 'expression', 'Khaneh', 'خانه ما باصفا، گرم و روشن است.', 'Our home is pleasant, warm, and bright.', '___ ما باصفا، گرم و روشن است.', 'خانه', ['پدر', 'مادر', 'برادر']),
    ],
    5: [
      v('نان', 'Bread', 'noun', 'Naan', 'نان سنگک تازه و گرم بسیار دلچسب است.', 'Fresh hot sangak bread is very pleasant.', '___ سنگک تازه و گرم بسیار دلچسب است.', 'نان', ['آب', 'چای', 'قهوه']),
      v('آب', 'Water', 'expression', 'Aab', 'یک لیوان آب خنک و گوارا، لطفاً.', 'A glass of cool pleasant water, please.', 'یک لیوان ___ خنک و گوارا، لطفاً.', 'آب', ['نان', 'چای', 'قهوه']),
      v('چای', 'Tea', 'noun', 'Chai', 'چای ایرانی با هل و گل سرخ معطر است.', 'Iranian tea with cardamom and rose is fragrant.', '___ ایرانی با هل و گل سرخ معطر است.', 'چای', ['نان', 'آب', 'قهوه']),
      v('قهوه', 'Coffee', 'expression', 'Ghahveh', 'یک فنجان قهوه تلخ در ابتدای صبح انرژی‌بخش است.', 'A cup of black coffee in morning is energizing.', 'یک فنجان ___ تلخ در ابتدای صبح انرژی‌بخش است.', 'قهوه', ['نان', 'آب', 'چای']),
      v('سیب', 'Apple', 'noun', 'Seeb', 'سیب سرخ دماوند شیرین و آبدار است.', 'Damavand red apple is sweet and juicy.', '___ سرخ دماوند شیرین و آبدار است.', 'سیب', ['نان', 'آب', 'چای']),
      v('پنیر', 'Cheese', 'expression', 'Paneer', 'پنیر لیقوان با گردو صبحانه‌ای بی‌نظیر است.', 'Lighvan cheese with walnut is unique breakfast.', '___ لیقوان با گردو صبحانه‌ای بی‌نظیر است.', 'پنیر', ['نان', 'آب', 'چای']),
      v('خوردن', 'To eat', 'noun', 'Khordan', 'بیایید همه با هم ناهار بخوریم.', 'Come let us all eat lunch together.', 'بیایید همه با هم ناهار بخوریم.', 'خوردن', ['نان', 'آب', 'چای']),
      v('نوشیدن', 'To drink', 'expression', 'Nooshidan', 'نوشیدن آب سالم برای تندرستی ضروری است.', 'Drinking healthy water is essential for wellness.', '___ آب سالم برای تندرستی ضروری است.', 'نوشیدن', ['نان', 'آب', 'چای']),
      v('خوشمزه', 'Delicious', 'noun', 'Khoshmazeh', 'قورمه سبزی غذایی فوق‌العاده خوشمزه است.', 'Ghormeh sabzi is an extraordinarily delicious food.', 'قورمه سبزی غذایی فوق‌العاده ___ است.', 'خوشمزه', ['نان', 'آب', 'چای']),
      v('صبحانه', 'Breakfast', 'expression', 'Sobhaneh', 'صبحانه رأس ساعت هشت سرو می‌شود.', 'Breakfast is served exactly at eight.', '___ رأس ساعت هشت سرو می‌شود.', 'صبحانه', ['نان', 'آب', 'چای']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["رستوران","Restaurant"],["فروشگاه","Shop"],["هتل","Hotel"],["شهر","City"],["قطار","Train"],["فرودگاه","Airport"],["کار","Work"],["مدرسه","School"],["سلامتی","Health"],["طبیعت","Nature"],["تعطیلات","Holiday"],["موسیقی","Music"],["تاریخ","History"],["فرهنگ","Culture"],["علم","Science"],["گفتگو","Conversation"],["جامعه","Society"],["موفقیت","Success"],["آینده","Future"],["دانش","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  PERSIAN_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
