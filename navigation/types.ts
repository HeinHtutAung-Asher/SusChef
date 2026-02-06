// Navigation type definitions for React Navigation
import { RouteNames } from './routeNames';

export type RootStackParamList = {
  [RouteNames.Login]: undefined;
  [RouteNames.Home]: undefined;
  [RouteNames.Pantry]: undefined;
  [RouteNames.Tools]: undefined;
  [RouteNames.Recommendations]: undefined;
  [RouteNames.RecipeDetail]: { recipeId: string };
  [RouteNames.Rating]: { recipeId: string };
};
