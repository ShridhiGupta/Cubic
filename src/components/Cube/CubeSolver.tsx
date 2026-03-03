'use client';

import { useState } from 'react';
import { RubiksCube } from './Cube3D';
import { CubeControls } from './CubeControls';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { SolutionSteps } from './SolutionSteps';
import { Activity, Zap, Clock } from 'lucide-react';

interface Solution {
  moves: string[];
  moveCount: number;
  solveTime: number;
  algorithm: string;
}

export function CubeSolver() {
  const [isSolving, setIsSolving] = useState(false);
  const [complexity, setComplexity] = useState<'BEGINNER' | 'INTERMEDIATE' | 'GODS_NUMBER'>('INTERMEDIATE');
  const [solution, setSolution] = useState<Solution | null>(null);
  const [performance, setPerformance] = useState({
    engineLoad: 14.2,
    latency: 42,
    successRate: 99.9,
  });

  const handleScramble = () => {
    // TODO: Implement scramble logic
    console.log('Scrambling cube...');
    setSolution(null);
  };

  const handleSolve = async () => {
    setIsSolving(true);
    setPerformance({
      engineLoad: Math.random() * 20 + 10,
      latency: Math.floor(Math.random() * 50 + 20),
      successRate: 99.9,
    });

    try {
      // TODO: Call actual solve API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSolution: Solution = {
        moves: ["R'", "U2", "L", "F'", "B2", "D'", "R2", "U", "L'", "B", "D", "F", "R", "U'", "L2", "F2", "D2", "B'", "R'", "U"],
        moveCount: 20,
        solveTime: 850,
        algorithm: 'Kociemba',
      };
      
      setSolution(mockSolution);
    } catch (error) {
      console.error('Solve failed:', error);
    } finally {
      setIsSolving(false);
    }
  };

  const handleReset = () => {
    // TODO: Implement reset logic
    console.log('Resetting cube...');
    setSolution(null);
  };

  const handleFaceClick = (face: string, position: number) => {
    console.log(`Face ${face}, position ${position} clicked`);
    // TODO: Implement face color change logic
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1">
            <CubeControls
              onScramble={handleScramble}
              onSolve={handleSolve}
              onReset={handleReset}
              isSolving={isSolving}
              complexity={complexity}
              onComplexityChange={setComplexity}
            />
          </div>

          {/* Center Panel - 3D Cube */}
          <div className="lg:col-span-1">
            <Card className="cyber-border">
              <CardHeader>
                <CardTitle className="text-center">Interactive 3D Cube</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <RubiksCube onFaceClick={handleFaceClick} />
                  
                  {/* Animated Instructions */}
                  <div className="absolute top-4 left-4 text-sm text-muted-foreground">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span>Click faces to rotate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                        <span>Drag to view angles</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
                    {solution ? (
                      <div className="text-center">
                        <div className="text-xs text-primary mb-1">Solution Ready</div>
                        <div className="font-mono">{solution.moveCount} moves</div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-xs mb-1">Ready to Solve</div>
                        <div className="font-mono">Click SOLVE NOW</div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solution Steps */}
            {solution && (
              <SolutionSteps 
                solution={solution}
                onStepChange={(step) => console.log('Current step:', step)}
              />
            )}
          </div>

          {/* Right Panel - Neural Core */}
          <div className="lg:col-span-1">
            <Card className="cyber-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Neural Core
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ENGINE LOAD</span>
                    <span className="font-mono text-primary">
                      {performance.engineLoad.toFixed(1)} Gflops
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">LATENCY</span>
                    <span className="font-mono text-primary">
                      {performance.latency}ms
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">SUCCESS RATE</span>
                    <span className="font-mono text-primary">
                      {performance.successRate}%
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">
                    Active Node
                  </div>
                  <div className="font-mono text-xs text-primary">
                    mainnet-alpha-v02
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button variant="cyber" className="w-full">
                    Upgrade to Pro
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Unlock custom cube shapes and premium solvers
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
