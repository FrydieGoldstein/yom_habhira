import React from "react";
import EventTileMobile from "./EventTileMobile";

const EventListMobile = ({ events }) => {
  return (
    <div style={{ marginTop: "190px", display: "flex", flexDirection: "column", gap: "10px" }}>
      {events.map((event) => (
        <EventTileMobile key={event.id} eventId={event.id} />
      ))}
    </div>
  );
};

export default EventListMobile;
