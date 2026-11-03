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
  card3D: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderBottomWidth: 5,
    borderBottomColor: '#CBD5E1',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  modal: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 16,
  },
  float: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
  elevatedFloating: {
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 14,
  },
  glassmorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 16,
    elevation: 6,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  }),
};

/**
 * Educational Gaming Research Palette (Sweller's Cognitive Load & Color Psychology)
 * Specifically tuned for focused retention, joyful motivation, and high accessibility (WCAG AA/AAA).
 */
export const RESEARCH_PALETTE = {
  // Emerald / Mint: Focus, Growth, Memory Consolidation (Teacher Maya)
  growth: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981', // Key Emerald
    600: '#047857', // Primary Button & Active State (WCAG AA 5.2:1)
    700: '#064E3B', // 3D Bottom Lip Bevel (WCAG AAA 7.8:1)
    800: '#065F46',
    900: '#064E3B',
  },
  // Cerulean / Sky: Audio, Phonetics, Listening, Clarity (Coach Leo)
  audio: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9', // Key Azure
    600: '#0369A1', // Audio Wave & Voice (WCAG AA 5.4:1)
    700: '#075985', // 3D Bevel (WCAG AAA 7.3:1)
    800: '#075985',
    900: '#0C4A6E',
  },
  // Violet / Amethyst: Intellect, Deep Focus, Speed Quizzes (Challenge Kael)
  challenge: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6', // Key Amethyst
    600: '#7C3AED', // Boss Challenges & Speed
    700: '#6D28D9', // 3D Bevel
    800: '#5B21B6',
    900: '#4C1D95',
  },
  // Amber / Gold: Dopamine Response, Streaks, XP, Achievement (Companion Pip)
  reward: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Solar Amber
    600: '#D97706', // Streak Flame & Crowns
    700: '#B45309', // 3D Bevel
    800: '#92400E',
    900: '#78350F',
  },
  // Coral / Crimson: Low-Anxiety, High-Contrast Corrective Cues
  correction: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Cardinal Coral
    600: '#DC2626', // Review & Error Drawer
    700: '#B91C1C', // 3D Bevel
    800: '#991B1B',
    900: '#7F1D1D',
  },
  // Slate / Canvas: High-Legibility Neutral Scales
  neutrals: {
    50: '#F8FAFC',  // Pearl White Surface
    100: '#F1F5F9', // Subtle Background
    200: '#E2E8F0', // Border Standard
    300: '#CBD5E1', // Border Dark Bevel
    400: '#94A3B8', // Placeholder Text
    500: '#64748B', // Secondary Text
    600: '#475569', // Body Text Light
    700: '#334155', // High Contrast Body
    800: '#1E293B', // Dark Surface
    900: '#0F172A', // Obsidian Canvas
    950: '#0B0F19', // Deep Void
  },
};

/**
 * 3D Environmental Lighting Presets for Three.js Scenes
 */
export const ENVIRONMENT_3D = {
  daylight: {
    skyColor: 0xEEF6FF,
    groundColor: 0xE2E8F0,
    ambientLight: { color: 0xFFFFFF, intensity: 1.1 },
    keyLight: { color: 0xFFFBEB, intensity: 1.5, position: [3, 6, 4] as [number, number, number] },
    fillLight: { color: 0xDDF4FF, intensity: 0.6, position: [-4, 3, -2] as [number, number, number] },
    rimLight: { color: 0x38BDF8, intensity: 0.9, position: [0, 4, -4] as [number, number, number] },
    pedestalTop: 0xDCFCE7,
    pedestalBorder: 0x86EFAC,
    pedestalBottom: 0x16A34A,
    shadowColor: 'rgba(15, 23, 42, 0.18)',
  },
  evening: {
    skyColor: 0x1E1B4B,
    groundColor: 0x0F172A,
    ambientLight: { color: 0xDDD6FE, intensity: 0.7 },
    keyLight: { color: 0xFDE68A, intensity: 1.6, position: [3, 5, 4] as [number, number, number] },
    fillLight: { color: 0x818CF8, intensity: 0.8, position: [-4, 2, -2] as [number, number, number] },
    rimLight: { color: 0xC084FC, intensity: 1.2, position: [0, 5, -3] as [number, number, number] },
    pedestalTop: 0x312E81,
    pedestalBorder: 0x6366F1,
    pedestalBottom: 0x4338CA,
    shadowColor: 'rgba(0, 0, 0, 0.35)',
  },
  celebration: {
    skyColor: 0xFFFBEB,
    groundColor: 0xFEF3C7,
    ambientLight: { color: 0xFFFDF2, intensity: 1.3 },
    keyLight: { color: 0xF59E0B, intensity: 2.0, position: [2, 6, 3] as [number, number, number] },
    fillLight: { color: 0x38BDF8, intensity: 0.9, position: [-3, 3, -1] as [number, number, number] },
    rimLight: { color: 0xF43F5E, intensity: 1.4, position: [0, 6, -3] as [number, number, number] },
    pedestalTop: 0xFEF08A,
    pedestalBorder: 0xFACC15,
    pedestalBottom: 0xCA8A04,
    shadowColor: 'rgba(217, 119, 6, 0.25)',
  },
};

