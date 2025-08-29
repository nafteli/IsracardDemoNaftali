import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Theme, lightTheme, darkTheme } from './index';
import { ThemeStorage } from '../utils/storage';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  themeMode: 'light' | 'dark' | 'system';
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load user preference on app startup
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await ThemeStorage.getThemeMode();
        setThemeMode(savedTheme);
      } catch (error) {
        console.log('Error loading theme preference:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadThemePreference();
  }, []);

  // Determine actual color scheme
  const isDark = themeMode === 'system' 
    ? systemColorScheme === 'dark' 
    : themeMode === 'dark';

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = async () => {
    const newMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newMode);
    await ThemeStorage.setThemeMode(newMode);
  };

  const handleSetThemeMode = async (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
    await ThemeStorage.setThemeMode(mode);
  };

  const value: ThemeContextType = {
    theme,
    isDark,
    toggleTheme,
    setThemeMode: handleSetThemeMode,
    themeMode,
    isLoading: !isLoaded,
  };

  // Don't render anything until preferences are loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { useThemeContext };