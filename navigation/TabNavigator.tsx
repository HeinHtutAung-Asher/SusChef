import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Refrigerator,
  Heart,
  User,
} from 'lucide-react-native';
import PantryScreen from '../features/pantry/PantryScreen';
import { RecipeResultsScreen } from '../features/recommendations/RecipeResultsScreen';
import { RecipeDetailScreen } from '../features/recommendations/RecipeDetailScreen';
import { RouteNames } from './routeNames';
import { TabParamList } from './types';
import { colors } from '../core/theme/colors';
import { typography } from '../core/theme/typography';

const Tab = createBottomTabNavigator<TabParamList>();
const PantryStack = createNativeStackNavigator();

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.background,
  },
  placeholderText: {
    fontSize: typography.size.body,
    color: colors.text.primary,
    fontWeight: '600' as const,
  },
  comingSoon: {
    fontSize: typography.size.caption,
    color: colors.text.disabled,
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 4,
    paddingTop: 4,
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }
      : {
          elevation: 8,
        }),
  },
});

// Nested Stack for Pantry
function PantryStackNavigator() {
  return (
    <PantryStack.Navigator screenOptions={{ headerShown: false }}>
      <PantryStack.Screen
        name={RouteNames.Pantry}
        component={PantryScreen}
      />
      <PantryStack.Screen
        name={RouteNames.RecipeResults}
        component={RecipeResultsScreen}
      />
      <PantryStack.Screen
        name={RouteNames.RecipeDetail}
        component={RecipeDetailScreen}
      />
    </PantryStack.Navigator>
  );
}

// Placeholder Screens
const SavedScreen = () => (
  <View style={styles.placeholder}>
    <Heart size={48} color={colors.text.secondary} />
    <Text style={styles.placeholderText}>Saved Recipes</Text>
    <Text style={styles.comingSoon}>Coming Soon</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.placeholder}>
    <User size={48} color={colors.text.secondary} />
    <Text style={styles.placeholderText}>My Profile</Text>
    <Text style={styles.comingSoon}>Coming Soon</Text>
  </View>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={RouteNames.Pantry}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 4,
          marginTop: 0,
        },
        tabBarIconStyle: {
          marginBottom: 2,
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name={RouteNames.Pantry}
        component={PantryStackNavigator}
        options={{
          tabBarLabel: 'Pantry',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Refrigerator size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteNames.Saved}
        component={SavedScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteNames.Profile}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
