import React, { useContext, useState, useEffect, useRef } from "react";
import { Container, Box, Button, useMediaQuery } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useTheme } from "@mui/material/styles";
import { EventContext } from "../contexts/EventContext";
import { FilterContext } from "../contexts/FilterContext";
import MapView from "../components/MapView";
import FilterDrawer from "../components/FilterDrawer";
import TagsFilterDrawer from "../filters/TagsFilterDrawer";
import TimeFilterDrawer from "../filters/TimeFilterDrawer";
import LocationFilterDrawer from "../filters/LocationFilterDrawer";
import LanguageFilterDrawer from "../filters/LanguageFilterDrawer";
import { TimeSlot } from "../constants/enums";
import AppBarMobile from "../components/main_screen/mobile/AppBarMobile";
import AppBarDesktop from "../components/main_screen/AppBarDesktop";
import SearchBar from "../components/main_screen/SearchBar";
import FilterButtons from "../components/main_screen/FilterButtons";
import EventListDesktop from "../components/main_screen/EventListDesktop";
import EventListMobile from "../components/main_screen/mobile/EventListMobile";

const MainScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { events } = useContext(EventContext);
  const { filters, setFilters } = useContext(FilterContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [tempFilters, setTempFilters] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const mapRef = useRef(null);

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
    if (activeFilter === "נושאי שיחה") {
      handleTagsChange([]);
    } else if (activeFilter === "זמן") {
      handleTimesChange([]);
    } else if (activeFilter === "שפת הרצאה") {
      handleLangsChange([]);
    } else if (activeFilter === "מיקום") {
      handleLocationChange([]);
    }
  };

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "en" ? "he" : "en"));
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.hebrew.toLowerCase().includes(searchQuery) ||
      event.lecturer.name.hebrew.toLowerCase().includes(searchQuery) ||
      event.address.city.hebrew.toLowerCase().includes(searchQuery) ||
      event.address.country.hebrew.toLowerCase().includes(searchQuery) ||
      event.address.street.hebrew.toLowerCase().includes(searchQuery);

    const matchesTags = !filters.tags || filters.tags.length === 0 || event.tags.some((tag) => filters.tags.includes(tag.id));
    const matchesLangs = !filters.languages || filters.languages.length === 0 || filters.languages.includes(event.language);
    const matchesLocation =
      !filters.location ||
      filters.location.length === 0 ||
      filters.location.includes(event.address.city.english) ||
      filters.location.includes(event.address.country.english);

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
    <Container dir="rtl">
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
        title={activeFilter ? `סינון לפי ${activeFilter}` : ""}
        onClear={handleClearAll}
        onApply={handleSaveFilter}
      >
        {activeFilter === "נושאי שיחה" && <TagsFilterDrawer onTagsChange={handleTagsChange} selectedTags={tempFilters.tags || []} />}
        {activeFilter === "זמן" && <TimeFilterDrawer onTimeChange={handleTimesChange} selectedTime={tempFilters.times || []} />}
        {activeFilter === "מיקום" && <LocationFilterDrawer onLocationChange={handleLocationChange} selectedLocation={tempFilters.location || []} />}
        {activeFilter === "שפת הרצאה" && <LanguageFilterDrawer onLanguageChange={handleLangsChange} selectedLanguage={tempFilters.languages || []} />}
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
              // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            {showMap ? "רשימה" : "מפה"}
          </Button>
        </Box>
      </>
    </Container>
  );
};
export default MainScreen;

// import React, { useContext, useState, useEffect } from "react";
// import { AppBar, Toolbar, IconButton, InputBase, Button, Container, Grid, InputAdornment, Box } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import MapIcon from "@mui/icons-material/Map";
// import ViewListIcon from "@mui/icons-material/ViewList";
// import { useTheme } from "@mui/material/styles";
// import { EventContext } from "../contexts/EventContext";
// import { FilterContext } from "../contexts/FilterContext";
// import EventTile from "../components/EventTile";
// import MapView from "../components/MapView"; // Import your MapView component
// import FilterDrawer from "../components/FilterDrawer";
// import TagsFilterDrawer from "../filters/TagsFilterDrawer";
// import TimeFilterDrawer from "../filters/TimeFilterDrawer";
// import LocationFilterDrawer from "../filters/LocationFilterDrawer";
// import LanguageFilterDrawer from "../filters/LanguageFilterDrawer";
// import { TimeSlot } from "../constants/enums";

// const MainScreen = () => {
//   const theme = useTheme();
//   const { events } = useContext(EventContext);
//   const { filters, setFilters } = useContext(FilterContext);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeFilter, setActiveFilter] = useState(null);
//   const [tempFilters, setTempFilters] = useState({});
//   const [showMap, setShowMap] = useState(false);

//   useEffect(() => {
//     setTempFilters(filters);
//   }, [filters]);

//   const handleSearch = (query) => {
//     setSearchQuery(query.target.value.toLowerCase());
//   };

//   const handleOpenFilter = (filterType) => {
//     setActiveFilter(filterType);
//     setTempFilters({ ...filters });
//   };

//   const handleTagsChange = (newTags) => {
//     setTempFilters((prev) => ({ ...prev, tags: newTags }));
//   };

//   const handleTimesChange = (newTimes) => {
//     setTempFilters((prev) => ({ ...prev, times: newTimes }));
//   };

//   const handleLangsChange = (newLangs) => {
//     setTempFilters((prev) => ({ ...prev, languages: newLangs }));
//   };

//   const handleLocationChange = (newLocation) => {
//     setTempFilters((prev) => ({ ...prev, location: newLocation }));
//   };

//   const handleSaveFilter = () => {
//     setFilters((prev) => ({ ...prev, ...tempFilters }));
//     handleCloseFilter();
//   };

//   const handleCloseFilter = () => {
//     setTempFilters({});
//     setActiveFilter(null);
//   };

//   const handleClearAll = () => {
//     setTempFilters((prev) => ({ ...prev, [activeFilter]: null }));
//     if (activeFilter === "נושאי שיחה") {
//       handleTagsChange([]);
//     } else if (activeFilter === "זמן") {
//       handleTimesChange([]);
//     } else if (activeFilter === "שפת הרצאה") {
//       handleLangsChange([]);
//     } else if (activeFilter === "מיקום") {
//       handleLocationChange([]);
//     }
//   };

//   const filteredEvents = events.filter((event) => {
//     const matchesSearch =
//       event.title.hebrew.toLowerCase().includes(searchQuery) ||
//       event.lecturer.name.hebrew.toLowerCase().includes(searchQuery) ||
//       event.address.city.hebrew.toLowerCase().includes(searchQuery) ||
//       event.address.country.hebrew.toLowerCase().includes(searchQuery) ||
//       event.address.street.hebrew.toLowerCase().includes(searchQuery);

//     const matchesTags = !filters.tags || filters.tags.length === 0 || event.tags.some((tag) => filters.tags.includes(tag.id));
//     const matchesLangs = !filters.languages || filters.languages.length === 0 || filters.languages.includes(event.language);
//     const matchesLocation =
//       !filters.location ||
//       filters.location.length === 0 ||
//       filters.location.includes(event.address.city.english) ||
//       filters.location.includes(event.address.country.english);

//     const matchesTimes =
//       !filters.times ||
//       filters.times.length === 0 ||
//       filters.times.some((time) => {
//         const eventTime = new Date(event.startTime);
//         const [day, period] = time.split(/(?=[A-Z])/); // Split into day and period
//         const [startHour, startMinute] = TimeSlot[time].split(" - ")[0].split(":").map(Number);
//         const [endHour, endMinute] = TimeSlot[time].split(" - ")[1].split(":").map(Number);

//         if (day === "friday" && eventTime.getDay() === 5) {
//           const startTime = new Date(eventTime);
//           startTime.setHours(startHour, startMinute, 0);

//           const endTime = new Date(eventTime);
//           endTime.setHours(endHour, endMinute, 0);

//           return eventTime >= startTime && eventTime <= endTime;
//         }

//         if (day === "saturday" && eventTime.getDay() === 6) {
//           const startTime = new Date(eventTime);
//           startTime.setHours(startHour, startMinute, 0);

//           const endTime = new Date(eventTime);
//           endTime.setHours(endHour, endMinute, 0);

//           return eventTime >= startTime && eventTime <= endTime;
//         }

//         return false;
//       });

//     return matchesSearch && matchesTags && matchesLangs && matchesLocation && matchesTimes;
//   });

//   return (
//     <Container dir="rtl">
//       <AppBar position="fixed" color="default" sx={{ boxShadow: "none" }}>
//         <Toolbar>
//           <Grid container direction="column" spacing={1}>
//             <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
//               <IconButton aria-label="logo">
//                 <img
//                   src="https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Ftitle_app.png?alt=media&token=56ccf286-4be4-4891-b91e-1a2c536ff64e"
//                   alt="logo"
//                   style={{ height: 170 }}
//                 />
//               </IconButton>
//             </Grid>
//             <Grid item xs={12}>
//               <InputBase
//                 fullWidth
//                 placeholder="   חיפוש אירוע לפי: שם, כתובת, נושא..."
//                 inputProps={{ "aria-label": "search" }}
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 startAdornment={
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 }
//                 sx={{
//                   border: "1px solid",
//                   padding: "5px 10px",
//                   borderRadius: "10px",
//                 }}
//               />
//             </Grid>
//             <Box
//               sx={{
//                 width: "100%",
//                 overflow: "auto",
//                 display: "flex",
//                 justifyContent: "center",
//               }}
//             >
//               <Button onClick={() => handleOpenFilter("נושאי שיחה")}>נושאי שיחה</Button>
//               <Button onClick={() => handleOpenFilter("זמן")}>זמן</Button>
//               <Button onClick={() => handleOpenFilter("מיקום")}>מיקום</Button>
//               <Button onClick={() => handleOpenFilter("שפת הרצאה")}>שפת הרצאה</Button>
//             </Box>
//           </Grid>
//         </Toolbar>
//       </AppBar>
//       <FilterDrawer
//         open={activeFilter !== null}
//         onClose={handleCloseFilter}
//         title={activeFilter ? `סינון לפי ${activeFilter}` : ""}
//         onClear={handleClearAll}
//         onApply={handleSaveFilter}
//       >
//         {activeFilter === "נושאי שיחה" && <TagsFilterDrawer onTagsChange={handleTagsChange} selectedTags={tempFilters.tags || []} />}
//         {activeFilter === "זמן" && <TimeFilterDrawer onTimeChange={handleTimesChange} selectedTime={tempFilters.times || []} />}
//         {activeFilter === "מיקום" && <LocationFilterDrawer onLocationChange={handleLocationChange} selectedLocation={tempFilters.location || []} />}
//         {activeFilter === "שפת הרצאה" && <LanguageFilterDrawer onLanguageChange={handleLangsChange} selectedLanguage={tempFilters.languages || []} />}
//       </FilterDrawer>
//       <>
//         {showMap ? (
//           <MapView events={filteredEvents} isShown={showMap} />
//         ) : (
//           <div style={{ marginTop: "300px", display: "flex", flexDirection: "column", gap: "10px" }}>
//             {filteredEvents.map((event) => (
//               <EventTile key={event.id} eventId={event.id} />
//             ))}
//           </div>
//         )}
//         <Box sx={{ position: "fixed", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
//           <Button
//             onClick={() => setShowMap(!showMap)}
//             variant="contained"
//             color="primary"
//             startIcon={showMap ? <ViewListIcon style={{ marginLeft: 5 }} /> : <MapIcon style={{ marginLeft: 5 }} />}
//             sx={{
//               borderRadius: 20,
//               paddingX: 3,
//               backgroundColor: theme.palette.primary.main,
//               "&:hover": {
//                 backgroundColor: theme.palette.primary.dark,
//               },
//             }}
//           >
//             {showMap ? "רשימה" : "מפה"}
//           </Button>
//         </Box>
//       </>
//     </Container>
//   );
// };
// export default MainScreen;
