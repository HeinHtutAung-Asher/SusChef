import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { lightPalette, darkPalette, AppColors } from './colors';
import { useAppStore } from '../../store/useAppStore';

const ThemeContext = createContext<AppColors>(lightPalette);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const palette = useMemo(() => (isDarkMode ? darkPalette : lightPalette), [isDarkMode]);

  return <ThemeContext.Provider value={palette}>{children}</ThemeContext.Provider>;
}

export function useThemeColors(): AppColors {
  return useContext(ThemeContext);
}
