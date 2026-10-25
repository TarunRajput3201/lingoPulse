import { Schema, model, Document, Types } from 'mongoose';

export interface ICompletedLesson {
  lessonId: Types.ObjectId;
  completedAt: Date;
  accuracy: number;
  xpEarned: number;
}

export interface IProgress extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  completedLessons: ICompletedLesson[];
  activeLessonId?: Types.ObjectId;
  lastStudiedAt: Date;
  courseCompletionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

const CompletedLessonSchema = new Schema<ICompletedLesson>(
  {
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    accuracy: {
      type: Number,
      default: 100,
    },
    xpEarned: {
      type: Number,
      default: 15,
    },
  },
  { _id: false }
);

const ProgressSchema = new Schema<IProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },
    completedLessons: [CompletedLessonSchema],
    activeLessonId: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    },
    lastStudiedAt: {
      type: Date,
      default: Date.now,
    },
    courseCompletionPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const Progress = model<IProgress>('Progress', ProgressSchema);
