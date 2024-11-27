import React, { useState, useEffect } from "react";
import { MenuItem, Button, Select, FormControl, InputLabel, Typography, Grid, Box, TextField, Alert } from "@mui/material";
import { fetchEvents } from "./fetchEvents";
import useFormattedDate from "../hooks/useFormattedDate";

const Form = () => {
  const [eventsData, setEventsData] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]); // Store events filtered by lecturer
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the final selected event
  const [lecturer, setLecturer] = useState("");
  const [lecture, setLecture] = useState("");
  const [warning, setWarning] = useState(false); // To show a warning if multiple events remain
  const [isNewEvent, setIsNewEvent] = useState(false); // For creating a new event
  const [isEditMode, setIsEditMode] = useState(false); // For editing an existing event
  const [isDeleteMode, setIsDeleteMode] = useState(false); // For deleting an event.
  const [isViewMode, setIsViewMode] = useState(false); // For viewing an event

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const eventsData = await fetchEvents();
        setEventsData(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchLecturers();
  }, []);

  // Reset form for a new event
  const handleNewEvent = () => {
    setIsNewEvent(true);
    setIsEditMode(false);
    setIsDeleteMode(false);
    setSelectedEvent(null);
    setIsViewMode(false);
    setLecturer("");
    setLecture("");
  };

  // Activate edit mode
  const handleEditEvent = () => {
    setIsNewEvent(false);
    setIsEditMode(true);
    setIsDeleteMode(false);
    setIsViewMode(true);
  };

  // Activate view mode
  const handleViewEvent = () => {
    setIsNewEvent(true);
    setIsEditMode(false);
    setIsDeleteMode(false);
    setIsViewMode(false);
  };

  // Activate delete mode
  const handleDeleteEvent = () => {
    setIsNewEvent(false);
    setIsEditMode(false);
    setIsDeleteMode(true);
    setIsViewMode(false);
  };

  // Step 1: Handle lecturer selection
  const handleLecturerChange = (event) => {
    const selectedLecturer = event.target.value;
    setLecturer(selectedLecturer);

    // Filter events based on the selected lecturer
    const filteredEvents = eventsData.documents.filter(
      (event) => event.fields.lecturer.mapValue.fields.name.mapValue.fields.hebrew.stringValue === selectedLecturer,
    );
    setSelectedEvents(filteredEvents); // Store matching events
    setLecture(""); // Reset the lecture field
    setSelectedEvent(null); // Reset the final selected event
    setWarning(false); // Reset warning
  };

  // Step 2: Handle lecture selection
  const handleLectureChange = (event) => {
    const selectedLecture = event.target.value;
    setLecture(selectedLecture);

    // Filter the selectedEvents to find the matching event
    const filteredEvents = selectedEvents.filter((event) => event.fields.title.mapValue.fields.hebrew.stringValue === selectedLecture);

    // Check if there is more than one event remaining
    if (filteredEvents.length > 1) {
      setWarning(true); // Set warning if more than one event remains
    } else {
      setWarning(false); // No warning if only one event remains
    }

    setSelectedEvent(filteredEvents[0] || null); // Store the single selected event, or null if none
  };

  const { formattedDate: startDate, formattedTime: startTime } = useFormattedDate(selectedEvent?.fields?.startTime?.stringValue || "");
  const { formattedDate: endDate, formattedTime: endTime } = useFormattedDate(selectedEvent?.fields?.endTime?.stringValue || "");

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        טופס אירועים
      </Typography>

      <Grid container spacing={2} alignItems="center">
        {/* Action Buttons */}
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleNewEvent}>
            אירוע חדש
          </Button>
          {selectedEvent && (
            <>
              <Button variant="contained" color="secondary" onClick={handleEditEvent}>
                עדכון אירוע
              </Button>
              <Button variant="contained" color="error" onClick={handleDeleteEvent}>
                מחיקת אירוע
              </Button>
            </>
          )}
          {(isNewEvent || isEditMode) && (
            <Button variant="contained" onClick={handleViewEvent}>
              הצגת אירוע
            </Button>
          )}
        </Grid>

        {/* Hebrew Lecturer Dropdown */}
        {!isNewEvent && (
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="lecturer-label">שם המרצה</InputLabel>
              <Select labelId="lecturer-label" value={lecturer} onChange={handleLecturerChange} displayEmpty>
                {eventsData &&
                  [
                    ...new Set(eventsData.documents.map((event) => event.fields.lecturer.mapValue.fields.name.mapValue.fields.hebrew.stringValue)),
                  ].map((lecturerName, index) => (
                    <MenuItem key={index} value={lecturerName}>
                      {lecturerName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        {/* Hebrew Lecture Dropdown */}
        {!isNewEvent && (
          <Grid item xs={6}>
            <FormControl fullWidth disabled={!lecturer}>
              <InputLabel id="lecture-label">שם ההרצאה</InputLabel>
              <Select labelId="lecture-label" value={lecture} onChange={handleLectureChange} displayEmpty>
                {selectedEvents &&
                  selectedEvents.map((event, index) => (
                    <MenuItem key={index} value={event.fields.title.mapValue.fields.hebrew.stringValue}>
                      {event.fields.title.mapValue.fields.hebrew.stringValue}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        {/* Warning if multiple events remain */}
        {warning && (
          <Grid item xs={12}>
            <Alert severity="warning">יש יותר מאירוע אחד תואם, לבדוק את זה!.</Alert>
          </Grid>
        )}

        {/* Event Form Inputs (only if an event is selected or new event mode) */}
        {selectedEvent || isNewEvent || isEditMode || isViewMode ? (
          <>
            {/* Hebrew Lecturer Name */}
            <Grid item xs={6}>
              <TextField
                label="שם המרצה (עברית)"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields.lecturer.mapValue.fields.name.mapValue.fields.hebrew.stringValue || ""}
                InputProps={{
                  readOnly: !isNewEvent && !isEditMode,
                }}
              />
            </Grid>

            {/* English Lecturer Name */}
            <Grid item xs={6}>
              <TextField
                label="Lecturer Name (English)"
                fullWidth
                value={isNewEvent ? "" : selectedEvent.fields.lecturer.mapValue.fields.name.mapValue.fields.english.stringValue || ""}
                InputProps={{
                  readOnly: true, // Read only for now
                }}
              />
            </Grid>

            {/* Hebrew Lecture Title */}
            <Grid item xs={6}>
              <TextField
                label="שם ההרצאה (עברית)"
                fullWidth
                value={isNewEvent ? "" : selectedEvent.fields.title.mapValue.fields.hebrew.stringValue || ""}
                InputProps={{
                  readOnly: true, // Read only for now
                }}
              />
            </Grid>

            {/* English Lecture Title */}
            <Grid item xs={6}>
              <TextField
                label="Lecture Title (English)"
                fullWidth
                value={isNewEvent ? "" : selectedEvent.fields.title.mapValue.fields.english.stringValue || ""}
                InputProps={{
                  readOnly: true, // Read only for now
                }}
              />
            </Grid>
            <Grid container spacing={2} alignItems="center">
              {/* Date and Time Section */}
              <Grid item xs={12}>
                <Typography variant="h6">שעה ותאריך</Typography>
              </Grid>

              {/* Date Field */}
              <Grid item xs={6}>
                <TextField
                  label="תאריך"
                  fullWidth
                  value={isNewEvent ? "" : startDate || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {/* Start Time Field */}
              <Grid item xs={3}>
                <TextField
                  label="שעת התחלה"
                  fullWidth
                  value={isNewEvent ? "" : startTime || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {/* End Time Field */}
              <Grid item xs={3}>
                <TextField
                  label="שעת סיום"
                  fullWidth
                  value={isNewEvent ? "" : endTime || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>

            {/* City (Hebrew and English) */}
            <Grid item xs={6}>
              <TextField
                label="עיר (עברית)"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields?.address.mapValue.fields.city.mapValue.fields.hebrew.stringValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City (English)"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields?.address.mapValue.fields.city.mapValue.fields.english.stringValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Country (Hebrew and English) */}
            <Grid item xs={6}>
              <TextField
                label="מדינה (עברית)"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields.address.mapValue.fields.country.mapValue.fields.hebrew.stringValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Country (English)"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields.address.mapValue.fields.country.mapValue.fields.english.stringValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Street (Hebrew and English) */}
            <Grid item xs={6}>
              <TextField
                label="רחוב (עברית)"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields.address.mapValue.fields.street.mapValue.fields.hebrew.stringValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Street (English)"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields.address.mapValue.fields.street.mapValue.fields.english.stringValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Street Number */}
            <Grid item xs={6}>
              <TextField
                label="מספר רחוב"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields.address.mapValue.fields.number.integerValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Max Participants */}
            <Grid item xs={6}>
              <TextField
                label="מספר משתתפים מקסימלי"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields.maxParticipants.integerValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Time Slot */}
            <Grid item xs={6}>
              <TextField
                label="טווח זמן"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields.timeSlot.stringValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Tags */}
            <Grid item xs={6}>
              <TextField
                label="תגיות "
                fullWidth
                value={
                  isNewEvent
                    ? ""
                    : selectedEvent?.fields.tags.arrayValue.values
                        .map((tag) => tag.mapValue.fields.title.mapValue.fields.hebrew.stringValue)
                        .join(", ") || ""
                }
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Description (Hebrew and English) */}
            <Grid item xs={6}>
              <TextField
                label="תיאור (עברית)"
                fullWidth
                multiline
                minRows={7}
                value={isNewEvent ? "" : selectedEvent?.fields.description.mapValue.fields.hebrew.stringValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Description (English)"
                fullWidth
                multiline
                minRows={7}
                value={isNewEvent ? "" : selectedEvent?.fields.description.mapValue.fields.english.stringValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Event Type */}
            <Grid item xs={6}>
              <TextField
                label="סוג האירוע"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields.eventType.stringValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Language */}
            <Grid item xs={6}>
              <TextField
                label="שפת האירוע"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields.language.stringValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Target Location (Latitude and Longitude) */}
            <Grid item xs={6}>
              <TextField
                label="קו רוחב"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields.target.mapValue.fields.lat.doubleValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="קו אורך"
                fullWidth
                value={isNewEvent ? "" : selectedEvent?.fields.target.mapValue.fields.long.doubleValue || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/* Social Media Links */}
            <Grid item xs={6}>
              <TextField
                label="רשתות חברתיות - לסדר את זה"
                fullWidth
                value={
                  isNewEvent ? "" : selectedEvent?.fields?.lecturer?.mapValue?.fields?.socialMediaLinks?.mapValue.fields.facebook?.stringValue || ""
                }
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </>
        ) : null}
        {/* Confirmation Button */}
        {(isNewEvent || isEditMode) && (
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              אישור
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Form;

// import React, { useEffect, useState } from "react";
// import { fetchEvents } from "./fetchEvents";
// import { Box } from "@mui/material";

// const Form = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         const eventsData = await fetchEvents();
//         setEvents(eventsData.documents);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     getEvents();
//   }, []);

//   if (!events || events.length === 0) {
//     console.log("Events not loaded yet.");
//     return <div>Loading...</div>;
//   }

//   events.forEach((event, index) => {
//     console.log(`Event ${index + 1}:`);

//     const fields = event.fields;

//     console.log(`Time Slot: ${fields.timeSlot.stringValue}`);
//     console.log(`Title (Hebrew): ${fields.title.mapValue.fields.hebrew.stringValue}`);
//     console.log(`Title (English): ${fields.title.mapValue.fields.english.stringValue}`);
//     console.log(`Description (Hebrew): ${fields.description.mapValue.fields.hebrew.stringValue}`);
//     console.log(`Description (English): ${fields.description.mapValue.fields.english.stringValue}`);
//     console.log(`Start Time: ${fields.startTime.stringValue}`);
//     console.log(`End Time: ${fields.endTime.stringValue}`);
//     console.log(`Max Participants: ${fields.maxParticipants.integerValue}`);
//     console.log(`Event Type: ${fields.eventType.stringValue}`);
//     console.log(`Language: ${fields.language.stringValue}`);

//     console.log(`Target Location: lat ${fields.target.mapValue.fields.lat.doubleValue}, long ${fields.target.mapValue.fields.long.doubleValue}`);

//     console.log(`Lecturer (Hebrew): ${fields.lecturer.mapValue.fields.name.mapValue.fields.hebrew.stringValue}`);
//     console.log(`Lecturer (English): ${fields.lecturer.mapValue.fields.name.mapValue.fields.english.stringValue}`);

//     if (fields.lecturer.mapValue.fields.socialMediaLinks) {
//       const socialMediaLinks = fields.lecturer.mapValue.fields.socialMediaLinks.mapValue.fields;
//       console.log("Social Media Links:");

//       Object.keys(socialMediaLinks).forEach((platform) => {
//         console.log(`${platform}: ${socialMediaLinks[platform].stringValue}`);
//       });
//     } else {
//       console.log("No social media links available.");
//     }

//     console.log(
//       `Address: ${fields.address.mapValue.fields.street.mapValue.fields.english.stringValue} ${fields.address.mapValue.fields.number.integerValue}, ${fields.address.mapValue.fields.city.mapValue.fields.english.stringValue}, ${fields.address.mapValue.fields.country.mapValue.fields.english.stringValue}`,
//     );

//     console.log("Tags:");
//     fields.tags.arrayValue.values.forEach((tag, tagIndex) => {
//       console.log(`  Tag ${tagIndex + 1} (Hebrew): ${tag.mapValue.fields.title.mapValue.fields.hebrew.stringValue}`);
//       console.log(`  Tag ${tagIndex + 1} (English): ${tag.mapValue.fields.title.mapValue.fields.english.stringValue}`);
//     });

//     console.log("-------------------");
//   });

//   return <Box></Box>;
// };

// export default Form;
