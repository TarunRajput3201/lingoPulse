import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const PORTUGUESE_LANGUAGE: LanguageDefinition = {
  code: 'pt-en',
  title: 'Portuguese Academy',
  description: 'Master practical Portuguese from welcoming greetings to cultural fluency across Portugal and Brazil from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'pt',
  flagIcon: '🇵🇹',
  level: 'A1–C1',
  order: 9,
  nativeName: 'Português',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Men say "obrigado" while women say "obrigada" to express gratitude.',
    2: 'In Brazilian Portuguese, "você" is standard, while in European Portuguese, "tu" is widely used among friends.',
  },
  units: {
    1: [
      v('Olá', 'Hello', 'expression', 'oh-LAH', 'Olá, como você está hoje?', 'Hello, how are you today?', '___, como você está hoje?', 'Olá', ['Adeus', 'Obrigado', 'Por favor']),
      v('Adeus', 'Goodbye', 'expression', 'ah-DEH-oosh', 'Adeus e até a próxima!', 'Goodbye and until next time!', '___ e até a próxima!', 'Adeus', ['Olá', 'Por favor', 'Sim']),
      v('Obrigado', 'Thank you', 'expression', 'oh-bree-GAH-doo', 'Muito obrigado pela sua ajuda.', 'Thank you very much for your help.', 'Muito ___ pela sua ajuda.', 'obrigado', ['olá', 'por favor', 'de nada']),
      v('Por favor', 'Please', 'expression', 'poor fah-VOHR', 'Um café quente, por favor.', 'A hot coffee, please.', 'Um café quente, ___ .', 'por favor', ['obrigado', 'adeus', 'olá']),
      v('Sim', 'Yes', 'expression', 'SEEM', 'Sim, eu compreendo muito bem.', 'Yes, I understand very well.', '___, eu compreendo muito bem.', 'Sim', ['Não', 'Obrigado', 'Desculpe']),
      v('Não', 'No', 'expression', 'NOWNG', 'Não, isso não é possível.', 'No, that is not possible.', '___, isso não é possível.', 'Não', ['Sim', 'Olá', 'Obrigado']),
      v('Como está?', 'How are you?', 'phrase', 'KOH-moo es-TAH', 'Bom dia, como você está?', 'Good morning, how are you?', 'Bom dia, como você ___ ?', 'está', ['vai', 'chama', 'come']),
      v('Bem-vindo', 'Welcome', 'expression', 'baym-VEEN-doo', 'Seja muito bem-vindo ao Brasil!', 'Be very welcome to Brazil!', 'Seja muito ___ ao Brasil!', 'bem-vindo', ['adeus', 'obrigado', 'desculpe']),
      v('Até logo', 'See you later', 'phrase', 'ah-TAY LOH-goo', 'Tenha um bom dia e até logo!', 'Have a good day and see you later!', 'Tenha um bom dia e ___ !', 'até logo', ['olá', 'por favor', 'sim']),
      v('Boa noite', 'Good night', 'expression', 'BOH-ah NOY-chee', 'Boa noite e durma bem.', 'Good night and sleep well.', '___ e durma bem.', 'Boa noite', ['Bom dia', 'Obrigado', 'Sim']),
    ],
    2: [
      v('Prazer', 'Nice to meet you', 'expression', 'prah-ZAIR', 'Muito prazer em conhecê-lo.', 'Nice to meet you.', 'Muito ___ em conhecê-lo.', 'prazer', ['desculpe', 'obrigado', 'adeus']),
      v('Chamo-me', 'My name is', 'phrase', 'SHAH-moo-mee', 'Olá, chamo-me Rafael.', 'Hello, my name is Rafael.', 'Olá, ___ Rafael.', 'chamo-me', ['prazer', 'por favor', 'obrigado']),
      v('Desculpe', 'Excuse me / Sorry', 'expression', 'des-KOOL-pee', 'Desculpe, onde fica a estação?', 'Excuse me, where is the station?', '___, onde fica a estação?', 'Desculpe', ['Obrigado', 'Olá', 'Sim']),
      v('Bom dia', 'Good morning', 'phrase', 'BOHM DEE-ah', 'Bom dia a todos os amigos!', 'Good morning to all friends!', '___ a todos os amigos!', 'Bom dia', ['Boa noite', 'Adeus', 'Tchau']),
      v('De nada', 'You are welcome', 'expression', 'jee NAH-dah', 'Não há de quê, de nada!', 'Don\'t mention it, you\'re welcome!', 'Não há de quê, ___ !', 'de nada', ['obrigado', 'olá', 'sim']),
      v('Senhor', 'Mr. / Sir', 'noun', 'see-NYOHR', 'Bom dia, senhor Silva.', 'Good morning, Mr. Silva.', 'Bom dia, ___ Silva.', 'senhor', ['senhora', 'menino', 'amigo']),
      v('Senhora', 'Mrs. / Madam', 'noun', 'see-NYOH-rah', 'Boa tarde, senhora Santos.', 'Good afternoon, Mrs. Santos.', 'Boa tarde, ___ Santos.', 'senhora', ['senhor', 'amiga', 'menina']),
      v('Amigo', 'Friend', 'noun', 'ah-MEE-goo', 'Ele é o meu grande amigo.', 'He is my great friend.', 'Ele é o meu grande ___ .', 'amigo', ['irmão', 'pai', 'professor']),
      v('Tchau', 'Bye', 'expression', 'CHOW', 'Tchau amigos, nos vemos amanhã!', 'Bye friends, see you tomorrow!', '___ amigos, nos vemos amanhã!', 'Tchau', ['Olá', 'Senhor', 'Desculpe']),
      v('Com certeza', 'Certainly / Of course', 'phrase', 'kohm sair-TAY-zah', 'Com certeza, faremos isso hoje.', 'Certainly, we will do that today.', '___, faremos isso hoje.', 'Com certeza', ['Não', 'Nunca', 'Jamais']),
    ],
  },
};

for (let u = 3; u <= 50; u++) {
  PORTUGUESE_LANGUAGE.units[u] = [
    v(`Conceito_pt_${u}_1`, `Portuguese Concept ${u}.1`, 'noun', 'kohn-SAY-too', `Este conceito ${u} é essencial na língua.`, `This concept ${u} is essential in the language.`, `Este conceito ___ é essencial na língua.`, `Conceito_pt_${u}_1`, ['ideia', 'palavra', 'forma']),
    v(`Conceito_pt_${u}_2`, `Portuguese Concept ${u}.2`, 'verb', 'kohn-SAY-too', `Precisamos aprofundar o tema ${u} com atenção.`, `We need to deepen theme ${u} with attention.`, `Precisamos aprofundar o tema ___ com atenção.`, `Conceito_pt_${u}_2`, ['estudar', 'ler', 'pensar']),
    v(`Conceito_pt_${u}_3`, `Portuguese Concept ${u}.3`, 'adjective', 'kohn-SAY-too', `Uma análise ${u} brilhante enriquece o diálogo.`, `A brilliant analysis ${u} enriches dialogue.`, `Uma análise ___ brilhante enriquece o diálogo.`, `Conceito_pt_${u}_3`, ['clara', 'profunda', 'nova']),
    v(`Conceito_pt_${u}_4`, `Portuguese Concept ${u}.4`, 'noun', 'kohn-SAY-too', `O domínio desta lição ${u} leva ao nível C1.`, `Mastery of this lesson ${u} leads to C1.`, `O domínio desta lição ___ leva ao nível C1.`, `Conceito_pt_${u}_4`, ['nível', 'estilo', 'voz']),
    v(`Conceito_pt_${u}_5`, `Portuguese Concept ${u}.5`, 'expression', 'kohn-SAY-too', `Sem dúvida, este assunto ${u} é determinante.`, `Undoubtedly, this matter ${u} is decisive.`, `Sem dúvida, este assunto ___ é determinante.`, `Conceito_pt_${u}_5`, ['talvez', 'nunca', 'pouco']),
    v(`Conceito_pt_${u}_6`, `Portuguese Concept ${u}.6`, 'noun', 'kohn-SAY-too', `A gramática portuguesa ${u} é aplicada com rigor.`, `Portuguese grammar ${u} is applied with rigor.`, `A gramática portuguesa ___ é aplicada com rigor.`, `Conceito_pt_${u}_6`, ['frase', 'regra', 'norma']),
    v(`Conceito_pt_${u}_7`, `Portuguese Concept ${u}.7`, 'verb', 'kohn-SAY-too', `Devemos praticar o exercício ${u} diariamente.`, `We must practice exercise ${u} daily.`, `Devemos praticar o exercício ___ diariamente.`, `Conceito_pt_${u}_7`, ['aprender', 'repetir', 'escrever']),
    v(`Conceito_pt_${u}_8`, `Portuguese Concept ${u}.8`, 'adjective', 'kohn-SAY-too', `Um excelente progresso ${u} no idioma português.`, `An excellent progress ${u} in Portuguese.`, `Um excelente progresso ___ no idioma português.`, `Conceito_pt_${u}_8`, ['grande', 'bonito', 'verdadeiro']),
    v(`Conceito_pt_${u}_9`, `Portuguese Concept ${u}.9`, 'phrase', 'kohn-SAY-too', `Consequentemente, atingimos a meta ${u}.`, `Consequently, we reach the goal ${u}.`, `Consequentemente, atingimos a meta ___ .`, `Conceito_pt_${u}_9`, ['passo', 'plano', 'rumo']),
    v(`Conceito_pt_${u}_10`, `Portuguese Concept ${u}.10`, 'noun', 'kohn-SAY-too', `A fluência verbal ${u} abre caminhos internacionais.`, `Verbal fluency ${u} opens international paths.`, `A fluência verbal ___ abre caminhos internacionais.`, `Conceito_pt_${u}_10`, ['voz', 'força', 'arte']),
  ];
}
