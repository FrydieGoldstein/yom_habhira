import React, { useContext, useState, useEffect } from "react";
import EventTile from "../components/EventTile";
import { EventContext } from "../contexts/EventContext";
import { FilterContext } from "../contexts/FilterContext";
import { AppBar, Toolbar, IconButton, Typography, InputBase, Button, Container, Grid, TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import FilterDrawer from "../components/FilterDrawer";
import TagsFilterDrawer from "../filters/TagsFilterDrawer";
//import TimeFilterDrawer from '../filters/TimeFilterDrawer';
//import LocationFilterDrawer from '../filters/LocationFilterDrawer';
//import LanguageFilterDrawer from '../filters/LanguageFilterDrawer';

const MainScreen = () => {
  const theme = useTheme();
  const { events } = useContext(EventContext);
  const { filters, setFilters } = useContext(FilterContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query.target.value.toLowerCase());
  };

  const handleOpenFilter = (filterType) => {
    setActiveFilter(filterType);
    // העתקת הסינונים הנוכחיים ל-tempFilters בעת פתיחת הדראוור
    setTempFilters({ ...filters });
  };

  const [tempFilters, setTempFilters] = useState({});

  useEffect(() => {
    // עדכון tempFilters כאשר filters משתנה
    setTempFilters(filters);
  }, [filters]);

  const handleTagsChange = (newTags) => {
    setTempFilters((prev) => ({ ...prev, tags: newTags }));
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
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.hebrew.toLowerCase().includes(searchQuery) ||
      event.lecturer.name.hebrew.toLowerCase().includes(searchQuery) ||
      event.address.city.hebrew.toLowerCase().includes(searchQuery) ||
      event.address.country.hebrew.toLowerCase().includes(searchQuery) ||
      event.address.street.hebrew.toLowerCase().includes(searchQuery);

    const matchesTags = !filters.tags || filters.tags.length === 0 || event.tags.some((tag) => filters.tags.includes(tag.id));
    return matchesSearch && matchesTags;
  });

  return (
    <Container dir="rtl">
      <AppBar position="fixed" color="default" sx={{ boxShadow: "none" }}>
        <Toolbar>
          <Grid container direction="column" spacing={1}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton aria-label="logo">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/yotzim-basalon-dev.appspot.com/o/general_images%2Ftitle_app.png?alt=media&token=56ccf286-4be4-4891-b91e-1a2c536ff64e"
                  alt="logo"
                  style={{ height: 170 }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <InputBase
                fullWidth
                placeholder="   חיפוש אירוע לפי: שם, כתובת, נושא..."
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearch}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                sx={{
                  border: "1px solid",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
              />
            </Grid>
            <Box
              sx={{
                width: "100%",
                overflow: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button onClick={() => handleOpenFilter("נושאי שיחה")}>נושאי שיחה</Button>
              <Button onClick={() => handleOpenFilter("זמן")}>זמן</Button>
              <Button onClick={() => handleOpenFilter("מיקום")}>מיקום</Button>
              <Button onClick={() => handleOpenFilter("שפת ההרצאה")}>שפת הרצאה</Button>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
      <div
        style={{
          marginTop: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {filteredEvents.map((event) => (
          <EventTile key={event.id} event={event} />
        ))}
      </div>
      <FilterDrawer
        open={activeFilter !== null}
        onClose={handleCloseFilter}
        title={activeFilter ? `סינון לפי ${activeFilter}` : ""}
        onClear={handleClearAll}
        onApply={handleSaveFilter}
      >
        {activeFilter === "נושאי שיחה" && <TagsFilterDrawer onTagsChange={handleTagsChange} selectedTags={tempFilters.tags || []} />}
        {/* הוסף כאן קומפוננטות סינון נוספות */}
      </FilterDrawer>
    </Container>
  );
};

export default MainScreen;
