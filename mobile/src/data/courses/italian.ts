import type { StaticCourse } from '../staticCurriculum';

export const ITALIAN_COURSE: StaticCourse = {
  "_id": "course-it-en",
  "id": "course-it-en",
  "code": "it-en",
  "title": "Italian Academy",
  "description": "Immerse yourself in la dolce vita: melodic pronunciation, double consonants, culinary fluency, and authentic conversation.",
  "fromLanguage": "en",
  "toLanguage": "it",
  "flagIcon": "🇮🇹",
  "level": "A1–A2",
  "status": "published",
  "order": 7,
  "totalUnits": 3,
  "totalLessons": 7,
  "units": [
    {
      "id": "unit-it-1",
      "courseId": "course-it-en",
      "unitNumber": 1,
      "title": "Unit 1: First Steps & Greetings (Primi Passi)",
      "description": "Master standard Italian greetings, self-introductions, and pure vowel pronunciation.",
      "themeColor": "#58CC02",
      "icon": "sparkles",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-it-101",
          "unitId": "unit-it-1",
          "lessonNumber": 1,
          "title": "Saying Hello in Italian",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-it-1",
              "lessonId": "lesson-it-101",
              "type": "MULTIPLE_CHOICE",
              "prompt": "Select the Italian word for \"Hello / Hi\":",
              "instruction": "Choose the correct greeting option",
              "order": 1,
              "explanation": "\"Ciao\" is the famous informal Italian greeting used for both hello and goodbye among friends and peers.",
              "data": {
                "correctOptionId": "opt-it-1",
                "options": [
                  {
                    "id": "opt-it-1",
                    "text": "Ciao",
                    "translation": "Hello / Bye"
                  },
                  {
                    "id": "opt-it-2",
                    "text": "Arrivederci",
                    "translation": "Goodbye"
                  },
                  {
                    "id": "opt-it-3",
                    "text": "Per favore",
                    "translation": "Please"
                  },
                  {
                    "id": "opt-it-4",
                    "text": "Grazie",
                    "translation": "Thank you"
                  }
                ]
              }
            },
            {
              "id": "ex-it-2",
              "lessonId": "lesson-it-101",
              "type": "TRANSLATION",
              "prompt": "Translate to Italian: \"Good morning\"",
              "instruction": "Type your answer in Italian",
              "order": 2,
              "explanation": "\"Buongiorno\" is the polite standard morning and daytime greeting in Italy.",
              "data": {
                "acceptableAnswers": [
                  "Buongiorno",
                  "buongiorno",
                  "Buon giorno",
                  "buon giorno"
                ]
              }
            },
            {
              "id": "ex-it-3",
              "lessonId": "lesson-it-101",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Italian greetings with their English meanings:",
              "instruction": "Tap matching pairs to connect them",
              "order": 3,
              "explanation": "Essential Italian greetings and politeness formulas.",
              "data": {
                "pairs": [
                  {
                    "id": "it-p1",
                    "leftText": "Ciao",
                    "rightText": "Hello / Bye"
                  },
                  {
                    "id": "it-p2",
                    "leftText": "Buonasera",
                    "rightText": "Good evening"
                  },
                  {
                    "id": "it-p3",
                    "leftText": "Arrivederci",
                    "rightText": "Goodbye"
                  },
                  {
                    "id": "it-p4",
                    "leftText": "A presto",
                    "rightText": "See you soon"
                  }
                ]
              }
            },
            {
              "id": "ex-it-4",
              "lessonId": "lesson-it-101",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Speak this phrase out loud in Italian:",
              "instruction": "Pronounce the pure Italian vowels and rolled \"r\"",
              "order": 4,
              "explanation": "In \"Grazie\", pronounce the \"z\" as /ts/ and voice both final vowels clearly /ɡrat.tsje/.",
              "data": {
                "phraseToSpeak": "Buongiorno, grazie mille",
                "phoneticGuide": "bwohn-JOHR-noh, GRAHT-tsyeh MEEL-leh"
              }
            }
          ]
        },
        {
          "id": "lesson-it-102",
          "unitId": "unit-it-1",
          "lessonNumber": 2,
          "title": "Introducing Yourself & \"Mi Chiamo\"",
          "type": "standard",
          "xpReward": 15,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-it-5",
              "lessonId": "lesson-it-102",
              "type": "WORD_ORDER",
              "prompt": "Construct: \"My name is Marco\" (Mi chiamo Marco)",
              "instruction": "Tap words in the correct order",
              "order": 1,
              "explanation": "In Italian, \"Mi chiamo Marco\" means \"I call myself Marco\".",
              "data": {
                "sourcePrompt": "My name is Marco",
                "wordBank": [
                  "Mi",
                  "chiamo",
                  "Marco",
                  "tu",
                  "sei",
                  "nome"
                ],
                "correctOrder": [
                  "Mi",
                  "chiamo",
                  "Marco"
                ]
              }
            },
            {
              "id": "ex-it-6",
              "lessonId": "lesson-it-102",
              "type": "FILL_IN_THE_BLANK",
              "prompt": "Complete the sentence with the correct form of \"essere\" (to be):",
              "instruction": "Select the missing verb form",
              "order": 2,
              "explanation": "\"Io sono\" is the first-person singular present form of \"essere\".",
              "data": {
                "sentenceWithBlank": "Io ___ di Roma.",
                "options": [
                  "sono",
                  "sei",
                  "è",
                  "siamo"
                ],
                "acceptableAnswers": [
                  "sono"
                ]
              }
            },
            {
              "id": "ex-it-7",
              "lessonId": "lesson-it-102",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Listen to the audio and select what the speaker says:",
              "instruction": "Listen carefully and select the spoken phrase",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/greeting_it.mp3",
              "order": 3,
              "explanation": "The speaker introduces: \"Piacere, mi chiamo Giulia\" (Pleased to meet you, my name is Giulia).",
              "data": {
                "transcript": "Piacere, mi chiamo Giulia",
                "correctOptionId": "opt-aud-it-1",
                "options": [
                  {
                    "id": "opt-aud-it-1",
                    "text": "Piacere, mi chiamo Giulia"
                  },
                  {
                    "id": "opt-aud-it-2",
                    "text": "Buonanotte, arrivederci"
                  },
                  {
                    "id": "opt-aud-it-3",
                    "text": "Dov'è la stazione?"
                  },
                  {
                    "id": "opt-aud-it-4",
                    "text": "Un caffè per favore"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-it-103",
          "unitId": "unit-it-1",
          "lessonNumber": 3,
          "title": "Unit 1 Checkpoint: Italian Introductions",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 3,
          "status": "published",
          "exercises": [
            {
              "id": "ex-it-8",
              "lessonId": "lesson-it-103",
              "type": "TRUE_FALSE",
              "prompt": "Read the statement and determine if it is True or False:",
              "instruction": "Verify cultural accuracy",
              "order": 1,
              "explanation": "\"Piacere\" is the standard Italian expression for \"Pleased to meet you\".",
              "data": {
                "statement": "\"Piacere\" is the natural Italian equivalent of \"Pleased to meet you\".",
                "isTrue": true
              }
            },
            {
              "id": "ex-it-9",
              "lessonId": "lesson-it-103",
              "type": "TRANSLATION",
              "prompt": "Translate to Italian: \"Pleased to meet you, I am Matteo\"",
              "instruction": "Type your answer in Italian",
              "order": 2,
              "explanation": "\"Piacere, sono Matteo\" or \"Piacere, mi chiamo Matteo\".",
              "data": {
                "acceptableAnswers": [
                  "Piacere, sono Matteo",
                  "Piacere, mi chiamo Matteo",
                  "Piacere sono Matteo"
                ]
              }
            },
            {
              "id": "ex-it-c1-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Pronuncia questo saluto formale ed elegante:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 3,
              "explanation": "\"Piacere di conoscerti, buona giornata!\" unisce cordialità ed educazione.",
              "data": {
                "phraseToSpeak": "Piacere di conoscerti, buona giornata!",
                "phoneticGuide": "pyah-CHEH-reh dee koh-NOH-shair-tee, BWAH-nah johr-NAH-tah"
              },
              "lessonId": "lesson-it-103"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-it-2",
      "courseId": "course-it-en",
      "unitNumber": 2,
      "title": "Unit 2: Al Ristorante & Ordering (Un Caffè Per Favore)",
      "description": "Order espresso, pasta, ask for the bill, and learn Italian dining culture.",
      "themeColor": "#1CB0F6",
      "icon": "coffee",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-it-201",
          "unitId": "unit-it-2",
          "lessonNumber": 1,
          "title": "Ordering Coffee and Food",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-it-10",
              "lessonId": "lesson-it-201",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you say \"A coffee, please\" in Italian?",
              "instruction": "Select the polite formula",
              "order": 1,
              "explanation": "\"Un caffè, per favore\" is the standard polite order formula at any Italian bar.",
              "data": {
                "correctOptionId": "opt-it-c1",
                "options": [
                  {
                    "id": "opt-it-c1",
                    "text": "Un caffè, per favore."
                  },
                  {
                    "id": "opt-it-c2",
                    "text": "Dammi caffè subito."
                  },
                  {
                    "id": "opt-it-c3",
                    "text": "Il tavolo mangia."
                  },
                  {
                    "id": "opt-it-c4",
                    "text": "Pane con latte."
                  }
                ]
              }
            },
            {
              "id": "ex-it-11",
              "lessonId": "lesson-it-201",
              "type": "WORD_ORDER",
              "prompt": "Construct: \"The check, please\" (Il conto, per favore)",
              "instruction": "Order the words properly",
              "order": 2,
              "explanation": "\"Il conto, per favore\" is how you ask for the restaurant check.",
              "data": {
                "sourcePrompt": "The check, please",
                "wordBank": [
                  "Il",
                  "conto,",
                  "per",
                  "favore",
                  "la",
                  "pasta"
                ],
                "correctOrder": [
                  "Il",
                  "conto,",
                  "per",
                  "favore"
                ]
              }
            },
            {
              "id": "ex-it-12",
              "lessonId": "lesson-it-201",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Italian restaurant vocabulary with English:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Essential dining terms in Italy.",
              "data": {
                "pairs": [
                  {
                    "id": "it-cp1",
                    "leftText": "Il caffè",
                    "rightText": "The coffee / espresso"
                  },
                  {
                    "id": "it-cp2",
                    "leftText": "L'acqua",
                    "rightText": "The water"
                  },
                  {
                    "id": "it-cp3",
                    "leftText": "Il conto",
                    "rightText": "The check / bill"
                  },
                  {
                    "id": "it-cp4",
                    "leftText": "Buonissimo",
                    "rightText": "Extremely delicious"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-it-202",
          "unitId": "unit-it-2",
          "lessonNumber": 2,
          "title": "Unit 2 Checkpoint: Dining Mastery",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-it-13",
              "lessonId": "lesson-it-202",
              "type": "TRANSLATION",
              "prompt": "Translate to Italian: \"A bottle of water, please\"",
              "instruction": "Type your answer in Italian",
              "order": 1,
              "explanation": "\"Una bottiglia d'acqua, per favore\".",
              "data": {
                "acceptableAnswers": [
                  "Una bottiglia d'acqua, per favore",
                  "Una bottiglia d'acqua per favore",
                  "Una bottiglia di acqua per favore"
                ]
              }
            },
            {
              "id": "ex-it-c2-listen",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Ascolta il cameriere al bar e seleziona la domanda:",
              "instruction": "Listen carefully and select the spoken question",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/it_cafe_order.mp3",
              "order": 2,
              "explanation": "Formula classica del bar italiano: \"Desidera qualcos'altro da bere?\".",
              "data": {
                "audioUrl": "https://actions.google.com/sounds/v1/speech/it_cafe_order.mp3",
                "transcript": "Desidera qualcos'altro da bere?",
                "correctOptionId": "opt-it-c2-1",
                "options": [
                  {
                    "id": "opt-it-c2-1",
                    "text": "Desidera qualcos'altro da bere?"
                  },
                  {
                    "id": "opt-it-c2-2",
                    "text": "Dov'è il bagno?"
                  },
                  {
                    "id": "opt-it-c2-3",
                    "text": "Quanto costa il caffè?"
                  },
                  {
                    "id": "opt-it-c2-4",
                    "text": "A che ora chiudete?"
                  }
                ]
              },
              "lessonId": "lesson-it-202"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-it-3",
      "courseId": "course-it-en",
      "unitNumber": 3,
      "title": "Unit 3: Navigating Italian Cities (In Città)",
      "description": "Ask where piazzas, museums, and train stations are located.",
      "themeColor": "#FF9600",
      "icon": "map-pin",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-it-301",
          "unitId": "unit-it-3",
          "lessonNumber": 1,
          "title": "Asking for Directions (Dov'è...?)",
          "type": "standard",
          "xpReward": 20,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-it-14",
              "lessonId": "lesson-it-301",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you ask \"Where is the station?\" in Italian?",
              "instruction": "Select the correct question",
              "order": 1,
              "explanation": "\"Dov'è la stazione?\" is the standard question formula.",
              "data": {
                "correctOptionId": "opt-dir-it-1",
                "options": [
                  {
                    "id": "opt-dir-it-1",
                    "text": "Dov'è la stazione?"
                  },
                  {
                    "id": "opt-dir-it-2",
                    "text": "Quando è la stazione?"
                  },
                  {
                    "id": "opt-dir-it-3",
                    "text": "Chi è la stazione?"
                  },
                  {
                    "id": "opt-dir-it-4",
                    "text": "Perché la stazione?"
                  }
                ]
              }
            },
            {
              "id": "ex-it-15",
              "lessonId": "lesson-it-301",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Italian directions to English:",
              "instruction": "Connect spatial directions",
              "order": 2,
              "explanation": "Fundamental directions for navigating Italian towns.",
              "data": {
                "pairs": [
                  {
                    "id": "it-dp1",
                    "leftText": "A sinistra",
                    "rightText": "To the left"
                  },
                  {
                    "id": "it-dp2",
                    "leftText": "A destra",
                    "rightText": "To the right"
                  },
                  {
                    "id": "it-dp3",
                    "leftText": "Sempre dritto",
                    "rightText": "Straight ahead"
                  },
                  {
                    "id": "it-dp4",
                    "leftText": "Vicino",
                    "rightText": "Near / close"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-it-302",
          "unitId": "unit-it-3",
          "lessonNumber": 2,
          "title": "Unit 3 Checkpoint: City Navigation Mastery",
          "type": "checkpoint",
          "xpReward": 30,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-it-16",
              "lessonId": "lesson-it-302",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Scusi, dov'è l'albergo?\"",
              "instruction": "Type your answer in English",
              "order": 1,
              "explanation": "\"Excuse me, where is the hotel?\" (\"albergo\" is hotel).",
              "data": {
                "acceptableAnswers": [
                  "Excuse me, where is the hotel?",
                  "Excuse me, where is the hotel",
                  "Pardon me, where is the hotel?"
                ]
              }
            },
            {
              "id": "ex-it-c3-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Chiedi dov'è la stazione ferroviaria in italiano:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 2,
              "explanation": "\"Scusi, dov'è...\" è la richiesta standard per trovare monumenti o stazioni.",
              "data": {
                "phraseToSpeak": "Scusi, dov'è la stazione centrale?",
                "phoneticGuide": "SKOO-zee, doh-VEH lah stah-TSYOH-neh chehn-TRAH-leh"
              },
              "lessonId": "lesson-it-302"
            }
          ]
        }
      ]
    }
  ]
};
