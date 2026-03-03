import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/jwt';
import { validateEmail, validatePassword } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    console.log('Register API called');
    
    const body = await request.json();
    const { username, email, password } = body;

    console.log('Received data:', { username, email, password: '***' });

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Mock user creation (without database)
    const mockUser = {
      _id: 'mock-user-id-' + Date.now(),
      username,
      email,
      isProUser: false,
      profileStats: {
        totalSolves: 0,
        averageSolveTime: 0,
        bestSolveTime: 0,
        completedTutorials: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Generate token
    const token = generateToken(mockUser);

    console.log('Registration successful, token generated');

    return NextResponse.json({
      message: 'User registered successfully',
      user: mockUser,
      token,
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
