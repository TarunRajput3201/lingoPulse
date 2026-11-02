import type { StaticCourse } from '../staticCurriculum';

export const ENGLISH_COURSE: StaticCourse = {
  "_id": "course-en-es",
  "id": "course-en-es",
  "code": "en-es",
  "title": "English Academy",
  "description": "Master conversational English from foundational phonetics to fluent real-world dialogue.",
  "fromLanguage": "es",
  "toLanguage": "en",
  "flagIcon": "🇬🇧",
  "level": "A1–A2",
  "status": "published",
  "order": 1,
  "totalUnits": 3,
  "totalLessons": 7,
  "units": [
    {
      "id": "unit-en-1",
      "courseId": "course-en-es",
      "unitNumber": 1,
      "title": "Unit 1: First Steps & Introductions",
      "description": "Master standard greetings, self-introductions, and polite conversational phrases.",
      "themeColor": "#58CC02",
      "icon": "sparkles",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-en-101",
          "unitId": "unit-en-1",
          "lessonNumber": 1,
          "title": "Saying Hello & Goodbye",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-en-1",
              "lessonId": "lesson-en-101",
              "type": "MULTIPLE_CHOICE",
              "prompt": "Select the English translation for \"Hola\":",
              "instruction": "Choose the correct greeting option",
              "order": 1,
              "explanation": "\"Hello\" or \"Hi\" is the universal English greeting used in both formal and casual settings.",
              "data": {
                "correctOptionId": "opt-en-1",
                "options": [
                  {
                    "id": "opt-en-1",
                    "text": "Hello",
                    "translation": "Hola"
                  },
                  {
                    "id": "opt-en-2",
                    "text": "Goodbye",
                    "translation": "Adiós"
                  },
                  {
                    "id": "opt-en-3",
                    "text": "Please",
                    "translation": "Por favor"
                  },
                  {
                    "id": "opt-en-4",
                    "text": "Thank you",
                    "translation": "Gracias"
                  }
                ]
              }
            },
            {
              "id": "ex-en-2",
              "lessonId": "lesson-en-101",
              "type": "TRANSLATION",
              "prompt": "Translate to English: \"Buenos días\"",
              "instruction": "Type your answer in English",
              "order": 2,
              "explanation": "\"Good morning\" is used from sunrise until midday (12:00 PM).",
              "data": {
                "acceptableAnswers": [
                  "Good morning",
                  "Good morning!",
                  "good morning"
                ]
              }
            },
            {
              "id": "ex-en-3",
              "lessonId": "lesson-en-101",
              "type": "MATCHING_PAIRS",
              "prompt": "Match each English phrase to its Spanish translation:",
              "instruction": "Tap matching pairs to connect them",
              "order": 3,
              "explanation": "Connecting greetings with their correct conversational equivalents.",
              "data": {
                "pairs": [
                  {
                    "id": "p1",
                    "leftText": "Hello",
                    "rightText": "Hola"
                  },
                  {
                    "id": "p2",
                    "leftText": "Good night",
                    "rightText": "Buenas noches"
                  },
                  {
                    "id": "p3",
                    "leftText": "See you later",
                    "rightText": "Hasta luego"
                  },
                  {
                    "id": "p4",
                    "leftText": "Goodbye",
                    "rightText": "Adiós"
                  }
                ]
              }
            },
            {
              "id": "ex-en-4",
              "lessonId": "lesson-en-101",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Speak this phrase out loud in English:",
              "instruction": "Practice clear pronunciation",
              "order": 4,
              "explanation": "Focus on pronouncing the initial \"h\" softly without a harsh Spanish \"j\" sound.",
              "data": {
                "phraseToSpeak": "Hello, good morning!",
                "phoneticGuide": "heh-LOH, guhd MOR-ning"
              }
            }
          ]
        },
        {
          "id": "lesson-en-102",
          "unitId": "unit-en-1",
          "lessonNumber": 2,
          "title": "Introducing Yourself",
          "type": "standard",
          "xpReward": 15,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-en-5",
              "lessonId": "lesson-en-102",
              "type": "WORD_ORDER",
              "prompt": "Arrange the words in correct English order:",
              "instruction": "Tap the words to construct the sentence",
              "order": 1,
              "explanation": "English follows Subject + Verb + Complement word order: \"My name is John\".",
              "data": {
                "sourcePrompt": "Mi nombre es John",
                "wordBank": [
                  "My",
                  "name",
                  "is",
                  "John",
                  "am",
                  "are"
                ],
                "correctOrder": [
                  "My",
                  "name",
                  "is",
                  "John"
                ]
              }
            },
            {
              "id": "ex-en-6",
              "lessonId": "lesson-en-102",
              "type": "FILL_IN_THE_BLANK",
              "prompt": "Complete the sentence with the correct form of the verb \"to be\":",
              "instruction": "Select the missing verb form",
              "order": 2,
              "explanation": "The pronoun \"I\" always pairs with the first-person singular present form \"am\".",
              "data": {
                "sentenceWithBlank": "I ___ from London.",
                "options": [
                  "am",
                  "is",
                  "are",
                  "be"
                ],
                "acceptableAnswers": [
                  "am"
                ]
              }
            },
            {
              "id": "ex-en-7",
              "lessonId": "lesson-en-102",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Listen to the audio and select what the speaker says:",
              "instruction": "Listen carefully and select the spoken phrase",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/greeting_en.mp3",
              "order": 3,
              "explanation": "The speaker introduces herself: \"Nice to meet you\".",
              "data": {
                "transcript": "Nice to meet you",
                "correctOptionId": "opt-aud-1",
                "options": [
                  {
                    "id": "opt-aud-1",
                    "text": "Nice to meet you"
                  },
                  {
                    "id": "opt-aud-2",
                    "text": "Where are you from?"
                  },
                  {
                    "id": "opt-aud-3",
                    "text": "What is your name?"
                  },
                  {
                    "id": "opt-aud-4",
                    "text": "Have a good day"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-en-103",
          "unitId": "unit-en-1",
          "lessonNumber": 3,
          "title": "Unit 1 Checkpoint: Introductions Mastery",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 3,
          "status": "published",
          "exercises": [
            {
              "id": "ex-en-8",
              "lessonId": "lesson-en-103",
              "type": "TRUE_FALSE",
              "prompt": "Read the statement and decide if it is True or False:",
              "instruction": "Verify grammatical correctness",
              "order": 1,
              "explanation": "In English, \"I am 25 years old\" is correct. We use the verb \"to be\", not \"to have\" (unlike Spanish \"tengo 25 años\").",
              "data": {
                "statement": "In English, you say \"I am 20 years old\" to state your age.",
                "isTrue": true
              }
            },
            {
              "id": "ex-en-9",
              "lessonId": "lesson-en-103",
              "type": "TRANSLATION",
              "prompt": "Translate to English: \"Mucho gusto, me llamo Sarah\"",
              "instruction": "Type your answer in English",
              "order": 2,
              "explanation": "\"Nice to meet you, my name is Sarah\" is the natural English equivalent.",
              "data": {
                "acceptableAnswers": [
                  "Nice to meet you, my name is Sarah",
                  "Nice to meet you, my name is Sarah.",
                  "Pleased to meet you, my name is Sarah",
                  "Nice to meet you, I am Sarah"
                ]
              }
            },
            {
              "id": "ex-en-c1-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Introduce yourself politely in English:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 3,
              "explanation": "\"Hello, nice to meet you!\" is the quintessential polite introduction formula in English.",
              "data": {
                "phraseToSpeak": "Hello, nice to meet you!",
                "phoneticGuide": "heh-LOH, nys too MEET yoo"
              },
              "lessonId": "lesson-en-103"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-en-2",
      "courseId": "course-en-es",
      "unitNumber": 2,
      "title": "Unit 2: At The Café & Everyday Transactions",
      "description": "Order food and beverages, ask for the bill, and use polite modal requests.",
      "themeColor": "#1CB0F6",
      "icon": "coffee",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-en-201",
          "unitId": "unit-en-2",
          "lessonNumber": 1,
          "title": "Ordering Food and Drinks",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-en-10",
              "lessonId": "lesson-en-201",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you politely order a coffee in English?",
              "instruction": "Choose the most natural, polite expression",
              "order": 1,
              "explanation": "\"I would like a coffee, please\" or \"Can I have a coffee, please?\" are the standard polite formulas.",
              "data": {
                "correctOptionId": "opt-c-1",
                "options": [
                  {
                    "id": "opt-c-1",
                    "text": "I would like a coffee, please."
                  },
                  {
                    "id": "opt-c-2",
                    "text": "Give me coffee now."
                  },
                  {
                    "id": "opt-c-3",
                    "text": "I want that coffee."
                  },
                  {
                    "id": "opt-c-4",
                    "text": "Coffee is drinking."
                  }
                ]
              }
            },
            {
              "id": "ex-en-11",
              "lessonId": "lesson-en-201",
              "type": "WORD_ORDER",
              "prompt": "Form the sentence: \"Can I have the bill, please?\"",
              "instruction": "Tap words in correct order",
              "order": 2,
              "explanation": "Modal question format: Modal (Can) + Subject (I) + Verb (have) + Object (the bill) + polite marker (please).",
              "data": {
                "sourcePrompt": "¿Me puede traer la cuenta, por favor?",
                "wordBank": [
                  "Can",
                  "I",
                  "have",
                  "the",
                  "bill,",
                  "please?",
                  "give",
                  "you"
                ],
                "correctOrder": [
                  "Can",
                  "I",
                  "have",
                  "the",
                  "bill,",
                  "please?"
                ]
              }
            },
            {
              "id": "ex-en-12",
              "lessonId": "lesson-en-201",
              "type": "MATCHING_PAIRS",
              "prompt": "Match the café terms:",
              "instruction": "Pair English terms with Spanish translations",
              "order": 3,
              "explanation": "Common vocabulary for restaurant and café transactions.",
              "data": {
                "pairs": [
                  {
                    "id": "cp1",
                    "leftText": "Coffee with milk",
                    "rightText": "Café con leche"
                  },
                  {
                    "id": "cp2",
                    "leftText": "The check / bill",
                    "rightText": "La cuenta"
                  },
                  {
                    "id": "cp3",
                    "leftText": "Water",
                    "rightText": "Agua"
                  },
                  {
                    "id": "cp4",
                    "leftText": "Delicious",
                    "rightText": "Delicioso"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-en-202",
          "unitId": "unit-en-2",
          "lessonNumber": 2,
          "title": "Unit 2 Checkpoint: Café Conversation",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-en-13",
              "lessonId": "lesson-en-202",
              "type": "TRANSLATION",
              "prompt": "Translate to English: \"Una mesa para dos personas, por favor\"",
              "instruction": "Type your answer in English",
              "order": 1,
              "explanation": "\"A table for two people, please\" or \"A table for two, please\".",
              "data": {
                "acceptableAnswers": [
                  "A table for two, please",
                  "A table for two, please.",
                  "A table for two people, please",
                  "A table for two people, please."
                ]
              }
            },
            {
              "id": "ex-en-c2-listen",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Listen to the café server and select what is asked:",
              "instruction": "Listen carefully and select the spoken question",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/en_cafe_order.mp3",
              "order": 2,
              "explanation": "The server politely inquires if the customer desires additional items.",
              "data": {
                "audioUrl": "https://actions.google.com/sounds/v1/speech/en_cafe_order.mp3",
                "transcript": "Would you like anything else?",
                "correctOptionId": "opt-en-c2-1",
                "options": [
                  {
                    "id": "opt-en-c2-1",
                    "text": "Would you like anything else?"
                  },
                  {
                    "id": "opt-en-c2-2",
                    "text": "Where is the bathroom?"
                  },
                  {
                    "id": "opt-en-c2-3",
                    "text": "Can you repeat that?"
                  },
                  {
                    "id": "opt-en-c2-4",
                    "text": "What is the time?"
                  }
                ]
              },
              "lessonId": "lesson-en-202"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-en-3",
      "courseId": "course-en-es",
      "unitNumber": 3,
      "title": "Unit 3: Navigating the City",
      "description": "Ask for directions, understand public transit signs, and find your destination.",
      "themeColor": "#FF9600",
      "icon": "map-pin",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-en-301",
          "unitId": "unit-en-3",
          "lessonNumber": 1,
          "title": "Asking for Directions",
          "type": "standard",
          "xpReward": 20,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-en-14",
              "lessonId": "lesson-en-301",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you ask \"Where is the train station?\"",
              "instruction": "Select the correct question",
              "order": 1,
              "explanation": "\"Where is...\" is the standard question formula to ask for locations.",
              "data": {
                "correctOptionId": "dir-opt-1",
                "options": [
                  {
                    "id": "dir-opt-1",
                    "text": "Where is the train station?"
                  },
                  {
                    "id": "dir-opt-2",
                    "text": "When is the train station?"
                  },
                  {
                    "id": "dir-opt-3",
                    "text": "Who is the train station?"
                  },
                  {
                    "id": "dir-opt-4",
                    "text": "Why is the train station?"
                  }
                ]
              }
            },
            {
              "id": "ex-en-15",
              "lessonId": "lesson-en-301",
              "type": "MATCHING_PAIRS",
              "prompt": "Match direction phrases:",
              "instruction": "Connect English phrases to Spanish translations",
              "order": 2,
              "explanation": "Fundamental spatial terms for navigation.",
              "data": {
                "pairs": [
                  {
                    "id": "dp1",
                    "leftText": "Turn left",
                    "rightText": "Gire a la izquierda"
                  },
                  {
                    "id": "dp2",
                    "leftText": "Turn right",
                    "rightText": "Gire a la derecha"
                  },
                  {
                    "id": "dp3",
                    "leftText": "Go straight",
                    "rightText": "Siga derecho"
                  },
                  {
                    "id": "dp4",
                    "leftText": "Near here",
                    "rightText": "Cerca de aquí"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-en-302",
          "unitId": "unit-en-3",
          "lessonNumber": 2,
          "title": "Unit 3 Checkpoint: City Navigation Mastery",
          "type": "checkpoint",
          "xpReward": 30,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-en-16",
              "lessonId": "lesson-en-302",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Disculpe, ¿dónde está el hotel?\"",
              "instruction": "Type your answer in English",
              "order": 1,
              "explanation": "\"Excuse me, where is the hotel?\" is the polite standard phrasing.",
              "data": {
                "acceptableAnswers": [
                  "Excuse me, where is the hotel?",
                  "Excuse me, where is the hotel",
                  "Pardon me, where is the hotel?"
                ]
              }
            },
            {
              "id": "ex-en-c3-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Ask for the nearest subway station in spoken English:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 2,
              "explanation": "\"Where is the nearest...\" is the most natural way to locate transport hubs.",
              "data": {
                "phraseToSpeak": "Where is the nearest subway station?",
                "phoneticGuide": "wear iz the NEER-ist SUB-way STAY-shun"
              },
              "lessonId": "lesson-en-302"
            }
          ]
        }
      ]
    }
  ]
};
