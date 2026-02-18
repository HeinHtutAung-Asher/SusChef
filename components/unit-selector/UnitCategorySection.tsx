import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UnitTile } from './UnitTile';
import { colors } from '../../core/theme/colors';
import { layout, typography } from '../../core/theme/typography';

export interface Unit {
  abbreviation: string;
  fullName: string;
  value: string;
}

export interface UnitCategorySectionProps {
  title: string;
  icon: React.ReactNode;
  units: Unit[];
  selectedUnit: string;
  onSelectUnit: (unit: string) => void;
}

export const UnitCategorySection: React.FC<UnitCategorySectionProps> = ({
  title,
  icon,
  units,
  selectedUnit,
  onSelectUnit,
}) => {
  const styles = StyleSheet.create({
    section: {
      marginBottom: layout.spacing.xl,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: layout.spacing.sm,
      marginBottom: layout.spacing.md,
    },
    title: {
      fontSize: typography.size.caption,
      fontWeight: '700' as const,
      color: colors.text.primary,
      letterSpacing: 1,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: layout.spacing.sm,
    },
  });

  return (
    <View style={styles.section}>
      {/* Category Header */}
      <View style={styles.header}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Unit Grid */}
      <View style={styles.grid}>
        {units.map((unit) => (
          <UnitTile
            key={unit.value}
            abbreviation={unit.abbreviation}
            fullName={unit.fullName}
            isSelected={unit.value === selectedUnit}
            onSelect={() => onSelectUnit(unit.value)}
          />
        ))}
      </View>
    </View>
  );
};

export default UnitCategorySection;
