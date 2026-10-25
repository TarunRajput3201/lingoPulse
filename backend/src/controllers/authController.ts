import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { ENV } from '../config/env';
import { User } from '../models/User';
import { Progress } from '../models/Progress';
import { Attempt } from '../models/Attempt';
import { UserAchievement } from '../models/Achievement';
import { LeaderboardEntry } from '../models/Leaderboard';
import { AuthenticatedRequest } from '../middleware/auth';
import { HeartService } from '../services/heartService';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(3).regex(/^[a-zA-Z0-9_]+$/, 'Alphanumeric and underscores only'),
  displayName: z.string().optional(),
  nativeLanguage: z.string().default('en'),
  targetLanguage: z.string().default('es'),
  learningLevel: z.enum(['beginner', 'elementary', 'intermediate', 'advanced']).default('beginner'),
  dailyGoalMinutes: z.union([z.literal(5), z.literal(10), z.literal(15), z.literal(20)]).default(10),
  timezone: z.string().default('UTC'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN } as any);
};

export const register = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const data = registerSchema.parse(req.body);

  const existingEmail = await User.findOne({ email: data.email.toLowerCase() });
  if (existingEmail) {
    res.status(409).json({ message: 'An account with this email already exists.' });
    return;
  }

  const existingUsername = await User.findOne({ username: data.username.toLowerCase() });
  if (existingUsername) {
    res.status(409).json({ message: 'This username is already taken. Please choose another.' });
    return;
  }

  const user = new User({
    email: data.email.toLowerCase(),
    password: data.password,
    username: data.username.toLowerCase(),
    displayName: data.displayName || data.username,
    nativeLanguage: data.nativeLanguage,
    targetLanguage: data.targetLanguage,
    learningLevel: data.learningLevel,
    preferences: {
      dailyGoalMinutes: data.dailyGoalMinutes,
      timezone: data.timezone,
    },
    hearts: 5,
    maxHearts: 5,
    lastHeartRefillAt: new Date(),
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    hasCompletedOnboarding: false,
  });

  await user.save();

  const token = generateToken(user._id.toString());

  res.status(201).json({
    user: user.toSafeProfile(),
    tokens: {
      accessToken: token,
      expiresIn: 30 * 24 * 3600,
    },
  });
};

export const login = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    res.status(401).json({ message: 'Invalid email or password.' });
    return;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(401).json({ message: 'Invalid email or password.' });
    return;
  }

  // Refresh hearts on login
  const { updated } = HeartService.refreshHearts(user);
  if (updated) await user.save();

  const token = generateToken(user._id.toString());

  res.json({
    user: user.toSafeProfile(),
    tokens: {
      accessToken: token,
      expiresIn: 30 * 24 * 3600,
    },
  });
};

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = req.user!;
  const { updated } = HeartService.refreshHearts(user);
  if (updated) await user.save();

  res.json({ user: user.toSafeProfile() });
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = req.user!;
  const { displayName, avatarUrl, targetLanguage, learningLevel, preferences } = req.body;

  if (displayName) user.displayName = displayName.trim();
  if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
  if (targetLanguage) user.targetLanguage = targetLanguage;
  if (learningLevel) user.learningLevel = learningLevel;

  if (preferences) {
    user.preferences = {
      ...user.preferences,
      ...preferences,
    };
  }

  await user.save();
  res.json({ user: user.toSafeProfile() });
};

export const completeOnboarding = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = req.user!;
  const { targetLanguage, learningLevel, dailyGoalMinutes, reminderTime } = req.body;

  if (targetLanguage) user.targetLanguage = targetLanguage;
  if (learningLevel) user.learningLevel = learningLevel;
  if (dailyGoalMinutes) user.preferences.dailyGoalMinutes = dailyGoalMinutes;
  if (reminderTime) user.preferences.reminderTime = reminderTime;

  user.hasCompletedOnboarding = true;
  await user.save();

  res.json({ user: user.toSafeProfile() });
};

export const deleteAccount = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user!._id;

  // GDPR/App Store compliant full data wipe
  await Promise.all([
    User.findByIdAndDelete(userId),
    Progress.deleteMany({ userId }),
    Attempt.deleteMany({ userId }),
    UserAchievement.deleteMany({ userId }),
    LeaderboardEntry.deleteMany({ userId }),
  ]);

  res.json({ message: 'Account and all associated learning records have been permanently deleted.' });
};
