//Time filter drawer component

import React, { useState, useEffect } from "react";
import { Button, Box, Checkbox, FormControlLabel } from "@mui/material";
import { TimeSlot } from "../constants/enums";
import { useLanguage } from "../contexts/LanguageContext";
import { en } from "../constants/En";

const TimeFilterDrawer = ({ onTimeChange, selectedTime }) => {
  selectedTime = selectedTime || [];

  const { translations } = useLanguage();

  const [fridayChecked, setFridayChecked] = useState(selectedTime.includes(en.friday.toLowerCase()));
  const [saturdayChecked, setSaturdayChecked] = useState(selectedTime.includes(en.saturday.toLowerCase()));

  useEffect(() => {
    setFridayChecked(selectedTime.some((time) => time.startsWith(en.friday.toLowerCase())));
    setSaturdayChecked(selectedTime.some((time) => time.startsWith(en.saturday.toLowerCase())));
  }, [selectedTime]);

  const handleToggle = (time) => {
    const newSelectedTime = selectedTime.includes(time) ? selectedTime.filter((t) => t !== time) : [...selectedTime, time];
    onTimeChange(newSelectedTime);
  };

  const handleDayToggle = (day, times) => {
    const dayChecked = day === en.friday.toLowerCase() ? fridayChecked : saturdayChecked;
    const newSelectedTime = dayChecked ? selectedTime.filter((t) => !times.includes(t)) : [...new Set([...selectedTime, ...times])];

    onTimeChange(newSelectedTime);
    if (day === en.friday.toLowerCase()) setFridayChecked(!dayChecked);
    if (day === en.saturday.toLowerCase()) setSaturdayChecked(!dayChecked);
  };

  const fridayTimes = Object.keys(TimeSlot).filter((key) => key.startsWith(en.friday.toLowerCase()));
  const saturdayTimes = Object.keys(TimeSlot).filter((key) => key.startsWith(en.saturday.toLowerCase()));

  return (
    <Box sx={{ width: "auto", padding: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={fridayChecked}
              onChange={() => handleDayToggle(en.friday.toLowerCase(), fridayTimes)}
              data-testid={`checkbox-${en.friday.toLowerCase()}`}
            />
          }
          label={translations.friday}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {fridayTimes.map((key) => (
            <Button
              key={key}
              onClick={() => handleToggle(key)}
              variant="outlined"
              data-testid={`${en.time.toLowerCase()}-button-${key}`}
              sx={{
                margin: 1,
                backgroundColor: selectedTime.includes(key) ? "secondary.main" : "inherit",
                color: selectedTime.includes(key) ? "white" : "inherit",
                "&:hover": {
                  backgroundColor: selectedTime.includes(key) ? "secondary.main" : "inherit",
                },
              }}
            >
              {TimeSlot[key]}
            </Button>
          ))}
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={saturdayChecked}
              onChange={() => handleDayToggle(en.saturday.toLowerCase(), saturdayTimes)}
              data-testid={`checkbox-${en.saturday.toLowerCase()}`}
            />
          }
          label={translations.saturday}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {saturdayTimes.map((key) => (
            <Button
              key={key}
              onClick={() => handleToggle(key)}
              variant="outlined"
              data-testid={`${en.time.toLowerCase()}-button-${key}`}
              sx={{
                margin: 1,
                backgroundColor: selectedTime.includes(key) ? "secondary.main" : "inherit",
                color: selectedTime.includes(key) ? "white" : "inherit",
                "&:hover": {
                  backgroundColor: selectedTime.includes(key) ? "secondary.main" : "inherit",
                },
              }}
            >
              {TimeSlot[key]}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TimeFilterDrawer;
