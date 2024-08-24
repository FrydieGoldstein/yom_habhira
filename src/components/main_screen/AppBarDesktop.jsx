import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Button, Grid, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GBFlag from "C:/Users/Frydie/Desktop/yom_habhira/yom_habhira_react/yom-habhira/src/assets/gb-flag.png";
import ILFlag from "C:/Users/Frydie/Desktop/yom_habhira/yom_habhira_react/yom-habhira/src/assets/il-flag.png";

const AppBarDesktop = ({ searchQuery, handleSearch, handleOpenFilter, handleLanguageToggle, language }) => {
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
              placeholder="  חיפוש לפי: שם, כתובת, נושא..."
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
              <Button onClick={() => handleOpenFilter("נושאי שיחה")}>נושאי שיחה</Button>
              <Button onClick={() => handleOpenFilter("זמן")}>זמן</Button>
              <Button onClick={() => handleOpenFilter("מיקום")}>מיקום</Button>
              <Button onClick={() => handleOpenFilter("שפת הרצאה")}>שפת הרצאה</Button>
            </Box>
          </Box>
          <Box display="flex" justifyContent="end" width="150px">
            {/* לבדוק את העניין עם הרוחב אם להוסיף גם ללוגו */}
            <IconButton onClick={handleLanguageToggle} aria-label="language-toggle">
              <img src={language === "en" ? GBFlag : ILFlag} alt="language flag" style={{ height: 20, width: 25 }} />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarDesktop;
