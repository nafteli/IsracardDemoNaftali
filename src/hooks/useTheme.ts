import { useThemeContext } from '../theme/ThemeContext';
import type { ThemeMode } from '../utils/storage';

export const useTheme = () => {
  const context = useThemeContext();
  
  return {
    // Theme data
    theme: context.theme,
    isDark: context.isDark,
    themeMode: context.themeMode,
    isLoading: context.isLoading,
    
    // Theme actions
    toggleTheme: context.toggleTheme,
    setThemeMode: (mode: ThemeMode) => context.setThemeMode(mode),
    
    // Convenience methods
    setLightTheme: () => context.setThemeMode('light'),
    setDarkTheme: () => context.setThemeMode('dark'),
    setSystemTheme: () => context.setThemeMode('system'),
  };
};