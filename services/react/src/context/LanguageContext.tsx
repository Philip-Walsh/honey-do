import type { FC, ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

type SupportedLanguage = 'en' | 'ar';

interface LanguageContextValue {
  readonly isRTL: boolean;
  readonly language: SupportedLanguage;
  readonly toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  readonly children: ReactNode;
}

const RTL_LANGUAGES: readonly SupportedLanguage[] = ['ar'] as const;

/**
 * Language provider component that manages language and RTL state
 */
export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('honey-do-language');
      return (saved as SupportedLanguage) ?? 'en';
    } catch {
      return 'en'; // Fallback to English if localStorage is not available
    }
  });

  const isRTL = RTL_LANGUAGES.includes(language);

  useEffect(() => {
    try {
      localStorage.setItem('honey-do-language', language);
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev: SupportedLanguage) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const value: LanguageContextValue = {
    isRTL,
    language,
    toggleLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

/**
 * Hook to access language context
 * @throws {Error} When used outside of LanguageProvider
 */
export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
