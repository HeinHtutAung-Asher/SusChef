import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { PantryProvider } from './store';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <PantryProvider>
        <NavigationContainer> 
          <AppNavigator />
        </NavigationContainer>
      </PantryProvider>
    </SafeAreaProvider>
  );
}
