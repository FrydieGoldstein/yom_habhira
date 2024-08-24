import React, { useState, useEffect, useRef } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapComponent from "../components/MapComponent";
import EventTileMobile from "../components/main_screen/mobile/EventTileMobile";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EventTileDesktop from "../components/main_screen/EventTileDesktop";

const MapView = ({ events }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedEvent, setSelectedEvent] = useState(null);

  const onMarkerClick = (event) => {
    setSelectedEvent(event);
  };

  const onMapClick = (e) => {
    setSelectedEvent(null);
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <MapComponent events={events} onMarkerClick={onMarkerClick} onMapClick={onMapClick} />
        {selectedEvent && (
          <div style={{ position: "absolute", top: "20%", right: "10%", zIndex: 1000 }}>
            {isMobile ? (
              <EventTileMobile eventId={selectedEvent.id} />
            ) : (
              <Grid item width={250}>
                <EventTileDesktop eventId={selectedEvent.id} />
              </Grid>
            )}
          </div>
        )}
      </div>
    </APIProvider>
  );
};

export default MapView;
