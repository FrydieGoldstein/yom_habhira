// ConfirmationButton.jsx

import React from "react";
import { Button } from "@mui/material";

export const ConfirmationButton = ({ onSubmit }) => {
  const handleSubmit = () => {
    const formData = {}; // Collect data from the form
    onSubmit(formData);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleSubmit}>
      אישור
    </Button>
  );
};
