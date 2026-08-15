"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { dictionaries, Locale, Dictionary } from '@/locales';

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en'); // Default is EN per user request
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount
    const savedLocale = localStorage.getItem('app-locale') as Locale;
    if (savedLocale && dictionaries[savedLocale]) {
      setLocaleState(savedLocale);
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('app-locale', newLocale);
  };

  const t = dictionaries[locale];

  // Prevent hydration mismatch by returning null until mounted, 
  // or just render but translations might flash. Better to render default.
  // We will just render it.

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {/* Optional: Add a class to body based on locale if needed */}
      <div data-locale={locale} className="contents">
        {mounted ? children : <div className="invisible">{children}</div>}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
