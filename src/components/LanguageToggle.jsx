import React from "react";
import { IconButton } from "@mui/material";
import GBFlag from "C:/Users/Frydie/Desktop/yom_habhira/yom_habhira_react/yom-habhira/src/assets/gb-flag.png";
import ILFlag from "C:/Users/Frydie/Desktop/yom_habhira/yom_habhira_react/yom-habhira/src/assets/il-flag.png";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <IconButton onClick={toggleLanguage} aria-label="language-toggle">
      <img src={language === "en" ? ILFlag : GBFlag} alt="language flag" style={{ height: 20, width: 25 }} />
    </IconButton>
  );
};

export default LanguageToggle;
