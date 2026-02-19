/**
 * Generates dynamic image URLs for recipes based on recipe title
 * Uses Unsplash's source service for high-quality food images
 */

export const getRecipeImage = (query: string): string => {
  // This uses Unsplash's source service to find a random high-quality food image
  // based on the search term (e.g., "Tomato Soup")
  const formattedQuery = encodeURIComponent(`${query},food`);
  return `https://source.unsplash.com/featured/800x600?${formattedQuery}`;
};

/**
 * Gets a recipe image URL with fallback to dynamic Unsplash URL
 * @param imageUrl - The primary image URL (can be null or undefined)
 * @param recipeTitle - The recipe title for generating fallback image
 * @returns A valid image URL string
 */
export const getRecipeImageWithFallback = (
  imageUrl: string | null | undefined,
  recipeTitle: string
): string => {
  // If imageUrl is provided and is a non-empty string, use it
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim().length > 0) {
    return imageUrl;
  }
  // Otherwise, generate a dynamic image URL based on the recipe title
  return getRecipeImage(recipeTitle);
};
