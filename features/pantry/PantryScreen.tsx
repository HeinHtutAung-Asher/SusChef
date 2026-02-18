import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles } from 'lucide-react-native';
import { PantrySection } from '../../components/PantrySection';
import { IngredientRow } from '../../components/IngredientRow';
import { ToolRow } from '../../components/ToolRow';
import { Button } from '../../components/Button';
import { LoadingScreen } from '../recommendations/LoadingScreen';
import { colors } from '../../core/theme/colors';
import { layout, typography } from '../../core/theme/typography';
import { RouteNames } from '../../navigation/routeNames';

interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

interface Tool {
  id: string;
  name: string;
  isChecked: boolean;
}

interface PantryScreenProps {
  navigation?: any;
}

export const PantryScreen: React.FC<PantryScreenProps> = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'Rice', amount: 2, unit: 'cups' },
    { id: '2', name: 'Eggs', amount: 6, unit: 'pcs' },
  ]);

  const [tools, setTools] = useState<Tool[]>([
    { id: 't1', name: 'Microwave', isChecked: true },
    { id: 't2', name: 'Oven', isChecked: false },
    { id: 't3', name: 'Blender', isChecked: true },
  ]);

  // Sort tools so checked items float to top
  const sortedTools = useCallback(() => {
    return [...tools].sort((a, b) => {
      if (a.isChecked === b.isChecked) return 0;
      return a.isChecked ? -1 : 1;
    });
  }, [tools]);

  const handleAddIngredient = useCallback((name: string) => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: name.trim(),
      amount: 1,
      unit: 'pcs',
    };
    setIngredients((prev) => [...prev, newIngredient]);
  }, []);

  const handleAddTool = useCallback((name: string) => {
    const newTool: Tool = {
      id: `t${Date.now()}`,
      name: name.trim(),
      isChecked: true,
    };
    setTools((prev) => {
      const updated = [...prev, newTool];
      return updated.sort((a, b) => {
        if (a.isChecked === b.isChecked) return 0;
        return a.isChecked ? -1 : 1;
      });
    });
  }, []);

  const handleDeleteIngredient = useCallback((id: string) => {
    const ingredient = ingredients.find((ing) => ing.id === id);
    if (!ingredient) return;

    // Explicit check for amount value
    if (ingredient.amount > 0) {
      // Just set to 0
      setIngredients((prev) =>
        prev.map((ing) =>
          ing.id === id ? { ...ing, amount: 0 } : ing
        )
      );
    } else {
      // Show confirmation alert
      Alert.alert(
        'Remove Item?',
        `Are you sure you want to remove "${ingredient.name}"?`,
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              setIngredients((prev) => prev.filter((ing) => ing.id !== id));
            },
            style: 'destructive',
          },
        ]
      );
    }
  }, [ingredients]);

  const handleToggleTool = useCallback((id: string) => {
    setTools((prev) => {
      const updated = prev.map((tool) =>
        tool.id === id ? { ...tool, isChecked: !tool.isChecked } : tool
      );
      // Re-sort immediately
      return updated.sort((a, b) => {
        if (a.isChecked === b.isChecked) return 0;
        return a.isChecked ? -1 : 1;
      });
    });
  }, []);

  const handleGenerateRecipe = useCallback(() => {
    setIsLoading(true);
    // Simulate AI processing for 1.5 seconds
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to recipes results
      navigation?.navigate(RouteNames.RecipeResults);
    }, 1500);
  }, [navigation]);

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardView: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    headerSection: {
      paddingVertical: layout.spacing.md,
      paddingHorizontal: layout.spacing.lg,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    header: {
      fontSize: typography.size.h2,
      fontWeight: '700' as const,
      color: colors.primary,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: layout.spacing.lg,
      justifyContent: 'flex-start',
    },
    sectionsRow: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    ingredientsSection: {
      flex: 1.5,
    },
    toolsSection: {
      flex: 1,
    },
    footerContainer: {
      paddingVertical: layout.spacing.lg,
      paddingHorizontal: layout.spacing.lg,
      alignItems: 'center',
      backgroundColor: colors.background,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    buttonWrapper: {
      width: '65%',
      alignSelf: 'center',
    },
  });

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && (
        <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerSection}>
            <Text style={styles.header}>Pantry</Text>
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <View style={styles.sectionsRow}>
              {/* Ingredients Section */}
              <View style={styles.ingredientsSection}>
                <PantrySection
                  title="INGREDIENTS"
                  placeholder="+ Add ingredient..."
                  data={ingredients}
                  onAddItem={handleAddIngredient}
                  flex={1}
                  showsVerticalScrollIndicator={true}
                  renderItem={(item: Ingredient) => (
                    <IngredientRow
                      label={item.name}
                      amount={item.amount}
                      unit={item.unit}
                      onDelete={() => handleDeleteIngredient(item.id)}
                      onAmountChange={(newAmount) => {
                        setIngredients((prev) =>
                          prev.map((ing) =>
                            ing.id === item.id ? { ...ing, amount: newAmount } : ing
                          )
                        );
                      }}
                      onUnitChange={(newUnit) => {
                        setIngredients((prev) =>
                          prev.map((ing) =>
                            ing.id === item.id ? { ...ing, unit: newUnit } : ing
                          )
                        );
                      }}
                    />
                  )}
                />
              </View>

              {/* Tools Section */}
              <View style={styles.toolsSection}>
                <PantrySection
                  title="KITCHEN TOOLS"
                  placeholder="+ Add tool..."
                  data={sortedTools()}
                  onAddItem={handleAddTool}
                  flex={1}
                  showsVerticalScrollIndicator={true}
                  renderItem={(item: Tool) => (
                    <ToolRow
                      label={item.name}
                      initialChecked={item.isChecked}
                      onToggle={() => handleToggleTool(item.id)}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Footer Button */}
        <View style={styles.footerContainer}>
          <View style={styles.buttonWrapper}>
            <Button
              text="Generate Recipe"
              onPress={handleGenerateRecipe}
              variant="primary"
              size="lg"
              icon={
                <Sparkles
                  size={20}
                  stroke={colors.surface}
                  strokeWidth={2}
                />
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
      )}
    </>
  );
};

export default PantryScreen;
