#!/bin/bash

# SusChef Project Structure Setup Script
# This script creates the folder structure and placeholder files for the SusChef app

echo "🍳 Setting up SusChef project structure..."

# Create main architecture directories
echo "📁 Creating architecture directories..."
mkdir -p core/{config,constants,theme,utils}
mkdir -p features/{home,pantry,tools,recommendations,recipe-detail,rating}
mkdir -p services/{api,storage}
mkdir -p models

# Create placeholder files for main screens (based on Week 3 Lab user journey)
echo "📄 Creating screen placeholder files..."

# 1. Home Screen (App opens)
touch features/home/HomeScreen.tsx
echo "// Home/Welcome Screen - User opens app" > features/home/HomeScreen.tsx

# 2. Pantry Screen (Ingredient Input)
touch features/pantry/PantryScreen.tsx
echo "// Pantry Screen - Put in available ingredients" > features/pantry/PantryScreen.tsx

# 3. Tools Screen (Tool Selection)
touch features/tools/ToolsScreen.tsx
echo "// Tools Screen - Check tools the user has" > features/tools/ToolsScreen.tsx

# 4. Recommendations Screen (Recipe List)
touch features/recommendations/RecommendationsScreen.tsx
echo "// Recommendations Screen - See multiple possible recipes" > features/recommendations/RecommendationsScreen.tsx

# 5. Recipe Detail Screen (Cooking Instructions)
touch features/recipe-detail/RecipeDetailScreen.tsx
echo "// Recipe Detail Screen - Gets detailed cooking instructions" > features/recipe-detail/RecipeDetailScreen.tsx

# 6. Rating Screen (Optional)
touch features/rating/RatingScreen.tsx
echo "// Rating Screen - Rate the recipe (Optional)" > features/rating/RatingScreen.tsx

# Create service placeholder files
echo "🔧 Creating service files..."
touch services/api/recipeApiService.ts
echo "// Recipe API Service - Integration with OpenAI API" > services/api/recipeApiService.ts

touch services/storage/storageService.ts
echo "// Storage Service - Local storage for user data" > services/storage/storageService.ts

# Create model placeholder files
echo "📦 Creating model files..."
touch models/Ingredient.ts
touch models/Tool.ts
touch models/Recipe.ts
touch models/Rating.ts

# Create core files
echo "⚙️ Creating core configuration files..."
touch core/config/apiConfig.ts
touch core/constants/appConstants.ts
touch core/theme/colors.ts
touch core/utils/helpers.ts

echo "✅ Project structure created successfully!"
echo ""
echo "📊 Structure Overview:"
echo "├── core/"
echo "│   ├── config/"
echo "│   ├── constants/"
echo "│   ├── theme/"
echo "│   └── utils/"
echo "├── features/"
echo "│   ├── home/          (HomeScreen.tsx)"
echo "│   ├── pantry/        (PantryScreen.tsx)"
echo "│   ├── tools/         (ToolsScreen.tsx)"
echo "│   ├── recommendations/ (RecommendationsScreen.tsx)"
echo "│   ├── recipe-detail/ (RecipeDetailScreen.tsx)"
echo "│   └── rating/        (RatingScreen.tsx)"
echo "├── services/"
echo "│   ├── api/"
echo "│   └── storage/"
echo "└── models/"
echo ""
echo "🚀 You can now start developing your SusChef app!"
