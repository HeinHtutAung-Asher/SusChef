import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { RouteNames } from './routeNames';

// Import screens
import LoginScreen from '../features/auth/LoginScreen';
import HomeScreen from '../features/home/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RouteNames.Login}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name={RouteNames.Login}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RouteNames.Home}
          component={HomeScreen}
          options={{ title: 'SusChef' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
