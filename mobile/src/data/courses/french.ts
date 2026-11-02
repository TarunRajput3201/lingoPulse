import type { StaticCourse } from '../staticCurriculum';

export const FRENCH_COURSE: StaticCourse = {
  "_id": "course-fr-en",
  "id": "course-fr-en",
  "code": "fr-en",
  "title": "French Academy",
  "description": "Master practical, everyday French with authentic pronunciation, dialogues, and cultural fluency.",
  "fromLanguage": "en",
  "toLanguage": "fr",
  "flagIcon": "🇫🇷",
  "level": "A1–A2",
  "status": "published",
  "order": 3,
  "totalUnits": 3,
  "totalLessons": 7,
  "units": [
    {
      "id": "unit-fr-1",
      "courseId": "course-fr-en",
      "unitNumber": 1,
      "title": "Unit 1: First Steps & Greetings",
      "description": "Say hello, introduce yourself, and learn essential French politeness phrases.",
      "themeColor": "#58CC02",
      "icon": "sparkles",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-fr-101",
          "unitId": "unit-fr-1",
          "lessonNumber": 1,
          "title": "Saying Hello in French",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-fr-1",
              "lessonId": "lesson-fr-101",
              "type": "MULTIPLE_CHOICE",
              "prompt": "Select the French word for \"Hello\":",
              "instruction": "Choose the correct greeting option",
              "order": 1,
              "explanation": "\"Bonjour\" is the universal French greeting used throughout the daytime.",
              "data": {
                "correctOptionId": "opt-fr-1",
                "options": [
                  {
                    "id": "opt-fr-1",
                    "text": "Bonjour",
                    "translation": "Hello"
                  },
                  {
                    "id": "opt-fr-2",
                    "text": "Au revoir",
                    "translation": "Goodbye"
                  },
                  {
                    "id": "opt-fr-3",
                    "text": "S'il vous plaît",
                    "translation": "Please"
                  },
                  {
                    "id": "opt-fr-4",
                    "text": "Merci",
                    "translation": "Thank you"
                  }
                ]
              }
            },
            {
              "id": "ex-fr-2",
              "lessonId": "lesson-fr-101",
              "type": "TRANSLATION",
              "prompt": "Translate to French: \"Thank you very much\"",
              "instruction": "Type your answer in French",
              "order": 2,
              "explanation": "\"Merci beaucoup\" is the polite standard way to express deep gratitude.",
              "data": {
                "acceptableAnswers": [
                  "Merci beaucoup",
                  "merci beaucoup",
                  "Merci beaucoup !"
                ]
              }
            },
            {
              "id": "ex-fr-3",
              "lessonId": "lesson-fr-101",
              "type": "MATCHING_PAIRS",
              "prompt": "Match French greetings with their English meanings:",
              "instruction": "Tap matching pairs to connect them",
              "order": 3,
              "explanation": "Essential French conversational markers.",
              "data": {
                "pairs": [
                  {
                    "id": "fr-p1",
                    "leftText": "Bonjour",
                    "rightText": "Hello / Good morning"
                  },
                  {
                    "id": "fr-p2",
                    "leftText": "Bonsoir",
                    "rightText": "Good evening"
                  },
                  {
                    "id": "fr-p3",
                    "leftText": "Au revoir",
                    "rightText": "Goodbye"
                  },
                  {
                    "id": "fr-p4",
                    "leftText": "À bientôt",
                    "rightText": "See you soon"
                  }
                ]
              }
            },
            {
              "id": "ex-fr-4",
              "lessonId": "lesson-fr-101",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Speak this phrase out loud in French:",
              "instruction": "Practice clear nasal vowel pronunciation",
              "order": 4,
              "explanation": "Remember that the \"j\" is soft (/ʒ/) and \"our\" is pronounced /uʁ/.",
              "data": {
                "phraseToSpeak": "Bonjour, merci beaucoup",
                "phoneticGuide": "bohn-ZHOOR, mehr-SEE boh-KOO"
              }
            }
          ]
        },
        {
          "id": "lesson-fr-102",
          "unitId": "unit-fr-1",
          "lessonNumber": 2,
          "title": "Introducing Yourself",
          "type": "standard",
          "xpReward": 15,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-fr-5",
              "lessonId": "lesson-fr-102",
              "type": "WORD_ORDER",
              "prompt": "Arrange the words to form: \"My name is Marie\"",
              "instruction": "Tap words in the correct sequence",
              "order": 1,
              "explanation": "In French, \"Je m'appelle Marie\" means \"I call myself Marie\".",
              "data": {
                "sourcePrompt": "My name is Marie",
                "wordBank": [
                  "Je",
                  "m'appelle",
                  "Marie",
                  "suis",
                  "tu",
                  "nom"
                ],
                "correctOrder": [
                  "Je",
                  "m'appelle",
                  "Marie"
                ]
              }
            },
            {
              "id": "ex-fr-6",
              "lessonId": "lesson-fr-102",
              "type": "FILL_IN_THE_BLANK",
              "prompt": "Complete the sentence with the correct form of \"être\":",
              "instruction": "Select the missing verb",
              "order": 2,
              "explanation": "\"Je suis\" is the first-person singular present form of \"être\" (to be).",
              "data": {
                "sentenceWithBlank": "Je ___ de Paris.",
                "options": [
                  "suis",
                  "es",
                  "est",
                  "sommes"
                ],
                "acceptableAnswers": [
                  "suis"
                ]
              }
            },
            {
              "id": "ex-fr-7",
              "lessonId": "lesson-fr-102",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Listen to the audio and select what the speaker says:",
              "instruction": "Listen carefully and select the spoken phrase",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/greeting_fr.mp3",
              "order": 3,
              "explanation": "The speaker politely introduces: \"Enchanté, je m'appelle Pierre\".",
              "data": {
                "transcript": "Enchanté, je m'appelle Pierre",
                "correctOptionId": "opt-aud-fr-1",
                "options": [
                  {
                    "id": "opt-aud-fr-1",
                    "text": "Enchanté, je m'appelle Pierre"
                  },
                  {
                    "id": "opt-aud-fr-2",
                    "text": "Au revoir, bonne nuit"
                  },
                  {
                    "id": "opt-aud-fr-3",
                    "text": "Où est la gare ?"
                  },
                  {
                    "id": "opt-aud-fr-4",
                    "text": "Un café s'il vous plaît"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-fr-103",
          "unitId": "unit-fr-1",
          "lessonNumber": 3,
          "title": "Unit 1 Checkpoint: French Politeness",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 3,
          "status": "published",
          "exercises": [
            {
              "id": "ex-fr-8",
              "lessonId": "lesson-fr-103",
              "type": "TRUE_FALSE",
              "prompt": "Read the statement and determine if it is True or False:",
              "instruction": "Verify cultural etiquette",
              "order": 1,
              "explanation": "In France, saying \"Bonjour\" upon entering any shop, bakery, or café is considered essential social politeness.",
              "data": {
                "statement": "In France, it is customary and polite to say \"Bonjour\" when entering a shop.",
                "isTrue": true
              }
            },
            {
              "id": "ex-fr-9",
              "lessonId": "lesson-fr-103",
              "type": "TRANSLATION",
              "prompt": "Translate to French: \"Pleased to meet you, I am Thomas\"",
              "instruction": "Type your answer in French",
              "order": 2,
              "explanation": "\"Enchanté, je suis Thomas\".",
              "data": {
                "acceptableAnswers": [
                  "Enchanté, je suis Thomas",
                  "Enchante, je suis Thomas",
                  "Enchanté, je m'appelle Thomas"
                ]
              }
            },
            {
              "id": "ex-fr-c1-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Prononcez cette salutation polie :",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 3,
              "explanation": "\"Enchanté, bonne journée !\" exprime la courtoisie fondamentale française.",
              "data": {
                "phraseToSpeak": "Enchanté, bonne journée !",
                "phoneticGuide": "ahn-shahn-TAY, bun zhoor-NAY"
              },
              "lessonId": "lesson-fr-103"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-fr-2",
      "courseId": "course-fr-en",
      "unitNumber": 2,
      "title": "Unit 2: At The Café & Ordering",
      "description": "Order beverages and croissants, ask for the check, and count to ten.",
      "themeColor": "#1CB0F6",
      "icon": "coffee",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-fr-201",
          "unitId": "unit-fr-2",
          "lessonNumber": 1,
          "title": "Ordering at a Café",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-fr-10",
              "lessonId": "lesson-fr-201",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you say \"A coffee, please\"?",
              "instruction": "Select the correct polite formula",
              "order": 1,
              "explanation": "\"Un café, s'il vous plaît\" is the standard polite order formula.",
              "data": {
                "correctOptionId": "opt-fr-c1",
                "options": [
                  {
                    "id": "opt-fr-c1",
                    "text": "Un café, s'il vous plaît."
                  },
                  {
                    "id": "opt-fr-c2",
                    "text": "Donne-moi café."
                  },
                  {
                    "id": "opt-fr-c3",
                    "text": "La table mange."
                  },
                  {
                    "id": "opt-fr-c4",
                    "text": "Pain avec eau."
                  }
                ]
              }
            },
            {
              "id": "ex-fr-11",
              "lessonId": "lesson-fr-201",
              "type": "WORD_ORDER",
              "prompt": "Form the sentence: \"The check, please\"",
              "instruction": "Order the words properly",
              "order": 2,
              "explanation": "\"L'addition, s'il vous plaît\" is the polite way to ask for the bill.",
              "data": {
                "sourcePrompt": "The check, please",
                "wordBank": [
                  "L'addition,",
                  "s'il",
                  "vous",
                  "plaît",
                  "le",
                  "pain"
                ],
                "correctOrder": [
                  "L'addition,",
                  "s'il",
                  "vous",
                  "plaît"
                ]
              }
            },
            {
              "id": "ex-fr-12",
              "lessonId": "lesson-fr-201",
              "type": "MATCHING_PAIRS",
              "prompt": "Match French café vocabulary with English:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Essential French culinary vocabulary.",
              "data": {
                "pairs": [
                  {
                    "id": "fr-cp1",
                    "leftText": "Le café",
                    "rightText": "The coffee"
                  },
                  {
                    "id": "fr-cp2",
                    "leftText": "L'eau",
                    "rightText": "The water"
                  },
                  {
                    "id": "fr-cp3",
                    "leftText": "Le croissant",
                    "rightText": "The croissant"
                  },
                  {
                    "id": "fr-cp4",
                    "leftText": "L'addition",
                    "rightText": "The check / bill"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-fr-202",
          "unitId": "unit-fr-2",
          "lessonNumber": 2,
          "title": "Unit 2 Checkpoint: Café Mastery",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-fr-13",
              "lessonId": "lesson-fr-202",
              "type": "TRANSLATION",
              "prompt": "Translate to French: \"A croissant and a coffee, please\"",
              "instruction": "Type your answer in French",
              "order": 1,
              "explanation": "\"Un croissant et un café, s'il vous plaît\".",
              "data": {
                "acceptableAnswers": [
                  "Un croissant et un café, s'il vous plaît",
                  "Un croissant et un cafe, s'il vous plait",
                  "Un croissant et un café s'il vous plaît"
                ]
              }
            },
            {
              "id": "ex-fr-c2-listen",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Écoutez le serveur au café et choisissez sa question :",
              "instruction": "Listen carefully and select the spoken question",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/fr_cafe_order.mp3",
              "order": 2,
              "explanation": "Formule rituelle des bistrots et boulangeries françaises pour finaliser une commande.",
              "data": {
                "audioUrl": "https://actions.google.com/sounds/v1/speech/fr_cafe_order.mp3",
                "transcript": "Et avec ceci, ce sera tout ?",
                "correctOptionId": "opt-fr-c2-1",
                "options": [
                  {
                    "id": "opt-fr-c2-1",
                    "text": "Et avec ceci, ce sera tout ?"
                  },
                  {
                    "id": "opt-fr-c2-2",
                    "text": "Où sont les toilettes ?"
                  },
                  {
                    "id": "opt-fr-c2-3",
                    "text": "Combien coûte le café ?"
                  },
                  {
                    "id": "opt-fr-c2-4",
                    "text": "Prenez-vous la carte bancaire ?"
                  }
                ]
              },
              "lessonId": "lesson-fr-202"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-fr-3",
      "courseId": "course-fr-en",
      "unitNumber": 3,
      "title": "Unit 3: Navigating Paris & Directions",
      "description": "Ask where places are, understand directions, and ride the metro.",
      "themeColor": "#FF9600",
      "icon": "map-pin",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-fr-301",
          "unitId": "unit-fr-3",
          "lessonNumber": 1,
          "title": "Asking for Directions",
          "type": "standard",
          "xpReward": 20,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-fr-14",
              "lessonId": "lesson-fr-301",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you ask \"Where is the station?\" in French?",
              "instruction": "Select the correct question",
              "order": 1,
              "explanation": "\"Où est la gare ?\" is the standard question formula for train stations.",
              "data": {
                "correctOptionId": "opt-dir-fr-1",
                "options": [
                  {
                    "id": "opt-dir-fr-1",
                    "text": "Où est la gare ?"
                  },
                  {
                    "id": "opt-dir-fr-2",
                    "text": "Quand est la gare ?"
                  },
                  {
                    "id": "opt-dir-fr-3",
                    "text": "Qui est la gare ?"
                  },
                  {
                    "id": "opt-dir-fr-4",
                    "text": "Pourquoi la gare ?"
                  }
                ]
              }
            },
            {
              "id": "ex-fr-15",
              "lessonId": "lesson-fr-301",
              "type": "MATCHING_PAIRS",
              "prompt": "Match French directions to English:",
              "instruction": "Connect spatial directions",
              "order": 2,
              "explanation": "Fundamental directions for navigating French cities.",
              "data": {
                "pairs": [
                  {
                    "id": "fr-dp1",
                    "leftText": "À gauche",
                    "rightText": "To the left"
                  },
                  {
                    "id": "fr-dp2",
                    "leftText": "À droite",
                    "rightText": "To the right"
                  },
                  {
                    "id": "fr-dp3",
                    "leftText": "Tout droit",
                    "rightText": "Straight ahead"
                  },
                  {
                    "id": "fr-dp4",
                    "leftText": "Près d'ici",
                    "rightText": "Near here"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-fr-302",
          "unitId": "unit-fr-3",
          "lessonNumber": 2,
          "title": "Unit 3 Checkpoint: City Navigation Mastery",
          "type": "checkpoint",
          "xpReward": 30,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-fr-16",
              "lessonId": "lesson-fr-302",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Excusez-moi, où est le métro ?\"",
              "instruction": "Type your answer in English",
              "order": 1,
              "explanation": "\"Excuse me, where is the metro / subway?\" is the correct translation.",
              "data": {
                "acceptableAnswers": [
                  "Excuse me, where is the metro?",
                  "Excuse me, where is the subway?",
                  "Excuse me, where is the metro",
                  "Pardon me, where is the metro?"
                ]
              }
            },
            {
              "id": "ex-fr-c3-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Demandez votre chemin vers la station de métro :",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 2,
              "explanation": "Tournure élégante et indispensable pour s'orienter dans le réseau parisien.",
              "data": {
                "phraseToSpeak": "Où se trouve la station de métro, s'il vous plaît ?",
                "phoneticGuide": "oo suh TROOV lah stah-SYOHN duh may-TROH, seel voo pleh"
              },
              "lessonId": "lesson-fr-302"
            }
          ]
        }
      ]
    }
  ]
};
