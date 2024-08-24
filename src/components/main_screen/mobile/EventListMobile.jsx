import React from "react";
import EventTile from "C:/Users/Frydie/Desktop/yom_habhira/yom_habhira_react/yom-habhira/src/components/EventTile";

const EventListMobile = ({ events }) => {
  return (
    <div style={{ marginTop: "100px", display: "flex", flexDirection: "column", gap: "10px" }}>
      {events.map((event) => (
        <EventTile key={event.id} eventId={event.id} />
      ))}
    </div>
  );
};

export default EventListMobile;
