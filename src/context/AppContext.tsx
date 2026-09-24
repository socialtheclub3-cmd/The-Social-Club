import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';
export type Currency = 'USD' | 'SAR' | 'AED' | 'EGP';

const exchangeRates: Record<Currency, number> = {
  USD: 1,
  SAR: 3.75,
  AED: 3.67,
  EGP: 48.5,
};

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatCurrency: (amountBaseUSD: number | 'Custom') => string;
  t: (key: string) => any;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('tsc_lang');
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('tsc_theme');
    return saved === 'dark' || saved === 'light' ? saved : 'light';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('tsc_currency') as Currency;
    return ['USD', 'SAR', 'AED', 'EGP'].includes(saved) ? saved : 'USD';
  });

  // Auto-detect currency via IP if not manually set
  useEffect(() => {
    if (!localStorage.getItem('tsc_currency')) {
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          if (data.country_code === 'SA') setCurrencyState('SAR');
          else if (data.country_code === 'AE') setCurrencyState('AED');
          else if (data.country_code === 'EG') setCurrencyState('EGP');
        })
        .catch(() => {});
    }
  }, []);

  // Apply language, direction & font to HTML root
  useEffect(() => {
    localStorage.setItem('tsc_lang', lang);
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    if (lang === 'ar') {
      document.body.style.fontFamily = '"Cairo", "Poppins", system-ui, sans-serif';
    } else {
      document.body.style.fontFamily = '"Poppins", system-ui, sans-serif';
    }
  }, [lang]);

  // Apply theme class to HTML root
  useEffect(() => {
    localStorage.setItem('tsc_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const setLang = (newLang: Language) => setLangState(newLang);
  const toggleLang = () => setLangState((prev) => (prev === 'en' ? 'ar' : 'en'));

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const toggleTheme = () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('tsc_currency', c);
  };

  const formatCurrency = (amountBaseUSD: number | 'Custom') => {
    if (amountBaseUSD === 'Custom') return lang === 'ar' ? 'مخصص' : 'Custom';
    
    const rate = exchangeRates[currency];
    const converted = Math.round(amountBaseUSD * rate);
    
    const formatters: Record<Currency, Intl.NumberFormat> = {
      USD: new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      SAR: new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-US', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }),
      AED: new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-US', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }),
      EGP: new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }),
    };
    
    return formatters[currency].format(converted);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        theme,
        setTheme,
        toggleTheme,
        currency,
        setCurrency,
        formatCurrency,
        t: (key: string) => key,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
