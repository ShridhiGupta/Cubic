import mongoose, { Document, Schema } from 'mongoose';

export interface ITutorial extends Document {
  title: string;
  slug: string;
  category: "CROSS" | "F2L" | "OLL" | "PLL" | "BASICS";
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  content: string;
  videoEmbed?: string;
  steps: {
    title: string;
    description: string;
    cubeState: string;
    moves: string[];
  }[];
  prerequisites: string[];
  estimatedTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const TutorialSchema = new Schema<ITutorial>({
  title: {
    type: String,
    required: [true, 'Tutorial title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Tutorial slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
  },
  category: {
    type: String,
    required: [true, 'Tutorial category is required'],
    enum: ['CROSS', 'F2L', 'OLL', 'PLL', 'BASICS'],
  },
  difficulty: {
    type: String,
    required: [true, 'Tutorial difficulty is required'],
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
  },
  content: {
    type: String,
    required: [true, 'Tutorial content is required'],
  },
  videoEmbed: {
    type: String,
    trim: true,
  },
  steps: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cubeState: {
      type: String,
      required: true,
      validate: {
        validator: function(v: string) {
          return v.length === 54 && /^[UDFBLR]+$/.test(v);
        },
        message: 'Cube state must be exactly 54 characters using only U, D, F, B, L, R',
      },
    },
    moves: [{
      type: String,
      required: true,
    }],
  }],
  prerequisites: [{
    type: String,
    trim: true,
  }],
  estimatedTime: {
    type: Number,
    required: [true, 'Estimated time is required'],
    min: [1, 'Estimated time must be at least 1 minute'],
  },
}, {
  timestamps: true,
});

// Index for faster queries
TutorialSchema.index({ category: 1, difficulty: 1 });
TutorialSchema.index({ slug: 1 });

export default mongoose.models.Tutorial || mongoose.model<ITutorial>('Tutorial', TutorialSchema);
