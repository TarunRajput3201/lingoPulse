/**
 * LingoPulse 3D Character Registry & Pedagogical Rotation Engine
 *
 * Features 5 distinct real-time 3D characters:
 * - Maya: Lead Teacher & Grammar Guide
 * - Leo: Pronunciation Coach & Phonics Master
 * - Elena: Conversation Partner & Dialogue Specialist
 * - Kael: Challenge Character & Speed Quiz Master
 * - Pip: Autonomous Companion Robot & Streak Celebrator
 *
 * Supports authentic native character speech in the active target learning language.
 */

export type CharacterId = 'maya' | 'leo' | 'elena' | 'kael' | 'pip';

export type CharacterMood =
  | 'idle'
  | 'intro'
  | 'speaking'
  | 'celebrate'
  | 'thinking'
  | 'encouraging'
  | 'correct'
  | 'wrong';

export interface CharacterQuotes {
  intro: string[];
  correct: string[];
  mistake: string[];
  streak: string[];
  thinking: string[];
}

export interface CharacterProfile {
  id: CharacterId;
  name: string;
  role: string;
  title: string;
  accentColor: string;
  darkAccent: string;
  lightAccent: string;
  haloColor: string;
  pedestalColor: string;
  pedestalBorder: string;
  pedestalBottom: string;
  quotes: CharacterQuotes;
}

export const CHARACTER_PROFILES: Record<CharacterId, CharacterProfile> = {
  maya: {
    id: 'maya',
    name: 'Maya',
    role: 'Teacher',
    title: 'Grammar & Vocabulary Guide',
    accentColor: '#10B981', // Emerald
    darkAccent: '#059669',
    lightAccent: '#D1FAE5',
    haloColor: 'rgba(16, 185, 129, 0.25)',
    pedestalColor: '#ECFDF5',
    pedestalBorder: '#6EE7B7',
    pedestalBottom: '#047857',
    quotes: {
      intro: [
        "Welcome! Let's explore new words together.",
        'Take your time, learning is step by step.',
        'Notice the pattern in this sentence!',
      ],
      correct: [
        'Brilliant! You grasp this quickly.',
        'Exactly right! Perfect grammar.',
        'Magnificent work, keep going!',
      ],
      mistake: [
        'Almost there! Look closely at the word endings.',
        'Mistakes help our brain grow stronger.',
        "Let's review this together, you've got this!",
      ],
      streak: [
        'Your daily dedication is truly paying off!',
        'Consistency creates true fluency.',
      ],
      thinking: [
        'Analyze each choice carefully...',
        'Remember the rule we practiced!',
      ],
    },
  },

  leo: {
    id: 'leo',
    name: 'Leo',
    role: 'Pronunciation Coach',
    title: 'Phonics & Speech Coach',
    accentColor: '#0EA5E9', // Azure
    darkAccent: '#0284C7',
    lightAccent: '#E0F2FE',
    haloColor: 'rgba(14, 165, 233, 0.25)',
    pedestalColor: '#F0F9FF',
    pedestalBorder: '#7DD3FC',
    pedestalBottom: '#0369A1',
    quotes: {
      intro: [
        'Listen closely to the native rhythm and cadence.',
        'Repeat after me! Form your mouth with precision.',
        'Tune your ear to the subtle sound variations.',
      ],
      correct: [
        'Spot-on accent! Sounds like a native speaker.',
        'Clean, crisp pronunciation! Outstanding.',
        'Your ear is becoming sharp!',
      ],
      mistake: [
        'Listen again closely to the vowel sound.',
        'So close! Try smoothing out the rhythm.',
        'Slow down and let each syllable breathe.',
      ],
      streak: [
        'Your ear is tuning in faster every single day!',
        'Native cadence comes with this steady repetition.',
      ],
      thinking: [
        'Listen to the acoustic cues...',
        'Focus on the intonation arc.',
      ],
    },
  },

  elena: {
    id: 'elena',
    name: 'Elena',
    role: 'Conversation Partner',
    title: 'Dialogue & Sentence Specialist',
    accentColor: '#F59E0B', // Amber
    darkAccent: '#D97706',
    lightAccent: '#FEF3C7',
    haloColor: 'rgba(245, 158, 11, 0.25)',
    pedestalColor: '#FFFBEB',
    pedestalBorder: '#FCD34D',
    pedestalBottom: '#B45309',
    quotes: {
      intro: [
        'Imagine using this phrase in a lively street cafe!',
        "Let's practice how real people speak every day.",
        'How would you reply to this in a real conversation?',
      ],
      correct: [
        'Smooth dialogue! You sound so natural.',
        'That connects seamlessly, beautiful sentence!',
        'Ready for a spontaneous conversation anytime!',
      ],
      mistake: [
        'In daily chats, we usually frame it like this!',
        'Natural phrasing takes a little practice.',
        'Think of how you would respond to a friend.',
      ],
      streak: [
        'Your conversational confidence is blossoming!',
        'You are speaking with genuine conviction now!',
      ],
      thinking: [
        'How would a local resident phrase this?',
        'Think about the conversational context...',
      ],
    },
  },

  kael: {
    id: 'kael',
    name: 'Kael',
    role: 'Challenge Master',
    title: 'Speed & Mastery Strategist',
    accentColor: '#8B5CF6', // Violet
    darkAccent: '#7C3AED',
    lightAccent: '#EDE9FE',
    haloColor: 'rgba(139, 92, 246, 0.25)',
    pedestalColor: '#F5F3FF',
    pedestalBorder: '#C4B5FD',
    pedestalBottom: '#6D28D9',
    quotes: {
      intro: [
        'Speed round! Trust your instinct on this one.',
        'Sharpen your focus, this one moves fast.',
        'Test your reaction time and mastery!',
      ],
      correct: [
        'Lightning fast! Incredible reflexes.',
        'Mastery demonstrated! That was unstoppable.',
        'Flawless execution! You crushed that challenge.',
      ],
      mistake: [
        'Reset your focus! Agility comes with repetition.',
        'A momentary slip, bounce back stronger!',
        'Lock in, the next round is yours.',
      ],
      streak: [
        'Speed and endurance combined! Unstoppable streak!',
        'Your cognitive processing is operating at peak levels!',
      ],
      thinking: [
        'Quick scan of all options...',
        'Eliminate the decoys and strike.',
      ],
    },
  },

  pip: {
    id: 'pip',
    name: 'Pip',
    role: 'AI Companion',
    title: 'Habit & Cheer Bot',
    accentColor: '#F97316', // Orange
    darkAccent: '#EA580C',
    lightAccent: '#FFEDD5',
    haloColor: 'rgba(249, 115, 22, 0.25)',
    pedestalColor: '#FFF7ED',
    pedestalBorder: '#FDBA74',
    pedestalBottom: '#C2410C',
    quotes: {
      intro: [
        'Beep-boop! Pip is charged and ready to learn!',
        'High five! Another great session starts now.',
        "Pip has your back! Let's earn some XP!",
      ],
      correct: [
        'BEEP! Pip does a victory spin! ⭐',
        'Pip gives high-five with both robotic hands!',
        'You are on fire today! Super combo!',
      ],
      mistake: [
        'Pip has extra battery power for you! Try again!',
        'No worries at all! Pip believes in you! 💖',
        'Shake it off! Next one is ours!',
      ],
      streak: [
        'STREAK SHIELD ACTIVE! 🔥 Keep that flame alive!',
        'Look at your streak shine! So proud of you!',
      ],
      thinking: [
        'Whirrr... Pip is calculating good luck for you!',
        'Take a deep breath, you know this one!',
      ],
    },
  },
};

/**
 * Authentic Multilingual Dialogues for Characters across Active Learning Languages
 */
export const MULTILINGUAL_QUOTES: Record<string, Record<CharacterId, CharacterQuotes>> = {
  // FRENCH
  fr: {
    maya: {
      intro: [
        'Bienvenue ! Explorons ensemble de nouveaux mots.',
        'Prenez votre temps, chaque étape compte.',
        'Regardez bien la structure de cette phrase !',
      ],
      correct: [
        'Brillant ! Vous apprenez très vite.',
        'Exactement ça ! Une grammaire impeccable.',
        'Magnifique travail, continuez ainsi !',
      ],
      mistake: [
        'Presque ! Observez bien la terminaison des mots.',
        'Les erreurs nous aident à progresser.',
        'Révisons cela ensemble, vous allez y arriver !',
      ],
      streak: [
        'Votre régularité porte ses fruits chaque jour !',
        'La constance mène à la véritable fluidité.',
      ],
      thinking: [
        'Analysez bien chaque option...',
        'Rappelez-vous de la règle vue ensemble !',
      ],
    },
    leo: {
      intro: [
        'Écoutez attentivement le rythme et la mélodie française.',
        'Répétez après moi avec clarté et précision.',
        'Habituez votre oreille aux nuances sonores.',
      ],
      correct: [
        'Un accent parfait ! Comme un natif.',
        'Prononciation nette et précise ! Bravo.',
        'Votre oreille devient remarquable !',
      ],
      mistake: [
        'Écoutez encore attentivement le son de la voyelle.',
        'Tout près ! Essayez de lier les mots en douceur.',
        'Respirez bien et articulez chaque syllabe.',
      ],
      streak: [
        'Votre oreille s’affine de jour en jour !',
        'La cadence naturelle vient avec la pratique régulière.',
      ],
      thinking: [
        'Faites attention aux liaisons...',
        'Écoutez l’intonation montante.',
      ],
    },
    elena: {
      intro: [
        'Imaginez cette phrase dans un café à Paris !',
        'Pratiquons le français authentique du quotidien.',
        'Comment répondriez-vous dans une vraie conversation ?',
      ],
      correct: [
        'Un dialogue très naturel ! Félicitations.',
        'Une liaison parfaite, superbe phrase !',
        'Prêt pour une conversation spontanée !',
      ],
      mistake: [
        'Dans la vie de tous les jours, on dit plutôt cela.',
        'La fluidité s’acquiert avec un peu de pratique.',
        'Pensez à ce que vous diriez à un ami.',
      ],
      streak: [
        'Votre confiance à l’oral s’épanouit !',
        'Vous vous exprimez avec une vraie aisance !',
      ],
      thinking: [
        'Comment un parisien formulerait cela ?',
        'Pensez au contexte de la discussion...',
      ],
    },
    kael: {
      intro: [
        'Défi chrono ! Faites confiance à votre premier réflexe.',
        'Restez concentré, le rythme est rapide !',
        'Testez votre rapidité et votre maîtrise !',
      ],
      correct: [
        'Rapide comme l’éclair ! Réflexes impressionnants.',
        'Maîtrise totale ! Impossible de vous arrêter.',
        'Exécution sans faute ! Vous avez relevé le défi.',
      ],
      mistake: [
        'Reprenez votre souffle ! La vitesse vient avec l’entraînement.',
        'Une petite hésitation, vous allez vous rattraper !',
        'Gardez le cap, la prochaine est pour vous.',
      ],
      streak: [
        'Vitesse et endurance réunies ! Série incroyable !',
        'Votre cerveau réagit à la vitesse maximale !',
      ],
      thinking: [
        'Scannez rapidement les réponses...',
        'Éliminez les pièges sans hésiter.',
      ],
    },
    pip: {
      intro: [
        'Bip-bop ! Pip est chargé et prêt à apprendre le français !',
        'Tapez m’en cinq ! Une nouvelle super leçon commence.',
        'Pip est là avec vous ! Gagnons des points !',
      ],
      correct: [
        'BIP ! Pip fait une danse de victoire ! ⭐',
        'Bravo ! Double tape robotique !',
        'Vous êtes en feu aujourd’hui ! Super combo !',
      ],
      mistake: [
        'Pip partage son énergie avec vous ! Réessayez !',
        'Aucun problème ! Pip croit en vous ! 💖',
        'On respire un coup, la prochaine est la bonne !',
      ],
      streak: [
        'BOUCLIER DE SÉRIE ACTIVÉ ! 🔥 Gardez la flamme !',
        'Regardez votre série briller ! Très fier de vous !',
      ],
      thinking: [
        'Bzzzt... Pip calcule la bonne réponse pour vous !',
        'Prenez votre temps, vous connaissez la réponse !',
      ],
    },
  },

  // SPANISH
  es: {
    maya: {
      intro: [
        '¡Bienvenido! Aprendamos nuevas palabras juntos.',
        'Tómate tu tiempo, el aprendizaje es paso a paso.',
        '¡Fíjate en el patrón de esta oración!',
      ],
      correct: [
        '¡Brillante! Lo entiendes muy rápido.',
        '¡Exactamente así! Gramática perfecta.',
        '¡Gran trabajo, continúa así!',
      ],
      mistake: [
        '¡Casi! Mira con atención las terminaciones.',
        'Los errores nos ayudan a aprender mejor.',
        '¡Repasémoslo juntos, tú puedes!',
      ],
      streak: [
        '¡Tu dedicación diaria está dando grandes frutos!',
        'La constancia crea verdadera fluidez.',
      ],
      thinking: [
        'Analiza cada opción con calma...',
        '¡Recuerda la regla que practicamos!',
      ],
    },
    leo: {
      intro: [
        'Escucha con atención el ritmo y la entonación nativa.',
        '¡Repite conmigo! Pronuncia con claridad.',
        'Afina tu oído a los matices del sonido.',
      ],
      correct: [
        '¡Acento impecable! Suenas como un hablante nativo.',
        '¡Pronunciación limpia y clara! Excelente.',
        '¡Tu oído está cada vez más afinado!',
      ],
      mistake: [
        'Escucha otra vez el sonido de las vocales.',
        '¡Muy cerca! Intenta suavizar el ritmo.',
        'Respira hondo y articula cada sílaba.',
      ],
      streak: [
        '¡Tu oído mejora a pasos agigantados!',
        'La cadencia nativa se logra practicando cada día.',
      ],
      thinking: [
        'Atento a la acentuación de las palabras...',
        'Sigue la curva de entonación.',
      ],
    },
    elena: {
      intro: [
        '¡Imagina usar esta frase en una terraza en Madrid!',
        'Practiquemos el español auténtico del día a día.',
        '¿Cómo contestarías en una charla real?',
      ],
      correct: [
        '¡Un diálogo súper natural! Te felicito.',
        '¡Conecta de maravilla, preciosa frase!',
        '¡Listo para conversar con soltura en cualquier momento!',
      ],
      mistake: [
        'En una charla informal solemos decirlo así.',
        'Hablar con soltura toma un poco de práctica.',
        'Piensa en cómo se lo dirías a un amigo.',
      ],
      streak: [
        '¡Tu confianza al hablar está creciendo muchísimo!',
        '¡Hablas con una seguridad estupenda!',
      ],
      thinking: [
        '¿Cómo lo diría alguien de aquí?',
        'Ten en cuenta el tono de la conversación...',
      ],
    },
    kael: {
      intro: [
        '¡Ronda rápida! Confía en tu primer instinto.',
        'Mantén la concentración, esto va deprisa.',
        '¡Demuestra tu rapidez y maestría!',
      ],
      correct: [
        '¡Rápido como un rayo! Reflejos admirables.',
        '¡Gran dominio! Eres imparable.',
        '¡Respuesta perfecta! Superaste el reto.',
      ],
      mistake: [
        '¡Recupérate! La agilidad mejora practicando.',
        'Un pequeño tropiezo, ¡la próxima es tuya!',
        'Enfócate, ahora viene tu revancha.',
      ],
      streak: [
        '¡Velocidad y resistencia impecables! ¡Racha de oro!',
        '¡Tu mente está procesando a máxima velocidad!',
      ],
      thinking: [
        'Echa un vistazo rápido a las opciones...',
        'Descarta las trampas con seguridad.',
      ],
    },
    pip: {
      intro: [
        '¡Pip-bip! ¡Pip tiene la batería llena para aprender español!',
        '¡Choca esos cinco! Empieza una lección fantástica.',
        '¡Pip te acompaña! ¡A por todos los puntos!',
      ],
      correct: [
        '¡BIP! ¡Pip hace un baile de celebración! ⭐',
        '¡Choca las dos manos robóticas!',
        '¡Estás imparable hoy! ¡Súper combo!',
      ],
      mistake: [
        '¡Pip te presta energía de reserva! ¡Prueba otra vez!',
        '¡No pasa nada! ¡Pip cree en ti al 100%! 💖',
        '¡Sacúdete el polvo, la siguiente la clavamos!',
      ],
      streak: [
        '¡ESCUDO DE RACHA ACTIVO! 🔥 ¡Mantén viva esa llama!',
        '¡Mira cómo brilla tu racha! ¡Qué orgullo!',
      ],
      thinking: [
        'Bzzzt... ¡Pip está calculando buena suerte para ti!',
        'Toma aire, ¡seguro que te la sabes!',
      ],
    },
  },

  // GERMAN
  de: {
    maya: {
      intro: [
        'Willkommen! Lass uns zusammen neue Wörter lernen.',
        'Nimm dir Zeit, jeder Schritt bringt dich weiter.',
        'Achte auf die Satzstruktur in diesem Satz!',
      ],
      correct: [
        'Hervorragend! Du begreifst das sehr schnell.',
        'Genau richtig! Perfekte Grammatik.',
        'Großartige Arbeit, mach weiter so!',
      ],
      mistake: [
        'Fast geschafft! Schau genau auf die Endungen.',
        'Fehler helfen uns, immer besser zu werden.',
        'Lass uns das gemeinsam ansehen, du schaffst das!',
      ],
      streak: [
        'Dein täglicher Fleiß zahlt sich wirklich aus!',
        'Regelmäßigkeit führt zu wahrer Sprachkompetenz.',
      ],
      thinking: [
        'Prüfe jede Antwortoption sorgfältig...',
        'Erinnere dich an die Regel, die wir geübt haben!',
      ],
    },
    leo: {
      intro: [
        'Höre genau auf den Rhythmus und die Aussprache.',
        'Sprich mir nach! Forme die Laute präzise.',
        'Gewöhne dein Gehör an die feinen Klangunterschiede.',
      ],
      correct: [
        'Erstklassige Aussprache! Klingt wie bei einem Muttersprachler.',
        'Klare, saubere Artikulation! Wunderbar.',
        'Dein Sprachgefühl wird immer besser!',
      ],
      mistake: [
        'Höre noch einmal genau auf die Vokale.',
        'Ganz nah dran! Versuche den Redefluss flüssiger zu halten.',
        'Atme ruhig und sprich jede Silbe deutlich.',
      ],
      streak: [
        'Dein Hörverständnis verbessert sich von Tag zu Tag!',
        'Der natürliche Redefluss kommt durch stetiges Üben.',
      ],
      thinking: [
        'Achte auf die Wortbetonung...',
        'Höre auf die Satzmelodie.',
      ],
    },
    elena: {
      intro: [
        'Stell dir vor, du nutzt diesen Satz in einem Berliner Café!',
        'Lass uns echtes, alltagstaugliches Deutsch trainieren.',
        'Wie würdest du in einem echten Gespräch reagieren?',
      ],
      correct: [
        'Sehr natürlicher Dialog! Ausgezeichnet.',
        'Das klingt flüssig und stimmig!',
        'Bereit für spontane Unterhaltungen!',
      ],
      mistake: [
        'Im Alltag formuliert man das meistens so.',
        'Natürliche Formulierungen brauchen etwas Übung.',
        'Überlege, wie du einem Freund antworten würdest.',
      ],
      streak: [
        'Dein Selbstvertrauen beim Sprechen wächst!',
        'Du sprichst mit echter Überzeugung!',
      ],
      thinking: [
        'Wie würde ein Einheimischer das sagen?',
        'Denke an den Kontext des Gesprächs...',
      ],
    },
    kael: {
      intro: [
        'Schnellrunde! Vertraue deinem ersten Gefühl.',
        'Bleib voll fokussiert, es geht schnell voran.',
        'Zeig deine Reaktionsgeschwindigkeit!',
      ],
      correct: [
        'Blitzschnell! Beeindruckende Reflexe.',
        'Volle Beherrschung! Nicht zu stoppen.',
        'Makellose Antwort! Herausforderung gemeistert.',
      ],
      mistake: [
        'Konzentration neu aufbauen! Übung macht den Meister.',
        'Kurz gezögert, beim nächsten Mal klappt es!',
        'Fokus halten, die nächste Runde gehört dir.',
      ],
      streak: [
        'Tempo und Ausdauer vereint! Starke Serie!',
        'Dein Verstand arbeitet auf Hochtouren!',
      ],
      thinking: [
        'Antworten rasch überfliegen...',
        'Fallen gezielt ausschließen.',
      ],
    },
    pip: {
      intro: [
        'Piep-piep! Pip ist voll aufgeladen für Deutsch!',
        'Gib mir fünf! Eine tolle Lerneinheit startet.',
        'Pip hält dir den Rücken frei! Holen wir Punkte!',
      ],
      correct: [
        'PIEP! Pip dreht eine Siegesrunde! ⭐',
        'Voller Erfolg! Roboter-High-Five!',
        'Du bist heute kaum zu bremsen! Super Combo!',
      ],
      mistake: [
        'Pip spendet dir extra Energie! Gleich noch einmal!',
        'Überhaupt kein Problem! Pip glaubt an dich! 💖',
        'Kopf hoch, die nächste Antwort sitzt!',
      ],
      streak: [
        'SERIEN-SCHUTZSCHILD AKTIV! 🔥 Lass die Flamme brennen!',
        'Sieh dir deine Serie an! Richtig stark gemacht!',
      ],
      thinking: [
        'Surrr... Pip berechnet etwas Glück für dich!',
        'Tief durchatmen, du weißt die Lösung!',
      ],
    },
  },

  // JAPANESE
  ja: {
    maya: {
      intro: [
        'ようこそ！一緒に新しい言葉を学びましょう。',
        '焦らず一歩ずつ進んでいきましょうね。',
        '文のパターンに注目してみてください！',
      ],
      correct: [
        '素晴らしい！とても理解が早いですね。',
        '大正解です！文法も完璧です。',
        '見事な出来栄えです、その調子です！',
      ],
      mistake: [
        'おしい！言葉の語尾をよく見てみましょう。',
        '失敗は上達への一番の近道ですよ。',
        '一緒に復習しましょう、次は必ずできます！',
      ],
      streak: [
        '毎日の努力がしっかりと実を結んでいますね！',
        '継続こそが自然な会話力への一番の鍵です。',
      ],
      thinking: [
        '選択肢をじっくり確認してみましょう...',
        '練習したルールを思い出してくださいね！',
      ],
    },
    leo: {
      intro: [
        '日本語のリズムとイントネーションをよく聴いてください。',
        '私の後に続いて、はっきりと声に出してみましょう。',
        '微妙な音の違いに耳を澄ませてみてください。',
      ],
      correct: [
        '完璧な発音です！ネイティブのようですね。',
        'とてもクリアで綺麗な発音です！お見事。',
        'リスニング力もどんどん上がっています！',
      ],
      mistake: [
        '母音の響きをもう一度よく聴いてみましょう。',
        'とても近いです！全体のテンポを意識してみましょう。',
        '落ち着いて一音ずつ発音してみましょう。',
      ],
      streak: [
        '毎日の練習で耳がどんどん慣れてきています！',
        '自然なリズムは日々の積み重ねから生まれます。',
      ],
      thinking: [
        '音の抑揚に注意してください...',
        '自然なイントネーションをイメージしましょう。',
      ],
    },
    elena: {
      intro: [
        'カフェでのリアルな会話をイメージしてみましょう！',
        '日常で使われる自然な日本語を練習しましょうね。',
        '実際の会話ならどう答えるか考えてみましょう。',
      ],
      correct: [
        'とても自然なやり取りですね！素晴らしいです。',
        '文のつながりがとても綺麗です！',
        'いつ実際の会話になってもバッチリですね！',
      ],
      mistake: [
        '普段の会話ではこのように表現することが多いです。',
        '自然な言い回しは少しずつ身についていきますよ。',
        'お友達に話しかける場面を思い浮かべてみてください。',
      ],
      streak: [
        '会話への自信がぐんぐん育っていますね！',
        '自然な自信が言葉に表れています！',
      ],
      thinking: [
        'ネイティブならどう表現するでしょうか？',
        '会話の流れを意識してみましょう...',
      ],
    },
    kael: {
      intro: [
        'スピード勝負です！直感を信じて進めましょう。',
        '集中力を研ぎ澄ましてください、テンポよくいきますよ。',
        '素早い判断力を見せてください！',
      ],
      correct: [
        '電光石火の速さですね！素晴らしい反射神経です。',
        '完璧なマスターぶりです！止められませんね。',
        'ノーミスでクリアです！チャレンジ成功ですね。',
      ],
      mistake: [
        '焦らなくて大丈夫です！反復練習で速くなります。',
        '少し迷いが出ましたね、次はリベンジです！',
        '集中していきましょう、次の問題はあなたの番です。',
      ],
      streak: [
        'スピードとスタミナの両立！最高の連続記録です！',
        '頭の回転が最高スピードに乗っています！',
      ],
      thinking: [
        '素早く選択肢を確認しましょう...',
        'ひっかけの選択肢を迷わず除外しましょう。',
      ],
    },
    pip: {
      intro: [
        'ピピッ！ピップは日本語学習の充電完了です！',
        'ハイタッチ！今日も楽しいレッスンが始まりますよ。',
        'ピップが応援しています！一緒にXPを集めましょう！',
      ],
      correct: [
        'ピピピッ！ピップの勝利のスピンダンス！⭐',
        'ロボットハンドでダブルハイタッチ！',
        '絶好調ですね！スーパースコア達成です！',
      ],
      mistake: [
        'ピップの予備バッテリーを分けてあげます！もう一回！',
        '全然平気です！ピップはあなたを信じています！💖',
        '切り替えていきましょう、次は大正解です！',
      ],
      streak: [
        '連続記録シールド発動中！🔥 この炎を保ちましょう！',
        '輝く連続記録を見てください！ピップも大感激です！',
      ],
      thinking: [
        'ウィーン... ピップが応援パワーを計算中です！',
        '深呼吸して、あなたなら絶対に分かりますよ！',
      ],
    },
  },

  // ITALIAN
  it: {
    maya: {
      intro: [
        'Benvenuto! Esploriamo insieme nuovi vocaboli.',
        'Prenditi il tuo tempo, ogni passo è importante.',
        'Nota la struttura di questa frase!',
      ],
      correct: [
        'Brillante! Lo impari molto velocemente.',
        'Esattamente così! Grammatica impeccabile.',
        'Lavoro magnifico, continua così!',
      ],
      mistake: [
        'Quasi! Guarda attentamente le desinenze.',
        'Gli errori ci aiutano a rafforzare la mente.',
        'Rivediamolo insieme, ce la farai!',
      ],
      streak: [
        'Il tuo impegno quotidiano sta dando ottimi frutti!',
        'La costanza porta alla vera fluidità.',
      ],
      thinking: [
        'Analizza ogni opzione con cura...',
        'Ricorda la regola che abbiamo praticato!',
      ],
    },
    leo: {
      intro: [
        'Ascolta attentamente la melodia e il ritmo italiano.',
        'Ripeti dopo di me pronunciando chiaramente.',
        'Abitua l’orecchio alle sfumature del suono.',
      ],
      correct: [
        'Accento perfetto! Sembri un madrelingua.',
        'Pronuncia pulita e cristallina! Ottimo.',
        'Il tuo orecchio si sta affinando tantissimo!',
      ],
      mistake: [
        'Ascolta di nuovo il suono delle vocali.',
        'Molto vicino! Prova a rendere il ritmo più fluido.',
        'Respira e articola ogni sillaba.',
      ],
      streak: [
        'Il tuo ascolto migliora ogni singolo giorno!',
        'La cadenza naturale arriva con la pratica costante.',
      ],
      thinking: [
        'Fai attenzione all’accento tonico...',
        'Segui la melodia della frase.',
      ],
    },
    elena: {
      intro: [
        'Immagina di usare questa frase in una piazza a Roma!',
        'Pratichiamo l’italiano vero di tutti i giorni.',
        'Come risponderesti in una conversazione reale?',
      ],
      correct: [
        'Dialogo scorrevole e naturale! Bravissimo.',
        'Si collega benissimo, bellissima frase!',
        'Pronto per fare conversazione in qualsiasi momento!',
      ],
      mistake: [
        'Nelle chiacchierate di tutti i giorni si dice così.',
        'La naturalezza si sviluppa con un po’ di pratica.',
        'Pensa a come parleresti a un amico.',
      ],
      streak: [
        'La tua sicurezza nel parlare sta sbocciando!',
        'Ti esprimi con vera disinvoltura!',
      ],
      thinking: [
        'Come lo formulerebbe una persona del posto?',
        'Pensa al contesto della conversazione...',
      ],
    },
    kael: {
      intro: [
        'Giro rapido! Fidati del tuo istinto.',
        'Massima concentrazione, qui si va veloci.',
        'Metti alla prova i tuoi riflessi!',
      ],
      correct: [
        'Veloce come un fulmine! Riflessi incredibili.',
        'Controllo totale! Sei inarrestabile.',
        'Esecuzione impeccabile! Sfida superata.',
      ],
      mistake: [
        'Ritrova la concentrazione! La velocità migliora provando.',
        'Una piccola esitazione, la prossima la centri!',
        'Rimani focalizzato, il prossimo turno è tuo.',
      ],
      streak: [
        'Velocità e resistenza insieme! Serie d’oro!',
        'La tua mente sta viaggiando al massimo!',
      ],
      thinking: [
        'Scansiona le risposte rapidamente...',
        'Elimina le trappole con sicurezza.',
      ],
    },
    pip: {
      intro: [
        'Bip-bip! Pip è carico per imparare l’italiano!',
        'Dammi il cinque! Inizia una lezione spettacolare.',
        'Pip è qui per aiutarti! Raccogliamo punti!',
      ],
      correct: [
        'BIP! Pip fa una giravolta di vittoria! ⭐',
        'Batti il cinque con due mani robotiche!',
        'Oggi sei imbattibile! Super combo!',
      ],
      mistake: [
        'Pip ti presta energia di riserva! Riprova!',
        'Nessun problema! Pip crede in te al 100%! 💖',
        'Respira a fondo, la prossima sarà perfetta!',
      ],
      streak: [
        'SCUDO SERIE ATTIVO! 🔥 Tieni viva la fiamma!',
        'Guarda che bella serie! Pip è fiero di te!',
      ],
      thinking: [
        'Bzzzt... Pip calcola un po’ di fortuna per te!',
        'Fai un respiro, la risposta la sai!',
      ],
    },
  },
};

/**
 * 15-Question Pedagogical Rotation Sequence
 */
const DEFAULT_15_ROTATION: CharacterId[] = [
  'maya',  // Q1:  Vocab intro & teacher welcome
  'maya',  // Q2:  Grammar reinforcement
  'kael',  // Q3:  Quick reflex quiz challenge
  'elena', // Q4:  Real-world dialogue phrasing
  'pip',   // Q5:  First 5-question milestone & cheer
  'leo',   // Q6:  Phonetic listening & lip-sync demonstration
  'kael',  // Q7:  Concept matching trial
  'leo',   // Q8:  Speaking & articulation coaching
  'maya',  // Q9:  Grammar rule fill-in explanation
  'elena', // Q10: Interactive conversation practice
  'kael',  // Q11: Rapid-fire speed challenge
  'elena', // Q12: Sentence construction & syntax
  'leo',   // Q13: Phonics cadence & native listening
  'maya',  // Q14: Cumulative synthesis translation
  'kael',  // Q15: Final lesson boss challenge!
];

/**
 * Resolves the active 3D character for any question in a lesson.
 */
export function getCharacterForQuestion(
  stepIndex: number,
  totalQuestions: number = 15,
  questionType?: string
): CharacterId {
  if (
    questionType === 'LISTENING' ||
    questionType === 'SPEAKING' ||
    questionType === 'PRONUNCIATION' ||
    questionType === 'SPEAKING_PRONUNCIATION' ||
    questionType === 'LISTENING_COMPREHENSION'
  ) {
    return 'leo';
  }
  if (questionType === 'DIALOGUE' || questionType === 'SENTENCE_BUILDER' || questionType === 'SENTENCE_CONSTRUCTION') {
    return 'elena';
  }
  if (questionType === 'SPEED_QUIZ' || questionType === 'HARD_MATCHING' || questionType === 'MATCHING_PAIRS') {
    return 'kael';
  }

  if (totalQuestions <= 15) {
    const idx = Math.max(0, Math.min(stepIndex, DEFAULT_15_ROTATION.length - 1));
    return DEFAULT_15_ROTATION[idx];
  }

  const characters: CharacterId[] = ['maya', 'leo', 'elena', 'kael', 'pip'];
  return characters[stepIndex % characters.length];
}

/**
 * Selects an authentic dialogue quote for the character, mood, and active learning language.
 *
 * Guarantees that when learning French, Maya/Leo/Elena/Kael/Pip speak French;
 * when learning Spanish, they speak Spanish; German for German; Japanese for Japanese, etc.
 */
export function getCharacterQuote(
  characterId: CharacterId,
  mood: CharacterMood,
  targetLanguage?: string
): string {
  const langKey = (targetLanguage || 'en').toLowerCase().trim().replace(/(-en|-es)$/, '');
  const langQuotes = MULTILINGUAL_QUOTES[langKey];

  let quotesObj: CharacterQuotes;
  if (langQuotes && langQuotes[characterId]) {
    quotesObj = langQuotes[characterId];
  } else {
    const profile = CHARACTER_PROFILES[characterId] || CHARACTER_PROFILES.maya;
    quotesObj = profile.quotes;
  }

  let pool = quotesObj.intro;
  if (mood === 'correct' || mood === 'celebrate') {
    pool = quotesObj.correct;
  } else if (mood === 'wrong' || mood === 'encouraging') {
    pool = quotesObj.mistake;
  } else if (mood === 'thinking') {
    pool = quotesObj.thinking;
  }

  if (!pool || pool.length === 0) {
    pool = quotesObj.intro;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex] || pool[0];
}
