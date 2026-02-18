import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Refrigerator,
  Heart,
  User,
} from 'lucide-react-native';
import PantryScreen from '../features/pantry/PantryScreen';
import { RouteNames } from './routeNames';
import { TabParamList } from './types';
import { colors } from '../core/theme/colors';
import { typography } from '../core/theme/typography';

const Tab = createBottomTabNavigator<TabParamList>();

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
          fontSize: 12,
          fontWeight: '500' as const,
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name={RouteNames.Pantry}
        component={PantryScreen}
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
