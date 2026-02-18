import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecipeCard } from '../../components/RecipeCard';
import { colors } from '../../core/theme/colors';
import { layout, typography } from '../../core/theme/typography';
import { MOCK_RECIPES } from '../../core/constants/mockRecipes';

interface RecipeResultsScreenProps {
  navigation: any;
}

export const RecipeResultsScreen: React.FC<RecipeResultsScreenProps> = ({
  navigation,
}) => {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: layout.spacing.lg,
      paddingVertical: layout.spacing.md,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    backButton: {
      marginRight: layout.spacing.md,
    },
    title: {
      fontSize: typography.size.h2,
      fontWeight: '700' as const,
      color: colors.text.primary,
      flex: 1,
    },
    content: {
      paddingHorizontal: layout.spacing.lg,
      paddingTop: layout.spacing.lg,
      paddingBottom: layout.spacing.xl,
    },
    emptyText: {
      fontSize: typography.size.body,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: layout.spacing.xl,
    },
  });

  const handleRecipePress = (recipeId: string) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={24} color={colors.text.primary} />
        </Pressable>
        <Text style={styles.title}>Recommended for You</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_RECIPES.length > 0 ? (
          MOCK_RECIPES.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onPress={() => handleRecipePress(recipe.id)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No recipes found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
