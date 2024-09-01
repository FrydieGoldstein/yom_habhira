import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Button, Grid, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const AppBarMobile = ({ searchQuery, handleSearch, handleOpenFilter }) => {
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
            <InputBase
              fullWidth
              placeholder="   חיפוש אירוע לפי: שם, כתובת, נושא..."
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
            <Box
              sx={{
                width: "100%",
                overflow: "auto",
                display: "flex",
                justifyContent: "center",
                mb: "8px",
              }}
            >
              <Button onClick={() => handleOpenFilter("נושאי שיחה")}>נושאי שיחה</Button>
              <Button onClick={() => handleOpenFilter("זמן")}>זמן</Button>
              <Button onClick={() => handleOpenFilter("מיקום")}>מיקום</Button>
              <Button onClick={() => handleOpenFilter("שפת הרצאה")}>שפת הרצאה</Button>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarMobile;
