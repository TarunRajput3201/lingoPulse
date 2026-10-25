export const COLORS = {
  primary: '#58CC02', // Lively Grass Green
  primaryDark: '#46A302', // 3D Button shadow
  secondary: '#1CB0F6', // Sky Blue
  secondaryDark: '#1899D6',
  accent: '#FF4B4B', // Coral Red (Error, Hearts)
  accentDark: '#EA2B2B',
  gold: '#FFC800', // Gold/Yellow (XP, Streaks)
  goldDark: '#E5A500',
  purple: '#CE82FF', // Gem/Milestone
  purpleDark: '#A855F7',
  charcoal: '#3C3C3C',
  slateDark: '#1E293B',
  grayBackground: '#F7F7F7',
  grayBorder: '#E5E5E5',
  grayText: '#777777',
  white: '#FFFFFF',
  surfaceCard: '#FFFFFF',
  successLight: '#D7FFB8',
  errorLight: '#FFDFE0',
};

export const SHADOWS = {
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
  buttonOutline: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.grayBorder,
    borderBottomWidth: 4,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
};

export const RADII = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 9999,
};
