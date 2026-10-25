import { Schema, model, Document, Types } from 'mongoose';

export interface ILesson extends Document {
  unitId: Types.ObjectId;
  lessonNumber: number;
  title: string;
  type: 'standard' | 'checkpoint' | 'review' | 'assessment';
  xpReward: number;
  order: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>(
  {
    unitId: {
      type: Schema.Types.ObjectId,
      ref: 'Unit',
      required: true,
      index: true,
    },
    lessonNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['standard', 'checkpoint', 'review', 'assessment'],
      default: 'standard',
    },
    xpReward: {
      type: Number,
      default: 15,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

LessonSchema.index({ unitId: 1, lessonNumber: 1 });

export const Lesson = model<ILesson>('Lesson', LessonSchema);
