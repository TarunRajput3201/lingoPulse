import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const VIETNAMESE_LANGUAGE: LanguageDefinition = {
  code: 'vi-en',
  title: 'Vietnamese Academy',
  description: 'Master Vietnamese tones, diacritics, and practical fluency from Hanoi to Saigon from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'vi',
  flagIcon: '🇻🇳',
  level: 'A1–C1',
  order: 22,
  nativeName: 'Tiếng Việt',
  isRTL: false,
  region: 'Asian',
  culturalTips: {
    1: 'Vietnamese has 6 distinct tones indicated by diacritic marks above or below vowels.',
    2: 'Pronouns reflect familial hierarchy and age difference (anh, chị, em, bạn).',
  },
  units: {
    1: [
      v('Xin chào', 'Hello', 'noun', 'sin CHOW', 'Xin chào, hôm nay bạn có khỏe không?', 'Hello, are you well today?', '___, hôm nay bạn có khỏe không?', 'Xin chào', ['Tạm biệt', 'Cảm ơn', 'Làm ơn']),
      v('Tạm biệt', 'Goodbye', 'expression', 'tahm BYEHT', 'Tạm biệt và hẹn sớm gặp lại nhé!', 'Goodbye and see you soon again!', '___ và hẹn sớm gặp lại nhé!', 'Tạm biệt', ['Xin chào', 'Cảm ơn', 'Làm ơn']),
      v('Cảm ơn', 'Thank you', 'noun', 'gahm UHN', 'Cảm ơn bạn rất nhiều vì sự giúp đỡ.', 'Thank you very much for your help.', '___ bạn rất nhiều vì sự giúp đỡ.', 'Cảm ơn', ['Xin chào', 'Tạm biệt', 'Làm ơn']),
      v('Làm ơn', 'Please', 'expression', 'lahm UHN', 'Cho tôi một ly cà phê nóng, làm ơn.', 'Give me a cup of hot coffee, please.', 'Cho tôi một ly cà phê nóng, làm ơn.', 'Làm ơn', ['Xin chào', 'Tạm biệt', 'Cảm ơn']),
      v('Vâng', 'Yes', 'noun', 'VUHNG', 'Vâng, tôi hiểu rất rõ điều đó.', 'Yes, I understand that very clearly.', '___, tôi hiểu rất rõ điều đó.', 'Vâng', ['Xin chào', 'Tạm biệt', 'Cảm ơn']),
      v('Không', 'No', 'expression', 'KHOHNG', 'Không, hôm nay điều đó không thể thực hiện.', 'No, that cannot be done today.', '___, hôm nay điều đó không thể thực hiện.', 'Không', ['Xin chào', 'Tạm biệt', 'Cảm ơn']),
      v('Bạn khỏe không', 'How are you', 'noun', 'bahn KHOO-eh khohng', 'Chào Lan, bạn khỏe không hôm nay?', 'Hello Lan, how are you today?', 'Chào Lan, bạn khỏe không hôm nay?', 'Bạn khỏe không', ['Xin chào', 'Tạm biệt', 'Cảm ơn']),
      v('Chào mừng', 'Welcome', 'expression', 'chow MUHNG', 'Nhiệt liệt chào mừng bạn đến Việt Nam!', 'Warmly welcome you to Vietnam!', 'Nhiệt liệt chào mừng bạn đến Việt Nam!', 'Chào mừng', ['Xin chào', 'Tạm biệt', 'Cảm ơn']),
      v('Hẹn gặp lại', 'See you soon', 'noun', 'hehn gahp LYE', 'Chúc một ngày tốt lành và hẹn gặp lại!', 'Have a good day and see you again!', 'Chúc một ngày tốt lành và hẹn gặp lại!', 'Hẹn gặp lại', ['Xin chào', 'Tạm biệt', 'Cảm ơn']),
      v('Chúc ngủ ngon', 'Good night', 'expression', 'chook ngoo NGOHN', 'Chúc ngủ ngon và có giấc mơ đẹp.', 'Good night and have sweet dreams.', '___ và có giấc mơ đẹp.', 'Chúc ngủ ngon', ['Xin chào', 'Tạm biệt', 'Cảm ơn']),
    ],
    2: [
      v('Rất vui được gặp bạn', 'Nice to meet you', 'noun', 'raht vooy deuhk gahp bahn', 'Rất vui được gặp bạn ngày hôm nay.', 'Very glad to meet you today.', '___ ngày hôm nay.', 'Rất vui được gặp bạn', ['Tên tôi là', 'Xin lỗi', 'Chào buổi sáng']),
      v('Tên tôi là', 'My name is', 'expression', 'tayn toy lah', 'Xin chào, tên tôi là Minh.', 'Hello, my name is Minh.', 'Xin chào, tên tôi là Minh.', 'Tên tôi là', ['Rất vui được gặp bạn', 'Xin lỗi', 'Chào buổi sáng']),
      v('Xin lỗi', 'Excuse me / Sorry', 'noun', 'sin LOY', 'Xin lỗi, cho tôi hỏi nhà ga ở đâu?', 'Excuse me, let me ask where station is?', '___, cho tôi hỏi nhà ga ở đâu?', 'Xin lỗi', ['Rất vui được gặp bạn', 'Tên tôi là', 'Chào buổi sáng']),
      v('Chào buổi sáng', 'Good morning', 'expression', 'chow bwoy SAHNG', 'Chào buổi sáng mọi người và ngày mới tốt lành!', 'Good morning everyone and have good new day!', '___ mọi người và ngày mới tốt lành!', 'Chào buổi sáng', ['Rất vui được gặp bạn', 'Tên tôi là', 'Xin lỗi']),
      v('Chào buổi tối', 'Good evening', 'noun', 'chow bwoy TOY', 'Chào buổi tối và chào mừng quý khách.', 'Good evening and welcome guests.', '___ và chào mừng quý khách.', 'Chào buổi tối', ['Rất vui được gặp bạn', 'Tên tôi là', 'Xin lỗi']),
      v('Bạn bè', 'Friend', 'expression', 'bahn BEH', 'Anh ấy là người bạn thân thiết nhất của tôi.', 'He is my closest friend.', 'Anh ấy là người bạn thân thiết nhất của tôi.', 'Bạn bè', ['Rất vui được gặp bạn', 'Tên tôi là', 'Xin lỗi']),
      v('Giáo viên', 'Teacher', 'noun', 'zah-oh VYEN', 'Giáo viên của chúng tôi giảng bài rất dễ hiểu.', 'Our teacher lectures very easy to understand.', '___ của chúng tôi giảng bài rất dễ hiểu.', 'Giáo viên', ['Rất vui được gặp bạn', 'Tên tôi là', 'Xin lỗi']),
      v('Gia đình', 'Family', 'expression', 'zah DEENG', 'Gia đình tôi sống ở thành phố Đà Nẵng.', 'My family lives in Da Nang city.', '___ tôi sống ở thành phố Đà Nẵng.', 'Gia đình', ['Rất vui được gặp bạn', 'Tên tôi là', 'Xin lỗi']),
      v('Tuyệt vời', 'Excellent', 'noun', 'tweyet VOY', 'Kết quả bài kiểm tra thật là tuyệt vời.', 'The test result is truly excellent.', 'Kết quả bài kiểm tra thật là tuyệt vời.', 'Tuyệt vời', ['Rất vui được gặp bạn', 'Tên tôi là', 'Xin lỗi']),
      v('Khỏe', 'Good', 'expression', 'KHOO-eh', 'Mọi việc đều tiến triển rất tốt và khỏe.', 'Everything progresses very well and good.', 'Mọi việc đều tiến triển rất tốt và khỏe.', 'Khỏe', ['Rất vui được gặp bạn', 'Tên tôi là', 'Xin lỗi']),
    ],
    3: [
      v('Một', 'One', 'noun', 'MOHT', 'Tôi có một vé đi tàu hỏa.', 'I have one train ticket.', 'Tôi có một vé đi tàu hỏa.', 'Một', ['Hai', 'Ba', 'Bốn']),
      v('Hai', 'Two', 'expression', 'HYE', 'Cho tôi hai ly cà phê sữa đá, làm ơn.', 'Two iced milk coffees, please.', 'Cho tôi hai ly cà phê sữa đá, làm ơn.', 'Hai', ['Một', 'Ba', 'Bốn']),
      v('Ba', 'Three', 'noun', 'BAH', 'Khách sạn còn ba phòng trống.', 'The hotel has three vacant rooms.', 'Khách sạn còn ba phòng trống.', 'Ba', ['Một', 'Hai', 'Bốn']),
      v('Bốn', 'Four', 'expression', 'BOHN', 'Chúng tôi đi bốn người.', 'We go as four people.', 'Chúng tôi đi bốn người.', 'Bốn', ['Một', 'Hai', 'Ba']),
      v('Năm', 'Five', 'noun', 'NAHM', 'Chuyến xe sẽ khởi hành trong năm phút.', 'The bus will depart in five minutes.', 'Chuyến xe sẽ khởi hành trong năm phút.', 'Năm', ['Một', 'Hai', 'Ba']),
      v('Mười', 'Ten', 'expression', 'MUH-ee', 'Món này giá đúng mười nghìn đồng.', 'This dish costs exactly ten thousand dong.', 'Món này giá đúng mười nghìn đồng.', 'Mười', ['Một', 'Hai', 'Ba']),
      v('Hai mươi', 'Twenty', 'noun', 'hye MUH-ee', 'Lớp học có hai mươi học viên.', 'Classroom has twenty students.', 'Lớp học có hai mươi học viên.', 'Hai mươi', ['Một', 'Hai', 'Ba']),
      v('Năm mươi', 'Fifty', 'expression', 'nahm MUH-ee', 'Hội trường có năm mươi chỗ ngồi.', 'The hall has fifty seats.', 'Hội trường có năm mươi chỗ ngồi.', 'Năm mươi', ['Một', 'Hai', 'Ba']),
      v('Một trăm', 'One hundred', 'noun', 'moht CHAHM', 'Cuốn sách này dày đúng một trăm trang.', 'This book is thick exactly hundred pages.', 'Cuốn sách này dày đúng một trăm trang.', 'Một trăm', ['Một', 'Hai', 'Ba']),
      v('Đếm', 'To count', 'expression', 'DEHM', 'Tôi có thể đếm số bằng tiếng Việt.', 'I can count numbers in Vietnamese.', 'Tôi có thể đếm số bằng tiếng Việt.', 'Đếm', ['Một', 'Hai', 'Ba']),
    ],
    4: [
      v('Cha', 'Father', 'noun', 'CHAH', 'Cha tôi làm kỹ sư xây dựng.', 'My father works as construction engineer.', '___ tôi làm kỹ sư xây dựng.', 'Cha', ['Mẹ', 'Anh trai', 'Chị gái']),
      v('Mẹ', 'Mother', 'expression', 'MEH', 'Mẹ tôi là bác sĩ tại bệnh viện.', 'My mother is doctor at hospital.', '___ tôi là bác sĩ tại bệnh viện.', 'Mẹ', ['Cha', 'Anh trai', 'Chị gái']),
      v('Anh trai', 'Brother', 'noun', 'ahnh CHYE', 'Anh trai tôi đang học đại học.', 'My older brother is studying university.', '___ tôi đang học đại học.', 'Anh trai', ['Cha', 'Mẹ', 'Chị gái']),
      v('Chị gái', 'Sister', 'expression', 'chee GYE', 'Chị gái tôi chơi đàn dương cầm rất hay.', 'My older sister plays piano very well.', '___ tôi chơi đàn dương cầm rất hay.', 'Chị gái', ['Cha', 'Mẹ', 'Anh trai']),
      v('Ông', 'Grandfather', 'noun', 'OHNG', 'Ông thường đi dạo công viên mỗi sáng.', 'Grandfather often walks in park each morning.', '___ thường đi dạo công viên mỗi sáng.', 'Ông', ['Cha', 'Mẹ', 'Anh trai']),
      v('Bà', 'Grandmother', 'expression', 'BAH', 'Bà nấu những món ăn truyền thống rất ngon.', 'Grandmother cooks delicious traditional dishes.', '___ nấu những món ăn truyền thống rất ngon.', 'Bà', ['Cha', 'Mẹ', 'Anh trai']),
      v('Con trai', 'Son', 'noun', 'kohn CHYE', 'Con trai của họ chơi bóng đá rất giỏi.', 'Their son plays soccer very well.', '___ của họ chơi bóng đá rất giỏi.', 'Con trai', ['Cha', 'Mẹ', 'Anh trai']),
      v('Con gái', 'Daughter', 'expression', 'kohn GYE', 'Con gái của họ thích học vẽ tranh.', 'Their daughter likes learning painting.', '___ của họ thích học vẽ tranh.', 'Con gái', ['Cha', 'Mẹ', 'Anh trai']),
      v('Cha mẹ', 'Parents', 'noun', 'chah MEH', 'Cha mẹ tôi rất thích đi du lịch.', 'My parents love traveling very much.', '___ tôi rất thích đi du lịch.', 'Cha mẹ', ['Cha', 'Mẹ', 'Anh trai']),
      v('Nhà', 'Home', 'expression', 'NYAH', 'Ngôi nhà của chúng tôi ấm cúng và sáng sủa.', 'Our home is cozy and bright.', 'Ngôi nhà của chúng tôi ấm cúng và sáng sủa.', 'Nhà', ['Cha', 'Mẹ', 'Anh trai']),
    ],
    5: [
      v('Bánh mì', 'Bread', 'noun', 'bahnh MEE', 'Bánh mì Việt Nam giòn tan và rất nổi tiếng.', 'Vietnamese banh mi is crispy and very famous.', '___ Việt Nam giòn tan và rất nổi tiếng.', 'Bánh mì', ['Nước', 'Trà', 'Cà phê']),
      v('Nước', 'Water', 'expression', 'NUH-uhk', 'Cho tôi xin một cốc nước suối mát lạnh.', 'Give me a cup of cool spring water, please.', 'Cho tôi xin một cốc nước suối mát lạnh.', 'Nước', ['Bánh mì', 'Trà', 'Cà phê']),
      v('Trà', 'Tea', 'noun', 'CHAH', 'Trà sen thơm ngát là nét đẹp văn hóa.', 'Fragrant lotus tea is a cultural beauty.', '___ sen thơm ngát là nét đẹp văn hóa.', 'Trà', ['Bánh mì', 'Nước', 'Cà phê']),
      v('Cà phê', 'Coffee', 'expression', 'gah FAY', 'Cà phê phin đậm đà hương vị truyền thống.', 'Drip coffee is rich in traditional flavor.', '___ phin đậm đà hương vị truyền thống.', 'Cà phê', ['Bánh mì', 'Nước', 'Trà']),
      v('Táo', 'Apple', 'noun', 'DOW', 'Quả táo đỏ tươi giòn ngọt tự nhiên.', 'Fresh red apple is naturally crisp and sweet.', 'Quả táo đỏ tươi giòn ngọt tự nhiên.', 'Táo', ['Bánh mì', 'Nước', 'Trà']),
      v('Phô mai', 'Cheese', 'expression', 'foh MYE', 'Phô mai ăn kèm bánh mì rất béo ngậy.', 'Cheese with bread is very rich.', '___ ăn kèm bánh mì rất béo ngậy.', 'Phô mai', ['Bánh mì', 'Nước', 'Trà']),
      v('Ăn', 'To eat', 'noun', 'AHN', 'Chúng tôi cùng nhau ăn bữa cơm gia đình.', 'We eat family meal together.', 'Chúng tôi cùng nhau ăn bữa cơm gia đình.', 'Ăn', ['Bánh mì', 'Nước', 'Trà']),
      v('Uống', 'To drink', 'expression', 'OOH-ong', 'Nên uống đủ nước lọc mỗi ngày.', 'Should drink enough filtered water daily.', 'Nên uống đủ nước lọc mỗi ngày.', 'Uống', ['Bánh mì', 'Nước', 'Trà']),
      v('Ngon', 'Delicious', 'noun', 'NGOHN', 'Món phở truyền thống này thực sự rất ngon.', 'This traditional pho is really very delicious.', 'Món phở truyền thống này thực sự rất ngon.', 'Ngon', ['Bánh mì', 'Nước', 'Trà']),
      v('Bữa sáng', 'Breakfast', 'expression', 'buh-uh SAHNG', 'Bữa sáng được phục vụ lúc tám giờ.', 'Breakfast is served at eight o\'clock.', '___ được phục vụ lúc tám giờ.', 'Bữa sáng', ['Bánh mì', 'Nước', 'Trà']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Nhà hàng","Restaurant"],["Cửa hàng","Shop"],["Khách sạn","Hotel"],["Thành phố","City"],["Tàu hỏa","Train"],["Sân bay","Airport"],["Công việc","Work"],["Trường học","School"],["Sức khỏe","Health"],["Thiên nhiên","Nature"],["Kỳ nghỉ","Holiday"],["Âm nhạc","Music"],["Lịch sử","History"],["Văn hóa","Culture"],["Khoa học","Science"],["Giao tiếp","Communication"],["Xã hội","Society"],["Thành công","Success"],["Tương lai","Future"],["Kiến thức","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  VIETNAMESE_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
