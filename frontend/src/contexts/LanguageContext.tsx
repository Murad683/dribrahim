import { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from '@/lib/i18n';

type TranslationSet = (typeof translations)[Language];

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationSet;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('az');
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
