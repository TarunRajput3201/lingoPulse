import type { StaticCourse } from '../staticCurriculum';

export const JAPANESE_COURSE: StaticCourse = {
  "_id": "course-ja-en",
  "id": "course-ja-en",
  "code": "ja-en",
  "title": "Japanese Academy",
  "description": "Embark on your journey to JLPT N5 mastery: Hiragana, Katakana, essential particles, and authentic daily communication.",
  "fromLanguage": "en",
  "toLanguage": "ja",
  "flagIcon": "🇯🇵",
  "level": "JLPT N5 / A1",
  "status": "published",
  "order": 4,
  "totalUnits": 3,
  "totalLessons": 7,
  "units": [
    {
      "id": "unit-ja-1",
      "courseId": "course-ja-en",
      "unitNumber": 1,
      "title": "Unit 1: First Steps & Greetings (ひらがな)",
      "description": "Master standard greetings, self-introductions with \"desu\", and the topic particle \"wa\".",
      "themeColor": "#58CC02",
      "icon": "sparkles",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-ja-101",
          "unitId": "unit-ja-1",
          "lessonNumber": 1,
          "title": "Saying Hello in Japanese",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ja-1",
              "lessonId": "lesson-ja-101",
              "type": "MULTIPLE_CHOICE",
              "prompt": "Select the Japanese greeting for \"Hello / Good afternoon\":",
              "instruction": "Choose the correct greeting option",
              "order": 1,
              "explanation": "こんにちは (Konnichiwa) is the standard polite daytime greeting used from late morning until dusk.",
              "data": {
                "correctOptionId": "opt-ja-1",
                "options": [
                  {
                    "id": "opt-ja-1",
                    "text": "こんにちは (Konnichiwa)",
                    "translation": "Hello"
                  },
                  {
                    "id": "opt-ja-2",
                    "text": "さようなら (Sayōnara)",
                    "translation": "Goodbye"
                  },
                  {
                    "id": "opt-ja-3",
                    "text": "ありがとう (Arigatō)",
                    "translation": "Thank you"
                  },
                  {
                    "id": "opt-ja-4",
                    "text": "すみません (Sumimasen)",
                    "translation": "Excuse me"
                  }
                ]
              }
            },
            {
              "id": "ex-ja-2",
              "lessonId": "lesson-ja-101",
              "type": "TRANSLATION",
              "prompt": "Translate to Japanese: \"Thank you\"",
              "instruction": "Type your answer in Romaji or Hiragana",
              "order": 2,
              "explanation": "\"Arigatou\" or \"Arigatou gozaimasu\" (more polite) is how you say thank you.",
              "data": {
                "acceptableAnswers": [
                  "ありがとう",
                  "ありがとうございます",
                  "arigatou",
                  "arigato",
                  "arigatou gozaimasu"
                ]
              }
            },
            {
              "id": "ex-ja-3",
              "lessonId": "lesson-ja-101",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Japanese greetings with their English meanings:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Core Japanese interpersonal greetings.",
              "data": {
                "pairs": [
                  {
                    "id": "ja-p1",
                    "leftText": "こんにちは (Konnichiwa)",
                    "rightText": "Hello"
                  },
                  {
                    "id": "ja-p2",
                    "leftText": "おはよう (Ohayō)",
                    "rightText": "Good morning"
                  },
                  {
                    "id": "ja-p3",
                    "leftText": "こんばんは (Konbanwa)",
                    "rightText": "Good evening"
                  },
                  {
                    "id": "ja-p4",
                    "leftText": "じゃあね (Jaa ne)",
                    "rightText": "See you (casual)"
                  }
                ]
              }
            },
            {
              "id": "ex-ja-4",
              "lessonId": "lesson-ja-101",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Speak this phrase out loud in Japanese:",
              "instruction": "Pronounce cleanly with mora timing",
              "order": 4,
              "explanation": "Notice that the final \"wa\" in こんにちは is written with the hiragana character は (ha), acting as an ancient particle.",
              "data": {
                "phraseToSpeak": "こんにちは、ありがとう",
                "phoneticGuide": "kohn-NEE-chee-wah, ah-REE-gah-toh"
              }
            }
          ]
        },
        {
          "id": "lesson-ja-102",
          "unitId": "unit-ja-1",
          "lessonNumber": 2,
          "title": "Introducing Yourself & Topic Particle は",
          "type": "standard",
          "xpReward": 15,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ja-5",
              "lessonId": "lesson-ja-102",
              "type": "WORD_ORDER",
              "prompt": "Construct the sentence: \"I am Ken\" (私はケンです)",
              "instruction": "Tap words in the correct SOV order",
              "order": 1,
              "explanation": "Japanese sentence structure: Topic (私 watashi) + Topic particle (は wa) + Name (Ken) + Copula (です desu).",
              "data": {
                "sourcePrompt": "I am Ken",
                "wordBank": [
                  "私",
                  "は",
                  "ケン",
                  "です",
                  "を",
                  "に"
                ],
                "correctOrder": [
                  "私",
                  "は",
                  "ケン",
                  "です"
                ]
              }
            },
            {
              "id": "ex-ja-6",
              "lessonId": "lesson-ja-102",
              "type": "FILL_IN_THE_BLANK",
              "prompt": "Select the polite copula meaning \"to be / am / is\":",
              "instruction": "Choose the missing word",
              "order": 2,
              "explanation": "です (desu) is the polite copula that ends non-verbal sentences in standard conversation.",
              "data": {
                "sentenceWithBlank": "アメリカ人 ___。 (I am American)",
                "options": [
                  "です",
                  "ます",
                  "でした",
                  "だ"
                ],
                "acceptableAnswers": [
                  "です"
                ]
              }
            },
            {
              "id": "ex-ja-7",
              "lessonId": "lesson-ja-102",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Listen to the audio and select what the speaker says:",
              "instruction": "Listen carefully and select the spoken phrase",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/greeting_ja.mp3",
              "order": 3,
              "explanation": "The speaker greets: \"Hajimemashite\" (Nice to meet you for the first time).",
              "data": {
                "transcript": "はじめまして (Hajimemashite)",
                "correctOptionId": "opt-aud-ja-1",
                "options": [
                  {
                    "id": "opt-aud-ja-1",
                    "text": "はじめまして (Nice to meet you)"
                  },
                  {
                    "id": "opt-aud-ja-2",
                    "text": "さようなら (Goodbye)"
                  },
                  {
                    "id": "opt-aud-ja-3",
                    "text": "ごちそうさまでした (Thank you for the meal)"
                  },
                  {
                    "id": "opt-aud-ja-4",
                    "text": "おやすみなさい (Good night)"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-ja-103",
          "unitId": "unit-ja-1",
          "lessonNumber": 3,
          "title": "Unit 1 Checkpoint: Japanese First Steps",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 3,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ja-8",
              "lessonId": "lesson-ja-103",
              "type": "TRUE_FALSE",
              "prompt": "Read the statement and determine if it is True or False:",
              "instruction": "Verify grammatical accuracy",
              "order": 1,
              "explanation": "In Japanese, the verb or copula (like \"desu\") always goes at the very end of the sentence.",
              "data": {
                "statement": "In Japanese, the verb or copula always goes at the end of the sentence.",
                "isTrue": true
              }
            },
            {
              "id": "ex-ja-9",
              "lessonId": "lesson-ja-103",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Hajimemashite, Ken desu\"",
              "instruction": "Type your answer in English",
              "order": 2,
              "explanation": "\"Nice to meet you, I am Ken\" is the natural English equivalent.",
              "data": {
                "acceptableAnswers": [
                  "Nice to meet you, I am Ken",
                  "Nice to meet you, I am Ken.",
                  "Nice to meet you, my name is Ken",
                  "How do you do, I am Ken"
                ]
              }
            },
            {
              "id": "ex-ja-c1-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Speak the polite Japanese first-meeting greeting:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 3,
              "explanation": "The essential Japanese introductory formula establishing mutual respect.",
              "data": {
                "phraseToSpeak": "はじめまして、よろしくお願いします",
                "phoneticGuide": "Hajimemashite, yoroshiku onegaishimasu"
              },
              "lessonId": "lesson-ja-103"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-ja-2",
      "courseId": "course-ja-en",
      "unitNumber": 2,
      "title": "Unit 2: At The Restaurant & Ordering (これ、それ、あれ)",
      "description": "Order food and drinks, use \"kore o kudasai\", and learn Katakana loanwords.",
      "themeColor": "#1CB0F6",
      "icon": "coffee",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-ja-201",
          "unitId": "unit-ja-2",
          "lessonNumber": 1,
          "title": "Ordering Food and Drinks",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ja-10",
              "lessonId": "lesson-ja-201",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you say \"This one, please\" while pointing at a menu?",
              "instruction": "Choose the most natural expression",
              "order": 1,
              "explanation": "これをください (Kore o kudasai) uses \"kore\" (this one near speaker) + object particle \"o\" + \"kudasai\" (please give me).",
              "data": {
                "correctOptionId": "opt-ja-c1",
                "options": [
                  {
                    "id": "opt-ja-c1",
                    "text": "これをください (Kore o kudasai)"
                  },
                  {
                    "id": "opt-ja-c2",
                    "text": "あれはどこですか (Are wa doko desu ka)"
                  },
                  {
                    "id": "opt-ja-c3",
                    "text": "ありがとうさようなら (Arigatō sayōnara)"
                  },
                  {
                    "id": "opt-ja-c4",
                    "text": "私はいぬです (Watashi wa inu desu)"
                  }
                ]
              }
            },
            {
              "id": "ex-ja-11",
              "lessonId": "lesson-ja-201",
              "type": "WORD_ORDER",
              "prompt": "Construct: \"Water, please\" (水をお願いします)",
              "instruction": "Order the words properly",
              "order": 2,
              "explanation": "水 (Mizu = water) + を (o = object particle) + お願いします (onegaishimasu = please).",
              "data": {
                "sourcePrompt": "Water, please",
                "wordBank": [
                  "水",
                  "を",
                  "お願いします",
                  "これ",
                  "です"
                ],
                "correctOrder": [
                  "水",
                  "を",
                  "お願いします"
                ]
              }
            },
            {
              "id": "ex-ja-12",
              "lessonId": "lesson-ja-201",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Japanese restaurant items with English:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Common restaurant and food vocabulary.",
              "data": {
                "pairs": [
                  {
                    "id": "jp-c1",
                    "leftText": "お水 (Omizu)",
                    "rightText": "Water"
                  },
                  {
                    "id": "jp-c2",
                    "leftText": "お茶 (Ocha)",
                    "rightText": "Green tea"
                  },
                  {
                    "id": "jp-c3",
                    "leftText": "ご飯 (Gohan)",
                    "rightText": "Rice / Meal"
                  },
                  {
                    "id": "jp-c4",
                    "leftText": "おいしい (Oishii)",
                    "rightText": "Delicious"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-ja-202",
          "unitId": "unit-ja-2",
          "lessonNumber": 2,
          "title": "Unit 2 Checkpoint: Dining Mastery",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ja-13",
              "lessonId": "lesson-ja-202",
              "type": "TRANSLATION",
              "prompt": "Translate to English: \"Kore wa oishii desu\"",
              "instruction": "Type your answer in English",
              "order": 1,
              "explanation": "\"This is delicious\" or \"This is tasty\".",
              "data": {
                "acceptableAnswers": [
                  "This is delicious",
                  "This is delicious.",
                  "This is tasty",
                  "It is delicious"
                ]
              }
            },
            {
              "id": "ex-ja-c2-listen",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "店員さんの音声を聞いて、質問を選んでください：",
              "instruction": "Listen carefully and select the spoken question",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/ja_cafe_order.mp3",
              "order": 2,
              "explanation": "Standard polite phrase used by Japanese restaurant staff (\"Have you decided on your order?\").",
              "data": {
                "audioUrl": "https://actions.google.com/sounds/v1/speech/ja_cafe_order.mp3",
                "transcript": "ご注文はお決まりですか？",
                "correctOptionId": "opt-ja-c2-1",
                "options": [
                  {
                    "id": "opt-ja-c2-1",
                    "text": "ご注文はお決まりですか？"
                  },
                  {
                    "id": "opt-ja-c2-2",
                    "text": "お会計をお願いします"
                  },
                  {
                    "id": "opt-ja-c2-3",
                    "text": "トイレはどこですか？"
                  },
                  {
                    "id": "opt-ja-c2-4",
                    "text": "何時まで営業していますか？"
                  }
                ]
              },
              "lessonId": "lesson-ja-202"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-ja-3",
      "courseId": "course-ja-en",
      "unitNumber": 3,
      "title": "Unit 3: Navigating Tokyo & Directions",
      "description": "Ask where places are located, find train stations, and use \"doko desu ka\".",
      "themeColor": "#FF9600",
      "icon": "map-pin",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-ja-301",
          "unitId": "unit-ja-3",
          "lessonNumber": 1,
          "title": "Asking \"Where is...?\" (どこですか)",
          "type": "standard",
          "xpReward": 20,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ja-14",
              "lessonId": "lesson-ja-301",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you ask \"Where is the station?\" in Japanese?",
              "instruction": "Select the correct question",
              "order": 1,
              "explanation": "駅はどこですか (Eki wa doko desu ka) means \"Where is the train station?\".",
              "data": {
                "correctOptionId": "opt-dir-ja-1",
                "options": [
                  {
                    "id": "opt-dir-ja-1",
                    "text": "駅はどこですか (Eki wa doko desu ka)"
                  },
                  {
                    "id": "opt-dir-ja-2",
                    "text": "駅はこれですか (Eki wa kore desu ka)"
                  },
                  {
                    "id": "opt-dir-ja-3",
                    "text": "駅をください (Eki o kudasai)"
                  },
                  {
                    "id": "opt-dir-ja-4",
                    "text": "駅はだれですか (Eki wa dare desu ka)"
                  }
                ]
              }
            },
            {
              "id": "ex-ja-15",
              "lessonId": "lesson-ja-301",
              "type": "MATCHING_PAIRS",
              "prompt": "Match location and direction words:",
              "instruction": "Connect Japanese terms with English",
              "order": 2,
              "explanation": "Essential navigational vocabulary in Japan.",
              "data": {
                "pairs": [
                  {
                    "id": "ja-dp1",
                    "leftText": "駅 (Eki)",
                    "rightText": "Train station"
                  },
                  {
                    "id": "ja-dp2",
                    "leftText": "トイレ (Toire)",
                    "rightText": "Restroom"
                  },
                  {
                    "id": "ja-dp3",
                    "leftText": "右 (Migi)",
                    "rightText": "Right"
                  },
                  {
                    "id": "ja-dp4",
                    "leftText": "左 (Hidari)",
                    "rightText": "Left"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-ja-302",
          "unitId": "unit-ja-3",
          "lessonNumber": 2,
          "title": "Unit 3 Checkpoint: Navigation Mastery",
          "type": "checkpoint",
          "xpReward": 30,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ja-16",
              "lessonId": "lesson-ja-302",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Sumimasen, toire wa doko desu ka?\"",
              "instruction": "Type your answer in English",
              "order": 1,
              "explanation": "\"Excuse me, where is the restroom / bathroom / toilet?\"",
              "data": {
                "acceptableAnswers": [
                  "Excuse me, where is the restroom?",
                  "Excuse me, where is the bathroom?",
                  "Excuse me, where is the toilet?",
                  "Excuse me, where is the restroom"
                ]
              }
            },
            {
              "id": "ex-ja-c3-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Ask where the train station is located in Japanese:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 2,
              "explanation": "Crucial travel phrase starting with \"Sumimasen\" (Excuse me) followed by location query.",
              "data": {
                "phraseToSpeak": "すみません、駅はどこですか？",
                "phoneticGuide": "Sumimasen, eki wa doko desu ka?"
              },
              "lessonId": "lesson-ja-302"
            }
          ]
        }
      ]
    }
  ]
};
