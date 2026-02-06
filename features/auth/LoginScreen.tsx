import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { RouteNames } from '../../navigation/routeNames';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, RouteNames.Login>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const handleLogin = () => {
    navigation.navigate(RouteNames.Home);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SusChef</Text>
      <Text style={styles.subtitle}>Turn Leftovers into Meals</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
