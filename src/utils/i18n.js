import { he } from "../constants/He";
import { en } from "../constants/En";

const languages = {
  he,
  en,
};

export const getTranslations = (language) => {
  return languages[language] || languages.he;
};
