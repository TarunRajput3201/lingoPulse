import { Schema, model, Document, Types } from 'mongoose';

export interface IUnit extends Document {
  courseId: Types.ObjectId;
  unitNumber: number;
  title: string;
  description: string;
  themeColor: string;
  icon: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const UnitSchema = new Schema<IUnit>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      index: true,
    },
    unitNumber: {
      type: Number,
      required: true,
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
    themeColor: {
      type: String,
      default: '#58CC02',
    },
    icon: {
      type: String,
      default: 'sparkles',
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

UnitSchema.index({ courseId: 1, unitNumber: 1 }, { unique: true });

export const Unit = model<IUnit>('Unit', UnitSchema);
