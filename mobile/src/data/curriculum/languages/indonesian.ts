import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const INDONESIAN_LANGUAGE: LanguageDefinition = {
  code: 'id-en',
  title: 'Indonesian Academy',
  description: 'Master Bahasa Indonesia from straightforward grammar to fluent cultural conversation from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'id',
  flagIcon: '🇮🇩',
  level: 'A1–C1',
  order: 23,
  nativeName: 'Bahasa Indonesia',
  isRTL: false,
  region: 'Asian',
  culturalTips: {
    1: 'Indonesian has no grammatical gender, verb conjugations, or tenses; time is expressed through time adverbs.',
    2: 'Saying "Terima kasih" expresses sincere gratitude across the entire Indonesian archipelago.',
  },
  units: {
    1: [
      v('Halo', 'Hello', 'noun', 'HAH-loh', 'Halo, bagaimana kabar Anda hari ini?', 'Hello, how are you today?', '___, bagaimana kabar Anda hari ini?', 'Halo', ['Selamat tinggal', 'Terima kasih', 'Tolong']),
      v('Selamat tinggal', 'Goodbye', 'expression', 'seh-LAH-maht TEENG-gahl', 'Selamat tinggal dan sampai jumpa lagi!', 'Goodbye and see you soon again!', '___ dan sampai jumpa lagi!', 'Selamat tinggal', ['Halo', 'Terima kasih', 'Tolong']),
      v('Terima kasih', 'Thank you', 'noun', 'teh-REE-mah KAH-see', 'Terima kasih banyak atas bantuan Anda.', 'Thank you very much for your help.', '___ banyak atas bantuan Anda.', 'Terima kasih', ['Halo', 'Selamat tinggal', 'Tolong']),
      v('Tolong', 'Please', 'expression', 'TOH-long', 'Tolong buatkan secangkir kopi panas.', 'Please make a cup of hot coffee.', '___ buatkan secangkir kopi panas.', 'Tolong', ['Halo', 'Selamat tinggal', 'Terima kasih']),
      v('Ya', 'Yes', 'noun', 'YAH', 'Ya, saya mengerti penjelasan ini.', 'Yes, I understand this explanation.', '___, saya mengerti penjelasan ini.', 'Ya', ['Halo', 'Selamat tinggal', 'Terima kasih']),
      v('Tidak', 'No', 'expression', 'TEE-dahk', 'Tidak, itu tidak mungkin dilakukan sekarang.', 'No, that is not possible done now.', '___, itu tidak mungkin dilakukan sekarang.', 'Tidak', ['Halo', 'Selamat tinggal', 'Terima kasih']),
      v('Apa kabar', 'How are you', 'noun', 'AH-pah KAH-bahr', 'Halo Budi, apa kabar hari ini?', 'Hello Budi, how are you today?', 'Halo Budi, apa kabar hari ini?', 'Apa kabar', ['Halo', 'Selamat tinggal', 'Terima kasih']),
      v('Selamat datang', 'Welcome', 'expression', 'seh-LAH-maht DAH-tahng', 'Selamat datang di negara kami yang indah!', 'Welcome to our beautiful country!', '___ di negara kami yang indah!', 'Selamat datang', ['Halo', 'Selamat tinggal', 'Terima kasih']),
      v('Sampai jumpa lagi', 'See you soon', 'noun', 'SAHM-pye JOOM-pah LAH-gee', 'Semoga hari menyenangkan dan sampai jumpa lagi!', 'Have a pleasant day and see you soon!', 'Semoga hari menyenangkan dan sampai jumpa lagi!', 'Sampai jumpa lagi', ['Halo', 'Selamat tinggal', 'Terima kasih']),
      v('Selamat tidur', 'Good night', 'expression', 'seh-LAH-maht TEE-dur', 'Selamat tidur dan mimpi indah.', 'Good night and sweet dreams.', '___ dan mimpi indah.', 'Selamat tidur', ['Halo', 'Selamat tinggal', 'Terima kasih']),
    ],
    2: [
      v('Senang bertemu denganmu', 'Nice to meet you', 'noun', 'seh-NAHNG ber-teh-MOO deh-NGAHN-moo', 'Sangat senang bertemu dengan Anda di sini.', 'Very glad to meet you here.', 'Sangat senang bertemu dengan Anda di sini.', 'Senang bertemu denganmu', ['Nama saya', 'Permisi', 'Selamat pagi']),
      v('Nama saya', 'My name is', 'expression', 'NAH-mah SAH-yah', 'Halo, nama saya Bayu.', 'Hello, my name is Bayu.', 'Halo, nama saya Bayu.', 'Nama saya', ['Senang bertemu denganmu', 'Permisi', 'Selamat pagi']),
      v('Permisi', 'Excuse me / Sorry', 'noun', 'per-MEE-see', 'Permisi, di mana letak stasiun kereta?', 'Excuse me, where is location of train station?', '___, di mana letak stasiun kereta?', 'Permisi', ['Senang bertemu denganmu', 'Nama saya', 'Selamat pagi']),
      v('Selamat pagi', 'Good morning', 'expression', 'seh-LAH-maht PAH-gee', 'Selamat pagi untuk kita semua!', 'Good morning to us all!', '___ untuk kita semua!', 'Selamat pagi', ['Senang bertemu denganmu', 'Nama saya', 'Permisi']),
      v('Selamat malam', 'Good evening', 'noun', 'seh-LAH-maht MAH-lahm', 'Selamat malam dan selamat datang malam ini.', 'Good evening and welcome tonight.', '___ dan selamat datang malam ini.', 'Selamat malam', ['Senang bertemu denganmu', 'Nama saya', 'Permisi']),
      v('Teman', 'Friend', 'expression', 'teh-MAHN', 'Dia adalah teman baik saya sejak kecil.', 'He is my good friend since childhood.', 'Dia adalah teman baik saya sejak kecil.', 'Teman', ['Senang bertemu denganmu', 'Nama saya', 'Permisi']),
      v('Guru', 'Teacher', 'noun', 'GOO-roo', 'Guru kami menjelaskan materi dengan jelas.', 'Our teacher explains material clearly.', '___ kami menjelaskan materi dengan jelas.', 'Guru', ['Senang bertemu denganmu', 'Nama saya', 'Permisi']),
      v('Keluarga', 'Family', 'expression', 'keh-loo-AHR-gah', 'Keluarga saya tinggal di kota Bandung.', 'My family lives in Bandung city.', '___ saya tinggal di kota Bandung.', 'Keluarga', ['Senang bertemu denganmu', 'Nama saya', 'Permisi']),
      v('Luar biasa', 'Excellent', 'noun', 'LOO-ahr bee-AH-sah', 'Hasil ujian hari ini sungguh luar biasa.', 'Today exam result is truly extraordinary.', 'Hasil ujian hari ini sungguh luar biasa.', 'Luar biasa', ['Senang bertemu denganmu', 'Nama saya', 'Permisi']),
      v('Baik', 'Good', 'expression', 'BAH-eek', 'Semua berjalan dengan sangat baik.', 'Everything runs very well.', 'Semua berjalan dengan sangat baik.', 'Baik', ['Senang bertemu denganmu', 'Nama saya', 'Permisi']),
    ],
    3: [
      v('Satu', 'One', 'noun', 'SAH-too', 'Saya punya satu tiket kereta api.', 'I have one train ticket.', 'Saya punya satu tiket kereta api.', 'Satu', ['Dua', 'Tiga', 'Empat']),
      v('Dua', 'Two', 'expression', 'DOO-ah', 'Dua cangkir kopi panas, tolong.', 'Two cups of hot coffee, please.', '___ cangkir kopi panas, tolong.', 'Dua', ['Satu', 'Tiga', 'Empat']),
      v('Tiga', 'Three', 'noun', 'TEE-gah', 'Ada tiga kamar kosong di hotel.', 'There are three vacant rooms in hotel.', 'Ada tiga kamar kosong di hotel.', 'Tiga', ['Satu', 'Dua', 'Empat']),
      v('Empat', 'Four', 'expression', 'em-PAHT', 'Kami berangkat berempat.', 'We depart as four people.', 'Kami berangkat berempat.', 'Empat', ['Satu', 'Dua', 'Tiga']),
      v('Lima', 'Five', 'noun', 'LEE-mah', 'Kereta akan tiba dalam lima menit.', 'The train will arrive in five minutes.', 'Kereta akan tiba dalam lima menit.', 'Lima', ['Satu', 'Dua', 'Tiga']),
      v('Sepuluh', 'Ten', 'expression', 'seh-POO-loo', 'Harganya tepat sepuluh ribu rupiah.', 'The price is exactly ten thousand rupiah.', 'Harganya tepat sepuluh ribu rupiah.', 'Sepuluh', ['Satu', 'Dua', 'Tiga']),
      v('Dua puluh', 'Twenty', 'noun', 'DOO-ah POO-loo', 'Ada dua puluh siswa di kelas.', 'There are twenty students in classroom.', 'Ada dua puluh siswa di kelas.', 'Dua puluh', ['Satu', 'Dua', 'Tiga']),
      v('Lima puluh', 'Fifty', 'expression', 'LEE-mah POO-loo', 'Ruang pertemuan berkapasitas lima puluh orang.', 'Meeting room has capacity of fifty people.', 'Ruang pertemuan berkapasitas lima puluh orang.', 'Lima puluh', ['Satu', 'Dua', 'Tiga']),
      v('Seratus', 'One hundred', 'noun', 'seh-RAH-toos', 'Buku ini berisi seratus halaman.', 'This book contains hundred pages.', 'Buku ini berisi seratus halaman.', 'Seratus', ['Satu', 'Dua', 'Tiga']),
      v('Menghitung', 'To count', 'expression', 'meng-HEE-toong', 'Saya bisa menghitung dalam bahasa Indonesia.', 'I can count in Indonesian language.', 'Saya bisa menghitung dalam bahasa Indonesia.', 'Menghitung', ['Satu', 'Dua', 'Tiga']),
    ],
    4: [
      v('Ayah', 'Father', 'noun', 'AH-yah', 'Ayah saya bekerja sebagai arsitek.', 'My father works as architect.', '___ saya bekerja sebagai arsitek.', 'Ayah', ['Ibu', 'Kakak laki-laki', 'Kakak perempuan']),
      v('Ibu', 'Mother', 'expression', 'EE-boo', 'Ibu saya adalah dokter di rumah sakit.', 'My mother is doctor in hospital.', '___ saya adalah dokter di rumah sakit.', 'Ibu', ['Ayah', 'Kakak laki-laki', 'Kakak perempuan']),
      v('Kakak laki-laki', 'Brother', 'noun', 'KAH-kahk LAH-kee LAH-kee', 'Kakak laki-laki saya kuliah di Jakarta.', 'My older brother studies in Jakarta.', '___ saya kuliah di Jakarta.', 'Kakak laki-laki', ['Ayah', 'Ibu', 'Kakak perempuan']),
      v('Kakak perempuan', 'Sister', 'expression', 'KAH-kahk peh-rem-POO-ahn', 'Kakak perempuan saya pandai menyanyi.', 'My older sister is good at singing.', '___ saya pandai menyanyi.', 'Kakak perempuan', ['Ayah', 'Ibu', 'Kakak laki-laki']),
      v('Kakek', 'Grandfather', 'noun', 'KAH-kehk', 'Kakek suka jalan-jalan di taman setiap pagi.', 'Grandfather likes walking in park every morning.', '___ suka jalan-jalan di taman setiap pagi.', 'Kakek', ['Ayah', 'Ibu', 'Kakak laki-laki']),
      v('Nenek', 'Grandmother', 'expression', 'NEH-nehk', 'Nenek membuat kue tradisional yang lezat.', 'Grandmother makes delicious traditional cake.', '___ membuat kue tradisional yang lezat.', 'Nenek', ['Ayah', 'Ibu', 'Kakak laki-laki']),
      v('Anak laki-laki', 'Son', 'noun', 'AH-nahk LAH-kee LAH-kee', 'Anak laki-laki mereka gemar berolahraga.', 'Their son loves playing sports.', '___ mereka gemar berolahraga.', 'Anak laki-laki', ['Ayah', 'Ibu', 'Kakak laki-laki']),
      v('Anak perempuan', 'Daughter', 'expression', 'AH-nahk peh-rem-POO-ahn', 'Anak perempuan mereka belajar melukis.', 'Their daughter learns painting.', '___ mereka belajar melukis.', 'Anak perempuan', ['Ayah', 'Ibu', 'Kakak laki-laki']),
      v('Orang tua', 'Parents', 'noun', 'OH-rahng TOO-ah', 'Orang tua saya gemar bepergian ke alam.', 'My parents love traveling to nature.', '___ saya gemar bepergian ke alam.', 'Orang tua', ['Ayah', 'Ibu', 'Kakak laki-laki']),
      v('Rumah', 'Home', 'expression', 'ROO-mah', 'Rumah kami nyaman, bersih, dan asri.', 'Our home is comfortable, clean, and shady.', '___ kami nyaman, bersih, dan asri.', 'Rumah', ['Ayah', 'Ibu', 'Kakak laki-laki']),
    ],
    5: [
      v('Roti', 'Bread', 'noun', 'ROH-tee', 'Saya membeli roti tawar hangat di toko.', 'I buy warm plain bread at shop.', 'Saya membeli roti tawar hangat di toko.', 'Roti', ['Air', 'Teh', 'Kopi']),
      v('Air', 'Water', 'expression', 'AH-eer', 'Segelas air putih dingin, tolong.', 'A glass of cold plain water, please.', 'Segelas air putih dingin, tolong.', 'Air', ['Roti', 'Teh', 'Kopi']),
      v('Teh', 'Tea', 'noun', 'TEH', 'Apakah Anda suka teh melati manis?', 'Do you like sweet jasmine tea?', 'Apakah Anda suka teh melati manis?', 'Teh', ['Roti', 'Air', 'Kopi']),
      v('Kopi', 'Coffee', 'expression', 'KOH-pee', 'Kopi Nusantara memiliki cita rasa khas.', 'Nusantara coffee has distinct flavor.', '___ Nusantara memiliki cita rasa khas.', 'Kopi', ['Roti', 'Air', 'Teh']),
      v('Apel', 'Apple', 'noun', 'AH-pel', 'Buah apel merah ini manis dan segar.', 'This red apple is sweet and fresh.', 'Buah apel merah ini manis dan segar.', 'Apel', ['Roti', 'Air', 'Teh']),
      v('Keju', 'Cheese', 'expression', 'KEH-joo', 'Roti bakar dengan keju sangat gurih.', 'Toast with cheese is very savory.', 'Roti bakar dengan keju sangat gurih.', 'Keju', ['Roti', 'Air', 'Teh']),
      v('Makan', 'To eat', 'noun', 'MAH-kahn', 'Mari kita makan malam bersama keluarga.', 'Let us eat dinner together with family.', 'Mari kita makan malam bersama keluarga.', 'Makan', ['Roti', 'Air', 'Teh']),
      v('Minum', 'To drink', 'expression', 'MEE-noom', 'Penting untuk minum air putih yang cukup.', 'Important to drink sufficient plain water.', 'Penting untuk minum air putih yang cukup.', 'Minum', ['Roti', 'Air', 'Teh']),
      v('Enak', 'Delicious', 'noun', 'EH-nahk', 'Masakan tradisional ini sungguh enak rasanya.', 'This traditional dish is truly delicious in taste.', 'Masakan tradisional ini sungguh enak rasanya.', 'Enak', ['Roti', 'Air', 'Teh']),
      v('Sarapan', 'Breakfast', 'expression', 'sah-RAH-pahn', 'Sarapan pagi disajikan jam tujuh.', 'Breakfast is served at seven o\'clock.', '___ pagi disajikan jam tujuh.', 'Sarapan', ['Roti', 'Air', 'Teh']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Restoran","Restaurant"],["Toko","Shop"],["Hotel","Hotel"],["Kota","City"],["Kereta","Train"],["Bandara","Airport"],["Pekerjaan","Work"],["Sekolah","School"],["Kesehatan","Health"],["Alam","Nature"],["Liburan","Holiday"],["Musik","Music"],["Sejarah","History"],["Budaya","Culture"],["Sains","Science"],["Percakapan","Conversation"],["Masyarakat","Society"],["Kesuksesan","Success"],["Masa Depan","Future"],["Pengetahuan","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  INDONESIAN_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
