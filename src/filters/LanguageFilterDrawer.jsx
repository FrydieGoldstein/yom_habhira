//Lunguage filter drawer component

import React from "react";
import { Button, Box } from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import { en } from "../constants/En";

const LanguageFilterDrawer = ({ onLanguageChange, selectedLanguage }) => {
  const { translations } = useLanguage();

  const handleToggle = (language) => {
    const newSelectedLanguages = selectedLanguage.includes(language)
      ? selectedLanguage.filter((lang) => lang !== language)
      : [...selectedLanguage, language];
    onLanguageChange(newSelectedLanguages);
  };

  return (
    <Box sx={{ width: "auto", padding: 2 }}>
      {["hebrew", "english"].map((key) => (
        <Button
          key={key}
          onClick={() => handleToggle(key)}
          variant="outlined"
          data-testid={`${en.language.toLowerCase()}-button-${key}`}
          sx={{
            margin: 1,
            backgroundColor: selectedLanguage.includes(key) ? "secondary.main" : "inherit",
            color: selectedLanguage.includes(key) ? "white" : "inherit",
            "&:hover": {
              backgroundColor: selectedLanguage.includes(key) ? "secondary.main" : "inherit",
            },
          }}
        >
          {translations[key]}
        </Button>
      ))}
    </Box>
  );
};

export default LanguageFilterDrawer;
