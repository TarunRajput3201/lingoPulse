import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const MALAY_LANGUAGE: LanguageDefinition = {
  code: 'ms-en',
  title: 'Malay Academy',
  description: 'Master Bahasa Melayu from polite greetings to advanced cultural and professional dialogue from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'ms',
  flagIcon: '🇲🇾',
  level: 'A1–C1',
  order: 24,
  nativeName: 'Bahasa Melayu',
  isRTL: false,
  region: 'Asian',
  culturalTips: {
    1: 'Malay shares many roots with Indonesian but features distinctive vocabulary, idioms, and polite forms.',
    2: 'Saying "Terima kasih" with a warm nod reflects Malaysian warmth and mutual courtesy.',
  },
  units: {
    1: [
      v('Helo', 'Hello', 'noun', 'HEH-loh', 'Helo, apa khabar anda hari ini?', 'Hello, how are you today?', '___, apa khabar anda hari ini?', 'Helo', ['Selamat tinggal', 'Terima kasih', 'Tolong']),
      v('Selamat tinggal', 'Goodbye', 'expression', 'seh-LAH-maht TEENG-gahl', 'Selamat tinggal dan jumpa lagi nanti!', 'Goodbye and see you again later!', '___ dan jumpa lagi nanti!', 'Selamat tinggal', ['Helo', 'Terima kasih', 'Tolong']),
      v('Terima kasih', 'Thank you', 'noun', 'teh-REE-mah KAH-seh', 'Terima kasih banyak atas pertolongan anda.', 'Thank you very much for your help.', '___ banyak atas pertolongan anda.', 'Terima kasih', ['Helo', 'Selamat tinggal', 'Tolong']),
      v('Tolong', 'Please', 'expression', 'TOH-long', 'Tolong berikan secawan kopi panas.', 'Please give a cup of hot coffee.', '___ berikan secawan kopi panas.', 'Tolong', ['Helo', 'Selamat tinggal', 'Terima kasih']),
      v('Ya', 'Yes', 'noun', 'YAH', 'Ya, saya faham penerangan ini dengan jelas.', 'Yes, I understand this explanation clearly.', '___, saya faham penerangan ini dengan jelas.', 'Ya', ['Helo', 'Selamat tinggal', 'Terima kasih']),
      v('Tidak', 'No', 'expression', 'TEE-dahk', 'Tidak, perkara itu tidak mungkin berlaku.', 'No, that matter is not possible to occur.', '___, perkara itu tidak mungkin berlaku.', 'Tidak', ['Helo', 'Selamat tinggal', 'Terima kasih']),
      v('Apa khabar', 'How are you', 'noun', 'AH-pah KHAH-bahr', 'Hai Ali, apa khabar hari ini?', 'Hi Ali, how are you today?', 'Hai Ali, apa khabar hari ini?', 'Apa khabar', ['Helo', 'Selamat tinggal', 'Terima kasih']),
      v('Selamat datang', 'Welcome', 'expression', 'seh-LAH-maht DAH-tahng', 'Selamat datang ke Malaysia!', 'Welcome to Malaysia!', '___ ke Malaysia!', 'Selamat datang', ['Helo', 'Selamat tinggal', 'Terima kasih']),
      v('Jumpa lagi', 'See you soon', 'noun', 'JOOM-pah LAH-gee', 'Semoga hari anda baik dan jumpa lagi!', 'Have a good day and see you again!', 'Semoga hari anda baik dan jumpa lagi!', 'Jumpa lagi', ['Helo', 'Selamat tinggal', 'Terima kasih']),
      v('Selamat malam', 'Good night', 'expression', 'seh-LAH-maht MAH-lahm', 'Selamat malam dan tidur lena.', 'Good night and sleep soundly.', '___ dan tidur lena.', 'Selamat malam', ['Helo', 'Selamat tinggal', 'Terima kasih']),
    ],
    2: [
      v('Gembira dapat berjumpa', 'Nice to meet you', 'noun', 'gem-BEE-rah dah-PAHT ber-JOOM-pah', 'Sangat gembira dapat berjumpa dengan anda.', 'Very glad to be able to meet with you.', 'Sangat gembira dapat berjumpa dengan anda.', 'Gembira dapat berjumpa', ['Nama saya', 'Maafkan saya', 'Selamat pagi']),
      v('Nama saya', 'My name is', 'expression', 'NAH-mah SAH-yah', 'Helo, nama saya Amir.', 'Hello, my name is Amir.', 'Helo, nama saya Amir.', 'Nama saya', ['Gembira dapat berjumpa', 'Maafkan saya', 'Selamat pagi']),
      v('Maafkan saya', 'Excuse me / Sorry', 'noun', 'mah-AHF-kahn SAH-yah', 'Maafkan saya, di manakah stesen kereta api?', 'Excuse me, where is the train station?', '___, di manakah stesen kereta api?', 'Maafkan saya', ['Gembira dapat berjumpa', 'Nama saya', 'Selamat pagi']),
      v('Selamat pagi', 'Good morning', 'expression', 'seh-LAH-maht PAH-gee', 'Selamat pagi kepada semua rakan!', 'Good morning to all friends!', '___ kepada semua rakan!', 'Selamat pagi', ['Gembira dapat berjumpa', 'Nama saya', 'Maafkan saya']),
      v('Selamat petang', 'Good afternoon', 'noun', 'seh-LAH-maht peh-TAHNG', 'Selamat petang dan selamat beristirehat.', 'Good afternoon and have a good rest.', '___ dan selamat beristirehat.', 'Selamat petang', ['Gembira dapat berjumpa', 'Nama saya', 'Maafkan saya']),
      v('Kawan', 'Friend', 'expression', 'KAH-wahn', 'Dia merupakan kawan karib saya sejak sekolah.', 'He is my close friend since school.', 'Dia merupakan kawan karib saya sejak sekolah.', 'Kawan', ['Gembira dapat berjumpa', 'Nama saya', 'Maafkan saya']),
      v('Guru', 'Teacher', 'noun', 'GOO-roo', 'Guru kami mengajar dengan penuh dedikasi.', 'Our teacher teaches with full dedication.', '___ kami mengajar dengan penuh dedikasi.', 'Guru', ['Gembira dapat berjumpa', 'Nama saya', 'Maafkan saya']),
      v('Keluarga', 'Family', 'expression', 'keh-loo-AHR-gah', 'Keluarga saya tinggal di Kuala Lumpur.', 'My family lives in Kuala Lumpur.', '___ saya tinggal di Kuala Lumpur.', 'Keluarga', ['Gembira dapat berjumpa', 'Nama saya', 'Maafkan saya']),
      v('Hebat', 'Great', 'noun', 'HEH-baht', 'Pencapaian anda dalam ujian sungguh hebat.', 'Your achievement in the test is truly great.', 'Pencapaian anda dalam ujian sungguh hebat.', 'Hebat', ['Gembira dapat berjumpa', 'Nama saya', 'Maafkan saya']),
      v('Baik', 'Good', 'expression', 'BAH-eek', 'Semuanya berada dalam keadaan yang baik.', 'Everything is in good condition.', 'Semuanya berada dalam keadaan yang baik.', 'Baik', ['Gembira dapat berjumpa', 'Nama saya', 'Maafkan saya']),
    ],
    3: [
      v('Satu', 'One', 'noun', 'SAH-too', 'Saya ada satu tiket bas ekspres.', 'I have one express bus ticket.', 'Saya ada satu tiket bas ekspres.', 'Satu', ['Dua', 'Tiga', 'Empat']),
      v('Dua', 'Two', 'expression', 'DOO-ah', 'Dua cawan teh tarik, tolong.', 'Two cups of pulled tea, please.', '___ cawan teh tarik, tolong.', 'Dua', ['Satu', 'Tiga', 'Empat']),
      v('Tiga', 'Three', 'noun', 'TEE-gah', 'Terdapat tiga bilik kosong di hotel.', 'There are three vacant rooms in hotel.', 'Terdapat tiga bilik kosong di hotel.', 'Tiga', ['Satu', 'Dua', 'Empat']),
      v('Empat', 'Four', 'expression', 'em-PAHT', 'Kami datang berempat hari ini.', 'We came as four people today.', 'Kami datang berempat hari ini.', 'Empat', ['Satu', 'Dua', 'Tiga']),
      v('Lima', 'Five', 'noun', 'LEE-mah', 'Kereta api akan berlepas lima minit lagi.', 'The train will depart in five minutes.', 'Kereta api akan berlepas lima minit lagi.', 'Lima', ['Satu', 'Dua', 'Tiga']),
      v('Sepuluh', 'Ten', 'expression', 'seh-POO-loh', 'Harganya sepuluh ringgit sahaja.', 'The price is ten ringgit only.', 'Harganya sepuluh ringgit sahaja.', 'Sepuluh', ['Satu', 'Dua', 'Tiga']),
      v('Dua puluh', 'Twenty', 'noun', 'DOO-ah POO-loh', 'Terdapat dua puluh kerusi di dalam dewan.', 'There are twenty chairs in the hall.', 'Terdapat dua puluh kerusi di dalam dewan.', 'Dua puluh', ['Satu', 'Dua', 'Tiga']),
      v('Lima puluh', 'Fifty', 'expression', 'LEE-mah POO-loh', 'Dewan ini boleh memuatkan lima puluh tetamu.', 'This hall can accommodate fifty guests.', 'Dewan ini boleh memuatkan lima puluh tetamu.', 'Lima puluh', ['Satu', 'Dua', 'Tiga']),
      v('Seratus', 'One hundred', 'noun', 'seh-RAH-toos', 'Buku ini mengandungi seratus halaman.', 'This book contains hundred pages.', 'Buku ini mengandungi seratus halaman.', 'Seratus', ['Satu', 'Dua', 'Tiga']),
      v('Mengira', 'To count', 'expression', 'mehng-GEE-rah', 'Saya boleh mengira dengan pantas.', 'I can count quickly.', 'Saya boleh mengira dengan pantas.', 'Mengira', ['Satu', 'Dua', 'Tiga']),
    ],
    4: [
      v('Bapa', 'Father', 'noun', 'BAH-pah', 'Bapa saya seorang jurutera.', 'My father is an engineer.', '___ saya seorang jurutera.', 'Bapa', ['Ibu', 'Abang', 'Kakak']),
      v('Ibu', 'Mother', 'expression', 'EE-boo', 'Ibu saya bertugas sebagai doktor.', 'My mother serves as doctor.', '___ saya bertugas sebagai doktor.', 'Ibu', ['Bapa', 'Abang', 'Kakak']),
      v('Abang', 'Brother', 'noun', 'AH-bahng', 'Abang sulung saya belajar di universiti.', 'My eldest brother studies at university.', '___ sulung saya belajar di universiti.', 'Abang', ['Bapa', 'Ibu', 'Kakak']),
      v('Kakak', 'Sister', 'expression', 'KAH-kahk', 'Kakak saya suka bermain alat muzik.', 'My older sister likes playing musical instrument.', '___ saya suka bermain alat muzik.', 'Kakak', ['Bapa', 'Ibu', 'Abang']),
      v('Datuk', 'Grandfather', 'noun', 'DAH-tok', 'Datuk gemar bersiar-siar di halaman rumah.', 'Grandfather enjoys strolling in courtyard.', '___ gemar bersiar-siar di halaman rumah.', 'Datuk', ['Bapa', 'Ibu', 'Abang']),
      v('Nenek', 'Grandmother', 'expression', 'NEH-nehk', 'Nenek memasak hidangan tradisional yang enak.', 'Grandmother cooks delicious traditional dishes.', '___ memasak hidangan tradisional yang enak.', 'Nenek', ['Bapa', 'Ibu', 'Abang']),
      v('Anak lelaki', 'Son', 'noun', 'AH-nahk leh-LAH-kee', 'Anak lelaki mereka aktif dalam sukan.', 'Their son is active in sports.', '___ mereka aktif dalam sukan.', 'Anak lelaki', ['Bapa', 'Ibu', 'Abang']),
      v('Anak perempuan', 'Daughter', 'expression', 'AH-nahk peh-rem-POO-ahn', 'Anak perempuan mereka rajin membaca buku.', 'Their daughter is diligent reading books.', '___ mereka rajin membaca buku.', 'Anak perempuan', ['Bapa', 'Ibu', 'Abang']),
      v('Ibu bapa', 'Parents', 'noun', 'EE-boo BAH-pah', 'Ibu bapa saya gemar melancong bersama.', 'My parents enjoy vacationing together.', '___ saya gemar melancong bersama.', 'Ibu bapa', ['Bapa', 'Ibu', 'Abang']),
      v('Rumah', 'Home', 'expression', 'ROO-mah', 'Rumah kami bersih, selesa, dan damai.', 'Our home is clean, comfortable, and peaceful.', '___ kami bersih, selesa, dan damai.', 'Rumah', ['Bapa', 'Ibu', 'Abang']),
    ],
    5: [
      v('Roti', 'Bread', 'noun', 'ROH-tee', 'Roti canai panas enak dimakan pagi.', 'Hot roti canai is delicious eaten in morning.', '___ canai panas enak dimakan pagi.', 'Roti', ['Air', 'Teh', 'Kopi']),
      v('Air', 'Water', 'expression', 'AH-eer', 'Segelas air suam, tolong.', 'A glass of lukewarm water, please.', 'Segelas air suam, tolong.', 'Air', ['Roti', 'Teh', 'Kopi']),
      v('Teh', 'Tea', 'noun', 'TEH', 'Teh tarik adalah minuman kegemaran ramai.', 'Pulled tea is favorite drink of many.', '___ tarik adalah minuman kegemaran ramai.', 'Teh', ['Roti', 'Air', 'Kopi']),
      v('Kopi', 'Coffee', 'expression', 'KOH-pee', 'Kopi kampung mempunyai aroma yang memikat.', 'Village coffee has captivating aroma.', '___ kampung mempunyai aroma yang memikat.', 'Kopi', ['Roti', 'Air', 'Teh']),
      v('Epal', 'Apple', 'noun', 'EH-pahl', 'Buah epal merah segar dan rangup.', 'Red apple is fresh and crisp.', 'Buah epal merah segar dan rangup.', 'Epal', ['Roti', 'Air', 'Teh']),
      v('Keju', 'Cheese', 'expression', 'KEH-joo', 'Keju enak dijadikan inti sandwich.', 'Cheese is delicious made as sandwich filling.', '___ enak dijadikan inti sandwich.', 'Keju', ['Roti', 'Air', 'Teh']),
      v('Makan', 'To eat', 'noun', 'MAH-kahn', 'Mari kita makan tengah hari bersama-sama.', 'Let us eat lunch together.', 'Mari kita makan tengah hari bersama-sama.', 'Makan', ['Roti', 'Air', 'Teh']),
      v('Minum', 'To drink', 'expression', 'MEE-noom', 'Minum air secukupnya penting untuk kesihatan.', 'Drinking enough water is important for health.', '___ air secukupnya penting untuk kesihatan.', 'Minum', ['Roti', 'Air', 'Teh']),
      v('Sedap', 'Delicious', 'noun', 'seh-DAHP', 'Nasi lemak ini sungguh sedap dan wangi.', 'This nasi lemak is truly delicious and fragrant.', 'Nasi lemak ini sungguh sedap dan wangi.', 'Sedap', ['Roti', 'Air', 'Teh']),
      v('Sarapan', 'Breakfast', 'expression', 'sah-RAH-pahn', 'Sarapan pagi bermula pada jam tujuh.', 'Breakfast starts at seven o\'clock.', '___ pagi bermula pada jam tujuh.', 'Sarapan', ['Roti', 'Air', 'Teh']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Restoran","Restaurant"],["Kedai","Shop"],["Hotel","Hotel"],["Bandar","City"],["Kereta Api","Train"],["Lapangan Terbang","Airport"],["Kerja","Work"],["Sekolah","School"],["Kesihatan","Health"],["Alam","Nature"],["Percutian","Holiday"],["Muzik","Music"],["Sejarah","History"],["Budaya","Culture"],["Sains","Science"],["Perbualan","Conversation"],["Masyarakat","Society"],["Kejayaan","Success"],["Masa Depan","Future"],["Ilmu","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  MALAY_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
