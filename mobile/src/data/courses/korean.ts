import type { StaticCourse } from '../staticCurriculum';

export const KOREAN_COURSE: StaticCourse = {
  "_id": "course-ko-en",
  "id": "course-ko-en",
  "code": "ko-en",
  "title": "Korean Academy",
  "description": "Master Hangul, natural pronunciation, polite speech levels (해요체), and authentic daily Korean conversation.",
  "fromLanguage": "en",
  "toLanguage": "ko",
  "flagIcon": "🇰🇷",
  "level": "TOPIK 1 / A1",
  "status": "published",
  "order": 6,
  "totalUnits": 3,
  "totalLessons": 7,
  "units": [
    {
      "id": "unit-ko-1",
      "courseId": "course-ko-en",
      "unitNumber": 1,
      "title": "Unit 1: First Steps & Greetings (한글)",
      "description": "Master essential greetings, self-introductions, and the polite identification ending \"이에요/예요\".",
      "themeColor": "#58CC02",
      "icon": "sparkles",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-ko-101",
          "unitId": "unit-ko-1",
          "lessonNumber": 1,
          "title": "Saying Hello in Korean",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ko-1",
              "lessonId": "lesson-ko-101",
              "type": "MULTIPLE_CHOICE",
              "prompt": "Select the Korean greeting for \"Hello\":",
              "instruction": "Choose the correct greeting option",
              "order": 1,
              "explanation": "안녕하세요 (Annyeonghaseyo) is the universal polite Korean greeting used at any time of day.",
              "data": {
                "correctOptionId": "opt-ko-1",
                "options": [
                  {
                    "id": "opt-ko-1",
                    "text": "안녕하세요 (Annyeonghaseyo)",
                    "translation": "Hello"
                  },
                  {
                    "id": "opt-ko-2",
                    "text": "안녕히 가세요 (Annyeonghi gaseyo)",
                    "translation": "Goodbye"
                  },
                  {
                    "id": "opt-ko-3",
                    "text": "감사합니다 (Gamsahamnida)",
                    "translation": "Thank you"
                  },
                  {
                    "id": "opt-ko-4",
                    "text": "죄송합니다 (Joesonghamnida)",
                    "translation": "I am sorry"
                  }
                ]
              }
            },
            {
              "id": "ex-ko-2",
              "lessonId": "lesson-ko-101",
              "type": "TRANSLATION",
              "prompt": "Translate to Korean: \"Thank you\"",
              "instruction": "Type your answer in Hangul or Romaji",
              "order": 2,
              "explanation": "\"감사합니다\" (Gamsahamnida) or \"고마워요\" (Gomawoyo) is how you express gratitude.",
              "data": {
                "acceptableAnswers": [
                  "감사합니다",
                  "고마워요",
                  "gamsahamnida",
                  "kamsahamnida",
                  "gomawoyo"
                ]
              }
            },
            {
              "id": "ex-ko-3",
              "lessonId": "lesson-ko-101",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Korean phrases with their English meanings:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Essential polite Korean expressions.",
              "data": {
                "pairs": [
                  {
                    "id": "ko-p1",
                    "leftText": "안녕하세요",
                    "rightText": "Hello"
                  },
                  {
                    "id": "ko-p2",
                    "leftText": "감사합니다",
                    "rightText": "Thank you"
                  },
                  {
                    "id": "ko-p3",
                    "leftText": "죄송합니다",
                    "rightText": "I am sorry"
                  },
                  {
                    "id": "ko-p4",
                    "leftText": "네",
                    "rightText": "Yes"
                  }
                ]
              }
            },
            {
              "id": "ex-ko-4",
              "lessonId": "lesson-ko-101",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "Speak this phrase out loud in Korean:",
              "instruction": "Practice smooth intonation without harsh English stress",
              "order": 4,
              "explanation": "Remember to pronounce \"ㅎ\" (h) gently and connect syllables smoothly.",
              "data": {
                "phraseToSpeak": "안녕하세요, 반갑습니다",
                "phoneticGuide": "ahn-nyungh-hah-seh-yoh, bahn-gahp-seum-nee-dah"
              }
            }
          ]
        },
        {
          "id": "lesson-ko-102",
          "unitId": "unit-ko-1",
          "lessonNumber": 2,
          "title": "Introducing Yourself & Topic Marker 은/는",
          "type": "standard",
          "xpReward": 15,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ko-5",
              "lessonId": "lesson-ko-102",
              "type": "WORD_ORDER",
              "prompt": "Construct the sentence: \"I am Minho\" (저는 민호예요)",
              "instruction": "Tap words in the correct SOV order",
              "order": 1,
              "explanation": "저 (jeo = humble \"I\") + 는 (neun = topic marker after vowel) + 민호 (Minho) + 예요 (yeyo = copula after vowel).",
              "data": {
                "sourcePrompt": "I am Minho",
                "wordBank": [
                  "저는",
                  "민호예요",
                  "입니다",
                  "학생",
                  "을"
                ],
                "correctOrder": [
                  "저는",
                  "민호예요"
                ]
              }
            },
            {
              "id": "ex-ko-6",
              "lessonId": "lesson-ko-102",
              "type": "FILL_IN_THE_BLANK",
              "prompt": "Select the topic marker used after a vowel-ending word (저):",
              "instruction": "Choose 은 or 는",
              "order": 2,
              "explanation": "Words ending in a vowel take 는 (*jeo-neun*), while words ending in a consonant take 은 (*haksaeng-eun*).",
              "data": {
                "sentenceWithBlank": "저___ 학생이에요. (I am a student)",
                "options": [
                  "는",
                  "은",
                  "을",
                  "를"
                ],
                "acceptableAnswers": [
                  "는"
                ]
              }
            },
            {
              "id": "ex-ko-7",
              "lessonId": "lesson-ko-102",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "Listen to the audio and select what the speaker says:",
              "instruction": "Listen carefully and select the spoken phrase",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/greeting_ko.mp3",
              "order": 3,
              "explanation": "The speaker greets: \"반갑습니다\" (Nice to meet you).",
              "data": {
                "transcript": "반갑습니다 (Bangawoyo / Bangapseumnida)",
                "correctOptionId": "opt-aud-ko-1",
                "options": [
                  {
                    "id": "opt-aud-ko-1",
                    "text": "반갑습니다 (Nice to meet you)"
                  },
                  {
                    "id": "opt-aud-ko-2",
                    "text": "안녕히 계세요 (Goodbye)"
                  },
                  {
                    "id": "opt-aud-ko-3",
                    "text": "화장실이 어디예요? (Where is the restroom?)"
                  },
                  {
                    "id": "opt-aud-ko-4",
                    "text": "이거 주세요 (Please give me this)"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-ko-103",
          "unitId": "unit-ko-1",
          "lessonNumber": 3,
          "title": "Unit 1 Checkpoint: Korean Foundations",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 3,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ko-8",
              "lessonId": "lesson-ko-103",
              "type": "TRUE_FALSE",
              "prompt": "Read the statement and determine if it is True or False:",
              "instruction": "Verify linguistic accuracy",
              "order": 1,
              "explanation": "Hangul is an alphabetic syllabary created under King Sejong in 1443 where letters are assembled into syllabic blocks.",
              "data": {
                "statement": "Hangul letters are combined into syllable blocks rather than written in a straight horizontal line.",
                "isTrue": true
              }
            },
            {
              "id": "ex-ko-9",
              "lessonId": "lesson-ko-103",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Jeoneun Jisoo-yeyo\"",
              "instruction": "Type your answer in English",
              "order": 2,
              "explanation": "\"I am Jisoo\" or \"My name is Jisoo\".",
              "data": {
                "acceptableAnswers": [
                  "I am Jisoo",
                  "I am Jisoo.",
                  "My name is Jisoo",
                  "My name is Jisoo."
                ]
              }
            },
            {
              "id": "ex-ko-c1-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "한국어로 정중하게 첫인사를 나누세요:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 3,
              "explanation": "Standard polite formal introductory statement upon meeting someone for the first time.",
              "data": {
                "phraseToSpeak": "처음 뵙겠습니다. 반갑습니다.",
                "phoneticGuide": "Cheo-eum boep-get-seum-ni-da. Ban-gap-seum-ni-da."
              },
              "lessonId": "lesson-ko-103"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-ko-2",
      "courseId": "course-ko-en",
      "unitNumber": 2,
      "title": "Unit 2: At The Restaurant & Ordering (이거 주세요)",
      "description": "Order delicious Korean food, ask for water, and use \"juseyo\" (please give me).",
      "themeColor": "#1CB0F6",
      "icon": "coffee",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-ko-201",
          "unitId": "unit-ko-2",
          "lessonNumber": 1,
          "title": "Ordering Food with \"Juseyo\"",
          "type": "standard",
          "xpReward": 15,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ko-10",
              "lessonId": "lesson-ko-201",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you say \"Please give me this\" when pointing at a menu in Korea?",
              "instruction": "Select the correct phrase",
              "order": 1,
              "explanation": "이거 주세요 (Igeo juseyo) combines \"igeo\" (this thing) + \"juseyo\" (please give me).",
              "data": {
                "correctOptionId": "opt-ko-c1",
                "options": [
                  {
                    "id": "opt-ko-c1",
                    "text": "이거 주세요 (Igeo juseyo)"
                  },
                  {
                    "id": "opt-ko-c2",
                    "text": "저거 뭐예요 (Jeogeo mwoyeyo)"
                  },
                  {
                    "id": "opt-ko-c3",
                    "text": "안녕히 가세요 (Annyeonghi gaseyo)"
                  },
                  {
                    "id": "opt-ko-c4",
                    "text": "한국 사람 (Hanguk saram)"
                  }
                ]
              }
            },
            {
              "id": "ex-ko-11",
              "lessonId": "lesson-ko-201",
              "type": "WORD_ORDER",
              "prompt": "Construct: \"Water, please\" (물 주세요)",
              "instruction": "Order the words properly",
              "order": 2,
              "explanation": "물 (mul = water) + 주세요 (juseyo = please give me).",
              "data": {
                "sourcePrompt": "Water, please",
                "wordBank": [
                  "물",
                  "주세요",
                  "밥",
                  "차",
                  "네"
                ],
                "correctOrder": [
                  "물",
                  "주세요"
                ]
              }
            },
            {
              "id": "ex-ko-12",
              "lessonId": "lesson-ko-201",
              "type": "MATCHING_PAIRS",
              "prompt": "Match Korean food terms with English:",
              "instruction": "Pair items correctly",
              "order": 3,
              "explanation": "Essential Korean food and restaurant vocabulary.",
              "data": {
                "pairs": [
                  {
                    "id": "kp-c1",
                    "leftText": "물 (Mul)",
                    "rightText": "Water"
                  },
                  {
                    "id": "kp-c2",
                    "leftText": "밥 (Bap)",
                    "rightText": "Rice / Meal"
                  },
                  {
                    "id": "kp-c3",
                    "leftText": "맛있어요 (Masisseoyo)",
                    "rightText": "Delicious / Tasty"
                  },
                  {
                    "id": "kp-c4",
                    "leftText": "메뉴판 (Menupan)",
                    "rightText": "Menu"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-ko-202",
          "unitId": "unit-ko-2",
          "lessonNumber": 2,
          "title": "Unit 2 Checkpoint: Dining Mastery",
          "type": "checkpoint",
          "xpReward": 25,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ko-13",
              "lessonId": "lesson-ko-202",
              "type": "TRANSLATION",
              "prompt": "Translate to English: \"Igeo masisseoyo!\"",
              "instruction": "Type your answer in English",
              "order": 1,
              "explanation": "\"This is delicious!\" or \"This is tasty!\".",
              "data": {
                "acceptableAnswers": [
                  "This is delicious!",
                  "This is delicious",
                  "This is tasty",
                  "This is tasty!"
                ]
              }
            },
            {
              "id": "ex-ko-c2-listen",
              "type": "LISTENING_COMPREHENSION",
              "prompt": "식당 직원의 말을 듣고 알맞은 표현을 고르세요:",
              "instruction": "Listen carefully and select the spoken question",
              "audioUrl": "https://actions.google.com/sounds/v1/speech/ko_cafe_order.mp3",
              "order": 2,
              "explanation": "Universal café/restaurant query: \"Would you like to order?\".",
              "data": {
                "audioUrl": "https://actions.google.com/sounds/v1/speech/ko_cafe_order.mp3",
                "transcript": "주문하시겠어요?",
                "correctOptionId": "opt-ko-c2-1",
                "options": [
                  {
                    "id": "opt-ko-c2-1",
                    "text": "주문하시겠어요?"
                  },
                  {
                    "id": "opt-ko-c2-2",
                    "text": "화장실이 어디예요?"
                  },
                  {
                    "id": "opt-ko-c2-3",
                    "text": "계산해 주세요"
                  },
                  {
                    "id": "opt-ko-c2-4",
                    "text": "얼마예요?"
                  }
                ]
              },
              "lessonId": "lesson-ko-202"
            }
          ]
        }
      ]
    },
    {
      "id": "unit-ko-3",
      "courseId": "course-ko-en",
      "unitNumber": 3,
      "title": "Unit 3: Navigating Seoul & Directions",
      "description": "Ask where subway stations are located and find your way in Korean cities.",
      "themeColor": "#FF9600",
      "icon": "map-pin",
      "status": "published",
      "lessons": [
        {
          "id": "lesson-ko-301",
          "unitId": "unit-ko-3",
          "lessonNumber": 1,
          "title": "Asking \"Where is...?\" (어디예요?)",
          "type": "standard",
          "xpReward": 20,
          "order": 1,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ko-14",
              "lessonId": "lesson-ko-301",
              "type": "MULTIPLE_CHOICE",
              "prompt": "How do you ask \"Where is the subway station?\" in Korean?",
              "instruction": "Select the correct question",
              "order": 1,
              "explanation": "지하철역이 어디예요? (Jihacheol-yeogi eodiyeyo?) means \"Where is the subway station?\".",
              "data": {
                "correctOptionId": "opt-dir-ko-1",
                "options": [
                  {
                    "id": "opt-dir-ko-1",
                    "text": "지하철역이 어디예요?"
                  },
                  {
                    "id": "opt-dir-ko-2",
                    "text": "지하철역이 누구예요?"
                  },
                  {
                    "id": "opt-dir-ko-3",
                    "text": "지하철역 주세요"
                  },
                  {
                    "id": "opt-dir-ko-4",
                    "text": "지하철역 감사합니다"
                  }
                ]
              }
            },
            {
              "id": "ex-ko-15",
              "lessonId": "lesson-ko-301",
              "type": "MATCHING_PAIRS",
              "prompt": "Match location and direction words in Korean:",
              "instruction": "Connect Korean terms with English",
              "order": 2,
              "explanation": "Navigational vocabulary for getting around Korea.",
              "data": {
                "pairs": [
                  {
                    "id": "ko-dp1",
                    "leftText": "역 (Yeok)",
                    "rightText": "Station"
                  },
                  {
                    "id": "ko-dp2",
                    "leftText": "화장실 (Hwajangsil)",
                    "rightText": "Restroom"
                  },
                  {
                    "id": "ko-dp3",
                    "leftText": "오른쪽 (Oreunjjok)",
                    "rightText": "Right side"
                  },
                  {
                    "id": "ko-dp4",
                    "leftText": "왼쪽 (Oenjjok)",
                    "rightText": "Left side"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "lesson-ko-302",
          "unitId": "unit-ko-3",
          "lessonNumber": 2,
          "title": "Unit 3 Checkpoint: Navigation Mastery",
          "type": "checkpoint",
          "xpReward": 30,
          "order": 2,
          "status": "published",
          "exercises": [
            {
              "id": "ex-ko-16",
              "lessonId": "lesson-ko-302",
              "type": "TRANSLATION",
              "prompt": "Translate: \"Silryehamnida, hwajangsil-i eodiyeyo?\"",
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
              "id": "ex-ko-c3-speak",
              "type": "SPEAKING_PRONUNCIATION",
              "prompt": "지하철역 위치를 한국어로 물어보세요:",
              "instruction": "Speak the phrase clearly into your microphone",
              "order": 2,
              "explanation": "Essential street navigation sentence using polite informal ending -eo-di-ye-yo.",
              "data": {
                "phraseToSpeak": "실례합니다, 지하철역이 어디예요?",
                "phoneticGuide": "Sil-lye-ham-ni-da, ji-ha-cheol-yeo-gi eo-di-ye-yo?"
              },
              "lessonId": "lesson-ko-302"
            }
          ]
        }
      ]
    }
  ]
};
