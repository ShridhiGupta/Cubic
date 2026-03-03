export interface CubeState {
  _id: string;
  userId: string;
  cubeConfiguration: string; // 54-character string representing all faces
  solution: {
    moves: string[];
    moveCount: number;
    solveTime: number; // milliseconds
    algorithm: string; // "Kociemba" or "LayerByLayer"
  };
  metadata: {
    complexityLevel: string; // "BEGINNER", "INTERMEDIATE", "GODS_NUMBER"
    scrambleDate: Date;
    solvedDate?: Date;
    isSolved: boolean;
    solveAttempts: number;
  };
  performance: {
    engineLoad: number; // Gflops
    latency: number; // ms
    nodeUsed: string; // e.g., "mainnet-alpha-v02"
  };
  createdAt: Date;
}

export interface CubeFace {
  colors: string[][]; // 3x3 grid of colors
  face: 'U' | 'D' | 'F' | 'B' | 'L' | 'R'; // Up, Down, Front, Back, Left, Right
}

export type CubeColor = 'white' | 'yellow' | 'red' | 'orange' | 'green' | 'blue';

export interface SolverRequest {
  cubeConfiguration: string;
  algorithm?: 'Kociemba' | 'LayerByLayer';
  complexityLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'GODS_NUMBER';
}

export interface SolverResponse {
  solution: string[];
  moveCount: number;
  solveTime: number;
  algorithm: string;
  success: boolean;
}
