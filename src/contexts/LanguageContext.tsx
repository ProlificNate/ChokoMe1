import { createContext, useState, useEffect, ReactNode } from 'react';
import { saveToStorage, getFromStorage } from '../services/storage';
import enTranslations from '../i18n/en.json';
import frTranslations from '../i18n/fr.json';
import pidginTranslations from '../i18n/pidgin.json';

type Language = 'en' | 'fr' | 'pidgin';
type TranslationKey = keyof typeof enTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  availableLanguages: { code: Language; name: string }[];
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  availableLanguages: []
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const availableLanguages = [
    { code: 'en' as Language, name: 'English' },
    { code: 'fr' as Language, name: 'Français' },
    { code: 'pidgin' as Language, name: 'Pidgin' }
  ];

  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState(enTranslations);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = getFromStorage('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Update translations when language changes
    switch (language) {
      case 'en':
        setTranslations(enTranslations);
        break;
      case 'fr':
        setTranslations(frTranslations);
        break;
      case 'pidgin':
        setTranslations(pidginTranslations);
        break;
      default:
        setTranslations(enTranslations);
    }
    
    // Save language preference
    saveToStorage('language', language);
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: changeLanguage, 
        t,
        availableLanguages
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};