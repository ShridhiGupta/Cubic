import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '@/types/auth';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN_SECONDS = 7 * 24 * 60 * 60; // 7 days in seconds

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

export function generateToken(user: Omit<User, 'password'>): string {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    isProUser: user.isProUser,
  };
  
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN_SECONDS,
  };

  return jwt.sign(payload, JWT_SECRET as string, options);
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET as string);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}
