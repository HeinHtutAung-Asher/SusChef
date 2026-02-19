import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { layout, typography } from '../../core/theme/typography';
import { useThemeColors } from '../../core/theme/theme';

interface PreferenceToggleProps {
  label: string;
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
}

export function PreferenceToggle({ label, isEnabled, onToggle }: PreferenceToggleProps) {
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.primary }]}>{label}</Text>
      <Switch
        value={isEnabled}
        onValueChange={onToggle}
        trackColor={{ false: '#D1D5DB', true: '#A7F3D0' }}
        thumbColor={isEnabled ? colors.primary : '#FFFFFF'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.md,
    paddingHorizontal: layout.spacing.lg,
  },
  label: {
    fontSize: typography.size.body,
    fontWeight: typography.weight.medium as any,
  },
});
