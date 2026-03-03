'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';

interface Solution {
  moves: string[];
  moveCount: number;
  solveTime: number;
  algorithm: string;
}

interface SolutionStepsProps {
  solution: Solution;
  onStepChange?: (step: number) => void;
}

const moveAnimations: { [key: string]: { description: string; axis: string; direction: number } } = {
  'R': { description: 'Rotate Right face clockwise', axis: 'x', direction: 1 },
  "R'": { description: 'Rotate Right face counter-clockwise', axis: 'x', direction: -1 },
  'L': { description: 'Rotate Left face clockwise', axis: 'x', direction: -1 },
  "L'": { description: 'Rotate Left face counter-clockwise', axis: 'x', direction: 1 },
  'U': { description: 'Rotate Up face clockwise', axis: 'y', direction: 1 },
  "U'": { description: 'Rotate Up face counter-clockwise', axis: 'y', direction: -1 },
  'D': { description: 'Rotate Down face clockwise', axis: 'y', direction: -1 },
  "D'": { description: 'Rotate Down face counter-clockwise', axis: 'y', direction: 1 },
  'F': { description: 'Rotate Front face clockwise', axis: 'z', direction: 1 },
  "F'": { description: 'Rotate Front face counter-clockwise', axis: 'z', direction: -1 },
  'B': { description: 'Rotate Back face clockwise', axis: 'z', direction: -1 },
  "B'": { description: 'Rotate Back face counter-clockwise', axis: 'z', direction: 1 },
  'U2': { description: 'Rotate Up face 180°', axis: 'y', direction: 2 },
  'D2': { description: 'Rotate Down face 180°', axis: 'y', direction: 2 },
  'F2': { description: 'Rotate Front face 180°', axis: 'z', direction: 2 },
  'B2': { description: 'Rotate Back face 180°', axis: 'z', direction: 2 },
  'R2': { description: 'Rotate Right face 180°', axis: 'x', direction: 2 },
  'L2': { description: 'Rotate Left face 180°', axis: 'x', direction: 2 },
};

export function SolutionSteps({ solution, onStepChange }: SolutionStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (currentStep < solution.moves.length - 1) {
      setCurrentStep(currentStep + 1);
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement auto-play animation
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPlaying(false);
  };

  const currentMove = solution.moves[currentStep];
  const moveInfo = currentMove ? moveAnimations[currentMove] : null;

  return (
    <Card className="cyber-border">
      <CardHeader>
        <CardTitle className="text-center">Step-by-Step Solution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{currentStep + 1} / {solution.moves.length}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / solution.moves.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Move Display */}
        {moveInfo && (
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold gradient-text mb-4">
              {currentMove}
            </div>
            
            <div className="cyber-border rounded-lg p-6 bg-card/50">
              <div className="text-lg font-medium mb-2">
                {moveInfo.description}
              </div>
              
              {/* Animated Cube Icon */}
              <div className="flex justify-center mb-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-2 border-primary rounded-lg flex items-center justify-center">
                    <div className="text-2xl font-bold text-primary">
                      {currentMove}
                    </div>
                  </div>
                  {/* Rotation Animation Indicator */}
                  <div className="absolute -inset-2 border border-primary/20 rounded-lg animate-pulse" />
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Axis: <span className="font-mono">{moveInfo.axis}</span> • 
                Direction: <span className="font-mono">{moveInfo.direction > 0 ? 'CW' : moveInfo.direction < 0 ? 'CCW' : '180°'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlay}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            onClick={handleNext}
            disabled={currentStep === solution.moves.length - 1}
            size="sm"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Move List */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium mb-3">All Moves</h4>
          <div className="flex flex-wrap gap-2">
            {solution.moves.map((move, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`px-3 py-2 rounded text-sm font-mono transition-all ${
                  index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : completedSteps.includes(index)
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-primary/10 border border-primary/20 hover:bg-primary/20'
                }`}
              >
                {move}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
