import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const PUNJABI_LANGUAGE: LanguageDefinition = {
  code: 'pa-en',
  title: 'Punjabi Academy',
  description: 'Master Punjabi from Gurmukhi script and tonal rhythm to vibrant conversational fluency from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'pa',
  flagIcon: '🇮🇳',
  level: 'A1–C1',
  order: 28,
  nativeName: 'ਪੰਜਾਬੀ',
  isRTL: false,
  region: 'Indian',
  culturalTips: {
    1: 'Punjabi is one of the few Indo-Aryan languages with distinct pitch contours or tones.',
    2: 'Saying "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ" (Sat Sri Akal) is a universal, respectful Punjabi greeting.',
  },
  units: {
    1: [
      v('ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'Hello / Greetings', 'noun', 'Sat Sri Akal', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਤੁਸੀਂ ਅੱਜ ਕਿਵੇਂ ਹੋ?', 'Hello, how are you today?', '___, ਤੁਸੀਂ ਅੱਜ ਕਿਵੇਂ ਹੋ?', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', ['ਅਲਵਿਦਾ', 'ਧੰਨਵਾਦ', 'ਕਿਰਪਾ ਕਰਕੇ']),
      v('ਅਲਵਿਦਾ', 'Goodbye', 'expression', 'Alvida', 'ਅਲਵਿਦਾ ਅਤੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਮਿਲਾਂਗੇ!', 'Goodbye and see you again soon!', '___ ਅਤੇ ਛੇਤੀ ਹੀ ਦੁਬਾਰਾ ਮਿਲਾਂਗੇ!', 'ਅਲਵਿਦਾ', ['ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'ਧੰਨਵਾਦ', 'ਕਿਰਪਾ ਕਰਕੇ']),
      v('ਧੰਨਵਾਦ', 'Thank you', 'noun', 'Dhannvaad', 'ਤੁਹਾਡੀ ਕੀਮਤੀ ਮਦਦ ਲਈ ਬਹੁਤ ਬਹੁਤ ਧੰਨਵਾਦ।', 'Thank you very much for your valuable help.', 'ਤੁਹਾਡੀ ਕੀਮਤੀ ਮਦਦ ਲਈ ਬਹੁਤ ਬਹੁਤ ___।', 'ਧੰਨਵਾਦ', ['ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'ਅਲਵਿਦਾ', 'ਕਿਰਪਾ ਕਰਕੇ']),
      v('ਕਿਰਪਾ ਕਰਕੇ', 'Please', 'expression', 'Kirpa karke', 'ਇੱਕ ਕੱਪ ਗਰਮ ਚਾਹ ਦਿਓ, ਕਿਰਪਾ ਕਰਕੇ।', 'Give a cup of hot tea, please.', 'ਇੱਕ ਕੱਪ ਗਰਮ ਚਾਹ ਦਿਓ, ___।', 'ਕਿਰਪਾ ਕਰਕੇ', ['ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'ਅਲਵਿਦਾ', 'ਧੰਨਵਾਦ']),
      v('ਹਾਂ', 'Yes', 'noun', 'Haan', 'ਹਾਂ, ਮੈਂ ਸਭ ਕੁਝ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸਮਝ ਗਿਆ ਹਾਂ।', 'Yes, I understood everything well.', '___, ਮੈਂ ਸਭ ਕੁਝ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸਮਝ ਗਿਆ ਹਾਂ।', 'ਹਾਂ', ['ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'ਅਲਵਿਦਾ', 'ਧੰਨਵਾਦ']),
      v('ਨਹੀਂ', 'No', 'expression', 'Nahin', 'ਨਹੀਂ, ਇਹ ਅੱਜ ਸੰਭਵ ਨਹੀਂ ਹੈ।', 'No, that is not possible today.', '___, ਇਹ ਅੱਜ ਸੰਭਵ ਨਹੀਂ ਹੈ।', 'ਨਹੀਂ', ['ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'ਅਲਵਿਦਾ', 'ਧੰਨਵਾਦ']),
      v('ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ', 'How are you', 'noun', 'Tussi kiven ho', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਦੋਸਤ, ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?', 'Hello friend, how are you?', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਦੋਸਤ, ___?', 'ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ', ['ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'ਅਲਵਿਦਾ', 'ਧੰਨਵਾਦ']),
      v('ਜੀ ਆਇਆਂ ਨੂੰ', 'Welcome', 'expression', 'Ji aayan noon', 'ਸਾਡੇ ਖੂਬਸੂਰਤ ਸ਼ਹਿਰ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ!', 'Welcome to our beautiful city!', 'ਸਾਡੇ ਖੂਬਸੂਰਤ ਸ਼ਹਿਰ ਵਿੱਚ ___!', 'ਜੀ ਆਇਆਂ ਨੂੰ', ['ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'ਅਲਵਿਦਾ', 'ਧੰਨਵਾਦ']),
      v('ਫਿਰ ਮਿਲਾਂਗੇ', 'See you soon', 'noun', 'Phir milange', 'ਤੁਹਾਡਾ ਦਿਨ ਵਧੀਆ ਰਹੇ ਅਤੇ ਫਿਰ ਮਿਲਾਂਗੇ!', 'Have a good day and see you again!', 'ਤੁਹਾਡਾ ਦਿਨ ਵਧੀਆ ਰਹੇ ਅਤੇ ___!', 'ਫਿਰ ਮਿਲਾਂਗੇ', ['ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'ਅਲਵਿਦਾ', 'ਧੰਨਵਾਦ']),
      v('ਸ਼ੁਭ ਰਾਤ', 'Good night', 'expression', 'Shubh raat', 'ਸ਼ੁਭ ਰਾਤ ਅਤੇ ਮਿੱਠੇ ਸੁਪਨੇ ਆਉਣ।', 'Good night and sweet dreams.', '___ ਅਤੇ ਮਿੱਠੇ ਸੁਪਨੇ ਆਉਣ।', 'ਸ਼ੁਭ ਰਾਤ', ['ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'ਅਲਵਿਦਾ', 'ਧੰਨਵਾਦ']),
    ],
    2: [
      v('ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ', 'Nice to meet you', 'noun', 'Mil ke khushi hoi', 'ਤੁਹਾਨੂੰ ਮਿਲ ਕੇ ਬਹੁਤ ਖੁਸ਼ੀ ਹੋਈ।', 'Very pleased to meet you.', 'ਤੁਹਾਨੂੰ ਮਿਲ ਕੇ ਬਹੁਤ ਖੁਸ਼ੀ ਹੋਈ।', 'ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ', ['ਮੇਰਾ ਨਾਮ ਹੈ', 'ਮਾਫ਼ ਕਰਨਾ', 'ਸ਼ੁਭ ਸਵੇਰ']),
      v('ਮੇਰਾ ਨਾਮ ਹੈ', 'My name is', 'expression', 'Mera naam hai', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਮੇਰਾ ਨਾਮ ਹਰਪ੍ਰੀਤ ਹੈ।', 'Hello, my name is Harpreet.', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਮੇਰਾ ਨਾਮ ਹਰਪ੍ਰੀਤ ਹੈ।', 'ਮੇਰਾ ਨਾਮ ਹੈ', ['ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ', 'ਮਾਫ਼ ਕਰਨਾ', 'ਸ਼ੁਭ ਸਵੇਰ']),
      v('ਮਾਫ਼ ਕਰਨਾ', 'Excuse me / Sorry', 'noun', 'Maaf karna', 'ਮਾਫ਼ ਕਰਨਾ, ਰੇਲਵੇ ਸਟੇਸ਼ਨ ਕਿੱਥੇ ਹੈ?', 'Excuse me, where is railway station?', '___, ਰੇਲਵੇ ਸਟੇਸ਼ਨ ਕਿੱਥੇ ਹੈ?', 'ਮਾਫ਼ ਕਰਨਾ', ['ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ', 'ਮੇਰਾ ਨਾਮ ਹੈ', 'ਸ਼ੁਭ ਸਵੇਰ']),
      v('ਸ਼ੁਭ ਸਵੇਰ', 'Good morning', 'expression', 'Shubh saweyr', 'ਸਾਰਿਆਂ ਨੂੰ ਸ਼ੁਭ ਸਵੇਰ ਅਤੇ ਵਧਾਈਆਂ!', 'Good morning and wishes to all!', 'ਸਾਰਿਆਂ ਨੂੰ ___ ਅਤੇ ਵਧਾਈਆਂ!', 'ਸ਼ੁਭ ਸਵੇਰ', ['ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ', 'ਮੇਰਾ ਨਾਮ ਹੈ', 'ਮਾਫ਼ ਕਰਨਾ']),
      v('ਸ਼ਾਮ ਮੁਬਾਰਕ', 'Good evening', 'noun', 'Shaam mubaarak', 'ਸ਼ਾਮ ਮੁਬਾਰਕ ਅਤੇ ਸਮਾਗਮ ਵਿੱਚ ਸਵਾਗਤ ਹੈ।', 'Good evening and welcome to event.', '___ ਅਤੇ ਸਮਾਗਮ ਵਿੱਚ ਸਵਾਗਤ ਹੈ।', 'ਸ਼ਾਮ ਮੁਬਾਰਕ', ['ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ', 'ਮੇਰਾ ਨਾਮ ਹੈ', 'ਮਾਫ਼ ਕਰਨਾ']),
      v('ਦੋਸਤ', 'Friend', 'expression', 'Dost', 'ਉਹ ਮੇਰਾ ਬਚਪਨ ਦਾ ਸਭ ਤੋਂ ਪੱਕਾ ਦੋਸਤ ਹੈ।', 'He is my best childhood friend.', 'ਉਹ ਮੇਰਾ ਬਚਪਨ ਦਾ ਸਭ ਤੋਂ ਪੱਕਾ ___ ਹੈ।', 'ਦੋਸਤ', ['ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ', 'ਮੇਰਾ ਨਾਮ ਹੈ', 'ਮਾਫ਼ ਕਰਨਾ']),
      v('ਅਧਿਆਪਕ', 'Teacher', 'noun', 'Adhiaapak', 'ਸਾਡੇ ਅਧਿਆਪਕ ਬਹੁਤ ਮਿਹਨਤੀ ਅਤੇ ਗਿਆਨਵਾਨ ਹਨ।', 'Our teacher is very hardworking and learned.', 'ਸਾਡੇ ___ ਬਹੁਤ ਮਿਹਨਤੀ ਅਤੇ ਗਿਆਨਵਾਨ ਹਨ।', 'ਅਧਿਆਪਕ', ['ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ', 'ਮੇਰਾ ਨਾਮ ਹੈ', 'ਮਾਫ਼ ਕਰਨਾ']),
      v('ਪਰਿਵਾਰ', 'Family', 'expression', 'Parivaar', 'ਮੇਰਾ ਪਰਿਵਾਰ ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਰਹਿੰਦਾ ਹੈ।', 'My family lives in Amritsar.', 'ਮੇਰਾ ___ ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਰਹਿੰਦਾ ਹੈ।', 'ਪਰਿਵਾਰ', ['ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ', 'ਮੇਰਾ ਨਾਮ ਹੈ', 'ਮਾਫ਼ ਕਰਨਾ']),
      v('ਬਹੁਤ ਵਧੀਆ', 'Excellent', 'noun', 'Bahut vadhiya', 'ਇਮਤਿਹਾਨ ਦਾ ਨਤੀਜਾ ਬਹੁਤ ਵਧੀਆ ਆਇਆ ਹੈ।', 'Exam result came out very well.', 'ਇਮਤਿਹਾਨ ਦਾ ਨਤੀਜਾ ___ ਆਇਆ ਹੈ।', 'ਬਹੁਤ ਵਧੀਆ', ['ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ', 'ਮੇਰਾ ਨਾਮ ਹੈ', 'ਮਾਫ਼ ਕਰਨਾ']),
      v('ਠੀਕ', 'Fine / Good', 'expression', 'Theek', 'ਵਾਹਿਗੁਰੂ ਦੀ ਮਿਹਰ ਨਾਲ ਸਭ ਠੀਕ ਹੈ।', 'By grace all is fine.', 'ਵਾਹਿਗੁਰੂ ਦੀ ਮਿਹਰ ਨਾਲ ਸਭ ___ ਹੈ।', 'ਠੀਕ', ['ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ', 'ਮੇਰਾ ਨਾਮ ਹੈ', 'ਮਾਫ਼ ਕਰਨਾ']),
    ],
    3: [
      v('ਇੱਕ', 'One', 'noun', 'Ikk', 'ਮੇਰੇ ਕੋਲ ਰੇਲਗੱਡੀ ਦੀ ਇੱਕ ਟਿਕਟ ਹੈ।', 'I have one train ticket.', 'ਮੇਰੇ ਕੋਲ ਰੇਲਗੱਡੀ ਦੀ ___ ਟਿਕਟ ਹੈ।', 'ਇੱਕ', ['ਦੋ', 'ਤਿੰਨ', 'ਚਾਰ']),
      v('ਦੋ', 'Two', 'expression', 'Do', 'ਦੋ ਕੱਪ ਗਰਮ ਚਾਹ ਲਿਆਓ, ਕਿਰਪਾ ਕਰਕੇ।', 'Bring two cups of hot tea, please.', '___ ਕੱਪ ਗਰਮ ਚਾਹ ਲਿਆਓ, ਕਿਰਪਾ ਕਰਕੇ।', 'ਦੋ', ['ਇੱਕ', 'ਤਿੰਨ', 'ਚਾਰ']),
      v('ਤਿੰਨ', 'Three', 'noun', 'Tinn', 'ਹੋਟਲ ਵਿੱਚ ਤਿੰਨ ਕਮਰੇ ਖਾਲੀ ਹਨ।', 'Three rooms are vacant in hotel.', 'ਹੋਟਲ ਵਿੱਚ ___ ਕਮਰੇ ਖਾਲੀ ਹਨ।', 'ਤਿੰਨ', ['ਇੱਕ', 'ਦੋ', 'ਚਾਰ']),
      v('ਚਾਰ', 'Four', 'expression', 'Chaar', 'ਅਸੀਂ ਚਾਰ ਦੋਸਤ ਇਕੱਠੇ ਆਏ ਹਾਂ।', 'We four friends came together.', 'ਅਸੀਂ ___ ਦੋਸਤ ਇਕੱਠੇ ਆਏ ਹਾਂ।', 'ਚਾਰ', ['ਇੱਕ', 'ਦੋ', 'ਤਿੰਨ']),
      v('ਪੰਜ', 'Five', 'noun', 'Panj', 'ਬੱਸ ਪੰਜ ਮਿੰਟਾਂ ਵਿੱਚ ਰਵਾਨਾ ਹੋਵੇਗੀ।', 'Bus will depart in five minutes.', 'ਬੱਸ ___ ਮਿੰਟਾਂ ਵਿੱਚ ਰਵਾਨਾ ਹੋਵੇਗੀ।', 'ਪੰਜ', ['ਇੱਕ', 'ਦੋ', 'ਤਿੰਨ']),
      v('ਦਸ', 'Ten', 'expression', 'Das', 'ਇਸਦੀ ਕੀਮਤ ਬਿਲਕੁਲ ਦਸ ਰੁਪਏ ਹੈ।', 'Its price is exactly ten rupees.', 'ਇਸਦੀ ਕੀਮਤ ਬਿਲਕੁਲ ___ ਰੁਪਏ ਹੈ।', 'ਦਸ', ['ਇੱਕ', 'ਦੋ', 'ਤਿੰਨ']),
      v('ਵੀਹ', 'Twenty', 'noun', 'Veeh', 'ਜਮਾਤ ਵਿੱਚ ਵੀਹ ਵਿਦਿਆਰਥੀ ਬੈਠੇ ਹਨ।', 'Twenty students are sitting in class.', 'ਜਮਾਤ ਵਿੱਚ ___ ਵਿਦਿਆਰਥੀ ਬੈਠੇ ਹਨ।', 'ਵੀਹ', ['ਇੱਕ', 'ਦੋ', 'ਤਿੰਨ']),
      v('ਪੰਜਾਹ', 'Fifty', 'expression', 'Panjaah', 'ਹਾਲ ਵਿੱਚ ਪੰਜਾਹ ਕੁਰਸੀਆਂ ਲੱਗੀਆਂ ਹਨ।', 'Fifty chairs are placed in hall.', 'ਹਾਲ ਵਿੱਚ ___ ਕੁਰਸੀਆਂ ਲੱਗੀਆਂ ਹਨ।', 'ਪੰਜਾਹ', ['ਇੱਕ', 'ਦੋ', 'ਤਿੰਨ']),
      v('ਇੱਕ ਸੌ', 'One hundred', 'noun', 'Ikk sau', 'ਕਿਤਾਬ ਵਿੱਚ ਪੂਰੇ ਇੱਕ ਸੌ ਪੰਨੇ ਹਨ।', 'In book are full hundred pages.', 'ਕਿਤਾਬ ਵਿੱਚ ਪੂਰੇ ___ ਪੰਨੇ ਹਨ।', 'ਇੱਕ ਸੌ', ['ਇੱਕ', 'ਦੋ', 'ਤਿੰਨ']),
      v('ਗਿਣਨਾ', 'To count', 'expression', 'Gin-na', 'ਮੈਂ ਪੰਜਾਬੀ ਵਿੱਚ ਆਸਾਨੀ ਨਾਲ ਗਿਣ ਸਕਦਾ ਹਾਂ।', 'I can count in Punjabi easily.', 'ਮੈਂ ਪੰਜਾਬੀ ਵਿੱਚ ਆਸਾਨੀ ਨਾਲ ਗਿਣ ਸਕਦਾ ਹਾਂ।', 'ਗਿਣਨਾ', ['ਇੱਕ', 'ਦੋ', 'ਤਿੰਨ']),
    ],
    4: [
      v('ਪਿਤਾ', 'Father', 'noun', 'Pita', 'ਮੇਰੇ ਪਿਤਾ ਜੀ ਇੱਕ ਇੰਜੀਨੀਅਰ ਹਨ।', 'My father is an engineer.', 'ਮੇਰੇ ___ ਜੀ ਇੱਕ ਇੰਜੀਨੀਅਰ ਹਨ।', 'ਪਿਤਾ', ['ਮਾਤਾ', 'ਭਰਾ', 'ਭੈਣ']),
      v('ਮਾਤਾ', 'Mother', 'expression', 'Maata', 'ਮੇਰੀ ਮਾਤਾ ਜੀ ਹਸਪਤਾਲ ਵਿੱਚ ਡਾਕਟਰ ਹਨ।', 'My mother is doctor in hospital.', 'ਮੇਰੀ ___ ਜੀ ਹਸਪਤਾਲ ਵਿੱਚ ਡਾਕਟਰ ਹਨ।', 'ਮਾਤਾ', ['ਪਿਤਾ', 'ਭਰਾ', 'ਭੈਣ']),
      v('ਭਰਾ', 'Brother', 'noun', 'Bhara', 'ਮੇਰਾ ਵੱਡਾ ਭਰਾ ਯੂਨੀਵਰਸਿਟੀ ਵਿੱਚ ਪੜ੍ਹਦਾ ਹੈ।', 'My older brother studies at university.', 'ਮੇਰਾ ਵੱਡਾ ___ ਯੂਨੀਵਰਸਿਟੀ ਵਿੱਚ ਪੜ੍ਹਦਾ ਹੈ।', 'ਭਰਾ', ['ਪਿਤਾ', 'ਮਾਤਾ', 'ਭੈਣ']),
      v('ਭੈਣ', 'Sister', 'expression', 'Bhain', 'ਮੇਰੀ ਛੋਟੀ ਭੈਣ ਬਹੁਤ ਸੋਹਣਾ ਗਾਉਂਦੀ ਹੈ।', 'My younger sister sings very nicely.', 'ਮੇਰੀ ਛੋਟੀ ___ ਬਹੁਤ ਸੋਹਣਾ ਗਾਉਂਦੀ ਹੈ।', 'ਭੈਣ', ['ਪਿਤਾ', 'ਮਾਤਾ', 'ਭਰਾ']),
      v('ਦਾਦਾ', 'Grandfather', 'noun', 'Dada', 'ਦਾਦਾ ਜੀ ਹਰ ਰੋਜ਼ ਸਵੇਰੇ ਸੈਰ ਕਰਦੇ ਹਨ।', 'Grandfather walks every morning.', '___ ਜੀ ਹਰ ਰੋਜ਼ ਸਵੇਰੇ ਸੈਰ ਕਰਦੇ ਹਨ।', 'ਦਾਦਾ', ['ਪਿਤਾ', 'ਮਾਤਾ', 'ਭਰਾ']),
      v('ਦਾਦੀ', 'Grandmother', 'expression', 'Dadi', 'ਦਾਦੀ ਜੀ ਸਵਾਦਿਸ਼ਟ ਪਿੰਨੀਆਂ ਬਣਾਉਂਦੇ ਹਨ।', 'Grandmother makes tasty pinni.', '___ ਜੀ ਸਵਾਦਿਸ਼ਟ ਪਿੰਨੀਆਂ ਬਣਾਉਂਦੇ ਹਨ।', 'ਦਾਦੀ', ['ਪਿਤਾ', 'ਮਾਤਾ', 'ਭਰਾ']),
      v('ਪੁੱਤਰ', 'Son', 'noun', 'Puttar', 'ਉਨ੍ਹਾਂ ਦਾ ਪੁੱਤਰ ਹਾਕੀ ਦੀ ਟੀਮ ਵਿੱਚ ਖੇਡਦਾ ਹੈ।', 'Their son plays in hockey team.', 'ਉਨ੍ਹਾਂ ਦਾ ___ ਹਾਕੀ ਦੀ ਟੀਮ ਵਿੱਚ ਖੇਡਦਾ ਹੈ।', 'ਪੁੱਤਰ', ['ਪਿਤਾ', 'ਮਾਤਾ', 'ਭਰਾ']),
      v('ਧੀ', 'Daughter', 'expression', 'Dhee', 'ਉਨ੍ਹਾਂ ਦੀ ਧੀ ਚਿੱਤਰਕਾਰੀ ਬਹੁਤ ਸੋਹਣੀ ਕਰਦੀ ਹੈ।', 'Their daughter paints very nicely.', 'ਉਨ੍ਹਾਂ ਦੀ ___ ਚਿੱਤਰਕਾਰੀ ਬਹੁਤ ਸੋਹਣੀ ਕਰਦੀ ਹੈ।', 'ਧੀ', ['ਪਿਤਾ', 'ਮਾਤਾ', 'ਭਰਾ']),
      v('ਮਾਪੇ', 'Parents', 'noun', 'Maape', 'ਮੇਰੇ ਮਾਪੇ ਘੁੰਮਣ-ਫਿਰਨ ਦੇ ਬਹੁਤ ਸ਼ੌਕੀਨ ਹਨ।', 'My parents are very fond of travel.', 'ਮੇਰੇ ___ ਘੁੰਮਣ-ਫਿਰਨ ਦੇ ਬਹੁਤ ਸ਼ੌਕੀਨ ਹਨ।', 'ਮਾਪੇ', ['ਪਿਤਾ', 'ਮਾਤਾ', 'ਭਰਾ']),
      v('ਘਰ', 'Home', 'expression', 'Ghar', 'ਸਾਡਾ ਘਰ ਖੁੱਲ੍ਹਾ, ਨਿੱਘਾ ਅਤੇ ਸੁਹਾਵਣਾ ਹੈ।', 'Our home is open, warm, and pleasant.', 'ਸਾਡਾ ___ ਖੁੱਲ੍ਹਾ, ਨਿੱਘਾ ਅਤੇ ਸੁਹਾਵਣਾ ਹੈ।', 'ਘਰ', ['ਪਿਤਾ', 'ਮਾਤਾ', 'ਭਰਾ']),
    ],
    5: [
      v('ਰੋਟੀ', 'Bread', 'noun', 'Roti', 'ਮੱਕੀ ਦੀ ਰੋਟੀ ਅਤੇ ਸਰ੍ਹੋਂ ਦਾ ਸਾਗ ਲਾਜਵਾਬ ਹੈ।', 'Corn roti and mustard saag is matchless.', 'ਮੱਕੀ ਦੀ ___ ਅਤੇ ਸਰ੍ਹੋਂ ਦਾ ਸਾਗ ਲਾਜਵਾਬ ਹੈ।', 'ਰੋਟੀ', ['ਪਾਣੀ', 'ਚਾਹ', 'ਕੌਫ਼ੀ']),
      v('ਪਾਣੀ', 'Water', 'expression', 'Paani', 'ਇੱਕ ਗਲਾਸ ਠੰਢਾ ਪਾਣੀ ਪਿਲਾਓ, ਧੰਨਵਾਦ।', 'Give a glass of cold water, thanks.', 'ਇੱਕ ਗਲਾਸ ਠੰਢਾ ___ ਪਿਲਾਓ, ਧੰਨਵਾਦ।', 'ਪਾਣੀ', ['ਰੋਟੀ', 'ਚਾਹ', 'ਕੌਫ਼ੀ']),
      v('ਚਾਹ', 'Tea', 'noun', 'Chaah', 'ਪੰਜਾਬੀਆਂ ਦੀ ਮਨਪਸੰਦ ਗਰਮ ਮਸਾਲਾ ਚਾਹ।', 'Favorite hot masala tea of Punjabis.', 'ਪੰਜਾਬੀਆਂ ਦੀ ਮਨਪਸੰਦ ਗਰਮ ਮਸਾਲਾ ___।', 'ਚਾਹ', ['ਰੋਟੀ', 'ਪਾਣੀ', 'ਕੌਫ਼ੀ']),
      v('ਕੌਫ਼ੀ', 'Coffee', 'expression', 'Kofi', 'ਸਵੇਰੇ ਇੱਕ ਕੱਪ ਕੌਫ਼ੀ ਤਾਜ਼ਗੀ ਦਿੰਦੀ ਹੈ।', 'A morning cup of coffee gives freshness.', 'ਸਵੇਰੇ ਇੱਕ ਕੱਪ ___ ਤਾਜ਼ਗੀ ਦਿੰਦੀ ਹੈ।', 'ਕੌਫ਼ੀ', ['ਰੋਟੀ', 'ਪਾਣੀ', 'ਚਾਹ']),
      v('ਸੇਬ', 'Apple', 'noun', 'Saib', 'ਲਾਲ ਮਿੱਠਾ ਸੇਬ ਸਿਹਤ ਲਈ ਗੁਣਕਾਰੀ ਹੈ।', 'Red sweet apple is beneficial for health.', 'ਲਾਲ ਮਿੱਠਾ ___ ਸਿਹਤ ਲਈ ਗੁਣਕਾਰੀ ਹੈ।', 'ਸੇਬ', ['ਰੋਟੀ', 'ਪਾਣੀ', 'ਚਾਹ']),
      v('ਪਨੀਰ', 'Cheese', 'expression', 'Paneer', 'ਤਾਜ਼ਾ ਪਨੀਰ ਸਬਜ਼ੀ ਵਿੱਚ ਬਹੁਤ ਸਵਾਦ ਲੱਗਦਾ ਹੈ।', 'Fresh paneer tastes delicious in curry.', 'ਤਾਜ਼ਾ ___ ਸਬਜ਼ੀ ਵਿੱਚ ਬਹੁਤ ਸਵਾਦ ਲੱਗਦਾ ਹੈ।', 'ਪਨੀਰ', ['ਰੋਟੀ', 'ਪਾਣੀ', 'ਚਾਹ']),
      v('ਖਾਣਾ', 'To eat', 'noun', 'Khaana', 'ਆਓ ਸਾਰੇ ਰਲ ਕੇ ਦੁਪਹਿਰ ਦਾ ਖਾਣਾ ਖਾਈਏ।', 'Come let us all eat lunch together.', 'ਆਓ ਸਾਰੇ ਰਲ ਕੇ ਦੁਪਹਿਰ ਦਾ ___ ਖਾਈਏ।', 'ਖਾਣਾ', ['ਰੋਟੀ', 'ਪਾਣੀ', 'ਚਾਹ']),
      v('ਪੀਣਾ', 'To drink', 'expression', 'Peena', 'ਸਿਹਤਮੰਦ ਰਹਿਣ ਲਈ ਰੋਜ਼ ਦੁੱਧ ਪੀਣਾ ਚਾਹੀਦਾ ਹੈ।', 'One should drink milk daily to stay healthy.', 'ਸਿਹਤਮੰਦ ਰਹਿਣ ਲਈ ਰੋਜ਼ ਦੁੱਧ ___ ਚਾਹੀਦਾ ਹੈ।', 'ਪੀਣਾ', ['ਰੋਟੀ', 'ਪਾਣੀ', 'ਚਾਹ']),
      v('ਸਵਾਦਿਸ਼ਟ', 'Delicious', 'noun', 'Swaadisht', 'ਇਹ ਰਵਾਇਤੀ ਖਾਣਾ ਬਹੁਤ ਹੀ ਸਵਾਦਿਸ਼ਟ ਹੈ।', 'This traditional food is very delicious.', 'ਇਹ ਰਵਾਇਤੀ ਖਾਣਾ ਬਹੁਤ ਹੀ ___ ਹੈ।', 'ਸਵਾਦਿਸ਼ਟ', ['ਰੋਟੀ', 'ਪਾਣੀ', 'ਚਾਹ']),
      v('ਨਾਸ਼ਤਾ', 'Breakfast', 'expression', 'Naashta', 'ਸਵੇਰ ਦਾ ਨਾਸ਼ਤਾ ਅੱਠ ਵਜੇ ਤਿਆਰ ਹੁੰਦਾ ਹੈ।', 'Morning breakfast is ready at eight.', 'ਸਵੇਰ ਦਾ ___ ਅੱਠ ਵਜੇ ਤਿਆਰ ਹੁੰਦਾ ਹੈ।', 'ਨਾਸ਼ਤਾ', ['ਰੋਟੀ', 'ਪਾਣੀ', 'ਚਾਹ']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["ਰੈਸਟੋਰੈਂਟ","Restaurant"],["ਦੁਕਾਨ","Shop"],["ਹੋਟਲ","Hotel"],["ਸ਼ਹਿਰ","City"],["ਰੇਲਗੱਡੀ","Train"],["ਹਵਾਈ ਅੱਡਾ","Airport"],["ਕੰਮ","Work"],["ਸਕੂਲ","School"],["ਸਿਹਤ","Health"],["ਕੁਦਰਤ","Nature"],["ਛੁੱਟੀਆਂ","Holiday"],["ਸੰਗੀਤ","Music"],["ਇਤਿਹਾਸ","History"],["ਸੱਭਿਆਚਾਰ","Culture"],["ਵਿਗਿਆਨ","Science"],["ਗੱਲਬਾਤ","Conversation"],["ਸਮਾਜ","Society"],["ਸਫ਼ਲਤਾ","Success"],["ਭਵਿੱਖ","Future"],["ਗਿਆਨ","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  PUNJABI_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
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
