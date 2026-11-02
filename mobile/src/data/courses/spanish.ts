import type { StaticCourse } from '../staticCurriculum';

export const SPANISH_COURSE: StaticCourse = {
  "_id": "course-es-en",
  "id": "course-es-en",
  "code": "es-en",
  "title": "Spanish Academy",
  "description": "Learn conversational Spanish from day one with interactive bite-sized lessons.",
  "fromLanguage": "en",
  "toLanguage": "es",
  "flagIcon": "🇪🇸",
  "level": "A1–A2",
  "status": "published",
  "order": 2,
  "totalUnits": 3,
  "totalLessons": 7,
  "units": [
    {
      "id": "unit-es-1",
      "courseId": "course-es-en",
      "unitNumber": 1,
      "title": "Unit 1: Greetings & Introductions",
      "description": "Say hello, introduce yourself, and order basic drinks in Spanish.",
      "themeColor": "#58CC02",
      "icon": "sparkles",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-es-101",
          "unitId": "unit-es-1",
          "lessonNumber": 1,
          "title": "Saying Hello",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-es-1",
              "lessonId": "lesson-es-101",
              "type": "MULTIPLE_CHOICE",
              "prompt": "Select the Spanish translation for \"Hello\":",
              "instruction": "Choose the correct greeting option",
              "order": 1,
              "explanation": "\"Hola\" is the universal Spanish greeting used at any time of day.",
              "data": {
                "correctOptionId": "opt-es-1",
                "options": [
                  {
                    "id": "opt-es-1",
                    "text": "Hola",
                    "translation": "Hello"
                  },
                  {
                    "id": "opt-es-2",
                    "text": "Adiós",
                    "translation": "Goodbye"
                  },
                  {
                    "id": "opt-es-3",
                    "text": "Por favor",
                    "translation": "Please"
                  },
                  {
                    "id": "opt-es-4",
                    "text": "Gracias",
                    "translation": "Thank you"
                  }
                ]
              }
            },
            {
              "id": "ex-es-2",
              "lessonId": "lesson-es-101",
              "type": "TRANSLATION",
              "prompt": "Translate to Spanish: \"Good morning\"",
              "instruction": "Type your answer in Spanish",
              "order": 2,
              "explanation": "\"Buenos días\" is the standard morning greeting in Spanish, used until midday.",
              "data": {
                "acceptableAnswers": [
                  "Buenos días",
                  "Buenos dias",
                  "buenos dias",
                  "buenos días"
                ]
              }
            },
            {
              "id": "ex-es-3",
              "lessonId": "lesson-es-101",
              "type": "MATCHING_PAIRS",
              "prompt": "Match each Spanish greeting to its English meaning:",
              "instruction": "Tap matching pairs to connect them",
              "order": 3,
              "explanation": "Connecting greetings with their correct meanings.",
              "data": {
                "pairs": [
                  {
                    "id": "p1",
                    "leftText": "Hola",
                    "rightText": "Hello"
                  },
                  {
                    "id": "p2",
                    "leftText": "Buenas noches",
                    "rightText": "Good night"
                  },
                  {
                    "id": "p3",
                    "leftText": "Hasta luego",
                    "rightText": "See you later"
                  },
                  {
                    "id": "p4",
                    "leftText": "Adiós",
                    "rightText": "Goodbye"
                  }
                ]
              }
            },
            {
              "id": "ex-es-4",
              "lessonId": "lesson-es-101",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Speak this phrase out loud in Spanish:",
              "instruction": "Practice clear pronunciation",
              "order": 4,
              "explanation": "Remember the \"h\" in \"Hola\" is completely silent in Spanish.",
              "data": {
                "phraseToSpeak": "Hola, buenos días",
                "phoneticGuide": "OH-lah, BWEH-nohs DEE-ahs"
              }
            }
          ]
        },
        {
          "id": "lesson-es-102",
          "unitId": "unit-es-1",
          "lessonNumber": 2,
          "title": "Introducing Yourself",
          "type": "standard",
          "xpReward": 15,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-es-5",
              "lessonId": "lesson-es-102",
              "type": "WORD_ORDER",
              "prompt": "Arrange the words to form: \"My name is Carlos\"",
              "instruction": "Tap the words in the correct order",
              "order": 1,
              "explanation": "In Spanish, \"Me llamo Carlos\" literally translates to \"I call myself Carlos\".",
              "data": {
                "sourcePrompt": "My name is Carlos",
                "wordBank": [
                  "Me",
                  "llamo",
                  "Carlos",
                  "tú",
                  "es",
                  "nombre"
                ],
                "correctOrder": [
                  "Me",
                  "llamo",
                  "Carlos"
                ]
              }
            },
            {
              "id": "ex-es-6",
              "lessonId": "lesson-es-102",
              "type": "FILL_IN_THE_BLANK",
              "prompt": "Complete the sentence with the correct verb:",
              "instruction": "Select the missing word",
              "order": 2,
              "explanation": "The subject pronoun \"Yo\" matches the verb form \"soy\" (I am).",
              "data": {
                "sentenceWithBlank": "Yo ___ de Madrid.",
                "options": [
                  "soy",
                  "eres",
                  "es",
                  "somos"
                ],
                "acceptableAnswers": [
                  "soy"
                ]
              }
            },
            {
              "id": "ex-es-7",
              "lessonId": "lesson-es-102",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Listen to the audio and select what the speaker says:",
              "instruction": "Listen carefully and select the spoken phrase",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/greeting_es.mp3",
              "order": 3,
              "explanation": "The speaker introduces herself: \"Mucho gusto, me llamo Elena\".",
              "data": {
                "transcript": "Mucho gusto, me llamo Elena",
                "correctOptionId": "opt-aud-es-1",
                "options": [
                  {
                    "id": "opt-aud-es-1",
                    "text": "Mucho gusto, me llamo Elena"
                  },
                  {
                    "id": "opt-aud-es-2",
                    "text": "Buenas noches, adiós"
                  },
                  {
                    "id": "opt-aud-es-3",
                    "text": "¿Dónde está el baño?"
                  },
                  {
                    "id": "opt-aud-es-4",
                    "text": "Por favor, una mesa"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-es-103",
          "unitId": "unit-es-1",
          "lessonNumber": 3,
          "title": "Unit 1 Checkpoint: Conversational Basics",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 3,
          "status": "published",
          "exercises": [
            {
              "id": "ex-es-8",
              "lessonId": "lesson-es-103",
              "type": "TRUE_FALSE",
              "prompt": "Read the statement and determine if it is True or False:",
              "instruction": "Verify cultural accuracy",
              "order": 1,
              "explanation": "\"Mucho gusto\" means \"Nice to meet you\" and is universally polite across all Spanish-speaking countries.",
              "data": {
                "statement": "\"Mucho gusto\" is the standard Spanish phrase for \"Nice to meet you\".",
                "isTrue": true
              }
            },
            {
              "id": "ex-es-9",
              "lessonId": "lesson-es-103",
              "type": "TRANSLATION",
              "prompt": "Translate to Spanish: \"Nice to meet you, I am David\"",
              "instruction": "Type your answer in Spanish",
              "order": 2,
              "explanation": "\"Mucho gusto, soy David\" or \"Mucho gusto, yo soy David\".",
              "data": {
                "acceptableAnswers": [
                  "Mucho gusto, soy David",
                  "Mucho gusto, yo soy David",
                  "Mucho gusto soy David",
                  "Encantado, soy David"
                ]
              }
            },
            {
              "id": "ex-es-c1-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Say a polite morning greeting and pleasure to meet someone:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 3,
              "explanation": "\"Mucho gusto, buenos días\" smoothly combines personal introduction with morning etiquette.",
              "data": {
                "phraseToSpeak": "¡Mucho gusto, buenos días!",
                "phoneticGuide": "MOO-choh GOOS-toh, BWEH-nohs DEE-ahs"
              },
              "lessonId": "lesson-es-103"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-es-2",
      "courseId": "course-es-en",
      "unitNumber": 2,
      "title": "Unit 2: At The Café & Ordering",
      "description": "Order food and drinks, ask for the bill, and learn numbers.",
      "themeColor": "#1CB0F6",
      "icon": "coffee",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-es-201",
          "unitId": "unit-es-2",
          "lessonNumber": 1,
          "title": "Ordering Coffee and Food",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-es-10",
              "lessonId": "lesson-es-201",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you say \"A coffee, please\"?",
              "instruction": "Select the correct phrase",
              "order": 1,
              "explanation": "\"Un café, por favor\" is the standard way to order coffee politely.",
              "data": {
                "correctOptionId": "opt-es-c1",
                "options": [
                  {
                    "id": "opt-es-c1",
                    "text": "Un café, por favor"
                  },
                  {
                    "id": "opt-es-c2",
                    "text": "Un pan con leche"
                  },
                  {
                    "id": "opt-es-c3",
                    "text": "La cuenta grande"
                  },
                  {
                    "id": "opt-es-c4",
                    "text": "Muchas gracias mesa"
                  }
                ]
              }
            },
            {
              "id": "ex-es-11",
              "lessonId": "lesson-es-201",
              "type": "WORD_ORDER",
              "prompt": "Construct: \"The check, please\"",
              "instruction": "Order the words properly",
              "order": 2,
              "explanation": "\"La cuenta, por favor\" is how you ask for the check/bill.",
              "data": {
                "sourcePrompt": "The check, please",
                "wordBank": [
                  "La",
                  "cuenta,",
                  "por",
                  "favor",
                  "el",
                  "agua"
                ],
                "correctOrder": [
                  "La",
                  "cuenta,",
                  "por",
                  "favor"
                ]
              }
            },
            {
              "id": "ex-es-12",
              "lessonId": "lesson-es-201",
              "type": "MATCHING_PAIRS",
              "prompt": "Match café items with English:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Essential food and beverage vocabulary.",
              "data": {
                "pairs": [
                  {
                    "id": "esp1",
                    "leftText": "El café",
                    "rightText": "The coffee"
                  },
                  {
                    "id": "esp2",
                    "leftText": "El agua",
                    "rightText": "The water"
                  },
                  {
                    "id": "esp3",
                    "leftText": "El té",
                    "rightText": "The tea"
                  },
                  {
                    "id": "esp4",
                    "leftText": "La cuenta",
                    "rightText": "The bill / check"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-es-202",
          "unitId": "unit-es-2",
          "lessonNumber": 2,
          "title": "Unit 2 Checkpoint: Café Mastery",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-es-13",
              "lessonId": "lesson-es-202",
              "type": "TRANSLATION",
              "prompt": "Translate to Spanish: \"Two coffees, please\"",
              "instruction": "Type your answer in Spanish",
              "order": 1,
              "explanation": "\"Dos cafés, por favor\". Remember the accent on \"cafés\".",
              "data": {
                "acceptableAnswers": [
                  "Dos cafés, por favor",
                  "Dos cafes, por favor",
                  "Dos cafés por favor",
                  "dos cafes por favor"
                ]
              }
            },
            {
              "id": "ex-es-c2-listen",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Escucha al mesero y selecciona la pregunta que hace:",
              "instruction": "Listen carefully and select the spoken question",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/es_cafe_order.mp3",
              "order": 2,
              "explanation": "El camarero pregunta si los comensales quieren bebidas adicionales.",
              "data": {
                "audioUrl": "https://actions.google.com/sounds/v1/speech/es_cafe_order.mp3",
                "transcript": "¿Desea algo más de tomar?",
                "correctOptionId": "opt-es-c2-1",
                "options": [
                  {
                    "id": "opt-es-c2-1",
                    "text": "¿Desea algo más de tomar?"
                  },
                  {
                    "id": "opt-es-c2-2",
                    "text": "¿Dónde está el baño?"
                  },
                  {
                    "id": "opt-es-c2-3",
                    "text": "¿A qué hora cierran?"
                  },
                  {
                    "id": "opt-es-c2-4",
                    "text": "¿Cuánto cuesta esto?"
                  }
                ]
              },
              "lessonId": "lesson-es-202"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-es-3",
      "courseId": "course-es-en",
      "unitNumber": 3,
      "title": "Unit 3: Navigating the City",
      "description": "Ask for directions, find landmarks, and use public transportation.",
      "themeColor": "#FF9600",
      "icon": "map-pin",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-es-301",
          "unitId": "unit-es-3",
          "lessonNumber": 1,
          "title": "Asking for Directions",
          "type": "standard",
          "xpReward": 20,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-es-14",
              "lessonId": "lesson-es-301",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you ask \"Where is the station?\" in Spanish?",
              "instruction": "Choose the correct question",
              "order": 1,
              "explanation": "\"¿Dónde está la estación?\" uses \"está\" for physical location.",
              "data": {
                "correctOptionId": "opt-dir-es-1",
                "options": [
                  {
                    "id": "opt-dir-es-1",
                    "text": "¿Dónde está la estación?"
                  },
                  {
                    "id": "opt-dir-es-2",
                    "text": "¿Quién es la estación?"
                  },
                  {
                    "id": "opt-dir-es-3",
                    "text": "¿Cuándo es la estación?"
                  },
                  {
                    "id": "opt-dir-es-4",
                    "text": "¿Por qué la estación?"
                  }
                ]
              }
            },
            {
              "id": "ex-es-15",
              "lessonId": "lesson-es-301",
              "type": "MATCHING_PAIRS",
              "prompt": "Match direction phrases:",
              "instruction": "Connect Spanish directions to English",
              "order": 2,
              "explanation": "Fundamental navigational directions in Spanish.",
              "data": {
                "pairs": [
                  {
                    "id": "dp-es-1",
                    "leftText": "A la izquierda",
                    "rightText": "To the left"
                  },
                  {
                    "id": "dp-es-2",
                    "leftText": "A la derecha",
                    "rightText": "To the right"
                  },
                  {
                    "id": "dp-es-3",
                    "leftText": "Todo recto",
                    "rightText": "Straight ahead"
                  },
                  {
                    "id": "dp-es-4",
                    "leftText": "Cerca",
                    "rightText": "Near / close"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-es-302",
          "unitId": "unit-es-3",
          "lessonNumber": 2,
          "title": "Unit 3 Checkpoint: City Mastery",
          "type": "checkpoint",
          "xpReward": 30,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-es-16",
              "lessonId": "lesson-es-302",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Disculpe, ¿dónde está el hotel?\"",
              "instruction": "Type your answer in English",
              "order": 1,
              "explanation": "\"Excuse me, where is the hotel?\" is the correct translation.",
              "data": {
                "acceptableAnswers": [
                  "Excuse me, where is the hotel?",
                  "Excuse me, where is the hotel",
                  "Pardon me, where is the hotel?"
                ]
              }
            },
            {
              "id": "ex-es-c3-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Pide direcciones hacia la estación de tren en voz alta:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 2,
              "explanation": "Frase imprescindible para desplazarse y pedir indicaciones urbanas.",
              "data": {
                "phraseToSpeak": "¿Dónde está la estación de tren?",
                "phoneticGuide": "DOHN-deh ehs-TAH lah ehs-tah-SYOHN deh trehn"
              },
              "lessonId": "lesson-es-302"
            }
          ]
        }
      ]
    }
  ]
};
