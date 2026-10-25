import { Schema, model, Document, Types } from 'mongoose';

export type ExerciseType =
  | 'MULTIPLE_CHOICE'
  | 'FILL_IN_THE_BLANK'
  | 'TRANSLATION'
  | 'WORD_ORDER'
  | 'SENTENCE_CONSTRUCTION'
  | 'MATCHING_PAIRS'
  | 'IMAGE_SELECT'
  | 'LISTENING_COMPREHENSION'
  | 'TRUE_FALSE'
  | 'SPEAKING_PRONUNCIATION';

export interface IExercise extends Document {
  lessonId: Types.ObjectId;
  type: ExerciseType;
  prompt: string;
  instruction?: string;
  audioUrl?: string;
  imageUrl?: string;
  order: number;
  hint?: string;
  explanation?: string;
  // Dynamic payload for different types
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ExerciseSchema = new Schema<IExercise>(
  {
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'MULTIPLE_CHOICE',
        'FILL_IN_THE_BLANK',
        'TRANSLATION',
        'WORD_ORDER',
        'SENTENCE_CONSTRUCTION',
        'MATCHING_PAIRS',
        'IMAGE_SELECT',
        'LISTENING_COMPREHENSION',
        'TRUE_FALSE',
        'SPEAKING_PRONUNCIATION',
      ],
      index: true,
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    instruction: {
      type: String,
      default: '',
    },
    audioUrl: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    hint: {
      type: String,
      default: '',
    },
    explanation: {
      type: String,
      default: '',
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

ExerciseSchema.index({ lessonId: 1, order: 1 });

export const Exercise = model<IExercise>('Exercise', ExerciseSchema);
