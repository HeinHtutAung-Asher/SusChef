# SusChef Development Guide

## Quick Reference

### Project Structure
```
SusChef/
├── App.tsx                 # Main app entry with ErrorBoundary
├── components/             # Reusable UI components
├── core/
│   ├── config/            # API and app configuration
│   ├── constants/         # App-wide constants
│   ├── theme/             # Colors, typography, layout
│   └── utils/             # Helper functions, error boundary
├── features/              # Feature screens (auth, home, pantry, etc.)
├── models/                # TypeScript interfaces
├── navigation/            # Navigation setup and types
├── services/              # API and storage services
└── store/                 # State management (Context + Zustand)
```

---

## Common Patterns

### 1. Creating a New Screen
```typescript
import React, { StyleSheet } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../core/theme/colors';
import { layout, typography } from '../../core/theme/typography';

const createStyles = () => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});

const styles = createStyles();

export const MyScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello</Text>
    </SafeAreaView>
  );
};

export default MyScreen;
```

### 2. Using Pantry Store
```typescript
import { usePantryStore } from '../../store';

const { state, addIngredient, removeIngredient } = usePantryStore();

// Add ingredient
addIngredient('Rice', 2, 'cups');

// Remove ingredient
removeIngredient(ingredientId);

// Update ingredient
updateIngredient(ingredientId, { amount: 3 });
```

### 3. Using Recipe Store
```typescript
import { useRecipeStore } from '../../store/useRecipeStore';

const { savedRecipes, toggleSave, isRecipeSaved } = useRecipeStore();

// Save a recipe
toggleSave(recipe);

// Check if recipe is saved
const saved = isRecipeSaved(recipeId);

// Get all saved recipes
const recipes = savedRecipes;
```

### 4. Using API Service
```typescript
import { recipeApiService } from '../../services/api/recipeApiService';

try {
  const recipes = await recipeApiService.getRecipeRecommendations(['rice', 'eggs']);
  const recipe = await recipeApiService.getRecipeById('1');
  const results = await recipeApiService.searchRecipes('pasta');
} catch (error) {
  console.error(error);
}
```

### 5. Using Storage Service
```typescript
import { storageService } from '../../services/storage/storageService';

// Get saved recipes
const recipes = await storageService.getSavedRecipes();

// Save recipes
await storageService.saveSavedRecipes(recipes);

// Get auth token
const token = await storageService.getAuthToken();

// Clear all data
await storageService.clearAllData();
```

---

## Style Guidelines

### Spacing
```typescript
layout.spacing.xs = 4    // Tiny gaps
layout.spacing.sm = 8    // Elements inside a card
layout.spacing.md = 12   // Gap between list items
layout.spacing.lg = 16   // Standard screen padding
layout.spacing.xl = 24   // Section separation
layout.spacing.xxl = 48  // Large empty spaces
```

### Colors
```typescript
colors.primary = '#059669'         // Main actions
colors.secondary = '#F59E0B'       // Highlights
colors.background = '#F9FAFB'      // App background
colors.surface = '#FFFFFF'         // Cards/Inputs
colors.text.primary = '#111827'    // Headings
colors.text.secondary = '#6B7280'  // Subtitles
colors.text.disabled = '#D1D5DB'   // Disabled items
colors.status.error = '#EF4444'    // Errors
colors.status.success = '#10B981'  // Success
colors.border = '#E5E7EB'          // Dividers
```

### Typography
```typescript
typography.size.h1 = 24           // Headings
typography.size.h2 = 18           // Sub-headings
typography.size.body = 16         // Body text
typography.size.caption = 14      // Captions
typography.size.small = 12        // Small text
```

---

## Performance Tips

### 1. Memoize Expensive Computations
```typescript
const filteredItems = useMemo(
  () => items.filter(item => item.active),
  [items]
);
```

### 2. Move Styles Outside Component
```typescript
// ❌ Bad - recreated every render
const Component = () => {
  const styles = StyleSheet.create({ ... });
  return <View style={styles.container} />;
};

// ✅ Good - created once
const createStyles = () => StyleSheet.create({ ... });
const styles = createStyles();
const Component = () => <View style={styles.container} />;
```

### 3. Use useCallback for Event Handlers
```typescript
// ❌ Bad
const handlePress = () => { ... };

// ✅ Good
const handlePress = useCallback(() => { ... }, [dependencies]);
```

### 4. Avoid Anonymous Functions
```typescript
// ❌ Bad
<FlatList renderItem={({ item }) => <Component item={item} />} />

// ✅ Good
const renderItem = useCallback(({ item }) => <Component item={item} />, []);
<FlatList renderItem={renderItem} />
```

---

## Navigation

### RouteNames
```typescript
enum RouteNames {
  Login = 'Login',
  MainApp = 'MainApp',
  Pantry = 'Pantry',
  Saved = 'Saved',
  Profile = 'Profile',
  RecipeResults = 'RecipeResults',
  RecipeDetail = 'RecipeDetail',
}
```

### Navigate
```typescript
// Navigate to screen
navigation.navigate(RouteNames.Pantry);

// Navigate with params
navigation.navigate(RouteNames.RecipeDetail, { recipeId: '1' });

// Go back
navigation.goBack();
```

---

## Constants

### App Constants
```typescript
import { APP_CONSTANTS } from '../../core/constants/appConstants';

APP_CONSTANTS.APP_NAME                          // 'SusChef'
APP_CONSTANTS.RECIPE_GENERATION_DELAY           // 1500 ms
APP_CONSTANTS.STORAGE_KEYS.SAVED_RECIPES       // StorageKey
APP_CONSTANTS.RECIPE_CATEGORIES                 // ['All', 'Breakfast', ...]
APP_CONSTANTS.DIFFICULTY_LEVELS                 // ['Easy', 'Medium', 'Hard']
```

---

## Utility Functions

### generateId()
Generates unique IDs with timestamp + random suffix
```typescript
const id = generateId(); // Returns: "1708923456789-abc123def"
```

### formatTime()
Formats minutes to readable string
```typescript
formatTime(45);   // Returns: "45 min"
formatTime(90);   // Returns: "1h 30m"
```

### isValidEmail()
Validates email format
```typescript
isValidEmail('test@example.com'); // true
isValidEmail('invalid');          // false
```

### debounce()
Debounces function calls
```typescript
const debouncedSearch = debounce((query) => search(query), 500);
```

---

## Error Handling

### ErrorBoundary
The app is wrapped with ErrorBoundary to catch unhandled errors:
```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Try-Catch in Async Operations
```typescript
try {
  const result = await apiService.fetchData();
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly error message
}
```

### Service Error Handling
All services throw descriptive errors:
```typescript
throw new Error('Failed to fetch recipe recommendations');
```

---

## Type Safety Checklist

- ✅ All screen props are typed
- ✅ All API responses are typed
- ✅ All store functions are typed
- ✅ No `any` types (except justified cases)
- ✅ All navigation params are typed
- ✅ All component props are TypeScript interfaces

---

## Common Issues & Solutions

### 1. Memory Leak Warning
**Cause:** Setting state in cleanup functions or not unsubscribing
**Solution:** Use useEffect cleanup or unsubscribe in cleanup function

### 2. Infinite Render Loop
**Cause:** Missing dependencies in useEffect or useCallback
**Solution:** Add all used variables to dependency array

### 3. Type Errors
**Cause:** Missing TypeScript interfaces or wrong types
**Solution:** Import proper interfaces from models/ folder

### 4. Navigation Not Working
**Cause:** Screen not registered in navigator
**Solution:** Add screen to appropriate navigator in navigation/

### 5. Styles Not Applied
**Cause:** Inline style objects or incorrect names
**Solution:** Use StyleSheet.create() and proper naming

---

## Testing

When adding new features:
1. Test on both iOS and Android platforms
2. Check for memory leaks using React DevTools
3. Verify type safety with TypeScript
4. Test error scenarios
5. Verify navigation flows

---

## Contributing

When contributing to this project:
1. Follow the established patterns
2. Keep components small and focused
3. Move styles outside components
4. Use proper TypeScript typing
5. Add proper error handling
6. Update this guide if patterns change

---

## Resources

- **React Native Docs:** https://reactnative.dev
- **React Navigation:** https://reactnavigation.org
- **Zustand:** https://github.com/pmndrs/zustand
- **TypeScript:** https://www.typescriptlang.org
- **Expo:** https://docs.expo.dev
