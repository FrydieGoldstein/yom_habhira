import React, { useContext, useState, useEffect } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useTheme } from "@mui/material/styles";
import { EventContext } from "../contexts/EventContext";
import { FilterContext } from "../contexts/FilterContext";
import { useLanguage } from "../contexts/LanguageContext";
import MapView from "../components/MapView";
import FilterDrawer from "../components/FilterDrawer";
import TagsFilterDrawer from "../filters/TagsFilterDrawer";
import TimeFilterDrawer from "../filters/TimeFilterDrawer";
import LocationFilterDrawer from "../filters/LocationFilterDrawer";
import LanguageFilterDrawer from "../filters/LanguageFilterDrawer";
import { TimeSlot } from "../constants/enums";
import AppBarMobile from "../components/main_screen/mobile/AppBarMobile";
import AppBarDesktop from "../components/main_screen/AppBarDesktop";
import EventListDesktop from "../components/main_screen/EventListDesktop";
import EventListMobile from "../components/main_screen/mobile/EventListMobile";

const MainScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { events } = useContext(EventContext);
  const { filters, setFilters } = useContext(FilterContext);
  const { translations, lang } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [tempFilters, setTempFilters] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleSearch = (query) => {
    setSearchQuery(query.target.value.toLowerCase());
  };

  const handleOpenFilter = (filterType) => {
    setActiveFilter(filterType);
    setTempFilters({ ...filters });
  };

  const handleTagsChange = (newTags) => {
    setTempFilters((prev) => ({ ...prev, tags: newTags }));
  };

  const handleTimesChange = (newTimes) => {
    setTempFilters((prev) => ({ ...prev, times: newTimes }));
  };

  const handleLangsChange = (newLangs) => {
    setTempFilters((prev) => ({ ...prev, languages: newLangs }));
  };

  const handleLocationChange = (newLocation) => {
    setTempFilters((prev) => ({ ...prev, location: newLocation }));
  };

  const handleSaveFilter = () => {
    setFilters((prev) => ({ ...prev, ...tempFilters }));
    handleCloseFilter();
  };

  const handleCloseFilter = () => {
    setTempFilters({});
    setActiveFilter(null);
  };

  const handleClearAll = () => {
    setTempFilters((prev) => ({ ...prev, [activeFilter]: null }));
    if (activeFilter === translations.topics) {
      handleTagsChange([]);
    } else if (activeFilter === translations.time) {
      handleTimesChange([]);
    } else if (activeFilter === translations.language) {
      handleLangsChange([]);
    } else if (activeFilter === translations.location) {
      handleLocationChange([]);
    }
  };

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "en" ? "he" : "en"));
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title[lang].toLowerCase().includes(searchQuery) ||
      event.lecturer.name[lang].toLowerCase().includes(searchQuery) ||
      event.address.city[lang].toLowerCase().includes(searchQuery) ||
      event.address.country[lang].toLowerCase().includes(searchQuery) ||
      event.address.street[lang].toLowerCase().includes(searchQuery);

    const matchesTags = !filters.tags || filters.tags.length === 0 || event.tags.some((tag) => filters.tags.includes(tag.id));
    const matchesLangs = !filters.languages || filters.languages.length === 0 || filters.languages.includes(event.language);
    const matchesLocation =
      !filters.location ||
      filters.location.length === 0 ||
      filters.location.includes(event.address.city[lang]) ||
      filters.location.includes(event.address.country[lang]);

    const matchesTimes =
      !filters.times ||
      filters.times.length === 0 ||
      filters.times.some((time) => {
        const eventTime = new Date(event.startTime);
        const [day, period] = time.split(/(?=[A-Z])/); // Split into day and period
        const [startHour, startMinute] = TimeSlot[time].split(" - ")[0].split(":").map(Number);
        const [endHour, endMinute] = TimeSlot[time].split(" - ")[1].split(":").map(Number);

        if (day === "friday" && eventTime.getDay() === 5) {
          const startTime = new Date(eventTime);
          startTime.setHours(startHour, startMinute, 0);

          const endTime = new Date(eventTime);
          endTime.setHours(endHour, endMinute, 0);

          return eventTime >= startTime && eventTime <= endTime;
        }

        if (day === "saturday" && eventTime.getDay() === 6) {
          const startTime = new Date(eventTime);
          startTime.setHours(startHour, startMinute, 0);

          const endTime = new Date(eventTime);
          endTime.setHours(endHour, endMinute, 0);

          return eventTime >= startTime && eventTime <= endTime;
        }

        return false;
      });

    return matchesSearch && matchesTags && matchesLangs && matchesLocation && matchesTimes;
  });

  return (
    <Box dir="rtl">
      {isMobile ? (
        <AppBarMobile searchQuery={searchQuery} handleSearch={handleSearch} handleOpenFilter={handleOpenFilter} />
      ) : (
        <AppBarDesktop
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          handleOpenFilter={handleOpenFilter}
          handleLanguageToggle={handleLanguageToggle}
          language={language}
        />
      )}
      <FilterDrawer
        open={activeFilter !== null}
        onClose={handleCloseFilter}
        title={activeFilter ? `${translations.filterBy} ${activeFilter}` : ""}
        onClear={handleClearAll}
        onApply={handleSaveFilter}
      >
        {activeFilter === translations.topics && <TagsFilterDrawer onTagsChange={handleTagsChange} selectedTags={tempFilters.tags || []} />}
        {activeFilter === translations.time && <TimeFilterDrawer onTimeChange={handleTimesChange} selectedTime={tempFilters.times || []} />}
        {activeFilter === translations.location && (
          <LocationFilterDrawer onLocationChange={handleLocationChange} selectedLocation={tempFilters.location || []} />
        )}
        {activeFilter === translations.language && (
          <LanguageFilterDrawer onLanguageChange={handleLangsChange} selectedLanguage={tempFilters.languages || []} />
        )}
      </FilterDrawer>
      <>
        {showMap ? (
          <MapView events={filteredEvents} />
        ) : isMobile ? (
          <EventListMobile events={filteredEvents} />
        ) : (
          <EventListDesktop events={filteredEvents} />
        )}
        <Box sx={{ position: "fixed", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => setShowMap(!showMap)}
            variant="contained"
            startIcon={
              showMap ? <ViewListIcon style={{ marginLeft: 10, marginRight: -10 }} /> : <MapIcon style={{ marginLeft: 10, marginRight: -10 }} />
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
