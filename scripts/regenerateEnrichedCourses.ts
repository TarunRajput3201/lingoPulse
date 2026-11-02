import * as fs from 'fs';
import * as path from 'path';

const rawCourses = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../backend/src/seed/coursesData.json'), 'utf-8')
);

const ENRICHMENTS: Record<string, any> = {
  'course-en-es': {
    varName: 'ENGLISH_COURSE',
    fileName: 'english.ts',
    u1Speak: {
      id: 'ex-en-c1-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Introduce yourself politely in English:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 3,
      explanation: '"Hello, nice to meet you!" is the quintessential polite introduction formula in English.',
      data: {
        phraseToSpeak: 'Hello, nice to meet you!',
        phoneticGuide: 'heh-LOH, nys too MEET yoo',
      },
    },
    u2Listen: {
      id: 'ex-en-c2-listen',
      type: 'LISTENING_COMPREHENSION',
      prompt: 'Listen to the café server and select what is asked:',
      instruction: 'Listen carefully and select the spoken question',
      audioUrl: 'https://actions.google.com/sounds/v1/speech/en_cafe_order.mp3',
      order: 2,
      explanation: 'The server politely inquires if the customer desires additional items.',
      data: {
        audioUrl: 'https://actions.google.com/sounds/v1/speech/en_cafe_order.mp3',
        transcript: 'Would you like anything else?',
        correctOptionId: 'opt-en-c2-1',
        options: [
          { id: 'opt-en-c2-1', text: 'Would you like anything else?' },
          { id: 'opt-en-c2-2', text: 'Where is the bathroom?' },
          { id: 'opt-en-c2-3', text: 'Can you repeat that?' },
          { id: 'opt-en-c2-4', text: 'What is the time?' },
        ],
      },
    },
    u3Speak: {
      id: 'ex-en-c3-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Ask for the nearest subway station in spoken English:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 2,
      explanation: '"Where is the nearest..." is the most natural way to locate transport hubs.',
      data: {
        phraseToSpeak: 'Where is the nearest subway station?',
        phoneticGuide: 'wear iz the NEER-ist SUB-way STAY-shun',
      },
    },
  },
  'course-es-en': {
    varName: 'SPANISH_COURSE',
    fileName: 'spanish.ts',
    u1Speak: {
      id: 'ex-es-c1-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Say a polite morning greeting and pleasure to meet someone:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 3,
      explanation: '"Mucho gusto, buenos días" smoothly combines personal introduction with morning etiquette.',
      data: {
        phraseToSpeak: '¡Mucho gusto, buenos días!',
        phoneticGuide: 'MOO-choh GOOS-toh, BWEH-nohs DEE-ahs',
      },
    },
    u2Listen: {
      id: 'ex-es-c2-listen',
      type: 'LISTENING_COMPREHENSION',
      prompt: 'Escucha al mesero y selecciona la pregunta que hace:',
      instruction: 'Listen carefully and select the spoken question',
      audioUrl: 'https://actions.google.com/sounds/v1/speech/es_cafe_order.mp3',
      order: 2,
      explanation: 'El camarero pregunta si los comensales quieren bebidas adicionales.',
      data: {
        audioUrl: 'https://actions.google.com/sounds/v1/speech/es_cafe_order.mp3',
        transcript: '¿Desea algo más de tomar?',
        correctOptionId: 'opt-es-c2-1',
        options: [
          { id: 'opt-es-c2-1', text: '¿Desea algo más de tomar?' },
          { id: 'opt-es-c2-2', text: '¿Dónde está el baño?' },
          { id: 'opt-es-c2-3', text: '¿A qué hora cierran?' },
          { id: 'opt-es-c2-4', text: '¿Cuánto cuesta esto?' },
        ],
      },
    },
    u3Speak: {
      id: 'ex-es-c3-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Pide direcciones hacia la estación de tren en voz alta:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 2,
      explanation: 'Frase imprescindible para desplazarse y pedir indicaciones urbanas.',
      data: {
        phraseToSpeak: '¿Dónde está la estación de tren?',
        phoneticGuide: 'DOHN-deh ehs-TAH lah ehs-tah-SYOHN deh trehn',
      },
    },
  },
  'course-fr-en': {
    varName: 'FRENCH_COURSE',
    fileName: 'french.ts',
    u1Speak: {
      id: 'ex-fr-c1-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Prononcez cette salutation polie :',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 3,
      explanation: '"Enchanté, bonne journée !" exprime la courtoisie fondamentale française.',
      data: {
        phraseToSpeak: 'Enchanté, bonne journée !',
        phoneticGuide: 'ahn-shahn-TAY, bun zhoor-NAY',
      },
    },
    u2Listen: {
      id: 'ex-fr-c2-listen',
      type: 'LISTENING_COMPREHENSION',
      prompt: 'Écoutez le serveur au café et choisissez sa question :',
      instruction: 'Listen carefully and select the spoken question',
      audioUrl: 'https://actions.google.com/sounds/v1/speech/fr_cafe_order.mp3',
      order: 2,
      explanation: 'Formule rituelle des bistrots et boulangeries françaises pour finaliser une commande.',
      data: {
        audioUrl: 'https://actions.google.com/sounds/v1/speech/fr_cafe_order.mp3',
        transcript: 'Et avec ceci, ce sera tout ?',
        correctOptionId: 'opt-fr-c2-1',
        options: [
          { id: 'opt-fr-c2-1', text: 'Et avec ceci, ce sera tout ?' },
          { id: 'opt-fr-c2-2', text: 'Où sont les toilettes ?' },
          { id: 'opt-fr-c2-3', text: 'Combien coûte le café ?' },
          { id: 'opt-fr-c2-4', text: 'Prenez-vous la carte bancaire ?' },
        ],
      },
    },
    u3Speak: {
      id: 'ex-fr-c3-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Demandez votre chemin vers la station de métro :',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 2,
      explanation: "Tournure élégante et indispensable pour s'orienter dans le réseau parisien.",
      data: {
        phraseToSpeak: "Où se trouve la station de métro, s'il vous plaît ?",
        phoneticGuide: 'oo suh TROOV lah stah-SYOHN duh may-TROH, seel voo pleh',
      },
    },
  },
  'course-ja-en': {
    varName: 'JAPANESE_COURSE',
    fileName: 'japanese.ts',
    u1Speak: {
      id: 'ex-ja-c1-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Speak the polite Japanese first-meeting greeting:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 3,
      explanation: 'The essential Japanese introductory formula establishing mutual respect.',
      data: {
        phraseToSpeak: 'はじめまして、よろしくお願いします',
        phoneticGuide: 'Hajimemashite, yoroshiku onegaishimasu',
      },
    },
    u2Listen: {
      id: 'ex-ja-c2-listen',
      type: 'LISTENING_COMPREHENSION',
      prompt: '店員さんの音声を聞いて、質問を選んでください：',
      instruction: 'Listen carefully and select the spoken question',
      audioUrl: 'https://actions.google.com/sounds/v1/speech/ja_cafe_order.mp3',
      order: 2,
      explanation: 'Standard polite phrase used by Japanese restaurant staff ("Have you decided on your order?").',
      data: {
        audioUrl: 'https://actions.google.com/sounds/v1/speech/ja_cafe_order.mp3',
        transcript: 'ご注文はお決まりですか？',
        correctOptionId: 'opt-ja-c2-1',
        options: [
          { id: 'opt-ja-c2-1', text: 'ご注文はお決まりですか？' },
          { id: 'opt-ja-c2-2', text: 'お会計をお願いします' },
          { id: 'opt-ja-c2-3', text: 'トイレはどこですか？' },
          { id: 'opt-ja-c2-4', text: '何時まで営業していますか？' },
        ],
      },
    },
    u3Speak: {
      id: 'ex-ja-c3-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Ask where the train station is located in Japanese:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 2,
      explanation: 'Crucial travel phrase starting with "Sumimasen" (Excuse me) followed by location query.',
      data: {
        phraseToSpeak: 'すみません、駅はどこですか？',
        phoneticGuide: 'Sumimasen, eki wa doko desu ka?',
      },
    },
  },
  'course-de-en': {
    varName: 'GERMAN_COURSE',
    fileName: 'german.ts',
    u1Speak: {
      id: 'ex-de-c1-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Sprechen Sie diese höfliche Begrüßung aus:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 3,
      explanation: '"Sehr angenehm, guten Tag!" ist eine vornehme Begrüßungsformel.',
      data: {
        phraseToSpeak: 'Sehr angenehm, guten Tag!',
        phoneticGuide: 'zayr AHN-guh-naym, GOO-ten tahk',
      },
    },
    u2Listen: {
      id: 'ex-de-c2-listen',
      type: 'LISTENING_COMPREHENSION',
      prompt: 'Hören Sie der Bedienung zu und wählen Sie die Frage:',
      instruction: 'Listen carefully and select the spoken question',
      audioUrl: 'https://actions.google.com/sounds/v1/speech/de_cafe_order.mp3',
      order: 2,
      explanation: 'Klassische Nachfrage im Café: "Möchten Sie sonst noch etwas bestellen?".',
      data: {
        audioUrl: 'https://actions.google.com/sounds/v1/speech/de_cafe_order.mp3',
        transcript: 'Möchten Sie sonst noch etwas bestellen?',
        correctOptionId: 'opt-de-c2-1',
        options: [
          { id: 'opt-de-c2-1', text: 'Möchten Sie sonst noch etwas bestellen?' },
          { id: 'opt-de-c2-2', text: 'Wo ist die Toilette?' },
          { id: 'opt-de-c2-3', text: 'Wie viel kostet das?' },
          { id: 'opt-de-c2-4', text: 'Zahlen Sie zusammen?' },
        ],
      },
    },
    u3Speak: {
      id: 'ex-de-c3-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Fragen Sie nach dem Weg zum Hauptbahnhof:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 2,
      explanation: 'Zentrale Navigationsfrage für Reisende im deutschen Verkehrsnetz.',
      data: {
        phraseToSpeak: 'Entschuldigung, wo ist der Bahnhof?',
        phoneticGuide: 'ent-SHOOL-dee-goong, voh ist dair BAHN-hohf',
      },
    },
  },
  'course-ko-en': {
    varName: 'KOREAN_COURSE',
    fileName: 'korean.ts',
    u1Speak: {
      id: 'ex-ko-c1-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: '한국어로 정중하게 첫인사를 나누세요:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 3,
      explanation: 'Standard polite formal introductory statement upon meeting someone for the first time.',
      data: {
        phraseToSpeak: '처음 뵙겠습니다. 반갑습니다.',
        phoneticGuide: 'Cheo-eum boep-get-seum-ni-da. Ban-gap-seum-ni-da.',
      },
    },
    u2Listen: {
      id: 'ex-ko-c2-listen',
      type: 'LISTENING_COMPREHENSION',
      prompt: '식당 직원의 말을 듣고 알맞은 표현을 고르세요:',
      instruction: 'Listen carefully and select the spoken question',
      audioUrl: 'https://actions.google.com/sounds/v1/speech/ko_cafe_order.mp3',
      order: 2,
      explanation: 'Universal café/restaurant query: "Would you like to order?".',
      data: {
        audioUrl: 'https://actions.google.com/sounds/v1/speech/ko_cafe_order.mp3',
        transcript: '주문하시겠어요?',
        correctOptionId: 'opt-ko-c2-1',
        options: [
          { id: 'opt-ko-c2-1', text: '주문하시겠어요?' },
          { id: 'opt-ko-c2-2', text: '화장실이 어디예요?' },
          { id: 'opt-ko-c2-3', text: '계산해 주세요' },
          { id: 'opt-ko-c2-4', text: '얼마예요?' },
        ],
      },
    },
    u3Speak: {
      id: 'ex-ko-c3-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: '지하철역 위치를 한국어로 물어보세요:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 2,
      explanation: 'Essential street navigation sentence using polite informal ending -eo-di-ye-yo.',
      data: {
        phraseToSpeak: '실례합니다, 지하철역이 어디예요?',
        phoneticGuide: 'Sil-lye-ham-ni-da, ji-ha-cheol-yeo-gi eo-di-ye-yo?',
      },
    },
  },
  'course-it-en': {
    varName: 'ITALIAN_COURSE',
    fileName: 'italian.ts',
    u1Speak: {
      id: 'ex-it-c1-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Pronuncia questo saluto formale ed elegante:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 3,
      explanation: '"Piacere di conoscerti, buona giornata!" unisce cordialità ed educazione.',
      data: {
        phraseToSpeak: 'Piacere di conoscerti, buona giornata!',
        phoneticGuide: 'pyah-CHEH-reh dee koh-NOH-shair-tee, BWAH-nah johr-NAH-tah',
      },
    },
    u2Listen: {
      id: 'ex-it-c2-listen',
      type: 'LISTENING_COMPREHENSION',
      prompt: 'Ascolta il cameriere al bar e seleziona la domanda:',
      instruction: 'Listen carefully and select the spoken question',
      audioUrl: 'https://actions.google.com/sounds/v1/speech/it_cafe_order.mp3',
      order: 2,
      explanation: 'Formula classica del bar italiano: "Desidera qualcos\'altro da bere?".',
      data: {
        audioUrl: 'https://actions.google.com/sounds/v1/speech/it_cafe_order.mp3',
        transcript: "Desidera qualcos'altro da bere?",
        correctOptionId: 'opt-it-c2-1',
        options: [
          { id: 'opt-it-c2-1', text: "Desidera qualcos'altro da bere?" },
          { id: 'opt-it-c2-2', text: "Dov'è il bagno?" },
          { id: 'opt-it-c2-3', text: 'Quanto costa il caffè?' },
          { id: 'opt-it-c2-4', text: 'A che ora chiudete?' },
        ],
      },
    },
    u3Speak: {
      id: 'ex-it-c3-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Chiedi dov\'è la stazione ferroviaria in italiano:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 2,
      explanation: '"Scusi, dov\'è..." è la richiesta standard per trovare monumenti o stazioni.',
      data: {
        phraseToSpeak: "Scusi, dov'è la stazione centrale?",
        phoneticGuide: 'SKOO-zee, doh-VEH lah stah-TSYOH-neh chehn-TRAH-leh',
      },
    },
  },
  'course-zh-en': {
    varName: 'MANDARIN_COURSE',
    fileName: 'mandarin.ts',
    u1Speak: {
      id: 'ex-zh-c1-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: '用中文向新朋友表达很高兴认识他：',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 3,
      explanation: 'Standard Mandarin expression: "Very happy to meet you!".',
      data: {
        phraseToSpeak: '很高兴认识你！',
        phoneticGuide: 'Hěn gāoxìng rènshi nǐ!',
      },
    },
    u2Listen: {
      id: 'ex-zh-c2-listen',
      type: 'LISTENING_COMPREHENSION',
      prompt: '听服务员说话，选择正确的问句：',
      instruction: 'Listen carefully and select the spoken question',
      audioUrl: 'https://actions.google.com/sounds/v1/speech/zh_cafe_order.mp3',
      order: 2,
      explanation: 'Polite waiter inquiry in tea houses and restaurants: "May I ask what you would like to order?".',
      data: {
        audioUrl: 'https://actions.google.com/sounds/v1/speech/zh_cafe_order.mp3',
        transcript: '请问您要点什么？',
        correctOptionId: 'opt-zh-c2-1',
        options: [
          { id: 'opt-zh-c2-1', text: '请问您要点什么？' },
          { id: 'opt-zh-c2-2', text: '洗手间在哪里？' },
          { id: 'opt-zh-c2-3', text: '请问一共多少钱？' },
          { id: 'opt-zh-c2-4', text: '可以扫码支付吗？' },
        ],
      },
    },
    u3Speak: {
      id: 'ex-zh-c3-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: '在街上询问地铁站在哪里：',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 2,
      explanation: 'Standard navigation sentence beginning with "Qǐngwèn" (May I ask).',
      data: {
        phraseToSpeak: '请问地铁站在哪里？',
        phoneticGuide: 'Qǐngwèn dìtiězhan zài nǎlǐ?',
      },
    },
  },
  'course-pt-en': {
    varName: 'PORTUGUESE_COURSE',
    fileName: 'portuguese.ts',
    u1Speak: {
      id: 'ex-pt-c1-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Pronuncie esta saudação cordial em português:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 3,
      explanation: '"Muito prazer, tenha um bom dia!" expressa simpatia natural e educação.',
      data: {
        phraseToSpeak: 'Muito prazer, tenha um bom dia!',
        phoneticGuide: 'MOOY-too prah-ZAIR, TENG-yah oom bohm JEE-ah',
      },
    },
    u2Listen: {
      id: 'ex-pt-c2-listen',
      type: 'LISTENING_COMPREHENSION',
      prompt: 'Ouça o atendente na padaria e escolha a pergunta correta:',
      instruction: 'Listen carefully and select the spoken question',
      audioUrl: 'https://actions.google.com/sounds/v1/speech/pt_cafe_order.mp3',
      order: 2,
      explanation: 'Pergunta típica em cafés e padarias: "Deseja algo mais para acompanhar?".',
      data: {
        audioUrl: 'https://actions.google.com/sounds/v1/speech/pt_cafe_order.mp3',
        transcript: 'Deseja algo mais para acompanhar?',
        correctOptionId: 'opt-pt-c2-1',
        options: [
          { id: 'opt-pt-c2-1', text: 'Deseja algo mais para acompanhar?' },
          { id: 'opt-pt-c2-2', text: 'Onde fica o banheiro?' },
          { id: 'opt-pt-c2-3', text: 'Quanto custa a conta?' },
          { id: 'opt-pt-c2-4', text: 'Aceita cartão de crédito?' },
        ],
      },
    },
    u3Speak: {
      id: 'ex-pt-c3-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'Peça informações para chegar à estação de metrô:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 2,
      explanation: 'Frase essencial para circular pelas cidades brasileiras ou portuguesas.',
      data: {
        phraseToSpeak: 'Com licença, onde fica a estação de metrô?',
        phoneticGuide: 'kohm lee-SAYN-sah, OHN-jee FEE-kah ah ehs-tah-SOWNG jee meh-TROH',
      },
    },
  },
  'course-hi-en': {
    varName: 'HINDI_COURSE',
    fileName: 'hindi.ts',
    u1Speak: {
      id: 'ex-hi-c1-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'हिंदी में शिष्टाचार पूर्वक अपना परिचय दीजिए:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 3,
      explanation: 'Respected introductory formula expressing joy upon meeting someone.',
      data: {
        phraseToSpeak: 'आपसे मिलकर बहुत खुशी हुई।',
        phoneticGuide: 'Aapse milkar bahut khushi hui.',
      },
    },
    u2Listen: {
      id: 'ex-hi-c2-listen',
      type: 'LISTENING_COMPREHENSION',
      prompt: 'दुकानदार या वेटर की बात सुनकर सही वाक्य चुनिए:',
      instruction: 'Listen carefully and select the spoken question',
      audioUrl: 'https://actions.google.com/sounds/v1/speech/hi_cafe_order.mp3',
      order: 2,
      explanation: 'Polite inquiry in chai stalls and restaurants: "Would you like to have anything else?".',
      data: {
        audioUrl: 'https://actions.google.com/sounds/v1/speech/hi_cafe_order.mp3',
        transcript: 'क्या आप कुछ और लेना चाहेंगे?',
        correctOptionId: 'opt-hi-c2-1',
        options: [
          { id: 'opt-hi-c2-1', text: 'क्या आप कुछ और लेना चाहेंगे?' },
          { id: 'opt-hi-c2-2', text: 'शौचालय कहाँ है?' },
          { id: 'opt-hi-c2-3', text: 'बिल कितना हुआ?' },
          { id: 'opt-hi-c2-4', text: 'यह कितने का है?' },
        ],
      },
    },
    u3Speak: {
      id: 'ex-hi-c3-speak',
      type: 'SPEAKING_PRONUNCIATION',
      prompt: 'सड़क पर मेट्रो स्टेशन का रास्ता पूछिए:',
      instruction: 'Speak the phrase clearly into your microphone',
      order: 2,
      explanation: 'Standard respectful question for urban transit navigation in Hindi.',
      data: {
        phraseToSpeak: 'माफ़ कीजिए, मेट्रो स्टेशन कहाँ है?',
        phoneticGuide: 'Maaf kijiye, metro station kahaan hai?',
      },
    },
  },
};

const coursesDir = path.resolve(__dirname, '../mobile/src/data/courses');

for (const course of rawCourses) {
  const enrich = ENRICHMENTS[course.id];
  if (!enrich) continue;

  // Unit 1 Checkpoint lesson
  const u1Checkpoint = course.units[0].lessons.find((l: any) => l.type === 'checkpoint');
  if (u1Checkpoint) {
    const existing = u1Checkpoint.exercises.find((e: any) => e.id === enrich.u1Speak.id);
    if (!existing) {
      const speakEx = { ...enrich.u1Speak, lessonId: u1Checkpoint.id };
      u1Checkpoint.exercises.push(speakEx);
    }
  }

  // Unit 2 Checkpoint lesson
  const u2Checkpoint = course.units[1].lessons.find((l: any) => l.type === 'checkpoint');
  if (u2Checkpoint) {
    const existing = u2Checkpoint.exercises.find((e: any) => e.id === enrich.u2Listen.id);
    if (!existing) {
      const listenEx = { ...enrich.u2Listen, lessonId: u2Checkpoint.id };
      u2Checkpoint.exercises.push(listenEx);
    }
  }

  // Unit 3 Checkpoint lesson
  const u3Checkpoint = course.units[2].lessons.find((l: any) => l.type === 'checkpoint');
  if (u3Checkpoint) {
    const existing = u3Checkpoint.exercises.find((e: any) => e.id === enrich.u3Speak.id);
    if (!existing) {
      const speakEx = { ...enrich.u3Speak, lessonId: u3Checkpoint.id };
      u3Checkpoint.exercises.push(speakEx);
    }
  }

  // Write clean TS file
  const tsContent = `import type { StaticCourse } from '../staticCurriculum';

export const ${enrich.varName}: StaticCourse = ${JSON.stringify(course, null, 2)};
`;
  const filePath = path.join(coursesDir, enrich.fileName);
  fs.writeFileSync(filePath, tsContent, 'utf-8');
  console.log(`✅ Generated ${enrich.fileName} with ${course.units.reduce((a: number, u: any) => a + u.lessons.reduce((la: number, l: any) => la + l.exercises.length, 0), 0)} exercises.`);
}

// Update backend/src/seed/coursesData.json
const outJsonPath = path.resolve(__dirname, '../backend/src/seed/coursesData.json');
fs.writeFileSync(outJsonPath, JSON.stringify(rawCourses, null, 2), 'utf-8');
console.log('✅ Updated backend coursesData.json');

console.log('🎉 Enriched course regeneration complete!');
