import React from "react";
import { Button, Box, Checkbox, FormControlLabel } from "@mui/material";
import { Cities, Countries } from "../constants/enums";

const LocationFilterDrawer = ({ onLocationChange, selectedLocation }) => {
  selectedLocation = selectedLocation || [];

  const handleToggle = (location) => {
    const newSelectedLocations = selectedLocation.includes(location)
      ? selectedLocation.filter((loc) => loc !== location)
      : [...selectedLocation, location];
    onLocationChange(newSelectedLocations);
  };

  const handleSelectAllCities = () => {
    let newSelectedLocations = [...selectedLocation];
    const cityKeys = Object.keys(Cities);

    const allCitiesSelected = cityKeys.every((city) => selectedLocation.includes(city));
    if (allCitiesSelected) {
      newSelectedLocations = newSelectedLocations.filter((loc) => !cityKeys.includes(loc));
    } else {
      newSelectedLocations = [...new Set([...newSelectedLocations, ...cityKeys])];
    }

    onLocationChange(newSelectedLocations);
  };

  const handleSelectAllCountries = () => {
    let newSelectedLocations = [...selectedLocation];
    const countryKeys = Object.keys(Countries);

    const allCountriesSelected = countryKeys.every((country) => selectedLocation.includes(country));
    if (allCountriesSelected) {
      newSelectedLocations = newSelectedLocations.filter((loc) => !countryKeys.includes(loc));
    } else {
      newSelectedLocations = [...new Set([...newSelectedLocations, ...countryKeys])];
    }

    onLocationChange(newSelectedLocations);
  };

  const allCitiesSelected = Object.keys(Cities).every((city) => selectedLocation.includes(city));
  const allCountriesSelected = Object.keys(Countries).every((country) => selectedLocation.includes(country));

  return (
    <Box display="flex" alignItems="flex-start" flexDirection="column" sx={{ width: "auto", padding: 2 }}>
      <FormControlLabel control={<Checkbox checked={allCitiesSelected} onChange={handleSelectAllCities} />} label="ישראל" sx={{ marginBottom: 2 }} />
      <Box sx={{ width: "auto", padding: 2 }}>
        {Object.entries(Cities).map(([key, value]) => (
          <Button
            key={key}
            onClick={() => handleToggle(key)}
            variant="outlined"
            sx={{
              margin: 1,
              backgroundColor: selectedLocation.includes(key) ? "secondary.main" : "inherit",
              color: selectedLocation.includes(key) ? "white" : "inherit",
              "&:hover": {
                backgroundColor: selectedLocation.includes(key) ? "secondary.main" : "inherit",
              },
            }}
          >
            {value}
          </Button>
        ))}
      </Box>
      <FormControlLabel
        control={<Checkbox checked={allCountriesSelected} onChange={handleSelectAllCountries} />}
        label="שאר העולם"
        sx={{ marginY: 2 }}
      />
      <Box sx={{ width: "auto", padding: 2 }}>
        {Object.entries(Countries).map(([key, value]) => (
          <Button
            key={key}
            onClick={() => handleToggle(key)}
            variant="outlined"
            sx={{
              margin: 1,
              backgroundColor: selectedLocation.includes(key) ? "secondary.main" : "inherit",
              color: selectedLocation.includes(key) ? "white" : "inherit",
              "&:hover": {
                backgroundColor: selectedLocation.includes(key) ? "secondary.main" : "inherit",
              },
            }}
          >
            {value}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default LocationFilterDrawer;
