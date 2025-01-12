import mongoose from 'mongoose';
import type { SignupValidationType } from '@/lib/validations/user';

const userSchema = new mongoose.Schema<SignupValidationType>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 