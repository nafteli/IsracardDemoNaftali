import React from 'react';
import { View } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { OptionSwitcher, SwitcherOption } from './OptionSwitcher';

export const GlobalSwitcher = () => {
  const { t, currentLanguage, switchLanguage } = useLanguage();
  const { theme, isDark, themeMode, setThemeMode } = useTheme();

  // Language options
  const languageOptions: SwitcherOption[] = [
    {
      value: 'he',
      label: t('hebrew'),
      isActive: currentLanguage === 'he',
    },
    {
      value: 'en',
      label: t('english'),
      isActive: currentLanguage === 'en',
    },
  ];

  // Theme options
  const themeOptions: SwitcherOption[] = [
    {
      value: 'light',
      label: t('lightMode'),
      isActive: themeMode === 'light',
    },
    {
      value: 'dark',
      label: t('darkMode'),
      isActive: themeMode === 'dark',
    },
    {
      value: 'system',
      label: t('systemMode'),
      isActive: themeMode === 'system',
    },
  ];

  const handleLanguageChange = (value: string) => {
    switchLanguage(value as 'he' | 'en');
  };

  const handleThemeChange = (value: string) => {
    setThemeMode(value as 'light' | 'dark' | 'system');
  };

  const containerStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    margin: theme.spacing.md,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  };

  const dividerStyle = {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
    alignSelf: 'stretch' as const,
  };

  return (
    <View style={containerStyle}>
      <OptionSwitcher
        title={t('switchLanguage')}
        options={languageOptions}
        onOptionPress={handleLanguageChange}
        statusText={`${t('currentLanguage')}: ${t(currentLanguage)}`}
        buttonSize="large"
      />

      <View style={dividerStyle} />

      <OptionSwitcher
        title={t('themeMode')}
        options={themeOptions}
        onOptionPress={handleThemeChange}
        statusText={`${t('currentTheme')}: ${isDark ? t('dark') : t('light')}`}
        buttonSize="medium"
      />
    </View>
  );
};