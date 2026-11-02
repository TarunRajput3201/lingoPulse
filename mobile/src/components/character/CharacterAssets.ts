/**
 * 3D Character Asset Registry for LingoPulse
 * Provides static bindings for high-end 3D Pixar/Disney style characters:
 * - Maya: The Lead Language Guide (warm, encouraging, expressive)
 * - Pip: The AI Companion Robot (cute, futuristic, playful)
 * - Leo: The Advanced Cultural Mentor (confident, sophisticated, bilingual)
 */

export const CHARACTER_IMAGES = {
  maya: {
    welcome: require('../../../assets/characters/maya_welcome.jpg'),
    french: require('../../../assets/characters/maya_french.jpg'),
    wink: require('../../../assets/characters/maya_wink.jpg'),
    avatar: require('../../../assets/characters/maya_wink.jpg'),
  },
  pip: {
    companion: require('../../../assets/characters/pip_companion.jpg'),
    levelUp: require('../../../assets/characters/pip_level_up.jpg'),
    helper: require('../../../assets/characters/pip_helper.jpg'),
    celebrate: require('../../../assets/characters/pip_level_up.jpg'),
  },
  leo: {
    mentor: require('../../../assets/characters/leo_mentor.jpg'),
    advanced: require('../../../assets/characters/leo_mentor.jpg'),
  },
  objects: {
    coffeeCup: require('../../../assets/characters/coffee_cup.jpg'),
  },
};

export type CharacterId = 'maya' | 'pip' | 'leo';
export type MayaPose = 'welcome' | 'french' | 'wink';
export type PipPose = 'companion' | 'levelUp' | 'helper' | 'celebrate';
export type LeoPose = 'mentor' | 'advanced';
