import React from "react";
import { IconButton } from "@mui/material";
import GBFlag from "../assets/gb-flag.png";
import ILFlag from "../assets/il-flag.png";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  // console.log("il flag image: ", ILFlag);
  // console.log("gb flag image: ", GBFlag);

  return (
    <IconButton onClick={toggleLanguage} aria-label="language-toggle">
      <img
        src={language === "he" ? GBFlag : ILFlag}
        alt={language === "he" ? "language flag - english" : "language flag - hebrew"}
        style={{ height: 20, width: 25 }}
      />
    </IconButton>
  );
};

export default LanguageToggle;
