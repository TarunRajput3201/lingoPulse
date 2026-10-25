import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUserPreferences {
  dailyGoalMinutes: 5 | 10 | 15 | 20;
  soundEffects: boolean;
  hapticFeedback: boolean;
  dailyReminder: boolean;
  reminderTime: string;
  theme: 'light' | 'dark' | 'system';
  timezone: string;
}

export interface IUser extends Document {
  email: string;
  password?: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  role: 'learner' | 'admin' | 'creator';
  nativeLanguage: string;
  targetLanguage: string;
  learningLevel: 'beginner' | 'elementary' | 'intermediate' | 'advanced';
  preferences: IUserPreferences;
  hearts: number;
  maxHearts: number;
  lastHeartRefillAt: Date;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // "YYYY-MM-DD"
  hasCompletedOnboarding: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  toSafeProfile(): any;
}

const UserPreferencesSchema = new Schema<IUserPreferences>(
  {
    dailyGoalMinutes: { type: Number, enum: [5, 10, 15, 20], default: 10 },
    soundEffects: { type: Boolean, default: true },
    hapticFeedback: { type: Boolean, default: true },
    dailyReminder: { type: Boolean, default: true },
    reminderTime: { type: String, default: '19:00' },
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
    timezone: { type: String, default: 'UTC' },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['learner', 'admin', 'creator'],
      default: 'learner',
      index: true,
    },
    nativeLanguage: {
      type: String,
      default: 'en',
    },
    targetLanguage: {
      type: String,
      default: 'es',
    },
    learningLevel: {
      type: String,
      enum: ['beginner', 'elementary', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    preferences: {
      type: UserPreferencesSchema,
      default: () => ({}),
    },
    hearts: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    maxHearts: {
      type: Number,
      default: 5,
    },
    lastHeartRefillAt: {
      type: Date,
      default: Date.now,
    },
    totalXp: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
    currentStreak: {
      type: Number,
      default: 0,
      min: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastActiveDate: {
      type: String,
      default: '',
    },
    hasCompletedOnboarding: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.toSafeProfile = function () {
  return {
    id: this._id.toString(),
    email: this.email,
    username: this.username,
    displayName: this.displayName,
    avatarUrl: this.avatarUrl,
    role: this.role,
    nativeLanguage: this.nativeLanguage,
    targetLanguage: this.targetLanguage,
    learningLevel: this.learningLevel,
    preferences: this.preferences,
    hearts: this.hearts,
    maxHearts: this.maxHearts,
    lastHeartRefillAt: this.lastHeartRefillAt?.toISOString(),
    totalXp: this.totalXp,
    currentStreak: this.currentStreak,
    longestStreak: this.longestStreak,
    lastActiveDate: this.lastActiveDate,
    hasCompletedOnboarding: this.hasCompletedOnboarding,
    createdAt: this.createdAt?.toISOString(),
    updatedAt: this.updatedAt?.toISOString(),
  };
};

export const User = model<IUser>('User', UserSchema);
