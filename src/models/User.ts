import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isProUser: boolean;
  walletAddress?: string;
  profileStats: {
    totalSolves: number;
    averageSolveTime: number;
    bestSolveTime: number;
    completedTutorials: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  isProUser: {
    type: Boolean,
    default: false,
  },
  walletAddress: {
    type: String,
    trim: true,
    match: [/^0x[a-fA-F0-9]{40}$/, 'Please enter a valid Ethereum wallet address'],
  },
  profileStats: {
    totalSolves: {
      type: Number,
      default: 0,
    },
    averageSolveTime: {
      type: Number,
      default: 0,
    },
    bestSolveTime: {
      type: Number,
      default: 0,
    },
    completedTutorials: {
      type: [String],
      default: [],
    },
  },
}, {
  timestamps: true,
});

// Hash password before saving
UserSchema.pre('save', async function(next: any) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
