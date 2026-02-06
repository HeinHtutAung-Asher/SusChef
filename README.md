# SusChef
A smart recipe app that helps struggling students turn random leftovers into meals to save money and reduce food waste.

## Tech Stack
- **React Native** with Expo
- **TypeScript**
- **React Navigation** for navigation
- **Zustand** for state management (coming soon)
- **Firebase** for backend (coming soon)

## Project Structure
```
├── App.tsx                 # Main app entry point
├── navigation/            
│   ├── AppNavigator.tsx    # Navigation configuration
│   └── types.ts            # Navigation type definitions
├── features/               # Feature-based architecture
│   ├── auth/              # Authentication screens
│   ├── home/              # Home screen
│   ├── pantry/            # Pantry/ingredient management
│   ├── tools/             # Kitchen tools selection
│   ├── recommendations/   # Recipe recommendations
│   ├── recipe-detail/     # Recipe details view
│   └── rating/            # Recipe rating
├── services/              # API and storage services
├── models/                # Data models
└── core/                  # Config, constants, theme, utils
```

## Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the app:**
   ```bash
   npm start
   ```

3. **Run on specific platform:**
   ```bash
   npm run android  # Android
   npm run ios      # iOS
   npm run web      # Web
   ```

## Current Features
- ✅ Navigation setup (Login → Home)
- 🔄 Pantry ingredient management (coming soon)
- 🔄 AI recipe generation (coming soon)
- 🔄 Kitchen tools filtering (coming soon)
