import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/jwt';
import { CubeSolver } from '@/lib/cube-solver';
import { SolverRequest, SolverResponse } from '@/types/cube';

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
    const body: SolverRequest = await request.json();
    const { cubeConfiguration, algorithm = 'Kociemba', complexityLevel = 'INTERMEDIATE' } = body;

    // Validate cube configuration
    const solver = CubeSolver.getInstance();
    if (!solver.validateCubeConfiguration(cubeConfiguration)) {
      return NextResponse.json(
        { error: 'Invalid cube configuration' },
        { status: 400 }
      );
    }

    // Solve the cube
    const solveRequest: SolverRequest = {
      cubeConfiguration,
      algorithm,
      complexityLevel,
    };

    const solution: SolverResponse = await solver.solveCube(solveRequest);

    if (!solution.success) {
      return NextResponse.json(
        { error: 'Failed to solve cube' },
        { status: 500 }
      );
    }

    return NextResponse.json(solution, { status: 200 });
  } catch (error) {
    console.error('Cube solve error:', error);
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

    // Generate a random scramble
    const solver = CubeSolver.getInstance();
    const scramble = solver.scrambleCube();

    return NextResponse.json({ scramble }, { status: 200 });
  } catch (error) {
    console.error('Scramble generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
