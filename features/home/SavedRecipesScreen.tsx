import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GridRecipeCard } from '../../components/cookbook/GridRecipeCard';
import { CookbookFilter } from '../../components/cookbook/CookbookFilter';
import { EmptyCookbook } from '../../components/cookbook/EmptyCookbook';
import { colors } from '../../core/theme/colors';
import { layout, typography } from '../../core/theme/typography';
import { RouteNames } from '../../navigation/routeNames';
import { useRecipeStore } from '../../store/useRecipeStore';
import { Recipe } from '../../models/Recipe';

interface SavedRecipesScreenProps {
  navigation?: any;
}

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner'];

// Helper to categorize recipes - can be extended with actual category data
const RECIPE_CATEGORIES: { [key: string]: string[] } = {
  'Breakfast': ['1'], // Fried Rice
  'Lunch': ['2', '3'], // Tomato Soup, Green Goddess Salad
  'Dinner': ['1', '2'], // Fried Rice, Tomato Soup
};

export const SavedRecipesScreen: React.FC<SavedRecipesScreenProps> = ({
  navigation,
}) => {
  const { savedRecipes, toggleSave, isRecipeSaved } = useRecipeStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter recipes by category
  const filteredRecipes = selectedCategory && selectedCategory !== 'All'
    ? savedRecipes.filter((recipe: Recipe) =>
        RECIPE_CATEGORIES[selectedCategory]?.includes(recipe.id)
      )
    : savedRecipes;

  const handleRemoveRecipe = useCallback((recipe: Recipe) => {
    toggleSave(recipe);
  }, [toggleSave]);

  const handleRecipePress = useCallback(
    (recipeId: string) => {
      navigation?.navigate(RouteNames.RecipeDetail, { recipeId });
    },
    [navigation]
  );

  const handleNavigateToPantry = useCallback(() => {
    navigation?.navigate(RouteNames.Pantry);
  }, [navigation]);

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerSection: {
      paddingHorizontal: layout.spacing.lg,
      paddingVertical: layout.spacing.md,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      alignItems: 'center',
    },
    header: {
      fontSize: typography.size.h2,
      fontWeight: '700' as const,
      color: colors.text.primary,
    },
    flatList: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: layout.spacing.lg,
      paddingTop: layout.spacing.lg,
      paddingBottom: layout.spacing.xl,
    },
    columnWrapper: {
      justifyContent: 'space-between',
      marginBottom: layout.spacing.lg,
      gap: layout.spacing.sm,
    },
    cardWrapper: {
      width: '48%',
    },
  });

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <View style={styles.cardWrapper}>
      <GridRecipeCard
        title={item.title}
        image={item.image}
        time={item.time}
        isSaved={isRecipeSaved(item.id)}
        onPress={() => handleRecipePress(item.id)}
        onToggleSave={() => handleRemoveRecipe(item)}
      />
    </View>
  );

  const renderEmpty = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <EmptyCookbook onNavigateToPantry={handleNavigateToPantry} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.header}>My Cookbook</Text>
        </View>

        {/* Filter Bar */}
        {savedRecipes.length > 0 && (
          <CookbookFilter
            categories={CATEGORIES.filter((cat) => cat !== 'All')}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        )}

        {/* Main Content - FlatList with Grid */}
        <FlatList
          style={styles.flatList}
          data={filteredRecipes}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmpty}
        />
      </View>
    </SafeAreaView>
  );
};

export default SavedRecipesScreen;
