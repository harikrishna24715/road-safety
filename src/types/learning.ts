export interface LearningStep {
  id: string;
  type: 'lesson' | 'puzzle' | 'game';
  title: string;
  description: string;
  imageUrl: string;
  content?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  requiredSteps?: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  steps: LearningStep[];
  isCompleted: boolean;
  progress: number;
}

export interface PuzzleQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'drag-drop' | 'matching' | 'true-false';
  options?: string[];
  correctAnswer: string | number | string[];
  explanation: string;
  imageUrl?: string;
}

export interface GameScenario {
  id: string;
  title: string;
  description: string;
  type: 'traffic-light' | 'crossing' | 'parking' | 'emergency';
  imageUrl: string;
  instructions: string[];
  objectives: string[];
}