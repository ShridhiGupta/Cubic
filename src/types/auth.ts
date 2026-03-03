export interface User {
  _id: string;
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
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}
