import { Schema, model, Document } from 'mongoose';

export interface ICourse extends Document {
  code: string; // e.g., "es-en"
  title: string;
  description: string;
  fromLanguage: string;
  toLanguage: string;
  flagIcon: string;
  status: 'draft' | 'published' | 'archived';
  order: number;
  totalUnits: number;
  totalLessons: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    fromLanguage: {
      type: String,
      required: true,
      default: 'en',
    },
    toLanguage: {
      type: String,
      required: true,
      default: 'es',
    },
    flagIcon: {
      type: String,
      default: '🇪🇸',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    totalUnits: {
      type: Number,
      default: 0,
    },
    totalLessons: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = model<ICourse>('Course', CourseSchema);
