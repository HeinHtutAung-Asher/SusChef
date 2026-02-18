export interface Recipe {
  id: string;
  title: string;
  time: number; // in minutes
  matchScore: number; // X out of Y items
  totalItems: number; // Y items
  image: string; // URL
  ingredients: string[];
  instructions: string[];
  description?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  servings?: number;
}
