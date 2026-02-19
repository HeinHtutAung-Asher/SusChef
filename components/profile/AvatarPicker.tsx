import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Camera } from 'lucide-react-native';
import { useThemeColors } from '../../core/theme/theme';

interface AvatarPickerProps {
  imageUri?: string;
  size?: number;
  onPick?: () => void;
}

export function AvatarPicker({ imageUri, size = 104, onPick }: AvatarPickerProps) {
  const colors = useThemeColors();
  const dimension = { width: size, height: size, borderRadius: size / 2 };

  return (
    <View style={[styles.container, dimension, { backgroundColor: colors.border }]}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={[styles.image, dimension]} resizeMode="cover" />
      ) : null}
      <Pressable
        style={({ pressed }) => [
          styles.cameraButton,
          { backgroundColor: colors.primary, opacity: pressed ? 0.9 : 1 },
        ]}
        onPress={onPick}
        hitSlop={8}
      >
        <Camera size={16} color={colors.surface} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cameraButton: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
