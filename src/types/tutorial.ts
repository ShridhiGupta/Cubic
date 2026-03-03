export interface Tutorial {
  _id: string;
  title: string;
  slug: string; // URL-friendly identifier
  category: "CROSS" | "F2L" | "OLL" | "PLL" | "BASICS";
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  content: string; // markdown content
  videoEmbed?: string; // YouTube/Vimeo embed URL
  steps: {
    title: string;
    description: string;
    cubeState: string; // cube configuration for this step
    moves: string[]; // moves to reach this step
  }[];
  prerequisites: string[]; // tutorial slugs
  estimatedTime: number; // minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface TutorialProgress {
  userId: string;
  tutorialId: string;
  completedSteps: number[];
  isCompleted: boolean;
  startedAt: Date;
  completedAt?: Date;
}
