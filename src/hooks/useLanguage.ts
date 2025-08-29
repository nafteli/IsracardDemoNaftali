import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  
  return {
    t,
    switchLanguage: (lang: 'he' | 'en') => i18n.changeLanguage(lang),
    currentLanguage: i18n.language,
    isRTL: i18n.language === 'he'
  };
};
