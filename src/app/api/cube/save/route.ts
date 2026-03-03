import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import CubeState from '@/models/CubeState';
import { verifyToken, extractTokenFromHeader } from '@/lib/jwt';
import { CubeState as ICubeState } from '@/types/cube';

export async function POST(request: NextRequest) {
  try {
    // Extract and verify token
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader || undefined);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token!);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      cubeConfiguration,
      solution,
      complexityLevel = 'INTERMEDIATE',
      performance = {
        engineLoad: 14.2,
        latency: 42,
        nodeUsed: 'mainnet-alpha-v02',
      }
    } = body;

    // Validate required fields
    if (!cubeConfiguration || !solution) {
      return NextResponse.json(
        { error: 'Cube configuration and solution are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Create new cube state
    const cubeState = new CubeState({
      userId: decoded.id,
      cubeConfiguration,
      solution: {
        moves: solution.moves || [],
        moveCount: solution.moveCount || 0,
        solveTime: solution.solveTime || 0,
        algorithm: solution.algorithm || 'Kociemba',
      },
      metadata: {
        complexityLevel,
        scrambleDate: new Date(),
        solvedDate: solution.moves?.length > 0 ? new Date() : undefined,
        isSolved: solution.moves?.length > 0,
        solveAttempts: 1,
      },
      performance,
    });

    await cubeState.save();

    return NextResponse.json(cubeState.toJSON(), { status: 201 });
  } catch (error) {
    console.error('Cube save error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Extract and verify token
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader || undefined);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token!);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const solved = searchParams.get('solved');

    // Build query
    const query: any = { userId: decoded.id };
    if (solved !== null) {
      query['metadata.isSolved'] = solved === 'true';
    }

    // Fetch cube states
    const cubeStates = await CubeState.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await CubeState.countDocuments(query);

    return NextResponse.json({
      cubeStates,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Cube fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
