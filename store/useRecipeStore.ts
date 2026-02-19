import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../models/Recipe';

interface RecipeStore {
  savedRecipes: Recipe[];
  toggleSave: (recipe: Recipe) => void;
  isRecipeSaved: (recipeId: string) => boolean;
  getSavedRecipes: () => Recipe[];
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set, get) => ({
      savedRecipes: [],

      toggleSave: (recipe: Recipe) => {
        set((state) => {
          const isSaved = state.savedRecipes.some((r) => r.id === recipe.id);
          if (isSaved) {
            // Remove the recipe
            return {
              savedRecipes: state.savedRecipes.filter((r) => r.id !== recipe.id),
            };
          } else {
            // Add the recipe
            return {
              savedRecipes: [...state.savedRecipes, recipe],
            };
          }
        });
      },

      isRecipeSaved: (recipeId: string) => {
        const { savedRecipes } = get();
        return savedRecipes.some((r) => r.id === recipeId);
      },

      getSavedRecipes: () => {
        return get().savedRecipes;
      },
    }),
    {
      name: 'recipe-store',
      storage: {
        getItem: async (key: string) => {
          try {
            const item = await AsyncStorage.getItem(key);
            return item ? JSON.parse(item) : null;
          } catch (error) {
            console.error('Failed to read from AsyncStorage:', error);
            return null;
          }
        },
        setItem: async (key: string, value: RecipeStore) => {
          try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
          } catch (error) {
            console.error('Failed to write to AsyncStorage:', error);
          }
        },
        removeItem: async (key: string) => {
          try {
            await AsyncStorage.removeItem(key);
          } catch (error) {
            console.error('Failed to remove from AsyncStorage:', error);
          }
        },
      } as any,
    }
  )
);
