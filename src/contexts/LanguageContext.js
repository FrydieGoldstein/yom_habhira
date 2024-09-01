import React, { createContext, useState, useContext } from "react";
import { getTranslations } from "../utils/i18n";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("he");
  const [translations, setTranslations] = useState(getTranslations(language));

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "he" : "en";
    setLanguage(newLanguage);
    setTranslations(getTranslations(newLanguage));
  };
  const lang = language === "en" ? "english" : "hebrew";

  return <LanguageContext.Provider value={{ language, translations, toggleLanguage, lang }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
