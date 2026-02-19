export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories?: number;
  category?: string;
}
