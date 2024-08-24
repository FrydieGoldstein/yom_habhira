import React from "react";
import { Box, Button } from "@mui/material";

const FilterButtons = ({ handleOpenFilter }) => {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button onClick={() => handleOpenFilter("נושאי שיחה")}>נושאי שיחה</Button>
      <Button onClick={() => handleOpenFilter("זמן")}>זמן</Button>
      <Button onClick={() => handleOpenFilter("מיקום")}>מיקום</Button>
      <Button onClick={() => handleOpenFilter("שפת הרצאה")}>שפת הרצאה</Button>
    </Box>
  );
};

export default FilterButtons;
