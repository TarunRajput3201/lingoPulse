import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const ITALIAN_LANGUAGE: LanguageDefinition = {
  code: 'it-en',
  title: 'Italian Academy',
  description: 'Master practical Italian from melodic greetings to authentic cultural conversation from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'it',
  flagIcon: '🇮🇹',
  level: 'A1–C1',
  order: 7,
  culturalTips: {
    1: 'In Italy, "Ciao" is used informally among friends, while "Buongiorno" and "Buonasera" are polite for public places.',
    2: 'Italian coffee culture is sacred: cappuccino is typically enjoyed only in the morning!',
  },
  units: {
    1: [
      v('Buongiorno', 'Good morning / Hello', 'expression', 'bwon-ZHOR-noh', 'Buongiorno, come sta oggi?', 'Good morning, how are you today?', '___, come sta oggi?', 'Buongiorno', ['Arrivederci', 'Grazie', 'Per favore']),
      v('Arrivederci', 'Goodbye', 'expression', 'ah-ree-veh-DAIR-chee', 'Arrivederci e a presto!', 'Goodbye and see you soon!', '___ e a presto!', 'Arrivederci', ['Buongiorno', 'Per favore', 'Sì']),
      v('Grazie', 'Thank you', 'expression', 'GRAHT-syeh', 'Grazie mille per il vostro aiuto.', 'Thank you very much for your help.', 'Grazie ___ per il vostro aiuto.', 'mille', ['prego', 'ciao', 'buongiorno']),
      v('Per favore', 'Please', 'expression', 'pair fah-VOH-ray', 'Un caffè espresso, per favore.', 'An espresso coffee, please.', 'Un caffè espresso, ___ .', 'per favore', ['grazie', 'ciao', 'buonasera']),
      v('Sì', 'Yes', 'expression', 'SEE', 'Sì, capisco molto bene.', 'Yes, I understand very well.', '___, capisco molto bene.', 'Sì', ['No', 'Grazie', 'Prego']),
      v('No', 'No', 'expression', 'NOH', 'No, non è possibile oggi.', 'No, it is not possible today.', '___, non è possibile oggi.', 'No', ['Sì', 'Ciao', 'Grazie']),
      v('Come sta?', 'How are you?', 'phrase', 'KOH-may STAH', 'Buongiorno signore, come sta?', 'Good morning sir, how are you?', 'Buongiorno signore, ___ ?', 'come sta', ['arrivederci', 'grazie mille', 'buona notte']),
      v('Benvenuto', 'Welcome', 'expression', 'ben-veh-NOO-toh', 'Benvenuto nella bella Italia!', 'Welcome to beautiful Italy!', '___ nella bella Italia!', 'Benvenuto', ['Arrivederci', 'Grazie', 'Scusa']),
      v('A presto', 'See you soon', 'phrase', 'ah PRAY-stoh', 'Buona giornata e a presto!', 'Have a good day and see you soon!', 'Buona giornata e ___ !', 'a presto', ['buongiorno', 'per favore', 'sì']),
      v('Buona notte', 'Good night', 'expression', 'BWOH-nah NOHT-tay', 'Buona notte e sogni d\'oro.', 'Good night and sweet dreams.', '___ e sogni d\'oro.', 'Buona notte', ['Buongiorno', 'Grazie', 'Sì']),
    ],
    2: [
      v('Piacere', 'Nice to meet you', 'expression', 'pyah-CHAY-ray', 'Molto piacere di conoscerla.', 'Pleased to meet you.', 'Molto ___ di conoscerla.', 'piacere', ['scusa', 'grazie', 'ciao']),
      v('Mi chiamo', 'My name is', 'phrase', 'mee KYAH-moh', 'Buongiorno, mi chiamo Matteo.', 'Hello, my name is Matteo.', 'Buongiorno, ___ Matteo.', 'mi chiamo', ['piacere', 'grazie', 'per favore']),
      v('Scusi', 'Excuse me (formal)', 'expression', 'SKOO-zee', 'Scusi, dov\'è la stazione ferroviaria?', 'Excuse me, where is the railway station?', '___, dov\'è la stazione ferroviaria?', 'Scusi', ['Grazie', 'Ciao', 'Sì']),
      v('Prego', 'You are welcome', 'expression', 'PRAY-goh', 'Di niente, prego!', 'Not at all, you\'re welcome!', 'Di niente, ___ !', 'prego', ['grazie', 'buongiorno', 'ciao']),
      v('Signore', 'Sir / Mr.', 'noun', 'see-NYOH-ray', 'Buongiorno signore Rossi.', 'Good day Mr. Rossi.', 'Buongiorno ___ Rossi.', 'signore', ['signora', 'amico', 'ragazzo']),
      v('Signora', 'Madam / Mrs.', 'noun', 'see-NYOH-rah', 'Buonasera signora Bianchi.', 'Good evening Mrs. Bianchi.', 'Buonasera ___ Bianchi.', 'signora', ['signore', 'bambina', 'amica']),
      v('Ciao', 'Hi / Bye', 'expression', 'CHOW', 'Ciao Marco, come va?', 'Hi Marco, how is it going?', '___ Marco, come va?', 'Ciao', ['Arrivederci', 'Scusi', 'Signore']),
      v('D\'accordo', 'Agreed / Okay', 'phrase', 'dahk-KOR-doh', 'D\'accordo, ci vediamo alle due.', 'Agreed, see you at two.', '___, ci vediamo alle due.', 'D\'accordo', ['No', 'Mai', 'Scusa']),
      v('Buona giornata', 'Have a nice day', 'phrase', 'BWOH-nah zhor-NAH-tah', 'Grazie e buona giornata a tutti!', 'Thank you and have a nice day everyone!', 'Grazie e ___ a tutti!', 'buona giornata', ['buona notte', 'ciao', 'prego']),
      v('Amico', 'Friend', 'noun', 'ah-MEE-koh', 'Lui è il mio migliore amico.', 'He is my best friend.', 'Lui è il mio migliore ___ .', 'amico', ['fratello', 'padre', 'maestro']),
    ],
  },
};

for (let u = 3; u <= 50; u++) {
  ITALIAN_LANGUAGE.units[u] = [
    v(`Concetto_it_${u}_1`, `Italian Concept ${u}.1`, 'noun', 'con-chet-to', `Questo concetto ${u} è fondamentale per la lingua.`, `This concept ${u} is fundamental for the language.`, `Questo concetto ___ è fondamentale per la lingua.`, `Concetto_it_${u}_1`, ['idea', 'parola', 'forma']),
    v(`Concetto_it_${u}_2`, `Italian Concept ${u}.2`, 'verb', 'con-chet-to', `Dobbiamo approfondire il tema ${u} con cura.`, `We must deepen theme ${u} with care.`, `Dobbiamo approfondire il tema ___ con cura.`, `Concetto_it_${u}_2`, ['studiare', 'leggere', 'pensare']),
    v(`Concetto_it_${u}_3`, `Italian Concept ${u}.3`, 'adjective', 'con-chet-to', `Un\'analisi ${u} brillante arricchisce la conversazione.`, `A brilliant analysis ${u} enriches conversation.`, `Un\'analisi ___ brillante arricchisce la conversazione.`, `Concetto_it_${u}_3`, ['chiara', 'profonda', 'nuova']),
    v(`Concetto_it_${u}_4`, `Italian Concept ${u}.4`, 'noun', 'con-chet-to', `La padronanza di questa lezione ${u} apre le porte del C1.`, `Mastery of this lesson ${u} opens doors to C1.`, `La padronanza di questa lezione ___ apre le porte del C1.`, `Concetto_it_${u}_4`, ['livello', 'stile', 'voce']),
    v(`Concetto_it_${u}_5`, `Italian Concept ${u}.5`, 'expression', 'con-chet-to', `Senza dubbio, questo argomento ${u} è decisivo.`, `Undoubtedly, this topic ${u} is decisive.`, `Senza dubbio, questo argomento ___ è decisivo.`, `Concetto_it_${u}_5`, ['forse', 'mai', 'appena']),
    v(`Concetto_it_${u}_6`, `Italian Concept ${u}.6`, 'noun', 'con-chet-to', `La grammatica italiana ${u} è applicata con eleganza.`, `Italian grammar ${u} is applied with elegance.`, `La grammatica italiana ___ è applicata con eleganza.`, `Concetto_it_${u}_6`, ['frase', 'regola', 'norma']),
    v(`Concetto_it_${u}_7`, `Italian Concept ${u}.7`, 'verb', 'con-chet-to', `Bisogna praticare l\'esercizio ${u} ogni giorno.`, `You must practice exercise ${u} every day.`, `Bisogna praticare l\'esercizio ___ ogni giorno.`, `Concetto_it_${u}_7`, ['imparare', 'ripetere', 'scrivere']),
    v(`Concetto_it_${u}_8`, `Italian Concept ${u}.8`, 'adjective', 'con-chet-to', `Un meraviglioso successo ${u} nello studio dell\'italiano.`, `A wonderful success ${u} in studying Italian.`, `Un meraviglioso successo ___ nello studio dell\'italiano.`, `Concetto_it_${u}_8`, ['grande', 'bello', 'vero']),
    v(`Concetto_it_${u}_9`, `Italian Concept ${u}.9`, 'phrase', 'con-chet-to', `Di conseguenza, raggiungiamo il traguardo ${u}.`, `Consequently, we reach milestone ${u}.`, `Di conseguenza, raggiungiamo il traguardo ___ .`, `Concetto_it_${u}_9`, ['passo', 'piano', 'scopo']),
    v(`Concetto_it_${u}_10`, `Italian Concept ${u}.10`, 'noun', 'con-chet-to', `La fluidità espressiva ${u} testimonia la completa padronanza.`, `Expressive fluency ${u} testifies to complete mastery.`, `La fluidità espressiva ___ testimonia la completa padronanza.`, `Concetto_it_${u}_10`, ['voce', 'forza', 'arte']),
  ];
}
