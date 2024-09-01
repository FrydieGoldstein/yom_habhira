import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Button, Grid, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LanguageToggle from "../LanguageToggle";
import { useLanguage } from "../../contexts/LanguageContext";

const AppBarDesktop = ({ searchQuery, handleSearch, handleOpenFilter }) => {
  const { translations } = useLanguage();
  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <IconButton aria-label="logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Ftitle_app.png?alt=media&token=56ccf286-4be4-4891-b91e-1a2c536ff64e"
              alt="logo"
              style={{ height: 50 }}
            />
          </IconButton>
          <Box display="flex" justifyContent="center" alignItems="center" width="60%">
            <InputBase
              // width="100%"
              placeholder={translations.searchPlaceholder}
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearch}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon style={{ height: 17 }} />
                </InputAdornment>
              }
              sx={{
                border: "1px solid",
                padding: "5px 5px",
                borderRadius: "20px",
                fontSize: "12px",
                fontFamily: "Roboto, sans-serif",
                height: "30px",
                width: "40%",
                marginLeft: "10px",
              }}
            />
            <Box display="flex">
              <Button onClick={() => handleOpenFilter(translations.topics)}>{translations.topics}</Button>
              <Button onClick={() => handleOpenFilter(translations.time)}>{translations.time}</Button>
              <Button onClick={() => handleOpenFilter(translations.location)}>{translations.location}</Button>
              <Button onClick={() => handleOpenFilter(translations.language)}>{translations.language}</Button>
            </Box>
          </Box>
          <Box display="flex" justifyContent="end" width="150px">
            {/* לבדוק את העניין עם הרוחב אם להוסיף גם ללוגו */}
            <LanguageToggle />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarDesktop;
