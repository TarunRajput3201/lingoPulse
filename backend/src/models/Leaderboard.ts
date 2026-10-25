import { Schema, model, Document, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: Types.ObjectId;
  yearWeek: string; // e.g. "2026-W43"
  weeklyXp: number;
  league: 'bronze' | 'silver' | 'gold' | 'sapphire' | 'ruby' | 'diamond';
  createdAt: Date;
  updatedAt: Date;
}

const LeaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    yearWeek: {
      type: String,
      required: true,
      index: true,
    },
    weeklyXp: {
      type: Number,
      default: 0,
      index: true,
    },
    league: {
      type: String,
      enum: ['bronze', 'silver', 'gold', 'sapphire', 'ruby', 'diamond'],
      default: 'bronze',
    },
  },
  {
    timestamps: true,
  }
);

LeaderboardEntrySchema.index({ yearWeek: 1, weeklyXp: -1 });
LeaderboardEntrySchema.index({ userId: 1, yearWeek: 1 }, { unique: true });

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardEntrySchema);
