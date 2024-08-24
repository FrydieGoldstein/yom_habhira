import React from "react";
import { InputBase, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <InputBase
      fullWidth
      placeholder="   חיפוש אירוע לפי: שם, כתובת, נושא..."
      inputProps={{ "aria-label": "search" }}
      value={searchQuery}
      onChange={handleSearch}
      startAdornment={
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      }
      sx={{
        border: "1px solid",
        padding: "5px 10px",
        borderRadius: "50px",
      }}
    />
  );
};

export default SearchBar;
