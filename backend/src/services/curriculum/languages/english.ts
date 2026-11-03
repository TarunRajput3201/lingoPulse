import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const ENGLISH_LANGUAGE: LanguageDefinition = {
  code: 'en-es',
  title: 'English Academy',
  description: 'Master conversational English from foundational phonetics to fluent real-world dialogue from A1 to C1.',
  fromLanguage: 'es',
  toLanguage: 'en',
  flagIcon: '🇬🇧',
  level: 'A1–C1',
  order: 1,
  nativeName: 'English',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: '"Hello" and "Hi" are universal greetings, while "Good morning" is standard in professional contexts.',
    2: 'Saying "Please" and "Thank you" in English-speaking cultures is expected in almost every transaction.',
  },
  units: {
    1: [
      v('Hello', 'Hola', 'expression', 'heh-LOH', 'Hello, how are you today?', 'Hola, ¿cómo estás hoy?', '___, how are you today?', 'Hello', ['Goodbye', 'Thank you', 'Yes']),
      v('Goodbye', 'Adiós', 'expression', 'good-BYE', 'Goodbye and see you soon!', '¡Adiós y nos vemos pronto!', '___ and see you soon!', 'Goodbye', ['Hello', 'Please', 'Yes']),
      v('Thank you', 'Gracias', 'expression', 'THANK yoo', 'Thank you very much for your help.', 'Muchas gracias por tu ayuda.', '___ very much for your help.', 'Thank you', ['Excuse me', 'Hello', 'No']),
      v('Please', 'Por favor', 'expression', 'PLEEZ', 'A hot cup of coffee, please.', 'Una taza de café caliente, por favor.', 'A hot cup of coffee, ___ .', 'please', ['thank you', 'goodbye', 'hello']),
      v('Yes', 'Sí', 'expression', 'YES', 'Yes, I understand clearly.', 'Sí, entiendo claramente.', '___, I understand clearly.', 'Yes', ['No', 'Thank you', 'Sorry']),
      v('No', 'No', 'expression', 'NOH', 'No, that is not possible today.', 'No, eso no es posible hoy.', '___, that is not possible today.', 'No', ['Yes', 'Hello', 'Thanks']),
      v('How are you?', '¿Cómo estás?', 'phrase', 'how are YOO', 'Good morning, how are you?', 'Buenos días, ¿cómo estás?', 'Good morning, ___ ?', 'how are you', ['goodbye', 'thank you', 'good night']),
      v('Welcome', 'Bienvenido', 'expression', 'WEL-kum', 'Welcome to London!', '¡Bienvenido a Londres!', '___ to London!', 'Welcome', ['Goodbye', 'Thanks', 'Excuse me']),
      v('See you soon', 'Hasta pronto', 'phrase', 'see yoo SOON', 'Have a nice day and see you soon!', '¡Que tengas buen día y hasta pronto!', 'Have a nice day and ___ !', 'see you soon', ['hello', 'please', 'yes']),
      v('Good night', 'Buenas noches', 'expression', 'good NYTE', 'Good night and sweet dreams.', 'Buenas noches y dulces sueños.', '___ and sweet dreams.', 'Good night', ['Good morning', 'Thank you', 'Yes']),
    ],
    2: [
      v('Nice to meet you', 'Mucho gusto', 'expression', 'nys too MEET yoo', 'Hello, nice to meet you.', 'Hola, mucho gusto en conocerte.', 'Hello, ___ .', 'nice to meet you', ['excuse me', 'thank you', 'goodbye']),
      v('My name is', 'Me llamo', 'phrase', 'my NAYM iz', 'Hello, my name is David.', 'Hola, me llamo David.', 'Hello, ___ David.', 'my name is', ['nice to meet you', 'please', 'thanks']),
      v('Excuse me', 'Perdón / Disculpe', 'expression', 'ek-SKYOOZ mee', 'Excuse me, where is the subway?', 'Disculpe, ¿dónde está el metro?', '___, where is the subway?', 'Excuse me', ['Thank you', 'Hello', 'Yes']),
      v('Good morning', 'Buenos días', 'phrase', 'good MOR-ning', 'Good morning everyone!', '¡Buenos días a todos!', '___ everyone!', 'Good morning', ['Good night', 'Goodbye', 'Bye']),
      v('You are welcome', 'De nada', 'phrase', 'yoo are WEL-kum', 'Don\'t mention it, you are welcome!', '¡No hay de qué, de nada!', 'Don\'t mention it, ___ !', 'you are welcome', ['thank you', 'hello', 'yes']),
      v('Friend', 'Amigo', 'noun', 'FREND', 'He is my best friend from school.', 'Él es mi mejor amigo de la escuela.', 'He is my best ___ from school.', 'friend', ['teacher', 'brother', 'father']),
      v('Teacher', 'Profesor / Maestro', 'noun', 'TEE-cher', 'The teacher explains grammar clearly.', 'El profesor explica la gramática con claridad.', 'The ___ explains grammar clearly.', 'teacher', ['student', 'friend', 'doctor']),
      v('Student', 'Estudiante', 'noun', 'STOO-dent', 'The student studies every evening.', 'El estudiante estudia todas las tardes.', 'The ___ studies every evening.', 'student', ['teacher', 'worker', 'friend']),
      v('City', 'Ciudad', 'noun', 'SIT-ee', 'London is a very vibrant city.', 'Londres es una ciudad muy vibrante.', 'London is a very vibrant ___ .', 'city', ['house', 'street', 'room']),
      v('All right', 'De acuerdo / Está bien', 'phrase', 'awl RYTE', 'Everything is all right, thank you.', 'Todo está bien, gracias.', 'Everything is ___ , thank you.', 'all right', ['no', 'never', 'bad']),
    ],
  },
};

for (let u = 3; u <= 50; u++) {
  ENGLISH_LANGUAGE.units[u] = [
    v(`Concept_en_${u}_1`, `Concept ${u}.1`, 'noun', `con-cept`, `This concept ${u} is essential in English communication.`, `Este concepto ${u} es esencial en la comunicación en inglés.`, `This concept ___ is essential in English communication.`, `Concept_en_${u}_1`, ['idea', 'word', 'rule']),
    v(`Concept_en_${u}_2`, `Concept ${u}.2`, 'verb', `con-cept`, `We should explore theme ${u} thoroughly.`, `Deberíamos explorar el tema ${u} a fondo.`, `We should explore theme ___ thoroughly.`, `Concept_en_${u}_2`, ['study', 'read', 'think']),
    v(`Concept_en_${u}_3`, `Concept ${u}.3`, 'adjective', `con-cept`, `A fresh perspective ${u} enriches conversation.`, `Una perspectiva fresca ${u} enriquece la conversación.`, `A fresh perspective ___ enriches conversation.`, `Concept_en_${u}_3`, ['clear', 'deep', 'great']),
    v(`Concept_en_${u}_4`, `Concept ${u}.4`, 'noun', `con-cept`, `Mastering this unit ${u} unlocks advanced C1 fluency.`, `Dominar esta unidad ${u} desbloquea la fluidez avanzada C1.`, `Mastering this unit ___ unlocks advanced C1 fluency.`, `Concept_en_${u}_4`, ['level', 'style', 'voice']),
    v(`Concept_en_${u}_5`, `Concept ${u}.5`, 'expression', `con-cept`, `Undoubtedly, this factor ${u} is decisive.`, `Sin duda, este factor ${u} es decisivo.`, `Undoubtedly, this factor ___ is decisive.`, `Concept_en_${u}_5`, ['maybe', 'never', 'hardly']),
    v(`Concept_en_${u}_6`, `Concept ${u}.6`, 'noun', `con-cept`, `English grammar structure ${u} is applied accurately.`, `La estructura gramatical inglesa ${u} se aplica con precisión.`, `English grammar structure ___ is applied accurately.`, `Concept_en_${u}_6`, ['rule', 'sentence', 'logic']),
    v(`Concept_en_${u}_7`, `Concept ${u}.7`, 'verb', `con-cept`, `Practicing this exercise ${u} daily builds confidence.`, `Practicar este ejercicio ${u} a diario genera confianza.`, `Practicing this exercise ___ daily builds confidence.`, `Concept_en_${u}_7`, ['learning', 'speaking', 'writing']),
    v(`Concept_en_${u}_8`, `Concept ${u}.8`, 'adjective', `con-cept`, `This is an outstanding achievement ${u} in language learning.`, `Este es un logro sobresaliente ${u} en el aprendizaje de idiomas.`, `This is an outstanding achievement ___ in language learning.`, `Concept_en_${u}_8`, ['huge', 'true', 'good']),
    v(`Concept_en_${u}_9`, `Concept ${u}.9`, 'phrase', `con-cept`, `Consequently, we reach our milestone ${u}.`, `Por consiguiente, alcanzamos nuestro hito ${u}.`, `Consequently, we reach our milestone ___ .`, `Concept_en_${u}_9`, ['step', 'plan', 'road']),
    v(`Concept_en_${u}_10`, `Concept ${u}.10`, 'noun', `con-cept`, `Fluent expression ${u} opens global opportunities.`, `La expresión fluida ${u} abre oportunidades globales.`, `Fluent expression ___ opens global opportunities.`, `Concept_en_${u}_10`, ['voice', 'power', 'art']),
  ];
}
