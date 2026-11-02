import type { StaticCourse } from '../staticCurriculum';

export const PORTUGUESE_COURSE: StaticCourse = {
  "_id": "course-pt-en",
  "id": "course-pt-en",
  "code": "pt-en",
  "title": "Portuguese Academy",
  "description": "Learn Brazilian Portuguese with European variations: melodic cadence, nasal vowels, and vibrant everyday communication.",
  "fromLanguage": "en",
  "toLanguage": "pt",
  "flagIcon": "🇧🇷",
  "level": "A1–A2",
  "status": "published",
  "order": 9,
  "totalUnits": 3,
  "totalLessons": 7,
  "units": [
    {
      "id": "unit-pt-1",
      "courseId": "course-pt-en",
      "unitNumber": 1,
      "title": "Unit 1: First Steps & Greetings (Primeiros Passos)",
      "description": "Master Brazilian greetings, self-introductions, and basic polite expressions.",
      "themeColor": "#58CC02",
      "icon": "sparkles",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-pt-101",
          "unitId": "unit-pt-1",
          "lessonNumber": 1,
          "title": "Saying Hello in Portuguese",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-pt-1",
              "lessonId": "lesson-pt-101",
              "type": "MULTIPLE_CHOICE",
              "prompt": "Select the Portuguese word for \"Hello / Hi\":",
              "instruction": "Choose the correct greeting option",
              "order": 1,
              "explanation": "\"Olá\" or \"Oi\" (very common in Brazil) is the universal greeting in Portuguese.",
              "data": {
                "correctOptionId": "opt-pt-1",
                "options": [
                  {
                    "id": "opt-pt-1",
                    "text": "Olá / Oi",
                    "translation": "Hello / Hi"
                  },
                  {
                    "id": "opt-pt-2",
                    "text": "Tchau",
                    "translation": "Bye"
                  },
                  {
                    "id": "opt-pt-3",
                    "text": "Por favor",
                    "translation": "Please"
                  },
                  {
                    "id": "opt-pt-4",
                    "text": "Obrigado",
                    "translation": "Thank you"
                  }
                ]
              }
            },
            {
              "id": "ex-pt-2",
              "lessonId": "lesson-pt-101",
              "type": "TRANSLATION",
              "prompt": "Translate to Portuguese: \"Good morning\"",
              "instruction": "Type your answer in Portuguese",
              "order": 2,
              "explanation": "\"Bom dia\" is the standard morning greeting in Portuguese.",
              "data": {
                "acceptableAnswers": [
                  "Bom dia",
                  "bom dia",
                  "Bom dia!"
                ]
              }
            },
            {
              "id": "ex-pt-3",
              "lessonId": "lesson-pt-101",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Portuguese greetings with their English meanings:",
              "instruction": "Tap matching pairs to connect them",
              "order": 3,
              "explanation": "Essential Portuguese greetings.",
              "data": {
                "pairs": [
                  {
                    "id": "pt-p1",
                    "leftText": "Olá",
                    "rightText": "Hello"
                  },
                  {
                    "id": "pt-p2",
                    "leftText": "Boa tarde",
                    "rightText": "Good afternoon"
                  },
                  {
                    "id": "pt-p3",
                    "leftText": "Boa noite",
                    "rightText": "Good evening / night"
                  },
                  {
                    "id": "pt-p4",
                    "leftText": "Tchau",
                    "rightText": "Bye"
                  }
                ]
              }
            },
            {
              "id": "ex-pt-4",
              "lessonId": "lesson-pt-101",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Speak this phrase out loud in Portuguese:",
              "instruction": "Pronounce the nasal vowel in \"Bom\" without closing your lips completely",
              "order": 4,
              "explanation": "In \"Bom dia\", the \"m\" nasalizes the preceding vowel /bõ dʒi.ɐ/ in Brazilian Portuguese.",
              "data": {
                "phraseToSpeak": "Bom dia, muito obrigado",
                "phoneticGuide": "bohm JEE-ah, MOO-ee-too oh-bree-GAH-doo"
              }
            }
          ]
        },
        {
          "id": "lesson-pt-102",
          "unitId": "unit-pt-1",
          "lessonNumber": 2,
          "title": "Introducing Yourself & \"Me Chamo\"",
          "type": "standard",
          "xpReward": 15,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-pt-5",
              "lessonId": "lesson-pt-102",
              "type": "WORD_ORDER",
              "prompt": "Form the sentence: \"My name is Lucas\" (Eu me chamo Lucas)",
              "instruction": "Tap words in the correct order",
              "order": 1,
              "explanation": "In Brazilian Portuguese, \"Eu me chamo Lucas\" or \"Meu nome é Lucas\" is standard.",
              "data": {
                "sourcePrompt": "My name is Lucas",
                "wordBank": [
                  "Eu",
                  "me",
                  "chamo",
                  "Lucas",
                  "você",
                  "nome"
                ],
                "correctOrder": [
                  "Eu",
                  "me",
                  "chamo",
                  "Lucas"
                ]
              }
            },
            {
              "id": "ex-pt-6",
              "lessonId": "lesson-pt-102",
              "type": "FILL_IN_THE_BLANK",
              "prompt": "Complete the sentence with the correct form of \"ser\" (to be):",
              "instruction": "Select the missing verb",
              "order": 2,
              "explanation": "\"Eu sou\" is the first-person singular present form of \"ser\".",
              "data": {
                "sentenceWithBlank": "Eu ___ do Brasil.",
                "options": [
                  "sou",
                  "é",
                  "somos",
                  "estou"
                ],
                "acceptableAnswers": [
                  "sou"
                ]
              }
            },
            {
              "id": "ex-pt-7",
              "lessonId": "lesson-pt-102",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Listen to the audio and select what the speaker says:",
              "instruction": "Listen carefully and select the spoken phrase",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/greeting_pt.mp3",
              "order": 3,
              "explanation": "The speaker introduces: \"Muito prazer, sou a Beatriz\" (Nice to meet you, I am Beatriz).",
              "data": {
                "transcript": "Muito prazer, sou a Beatriz",
                "correctOptionId": "opt-aud-pt-1",
                "options": [
                  {
                    "id": "opt-aud-pt-1",
                    "text": "Muito prazer, sou a Beatriz"
                  },
                  {
                    "id": "opt-aud-pt-2",
                    "text": "Boa noite, até amanhã"
                  },
                  {
                    "id": "opt-aud-pt-3",
                    "text": "Onde fica o hotel?"
                  },
                  {
                    "id": "opt-aud-pt-4",
                    "text": "Um café por favor"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-pt-103",
          "unitId": "unit-pt-1",
          "lessonNumber": 3,
          "title": "Unit 1 Checkpoint: Portuguese Greetings",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 3,
          "status": "published",
          "exercises": [
            {
              "id": "ex-pt-8",
              "lessonId": "lesson-pt-103",
              "type": "TRUE_FALSE",
              "prompt": "Read the statement and determine if it is True or False:",
              "instruction": "Verify gender agreement in Portuguese politeness",
              "order": 1,
              "explanation": "In Portuguese, men say \"Obrigado\" and women say \"Obrigada\" to say thank you.",
              "data": {
                "statement": "In Portuguese, female speakers say \"Obrigada\" to express thanks.",
                "isTrue": true
              }
            },
            {
              "id": "ex-pt-9",
              "lessonId": "lesson-pt-103",
              "type": "TRANSLATION",
              "prompt": "Translate to Portuguese: \"Nice to meet you, I am Pedro\"",
              "instruction": "Type your answer in Portuguese",
              "order": 2,
              "explanation": "\"Muito prazer, sou o Pedro\" or \"Muito prazer, sou Pedro\".",
              "data": {
                "acceptableAnswers": [
                  "Muito prazer, sou o Pedro",
                  "Muito prazer, sou Pedro",
                  "Prazer, sou Pedro",
                  "Muito prazer, eu sou Pedro"
                ]
              }
            },
            {
              "id": "ex-pt-c1-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Pronuncie esta saudação cordial em português:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 3,
              "explanation": "\"Muito prazer, tenha um bom dia!\" expressa simpatia natural e educação.",
              "data": {
                "phraseToSpeak": "Muito prazer, tenha um bom dia!",
                "phoneticGuide": "MOOY-too prah-ZAIR, TENG-yah oom bohm JEE-ah"
              },
              "lessonId": "lesson-pt-103"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-pt-2",
      "courseId": "course-pt-en",
      "unitNumber": 2,
      "title": "Unit 2: No Restaurante & Ordering (Um Café Por Favor)",
      "description": "Order coffee, pão de queijo, ask for the check, and learn dining culture.",
      "themeColor": "#1CB0F6",
      "icon": "coffee",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-pt-201",
          "unitId": "unit-pt-2",
          "lessonNumber": 1,
          "title": "Ordering at a Restaurant",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-pt-10",
              "lessonId": "lesson-pt-201",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you say \"A coffee, please\" in Portuguese?",
              "instruction": "Select the correct phrase",
              "order": 1,
              "explanation": "\"Um café, por favor\" is the polite standard request.",
              "data": {
                "correctOptionId": "opt-pt-c1",
                "options": [
                  {
                    "id": "opt-pt-c1",
                    "text": "Um café, por favor."
                  },
                  {
                    "id": "opt-pt-c2",
                    "text": "Dá café agora."
                  },
                  {
                    "id": "opt-pt-c3",
                    "text": "A mesa come."
                  },
                  {
                    "id": "opt-pt-c4",
                    "text": "Pão com água."
                  }
                ]
              }
            },
            {
              "id": "ex-pt-11",
              "lessonId": "lesson-pt-201",
              "type": "WORD_ORDER",
              "prompt": "Construct: \"The check, please\" (A conta, por favor)",
              "instruction": "Order the words properly",
              "order": 2,
              "explanation": "\"A conta, por favor\" is how you ask for the check.",
              "data": {
                "sourcePrompt": "The check, please",
                "wordBank": [
                  "A",
                  "conta,",
                  "por",
                  "favor",
                  "o",
                  "café"
                ],
                "correctOrder": [
                  "A",
                  "conta,",
                  "por",
                  "favor"
                ]
              }
            },
            {
              "id": "ex-pt-12",
              "lessonId": "lesson-pt-201",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Portuguese restaurant vocabulary with English:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Essential food and beverage vocabulary in Brazil and Portugal.",
              "data": {
                "pairs": [
                  {
                    "id": "pt-cp1",
                    "leftText": "O café",
                    "rightText": "The coffee"
                  },
                  {
                    "id": "pt-cp2",
                    "leftText": "A água",
                    "rightText": "The water"
                  },
                  {
                    "id": "pt-cp3",
                    "leftText": "A conta",
                    "rightText": "The check / bill"
                  },
                  {
                    "id": "pt-cp4",
                    "leftText": "Gostoso",
                    "rightText": "Delicious / tasty"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-pt-202",
          "unitId": "unit-pt-2",
          "lessonNumber": 2,
          "title": "Unit 2 Checkpoint: Dining Mastery",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-pt-13",
              "lessonId": "lesson-pt-202",
              "type": "TRANSLATION",
              "prompt": "Translate to Portuguese: \"Two coffees and one water, please\"",
              "instruction": "Type your answer in Portuguese",
              "order": 1,
              "explanation": "\"Dois cafés e uma água, por favor\".",
              "data": {
                "acceptableAnswers": [
                  "Dois cafés e uma água, por favor",
                  "Dois cafes e uma agua, por favor",
                  "Dois cafés e uma água por favor"
                ]
              }
            },
            {
              "id": "ex-pt-c2-listen",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Ouça o atendente na padaria e escolha a pergunta correta:",
              "instruction": "Listen carefully and select the spoken question",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/pt_cafe_order.mp3",
              "order": 2,
              "explanation": "Pergunta típica em cafés e padarias: \"Deseja algo mais para acompanhar?\".",
              "data": {
                "audioUrl": "https://actions.google.com/sounds/v1/speech/pt_cafe_order.mp3",
                "transcript": "Deseja algo mais para acompanhar?",
                "correctOptionId": "opt-pt-c2-1",
                "options": [
                  {
                    "id": "opt-pt-c2-1",
                    "text": "Deseja algo mais para acompanhar?"
                  },
                  {
                    "id": "opt-pt-c2-2",
                    "text": "Onde fica o banheiro?"
                  },
                  {
                    "id": "opt-pt-c2-3",
                    "text": "Quanto custa a conta?"
                  },
                  {
                    "id": "opt-pt-c2-4",
                    "text": "Aceita cartão de crédito?"
                  }
                ]
              },
              "lessonId": "lesson-pt-202"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-pt-3",
      "courseId": "course-pt-en",
      "unitNumber": 3,
      "title": "Unit 3: Navigating the City (Onde Fica...?)",
      "description": "Ask for directions, find landmarks, and navigate public transit in Portuguese cities.",
      "themeColor": "#FF9600",
      "icon": "map-pin",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-pt-301",
          "unitId": "unit-pt-3",
          "lessonNumber": 1,
          "title": "Asking for Directions (Onde fica...?)",
          "type": "standard",
          "xpReward": 20,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-pt-14",
              "lessonId": "lesson-pt-301",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you ask \"Where is the station?\" in Portuguese?",
              "instruction": "Select the correct question",
              "order": 1,
              "explanation": "\"Onde fica a estação?\" uses \"fica\" to inquire about permanent location.",
              "data": {
                "correctOptionId": "opt-dir-pt-1",
                "options": [
                  {
                    "id": "opt-dir-pt-1",
                    "text": "Onde fica a estação?"
                  },
                  {
                    "id": "opt-dir-pt-2",
                    "text": "Quando é a estação?"
                  },
                  {
                    "id": "opt-dir-pt-3",
                    "text": "Quem é a estação?"
                  },
                  {
                    "id": "opt-dir-pt-4",
                    "text": "Por que a estação?"
                  }
                ]
              }
            },
            {
              "id": "ex-pt-15",
              "lessonId": "lesson-pt-301",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Portuguese directions to English:",
              "instruction": "Connect spatial directions",
              "order": 2,
              "explanation": "Fundamental directions for navigating Portuguese and Brazilian cities.",
              "data": {
                "pairs": [
                  {
                    "id": "pt-dp1",
                    "leftText": "À esquerda",
                    "rightText": "To the left"
                  },
                  {
                    "id": "pt-dp2",
                    "leftText": "À direita",
                    "rightText": "To the right"
                  },
                  {
                    "id": "pt-dp3",
                    "leftText": "Em frente",
                    "rightText": "Straight ahead"
                  },
                  {
                    "id": "pt-dp4",
                    "leftText": "Perto",
                    "rightText": "Near / close"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-pt-302",
          "unitId": "unit-pt-3",
          "lessonNumber": 2,
          "title": "Unit 3 Checkpoint: City Navigation Mastery",
          "type": "checkpoint",
          "xpReward": 30,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-pt-16",
              "lessonId": "lesson-pt-302",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Com licença, onde fica o hotel?\"",
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
              "id": "ex-pt-c3-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Peça informações para chegar à estação de metrô:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 2,
              "explanation": "Frase essencial para circular pelas cidades brasileiras ou portuguesas.",
              "data": {
                "phraseToSpeak": "Com licença, onde fica a estação de metrô?",
                "phoneticGuide": "kohm lee-SAYN-sah, OHN-jee FEE-kah ah ehs-tah-SOWNG jee meh-TROH"
              },
              "lessonId": "lesson-pt-302"
            }
          ]
        }
      ]
    }
  ]
};
