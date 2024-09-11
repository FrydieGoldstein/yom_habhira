/**
 * MainScreen Component
 *
 * The `MainScreen` component is the main view for displaying events in either a map or list format,
 * with filtering options for tags, time, location, and language. It also adjusts for mobile and desktop views.
 *
 * This component relies on several contexts and hooks:
 * - `useLanguage`: Provides the current language and translations for localization.
 * - `useEventFilters`: Handles filtering and searching of events.
 *
 * The component has a mobile and desktop version for both the AppBar (navigation) and event list. It also supports a toggle
 * to switch between map view and list view.
 *
 * @component
 * @example
 * return (
 *   <MainScreen />
 * )
 *
 * State:
 * - `activeFilter`: Holds the currently active filter (e.g., tags, time, etc.).
 * - `showMap`: Toggles between the map view and the list view.
 *
 * Props:
 * - None
 *
 * Contexts Used:
 * - `useTheme`: Used for adjusting the layout based on the current theme (e.g., for mobile or desktop).
 * - `useLanguage`: Provides translations and language direction (e.g., RTL or LTR) based on the current language.
 *
 * Hooks:
 * - `useEventFilters`: Manages the logic for filtering and searching events based on user input.
 */

import React, { useState, useEffect } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useTheme } from "@mui/material/styles";
import { useLanguage } from "../contexts/LanguageContext";
import { useEventFilters } from "../hooks/useEventFilters";
import AppBarMobile from "../components/main_screen/mobile/AppBarMobile";
import AppBarDesktop from "../components/main_screen/AppBarDesktop";
import FilterDrawer from "../components/FilterDrawer";
import MapView from "../components/MapView";
import EventListMobile from "../components/main_screen/mobile/EventListMobile";
import EventListDesktop from "../components/main_screen/EventListDesktop";
import TagsFilterDrawer from "../filters/TagsFilterDrawer";
import TimeFilterDrawer from "../filters/TimeFilterDrawer";
import LocationFilterDrawer from "../filters/LocationFilterDrawer";
import LanguageFilterDrawer from "../filters/LanguageFilterDrawer";
import { FilterType } from "../constants/enums";
import { resetApp } from "../utils/resetApp";
import { getFilterTypeTestId } from "../utils/getFilterTypeTestId";

const MainScreen = () => {
  // Access the current theme and check if the screen is mobile-sized
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Access language translations and current language direction (RTL or LTR)
  const { translations, lang, setLanguage, setTranslations } = useLanguage();

  // State to track which filter drawer is currently open and whether to show the map or list view
  const [activeFilter, setActiveFilter] = useState(null);
  const [showMap, setShowMap] = useState(false);

  // Hook for managing event filtering and searching
  const { searchQuery, handleSearch, tempFilters, handleFilterChange, handleSaveFilter, handleClearFilter, filteredEvents, handleResetFilters } =
    useEventFilters();

  const handleResetApp = () => {
    resetApp(handleResetFilters, setShowMap, setLanguage, setTranslations);
  };

  /**
   * Opens a specific filter drawer.
   * @param {string} filterType - The type of filter to open (e.g., "tags", "time", etc.).
   */
  const handleOpenFilter = (filterType) => {
    setActiveFilter(filterType);
  };

  /**
   * Closes the active filter drawer.
   */
  const handleCloseFilter = () => {
    setActiveFilter(null);
  };

  useEffect(() => {
    document.title = "Yom Habhira Events";
  }, []);

  return (
    <Box dir={lang === "hebrew" ? "rtl" : "ltr"}>
      {/* Render the mobile or desktop AppBar based on screen size */}
      {isMobile ? (
        <AppBarMobile searchQuery={searchQuery} handleSearch={handleSearch} handleOpenFilter={handleOpenFilter} />
      ) : (
        <AppBarDesktop searchQuery={searchQuery} handleSearch={handleSearch} handleOpenFilter={handleOpenFilter} handleResetApp={handleResetApp} />
      )}

      {/* Filter drawer for applying or clearing filters */}
      <FilterDrawer
        open={activeFilter !== null}
        onClose={handleCloseFilter}
        title={activeFilter ? `${translations.filterBy} ${activeFilter}` : ""}
        testId={`${getFilterTypeTestId(activeFilter, translations)}-filter-drawer`}
        onClear={() => handleClearFilter(activeFilter)}
        onApply={handleSaveFilter}
      >
        {/* Render appropriate filter drawer content based on active filter */}
        {activeFilter === translations.topics && (
          <TagsFilterDrawer onTagsChange={(newTags) => handleFilterChange(FilterType.TOPICS, newTags)} selectedTags={tempFilters.tags || []} />
        )}
        {activeFilter === translations.time && (
          <TimeFilterDrawer onTimeChange={(newTimes) => handleFilterChange(FilterType.TIME, newTimes)} selectedTime={tempFilters.times || []} />
        )}
        {activeFilter === translations.location && (
          <LocationFilterDrawer
            onLocationChange={(newLocation) => handleFilterChange(FilterType.LOCATION, newLocation)}
            selectedLocation={tempFilters.location || []}
          />
        )}
        {activeFilter === translations.language && (
          <LanguageFilterDrawer
            onLanguageChange={(newLangs) => handleFilterChange(FilterType.LANGUAGE, newLangs)}
            selectedLanguage={tempFilters.languages || []}
          />
        )}
      </FilterDrawer>

      {/* Toggle between map and list views */}
      <>
        {showMap ? (
          <MapView events={filteredEvents} />
        ) : isMobile ? (
          <EventListMobile events={filteredEvents} />
        ) : (
          <EventListDesktop events={filteredEvents} />
        )}

        {/* Button to toggle between map and list views */}
        <Box sx={{ position: "fixed", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <Button
            aria-label="map toggle"
            onClick={() => setShowMap(!showMap)}
            variant="contained"
            startIcon={
              showMap ? (
                <ViewListIcon style={lang === "hebrew" ? { marginLeft: 10, marginRight: -10 } : {}} />
              ) : (
                <MapIcon style={lang === "hebrew" ? { marginLeft: 10, marginRight: -10 } : {}} />
              )
            }
            sx={{
              backgroundColor: "primary.contrastText",
              "&:hover": {
                backgroundColor: "primary.contrastText",
              },
            }}
          >
            {showMap ? translations.list : translations.map}
          </Button>
        </Box>
      </>
    </Box>
  );
};

export default MainScreen;
