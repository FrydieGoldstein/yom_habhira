import { en } from "../constants/En";

export const getFilterTypeTestId = (activeFilter, translations) => {
  switch (activeFilter) {
    case translations.topics:
      return en.topics.toLowerCase();
    case translations.time:
      return en.time.toLowerCase();
    case translations.location:
      return en.location.toLowerCase();
    case translations.language:
      return en.language.toLowerCase();
    default:
      return "unknown";
  }
};
