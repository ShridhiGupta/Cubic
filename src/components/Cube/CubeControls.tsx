'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Shuffle, Upload, Play, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface CubeControlsProps {
  onScramble: () => void;
  onSolve: () => void;
  onReset: () => void;
  isSolving?: boolean;
  complexity: 'BEGINNER' | 'INTERMEDIATE' | 'GODS_NUMBER';
  onComplexityChange: (complexity: 'BEGINNER' | 'INTERMEDIATE' | 'GODS_NUMBER') => void;
}

export function CubeControls({
  onScramble,
  onSolve,
  onReset,
  isSolving = false,
  complexity,
  onComplexityChange,
}: CubeControlsProps) {
  const [uploadMode, setUploadMode] = useState(false);

  return (
    <div className="space-y-6 p-6 border border-border rounded-lg bg-card">
      <div>
        <h3 className="text-lg font-semibold mb-4">Input Configuration</h3>
        
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={onScramble}
              className="flex-1"
            >
              <Shuffle className="h-4 w-4 mr-2" />
              Randomize
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setUploadMode(!uploadMode)}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploadMode ? 'Manual Input' : 'Scan/Upload'}
            </Button>
          </div>

          {uploadMode && (
            <div className="space-y-2">
              <Input
                type="file"
                accept="image/*"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              <p className="text-sm text-muted-foreground">
                Upload an image of your cube or use camera scan
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Complexity Level</h3>
        
        <div className="space-y-2">
          {['BEGINNER', 'INTERMEDIATE', 'GODS_NUMBER'].map((level) => (
            <Button
              key={level}
              variant={complexity === level ? 'default' : 'outline'}
              onClick={() => onComplexityChange(level as any)}
              className="w-full justify-start"
            >
              {level}
              {level === 'GODS_NUMBER' && (
                <span className="ml-auto text-xs text-muted-foreground">
                  Optimal
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Button
          onClick={onSolve}
          disabled={isSolving}
          className="w-full"
          size="lg"
        >
          <Play className="h-5 w-5 mr-2" />
          {isSolving ? 'Solving...' : 'SOLVE NOW'}
        </Button>
        
        <Button
          variant="outline"
          onClick={onReset}
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Cube
        </Button>
      </div>
    </div>
  );
}
