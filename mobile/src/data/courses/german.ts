import type { StaticCourse } from '../staticCurriculum';

export const GERMAN_COURSE: StaticCourse = {
  "_id": "course-de-en",
  "id": "course-de-en",
  "code": "de-en",
  "title": "German Academy",
  "description": "Master German grammar and conversation: gender (der, die, das), cases (nominative, accusative), and real-world fluency.",
  "fromLanguage": "en",
  "toLanguage": "de",
  "flagIcon": "🇩🇪",
  "level": "A1–A2",
  "status": "published",
  "order": 5,
  "totalUnits": 3,
  "totalLessons": 7,
  "units": [
    {
      "id": "unit-de-1",
      "courseId": "course-de-en",
      "unitNumber": 1,
      "title": "Unit 1: First Steps & Greetings (Erste Schritte)",
      "description": "Master standard German greetings, self-introductions, and basic noun capitalization.",
      "themeColor": "#58CC02",
      "icon": "sparkles",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-de-101",
          "unitId": "unit-de-1",
          "lessonNumber": 1,
          "title": "Saying Hello in German",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-de-1",
              "lessonId": "lesson-de-101",
              "type": "MULTIPLE_CHOICE",
              "prompt": "Select the German word for \"Hello\":",
              "instruction": "Choose the correct greeting option",
              "order": 1,
              "explanation": "\"Hallo\" is the universal greeting in German used informally and warmly across the DACH region.",
              "data": {
                "correctOptionId": "opt-de-1",
                "options": [
                  {
                    "id": "opt-de-1",
                    "text": "Hallo",
                    "translation": "Hello"
                  },
                  {
                    "id": "opt-de-2",
                    "text": "Tschüss",
                    "translation": "Bye"
                  },
                  {
                    "id": "opt-de-3",
                    "text": "Bitte",
                    "translation": "Please"
                  },
                  {
                    "id": "opt-de-4",
                    "text": "Danke",
                    "translation": "Thanks"
                  }
                ]
              }
            },
            {
              "id": "ex-de-2",
              "lessonId": "lesson-de-101",
              "type": "TRANSLATION",
              "prompt": "Translate to German: \"Good morning\"",
              "instruction": "Type your answer in German (remember to capitalize nouns)",
              "order": 2,
              "explanation": "\"Guten Morgen\" is used in the morning hours until about 11:00 AM.",
              "data": {
                "acceptableAnswers": [
                  "Guten Morgen",
                  "Guten morgen",
                  "guten morgen"
                ]
              }
            },
            {
              "id": "ex-de-3",
              "lessonId": "lesson-de-101",
              "type": "MATCHING_PAIRS",
              "prompt": "Match German greetings with their English meanings:",
              "instruction": "Tap matching pairs to connect them",
              "order": 3,
              "explanation": "Essential German greetings.",
              "data": {
                "pairs": [
                  {
                    "id": "de-p1",
                    "leftText": "Hallo",
                    "rightText": "Hello"
                  },
                  {
                    "id": "de-p2",
                    "leftText": "Guten Tag",
                    "rightText": "Good day / afternoon"
                  },
                  {
                    "id": "de-p3",
                    "leftText": "Gute Nacht",
                    "rightText": "Good night"
                  },
                  {
                    "id": "de-p4",
                    "leftText": "Auf Wiedersehen",
                    "rightText": "Goodbye (formal)"
                  }
                ]
              }
            },
            {
              "id": "ex-de-4",
              "lessonId": "lesson-de-101",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Speak this phrase out loud in German:",
              "instruction": "Practice the German glottal stop and terminal devoicing",
              "order": 4,
              "explanation": "Remember that \"Guten Tag\" ends in a hard /k/ sound due to German Auslautverhärtung (terminal devoicing).",
              "data": {
                "phraseToSpeak": "Guten Tag, danke schön",
                "phoneticGuide": "GOO-ten TAHK, DAHN-kuh SHUHN"
              }
            }
          ]
        },
        {
          "id": "lesson-de-102",
          "unitId": "unit-de-1",
          "lessonNumber": 2,
          "title": "Introducing Yourself & Verb \"Heißen\"",
          "type": "standard",
          "xpReward": 15,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-de-5",
              "lessonId": "lesson-de-102",
              "type": "WORD_ORDER",
              "prompt": "Form the sentence: \"My name is Lukas\" (Ich heiße Lukas)",
              "instruction": "Tap words in the correct order",
              "order": 1,
              "explanation": "Subject (Ich) + Verb in second position (heiße) + Name (Lukas). Note the letter \"ß\" (Eszett).",
              "data": {
                "sourcePrompt": "My name is Lukas",
                "wordBank": [
                  "Ich",
                  "heiße",
                  "Lukas",
                  "du",
                  "bist",
                  "Name"
                ],
                "correctOrder": [
                  "Ich",
                  "heiße",
                  "Lukas"
                ]
              }
            },
            {
              "id": "ex-de-6",
              "lessonId": "lesson-de-102",
              "type": "FILL_IN_THE_BLANK",
              "prompt": "Complete the sentence with the correct form of the verb \"sein\" (to be):",
              "instruction": "Select the missing verb",
              "order": 2,
              "explanation": "\"Ich bin\" is the first-person singular form of \"sein\".",
              "data": {
                "sentenceWithBlank": "Ich ___ aus Berlin.",
                "options": [
                  "bin",
                  "bist",
                  "ist",
                  "sind"
                ],
                "acceptableAnswers": [
                  "bin"
                ]
              }
            },
            {
              "id": "ex-de-7",
              "lessonId": "lesson-de-102",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Listen to the audio and select what the speaker says:",
              "instruction": "Listen carefully and select the spoken phrase",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/greeting_de.mp3",
              "order": 3,
              "explanation": "The speaker introduces: \"Freut mich, ich bin Anna\" (Pleased to meet you, I am Anna).",
              "data": {
                "transcript": "Freut mich, ich bin Anna",
                "correctOptionId": "opt-aud-de-1",
                "options": [
                  {
                    "id": "opt-aud-de-1",
                    "text": "Freut mich, ich bin Anna"
                  },
                  {
                    "id": "opt-aud-de-2",
                    "text": "Auf Wiedersehen, tschüss"
                  },
                  {
                    "id": "opt-aud-de-3",
                    "text": "Wo ist der Bahnhof?"
                  },
                  {
                    "id": "opt-aud-de-4",
                    "text": "Einen Kaffee bitte"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-de-103",
          "unitId": "unit-de-1",
          "lessonNumber": 3,
          "title": "Unit 1 Checkpoint: German Basics",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 3,
          "status": "published",
          "exercises": [
            {
              "id": "ex-de-8",
              "lessonId": "lesson-de-103",
              "type": "TRUE_FALSE",
              "prompt": "Read the statement and determine if it is True or False:",
              "instruction": "Verify orthographic rules",
              "order": 1,
              "explanation": "In German, ALL nouns must be capitalized without exception (e.g. der Tag, das Buch, die Zeit).",
              "data": {
                "statement": "In German, all nouns must be capitalized.",
                "isTrue": true
              }
            },
            {
              "id": "ex-de-9",
              "lessonId": "lesson-de-103",
              "type": "TRANSLATION",
              "prompt": "Translate to German: \"Nice to meet you, I am Felix\"",
              "instruction": "Type your answer in German",
              "order": 2,
              "explanation": "\"Freut mich, ich bin Felix\" or \"Sehr erfreut, ich bin Felix\".",
              "data": {
                "acceptableAnswers": [
                  "Freut mich, ich bin Felix",
                  "Freut mich, ich heiße Felix",
                  "Sehr erfreut, ich bin Felix"
                ]
              }
            },
            {
              "id": "ex-de-c1-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Sprechen Sie diese höfliche Begrüßung aus:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 3,
              "explanation": "\"Sehr angenehm, guten Tag!\" ist eine vornehme Begrüßungsformel.",
              "data": {
                "phraseToSpeak": "Sehr angenehm, guten Tag!",
                "phoneticGuide": "zayr AHN-guh-naym, GOO-ten tahk"
              },
              "lessonId": "lesson-de-103"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-de-2",
      "courseId": "course-de-en",
      "unitNumber": 2,
      "title": "Unit 2: At The Restaurant & Accusative Case",
      "description": "Order food and beverages, ask for the bill, and learn masculine accusative \"einen\".",
      "themeColor": "#1CB0F6",
      "icon": "coffee",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-de-201",
          "unitId": "unit-de-2",
          "lessonNumber": 1,
          "title": "Ordering Food and Drinks (Der Akkusativ)",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-de-10",
              "lessonId": "lesson-de-201",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you say \"A coffee, please\" in German?",
              "instruction": "Choose the correct accusative phrase",
              "order": 1,
              "explanation": "\"Kaffee\" is masculine (der Kaffee). As a direct object, the indefinite article changes to accusative \"einen Kaffee, bitte\".",
              "data": {
                "correctOptionId": "opt-de-c1",
                "options": [
                  {
                    "id": "opt-de-c1",
                    "text": "Einen Kaffee, bitte."
                  },
                  {
                    "id": "opt-de-c2",
                    "text": "Ein Kaffee, bitte."
                  },
                  {
                    "id": "opt-de-c3",
                    "text": "Eine Kaffee, bitte."
                  },
                  {
                    "id": "opt-de-c4",
                    "text": "Das Kaffee, bitte."
                  }
                ]
              }
            },
            {
              "id": "ex-de-11",
              "lessonId": "lesson-de-201",
              "type": "WORD_ORDER",
              "prompt": "Construct: \"The bill, please\" (Die Rechnung, bitte)",
              "instruction": "Order the words properly",
              "order": 2,
              "explanation": "\"Die Rechnung, bitte\" is the standard polite request for the restaurant check.",
              "data": {
                "sourcePrompt": "The bill, please",
                "wordBank": [
                  "Die",
                  "Rechnung,",
                  "bitte",
                  "der",
                  "Kaffee",
                  "ein"
                ],
                "correctOrder": [
                  "Die",
                  "Rechnung,",
                  "bitte"
                ]
              }
            },
            {
              "id": "ex-de-12",
              "lessonId": "lesson-de-201",
              "type": "MATCHING_PAIRS",
              "prompt": "Match German restaurant items with English:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Essential German dining and drink vocabulary with gender articles.",
              "data": {
                "pairs": [
                  {
                    "id": "de-cp1",
                    "leftText": "Der Kaffee",
                    "rightText": "The coffee"
                  },
                  {
                    "id": "de-cp2",
                    "leftText": "Das Wasser",
                    "rightText": "The water"
                  },
                  {
                    "id": "de-cp3",
                    "leftText": "Die Rechnung",
                    "rightText": "The check / bill"
                  },
                  {
                    "id": "de-cp4",
                    "leftText": "Lecker",
                    "rightText": "Delicious"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-de-202",
          "unitId": "unit-de-2",
          "lessonNumber": 2,
          "title": "Unit 2 Checkpoint: Dining Mastery",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-de-13",
              "lessonId": "lesson-de-202",
              "type": "TRANSLATION",
              "prompt": "Translate to German: \"A tea and a water, please\"",
              "instruction": "Type your answer in German",
              "order": 1,
              "explanation": "\"Einen Tee und ein Wasser, bitte\". Remember \"Tee\" is masculine accusative (*einen*) and \"Wasser\" is neuter (*ein*).",
              "data": {
                "acceptableAnswers": [
                  "Einen Tee und ein Wasser, bitte",
                  "Einen Tee und ein Wasser, bitte.",
                  "einen tee und ein wasser bitte"
                ]
              }
            },
            {
              "id": "ex-de-c2-listen",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Hören Sie der Bedienung zu und wählen Sie die Frage:",
              "instruction": "Listen carefully and select the spoken question",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/de_cafe_order.mp3",
              "order": 2,
              "explanation": "Klassische Nachfrage im Café: \"Möchten Sie sonst noch etwas bestellen?\".",
              "data": {
                "audioUrl": "https://actions.google.com/sounds/v1/speech/de_cafe_order.mp3",
                "transcript": "Möchten Sie sonst noch etwas bestellen?",
                "correctOptionId": "opt-de-c2-1",
                "options": [
                  {
                    "id": "opt-de-c2-1",
                    "text": "Möchten Sie sonst noch etwas bestellen?"
                  },
                  {
                    "id": "opt-de-c2-2",
                    "text": "Wo ist die Toilette?"
                  },
                  {
                    "id": "opt-de-c2-3",
                    "text": "Wie viel kostet das?"
                  },
                  {
                    "id": "opt-de-c2-4",
                    "text": "Zahlen Sie zusammen?"
                  }
                ]
              },
              "lessonId": "lesson-de-202"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-de-3",
      "courseId": "course-de-en",
      "unitNumber": 3,
      "title": "Unit 3: Navigating the City (In der Stadt)",
      "description": "Ask for directions, find train stations, and understand spatial prepositions.",
      "themeColor": "#FF9600",
      "icon": "map-pin",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-de-301",
          "unitId": "unit-de-3",
          "lessonNumber": 1,
          "title": "Asking for Directions (Wo ist...?)",
          "type": "standard",
          "xpReward": 20,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-de-14",
              "lessonId": "lesson-de-301",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you ask \"Where is the train station?\" in German?",
              "instruction": "Select the correct question",
              "order": 1,
              "explanation": "\"Wo ist der Bahnhof?\" is the standard question formula. \"Bahnhof\" is masculine (der Bahnhof).",
              "data": {
                "correctOptionId": "opt-dir-de-1",
                "options": [
                  {
                    "id": "opt-dir-de-1",
                    "text": "Wo ist der Bahnhof?"
                  },
                  {
                    "id": "opt-dir-de-2",
                    "text": "Wann ist der Bahnhof?"
                  },
                  {
                    "id": "opt-dir-de-3",
                    "text": "Wer ist der Bahnhof?"
                  },
                  {
                    "id": "opt-dir-de-4",
                    "text": "Warum ist der Bahnhof?"
                  }
                ]
              }
            },
            {
              "id": "ex-de-15",
              "lessonId": "lesson-de-301",
              "type": "MATCHING_PAIRS",
              "prompt": "Match German directions to English:",
              "instruction": "Connect spatial directions",
              "order": 2,
              "explanation": "Fundamental directions for navigating German, Austrian, and Swiss cities.",
              "data": {
                "pairs": [
                  {
                    "id": "de-dp1",
                    "leftText": "Nach links",
                    "rightText": "To the left"
                  },
                  {
                    "id": "de-dp2",
                    "leftText": "Nach rechts",
                    "rightText": "To the right"
                  },
                  {
                    "id": "de-dp3",
                    "leftText": "Geradeaus",
                    "rightText": "Straight ahead"
                  },
                  {
                    "id": "de-dp4",
                    "leftText": "In der Nähe",
                    "rightText": "Nearby / close"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-de-302",
          "unitId": "unit-de-3",
          "lessonNumber": 2,
          "title": "Unit 3 Checkpoint: City Navigation Mastery",
          "type": "checkpoint",
          "xpReward": 30,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-de-16",
              "lessonId": "lesson-de-302",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Entschuldigung, wo ist das Hotel?\"",
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
              "id": "ex-de-c3-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Fragen Sie nach dem Weg zum Hauptbahnhof:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 2,
              "explanation": "Zentrale Navigationsfrage für Reisende im deutschen Verkehrsnetz.",
              "data": {
                "phraseToSpeak": "Entschuldigung, wo ist der Bahnhof?",
                "phoneticGuide": "ent-SHOOL-dee-goong, voh ist dair BAHN-hohf"
              },
              "lessonId": "lesson-de-302"
            }
          ]
        }
      ]
    }
  ]
};
