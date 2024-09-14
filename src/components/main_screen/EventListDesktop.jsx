import React from "react";
import Grid from "@mui/material/Grid";
import EventTileDesktop from "../main_screen/EventTileDesktop";

const EventListDesktop = ({ events }) => {
  return (
    <Grid container spacing={3} style={{ marginTop: "60px" }}>
      {events &&
        events.map((event) => (
          <Grid item xs={3} key={event.id}>
            <EventTileDesktop eventId={event.id} />
          </Grid>
        ))}
    </Grid>
  );
};

export default EventListDesktop;
