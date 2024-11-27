// EventDetails.jsx

import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import useFormattedDate from "../../hooks/useFormattedDate";

export const EventDetails = ({ selectedEvent, isEditable }) => {
  const { formattedDate: startDate, formattedTime: startTime } = useFormattedDate(selectedEvent?.fields?.startTime?.stringValue || "");
  const { formattedDate: endDate, formattedTime: endTime } = useFormattedDate(selectedEvent?.fields?.endTime?.stringValue || "");

  return <Grid container spacing={2}></Grid>;
};
