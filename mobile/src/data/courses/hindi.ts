import type { StaticCourse } from '../staticCurriculum';

export const HINDI_COURSE: StaticCourse = {
  "_id": "course-hi-en",
  "id": "course-hi-en",
  "code": "hi-en",
  "title": "Hindi Academy",
  "description": "Master conversational Hindi: Devanagari script, respectful address (आप/तुम), postpositions, and authentic daily communication.",
  "fromLanguage": "en",
  "toLanguage": "hi",
  "flagIcon": "🇮🇳",
  "level": "A1–A2",
  "status": "published",
  "order": 10,
  "totalUnits": 3,
  "totalLessons": 7,
  "units": [
    {
      "id": "unit-hi-1",
      "courseId": "course-hi-en",
      "unitNumber": 1,
      "title": "Unit 1: First Steps & Greetings (नमस्ते और परिचय)",
      "description": "Master standard greetings (नमस्ते), self-introductions (मेरा नाम), and respectful address (आप).",
      "themeColor": "#58CC02",
      "icon": "sparkles",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-hi-101",
          "unitId": "unit-hi-1",
          "lessonNumber": 1,
          "title": "Saying Hello in Hindi",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-hi-1",
              "lessonId": "lesson-hi-101",
              "type": "MULTIPLE_CHOICE",
              "prompt": "Select the Hindi greeting for \"Hello\":",
              "instruction": "Choose the correct greeting option",
              "order": 1,
              "explanation": "नमस्ते (Namaste) is the traditional and universal respectful greeting in Hindi, used at any time of day.",
              "data": {
                "correctOptionId": "opt-hi-1",
                "options": [
                  {
                    "id": "opt-hi-1",
                    "text": "नमस्ते (Namaste)",
                    "translation": "Hello"
                  },
                  {
                    "id": "opt-hi-2",
                    "text": "अलविदा (Alvida)",
                    "translation": "Goodbye"
                  },
                  {
                    "id": "opt-hi-3",
                    "text": "धन्यवाद (Dhanyavaad)",
                    "translation": "Thank you"
                  },
                  {
                    "id": "opt-hi-4",
                    "text": "कृपया (Kripya)",
                    "translation": "Please"
                  }
                ]
              }
            },
            {
              "id": "ex-hi-2",
              "lessonId": "lesson-hi-101",
              "type": "TRANSLATION",
              "prompt": "Translate to Hindi: \"Thank you\"",
              "instruction": "Type your answer in Devanagari or Romanized Hindi",
              "order": 2,
              "explanation": "\"धन्यवाद\" (Dhanyavaad) or \"शुक्रिया\" (Shukriya) expresses gratitude.",
              "data": {
                "acceptableAnswers": [
                  "धन्यवाद",
                  "शुक्रिया",
                  "dhanyavaad",
                  "dhanyavad",
                  "shukriya"
                ]
              }
            },
            {
              "id": "ex-hi-3",
              "lessonId": "lesson-hi-101",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Hindi phrases with their English meanings:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Essential polite Hindi expressions.",
              "data": {
                "pairs": [
                  {
                    "id": "hi-p1",
                    "leftText": "नमस्ते (Namaste)",
                    "rightText": "Hello"
                  },
                  {
                    "id": "hi-p2",
                    "leftText": "धन्यवाद (Dhanyavaad)",
                    "rightText": "Thank you"
                  },
                  {
                    "id": "hi-p3",
                    "leftText": "अलविदा (Alvida)",
                    "rightText": "Goodbye"
                  },
                  {
                    "id": "hi-p4",
                    "leftText": "हाँ (Haan)",
                    "rightText": "Yes"
                  }
                ]
              }
            },
            {
              "id": "ex-hi-4",
              "lessonId": "lesson-hi-101",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Speak this phrase out loud in Hindi:",
              "instruction": "Pronounce dental \"t\" (त) softly with tongue behind upper teeth",
              "order": 4,
              "explanation": "Remember to join your hands gently in \"anjali mudra\" while saying \"Namaste\".",
              "data": {
                "phraseToSpeak": "नमस्ते, आप कैसे हैं",
                "phoneticGuide": "nah-mas-TEH, aap KAI-seh hain"
              }
            }
          ]
        },
        {
          "id": "lesson-hi-102",
          "unitId": "unit-hi-1",
          "lessonNumber": 2,
          "title": "Introducing Yourself & \"मेरा नाम\"",
          "type": "standard",
          "xpReward": 15,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-hi-5",
              "lessonId": "lesson-hi-102",
              "type": "WORD_ORDER",
              "prompt": "Construct the sentence: \"My name is Rahul\" (मेरा नाम राहुल है)",
              "instruction": "Tap words in the correct SOV order",
              "order": 1,
              "explanation": "Hindi SOV word order: मेरा (Mera = my) + नाम (naam = name) + राहुल (Rahul) + है (hai = is).",
              "data": {
                "sourcePrompt": "My name is Rahul",
                "wordBank": [
                  "मेरा",
                  "नाम",
                  "राहुल",
                  "है",
                  "आप",
                  "का"
                ],
                "correctOrder": [
                  "मेरा",
                  "नाम",
                  "राहुल",
                  "है"
                ]
              }
            },
            {
              "id": "ex-hi-6",
              "lessonId": "lesson-hi-102",
              "type": "FILL_IN_THE_BLANK",
              "prompt": "Select the auxiliary verb \"to be / is\" in Hindi (है):",
              "instruction": "Choose the missing verb",
              "order": 2,
              "explanation": "है (hai) is the present tense singular third-person auxiliary verb (is).",
              "data": {
                "sentenceWithBlank": "यह एक किताब ___। (This is a book)",
                "options": [
                  "है",
                  "हूँ",
                  "हो",
                  "हैं"
                ],
                "acceptableAnswers": [
                  "है"
                ]
              }
            },
            {
              "id": "ex-hi-7",
              "lessonId": "lesson-hi-102",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Listen to the audio and select what the speaker says:",
              "instruction": "Listen carefully and select the spoken phrase",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/greeting_hi.mp3",
              "order": 3,
              "explanation": "The speaker introduces: \"आपसे मिलकर खुशी हुई\" (Pleased to meet you).",
              "data": {
                "transcript": "आपसे मिलकर खुशी हुई (Aapse milkar khushi hui)",
                "correctOptionId": "opt-aud-hi-1",
                "options": [
                  {
                    "id": "opt-aud-hi-1",
                    "text": "आपसे मिलकर खुशी हुई (Pleased to meet you)"
                  },
                  {
                    "id": "opt-aud-hi-2",
                    "text": "शुभ रात्रि, अलविदा (Good night, goodbye)"
                  },
                  {
                    "id": "opt-aud-hi-3",
                    "text": "स्टेशन कहाँ है? (Where is the station?)"
                  },
                  {
                    "id": "opt-aud-hi-4",
                    "text": "एक चाय दीजिए (Give one tea please)"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-hi-103",
          "unitId": "unit-hi-1",
          "lessonNumber": 3,
          "title": "Unit 1 Checkpoint: Hindi Foundations",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 3,
          "status": "published",
          "exercises": [
            {
              "id": "ex-hi-8",
              "lessonId": "lesson-hi-103",
              "type": "TRUE_FALSE",
              "prompt": "Read the statement and determine if it is True or False:",
              "instruction": "Verify cultural and linguistic respect rules",
              "order": 1,
              "explanation": "In Hindi, \"आप\" (Aap) is the respectful second-person pronoun used for elders, professionals, and strangers.",
              "data": {
                "statement": "In Hindi, \"आप\" (Aap) is the respectful pronoun used to address strangers and elders politely.",
                "isTrue": true
              }
            },
            {
              "id": "ex-hi-9",
              "lessonId": "lesson-hi-103",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Mera naam Priya hai\"",
              "instruction": "Type your answer in English",
              "order": 2,
              "explanation": "\"My name is Priya\" or \"I am Priya\".",
              "data": {
                "acceptableAnswers": [
                  "My name is Priya",
                  "My name is Priya.",
                  "I am Priya",
                  "I am Priya."
                ]
              }
            },
            {
              "id": "ex-hi-c1-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "हिंदी में शिष्टाचार पूर्वक अपना परिचय दीजिए:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 3,
              "explanation": "Respected introductory formula expressing joy upon meeting someone.",
              "data": {
                "phraseToSpeak": "आपसे मिलकर बहुत खुशी हुई।",
                "phoneticGuide": "Aapse milkar bahut khushi hui."
              },
              "lessonId": "lesson-hi-103"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-hi-2",
      "courseId": "course-hi-en",
      "unitNumber": 2,
      "title": "Unit 2: At The Bazaar & Ordering (एक चाय दीजिए)",
      "description": "Order masala chai, ask prices with \"Kitne rupaye\", and learn bazaar etiquette.",
      "themeColor": "#1CB0F6",
      "icon": "coffee",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-hi-201",
          "unitId": "unit-hi-2",
          "lessonNumber": 1,
          "title": "Ordering Tea and Food",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-hi-10",
              "lessonId": "lesson-hi-201",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you say \"Please give one cup of tea\" in Hindi?",
              "instruction": "Choose the polite imperative phrase",
              "order": 1,
              "explanation": "एक चाय दीजिए (Ek chai dijiye) uses the polite imperative \"dijiye\" (please give).",
              "data": {
                "correctOptionId": "opt-hi-c1",
                "options": [
                  {
                    "id": "opt-hi-c1",
                    "text": "एक चाय दीजिए (Ek chai dijiye)"
                  },
                  {
                    "id": "opt-hi-c2",
                    "text": "चाय मत दो (Chai mat do)"
                  },
                  {
                    "id": "opt-hi-c3",
                    "text": "यह किताब है (Yeh kitaab hai)"
                  },
                  {
                    "id": "opt-hi-c4",
                    "text": "नमस्ते अलविदा (Namaste alvida)"
                  }
                ]
              }
            },
            {
              "id": "ex-hi-11",
              "lessonId": "lesson-hi-201",
              "type": "WORD_ORDER",
              "prompt": "Construct: \"How much does this cost?\" (यह कितने का है？)",
              "instruction": "Order the words properly",
              "order": 2,
              "explanation": "यह (Yeh = this) + कितने का (kitne ka = of how much) + है (hai = is).",
              "data": {
                "sourcePrompt": "How much does this cost?",
                "wordBank": [
                  "यह",
                  "कितने",
                  "का",
                  "है？",
                  "पानी",
                  "एक"
                ],
                "correctOrder": [
                  "यह",
                  "कितने",
                  "का",
                  "है？"
                ]
              }
            },
            {
              "id": "ex-hi-12",
              "lessonId": "lesson-hi-201",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Hindi food items with English:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Essential food and beverage vocabulary in Hindi.",
              "data": {
                "pairs": [
                  {
                    "id": "hi-cp1",
                    "leftText": "चाय (Chai)",
                    "rightText": "Tea"
                  },
                  {
                    "id": "hi-cp2",
                    "leftText": "पानी (Paani)",
                    "rightText": "Water"
                  },
                  {
                    "id": "hi-cp3",
                    "leftText": "खाना (Khaana)",
                    "rightText": "Food / Meal"
                  },
                  {
                    "id": "hi-cp4",
                    "leftText": "स्वादिष्ट (Swaadisht)",
                    "rightText": "Delicious"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-hi-202",
          "unitId": "unit-hi-2",
          "lessonNumber": 2,
          "title": "Unit 2 Checkpoint: Dining Mastery",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-hi-13",
              "lessonId": "lesson-hi-202",
              "type": "TRANSLATION",
              "prompt": "Translate to English: \"Chai bahut swaadisht hai\"",
              "instruction": "Type your answer in English",
              "order": 1,
              "explanation": "\"The tea is very delicious!\" or \"Tea is very tasty!\".",
              "data": {
                "acceptableAnswers": [
                  "The tea is very delicious",
                  "The tea is very delicious!",
                  "The tea is very tasty",
                  "Tea is very delicious"
                ]
              }
            },
            {
              "id": "ex-hi-c2-listen",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "दुकानदार या वेटर की बात सुनकर सही वाक्य चुनिए:",
              "instruction": "Listen carefully and select the spoken question",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/hi_cafe_order.mp3",
              "order": 2,
              "explanation": "Polite inquiry in chai stalls and restaurants: \"Would you like to have anything else?\".",
              "data": {
                "audioUrl": "https://actions.google.com/sounds/v1/speech/hi_cafe_order.mp3",
                "transcript": "क्या आप कुछ और लेना चाहेंगे?",
                "correctOptionId": "opt-hi-c2-1",
                "options": [
                  {
                    "id": "opt-hi-c2-1",
                    "text": "क्या आप कुछ और लेना चाहेंगे?"
                  },
                  {
                    "id": "opt-hi-c2-2",
                    "text": "शौचालय कहाँ है?"
                  },
                  {
                    "id": "opt-hi-c2-3",
                    "text": "बिल कितना हुआ?"
                  },
                  {
                    "id": "opt-hi-c2-4",
                    "text": "यह कितने का है?"
                  }
                ]
              },
              "lessonId": "lesson-hi-202"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-hi-3",
      "courseId": "course-hi-en",
      "unitNumber": 3,
      "title": "Unit 3: Navigating the City (कहाँ है)",
      "description": "Ask for directions, find landmarks, and navigate Indian cities.",
      "themeColor": "#FF9600",
      "icon": "map-pin",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-hi-301",
          "unitId": "unit-hi-3",
          "lessonNumber": 1,
          "title": "Asking \"Where is...?\" (कहाँ है?)",
          "type": "standard",
          "xpReward": 20,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-hi-14",
              "lessonId": "lesson-hi-301",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you ask \"Where is the station?\" in Hindi?",
              "instruction": "Select the correct question",
              "order": 1,
              "explanation": "स्टेशन कहाँ है? (Station kahan hai?) means \"Where is the station?\".",
              "data": {
                "correctOptionId": "opt-dir-hi-1",
                "options": [
                  {
                    "id": "opt-dir-hi-1",
                    "text": "स्टेशन कहाँ है? (Station kahan hai?)"
                  },
                  {
                    "id": "opt-dir-hi-2",
                    "text": "स्टेशन कौन है? (Station kaun hai?)"
                  },
                  {
                    "id": "opt-dir-hi-3",
                    "text": "स्टेशन क्या है? (Station kya hai?)"
                  },
                  {
                    "id": "opt-dir-hi-4",
                    "text": "स्टेशन क्यों है? (Station kyon hai?)"
                  }
                ]
              }
            },
            {
              "id": "ex-hi-15",
              "lessonId": "lesson-hi-301",
              "type": "MATCHING_PAIRS",
              "prompt": "Match location and direction words in Hindi:",
              "instruction": "Connect Hindi terms with English",
              "order": 2,
              "explanation": "Fundamental directions in Hindi.",
              "data": {
                "pairs": [
                  {
                    "id": "hi-dp1",
                    "leftText": "बाएँ (Baayein)",
                    "rightText": "To the left"
                  },
                  {
                    "id": "hi-dp2",
                    "leftText": "दाएँ (Daayein)",
                    "rightText": "To the right"
                  },
                  {
                    "id": "hi-dp3",
                    "leftText": "सीधे (Seedhe)",
                    "rightText": "Straight ahead"
                  },
                  {
                    "id": "hi-dp4",
                    "leftText": "पास में (Paas mein)",
                    "rightText": "Near / nearby"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-hi-302",
          "unitId": "unit-hi-3",
          "lessonNumber": 2,
          "title": "Unit 3 Checkpoint: City Navigation Mastery",
          "type": "checkpoint",
          "xpReward": 30,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-hi-16",
              "lessonId": "lesson-hi-302",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Kripya bataiye, hotel kahan hai?\"",
              "instruction": "Type your answer in English",
              "order": 1,
              "explanation": "\"Please tell me, where is the hotel?\" or \"Please, where is the hotel?\".",
              "data": {
                "acceptableAnswers": [
                  "Please tell me, where is the hotel?",
                  "Please, where is the hotel?",
                  "Excuse me, where is the hotel?",
                  "Where is the hotel?"
                ]
              }
            },
            {
              "id": "ex-hi-c3-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "सड़क पर मेट्रो स्टेशन का रास्ता पूछिए:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 2,
              "explanation": "Standard respectful question for urban transit navigation in Hindi.",
              "data": {
                "phraseToSpeak": "माफ़ कीजिए, मेट्रो स्टेशन कहाँ है?",
                "phoneticGuide": "Maaf kijiye, metro station kahaan hai?"
              },
              "lessonId": "lesson-hi-302"
            }
          ]
        }
      ]
    }
  ]
};
