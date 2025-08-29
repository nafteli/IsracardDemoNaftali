import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/i18n';
import { useLanguage } from './src/hooks/useLanguage';
import { useTheme } from './src/hooks/useTheme';
import { ThemeProvider } from './src/theme/ThemeContext';
import { GlobalSwitcher } from './src/components/GlobalSwitcher';

export default function App() {
  return (
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
  );
}

function AppContent() {
  const { t, currentLanguage, isRTL } = useLanguage();
  const { theme, isDark } = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[
        styles.centeredText, 
        { 
          color: theme.colors.text,
          fontSize: theme.typography.fontSize.xxl,
          fontWeight: theme.typography.fontWeight.bold,
          marginBottom: theme.spacing.lg
        }
      ]}>
        {t('welcome')}
      </Text>
      
      <Text style={[
        styles.centeredText, 
        { 
          color: theme.colors.textSecondary,
          fontSize: theme.typography.fontSize.md,
          marginBottom: theme.spacing.sm
        }
      ]}>
        {t('currentLanguage')}: {t(currentLanguage)}
      </Text>
      
      {isRTL && (
        <Text style={[
          styles.centeredText, 
          { 
            color: theme.colors.success,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            marginBottom: theme.spacing.sm
          }
        ]}>
          RTL Mode
        </Text>
      )}
      
      <Text style={[
        styles.centeredText, 
        { 
          color: theme.colors.textSecondary,
          fontSize: theme.typography.fontSize.sm,
          marginBottom: theme.spacing.lg
        }
      ]}>
        Theme: {isDark ? t('dark') : t('light')}
      </Text>

      <GlobalSwitcher />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  content: { 
    flexGrow: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  centeredText: {
    textAlign: 'center',
  }
});
