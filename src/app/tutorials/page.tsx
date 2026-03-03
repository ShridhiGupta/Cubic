import { Header } from '@/components/Layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BookOpen, Clock, Users, Play } from 'lucide-react';
import Link from 'next/link';

const tutorials = [
  {
    id: 'basics',
    title: 'Rubik\'s Cube Basics',
    category: 'BASICS',
    difficulty: 'BEGINNER',
    duration: 15,
    description: 'Learn the fundamentals of the Rubik\'s Cube, notation, and basic movements.',
    progress: 0,
    totalSteps: 5,
  },
  {
    id: 'cross',
    title: 'Cross Method',
    category: 'CROSS',
    difficulty: 'BEGINNER',
    duration: 25,
    description: 'Master the cross technique - the first step in solving the cube efficiently.',
    progress: 0,
    totalSteps: 8,
  },
  {
    id: 'f2l',
    title: 'First Two Layers (F2L)',
    category: 'F2L',
    difficulty: 'INTERMEDIATE',
    duration: 45,
    description: 'Learn advanced F2L techniques to solve the first two layers simultaneously.',
    progress: 0,
    totalSteps: 12,
  },
  {
    id: 'oll',
    title: 'Orientation of Last Layer (OLL)',
    category: 'OLL',
    difficulty: 'ADVANCED',
    duration: 60,
    description: 'Master all 57 OLL algorithms to orient the last layer efficiently.',
    progress: 0,
    totalSteps: 57,
  },
  {
    id: 'pll',
    title: 'Permutation of Last Layer (PLL)',
    category: 'PLL',
    difficulty: 'ADVANCED',
    duration: 60,
    description: 'Learn all 21 PLL algorithms to complete the cube solving process.',
    progress: 0,
    totalSteps: 21,
  },
];

const categoryColors = {
  BASICS: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  CROSS: 'bg-green-500/10 text-green-400 border-green-500/20',
  F2L: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  OLL: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  PLL: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const difficultyColors = {
  BEGINNER: 'text-green-400',
  INTERMEDIATE: 'text-yellow-400',
  ADVANCED: 'text-red-400',
};

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learning Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the art of speedcubing with our comprehensive step-by-step tutorials. 
            From basics to advanced algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="cyber-border hover:glow-effect transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[tutorial.category as keyof typeof categoryColors]}`}>
                    {tutorial.category}
                  </span>
                  <span className={`text-sm font-medium ${difficultyColors[tutorial.difficulty as keyof typeof difficultyColors]}`}>
                    {tutorial.difficulty}
                  </span>
                </div>
                
                <CardTitle className="text-xl mb-2">{tutorial.title}</CardTitle>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {tutorial.duration}min
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {tutorial.totalSteps} steps
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {tutorial.description}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {tutorial.progress}/{tutorial.totalSteps} completed
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(tutorial.progress / tutorial.totalSteps) * 100}%` }}
                    />
                  </div>
                  
                  <Link href={`/tutorials/${tutorial.id}`}>
                    <Button className="w-full">
                      {tutorial.progress > 0 ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Start Tutorial
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="cyber-border rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Practice?</h2>
            <p className="text-muted-foreground mb-6">
              Apply what you've learned with our interactive 3D cube solver. 
              Practice algorithms and improve your solving speed.
            </p>
            <Link href="/solver">
              <Button size="lg" variant="cyber">
                Go to Solver
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
