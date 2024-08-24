import React from "react";
import { Drawer, IconButton, Button, Box, Typography, ButtonBase } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

const FilterDrawer = ({ open, onClose, title, children, onClear, onApply }) => {
  const theme = useTheme();
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      dir="rtl"
      ModalProps={{
        keepMounted: true,
        BackdropProps: {
          style: {
            backgroundColor: "transparent",
          },
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "25px 25px 0 0",
          boxShadow: "0 -4px 20px -6px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Box sx={{ padding: 2, display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
          <ButtonBase onClick={onClear}>נקה בחירה</ButtonBase>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: "auto", marginTop: 2 }}>{children}</Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button variant="contained" onClick={onApply}>
            אישור
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
