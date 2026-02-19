import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { ArrowLeft, Clock, Users, Zap } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../core/theme/colors';
import { layout, typography } from '../../core/theme/typography';
import { Recipe } from '../../models/Recipe';
import { getRecipeImageWithFallback } from '../../core/utils/imageHelper';
import { MOCK_RECIPES } from '../../core/constants/mockRecipes';

interface RecipeDetailScreenProps {
  navigation: any;
  route: any;
}

export const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { recipeId } = route.params;

  const recipe = useMemo(() => {
    return MOCK_RECIPES.find((r) => r.id === recipeId);
  }, [recipeId]);

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
    header: {
      position: 'relative' as const,
      height: 250,
      backgroundColor: '#E0E0E0',
      overflow: 'hidden' as const,
    },
    imageContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      backgroundColor: '#E0E0E0',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    loadingSpinner: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 3,
      borderColor: 'transparent',
      borderTopColor: colors.primary,
      borderRightColor: colors.primary,
    },
    backButton: {
      position: 'absolute' as const,
      top: 12,
      left: 12,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      zIndex: 10,
    },
    content: {
      flex: 1,
      paddingHorizontal: layout.spacing.lg,
      paddingTop: layout.spacing.lg,
      paddingBottom: layout.spacing.lg,
    },
    titleSection: {
      marginBottom: layout.spacing.lg,
    },
    title: {
      fontSize: typography.size.h1,
      fontWeight: '700' as const,
      color: colors.text.primary,
      marginBottom: layout.spacing.sm,
    },
    description: {
      fontSize: typography.size.body,
      color: colors.text.secondary,
      lineHeight: 20,
    },
    metadataContainer: {
      flexDirection: 'row' as const,
      gap: layout.spacing.md,
      marginBottom: layout.spacing.lg,
      justifyContent: 'space-between' as const,
    },
    metadataItem: {
      flex: 1,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: layout.spacing.sm,
      paddingHorizontal: layout.spacing.md,
      paddingVertical: layout.spacing.sm,
      backgroundColor: colors.surface,
      borderRadius: layout.radius.md,
    },
    metadataLabel: {
      fontSize: typography.size.caption,
      color: colors.text.secondary,
      fontWeight: '500' as const,
    },
    metadataValue: {
      fontSize: typography.size.body,
      color: colors.text.primary,
      fontWeight: '600' as const,
    },
    sectionTitle: {
      fontSize: typography.size.h2,
      fontWeight: '700' as const,
      color: colors.text.primary,
      marginTop: layout.spacing.lg,
      marginBottom: layout.spacing.md,
    },
    ingredientItem: {
      paddingHorizontal: layout.spacing.md,
      paddingVertical: layout.spacing.sm,
      backgroundColor: colors.surface,
      borderRadius: layout.radius.md,
      marginBottom: layout.spacing.sm,
    },
    ingredientText: {
      fontSize: typography.size.body,
      color: colors.text.primary,
    },
    instructionItem: {
      marginBottom: layout.spacing.lg,
    },
    instructionNumber: {
      fontSize: typography.size.h2,
      fontWeight: '700' as const,
      color: colors.primary,
      marginBottom: layout.spacing.xs,
    },
    instructionText: {
      fontSize: typography.size.body,
      color: colors.text.primary,
      lineHeight: 20,
    },
  });

  if (!recipe) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Recipe not found</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: getRecipeImageWithFallback(recipe.image, recipe.title),
              }}
              style={styles.image}
              contentFit="cover"
              transition={1000}
              onLoad={() => setIsImageLoading(false)}
            />
            {isImageLoading && <View style={styles.loadingSpinner} />}
          </View>
          <Pressable
            style={styles.backButton}
            onPress={handleBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={20} color={colors.text.primary} />
          </Pressable>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleSection}>
            <Text style={styles.title}>{recipe.title}</Text>
            {recipe.description && (
              <Text style={styles.description}>{recipe.description}</Text>
            )}
          </View>

          <View style={styles.metadataContainer}>
            {recipe.time && (
              <View style={styles.metadataItem}>
                <Clock size={16} color={colors.primary} />
                <View>
                  <Text style={styles.metadataLabel}>Time</Text>
                  <Text style={styles.metadataValue}>{recipe.time}m</Text>
                </View>
              </View>
            )}
            {recipe.servings && (
              <View style={styles.metadataItem}>
                <Users size={16} color={colors.primary} />
                <View>
                  <Text style={styles.metadataLabel}>Servings</Text>
                  <Text style={styles.metadataValue}>{recipe.servings}</Text>
                </View>
              </View>
            )}
            {recipe.difficulty && (
              <View style={styles.metadataItem}>
                <Zap size={16} color={colors.primary} />
                <View>
                  <Text style={styles.metadataLabel}>Level</Text>
                  <Text style={styles.metadataValue}>{recipe.difficulty}</Text>
                </View>
              </View>
            )}
          </View>

          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.ingredientText}>• {ingredient}</Text>
                </View>
              ))}
            </>
          )}

          {recipe.instructions && recipe.instructions.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Instructions</Text>
              {recipe.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <Text style={styles.instructionNumber}>
                    Step {index + 1}
                  </Text>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
