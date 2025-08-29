import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/i18n';
import { useLanguage } from './src/hooks/useLanguage';
import { LanguageSwitcher } from './src/components/LanguageSwitcher';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { t, currentLanguage, isRTL } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('welcome')}</Text>
      <Text style={styles.info}>
        {t('currentLanguage')}: {t(currentLanguage)}
      </Text>
      {isRTL && <Text style={styles.rtl}>RTL Mode</Text>}
      <LanguageSwitcher />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 10 },
  rtl: { fontSize: 14, color: 'green', marginBottom: 20 }
});
