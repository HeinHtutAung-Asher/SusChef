export interface Rating {
  id: string;
  recipeId: string;
  userId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
