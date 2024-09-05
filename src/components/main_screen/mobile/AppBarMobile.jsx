import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Button, Grid, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLanguage } from "../../../contexts/LanguageContext";
import LanguageToggle from "../../LanguageToggle";

const AppBarMobile = ({ searchQuery, handleSearch, handleOpenFilter }) => {
  const { translations, lang } = useLanguage();
  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" width="100%">
          <Box display="flex" alignSelf="center">
            <IconButton aria-label="logo">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Ftitle_app.png?alt=media&token=56ccf286-4be4-4891-b91e-1a2c536ff64e"
                alt="logo"
                style={{ maxHeight: "80px" }}
                // alignSelf="center"
              />
            </IconButton>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" rowGap="8px">
            <Box display="flex" gap="10px">
              <InputBase
                placeholder={translations.searchPlaceholder}
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearch}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                }
                sx={{
                  border: "1px solid",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                }}
              />
              <LanguageToggle />
            </Box>
            <Box
              sx={{
                width: "100%",
                overflow: "auto",
                display: "flex",
                justifyContent: "center",
                mb: "8px",
              }}
            >
              <Button onClick={() => handleOpenFilter(translations.topics)}>{translations.topics}</Button>
              <Button onClick={() => handleOpenFilter(translations.time)}>{translations.time}</Button>
              <Button onClick={() => handleOpenFilter(translations.location)}>{translations.location}</Button>
              <Button onClick={() => handleOpenFilter(translations.language)}>{translations.language}</Button>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarMobile;
