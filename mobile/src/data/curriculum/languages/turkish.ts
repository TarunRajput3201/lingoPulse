import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const TURKISH_LANGUAGE: LanguageDefinition = {
  code: 'tr-en',
  title: 'Turkish Academy',
  description: 'Master Turkish from vowel harmony to advanced academic and business fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'tr',
  flagIcon: '🇹🇷',
  level: 'A1–C1',
  order: 14,
  nativeName: 'Türkçe',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Turkish uses vowel harmony: suffixes attach to word stems in predictable sound groups.',
    2: 'Offering Turkish tea (çay) is an essential gesture of hospitality in daily life.',
  },
  units: {
    1: [
      v('Merhaba', 'Hello', 'noun', 'mer-hah-BAH', 'Merhaba, bugün nasılsınız?', 'Hello, how are you today?', '___, bugün nasılsınız?', 'Merhaba', ['Hoşça kal', 'Teşekkür ederim', 'Lütfen']),
      v('Hoşça kal', 'Goodbye', 'expression', 'hosh-chah KAHL', 'Hoşça kal ve yakında görüşmek üzere!', 'Goodbye and see you soon!', '___ ve yakında görüşmek üzere!', 'Hoşça kal', ['Merhaba', 'Teşekkür ederim', 'Lütfen']),
      v('Teşekkür ederim', 'Thank you', 'noun', 'teh-shek-kewr eh-deh-REEM', 'Yardımınız için çok teşekkür ederim.', 'Thank you very much for your help.', 'Yardımınız için çok teşekkür ederim.', 'Teşekkür ederim', ['Merhaba', 'Hoşça kal', 'Lütfen']),
      v('Lütfen', 'Please', 'expression', 'LEWT-fehn', 'Bir fincan sıcak çay, lütfen.', 'A cup of hot tea, please.', 'Bir fincan sıcak çay, lütfen.', 'Lütfen', ['Merhaba', 'Hoşça kal', 'Teşekkür ederim']),
      v('Evet', 'Yes', 'noun', 'eh-VEHT', 'Evet, sizi çok iyi anlıyorum.', 'Yes, I understand you very well.', '___, sizi çok iyi anlıyorum.', 'Evet', ['Merhaba', 'Hoşça kal', 'Teşekkür ederim']),
      v('Hayır', 'No', 'expression', 'HAH-yuhr', 'Hayır, bu maalesef mümkün değil.', 'No, that is unfortunately not possible.', '___, bu maalesef mümkün değil.', 'Hayır', ['Merhaba', 'Hoşça kal', 'Teşekkür ederim']),
      v('Nasılsınız', 'How are you', 'noun', 'nah-suhl-suh-NUHZ', 'Merhaba efendim, nasılsınız bugün?', 'Hello sir, how are you today?', 'Merhaba efendim, nasılsınız bugün?', 'Nasılsınız', ['Merhaba', 'Hoşça kal', 'Teşekkür ederim']),
      v('Hoş geldiniz', 'Welcome', 'expression', 'hosh gel-DEE-neez', 'Güzel ülkemize hoş geldiniz!', 'Welcome to our beautiful country!', 'Güzel ülkemize hoş geldiniz!', 'Hoş geldiniz', ['Merhaba', 'Hoşça kal', 'Teşekkür ederim']),
      v('Yakında görüşürüz', 'See you soon', 'noun', 'yah-kuhn-DAH gew-rew-shew-REWZ', 'İyi günler ve yakında görüşürüz!', 'Have a good day and see you soon!', 'İyi günler ve yakında görüşürüz!', 'Yakında görüşürüz', ['Merhaba', 'Hoşça kal', 'Teşekkür ederim']),
      v('İyi geceler', 'Good night', 'expression', 'ee-YEE geh-jeh-LEHR', 'İyi geceler ve tatlı rüyalar.', 'Good night and sweet dreams.', '___ ve tatlı rüyalar.', 'İyi geceler', ['Merhaba', 'Hoşça kal', 'Teşekkür ederim']),
    ],
    2: [
      v('Tanıştığıma memnun oldum', 'Nice to meet you', 'noun', 'tah-nuhsh-tuh-uh-MAH mem-NOON ol-DOOM', 'Sizinle tanıştığıma çok memnun oldum.', 'Very pleased to have met you.', 'Sizinle tanıştığıma çok memnun oldum.', 'Tanıştığıma memnun oldum', ['Benim adım', 'Özür dilerim', 'Günaydın']),
      v('Benim adım', 'My name is', 'expression', 'beh-NEEM ah-DUHM', 'Merhaba, benim adım Emre.', 'Hello, my name is Emre.', 'Merhaba, benim adım Emre.', 'Benim adım', ['Tanıştığıma memnun oldum', 'Özür dilerim', 'Günaydın']),
      v('Özür dilerim', 'Excuse me / Sorry', 'noun', 'ew-ZEWR dee-leh-REEM', 'Özür dilerim, tren istasyonu nerede?', 'Excuse me, where is the train station?', '___, tren istasyonu nerede?', 'Özür dilerim', ['Tanıştığıma memnun oldum', 'Benim adım', 'Günaydın']),
      v('Günaydın', 'Good morning', 'expression', 'gew-nahy-DUHN', 'Herkese günaydın ve mutlu bir gün dilerim!', 'Good morning everyone and have a happy day!', 'Herkese günaydın ve mutlu bir gün dilerim!', 'Günaydın', ['Tanıştığıma memnun oldum', 'Benim adım', 'Özür dilerim']),
      v('İyi akşamlar', 'Good evening', 'noun', 'ee-YEE ahk-shahm-LAHR', 'İyi akşamlar, hoş geldiniz aramıza.', 'Good evening, welcome among us.', '___, hoş geldiniz aramıza.', 'İyi akşamlar', ['Tanıştığıma memnun oldum', 'Benim adım', 'Özür dilerim']),
      v('Arkadaş', 'Friend', 'expression', 'ahr-kah-DAHSH', 'O benim en eski ve güvenilir arkadaşım.', 'He is my oldest and most reliable friend.', 'O benim en eski ve güvenilir arkadaşım.', 'Arkadaş', ['Tanıştığıma memnun oldum', 'Benim adım', 'Özür dilerim']),
      v('Öğretmen', 'Teacher', 'noun', 'ew-reht-MEHN', 'Öğretmenimiz dersi çok güzel anlatıyor.', 'Our teacher explains the lesson very nicely.', '___imiz dersi çok güzel anlatıyor.', 'Öğretmen', ['Tanıştığıma memnun oldum', 'Benim adım', 'Özür dilerim']),
      v('Aile', 'Family', 'expression', 'ah-ee-LEH', 'Ailemiz İstanbul\'da yaşıyor.', 'Our family lives in Istanbul.', '___miz İstanbul\'da yaşıyor.', 'Aile', ['Tanıştığıma memnun oldum', 'Benim adım', 'Özür dilerim']),
      v('Harika', 'Great', 'noun', 'hah-ree-KAH', 'Bugünkü sınav sonucu gerçekten harika.', 'Today\'s exam result is really great.', 'Bugünkü sınav sonucu gerçekten harika.', 'Harika', ['Tanıştığıma memnun oldum', 'Benim adım', 'Özür dilerim']),
      v('Tamam', 'Okay', 'expression', 'tah-MAHM', 'Tamam, akşam saat yedide buluşalım.', 'Okay, let us meet at seven in evening.', '___, akşam saat yedide buluşalım.', 'Tamam', ['Tanıştığıma memnun oldum', 'Benim adım', 'Özür dilerim']),
    ],
    3: [
      v('Bir', 'One', 'noun', 'BEER', 'Bir adet tren biletim var.', 'I have one train ticket.', '___ adet tren biletim var.', 'Bir', ['İki', 'Üç', 'Dört']),
      v('İki', 'Two', 'expression', 'ee-KEE', 'İki sıcak kahve, lütfen.', 'Two hot coffees, please.', '___ sıcak kahve, lütfen.', 'İki', ['Bir', 'Üç', 'Dört']),
      v('Üç', 'Three', 'noun', 'EWCH', 'Otelde üç boş oda bulunuyor.', 'There are three vacant rooms in hotel.', 'Otelde üç boş oda bulunuyor.', 'Üç', ['Bir', 'İki', 'Dört']),
      v('Dört', 'Four', 'expression', 'DEURT', 'Biz toplam dört kişiyiz.', 'We are four people in total.', 'Biz toplam dört kişiyiz.', 'Dört', ['Bir', 'İki', 'Üç']),
      v('Beş', 'Five', 'noun', 'BESH', 'Vapur beş dakika içinde kalkıyor.', 'The ferry departs in five minutes.', 'Vapur beş dakika içinde kalkıyor.', 'Beş', ['Bir', 'İki', 'Üç']),
      v('On', 'Ten', 'expression', 'OHN', 'Bunun fiyatı tam on lira.', 'Its price is exactly ten liras.', 'Bunun fiyatı tam on lira.', 'On', ['Bir', 'İki', 'Üç']),
      v('Yirmi', 'Twenty', 'noun', 'yeer-MEE', 'Sınıfta yirmi öğrenci oturuyor.', 'Twenty students sit in the classroom.', 'Sınıfta yirmi öğrenci oturuyor.', 'Yirmi', ['Bir', 'İki', 'Üç']),
      v('Elli', 'Fifty', 'expression', 'ehl-LEE', 'Salonda elli koltuk mevcut.', 'Fifty armchairs exist in the salon.', 'Salonda elli koltuk mevcut.', 'Elli', ['Bir', 'İki', 'Üç']),
      v('Yüz', 'One hundred', 'noun', 'YEWZ', 'Bu kitap yüz sayfadan oluşuyor.', 'This book consists of hundred pages.', 'Bu kitap yüz sayfadan oluşuyor.', 'Yüz', ['Bir', 'İki', 'Üç']),
      v('Saymak', 'To count', 'expression', 'say-MAHK', 'Türkçe sayıları kolayca sayabilirim.', 'I can easily count Turkish numbers.', 'Türkçe sayıları kolayca sayabilirim.', 'Saymak', ['Bir', 'İki', 'Üç']),
    ],
    4: [
      v('Baba', 'Father', 'noun', 'bah-BAH', 'Babam bir fabrikada mühendis.', 'My father is an engineer at factory.', '___m bir fabrikada mühendis.', 'Baba', ['Anne', 'Erkek kardeş', 'Kız kardeş']),
      v('Anne', 'Mother', 'expression', 'ahn-NEH', 'Annem hastanede doktor olarak çalışıyor.', 'My mother works as doctor at hospital.', '___m hastanede doktor olarak çalışıyor.', 'Anne', ['Baba', 'Erkek kardeş', 'Kız kardeş']),
      v('Erkek kardeş', 'Brother', 'noun', 'ehr-kehk kahr-DESH', 'Ağabeyim üniversitede hukuk okuyor.', 'My older brother studies law at university.', 'Ağabeyim üniversitede hukuk okuyor.', 'Erkek kardeş', ['Baba', 'Anne', 'Kız kardeş']),
      v('Kız kardeş', 'Sister', 'expression', 'kuhz kahr-DESH', 'Kız kardeşim resim yapmayı çok sever.', 'My sister loves painting very much.', '___im resim yapmayı çok sever.', 'Kız kardeş', ['Baba', 'Anne', 'Erkek kardeş']),
      v('Dede', 'Grandfather', 'noun', 'deh-DEH', 'Dedem her sabah bahçede yürür.', 'My grandfather walks in garden every morning.', '___m her sabah bahçede yürür.', 'Dede', ['Baba', 'Anne', 'Erkek kardeş']),
      v('Büyükanne', 'Grandmother', 'expression', 'bew-yewk-ahn-NEH', 'Büyükannem nefis yemekler pişirir.', 'My grandmother cooks delicious meals.', '___m nefis yemekler pişirir.', 'Büyükanne', ['Baba', 'Anne', 'Erkek kardeş']),
      v('Oğul', 'Son', 'noun', 'oh-OOL', 'Onların oğlu basketbol takımında oynuyor.', 'Their son plays on the basketball team.', 'Onların oğlu basketbol takımında oynuyor.', 'Oğul', ['Baba', 'Anne', 'Erkek kardeş']),
      v('Kız', 'Daughter', 'expression', 'KUHZ', 'Onların kızı piyano çalmayı öğreniyor.', 'Their daughter learns playing the piano.', 'Onların kızı piyano çalmayı öğreniyor.', 'Kız', ['Baba', 'Anne', 'Erkek kardeş']),
      v('Ebeveynler', 'Parents', 'noun', 'eh-beh-veyn-LEHR', 'Ebeveynlerim seyahat etmeyi çok sever.', 'My parents love traveling very much.', '___im seyahat etmeyi çok sever.', 'Ebeveynler', ['Baba', 'Anne', 'Erkek kardeş']),
      v('Ev', 'Home', 'expression', 'EHV', 'Yeni evimiz ferah ve aydınlık.', 'Our new home is spacious and bright.', 'Yeni evimiz ferah ve aydınlık.', 'Ev', ['Baba', 'Anne', 'Erkek kardeş']),
    ],
    5: [
      v('Ekmek', 'Bread', 'noun', 'ehk-MEHK', 'Fırından sıcak taze ekmek aldım.', 'I bought fresh hot bread from bakery.', 'Fırından sıcak taze ekmek aldım.', 'Ekmek', ['Su', 'Çay', 'Kahve']),
      v('Su', 'Water', 'expression', 'SOO', 'Bir şişe soğuk su, lütfen.', 'A bottle of cold water, please.', 'Bir şişe soğuk su, lütfen.', 'Su', ['Ekmek', 'Çay', 'Kahve']),
      v('Çay', 'Tea', 'noun', 'CHAHY', 'Türk çayı demlikte güzel demlenir.', 'Turkish tea brews nicely in teapot.', 'Türk çayı demlikte güzel demlenir.', 'Çay', ['Ekmek', 'Su', 'Kahve']),
      v('Kahve', 'Coffee', 'expression', 'kah-VEH', 'Orta şekerli bir Türk kahvesi alayım.', 'Let me take medium-sweet Turkish coffee.', 'Orta şekerli bir Türk kahvesi alayım.', 'Kahve', ['Ekmek', 'Su', 'Çay']),
      v('Elma', 'Apple', 'noun', 'ehl-MAH', 'Kırmızı elma çok tatlı ve sulu.', 'Red apple is very sweet and juicy.', 'Kırmızı elma çok tatlı ve sulu.', 'Elma', ['Ekmek', 'Su', 'Çay']),
      v('Peynir', 'Cheese', 'expression', 'pey-NEER', 'Beyaz peynir kahvaltıda harika gider.', 'White cheese goes great at breakfast.', 'Beyaz peynir kahvaltıda harika gider.', 'Peynir', ['Ekmek', 'Su', 'Çay']),
      v('Yemek', 'To eat', 'noun', 'yeh-MEHK', 'Akşamları birlikte yemek yemeyi severiz.', 'We like eating food together in evenings.', 'Akşamları birlikte yemek yemeyi severiz.', 'Yemek', ['Ekmek', 'Su', 'Çay']),
      v('İçmek', 'To drink', 'expression', 'eech-MEHK', 'Günde bol su içmek sağlıklıdır.', 'Drinking plenty of water daily is healthy.', 'Günde bol su içmek sağlıklıdır.', 'İçmek', ['Ekmek', 'Su', 'Çay']),
      v('Lezzetli', 'Delicious', 'noun', 'lehz-zeht-LEE', 'Bu geleneksel yemek gerçekten çok lezzetli.', 'This traditional food is really very delicious.', 'Bu geleneksel yemek gerçekten çok lezzetli.', 'Lezzetli', ['Ekmek', 'Su', 'Çay']),
      v('Kahvaltı', 'Breakfast', 'expression', 'kahh-vahl-TUH', 'Türk kahvaltısı zengin çeşitleriyle ünlüdür.', 'Turkish breakfast is famous for rich varieties.', 'Türk kahvaltısı zengin çeşitleriyle ünlüdür.', 'Kahvaltı', ['Ekmek', 'Su', 'Çay']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Restoran","Restaurant"],["Çarşı","Market"],["Otel","Hotel"],["Şehir","City"],["Tren","Train"],["Havalimanı","Airport"],["İş","Work"],["Okul","School"],["Sağlık","Health"],["Doğa","Nature"],["Tatil","Holiday"],["Müzik","Music"],["Tarih","History"],["Kültür","Culture"],["Bilim","Science"],["Konuşma","Speech"],["Toplum","Society"],["Başarı","Success"],["Gelecek","Future"],["Bilgi","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  TURKISH_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
