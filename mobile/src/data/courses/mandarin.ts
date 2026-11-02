import type { StaticCourse } from '../staticCurriculum';

export const MANDARIN_COURSE: StaticCourse = {
  "_id": "course-zh-en",
  "id": "course-zh-en",
  "code": "zh-en",
  "title": "Mandarin Chinese Academy",
  "description": "Embark on HSK 1 mastery: Pinyin pronunciation, the 4 tones, Chinese characters (汉字), measure words, and everyday dialogue.",
  "fromLanguage": "en",
  "toLanguage": "zh",
  "flagIcon": "🇨🇳",
  "level": "HSK 1 / A1",
  "status": "published",
  "order": 8,
  "totalUnits": 3,
  "totalLessons": 7,
  "units": [
    {
      "id": "unit-zh-1",
      "courseId": "course-zh-en",
      "unitNumber": 1,
      "title": "Unit 1: First Steps, Pinyin & Greetings (拼音)",
      "description": "Master the four tones, standard greetings (你好), and self-introductions (我叫).",
      "themeColor": "#58CC02",
      "icon": "sparkles",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-zh-101",
          "unitId": "unit-zh-1",
          "lessonNumber": 1,
          "title": "Saying Hello in Chinese",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-zh-1",
              "lessonId": "lesson-zh-101",
              "type": "MULTIPLE_CHOICE",
              "prompt": "Select the Chinese word for \"Hello\":",
              "instruction": "Choose the correct greeting option",
              "order": 1,
              "explanation": "你好 (Nǐ hǎo) combines 你 (you) and 好 (good) as the standard universal greeting in Chinese.",
              "data": {
                "correctOptionId": "opt-zh-1",
                "options": [
                  {
                    "id": "opt-zh-1",
                    "text": "你好 (Nǐ hǎo)",
                    "translation": "Hello"
                  },
                  {
                    "id": "opt-zh-2",
                    "text": "再见 (Zàijiàn)",
                    "translation": "Goodbye"
                  },
                  {
                    "id": "opt-zh-3",
                    "text": "谢谢 (Xièxie)",
                    "translation": "Thank you"
                  },
                  {
                    "id": "opt-zh-4",
                    "text": "请 (Qǐng)",
                    "translation": "Please"
                  }
                ]
              }
            },
            {
              "id": "ex-zh-2",
              "lessonId": "lesson-zh-101",
              "type": "TRANSLATION",
              "prompt": "Translate to Chinese: \"Thank you\"",
              "instruction": "Type your answer in Pinyin or Hanzi",
              "order": 2,
              "explanation": "\"Xièxie\" (谢谢) is the standard expression of gratitude in Mandarin.",
              "data": {
                "acceptableAnswers": [
                  "谢谢",
                  "xiexie",
                  "xièxie",
                  "xiè xie",
                  "多谢"
                ]
              }
            },
            {
              "id": "ex-zh-3",
              "lessonId": "lesson-zh-101",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Chinese phrases with their English meanings:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Essential polite Chinese expressions.",
              "data": {
                "pairs": [
                  {
                    "id": "zh-p1",
                    "leftText": "你好 (Nǐ hǎo)",
                    "rightText": "Hello"
                  },
                  {
                    "id": "zh-p2",
                    "leftText": "谢谢 (Xièxie)",
                    "rightText": "Thank you"
                  },
                  {
                    "id": "zh-p3",
                    "leftText": "再见 (Zàijiàn)",
                    "rightText": "Goodbye"
                  },
                  {
                    "id": "zh-p4",
                    "leftText": "对不起 (Duìbuqǐ)",
                    "rightText": "Sorry / Excuse me"
                  }
                ]
              }
            },
            {
              "id": "ex-zh-4",
              "lessonId": "lesson-zh-101",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Speak this phrase out loud in Mandarin:",
              "instruction": "Pay close attention to third-tone sandhi",
              "order": 4,
              "explanation": "When two third tones appear together (Nǐ hǎo), the first tone changes to a rising second tone [Ní hǎo].",
              "data": {
                "phraseToSpeak": "你好，谢谢",
                "phoneticGuide": "nee HOW, syeh-SYEH"
              }
            }
          ]
        },
        {
          "id": "lesson-zh-102",
          "unitId": "unit-zh-1",
          "lessonNumber": 2,
          "title": "Introducing Yourself & \"我叫\"",
          "type": "standard",
          "xpReward": 15,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-zh-5",
              "lessonId": "lesson-zh-102",
              "type": "WORD_ORDER",
              "prompt": "Construct the sentence: \"My name is Li Hua\" (我叫李华)",
              "instruction": "Tap words in the correct order",
              "order": 1,
              "explanation": "In Chinese, 我 (wǒ = I) + 叫 (jiào = called/named) + Name (Lǐ Huá).",
              "data": {
                "sourcePrompt": "My name is Li Hua",
                "wordBank": [
                  "我",
                  "叫",
                  "李华",
                  "是",
                  "你",
                  "的"
                ],
                "correctOrder": [
                  "我",
                  "叫",
                  "李华"
                ]
              }
            },
            {
              "id": "ex-zh-6",
              "lessonId": "lesson-zh-102",
              "type": "FILL_IN_THE_BLANK",
              "prompt": "Select the copular verb meaning \"to be / am / is\":",
              "instruction": "Choose 是 (shì) or 的 (de)",
              "order": 2,
              "explanation": "是 (shì) links nouns and identities (e.g. 我是学生 = I am a student).",
              "data": {
                "sentenceWithBlank": "我 ___ 学生。 (I am a student)",
                "options": [
                  "是",
                  "叫",
                  "有",
                  "在"
                ],
                "acceptableAnswers": [
                  "是"
                ]
              }
            },
            {
              "id": "ex-zh-7",
              "lessonId": "lesson-zh-102",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Listen to the audio and select what the speaker says:",
              "instruction": "Listen carefully and select the spoken phrase",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/greeting_zh.mp3",
              "order": 3,
              "explanation": "The speaker introduces: \"很高兴认识你\" (Very glad to meet you).",
              "data": {
                "transcript": "很高兴认识你 (Hěn gāoxìng rènshí nǐ)",
                "correctOptionId": "opt-aud-zh-1",
                "options": [
                  {
                    "id": "opt-aud-zh-1",
                    "text": "很高兴认识你 (Glad to meet you)"
                  },
                  {
                    "id": "opt-aud-zh-2",
                    "text": "明天见 (See you tomorrow)"
                  },
                  {
                    "id": "opt-aud-zh-3",
                    "text": "洗手间在哪里？ (Where is the restroom?)"
                  },
                  {
                    "id": "opt-aud-zh-4",
                    "text": "我要喝茶 (I want to drink tea)"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-zh-103",
          "unitId": "unit-zh-1",
          "lessonNumber": 3,
          "title": "Unit 1 Checkpoint: Chinese Foundations",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 3,
          "status": "published",
          "exercises": [
            {
              "id": "ex-zh-8",
              "lessonId": "lesson-zh-103",
              "type": "TRUE_FALSE",
              "prompt": "Read the statement and determine if it is True or False:",
              "instruction": "Verify grammatical facts",
              "order": 1,
              "explanation": "Mandarin Chinese verbs do NOT conjugate for tense, person, or number. Aspect particles like 了, 过 mark temporal state.",
              "data": {
                "statement": "Mandarin verbs do not conjugate for person or number.",
                "isTrue": true
              }
            },
            {
              "id": "ex-zh-9",
              "lessonId": "lesson-zh-103",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Wǒ jiào Dàwèi\"",
              "instruction": "Type your answer in English",
              "order": 2,
              "explanation": "\"My name is David\" or \"I am David\".",
              "data": {
                "acceptableAnswers": [
                  "My name is David",
                  "My name is David.",
                  "I am David",
                  "I am David."
                ]
              }
            },
            {
              "id": "ex-zh-c1-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "用中文向新朋友表达很高兴认识他：",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 3,
              "explanation": "Standard Mandarin expression: \"Very happy to meet you!\".",
              "data": {
                "phraseToSpeak": "很高兴认识你！",
                "phoneticGuide": "Hěn gāoxìng rènshi nǐ!"
              },
              "lessonId": "lesson-zh-103"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-zh-2",
      "courseId": "course-zh-en",
      "unitNumber": 2,
      "title": "Unit 2: At The Teahouse & Measure Words (量词)",
      "description": "Order tea and dumplings, ask prices with \"Duōshao qián\", and learn measure words.",
      "themeColor": "#1CB0F6",
      "icon": "coffee",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-zh-201",
          "unitId": "unit-zh-2",
          "lessonNumber": 1,
          "title": "Ordering Food and Drinks with Measure Words",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-zh-10",
              "lessonId": "lesson-zh-201",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you say \"A cup of tea, please\"?",
              "instruction": "Select the sentence with the correct measure word 杯 (bēi)",
              "order": 1,
              "explanation": "我要一杯茶 (Wǒ yào yī bēi chá) uses the measure word 杯 (bēi = cup) between the number and noun.",
              "data": {
                "correctOptionId": "opt-zh-c1",
                "options": [
                  {
                    "id": "opt-zh-c1",
                    "text": "我要一杯茶 (Wǒ yào yī bēi chá)"
                  },
                  {
                    "id": "opt-zh-c2",
                    "text": "我要一张茶 (Wǒ yào yī zhāng chá)"
                  },
                  {
                    "id": "opt-zh-c3",
                    "text": "多少钱茶 (Duōshao qián chá)"
                  },
                  {
                    "id": "opt-zh-c4",
                    "text": "茶在哪里 (Chá zài nǎlǐ)"
                  }
                ]
              }
            },
            {
              "id": "ex-zh-11",
              "lessonId": "lesson-zh-201",
              "type": "WORD_ORDER",
              "prompt": "Construct: \"How much is this?\" (这个多少钱？)",
              "instruction": "Order the words properly",
              "order": 2,
              "explanation": "这个 (Zhè ge = this one) + 多少钱 (duōshao qián = how much money?).",
              "data": {
                "sourcePrompt": "How much is this?",
                "wordBank": [
                  "这个",
                  "多少钱？",
                  "茶",
                  "一",
                  "杯"
                ],
                "correctOrder": [
                  "这个",
                  "多少钱？"
                ]
              }
            },
            {
              "id": "ex-zh-12",
              "lessonId": "lesson-zh-201",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Chinese culinary items with English:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Essential food and beverage vocabulary.",
              "data": {
                "pairs": [
                  {
                    "id": "zh-cp1",
                    "leftText": "茶 (Chá)",
                    "rightText": "Tea"
                  },
                  {
                    "id": "zh-cp2",
                    "leftText": "水 (Shuǐ)",
                    "rightText": "Water"
                  },
                  {
                    "id": "zh-cp3",
                    "leftText": "米饭 (Mǐfàn)",
                    "rightText": "Cooked rice"
                  },
                  {
                    "id": "zh-cp4",
                    "leftText": "好吃 (Hǎochī)",
                    "rightText": "Delicious"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-zh-202",
          "unitId": "unit-zh-2",
          "lessonNumber": 2,
          "title": "Unit 2 Checkpoint: Dining Mastery",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-zh-13",
              "lessonId": "lesson-zh-202",
              "type": "TRANSLATION",
              "prompt": "Translate to English: \"Zhè ge hěn hǎochī!\"",
              "instruction": "Type your answer in English",
              "order": 1,
              "explanation": "\"This is very delicious!\" or \"This is very tasty!\".",
              "data": {
                "acceptableAnswers": [
                  "This is very delicious!",
                  "This is very delicious",
                  "This is very tasty",
                  "This is delicious"
                ]
              }
            },
            {
              "id": "ex-zh-c2-listen",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "听服务员说话，选择正确的问句：",
              "instruction": "Listen carefully and select the spoken question",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/zh_cafe_order.mp3",
              "order": 2,
              "explanation": "Polite waiter inquiry in tea houses and restaurants: \"May I ask what you would like to order?\".",
              "data": {
                "audioUrl": "https://actions.google.com/sounds/v1/speech/zh_cafe_order.mp3",
                "transcript": "请问您要点什么？",
                "correctOptionId": "opt-zh-c2-1",
                "options": [
                  {
                    "id": "opt-zh-c2-1",
                    "text": "请问您要点什么？"
                  },
                  {
                    "id": "opt-zh-c2-2",
                    "text": "洗手间在哪里？"
                  },
                  {
                    "id": "opt-zh-c2-3",
                    "text": "请问一共多少钱？"
                  },
                  {
                    "id": "opt-zh-c2-4",
                    "text": "可以扫码支付吗？"
                  }
                ]
              },
              "lessonId": "lesson-zh-202"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-zh-3",
      "courseId": "course-zh-en",
      "unitNumber": 3,
      "title": "Unit 3: Navigating the City (在哪里)",
      "description": "Ask where train stations are located and find your way with \"Zài nǎlǐ\".",
      "themeColor": "#FF9600",
      "icon": "map-pin",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-zh-301",
          "unitId": "unit-zh-3",
          "lessonNumber": 1,
          "title": "Asking \"Where is...?\" (在哪里)",
          "type": "standard",
          "xpReward": 20,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-zh-14",
              "lessonId": "lesson-zh-301",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you ask \"Where is the train station?\" in Chinese?",
              "instruction": "Select the correct question",
              "order": 1,
              "explanation": "火车站建在哪里 (Huǒchēzhàn zài nǎlǐ?) means \"Where is the train station?\".",
              "data": {
                "correctOptionId": "opt-dir-zh-1",
                "options": [
                  {
                    "id": "opt-dir-zh-1",
                    "text": "火车站牌在哪里？ (Huǒchēzhàn zài nǎlǐ?)"
                  },
                  {
                    "id": "opt-dir-zh-2",
                    "text": "火车站多少钱？ (Huǒchēzhàn duōshao qián?)"
                  },
                  {
                    "id": "opt-dir-zh-3",
                    "text": "火车站吃什么？ (Huǒchēzhàn chī shénme?)"
                  },
                  {
                    "id": "opt-dir-zh-4",
                    "text": "火车站谢谢？ (Huǒchēzhàn xièxie?)"
                  }
                ]
              }
            },
            {
              "id": "ex-zh-15",
              "lessonId": "lesson-zh-301",
              "type": "MATCHING_PAIRS",
              "prompt": "Match location and direction words in Chinese:",
              "instruction": "Connect Chinese terms with English",
              "order": 2,
              "explanation": "Essential directional terms.",
              "data": {
                "pairs": [
                  {
                    "id": "zh-dp1",
                    "leftText": "左边 (Zuǒbian)",
                    "rightText": "Left side"
                  },
                  {
                    "id": "zh-dp2",
                    "leftText": "右边 (Yòubian)",
                    "rightText": "Right side"
                  },
                  {
                    "id": "zh-dp3",
                    "leftText": "前边 (Qiánbian)",
                    "rightText": "Front / Ahead"
                  },
                  {
                    "id": "zh-dp4",
                    "leftText": "洗手间 (Xǐshǒujiān)",
                    "rightText": "Restroom"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-zh-302",
          "unitId": "unit-zh-3",
          "lessonNumber": 2,
          "title": "Unit 3 Checkpoint: Navigation Mastery",
          "type": "checkpoint",
          "xpReward": 30,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-zh-16",
              "lessonId": "lesson-zh-302",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Qǐngwèn, xǐshǒujiān zài nǎlǐ?\"",
              "instruction": "Type your answer in English",
              "order": 1,
              "explanation": "\"Excuse me, where is the restroom / bathroom?\"",
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
              "id": "ex-zh-c3-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "在街上询问地铁站在哪里：",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 2,
              "explanation": "Standard navigation sentence beginning with \"Qǐngwèn\" (May I ask).",
              "data": {
                "phraseToSpeak": "请问地铁站在哪里？",
                "phoneticGuide": "Qǐngwèn dìtiězhan zài nǎlǐ?"
              },
              "lessonId": "lesson-zh-302"
            }
          ]
        }
      ]
    }
  ]
};
