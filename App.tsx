import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { PantryProvider } from './store';
import { ErrorBoundary } from './core/utils/ErrorBoundary';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './core/theme/theme';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SafeAreaProvider>
          <PantryProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </PantryProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
