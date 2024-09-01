import React, { useState, useEffect } from "react";
import { Button, Box, Checkbox, FormControlLabel } from "@mui/material";
import { TimeSlot } from "../constants/enums";
import { useLanguage } from "../contexts/LanguageContext";

const TimeFilterDrawer = ({ onTimeChange, selectedTime }) => {
  selectedTime = selectedTime || [];

  const { translations } = useLanguage();

  const [fridayChecked, setFridayChecked] = useState(selectedTime.includes("friday"));
  const [saturdayChecked, setSaturdayChecked] = useState(selectedTime.includes("saturday"));

  useEffect(() => {
    setFridayChecked(selectedTime.some((time) => time.startsWith("friday")));
    setSaturdayChecked(selectedTime.some((time) => time.startsWith("saturday")));
  }, [selectedTime]);

  const handleToggle = (time) => {
    const newSelectedTime = selectedTime.includes(time) ? selectedTime.filter((t) => t !== time) : [...selectedTime, time];
    onTimeChange(newSelectedTime);
  };

  const handleDayToggle = (day, times) => {
    const dayChecked = day === "friday" ? fridayChecked : saturdayChecked;
    const newSelectedTime = dayChecked ? selectedTime.filter((t) => !times.includes(t)) : [...new Set([...selectedTime, ...times])];

    onTimeChange(newSelectedTime);
    if (day === "friday") setFridayChecked(!dayChecked);
    if (day === "saturday") setSaturdayChecked(!dayChecked);
  };

  const fridayTimes = Object.keys(TimeSlot).filter((key) => key.startsWith("friday"));
  const saturdayTimes = Object.keys(TimeSlot).filter((key) => key.startsWith("saturday"));

  return (
    <Box sx={{ width: "auto", padding: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControlLabel
          control={<Checkbox checked={fridayChecked} onChange={() => handleDayToggle("friday", fridayTimes)} />}
          label={translations.friday}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {fridayTimes.map((key) => (
            <Button
              key={key}
              onClick={() => handleToggle(key)}
              variant="outlined"
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
          control={<Checkbox checked={saturdayChecked} onChange={() => handleDayToggle("saturday", saturdayTimes)} />}
          label={translations.saturday}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {saturdayTimes.map((key) => (
            <Button
              key={key}
              onClick={() => handleToggle(key)}
              variant="outlined"
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
