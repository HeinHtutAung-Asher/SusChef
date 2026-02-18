import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { BaseRow } from './BaseRow';
import { colors } from '../core/theme/colors';
import { layout, typography } from '../core/theme/typography';

interface IngredientRowProps {
  label: string;
  quantity?: string;
  icon?: React.ReactNode;
  onDelete?: () => void;
}

export const IngredientRow: React.FC<IngredientRowProps> = ({
  label,
  quantity = '0',
  icon,
  onDelete,
}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: layout.radius.md,
      paddingHorizontal: layout.spacing.md,
      paddingVertical: layout.spacing.md,
      marginBottom: layout.spacing.md,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    label: {
      fontSize: typography.size.body,
      color: colors.text.primary,
      fontWeight: '500' as const,
    },
    rightContentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: layout.spacing.md,
    },
    quantityBadge: {
      backgroundColor: colors.background,
      paddingHorizontal: layout.spacing.sm,
      paddingVertical: layout.spacing.xs,
      borderRadius: layout.radius.sm,
    },
    quantityText: {
      fontSize: typography.size.caption,
      color: colors.text.secondary,
      fontWeight: '600' as const,
    },
  });

  const rightContent = (
    <View style={styles.rightContentContainer}>
      <View style={styles.quantityBadge}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>
      <Pressable onPress={onDelete}>
        <Trash2 size={20} stroke={colors.status.error} strokeWidth={2} />
      </Pressable>
    </View>
  );

  return (
    <BaseRow
      leftIcon={icon}
      label={<Text style={styles.label}>{label}</Text>}
      rightContent={rightContent}
      style={styles.container}
    />
  );
};

export default IngredientRow;
