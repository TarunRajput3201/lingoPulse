/**
 * LingoPulse Unified Design System & Gamified Semantic Design Tokens
 * Inspired by top-tier modern language learning applications (Duolingo, Speak).
 * Vibrant, tactile, high-contrast, and delightfully habit-forming.
 */

export const COLORS = {
  // Brand Primary (Feather Green - Growth, Action, Success)
  primary: '#58CC02',
  primaryDark: '#46A302', // 3D Bottom Lip Bevel
  primaryLight: '#D7FFB8', // Soft pastel for correct feedback drawer
  primarySubtle: '#F2FFE5',

  // Brand Secondary (Macaw Sky Blue - Action, Selection, Audio)
  secondary: '#1CB0F6',
  secondaryDark: '#1899D6', // 3D Bottom Lip Bevel
  secondaryLight: '#DDF4FF', // Soft selection highlight
  secondarySubtle: '#F0F9FF',

  // Accent (Cardinal Red - Errors, Lost Hearts, Corrections)
  accent: '#FF4B4B',
  accentDark: '#EA2B2B', // 3D Bottom Lip Bevel
  accentLight: '#FFDFE0', // Soft pastel for incorrect feedback drawer
  accentSubtle: '#FFF0F0',

  // Bee Gold (Rewards, Crowns, Active START Node, 1st Place Podium)
  gold: '#FFC800',
  goldDark: '#E5A500', // 3D Bottom Lip Bevel
  goldLight: '#FFF5D1',
  goldSubtle: '#FFFDF2',

  // Fox Orange (Daily Habit Flame, Streak)
  orange: '#FF9600',
  orangeDark: '#E58500', // 3D Bottom Lip Bevel
  orangeLight: '#FFEACC',

  // Amethyst Purple (Milestones, Gems, Elite Leagues, Achievements)
  purple: '#CE82FF',
  purpleDark: '#A559D9', // 3D Bottom Lip Bevel
  purpleLight: '#F6E6FF',
  purpleSubtle: '#FAF5FF',

  // Neutral Scales (Warm Eel Charcoal for soft readable text, never harsh black)
  charcoal: '#4B4B4B', // Eel Charcoal
  slateDark: '#3C3C3C',
  slate: '#4B4B4B',
  grayText: '#777777', // Wolf Gray - Subheadings & captions
  grayLight: '#AFAFAF', // Beetle Gray - Disabled text / icons
  grayBorder: '#E5E5E5', // Hare Gray - Signature 2px card & button borders
  grayBorderDark: '#D6D6D6', // 3D bottom bevel for unselected tiles
  grayBackground: '#F7F7F7', // Polar Canvas - Warm, clean, bright background

  // Surfaces & Feedback
  white: '#FFFFFF',
  surfaceCard: '#FFFFFF',
  surfaceSubtle: '#F7F7F7',
  surfaceAlt: '#F7F7F7',
  success: '#58CC02',
  successDark: '#46A302',
  successLight: '#D7FFB8',
  error: '#FF4B4B',
  errorDark: '#EA2B2B',
  errorLight: '#FFDFE0',
  warning: '#FF9600',
  warningLight: '#FFEACC',

  // Locked / Inactive Stepping Stones & Buttons
  locked: '#E5E5E5',
  lockedDark: '#D6D6D6',
  lockedBackground: '#E5E5E5',
  lockedBorder: '#D6D6D6',
  lockedText: '#AFAFAF',
};

export const TYPOGRAPHY = {
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    display: 28,
    hero: 34,
  },
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
    black: '900' as const,
  },
  lineHeights: {
    tight: 1.15,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.65,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const RADII = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  card: 16,
  pill: 9999,
  circle: 9999,
};

export const SHADOWS = {
  tactileBevel: {
    borderBottomWidth: 4,
  },
  card: {
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.grayBorderDark,
  },
  modal: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  float: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  }),
};
