import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LanguageStorage } from '../utils/storage';
import he from './locales/he.json';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    he: { translation: he },
    en: { translation: en }
  },
  fallbackLng: 'he',
  interpolation: { escapeValue: false },
  react: { useSuspense: false }
});

const initializeLanguage = async () => {
  try {
    const savedLanguage = await LanguageStorage.getLanguage();
    await i18n.changeLanguage(savedLanguage);
  } catch (error) {
    console.log('Error loading saved language:', error);
  }
};

initializeLanguage();

export default i18n;
