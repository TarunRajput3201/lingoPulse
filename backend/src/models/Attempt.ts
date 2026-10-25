import { Schema, model, Document, Types } from 'mongoose';

export interface IAttempt extends Document {
  userId: Types.ObjectId;
  lessonId: Types.ObjectId;
  exerciseId: Types.ObjectId;
  isCorrect: boolean;
  userAnswer: any;
  durationMs: number;
  reviewed: boolean;
  createdAt: Date;
}

const AttemptSchema = new Schema<IAttempt>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
      index: true,
    },
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
      index: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
      index: true,
    },
    userAnswer: {
      type: Schema.Types.Mixed,
      required: true,
    },
    durationMs: {
      type: Number,
      default: 0,
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

AttemptSchema.index({ userId: 1, isCorrect: 1, reviewed: 1 });

export const Attempt = model<IAttempt>('Attempt', AttemptSchema);
