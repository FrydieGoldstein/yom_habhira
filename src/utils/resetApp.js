import { getTranslations } from "../utils/i18n";

export const resetApp = (handleResetFilters, setShowMap, setLanguage, setTranslations) => {
  handleResetFilters();
  setShowMap(false);
  setLanguage("he");
  setTranslations(getTranslations("he"));
};
