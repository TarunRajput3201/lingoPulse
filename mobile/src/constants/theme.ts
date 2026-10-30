/**
 * LingoPulse Unified Design System & Semantic Design Tokens
 * Follows accessibility contrast standards (WCAG AAA / AA)
 * Crafted for focus, high engagement, and pleasant long-session learning.
 */

export const COLORS = {
  // Brand Primary (Fresh, confident emerald green - growth, achievement, success)
  primary: '#059669',
  primaryDark: '#047857',
  primaryLight: '#D1FAE5',
  primarySubtle: '#ECFDF5',

  // Brand Secondary (Deep oceanic blue / indigo - action, interaction, clarity)
  secondary: '#2563EB',
  secondaryDark: '#1D4ED8',
  secondaryLight: '#DBEAFE',
  secondarySubtle: '#EFF6FF',

  // Accent (Warm coral rose - error, heart depletion, alerts)
  accent: '#EF4444',
  accentDark: '#DC2626',
  accentLight: '#FEE2E2',
  accentSubtle: '#FEF2F2',

  // Gold / Amber (Warm luminous gold - daily streak, XP, rewards, crowns)
  gold: '#F59E0B',
  goldDark: '#D97706',
  goldLight: '#FEF3C7',
  goldSubtle: '#FFFBEB',

  // Amethyst Purple (Milestones, gems, elite leagues, achievements)
  purple: '#8B5CF6',
  purpleDark: '#7C3AED',
  purpleLight: '#EDE9FE',
  purpleSubtle: '#FAF5FF',

  // Neutral Scales (Deep navy charcoal for high contrast, slate for body, muted for secondary)
  charcoal: '#0F172A', // Slate 900
  slateDark: '#1E293B', // Slate 800
  slate: '#334155', // Slate 700
  grayText: '#64748B', // Slate 500
  grayLight: '#94A3B8', // Slate 400
  grayBorder: '#E2E8F0', // Slate 200
  grayBorderLight: '#F1F5F9', // Slate 100
  grayBackground: '#F8FAFC', // Slate 50 - Warm clean porcelain canvas

  // Surfaces & Semantic Feedback
  white: '#FFFFFF',
  surfaceCard: '#FFFFFF',
  surfaceSubtle: '#F8FAFC',
  success: '#059669',
  successLight: '#D1FAE5',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',

  // Locked / Inactive State
  locked: '#94A3B8',
  lockedBackground: '#F1F5F9',
  lockedBorder: '#CBD5E1',
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
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  full: 9999,
  pill: 9999,
};

export const SHADOWS = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHover: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 4,
  },
  floating: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.primaryDark,
  },
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.secondaryDark,
  },
  buttonAccent: {
    backgroundColor: COLORS.accent,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.accentDark,
  },
  buttonGold: {
    backgroundColor: COLORS.gold,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.goldDark,
  },
  buttonOutline: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.grayBorder,
  },
};
