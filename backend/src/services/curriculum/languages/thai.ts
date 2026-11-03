import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const THAI_LANGUAGE: LanguageDefinition = {
  code: 'th-en',
  title: 'Thai Academy',
  description: 'Master Thai script, tones, and polite conversational fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'th',
  flagIcon: '🇹🇭',
  level: 'A1–C1',
  order: 21,
  nativeName: 'ไทย',
  isRTL: false,
  region: 'Asian',
  culturalTips: {
    1: 'Thai has 5 distinctive tones (low, mid, high, falling, rising) that determine word meaning.',
    2: 'End sentences with polite particles "ครับ" (krap, by men) or "ค่ะ" (ka, by women).',
  },
  units: {
    1: [
      v('สวัสดี', 'Hello', 'noun', 'Sah-wahd-dee', 'สวัสดี วันนี้ สบายดี ไหม', 'Hello, how are you today?', '___ วันนี้ สบายดี ไหม', 'สวัสดี', ['ลาก่อน', 'ขอบคุณ', 'ได้โปรด']),
      v('ลาก่อน', 'Goodbye', 'expression', 'Lah-gawn', 'ลาก่อน และ พบกัน ใหม่ เร็วๆ นี้', 'Goodbye and see you soon!', '___ และ พบกัน ใหม่ เร็วๆ นี้', 'ลาก่อน', ['สวัสดี', 'ขอบคุณ', 'ได้โปรด']),
      v('ขอบคุณ', 'Thank you', 'noun', 'Khawp-khoon', 'ขอบคุณ มาก สำหรับ ความช่วยเหลือ ของคุณ', 'Thank you very much for your help.', '___ มาก สำหรับ ความช่วยเหลือ ของคุณ', 'ขอบคุณ', ['สวัสดี', 'ลาก่อน', 'ได้โปรด']),
      v('ได้โปรด', 'Please', 'expression', 'Dai-prohd', 'ขอกาแฟ ร้อน หนึ่งแก้ว ได้โปรด', 'A cup of hot coffee, please.', 'ขอกาแฟ ร้อน หนึ่งแก้ว ___', 'ได้โปรด', ['สวัสดี', 'ลาก่อน', 'ขอบคุณ']),
      v('ใช่', 'Yes', 'noun', 'Chai', 'ใช่ ฉัน เข้าใจ ดี มาก', 'Yes, I understand very well.', '___ ฉัน เข้าใจ ดี มาก', 'ใช่', ['สวัสดี', 'ลาก่อน', 'ขอบคุณ']),
      v('ไม่', 'No', 'expression', 'Mai', 'ไม่ วันนี้ ยัง ไม่ สะดวก', 'No, not convenient today.', '___ วันนี้ ยัง ไม่ สะดวก', 'ไม่', ['สวัสดี', 'ลาก่อน', 'ขอบคุณ']),
      v('สบายดีไหม', 'How are you', 'noun', 'Sah-bai-dee-mai', 'สวัสดี เพื่อน สบายดีไหม วันนี้', 'Hello friend, how are you today?', 'สวัสดี เพื่อน ___ วันนี้', 'สบายดีไหม', ['สวัสดี', 'ลาก่อน', 'ขอบคุณ']),
      v('ยินดีต้อนรับ', 'Welcome', 'expression', 'Yin-dee-dtawn-rahp', 'ยินดีต้อนรับ สู่ ประเทศไทย', 'Welcome to Thailand!', '___ สู่ ประเทศไทย', 'ยินดีต้อนรับ', ['สวัสดี', 'ลาก่อน', 'ขอบคุณ']),
      v('พบกันใหม่', 'See you soon', 'noun', 'Phop-gahn-mai', 'ขอให้ มี วันที่ดี และ พบกันใหม่', 'Have a good day and see you soon!', 'ขอให้ มี วันที่ดี และ ___', 'พบกันใหม่', ['สวัสดี', 'ลาก่อน', 'ขอบคุณ']),
      v('ราตรีสวัสดิ์', 'Good night', 'expression', 'Rah-dtree-sah-wahd', 'ราตรีสวัสดิ์ และ หลับฝันดี', 'Good night and sweet dreams.', '___ และ หลับฝันดี', 'ราตรีสวัสดิ์', ['สวัสดี', 'ลาก่อน', 'ขอบคุณ']),
    ],
    2: [
      v('ยินดีที่ได้รู้จัก', 'Nice to meet you', 'noun', 'Yin-dee-tee-dai-roo-jahk', 'ยินดีที่ได้รู้จัก คุณ มากครับ', 'Very nice to meet you.', '___ คุณ มากครับ', 'ยินดีที่ได้รู้จัก', ['ฉันชื่อ', 'ขอโทษ', 'อรุณสวัสดิ์']),
      v('ฉันชื่อ', 'My name is', 'expression', 'Chan-cheu', 'สวัสดี ฉันชื่อ สมชาย ครับ', 'Hello, my name is Somchai.', 'สวัสดี ___ สมชาย ครับ', 'ฉันชื่อ', ['ยินดีที่ได้รู้จัก', 'ขอโทษ', 'อรุณสวัสดิ์']),
      v('ขอโทษ', 'Excuse me / Sorry', 'noun', 'Khaw-toht', 'ขอโทษ สถานี รถไฟ อยู่ที่ไหน', 'Excuse me, where is train station?', '___ สถานี รถไฟ อยู่ที่ไหน', 'ขอโทษ', ['ยินดีที่ได้รู้จัก', 'ฉันชื่อ', 'อรุณสวัสดิ์']),
      v('อรุณสวัสดิ์', 'Good morning', 'expression', 'Ah-roon-sah-wahd', 'อรุณสวัสดิ์ ขอให้ มีความสุข ทุกคน', 'Good morning, have happiness everyone!', '___ ขอให้ มีความสุข ทุกคน', 'อรุณสวัสดิ์', ['ยินดีที่ได้รู้จัก', 'ฉันชื่อ', 'ขอโทษ']),
      v('สวัสดีตอนเย็น', 'Good evening', 'noun', 'Sah-wahd-dee-dtawn-yen', 'สวัสดีตอนเย็น และ ยินดีต้อนรับ', 'Good evening and welcome.', '___ และ ยินดีต้อนรับ', 'สวัสดีตอนเย็น', ['ยินดีที่ได้รู้จัก', 'ฉันชื่อ', 'ขอโทษ']),
      v('เพื่อน', 'Friend', 'expression', 'Pheuan', 'เขา คือ เพื่อนสนิท ที่ดีที่สุด', 'He is the best close friend.', 'เขา คือ ___สนิท ที่ดีที่สุด', 'เพื่อน', ['ยินดีที่ได้รู้จัก', 'ฉันชื่อ', 'ขอโทษ']),
      v('ครู', 'Teacher', 'noun', 'Khroo', 'ครู สอน บทเรียน ได้เข้าใจ ง่าย', 'Teacher teaches lesson easy to understand.', '___ สอน บทเรียน ได้เข้าใจ ง่าย', 'ครู', ['ยินดีที่ได้รู้จัก', 'ฉันชื่อ', 'ขอโทษ']),
      v('ครอบครัว', 'Family', 'expression', 'Khrawp-khruah', 'ครอบครัว ของฉัน อยู่ที่ กรุงเทพฯ', 'My family lives in Bangkok.', '___ ของฉัน อยู่ที่ กรุงเทพฯ', 'ครอบครัว', ['ยินดีที่ได้รู้จัก', 'ฉันชื่อ', 'ขอโทษ']),
      v('ยอดเยี่ยม', 'Excellent', 'noun', 'Yawt-yiam', 'ผลการสอบ ครั้งนี้ ยอดเยี่ยม มาก', 'The exam result this time is excellent.', 'ผลการสอบ ครั้งนี้ ___ มาก', 'ยอดเยี่ยม', ['ยินดีที่ได้รู้จัก', 'ฉันชื่อ', 'ขอโทษ']),
      v('ดี', 'Good', 'expression', 'Dee', 'ทุกอย่าง ดำเนินไป ได้ ดี มาก', 'Everything proceeds very well.', 'ทุกอย่าง ดำเนินไป ได้ ___ มาก', 'ดี', ['ยินดีที่ได้รู้จัก', 'ฉันชื่อ', 'ขอโทษ']),
    ],
    3: [
      v('หนึ่ง', 'One', 'noun', 'Neung', 'ฉัน มี ตั๋วรถไฟ หนึ่ง ใบ', 'I have one train ticket.', 'ฉัน มี ตั๋วรถไฟ ___ ใบ', 'หนึ่ง', ['สอง', 'สาม', 'สี่']),
      v('สอง', 'Two', 'expression', 'Sawng', 'ขอกาแฟ ร้อน สอง แก้ว ครับ', 'Two cups of hot coffee, please.', 'ขอกาแฟ ร้อน ___ แก้ว ครับ', 'สอง', ['หนึ่ง', 'สาม', 'สี่']),
      v('สาม', 'Three', 'noun', 'Sahm', 'มี ห้องว่าง สาม ห้อง ในโรงแรม', 'There are three vacant rooms in hotel.', 'มี ห้องว่าง ___ ห้อง ในโรงแรม', 'สาม', ['หนึ่ง', 'สอง', 'สี่']),
      v('สี่', 'Four', 'expression', 'See', 'พวกเรา มากัน สี่ คน', 'We come as four people.', 'พวกเรา มากัน ___ คน', 'สี่', ['หนึ่ง', 'สอง', 'สาม']),
      v('ห้า', 'Five', 'noun', 'Hah', 'รถไฟ จะออก ใน ห้า นาที', 'The train departs in five minutes.', 'รถไฟ จะออก ใน ___ นาที', 'ห้า', ['หนึ่ง', 'สอง', 'สาม']),
      v('สิบ', 'Ten', 'expression', 'Sip', 'ราคา สิบ บาท พอดี', 'Price is exactly ten baht.', 'ราคา ___ บาท พอดี', 'สิบ', ['หนึ่ง', 'สอง', 'สาม']),
      v('ยี่สิบ', 'Twenty', 'noun', 'Yee-sip', 'ระยะทาง ยี่สิบ กิโลเมตร', 'The distance is twenty kilometers.', 'ระยะทาง ___ กิโลเมตร', 'ยี่สิบ', ['หนึ่ง', 'สอง', 'สาม']),
      v('ห้าสิบ', 'Fifty', 'expression', 'Hah-sip', 'มี ที่นั่ง ห้าสิบ ที่ ในห้อง', 'There are fifty seats in room.', 'มี ที่นั่ง ___ ที่ ในห้อง', 'ห้าสิบ', ['หนึ่ง', 'สอง', 'สาม']),
      v('หนึ่งร้อย', 'One hundred', 'noun', 'Neung-roi', 'หนังสือเล่มนี้ มี หนึ่งร้อย หน้า', 'This book has one hundred pages.', 'หนังสือเล่มนี้ มี ___ หน้า', 'หนึ่งร้อย', ['หนึ่ง', 'สอง', 'สาม']),
      v('นับ', 'To count', 'expression', 'Nahp', 'ฉัน สามารถ นับเลข ภาษาไทย ได้', 'I can count numbers in Thai.', 'ฉัน สามารถ ___เลข ภาษาไทย ได้', 'นับ', ['หนึ่ง', 'สอง', 'สาม']),
    ],
    4: [
      v('พ่อ', 'Father', 'noun', 'Phaw', 'พ่อ ทำงาน เป็น วิศวกร', 'Father works as engineer.', '___ ทำงาน เป็น วิศวกร', 'พ่อ', ['แม่', 'พี่ชาย', 'พี่สาว']),
      v('แม่', 'Mother', 'expression', 'Mae', 'แม่ เป็น คุณหมอ ที่โรงพยาบาล', 'Mother is doctor at hospital.', '___ เป็น คุณหมอ ที่โรงพยาบาล', 'แม่', ['พ่อ', 'พี่ชาย', 'พี่สาว']),
      v('พี่ชาย', 'Brother', 'noun', 'Phee-chai', 'พี่ชาย เรียน อยู่ที่ มหาวิทยาลัย', 'Older brother studies at university.', '___ เรียน อยู่ที่ มหาวิทยาลัย', 'พี่ชาย', ['พ่อ', 'แม่', 'พี่สาว']),
      v('พี่สาว', 'Sister', 'expression', 'Phee-sao', 'พี่สาว เล่น เปียโน ได้ไพเราะ', 'Older sister plays piano beautifully.', '___ เล่น เปียโน ได้ไพเราะ', 'พี่สาว', ['พ่อ', 'แม่', 'พี่ชาย']),
      v('ปู่', 'Grandfather', 'noun', 'Poo', 'ปู่ ชอบ เดินเล่น ในสวน ทุกเช้า', 'Grandfather likes walking in garden every morning.', '___ ชอบ เดินเล่น ในสวน ทุกเช้า', 'ปู่', ['พ่อ', 'แม่', 'พี่ชาย']),
      v('ย่า', 'Grandmother', 'expression', 'Yah', 'ย่า ทำ ขนมไทย อร่อย มาก', 'Grandmother makes delicious Thai desserts.', '___ ทำ ขนมไทย อร่อย มาก', 'ย่า', ['พ่อ', 'แม่', 'พี่ชาย']),
      v('ลูกชาย', 'Son', 'noun', 'Look-chai', 'ลูกชาย เล่น ฟุตบอล ในทีม โรงเรียน', 'Son plays soccer in school team.', '___ เล่น ฟุตบอล ในทีม โรงเรียน', 'ลูกชาย', ['พ่อ', 'แม่', 'พี่ชาย']),
      v('ลูกสาว', 'Daughter', 'expression', 'Look-sao', 'ลูกสาว ชอบ วาดรูป ดอกไม้', 'Daughter likes painting flowers.', '___ ชอบ วาดรูป ดอกไม้', 'ลูกสาว', ['พ่อ', 'แม่', 'พี่ชาย']),
      v('พ่อแม่', 'Parents', 'noun', 'Phaw-mae', 'พ่อแม่ ชอบ ท่องเที่ยว ต่างจังหวัด', 'Parents like traveling upcountry.', '___ ชอบ ท่องเที่ยว ต่างจังหวัด', 'พ่อแม่', ['พ่อ', 'แม่', 'พี่ชาย']),
      v('บ้าน', 'Home', 'expression', 'Bahn', 'บ้าน ของเรา อบอุ่น และ น่าอยู่', 'Our home is warm and pleasant.', '___ ของเรา อบอุ่น และ น่าอยู่', 'บ้าน', ['พ่อ', 'แม่', 'พี่ชาย']),
    ],
    5: [
      v('ขนมปัง', 'Bread', 'noun', 'Khah-nohm-pahng', 'ขนมปัง สดใหม่ จาก เตา หอมกรุ่น', 'Fresh bread from oven smells fragrant.', '___ สดใหม่ จาก เตา หอมกรุ่น', 'ขนมปัง', ['น้ำ', 'ชา', 'กาแฟ']),
      v('น้ำ', 'Water', 'expression', 'Nahm', 'ขอน้ำ ดื่ม เย็น หนึ่งแก้ว ครับ', 'A glass of cold drinking water, please.', 'ขอ___ ดื่ม เย็น หนึ่งแก้ว ครับ', 'น้ำ', ['ขนมปัง', 'ชา', 'กาแฟ']),
      v('ชา', 'Tea', 'noun', 'Chah', 'ชาไทย รสชาติ หวานมัน กลมกล่อม', 'Thai tea tastes sweet and creamy.', '___ไทย รสชาติ หวานมัน กลมกล่อม', 'ชา', ['ขนมปัง', 'น้ำ', 'กาแฟ']),
      v('กาแฟ', 'Coffee', 'expression', 'Gah-fae', 'กาแฟ ดำ ร้อน ยามเช้า สดชื่น', 'Hot black coffee in morning refreshes.', '___ ดำ ร้อน ยามเช้า สดชื่น', 'กาแฟ', ['ขนมปัง', 'น้ำ', 'ชา']),
      v('แอปเปิ้ล', 'Apple', 'noun', 'Aep-peun', 'แอปเปิ้ล สีแดง กรอบ หวาน อร่อย', 'Red apple is crisp, sweet, and delicious.', '___ สีแดง กรอบ หวาน อร่อย', 'แอปเปิ้ล', ['ขนมปัง', 'น้ำ', 'ชา']),
      v('ชีส', 'Cheese', 'expression', 'Chees', 'ชีส ทานกับ ขนมปัง เข้ากัน ดี', 'Cheese eaten with bread goes well.', '___ ทานกับ ขนมปัง เข้ากัน ดี', 'ชีส', ['ขนมปัง', 'น้ำ', 'ชา']),
      v('กิน', 'To eat', 'noun', 'Gin', 'พวกเรา ชอบ กิน ข้าว ด้วยกัน', 'We like eating meal together.', 'พวกเรา ชอบ ___ ข้าว ด้วยกัน', 'กิน', ['ขนมปัง', 'น้ำ', 'ชา']),
      v('ดื่ม', 'To drink', 'expression', 'Deum', 'ควร ดื่ม น้ำ สะอาด ให้เพียงพอ', 'One should drink enough clean water.', 'ควร ___ น้ำ สะอาด ให้เพียงพอ', 'ดื่ม', ['ขนมปัง', 'น้ำ', 'ชา']),
      v('อร่อย', 'Delicious', 'noun', 'Ah-roi', 'อาหารไทย จานนี้ อร่อย มากจริงๆ', 'This Thai dish is really very delicious.', 'อาหารไทย จานนี้ ___ มากจริงๆ', 'อร่อย', ['ขนมปัง', 'น้ำ', 'ชา']),
      v('อาหารเช้า', 'Breakfast', 'expression', 'Ah-hahn-chao', 'อาหารเช้า พร้อม เสิร์ฟ แปดโมง', 'Breakfast is ready served at eight.', '___ พร้อม เสิร์ฟ แปดโมง', 'อาหารเช้า', ['ขนมปัง', 'น้ำ', 'ชา']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["ร้านอาหาร","Restaurant"],["ตลาด","Market"],["โรงแรม","Hotel"],["เมือง","City"],["รถไฟ","Train"],["สนามบิน","Airport"],["งาน","Work"],["โรงเรียน","School"],["สุขภาพ","Health"],["ธรรมชาติ","Nature"],["วันหยุด","Holiday"],["ดนตรี","Music"],["ประวัติศาสตร์","History"],["วัฒนธรรม","Culture"],["วิทยาศาสตร์","Science"],["การสนทนา","Conversation"],["สังคม","Society"],["ความสำเร็จ","Success"],["อนาคต","Future"],["ความรู้","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  THAI_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
