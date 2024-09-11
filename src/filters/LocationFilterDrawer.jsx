// Location filter drawer component

import React, { useMemo, useContext } from "react";
import { Button, Box, Checkbox, FormControlLabel } from "@mui/material";
import { useLanguage } from "../contexts/LanguageContext";
import { EventContext } from "../contexts/EventContext";
import { en } from "../constants/En";

const LocationFilterDrawer = ({ onLocationChange, selectedLocation }) => {
  selectedLocation = selectedLocation || [];

  const { events } = useContext(EventContext);

  const { translations, lang } = useLanguage();

  const { cities, countries } = useMemo(() => {
    const citiesSet = new Set();
    const countriesSet = new Set();

    events.forEach((event) => {
      if (event.address.country[lang] === translations.israel) {
        citiesSet.add(event.address.city[lang]);
      } else {
        countriesSet.add(event.address.country[lang]);
      }
    });

    return {
      cities: Array.from(citiesSet).sort(),
      countries: Array.from(countriesSet).sort(),
    };
  }, [events, lang, translations]);

  const handleToggle = (location) => {
    const newSelectedLocations = selectedLocation.includes(location)
      ? selectedLocation.filter((loc) => loc !== location)
      : [...selectedLocation, location];
    onLocationChange(newSelectedLocations);
  };

  const handleSelectAllCities = () => {
    const allCitiesSelected = cities.every((city) => selectedLocation.includes(city));
    const newSelectedLocations = allCitiesSelected
      ? selectedLocation.filter((loc) => !cities.includes(loc))
      : [...new Set([...selectedLocation, ...cities])];

    onLocationChange(newSelectedLocations);
  };

  const handleSelectAllCountries = () => {
    const allCountriesSelected = countries.every((country) => selectedLocation.includes(country));
    const newSelectedLocations = allCountriesSelected
      ? selectedLocation.filter((loc) => !countries.includes(loc))
      : [...new Set([...selectedLocation, ...countries])];

    onLocationChange(newSelectedLocations);
  };

  const allCitiesSelected = cities.every((city) => selectedLocation.includes(city));
  const allCountriesSelected = countries.every((country) => selectedLocation.includes(country));

  return (
    <Box display="flex" alignItems="flex-start" flexDirection="column" sx={{ width: "auto", padding: 2 }}>
      <FormControlLabel
        control={<Checkbox checked={allCitiesSelected} onChange={handleSelectAllCities} data-testid={`checkbox-${en.israel.toLowerCase()}`} />}
        label={translations.israel}
        sx={{ marginBottom: 2 }}
      />
      <Box sx={{ width: "auto", padding: 2 }}>
        {cities.map((city) => (
          <Button
            key={city}
            onClick={() => handleToggle(city)}
            variant="outlined"
            data-testid={`${en.location.toLowerCase()}-button-${city}`}
            sx={{
              margin: 1,
              backgroundColor: selectedLocation.includes(city) ? "secondary.main" : "inherit",
              color: selectedLocation.includes(city) ? "white" : "inherit",
              "&:hover": {
                backgroundColor: selectedLocation.includes(city) ? "secondary.main" : "inherit",
              },
            }}
          >
            {city}
          </Button>
        ))}
      </Box>
      <FormControlLabel
        control={
          <Checkbox checked={allCountriesSelected} onChange={handleSelectAllCountries} data-testid={`checkbox-${en.restOfTheWorld.toLowerCase()}`} />
        }
        label={translations.restOfTheWorld}
        sx={{ marginY: 2 }}
      />
      <Box sx={{ width: "auto", padding: 2 }}>
        {countries.map((country) => (
          <Button
            key={country}
            onClick={() => handleToggle(country)}
            variant="outlined"
            data-testid={`${en.location.toLowerCase()}-button-${country}`}
            sx={{
              margin: 1,
              backgroundColor: selectedLocation.includes(country) ? "secondary.main" : "inherit",
              color: selectedLocation.includes(country) ? "white" : "inherit",
              "&:hover": {
                backgroundColor: selectedLocation.includes(country) ? "secondary.main" : "inherit",
              },
            }}
          >
            {country}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default LocationFilterDrawer;
