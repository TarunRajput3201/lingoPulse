import { Schema, model, Document, Types } from 'mongoose';

export interface IAchievement extends Document {
  code: string; // e.g. "STREAK_7", "FIRST_PERFECT", "XP_1000", "NIGHT_OWL"
  title: string;
  description: string;
  iconName: string;
  tier: 1 | 2 | 3;
  targetCount: number;
  xpReward: number;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      default: 'award',
    },
    tier: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    targetCount: {
      type: Number,
      required: true,
    },
    xpReward: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

export const Achievement = model<IAchievement>('Achievement', AchievementSchema);

export interface IUserAchievement extends Document {
  userId: Types.ObjectId;
  achievementId: Types.ObjectId;
  progress: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
}

const UserAchievementSchema = new Schema<IUserAchievement>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    achievementId: {
      type: Schema.Types.ObjectId,
      ref: 'Achievement',
      required: true,
      index: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    isUnlocked: {
      type: Boolean,
      default: false,
      index: true,
    },
    unlockedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

UserAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

export const UserAchievement = model<IUserAchievement>('UserAchievement', UserAchievementSchema);
