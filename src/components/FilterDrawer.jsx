import React from "react";
import { Drawer, IconButton, Button, Box, Typography, ButtonBase } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLanguage } from "../contexts/LanguageContext";

const FilterDrawer = ({ open, onClose, title, children, onClear, onApply }) => {
  const { translations, lang } = useLanguage();

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      dir={lang === "hebrew" ? "rtl" : "ltr"}
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
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
          <ButtonBase onClick={onClear}>{translations.clear}</ButtonBase>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: "auto", marginTop: 2 }}>{children}</Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              onApply();
              onClose();
            }}
          >
            {translations.apply}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
