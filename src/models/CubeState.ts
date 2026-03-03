import mongoose, { Document, Schema } from 'mongoose';

export interface ICubeState extends Document {
  userId: mongoose.Types.ObjectId;
  cubeConfiguration: string;
  solution: {
    moves: string[];
    moveCount: number;
    solveTime: number;
    algorithm: string;
  };
  metadata: {
    complexityLevel: string;
    scrambleDate: Date;
    solvedDate?: Date;
    isSolved: boolean;
    solveAttempts: number;
  };
  performance: {
    engineLoad: number;
    latency: number;
    nodeUsed: string;
  };
  createdAt: Date;
}

const CubeStateSchema = new Schema<ICubeState>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  cubeConfiguration: {
    type: String,
    required: [true, 'Cube configuration is required'],
    validate: {
      validator: function(v: string) {
        return v.length === 54 && /^[UDFBLR]+$/.test(v);
      },
      message: 'Cube configuration must be exactly 54 characters using only U, D, F, B, L, R',
    },
  },
  solution: {
    moves: [{
      type: String,
      required: true,
    }],
    moveCount: {
      type: Number,
      required: true,
      min: 0,
    },
    solveTime: {
      type: Number,
      required: true,
      min: 0,
    },
    algorithm: {
      type: String,
      required: true,
      enum: ['Kociemba', 'LayerByLayer'],
    },
  },
  metadata: {
    complexityLevel: {
      type: String,
      required: true,
      enum: ['BEGINNER', 'INTERMEDIATE', 'GODS_NUMBER'],
      default: 'INTERMEDIATE',
    },
    scrambleDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    solvedDate: {
      type: Date,
    },
    isSolved: {
      type: Boolean,
      default: false,
    },
    solveAttempts: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  performance: {
    engineLoad: {
      type: Number,
      required: true,
      min: 0,
    },
    latency: {
      type: Number,
      required: true,
      min: 0,
    },
    nodeUsed: {
      type: String,
      required: true,
      default: 'mainnet-alpha-v02',
    },
  },
}, {
  timestamps: true,
});

// Index for faster queries
CubeStateSchema.index({ userId: 1, createdAt: -1 });
CubeStateSchema.index({ 'metadata.isSolved': 1 });

export default mongoose.models.CubeState || mongoose.model<ICubeState>('CubeState', CubeStateSchema);
