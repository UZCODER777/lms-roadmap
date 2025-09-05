export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: string;
  completed: boolean;
  order: number;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  duration: string;
  lessons: Lesson[];
  order: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  completed: boolean;
  progress: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  order: number;
}

export interface StudentStats {
  totalModules: number;
  completedModules: number;
  totalTopics: number;
  completedTopics: number;
  totalLessons: number;
  completedLessons: number;
  overallProgress: number;
  studyStreak: number;
  totalStudyHours: number;
  averageScore: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  level: string;
  points: number;
  badges: Badge[];
  preferences: {
    language: string;
    notifications: boolean;
    theme: 'light' | 'dark';
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'completion' | 'streak' | 'score' | 'time';
  date: string;
  points: number;
}