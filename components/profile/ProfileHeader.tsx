import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { User } from 'lucide-react-native';
import { layout, typography } from '../../core/theme/typography';
import { useThemeColors } from '../../core/theme/theme';

interface ProfileHeaderProps {
  name: string;
  email: string;
  imageUri?: string;
}

export function ProfileHeader({ name, email, imageUri }: ProfileHeaderProps) {
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <View style={[styles.avatarWrapper, { backgroundColor: colors.border }]}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatar} resizeMode="cover" />
        ) : (
          <View style={[styles.avatarFallback, { backgroundColor: colors.primary }]}>
            <User size={40} color={colors.surface} />
          </View>
        )}
      </View>
      <Text style={[styles.name, { color: colors.text.primary }]}>{name}</Text>
      <Text style={[styles.email, { color: colors.text.secondary }]}>{email}</Text>
    </View>
  );
}

const AVATAR_SIZE = 96;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: layout.spacing.xl,
    gap: layout.spacing.sm,
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: typography.size.h1,
    fontWeight: typography.weight.bold as any,
  },
  email: {
    fontSize: typography.size.caption,
  },
});
