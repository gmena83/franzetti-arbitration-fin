import { createContext, useContext, useState, ReactNode } from "react";
import siteContent from "@/data/siteContent.json";

type Language = "EN" | "ES" | "PT";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getLocalized: (item: any, field?: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  const t = (key: string): string => {
    // Use translations from siteContent.json
    const translations = (siteContent as any).translations || {};
    const translation = translations[key];

    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || translation.EN || key;
  };

  const getLocalized = (item: any, field?: string) => {
    if (!item) return "";

    // If item is a string, return it as is
    if (typeof item === 'string') return item;

    // Case 1: Simple localization object { EN, ES, PT }
    if (!field) {
      return item[language] || item.EN || "";
    }

    // Case 2: Multi-field object { field, fieldES, fieldPT }
    const langSuffix = language === "EN" ? "" : language;
    const localizedField = `${field}${langSuffix}`;

    return item[localizedField] || item[field] || "";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLocalized }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}