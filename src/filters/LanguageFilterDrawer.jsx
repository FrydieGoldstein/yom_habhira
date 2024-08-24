import React from "react";
import { Button, Box } from "@mui/material";
import { Language } from "../constants/enums";

const LanguageFilterDrawer = ({ onLanguageChange, selectedLanguage }) => {
  const handleToggle = (language) => {
    const newSelectedLanguages = selectedLanguage.includes(language)
      ? selectedLanguage.filter((lang) => lang !== language)
      : [...selectedLanguage, language];
    onLanguageChange(newSelectedLanguages);
  };

  return (
    <Box sx={{ width: "auto", padding: 2 }}>
      {Object.entries(Language).map(([key, value]) => (
        <Button
          key={key}
          onClick={() => handleToggle(key)}
          variant="outlined"
          sx={{
            margin: 1,
            backgroundColor: selectedLanguage.includes(key) ? "secondary.main" : "inherit",
            color: selectedLanguage.includes(key) ? "white" : "inherit",
            "&:hover": {
              backgroundColor: selectedLanguage.includes(key) ? "secondary.main" : "inherit",
            },
          }}
        >
          {value}
        </Button>
      ))}
    </Box>
  );
};

export default LanguageFilterDrawer;
