import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AvatarPicker } from '../../components/profile/AvatarPicker';
import { EditableUserField } from '../../components/profile/EditableUserField';
import { layout, typography } from '../../core/theme/typography';
import { useThemeColors } from '../../core/theme/theme';
import { RouteNames } from '../../navigation/routeNames';

export function SettingsDetailScreen() {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const [name, setName] = useState('Alex Rivers');
  const [email, setEmail] = useState('alex.rivers@example.com');
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  const handleResetPassword = () => {
    Alert.alert('Reset Password', 'This will open the password reset flow.');
  };

  const handleChangeAccount = () => {
    Alert.alert('Change Account', 'This will navigate to account switching.');
  };

  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: RouteNames.Login as never }] });
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}> 
      <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: '#000' }]}>
        <View style={styles.centered}>
          <AvatarPicker imageUri={avatar} onPick={() => Alert.alert('Pick Image', 'Hook up to image picker.')} />
        </View>
        <View style={styles.fieldGap}>
          <EditableUserField label="Full Name" value={name} onChangeText={setName} autoCapitalize="words" />
          <EditableUserField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: '#000' }]}>
        <Pressable
          onPress={handleResetPassword}
          style={({ pressed }) => [styles.button, { backgroundColor: colors.primary, opacity: pressed ? 0.9 : 1 }]}
        >
          <Text style={[styles.buttonText, { color: colors.surface }]}>Reset Password</Text>
        </Pressable>
        <Pressable
          onPress={handleChangeAccount}
          style={({ pressed }) => [styles.button, { backgroundColor: colors.secondary, opacity: pressed ? 0.9 : 1 }]}
        >
          <Text style={[styles.buttonText, { color: colors.text.primary }]}>Change Account</Text>
        </Pressable>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: '#000' }]}>
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.button, styles.destructiveButton, { opacity: pressed ? 0.9 : 1 }]}
        >
          <Text style={[styles.buttonText, { color: colors.status.error }]}>Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: layout.spacing.lg,
    gap: layout.spacing.lg,
  },
  card: {
    borderRadius: layout.radius.md,
    padding: layout.spacing.lg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  centered: {
    alignItems: 'center',
    marginBottom: layout.spacing.lg,
  },
  fieldGap: {
    gap: layout.spacing.md,
  },
  button: {
    borderRadius: layout.radius.md,
    paddingVertical: layout.spacing.md,
    alignItems: 'center',
    marginBottom: layout.spacing.sm,
  },
  destructiveButton: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  buttonText: {
    fontSize: typography.size.body,
    fontWeight: typography.weight.medium as any,
  },
});
