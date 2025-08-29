import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../hooks/useLanguage';

export const LanguageSwitcher = () => {
  const { t, currentLanguage, switchLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('switchLanguage')}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={[styles.button, currentLanguage === 'he' && styles.active]}
          onPress={() => switchLanguage('he')}
        >
          <Text style={styles.text}>{t('hebrew')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, currentLanguage === 'en' && styles.active]}
          onPress={() => switchLanguage('en')}
        >
          <Text style={styles.text}>{t('english')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 18, marginBottom: 15 },
  buttons: { flexDirection: 'row', gap: 10 },
  button: { padding: 10, backgroundColor: '#ddd', borderRadius: 5 },
  active: { backgroundColor: '#007AFF' },
  text: { color: '#333' }
});
