import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/jwt';
import { validateEmail } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    console.log('Login API called');
    
    const body = await request.json();
    const { email, password } = body;

    console.log('Received login data:', { email, password: '***' });

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
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

    // Mock user authentication (without database)
    // In a real app, you would check against the database
    const mockUser = {
      _id: 'mock-user-id-12345',
      username: 'testuser',
      email: email,
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

    console.log('Login successful, token generated');

    return NextResponse.json({
      message: 'Login successful',
      user: mockUser,
      token,
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
